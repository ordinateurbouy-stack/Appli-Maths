import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
}

// Render raw LaTeX string using KaTeX safely
function renderKaTeX(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex.trim(), {
      displayMode,
      throwOnError: false,
      output: 'htmlAndMathml',
    });
  } catch {
    return latex;
  }
}

// Parse inline formatting: math ($...$), bold (**...**), italic (*...*), code (`...`)
function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  // Regex patterns for inline elements
  // 1: Inline math $...$ (must not be empty, not cross newlines)
  // 2: Bold **...**
  // 3: Inline code `...`
  // 4: Italic *...*
  const inlineRegex = /(\$([^\$\n]+?)\$|\*\*([^\*]+?)\*\*|`([^`]+?)`|\*([^\*]+?)\*)/;

  while (remaining.length > 0) {
    const match = remaining.match(inlineRegex);
    if (!match || match.index === undefined) {
      nodes.push(remaining);
      break;
    }

    const matchIndex = match.index;
    if (matchIndex > 0) {
      nodes.push(remaining.substring(0, matchIndex));
    }

    const fullMatch = match[0];

    if (fullMatch.startsWith('$') && fullMatch.endsWith('$')) {
      // Inline math
      const latex = match[2];
      const html = renderKaTeX(latex, false);
      nodes.push(
        <span
          key={`math-${keyIndex++}`}
          className="inline-math px-0.5"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } else if (fullMatch.startsWith('**') && fullMatch.endsWith('**')) {
      // Bold text (recursively parse inline inside bold, e.g. bold with math)
      const inner = match[3];
      nodes.push(
        <strong key={`bold-${keyIndex++}`} className="font-semibold text-slate-900 dark:text-white">
          {parseInline(inner)}
        </strong>
      );
    } else if (fullMatch.startsWith('`') && fullMatch.endsWith('`')) {
      // Code
      const code = match[4];
      nodes.push(
        <code
          key={`code-${keyIndex++}`}
          className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-indigo-700 dark:bg-slate-800 dark:text-indigo-300"
        >
          {code}
        </code>
      );
    } else if (fullMatch.startsWith('*') && fullMatch.endsWith('*')) {
      // Italic
      const inner = match[5];
      nodes.push(
        <em key={`italic-${keyIndex++}`} className="italic">
          {parseInline(inner)}
        </em>
      );
    }

    remaining = remaining.substring(matchIndex + fullMatch.length);
  }

  return nodes;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  // Normalize delimiters \[ ... \] and \( ... \) to $$ ... $$ and $ ... $
  let normalized = content
    .replace(/\\\[([\s\S]*?)\\\]/g, '$$$$$1$$$$')
    .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$');

  // Split content by display math blocks ($$ ... $$)
  const segments = normalized.split(/(\$\$[\s\S]*?\$\$)/g);

  return (
    <div className={`space-y-2.5 text-inherit leading-relaxed ${className}`}>
      {segments.map((segment, segIdx) => {
        if (!segment) return null;

        // Check if this segment is a display math block ($$ ... $$)
        if (segment.startsWith('$$') && segment.endsWith('$$') && segment.length >= 4) {
          const mathExpr = segment.slice(2, -2);
          const html = renderKaTeX(mathExpr, true);
          return (
            <div
              key={`display-math-${segIdx}`}
              className="my-3 overflow-x-auto rounded-2xl border border-indigo-100 bg-indigo-50/40 p-3 text-center dark:border-indigo-900/40 dark:bg-indigo-950/20 shadow-xs"
            >
              <div
                className="inline-block max-w-full text-slate-900 dark:text-slate-100"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          );
        }

        // Process markdown block lines (headings, lists, blockquotes, paragraphs)
        const lines = segment.split('\n');
        const elements: React.ReactNode[] = [];
        let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

        const flushList = (listKey: string) => {
          if (!currentList) return;
          if (currentList.type === 'ul') {
            elements.push(
              <ul key={listKey} className="my-2 space-y-1.5 pl-2 list-none">
                {currentList.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                    <span className="flex-1">{parseInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          } else {
            elements.push(
              <ol key={listKey} className="my-2 space-y-1.5 pl-2 list-none">
                {currentList.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {iIdx + 1}
                    </span>
                    <span className="flex-1 pt-0.5">{parseInline(item)}</span>
                  </li>
                ))}
              </ol>
            );
          }
          currentList = null;
        };

        lines.forEach((line, lineIdx) => {
          const trimmed = line.trim();

          // Empty line
          if (!trimmed) {
            flushList(`list-flush-${segIdx}-${lineIdx}`);
            return;
          }

          // Heading 3: ### ...
          if (trimmed.startsWith('### ')) {
            flushList(`list-before-h3-${segIdx}-${lineIdx}`);
            elements.push(
              <h4
                key={`h3-${segIdx}-${lineIdx}`}
                className="mt-3 mb-1 text-sm sm:text-base font-bold text-indigo-950 dark:text-indigo-300 flex items-center gap-1.5"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                {parseInline(trimmed.replace(/^###\s+/, ''))}
              </h4>
            );
            return;
          }

          // Heading 2: ## ...
          if (trimmed.startsWith('## ')) {
            flushList(`list-before-h2-${segIdx}-${lineIdx}`);
            elements.push(
              <h3
                key={`h2-${segIdx}-${lineIdx}`}
                className="mt-4 mb-1.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white"
              >
                {parseInline(trimmed.replace(/^##\s+/, ''))}
              </h3>
            );
            return;
          }

          // Heading 1: # ...
          if (trimmed.startsWith('# ')) {
            flushList(`list-before-h1-${segIdx}-${lineIdx}`);
            elements.push(
              <h2
                key={`h1-${segIdx}-${lineIdx}`}
                className="mt-4 mb-2 text-lg sm:text-xl font-bold text-slate-900 dark:text-white"
              >
                {parseInline(trimmed.replace(/^#\s+/, ''))}
              </h2>
            );
            return;
          }

          // Bullet item: - ... or * ...
          const bulletMatch = trimmed.match(/^[-*]\s+(.*)$/);
          if (bulletMatch) {
            if (!currentList || currentList.type !== 'ul') {
              flushList(`list-swap-ul-${segIdx}-${lineIdx}`);
              currentList = { type: 'ul', items: [] };
            }
            currentList.items.push(bulletMatch[1]);
            return;
          }

          // Numbered item: 1. ...
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
          if (numMatch) {
            if (!currentList || currentList.type !== 'ol') {
              flushList(`list-swap-ol-${segIdx}-${lineIdx}`);
              currentList = { type: 'ol', items: [] };
            }
            currentList.items.push(numMatch[2]);
            return;
          }

          // Blockquote: > ...
          if (trimmed.startsWith('> ')) {
            flushList(`list-before-quote-${segIdx}-${lineIdx}`);
            elements.push(
              <blockquote
                key={`quote-${segIdx}-${lineIdx}`}
                className="my-2 border-l-3 border-indigo-500 bg-slate-100/60 p-2.5 pl-3.5 text-xs sm:text-sm italic text-slate-700 dark:bg-slate-800/60 dark:text-slate-300 rounded-r-xl"
              >
                {parseInline(trimmed.replace(/^>\s+/, ''))}
              </blockquote>
            );
            return;
          }

          // Regular paragraph
          flushList(`list-before-p-${segIdx}-${lineIdx}`);
          elements.push(
            <p key={`p-${segIdx}-${lineIdx}`} className="leading-relaxed">
              {parseInline(trimmed)}
            </p>
          );
        });

        flushList(`list-final-${segIdx}`);

        return <div key={`text-seg-${segIdx}`}>{elements}</div>;
      })}
    </div>
  );
};

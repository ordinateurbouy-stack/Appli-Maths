import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, LyceeLevel, Chapter } from '../types';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  WifiOff,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { MathRenderer } from './MathRenderer';

interface AITutorViewProps {
  messages: ChatMessage[];
  onSendMessage: (content: string, level: LyceeLevel, chapterContext?: string) => Promise<void>;
  onClearChat: () => void;
  currentLevel: LyceeLevel;
  activeChapter?: Chapter;
  externalPrompt?: string;
  onClearExternalPrompt?: () => void;
}

export const AITutorView: React.FC<AITutorViewProps> = ({
  messages,
  onSendMessage,
  onClearChat,
  currentLevel,
  activeChapter,
  externalPrompt,
  onClearExternalPrompt,
}) => {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isOnline = useOnlineStatus();

  // Handle external prompt if directed from Course or Exercise
  useEffect(() => {
    if (externalPrompt) {
      setInput(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt, onClearExternalPrompt]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isSending) return;

    setInput('');
    setIsSending(true);

    try {
      await onSendMessage(
        text,
        currentLevel,
        activeChapter ? `${activeChapter.shortCode} - ${activeChapter.title}` : undefined
      );
    } catch (e) {
      console.error('Erreur envoi message:', e);
    } finally {
      setIsSending(false);
    }
  };

  // Quick suggestions based on level
  const suggestionsByLevel: Record<LyceeLevel, string[]> = {
    seconde: [
      'Comment calculer |x - a| et interpréter la distance sur la droite réelle ?',
      'Quelle est la méthode pour résoudre une inéquation quotient avec tableau de signes ?',
      'Comment prouver qu\'une fonction est croissante sur un intervalle ?',
      'Donne-moi une astuce pour factoriser avec les identités remarquables.',
    ],
    premiere: [
      'Comment interpréter le signe de Δ et dresser le tableau de signes de ax² + bx + c ?',
      'Quelle est la différence entre le nombre dérivé f\'(a) et l\'équation de la tangente ?',
      'Comment prouver qu\'une suite est arithmétique ou géométrique ?',
      'Pourquoi la fonction exponentielle est-elle toujours strictement positive ?',
    ],
    terminale: [
      'Comment rédiger impeccablement une démonstration par récurrence au Bac ?',
      'Explique-moi les 3 hypothèses du Corollaire du TVI (théorème de la bijection).',
      'Quelle est la méthode mnémotechnique ALPES pour l\'intégration par parties ?',
      'Comment calculer P(X ≥ 1) avec l\'événement contraire dans une loi binomiale ?',
    ],
  };

  const suggestions = suggestionsByLevel[currentLevel] || suggestionsByLevel.premiere;

  return (
    <div className="mx-auto flex h-[calc(100vh-14rem)] min-h-[500px] max-w-4xl flex-col rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3 sm:px-6 dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Tuteur Pédagogique IA
              </h3>
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 capitalize">
                {currentLevel}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Spécialiste du programme officiel de l'Éducation Nationale
            </p>
          </div>
        </div>

        <button
          onClick={onClearChat}
          title="Effacer la discussion"
          className="flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">Effacer</span>
        </button>
      </div>

      {/* Offline banner if disconnected */}
      {!isOnline && (
        <div className="flex items-center gap-2 bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-xs">
          <WifiOff className="h-4 w-4 shrink-0" />
          <span>
            Mode Hors-Ligne détecté : Le tuteur IA nécessite une connexion internet.
            Cependant, vos cours, flashcards et exercices fonctionnent à 100% hors-ligne !
          </span>
        </div>
      )}

      {/* Chat Messages List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-2xs">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-slate-50 text-slate-800 dark:bg-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200/80 dark:border-slate-700/80'
                }`}
              >
                {isUser ? (
                  <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                ) : (
                  <MathRenderer content={msg.content} />
                )}
                <div
                  className={`mt-1.5 text-[10px] ${
                    isUser ? 'text-emerald-200 text-right' : 'text-slate-400 dark:text-slate-400'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              {isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  Le tuteur prépare l'explication...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts footer chips */}
      <div className="border-t border-slate-100 bg-slate-50/50 p-2 sm:px-4 dark:border-slate-800 dark:bg-slate-950/50">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">
          <Lightbulb className="h-3 w-3 text-amber-500" />
          <span>Suggestions pour {currentLevel} :</span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {suggestions.map((sug, sIdx) => (
            <button
              key={sIdx}
              onClick={() => handleSend(sug)}
              disabled={isSending || !isOnline}
              className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/60 transition disabled:opacity-40"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isOnline
              ? "Pose une question sur un théorème, un exercice ou une méthode..."
              : "Mode hors-ligne : connexion requise pour l'IA"
          }
          disabled={!isOnline || isSending}
          id="ai-tutor-input"
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
        />

        <button
          type="submit"
          disabled={!input.trim() || isSending || !isOnline}
          id="ai-tutor-send-btn"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 disabled:opacity-40 transition active:scale-95"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

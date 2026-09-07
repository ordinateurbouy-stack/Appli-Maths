import React from 'react';
import { CourseSheet, Chapter } from '../types';
import {
  X,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  Layers,
} from 'lucide-react';

interface CourseSheetModalProps {
  course: CourseSheet | undefined;
  chapter: Chapter | undefined;
  onClose: () => void;
  onOpenFlashcards: (chapterId: string) => void;
  onOpenExercises: (chapterId: string) => void;
  onAskAI: (chapter: Chapter, initialPrompt?: string) => void;
  onGenerateExercises?: (chapterId: string) => void;
}

export const CourseSheetModal: React.FC<CourseSheetModalProps> = ({
  course,
  chapter,
  onClose,
  onOpenFlashcards,
  onOpenExercises,
  onAskAI,
  onGenerateExercises,
}) => {
  if (!chapter) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
        id="course-sheet-modal"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {chapter.shortCode}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 capitalize">
                  {chapter.level}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {chapter.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-course-modal-btn"
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {/* Summary */}
          <div className="rounded-2xl bg-emerald-50/70 p-4 border border-emerald-200/80 dark:bg-emerald-950/30 dark:border-emerald-900/40">
            <h4 className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300 text-sm">
              <ShieldCheck className="h-4 w-4" />
              Synthèse du Programme Officiel
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200">
              {course?.summary || chapter.description}
            </p>
          </div>

          {/* Detailed Course Notions */}
          {course && course.notions && course.notions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-100 text-xs text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    <Layers className="h-3.5 w-3.5" />
                  </span>
                  Notions Détaillées du Cours
                </h4>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {course.notions.length} notions complètes
                </span>
              </div>

              <div className="space-y-4">
                {course.notions.map((notion, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/40 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-slate-100 pb-2 dark:border-slate-800">
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        {notion.title}
                      </h5>
                      {notion.subtitle && (
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          {notion.subtitle}
                        </span>
                      )}
                    </div>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {notion.content}
                    </p>

                    {notion.keyPoints && notion.keyPoints.length > 0 && (
                      <ul className="mt-3 space-y-1.5 list-disc list-inside text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-150 dark:border-slate-800">
                        {notion.keyPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="pl-0.5 leading-relaxed">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}

                    {notion.formula && (
                      <div className="mt-3 rounded-xl bg-emerald-50/80 p-2.5 font-mono text-xs font-semibold text-emerald-800 border border-emerald-200/80 dark:bg-emerald-950/40 dark:border-emerald-900/50 dark:text-emerald-300">
                        {notion.formula}
                      </div>
                    )}

                    {notion.example && (
                      <div className="mt-3 rounded-xl bg-slate-50 p-3 border border-slate-200 dark:bg-slate-900 dark:border-slate-700/60">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Exemple concret :
                        </span>
                        <div className="mt-1 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-mono">
                          {notion.example}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Definitions & Formulas */}
          {course && course.keyDefinitions.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white mb-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  1
                </span>
                Définitions & Notations Fondamentales
              </h4>

              <div className="space-y-3">
                {course.keyDefinitions.map((def, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40"
                  >
                    <div className="font-bold text-slate-900 dark:text-white">
                      {def.term}
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {def.definition}
                    </p>
                    {def.formula && (
                      <div className="mt-2 rounded-lg bg-white p-2 font-mono text-xs font-semibold text-emerald-700 border border-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:text-emerald-400">
                        {def.formula}
                      </div>
                    )}
                    {def.note && (
                      <div className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 italic">
                        {def.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Theorems & Properties */}
          {course && course.theorems.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white mb-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-100 text-xs text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  2
                </span>
                Théorèmes & Propriétés Clés
              </h4>

              <div className="space-y-3">
                {course.theorems.map((thm, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border-l-4 border-l-emerald-600 border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/30 dark:border-l-emerald-500"
                  >
                    <div className="font-bold text-emerald-800 dark:text-emerald-300">
                      {thm.name}
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                      {thm.statement}
                    </p>
                    {thm.conditions && (
                      <div className="mt-2 rounded-md bg-amber-50 p-2 text-xs font-semibold text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                        Conditions requises : {thm.conditions}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practical Methods & Worked Examples */}
          {course && course.methods.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white mb-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-100 text-xs text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  3
                </span>
                Méthodes & Réflexes types d'examen
              </h4>

              <div className="space-y-4">
                {course.methods.map((mth, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/50"
                  >
                    <h5 className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                      <Lightbulb className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      {mth.title}
                    </h5>

                    <ol className="mt-2.5 list-decimal list-inside space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {mth.steps.map((step, sIdx) => (
                        <li key={sIdx} className="pl-1">
                          {step}
                        </li>
                      ))}
                    </ol>

                    <div className="mt-3 rounded-xl bg-white p-3 border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
                      <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        Exemple corrigé :
                      </div>
                      <div className="mt-1 font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {mth.example.problem}
                      </div>
                      <div className="mt-1.5 text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 whitespace-pre-line font-mono bg-emerald-50/50 dark:bg-emerald-950/30 p-2 rounded-lg">
                        {mth.example.solution}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Traps / Pièges fréquents */}
          {course && course.traps.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
              <h4 className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300 text-sm">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Pièges fréquents & erreurs classiques à éviter
              </h4>
              <ul className="mt-2 space-y-1.5 list-disc list-inside text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                {course.traps.map((trap, idx) => (
                  <li key={idx} className="pl-1">
                    {trap}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sources académiques vérifiables */}
          <div className="border-t border-slate-200 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Sources académiques & conformité :
            </span>
            <ul className="mt-1 list-disc list-inside space-y-0.5">
              <li>{chapter.officialReference}</li>
              {course?.academicSources.map((source, idx) => (
                <li key={idx}>{source}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer (Action toolbar) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
          <button
            onClick={() => onAskAI(chapter, `Explique-moi les points clés et les pièges du chapitre "${chapter.title}" avec un exemple concret.`)}
            id="modal-ask-ai-btn"
            className="flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/80 transition"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Questionner le Tuteur IA</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {onGenerateExercises && (
              <button
                onClick={() => {
                  onClose();
                  onGenerateExercises(chapter.id);
                }}
                id="modal-generate-exo-btn"
                className="flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-900/60 transition"
              >
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Générer un exo</span>
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onOpenFlashcards(chapter.id);
              }}
              id="modal-flashcards-btn"
              className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition"
            >
              <Sparkles className="h-4 w-4" />
              <span>Flashcards</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenExercises(chapter.id);
              }}
              id="modal-exercises-btn"
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>S'entraîner</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

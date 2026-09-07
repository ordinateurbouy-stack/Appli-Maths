import React from 'react';
import { Chapter, MathDomain } from '../types';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Circle,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  Hash,
  Compass,
  PieChart,
} from 'lucide-react';

interface ChapterCardProps {
  chapter: Chapter;
  isCompleted: boolean;
  onToggleCompletion: (chapterId: string) => void;
  onOpenCourse: (chapter: Chapter) => void;
  onOpenFlashcards: (chapterId: string) => void;
  onOpenExercises: (chapterId: string) => void;
  onAskAI: (chapter: Chapter) => void;
  onGenerateExercises?: (chapterId: string) => void;
  flashcardsCount: number;
  exercisesCount: number;
}

const DOMAIN_STYLES: Record<
  MathDomain,
  { label: string; badge: string; icon: React.ReactNode }
> = {
  analyse: {
    label: 'Analyse & Fonctions',
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    icon: <TrendingUp className="h-3.5 w-3.5" />,
  },
  algebre: {
    label: 'Algèbre & Nombres',
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
    icon: <Hash className="h-3.5 w-3.5" />,
  },
  geometrie: {
    label: 'Géométrie',
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
    icon: <Compass className="h-3.5 w-3.5" />,
  },
  probabilites: {
    label: 'Probabilités & Stats',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    icon: <PieChart className="h-3.5 w-3.5" />,
  },
};

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  isCompleted,
  onToggleCompletion,
  onOpenCourse,
  onOpenFlashcards,
  onOpenExercises,
  onAskAI,
  onGenerateExercises,
  flashcardsCount,
  exercisesCount,
}) => {
  const domainInfo = DOMAIN_STYLES[chapter.domain];

  return (
    <div
      id={`chapter-card-${chapter.id}`}
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all ${
        isCompleted
          ? 'border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/50 dark:bg-emerald-950/10'
          : 'border-slate-200 bg-white hover:shadow-md hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
      }`}
    >
      <div className="p-4 sm:p-5">
        {/* Header with Domain, ShortCode, and Complete Toggle */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${domainInfo.badge}`}
            >
              {domainInfo.icon}
              {domainInfo.label}
            </span>
            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {chapter.shortCode}
            </span>
          </div>

          <button
            onClick={() => onToggleCompletion(chapter.id)}
            id={`toggle-complete-${chapter.id}`}
            title={isCompleted ? 'Marquer comme non validé' : 'Marquer comme validé'}
            className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          >
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Title and Description */}
        <h4 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
          {chapter.title}
        </h4>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
          {chapter.description}
        </p>

        {/* Academic reference and quick generate action */}
        <div className="mt-2.5 flex items-center justify-between gap-2 text-[10px] font-medium">
          <span className="text-slate-400 dark:text-slate-500 truncate">
            Source : {chapter.officialReference}
          </span>
          {onGenerateExercises && (
            <button
              onClick={() => onGenerateExercises(chapter.id)}
              className="flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 shrink-0"
              title="Générer un exercice supplémentaire avec correction pour ce chapitre"
            >
              <Sparkles className="h-3 w-3" />
              <span>Générer un exo</span>
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-slate-100 bg-slate-50/50 p-2.5 dark:border-slate-800/80 dark:bg-slate-900/50 rounded-b-2xl">
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {/* Fiche de cours */}
          <button
            onClick={() => onOpenCourse(chapter)}
            id={`btn-course-${chapter.id}`}
            className="flex items-center justify-center gap-1 rounded-lg bg-white px-2 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            <BookOpen className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Fiche Cours</span>
          </button>

          {/* Flashcards */}
          <button
            onClick={() => onOpenFlashcards(chapter.id)}
            id={`btn-flashcards-${chapter.id}`}
            className="flex items-center justify-center gap-1 rounded-lg bg-white px-2 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Cartes {flashcardsCount > 0 && `(${flashcardsCount})`}</span>
          </button>

          {/* Exercices corrigés */}
          <button
            onClick={() => onOpenExercises(chapter.id)}
            id={`btn-exercises-${chapter.id}`}
            className="flex items-center justify-center gap-1 rounded-lg bg-white px-2 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
          >
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-100 text-[9px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              ✓
            </span>
            <span>Exos {exercisesCount > 0 && `(${exercisesCount})`}</span>
          </button>

          {/* Poser une question à l'IA */}
          <button
            onClick={() => onAskAI(chapter)}
            id={`btn-ai-${chapter.id}`}
            className="flex items-center justify-center gap-1 rounded-lg bg-indigo-50 px-2 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Aide IA</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { UserProgress, Chapter, Badge, MathDomain, ExerciseRecord, FlashcardRecord } from '../types';
import { BADGES_DATA } from '../data/badges';
import {
  Flame,
  Award,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Brain,
  Download,
  Upload,
  RotateCcw,
  Calendar,
  Target,
  GraduationCap,
} from 'lucide-react';

interface ProgressDashboardProps {
  progress: UserProgress;
  chapters: Chapter[];
  onResetProgress: () => void;
  onImportProgress: (json: string) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  chapters,
  onResetProgress,
  onImportProgress,
}) => {
  const [importText, setImportText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);

  // Chapters stats
  const totalChapters = chapters.length;
  const completedChaptersCount = progress.completedChapters.length;
  const overallPercentage =
    totalChapters > 0 ? Math.round((completedChaptersCount / totalChapters) * 100) : 0;

  // Level breakdowns
  const levels = ['seconde', 'premiere', 'terminale'] as const;
  const levelStats = levels.map((lvl) => {
    const lvlChapters = chapters.filter((c) => c.level === lvl);
    const completed = lvlChapters.filter((c) =>
      progress.completedChapters.includes(c.id)
    ).length;
    const pct = lvlChapters.length > 0 ? Math.round((completed / lvlChapters.length) * 100) : 0;
    return {
      level: lvl,
      total: lvlChapters.length,
      completed,
      percentage: pct,
    };
  });

  // Domain breakdowns
  const domains: MathDomain[] = ['algebre', 'analyse', 'geometrie', 'probabilites'];
  const domainLabels: Record<MathDomain, string> = {
    algebre: 'Algèbre & Arithmétique',
    analyse: 'Analyse & Fonctions',
    geometrie: 'Géométrie & Vecteurs',
    probabilites: 'Probabilités & Statistiques',
  };

  const domainStats = domains.map((dm) => {
    const dmChapters = chapters.filter((c) => c.domain === dm);
    const completed = dmChapters.filter((c) =>
      progress.completedChapters.includes(c.id)
    ).length;
    const pct = dmChapters.length > 0 ? Math.round((completed / dmChapters.length) * 100) : 0;
    return {
      domain: dm,
      label: domainLabels[dm],
      total: dmChapters.length,
      completed,
      percentage: pct,
    };
  });

  // Exercises stats
  const exerciseValues = Object.values(progress.exerciseHistory) as ExerciseRecord[];
  const totalExercisesAttempted = exerciseValues.length;
  const exercisesCompleted = exerciseValues.filter((e) => e.completed).length;
  const averageAttempts =
    totalExercisesAttempted > 0
      ? (
          exerciseValues.reduce((acc, curr) => acc + curr.attempts, 0) /
          totalExercisesAttempted
        ).toFixed(1)
      : '0';

  // Flashcards stats
  const flashcardReviews = Object.values(progress.flashcardReviews) as FlashcardRecord[];
  const flashcardsReviewedCount = flashcardReviews.length;
  const easyCount = flashcardReviews.filter((r) => r.ease === 'easy').length;
  const mediumCount = flashcardReviews.filter((r) => r.ease === 'medium').length;
  const hardCount = flashcardReviews.filter((r) => r.ease === 'hard').length;

  const handleExportData = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progression-maths-lycee-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      if (!importText.trim()) return;
      onImportProgress(importText);
      setShowImportArea(false);
      setImportText('');
    } catch (e) {
      alert('Fichier JSON invalide.');
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      {/* Top Banner with Streak and Overall Stats */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Streak */}
          <div className="flex items-center gap-4 rounded-2xl bg-amber-50/70 p-4 border border-amber-200/80 dark:bg-amber-950/30 dark:border-amber-900/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
              <Flame className="h-7 w-7 fill-white" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-950 dark:text-amber-200">
                {progress.streak} {progress.streak > 1 ? 'Jours' : 'Jour'}
              </div>
              <div className="text-xs font-semibold text-amber-800 dark:text-amber-400">
                Série de révision consécutive
              </div>
            </div>
          </div>

          {/* Overall Chapter Progress */}
          <div className="flex items-center gap-4 rounded-2xl bg-emerald-50/70 p-4 border border-emerald-200/80 dark:bg-emerald-950/30 dark:border-emerald-900/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-200">
                {overallPercentage}%
              </div>
              <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                {completedChaptersCount} sur {totalChapters} chapitres maîtrisés
              </div>
            </div>
          </div>

          {/* Exercises & Flashcards summary */}
          <div className="flex items-center gap-4 rounded-2xl bg-indigo-50/70 p-4 border border-indigo-200/80 dark:bg-indigo-950/30 dark:border-indigo-900/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md">
              <Target className="h-7 w-7" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-indigo-950 dark:text-indigo-200">
                {exercisesCompleted} exos
              </div>
              <div className="text-xs font-semibold text-indigo-800 dark:text-indigo-400">
                {flashcardsReviewedCount} flashcards révisées
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Progression Details */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Progression par niveau */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Progression par Classe du Lycée
          </h3>

          <div className="space-y-4">
            {levelStats.map((item) => (
              <div key={item.level} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800 dark:text-slate-200 capitalize">
                    {item.level === 'premiere'
                      ? 'Première Spécialité'
                      : item.level === 'terminale'
                      ? 'Terminale Spécialité'
                      : 'Seconde Générale'}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {item.completed} / {item.total} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progression par domaine */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Progression par Domaine Mathématique
          </h3>

          <div className="space-y-4">
            {domainStats.map((item) => (
              <div key={item.domain} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800 dark:text-slate-200">{item.label}</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {item.completed} / {item.total} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trophées & Badges Débloqués */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-amber-500" />
          Trophées & Badges Pédagogiques ({progress.unlockedBadges.length} / {BADGES_DATA.length})
        </h3>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {BADGES_DATA.map((badge) => {
            const isUnlocked = progress.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`flex flex-col rounded-2xl p-4 border transition ${
                  isUnlocked
                    ? 'border-amber-200 bg-amber-50/40 dark:border-amber-900/50 dark:bg-amber-950/20'
                    : 'border-slate-200 bg-slate-50/50 opacity-40 grayscale dark:border-slate-800 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                      isUnlocked
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-500 dark:bg-slate-700'
                    }`}
                  >
                    <Award className="h-4 w-4" />
                  </div>
                  {isUnlocked && (
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">
                      Débloqué
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {badge.name}
                </h4>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export / Backup / Reset */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          Gestion & Sauvegarde de ma Progression
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Toutes tes données sont stockées de façon sécurisée dans ton navigateur. Tu peux exporter
          ta progression pour la transférer sur un autre appareil ou la sauvegarder.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportData}
            id="btn-export-json"
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
          >
            <Download className="h-4 w-4" />
            <span>Exporter mes données (JSON)</span>
          </button>

          <button
            onClick={() => setShowImportArea(!showImportArea)}
            id="btn-toggle-import"
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
          >
            <Upload className="h-4 w-4" />
            <span>Importer une sauvegarde</span>
          </button>

          <button
            onClick={() => {
              if (
                window.confirm(
                  'Es-tu certain de vouloir réinitialiser entièrement ta progression de révision ?'
                )
              ) {
                onResetProgress();
              }
            }}
            id="btn-reset-progress"
            className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300 transition ml-auto"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Réinitialiser</span>
          </button>
        </div>

        {showImportArea && (
          <div className="mt-4 space-y-2 rounded-2xl bg-slate-50 p-4 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700">
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Colle ici le contenu du fichier JSON de sauvegarde..."
              rows={3}
              className="w-full rounded-xl border border-slate-300 p-2.5 font-mono text-xs text-slate-800 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 focus:outline-none"
            />
            <button
              onClick={handleImport}
              className="rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
            >
              Valider l'importation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

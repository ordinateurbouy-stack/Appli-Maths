import React from 'react';
import { LyceeLevel } from '../types';
import { GraduationCap, Award, BookCheck } from 'lucide-react';

interface LevelSelectorProps {
  currentLevel: LyceeLevel;
  onSelectLevel: (level: LyceeLevel) => void;
  totalChapters: number;
  completedChaptersCount: number;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  currentLevel,
  onSelectLevel,
  totalChapters,
  completedChaptersCount,
}) => {
  const levels: Array<{
    id: LyceeLevel;
    label: string;
    subtitle: string;
    badge: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'seconde',
      label: 'Seconde (2nde)',
      subtitle: 'Bases solides du lycée : ensembles, fonctions, vecteurs & probabilités',
      badge: 'Tronc commun',
      icon: <BookCheck className="h-5 w-5" />,
    },
    {
      id: 'premiere',
      label: 'Première Spécialité',
      subtitle: 'Second degré, dérivation, exponentielle, suites & trigonométrie',
      badge: 'Spé Maths',
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      id: 'terminale',
      label: 'Terminale Spécialité',
      subtitle: 'Récurrence, TVI, logarithme, intégrales, convexité & loi binomiale',
      badge: 'Baccalauréat',
      icon: <Award className="h-5 w-5" />,
    },
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {levels.map((lvl) => {
          const isSelected = currentLevel === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => onSelectLevel(lvl.id)}
              id={`level-card-${lvl.id}`}
              className={`group relative flex flex-col rounded-2xl p-4 text-left transition-all ${
                isSelected
                  ? 'border-2 border-emerald-600 bg-emerald-50/50 shadow-sm dark:border-emerald-500 dark:bg-emerald-950/20'
                  : 'border border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                    isSelected
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                  }`}
                >
                  {lvl.icon}
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    isSelected
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {lvl.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {lvl.label}
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {lvl.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Level stats bar */}
      <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-100 px-4 py-2 text-xs text-slate-600 dark:bg-slate-800/80 dark:text-slate-400">
        <span className="font-medium">
          Progression de ce niveau : {completedChaptersCount} / {totalChapters} chapitres validés
        </span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{
                width: `${totalChapters > 0 ? (completedChaptersCount / totalChapters) * 100 : 0}%`,
              }}
            />
          </div>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {totalChapters > 0
              ? Math.round((completedChaptersCount / totalChapters) * 100)
              : 0}
            %
          </span>
        </div>
      </div>
    </div>
  );
};

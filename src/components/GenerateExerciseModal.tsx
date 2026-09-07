import React, { useState, useEffect } from 'react';
import { Chapter, LyceeLevel, Exercise } from '../types';
import { requestExerciseGeneration } from '../services/exerciseGenerator';
import {
  Sparkles,
  X,
  CheckCircle2,
  Loader2,
  BookOpen,
  Sliders,
  TrendingUp,
  AlertCircle,
  PlusCircle,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GenerateExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  currentLevel: LyceeLevel;
  defaultChapterId?: string | 'all';
  onExerciseGenerated: (newExercises: Exercise[], targetChapterId: string) => void;
}

export const GenerateExerciseModal: React.FC<GenerateExerciseModalProps> = ({
  isOpen,
  onClose,
  chapters,
  currentLevel,
  defaultChapterId,
  onExerciseGenerated,
}) => {
  const levelChapters = chapters.filter((ch) => ch.level === currentLevel);

  const [selectedChapterId, setSelectedChapterId] = useState<string>(() => {
    if (defaultChapterId && defaultChapterId !== 'all') {
      return defaultChapterId;
    }
    return levelChapters[0]?.id || '';
  });

  const [difficulty, setDifficulty] = useState<'Facile' | 'Moyen' | 'Difficile'>('Moyen');
  const [exerciseCount, setExerciseCount] = useState<number>(1);
  const [topicHint, setTopicHint] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<Exercise[]>([]);

  // Update selectedChapterId when defaultChapterId changes
  useEffect(() => {
    if (defaultChapterId && defaultChapterId !== 'all') {
      setSelectedChapterId(defaultChapterId);
    } else if (levelChapters.length > 0 && (!selectedChapterId || !levelChapters.some(c => c.id === selectedChapterId))) {
      setSelectedChapterId(levelChapters[0].id);
    }
  }, [defaultChapterId, currentLevel, levelChapters]);

  if (!isOpen) return null;

  const currentChapter = levelChapters.find((ch) => ch.id === selectedChapterId) || levelChapters[0];

  const handleGenerate = async () => {
    if (!currentChapter) return;
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const generated = await requestExerciseGeneration({
        chapter: currentChapter,
        difficulty,
        topicHint: topicHint.trim() || undefined,
        count: exerciseCount,
      });

      if (generated && generated.length > 0) {
        setLastGenerated(generated);
        onExerciseGenerated(generated, currentChapter.id);

        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
        });
      } else {
        setErrorMsg("Impossible de créer l'exercice. Veuillez réessayer.");
      }
    } catch (err: unknown) {
      console.error('Erreur génération exercice:', err);
      setErrorMsg("Une erreur s'est produite lors de la génération.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      id="modal-generate-exercise-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) onClose();
      }}
    >
      <div
        id="modal-generate-exercise-content"
        className="relative flex max-h-[90vh] w-full max-w-xl flex-col rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Générateur d'Exercices à Volonté
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Créez autant d'exercices inédits avec corrections détaillées que vous le souhaitez
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            id="btn-close-generate-modal"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Chapter Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              1. Choisir le chapitre cible ({currentLevel.toUpperCase()})
            </label>
            <select
              value={selectedChapterId}
              onChange={(e) => {
                setSelectedChapterId(e.target.value);
                setLastGenerated([]);
              }}
              id="select-generate-chapter"
              className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-sm font-medium text-slate-800 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 focus:border-blue-500 focus:outline-hidden"
            >
              {levelChapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.shortCode} - {ch.title} ({ch.domain})
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Choice */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              2. Niveau de difficulté
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(['Facile', 'Moyen', 'Difficile'] as const).map((lvl) => {
                const isSelected = difficulty === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDifficulty(lvl)}
                    id={`btn-diff-${lvl.toLowerCase()}`}
                    className={`rounded-2xl border p-3 text-center text-xs sm:text-sm font-bold transition ${
                      isSelected
                        ? lvl === 'Facile'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200'
                          : lvl === 'Moyen'
                          ? 'border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200'
                          : 'border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Number of exercises */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              3. Nombre d'exercices à générer
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setExerciseCount(num)}
                  id={`btn-count-${num}`}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition border ${
                    exerciseCount === num
                      ? 'border-blue-600 bg-blue-50 text-blue-800 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-200'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {num} exercice{num > 1 ? 's' : ''}
                </button>
              ))}
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              💡 Vous pourrez relancer la génération autant de fois que vous le désirez.
            </p>
          </div>

          {/* Optional specific topic */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              4. Thème spécifique ou consigne (optionnel)
            </label>
            <input
              type="text"
              value={topicHint}
              onChange={(e) => setTopicHint(e.target.value)}
              placeholder="Ex: calcul de dérivée, équation de tangente, arbre de proba..."
              id="input-generate-hint"
              className="w-full rounded-2xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          {/* Error notice */}
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success summary */}
          {lastGenerated.length > 0 && !isLoading && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-200">
                    {lastGenerated.length} exercice{lastGenerated.length > 1 ? 's' : ''} généré{lastGenerated.length > 1 ? 's' : ''} avec succès !
                  </span>
                </div>
              </div>
              <div className="mt-2.5 space-y-1.5">
                {lastGenerated.map((exo) => (
                  <div
                    key={exo.id}
                    className="flex items-center justify-between rounded-xl bg-white p-2.5 text-xs font-semibold text-slate-800 border border-emerald-100 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
                  >
                    <span className="truncate max-w-[280px] sm:max-w-xs">{exo.title}</span>
                    <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {exo.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/80 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/80">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
            Disponible en ligne (IA) et hors-ligne
          </div>

          <div className="flex items-center gap-2">
            {lastGenerated.length > 0 && (
              <button
                type="button"
                onClick={onClose}
                id="btn-see-generated-exercises"
                className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
              >
                Faire les exercices
              </button>
            )}

            <button
              type="button"
              disabled={isLoading || !currentChapter}
              onClick={handleGenerate}
              id="btn-submit-generate-exercise"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Génération en cours...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>
                    {lastGenerated.length > 0 ? 'Générer encore plus d’exos' : 'Générer maintenant'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

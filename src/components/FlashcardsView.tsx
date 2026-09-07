import React, { useState } from 'react';
import { Flashcard, LyceeLevel, Chapter } from '../types';
import {
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Award,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FlashcardsViewProps {
  cards: Flashcard[];
  chapters: Chapter[];
  currentLevel: LyceeLevel;
  onSelectLevel: (level: LyceeLevel) => void;
  selectedChapterId: string | 'all';
  onSelectChapterId: (id: string | 'all') => void;
  onRecordReview: (cardId: string, ease: 'easy' | 'medium' | 'hard') => void;
  onAskAI: (prompt: string) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  cards,
  chapters,
  currentLevel,
  onSelectLevel,
  selectedChapterId,
  onSelectChapterId,
  onRecordReview,
  onAskAI,
}) => {
  // Filter cards based on current level and optionally selected chapter
  const filteredCards = cards.filter((c) => {
    if (c.level !== currentLevel) return false;
    if (selectedChapterId !== 'all' && c.chapterId !== selectedChapterId) return false;
    return true;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<Record<string, 'easy' | 'medium' | 'hard'>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentCard = filteredCards[currentIndex];
  const progressPercent =
    filteredCards.length > 0
      ? Math.round((Object.keys(reviewedCards).length / filteredCards.length) * 100)
      : 0;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRating = (ease: 'easy' | 'medium' | 'hard') => {
    if (!currentCard) return;

    onRecordReview(currentCard.id, ease);
    const updatedReviews = { ...reviewedCards, [currentCard.id]: ease };
    setReviewedCards(updatedReviews);

    // If last card
    if (currentIndex >= filteredCards.length - 1) {
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setIsFlipped(false);
      setShowHint(false);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
    setReviewedCards({});
    setIsCompleted(false);
  };

  const levelChapters = chapters.filter((ch) => ch.level === currentLevel);

  return (
    <div className="mx-auto max-w-3xl pb-12">
      {/* Header controls: Level & Chapter filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-500" />
            Flashcards de Révision Rapide
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Formules fondamentales, définitions et théorèmes du programme officiel.
          </p>
        </div>

        {/* Level and Chapter filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedChapterId}
            onChange={(e) => {
              onSelectChapterId(e.target.value);
              handleReset();
            }}
            id="flashcard-chapter-select"
            className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">Tous les chapitres ({currentLevel})</option>
            {levelChapters.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.shortCode} - {ch.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
          <span>
            Carte {filteredCards.length > 0 ? currentIndex + 1 : 0} sur {filteredCards.length}
          </span>
          <span className="text-emerald-600 dark:text-emerald-400">
            {progressPercent}% complété
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <BookOpen className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-slate-200">
            Aucune carte trouvée pour ce filtre
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Sélectionnez "Tous les chapitres" ou basculez vers un autre niveau.
          </p>
          <button
            onClick={() => onSelectChapterId('all')}
            className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
          >
            Réinitialiser le filtre
          </button>
        </div>
      ) : isCompleted ? (
        /* Completion screen */
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-8 text-center shadow-lg dark:border-emerald-900 dark:bg-emerald-950/20 animate-in zoom-in-95 duration-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
            <Award className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">
            Session Terminée ! Bravo !
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Tu as révisé l'ensemble des {filteredCards.length} cartes sélectionnées.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleReset}
              id="btn-restart-deck"
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 transition"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Recommencer cette pile</span>
            </button>
            <button
              onClick={() =>
                onAskAI(
                  `Fais-moi un quiz rapide de 3 questions courtes pour tester mes connaissances sur le programme de ${currentLevel}.`
                )
              }
              id="btn-quiz-ai"
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 transition"
            >
              <Sparkles className="h-4 w-4" />
              <span>Quiz avec l'IA</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Flashcard */
        <div>
          <div
            onClick={handleFlip}
            id="flashcard-card"
            className="group relative flex min-h-[300px] sm:min-h-[340px] cursor-pointer flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 select-none"
          >
            {/* Top info badge */}
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300 uppercase tracking-wider">
                {isFlipped ? 'Réponse / Démonstration' : 'Question / Théorème'}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Cliquer pour retourner
              </span>
            </div>

            {/* Middle body */}
            <div className="my-auto py-4 text-center">
              {!isFlipped ? (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                    {currentCard.front}
                  </h3>
                  {currentCard.formulaSnippet && (
                    <div className="inline-block rounded-xl bg-emerald-50 px-4 py-2 font-mono text-sm font-bold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-300">
                      {currentCard.formulaSnippet}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100 whitespace-pre-line leading-relaxed text-left">
                    {currentCard.back}
                  </div>

                  {currentCard.tip && (
                    <div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-left text-xs font-medium text-amber-900 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-200">
                      <Lightbulb className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                      <span>{currentCard.tip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom hint or flip hint */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
              {currentCard.hint ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHint(!showHint);
                  }}
                  id="btn-flashcard-hint"
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>{showHint ? 'Masquer l\'indice' : 'Voir un indice'}</span>
                </button>
              ) : (
                <div />
              )}

              <span className="text-[11px] font-medium text-slate-400">
                {isFlipped ? 'Évaluez votre maîtrise ci-dessous' : 'Espace ou clic pour tourner'}
              </span>
            </div>
          </div>

          {/* Hint disclosure */}
          {showHint && currentCard.hint && (
            <div className="mt-2.5 rounded-2xl bg-indigo-50/80 p-3.5 text-xs text-indigo-900 border border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-900 dark:text-indigo-200 animate-in fade-in">
              <span className="font-bold">Indice : </span>
              {currentCard.hint}
            </div>
          )}

          {/* Rating / Navigation controls */}
          <div className="mt-5">
            {isFlipped ? (
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                <button
                  onClick={() => handleRating('hard')}
                  id="rating-hard-btn"
                  className="flex flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 p-3 text-rose-800 font-bold text-xs sm:text-sm hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300 dark:hover:bg-rose-900/50 transition active:scale-95"
                >
                  <span>À revoir</span>
                  <span className="text-[10px] font-normal opacity-80">Difficile</span>
                </button>

                <button
                  onClick={() => handleRating('medium')}
                  id="rating-medium-btn"
                  className="flex flex-col items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 p-3 text-amber-800 font-bold text-xs sm:text-sm hover:bg-amber-100 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300 dark:hover:bg-amber-900/50 transition active:scale-95"
                >
                  <span>Moyen</span>
                  <span className="text-[10px] font-normal opacity-80">En cours</span>
                </button>

                <button
                  onClick={() => handleRating('easy')}
                  id="rating-easy-btn"
                  className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-800 font-bold text-xs sm:text-sm hover:bg-emerald-100 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 transition active:scale-95"
                >
                  <span>Maîtrisé !</span>
                  <span className="text-[10px] font-normal opacity-80">Facile</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    if (currentIndex > 0) {
                      setCurrentIndex((prev) => prev - 1);
                      setIsFlipped(false);
                      setShowHint(false);
                    }
                  }}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </button>

                <button
                  onClick={handleFlip}
                  id="btn-show-answer"
                  className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition active:scale-95"
                >
                  Afficher la Réponse
                </button>

                <button
                  onClick={() => {
                    if (currentIndex < filteredCards.length - 1) {
                      setCurrentIndex((prev) => prev + 1);
                      setIsFlipped(false);
                      setShowHint(false);
                    }
                  }}
                  disabled={currentIndex >= filteredCards.length - 1}
                  className="flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

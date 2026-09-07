import React, { useState } from 'react';
import { Exercise, LyceeLevel, Chapter, ExerciseRecord } from '../types';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  HelpCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  PlusCircle,
  Trash2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExercisesViewProps {
  exercises: Exercise[];
  chapters: Chapter[];
  currentLevel: LyceeLevel;
  onSelectLevel: (level: LyceeLevel) => void;
  selectedChapterId: string | 'all';
  onSelectChapterId: (id: string | 'all') => void;
  exerciseHistory: Record<string, ExerciseRecord>;
  onRecordResult: (exerciseId: string, isCorrect: boolean) => void;
  onAskAI: (prompt: string) => void;
  onOpenGenerateModal: (chapterId?: string) => void;
  onDeleteCustomExercise?: (exerciseId: string) => void;
}

export const ExercisesView: React.FC<ExercisesViewProps> = ({
  exercises,
  chapters,
  currentLevel,
  selectedChapterId,
  onSelectChapterId,
  exerciseHistory,
  onRecordResult,
  onAskAI,
  onOpenGenerateModal,
  onDeleteCustomExercise,
}) => {
  const filteredExercises = exercises.filter((exo) => {
    if (exo.level !== currentLevel) return false;
    if (selectedChapterId !== 'all' && exo.chapterId !== selectedChapterId) return false;
    return true;
  });

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedExercises, setSubmittedExercises] = useState<Record<string, boolean>>({});
  const [showSteps, setShowSteps] = useState<Record<string, boolean>>({});

  const levelChapters = chapters.filter((ch) => ch.level === currentLevel);

  const handleSelectOption = (exerciseId: string, optionIndex: number) => {
    if (submittedExercises[exerciseId]) return; // locked once submitted
    setSelectedAnswers((prev) => ({ ...prev, [exerciseId]: optionIndex }));
  };

  const handleVerify = (exo: Exercise) => {
    const chosen = selectedAnswers[exo.id];
    if (chosen === undefined) return;

    const isCorrect = chosen === exo.correctOptionIndex;
    setSubmittedExercises((prev) => ({ ...prev, [exo.id]: true }));
    onRecordResult(exo.id, isCorrect);

    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleRetry = (exerciseId: string) => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[exerciseId];
      return next;
    });
    setSubmittedExercises((prev) => {
      const next = { ...prev };
      delete next[exerciseId];
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-4xl pb-12">
      {/* View Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-600 text-white font-mono text-sm">
              ✓
            </span>
            Exercices Interactifs & Entraînement Quotidien
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Exercices types baccalauréat et contrôles continus avec corrections détaillées.
          </p>
        </div>

        {/* Filter */}
        <div>
          <select
            value={selectedChapterId}
            onChange={(e) => onSelectChapterId(e.target.value)}
            id="exercise-chapter-select"
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

      {/* Exercise Generation Banner */}
      <div className="mb-6 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-purple-50/50 p-4 sm:p-5 dark:border-blue-900/50 dark:bg-slate-900/80 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              Générer des exercices avec correction (illimité)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Créez autant d'exercices inédits que vous le souhaitez pour chaque chapitre avec résolution rédigée pas à pas.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenGenerateModal(selectedChapterId !== 'all' ? selectedChapterId : undefined)}
          id="btn-open-exercise-generator"
          className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition shrink-0"
        >
          <Sparkles className="h-4 w-4" />
          <span>Générer un nouvel exercice</span>
        </button>
      </div>

      {filteredExercises.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <BookOpen className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-slate-200">
            Aucun exercice pour ce filtre
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Sélectionnez un autre chapitre ou générez immédiatement un nouvel exercice pour ce chapitre !
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => onOpenGenerateModal(selectedChapterId !== 'all' ? selectedChapterId : undefined)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Générer un exercice pour ce chapitre</span>
            </button>
            <button
              onClick={() => onSelectChapterId('all')}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
            >
              Afficher tous les exercices
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredExercises.map((exo, index) => {
            const isSubmitted = submittedExercises[exo.id];
            const chosen = selectedAnswers[exo.id];
            const isCorrect = isSubmitted && chosen === exo.correctOptionIndex;
            const record = exerciseHistory[exo.id];
            const showStepsForExo = showSteps[exo.id];

            return (
              <div
                key={exo.id}
                id={`exercise-box-${exo.id}`}
                className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition"
              >
                {/* Exercise Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {index + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {exo.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {exo.isAiGenerated && (
                      <span className="flex items-center gap-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 px-2.5 py-0.5 text-[11px] font-semibold">
                        <Sparkles className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                        Généré sur mesure
                      </span>
                    )}

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        exo.difficulty === 'Facile'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : exo.difficulty === 'Moyen'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}
                    >
                      {exo.difficulty}
                    </span>

                    {record?.completed && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                        <CheckCircle2 className="h-3 w-3" />
                        Déjà réussi
                      </span>
                    )}

                    {exo.isAiGenerated && onDeleteCustomExercise && (
                      <button
                        onClick={() => onDeleteCustomExercise(exo.id)}
                        title="Supprimer cet exercice généré"
                        id={`btn-delete-exo-${exo.id}`}
                        className="flex h-6 w-6 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                    {exo.problem}
                  </p>

                  {exo.formula && (
                    <div className="my-3 rounded-2xl bg-slate-50 p-3.5 text-center font-mono text-sm font-bold text-emerald-800 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700 dark:text-emerald-300">
                      {exo.formula}
                    </div>
                  )}
                </div>

                {/* Multiple Choice Options */}
                <div className="mt-4 space-y-2.5">
                  {exo.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    let optionStyle =
                      'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200';

                    if (isSubmitted) {
                      if (optIdx === exo.correctOptionIndex) {
                        optionStyle =
                          'border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-200 font-bold';
                      } else if (isSelected && optIdx !== exo.correctOptionIndex) {
                        optionStyle =
                          'border-rose-500 bg-rose-50 text-rose-900 dark:border-rose-500 dark:bg-rose-950/40 dark:text-rose-200 line-through';
                      } else {
                        optionStyle =
                          'opacity-40 border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40';
                      }
                    } else if (isSelected) {
                      optionStyle =
                        'border-blue-600 bg-blue-50/60 text-blue-900 dark:border-blue-500 dark:bg-blue-950/30 dark:text-blue-200 font-bold';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(exo.id, optIdx)}
                        id={`option-${exo.id}-${optIdx}`}
                        className={`w-full flex items-center justify-between rounded-2xl border p-3.5 text-left text-xs sm:text-sm transition ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-bold">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isSubmitted && optIdx === exo.correctOptionIndex && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        )}
                        {isSubmitted && isSelected && optIdx !== exo.correctOptionIndex && (
                          <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Verification Action Bar */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    {!isSubmitted ? (
                      <button
                        disabled={chosen === undefined}
                        onClick={() => handleVerify(exo)}
                        id={`btn-verify-${exo.id}`}
                        className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 disabled:opacity-40 transition active:scale-95"
                      >
                        Vérifier ma réponse
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRetry(exo.id)}
                        id={`btn-retry-${exo.id}`}
                        className="flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Recommencer
                      </button>
                    )}

                    {isSubmitted && (
                      <button
                        onClick={() =>
                          setShowSteps((prev) => ({ ...prev, [exo.id]: !prev[exo.id] }))
                        }
                        id={`btn-steps-${exo.id}`}
                        className="flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                      >
                        <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                        <span>
                          {showStepsForExo
                            ? 'Masquer la résolution détaillée'
                            : 'Voir la résolution pas à pas'}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Ask AI Tutor */}
                  <button
                    onClick={() =>
                      onAskAI(
                        `Peux-tu m'expliquer pas à pas cet exercice de maths : "${exo.problem}" (Formule : ${exo.formula}) et pourquoi la bonne réponse est "${exo.options[exo.correctOptionIndex]}" ?`
                      )
                    }
                    id={`btn-ask-ai-exo-${exo.id}`}
                    className="flex items-center gap-1 rounded-xl bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 transition"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>Demander au tuteur IA</span>
                  </button>
                </div>

                {/* Explanation Box on Submission */}
                {isSubmitted && (
                  <div className="mt-4 space-y-3 animate-in fade-in duration-200">
                    <div
                      className={`rounded-2xl p-4 border text-xs sm:text-sm ${
                        isCorrect
                          ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200'
                          : 'border-rose-200 bg-rose-50/70 text-rose-950 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5 text-sm mb-1">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            Excellente réponse !
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-rose-600" />
                            Réponse inexacte
                          </>
                        )}
                      </div>
                      <p>{exo.explanation}</p>
                    </div>

                    {/* Step by step details */}
                    {showStepsForExo && exo.stepByStep && (
                      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/40 text-xs sm:text-sm">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
                          <TrendingUp className="h-4 w-4 text-purple-600" />
                          Résolution pas à pas rédigée :
                        </div>
                        <ol className="space-y-1.5 list-none">
                          {exo.stepByStep.map((st, sIdx) => (
                            <li
                              key={sIdx}
                              className="rounded-xl bg-white p-2.5 font-medium text-slate-800 border border-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
                            >
                              {st}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Trap warning */}
                    {exo.trapWarning && (
                      <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                        <div>
                          <span className="font-bold">Piège classique à éviter : </span>
                          <span>{exo.trapWarning}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

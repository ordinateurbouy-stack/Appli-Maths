import React, { useState, useEffect } from 'react';
import {
  Chapter,
  LyceeLevel,
  MathDomain,
  UserProgress,
  StudyReminderSettings,
  Exercise,
} from './types';
import { CHAPTERS_DATA } from './data/chapters';
import { COURSES_DATA } from './data/courses';
import { FLASHCARDS_DATA } from './data/flashcards';
import { EXERCISES_DATA } from './data/exercises';
import {
  loadUserProgress,
  saveUserProgress,
  toggleChapterCompletion,
  recordExerciseResult,
  recordFlashcardReview,
  addChatMessage,
  clearChatHistory,
  setActiveLevel,
  updateStudyReminder,
  addCustomExercises,
  deleteCustomExercise,
} from './services/storage';

import { Navbar } from './components/Navbar';
import { LevelSelector } from './components/LevelSelector';
import { ChapterCard } from './components/ChapterCard';
import { CourseSheetModal } from './components/CourseSheetModal';
import { FlashcardsView } from './components/FlashcardsView';
import { ExercisesView } from './components/ExercisesView';
import { AITutorView } from './components/AITutorView';
import { ProgressDashboard } from './components/ProgressDashboard';
import { StudyReminderModal } from './components/StudyReminderModal';
import { PlayStoreInfoModal } from './components/PlayStoreInfoModal';
import { GenerateExerciseModal } from './components/GenerateExerciseModal';

import {
  Search,
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  Filter,
  Flame,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

export default function App() {
  // Dark mode setup
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('maths_lycee_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('maths_lycee_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('maths_lycee_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // User progress
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());

  // Active level & Tab
  const [currentLevel, setCurrentLevel] = useState<LyceeLevel>(progress.activeLevel || 'premiere');
  const [activeTab, setActiveTab] = useState<
    'chapters' | 'flashcards' | 'exercises' | 'ai-tutor' | 'progress'
  >('chapters');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<MathDomain | 'all'>('all');

  // Modals & Sub-filters
  const [selectedCourseChapter, setSelectedCourseChapter] = useState<Chapter | null>(null);
  const [selectedFlashcardChapterId, setSelectedFlashcardChapterId] = useState<string | 'all'>('all');
  const [selectedExerciseChapterId, setSelectedExerciseChapterId] = useState<string | 'all'>('all');
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isPlayStoreModalOpen, setIsPlayStoreModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [generateModalChapterId, setGenerateModalChapterId] = useState<string | undefined>(undefined);
  const [aiExternalPrompt, setAiExternalPrompt] = useState<string | undefined>(undefined);

  // Combined exercises (built-in + unlimited custom generated ones)
  const allExercises = [
    ...(progress.customExercises || []),
    ...EXERCISES_DATA,
  ];

  // Open generator modal
  const handleOpenGenerateModal = (chapterId?: string) => {
    setGenerateModalChapterId(chapterId);
    setIsGenerateModalOpen(true);
  };

  // Add generated exercises to user progress and redirect to exercise view
  const handleExercisesGenerated = (newExercises: Exercise[], targetChapterId: string) => {
    setProgress((prev) => addCustomExercises(prev, newExercises));
    setSelectedExerciseChapterId(targetChapterId);
    setActiveTab('exercises');
  };

  // Delete custom generated exercise
  const handleDeleteCustomExercise = (exerciseId: string) => {
    setProgress((prev) => deleteCustomExercise(prev, exerciseId));
  };

  // Sync active level
  const handleSelectLevel = (lvl: LyceeLevel) => {
    setCurrentLevel(lvl);
    setProgress((prev) => setActiveLevel(prev, lvl));
    setSelectedFlashcardChapterId('all');
    setSelectedExerciseChapterId('all');
  };

  // Chapter completion toggle
  const handleToggleCompletion = (chapterId: string) => {
    setProgress((prev) => toggleChapterCompletion(prev, chapterId));
  };

  // Record Exercise
  const handleRecordExerciseResult = (exerciseId: string, isCorrect: boolean) => {
    setProgress((prev) => recordExerciseResult(prev, exerciseId, isCorrect));
  };

  // Record Flashcard review
  const handleRecordFlashcardReview = (cardId: string, ease: 'easy' | 'medium' | 'hard') => {
    setProgress((prev) => recordFlashcardReview(prev, cardId, ease));
  };

  // Ask AI handler
  const handleAskAI = (chapter?: Chapter, initialPrompt?: string) => {
    if (initialPrompt) {
      setAiExternalPrompt(initialPrompt);
    } else if (chapter) {
      setAiExternalPrompt(
        `Bonjour ! Peux-tu m'expliquer les points clés du chapitre "${chapter.title}" (${chapter.level}) et me donner un exemple concret avec pièges fréquents ?`
      );
    }
    setActiveTab('ai-tutor');
  };

  // Send message to AI via /api/chat
  const handleSendMessage = async (
    content: string,
    level: LyceeLevel,
    chapterContext?: string
  ) => {
    // 1. Add user message locally
    setProgress((prev) =>
      addChatMessage(prev, {
        role: 'user',
        content,
      })
    );

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          level,
          chapter: chapterContext,
          chapterContext,
          history: (progress.chatSessions || []).slice(-6).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch {
        // Response was not JSON
      }

      if (!response.ok) {
        if (data?.answer) {
          setProgress((prev) =>
            addChatMessage(prev, {
              role: 'assistant',
              content: data.answer,
            })
          );
          return;
        }

        if (response.status === 404) {
          throw new Error("L'endpoint /api/chat est introuvable (Erreur 404). Vérifiez la configuration Vercel.");
        }

        if (response.status === 503 || data?.error?.includes('GEMINI_API_KEY')) {
          throw new Error("La clé GEMINI_API_KEY n'est pas encore configurée dans les paramètres de votre projet Vercel (Settings > Environment Variables).");
        }

        throw new Error(data?.error || `Erreur du serveur (${response.status})`);
      }

      const reply =
        data?.reply ||
        'Désolé, je n\'ai pas pu traiter votre demande pour le moment. Veuillez réessayer.';

      // 2. Add assistant message locally
      setProgress((prev) =>
        addChatMessage(prev, {
          role: 'assistant',
          content: reply,
        })
      );
    } catch (error: any) {
      console.error('Erreur API Chat:', error);
      const errorMessage =
        error?.message && !error.message.includes('Failed to fetch')
          ? error.message
          : 'Une erreur est survenue lors de la communication avec le tuteur. Vérifiez que la variable GEMINI_API_KEY est bien configurée sur Vercel et que votre connexion internet est active.';

      setProgress((prev) =>
        addChatMessage(prev, {
          role: 'assistant',
          content: errorMessage,
        })
      );
    }
  };

  const handleClearChat = () => {
    setProgress((prev) => clearChatHistory(prev));
  };

  const handleSaveReminderSettings = (settings: StudyReminderSettings) => {
    setProgress((prev) => updateStudyReminder(prev, settings));
  };

  const handleResetProgress = () => {
    localStorage.removeItem('maths_lycee_user_progress_v1');
    const fresh = loadUserProgress();
    setProgress(fresh);
  };

  const handleImportProgress = (json: string) => {
    const parsed = JSON.parse(json);
    saveUserProgress(parsed);
    setProgress(parsed);
  };

  // Filtered chapters
  const filteredChapters = CHAPTERS_DATA.filter((ch) => {
    if (ch.level !== currentLevel) return false;
    if (selectedDomain !== 'all' && ch.domain !== selectedDomain) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ch.title.toLowerCase().includes(q) ||
        ch.description.toLowerCase().includes(q) ||
        ch.shortCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const levelTotalChapters = CHAPTERS_DATA.filter((c) => c.level === currentLevel).length;
  const levelCompletedChapters = CHAPTERS_DATA.filter(
    (c) => c.level === currentLevel && progress.completedChapters.includes(c.id)
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 flex flex-col justify-between">
      <div>
        {/* Navbar */}
        <Navbar
          currentLevel={currentLevel}
          onSelectLevel={handleSelectLevel}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          onOpenReminderModal={() => setIsReminderModalOpen(true)}
          onOpenPlayStoreModal={() => setIsPlayStoreModalOpen(true)}
          streak={progress.streak}
        />

        {/* Main Body */}
        <main className="mx-auto max-w-7xl px-3 py-6 sm:px-6">
          {/* TAB 1: Chapters & Courses */}
          {activeTab === 'chapters' && (
            <div>
              {/* Level Segmented Header */}
              <LevelSelector
                currentLevel={currentLevel}
                onSelectLevel={handleSelectLevel}
                totalChapters={levelTotalChapters}
                completedChaptersCount={levelCompletedChapters}
              />

              {/* Search & Domain Filter Bar */}
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un chapitre, une formule (ex: second degré, ln, TVI)..."
                    id="search-chapters-input"
                    className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 shadow-2xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Domain Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  <button
                    onClick={() => setSelectedDomain('all')}
                    id="domain-filter-all"
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                      selectedDomain === 'all'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'
                    }`}
                  >
                    Tous les domaines
                  </button>
                  <button
                    onClick={() => setSelectedDomain('analyse')}
                    id="domain-filter-analyse"
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                      selectedDomain === 'analyse'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'
                    }`}
                  >
                    Analyse
                  </button>
                  <button
                    onClick={() => setSelectedDomain('algebre')}
                    id="domain-filter-algebre"
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                      selectedDomain === 'algebre'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'
                    }`}
                  >
                    Algèbre
                  </button>
                  <button
                    onClick={() => setSelectedDomain('geometrie')}
                    id="domain-filter-geometrie"
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                      selectedDomain === 'geometrie'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'
                    }`}
                  >
                    Géométrie
                  </button>
                  <button
                    onClick={() => setSelectedDomain('probabilites')}
                    id="domain-filter-probabilites"
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                      selectedDomain === 'probabilites'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'
                    }`}
                  >
                    Probabilités
                  </button>
                </div>
              </div>

              {/* Chapters Grid */}
              {filteredChapters.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <Search className="mx-auto h-12 w-12 text-slate-400" />
                  <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-slate-200">
                    Aucun chapitre ne correspond à votre recherche
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Essayez d'effacer les filtres ou de chercher un autre mot-clé.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDomain('all');
                    }}
                    className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    Réinitialiser la recherche
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredChapters.map((chapter) => {
                    const isCompleted = progress.completedChapters.includes(chapter.id);
                    const flashcardsCount = FLASHCARDS_DATA.filter(
                      (f) => f.chapterId === chapter.id
                    ).length;
                    const exercisesCount = allExercises.filter(
                      (e) => e.chapterId === chapter.id
                    ).length;

                    return (
                      <ChapterCard
                        key={chapter.id}
                        chapter={chapter}
                        isCompleted={isCompleted}
                        onToggleCompletion={handleToggleCompletion}
                        onOpenCourse={(ch) => setSelectedCourseChapter(ch)}
                        onOpenFlashcards={(chId) => {
                          setSelectedFlashcardChapterId(chId);
                          setActiveTab('flashcards');
                        }}
                        onOpenExercises={(chId) => {
                          setSelectedExerciseChapterId(chId);
                          setActiveTab('exercises');
                        }}
                        onAskAI={(ch) => handleAskAI(ch)}
                        onGenerateExercises={handleOpenGenerateModal}
                        flashcardsCount={flashcardsCount}
                        exercisesCount={exercisesCount}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Flashcards View */}
          {activeTab === 'flashcards' && (
            <FlashcardsView
              cards={FLASHCARDS_DATA}
              chapters={CHAPTERS_DATA}
              currentLevel={currentLevel}
              onSelectLevel={handleSelectLevel}
              selectedChapterId={selectedFlashcardChapterId}
              onSelectChapterId={setSelectedFlashcardChapterId}
              onRecordReview={handleRecordFlashcardReview}
              onAskAI={(prompt) => {
                setAiExternalPrompt(prompt);
                setActiveTab('ai-tutor');
              }}
            />
          )}

          {/* TAB 3: Exercises View */}
          {activeTab === 'exercises' && (
            <ExercisesView
              exercises={allExercises}
              chapters={CHAPTERS_DATA}
              currentLevel={currentLevel}
              onSelectLevel={handleSelectLevel}
              selectedChapterId={selectedExerciseChapterId}
              onSelectChapterId={setSelectedExerciseChapterId}
              exerciseHistory={progress.exerciseHistory}
              onRecordResult={handleRecordExerciseResult}
              onAskAI={(prompt) => {
                setAiExternalPrompt(prompt);
                setActiveTab('ai-tutor');
              }}
              onOpenGenerateModal={handleOpenGenerateModal}
              onDeleteCustomExercise={handleDeleteCustomExercise}
            />
          )}

          {/* TAB 4: AI Tutor View */}
          {activeTab === 'ai-tutor' && (
            <AITutorView
              messages={progress.chatSessions}
              onSendMessage={handleSendMessage}
              onClearChat={handleClearChat}
              currentLevel={currentLevel}
              activeChapter={
                selectedCourseChapter
                  ? selectedCourseChapter
                  : CHAPTERS_DATA.find((c) => c.level === currentLevel)
              }
              externalPrompt={aiExternalPrompt}
              onClearExternalPrompt={() => setAiExternalPrompt(undefined)}
            />
          )}

          {/* TAB 5: Progress Dashboard */}
          {activeTab === 'progress' && (
            <ProgressDashboard
              progress={progress}
              chapters={CHAPTERS_DATA}
              onResetProgress={handleResetProgress}
              onImportProgress={handleImportProgress}
            />
          )}
        </main>
      </div>

      {/* Course Sheet Modal */}
      {selectedCourseChapter && (
        <CourseSheetModal
          chapter={selectedCourseChapter}
          course={COURSES_DATA[selectedCourseChapter.id]}
          onClose={() => setSelectedCourseChapter(null)}
          onOpenFlashcards={(chId) => {
            setSelectedCourseChapter(null);
            setSelectedFlashcardChapterId(chId);
            setActiveTab('flashcards');
          }}
          onOpenExercises={(chId) => {
            setSelectedCourseChapter(null);
            setSelectedExerciseChapterId(chId);
            setActiveTab('exercises');
          }}
          onAskAI={(ch, prompt) => {
            setSelectedCourseChapter(null);
            handleAskAI(ch, prompt);
          }}
          onGenerateExercises={(chId) => {
            setSelectedCourseChapter(null);
            handleOpenGenerateModal(chId);
          }}
        />
      )}

      {/* Generate Exercise Modal (Unlimited exercises with step-by-step correction) */}
      <GenerateExerciseModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        chapters={CHAPTERS_DATA}
        currentLevel={currentLevel}
        defaultChapterId={generateModalChapterId}
        onExerciseGenerated={handleExercisesGenerated}
      />

      {/* Study Reminder Modal */}
      {isReminderModalOpen && (
        <StudyReminderModal
          settings={progress.studyReminder}
          onSaveSettings={handleSaveReminderSettings}
          onClose={() => setIsReminderModalOpen(false)}
        />
      )}

      {/* Play Store Info Modal */}
      {isPlayStoreModalOpen && (
        <PlayStoreInfoModal onClose={() => setIsPlayStoreModalOpen(false)} />
      )}

      {/* App Footer */}
      <footer className="mt-8 border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500 dark:border-slate-800/80 dark:bg-slate-900 dark:text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
              ∑ Maths Lycée
            </span>
            <span>• Programme officiel 2nde, 1ère, Terminale Spécialité</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlayStoreModalOpen(true)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              Publication Google Play Store (PWA / TWA)
            </button>
            <span>•</span>
            <button
              onClick={() => setIsReminderModalOpen(true)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              Rappels quotidiens
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

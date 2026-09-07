import { UserProgress, LyceeLevel, ExerciseRecord, FlashcardRecord, ChatMessage, Exercise } from '../types';

const STORAGE_KEY = 'maths_lycee_user_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedChapters: ['sec-nombres-calculs'],
  exerciseHistory: {},
  flashcardReviews: {},
  chatSessions: [
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: 'Bonjour ! Je suis ton tuteur de mathématiques pour le lycée. Tu as une question sur un théorème, un exercice ou une méthode (Seconde, Première, Terminale) ? Pose-la moi !',
      timestamp: new Date().toISOString(),
    },
  ],
  studyReminder: {
    enabled: false,
    time: '18:30',
  },
  unlockedBadges: ['first-step'],
  activeLevel: 'premiere',
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveUserProgress(DEFAULT_PROGRESS);
      return DEFAULT_PROGRESS;
    }
    const parsed = JSON.parse(raw);
    return updateStreakIfNeeded(parsed);
  } catch (e) {
    console.error('Erreur lecture localStorage:', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Erreur sauvegarde localStorage:', e);
  }
}

function updateStreakIfNeeded(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const lastActive = progress.lastActiveDate;

  if (lastActive === today) {
    return progress;
  }

  // Calculate day difference
  const todayDate = new Date(today);
  const lastDate = new Date(lastActive);
  const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let newStreak = progress.streak;
  if (diffDays === 1) {
    // Consecutive day!
    newStreak += 1;
  } else if (diffDays > 1) {
    // Streak broken
    newStreak = 1;
  }

  const updated: UserProgress = {
    ...progress,
    streak: newStreak,
    lastActiveDate: today,
  };

  // Check streak badge
  if (newStreak >= 3 && !updated.unlockedBadges.includes('streak-3')) {
    updated.unlockedBadges.push('streak-3');
  }

  saveUserProgress(updated);
  return updated;
}

export function recordExerciseResult(
  current: UserProgress,
  exerciseId: string,
  isCorrect: boolean
): UserProgress {
  const existing = current.exerciseHistory[exerciseId] || {
    completed: false,
    score: 0,
    attempts: 0,
    date: new Date().toISOString(),
  };

  const updatedRecord: ExerciseRecord = {
    completed: existing.completed || isCorrect,
    score: isCorrect ? Math.max(existing.score, 100) : existing.score,
    attempts: existing.attempts + 1,
    date: new Date().toISOString(),
  };

  const newHistory = {
    ...current.exerciseHistory,
    [exerciseId]: updatedRecord,
  };

  const newBadges = [...current.unlockedBadges];
  if (!newBadges.includes('first-step')) {
    newBadges.push('first-step');
  }

  // Check quiz ace (at least 3 exercises completed with 1 attempt and 100 score)
  const perfectExercises = Object.values(newHistory).filter(
    (e) => e.completed && e.attempts === 1
  );
  if (perfectExercises.length >= 3 && !newBadges.includes('quiz-ace')) {
    newBadges.push('quiz-ace');
  }

  const updated: UserProgress = {
    ...current,
    exerciseHistory: newHistory,
    unlockedBadges: newBadges,
  };

  saveUserProgress(updated);
  return updated;
}

export function recordFlashcardReview(
  current: UserProgress,
  cardId: string,
  ease: 'easy' | 'medium' | 'hard'
): UserProgress {
  const existing = current.flashcardReviews[cardId] || {
    ease: 'medium',
    reviewsCount: 0,
    lastReviewed: new Date().toISOString(),
  };

  const updatedRecord: FlashcardRecord = {
    ease,
    reviewsCount: existing.reviewsCount + 1,
    lastReviewed: new Date().toISOString(),
  };

  const newReviews = {
    ...current.flashcardReviews,
    [cardId]: updatedRecord,
  };

  const newBadges = [...current.unlockedBadges];
  if (Object.keys(newReviews).length >= 5 && !newBadges.includes('flashcard-master')) {
    newBadges.push('flashcard-master');
  }

  const updated: UserProgress = {
    ...current,
    flashcardReviews: newReviews,
    unlockedBadges: newBadges,
  };

  saveUserProgress(updated);
  return updated;
}

export function toggleChapterCompletion(
  current: UserProgress,
  chapterId: string
): UserProgress {
  const exists = current.completedChapters.includes(chapterId);
  const newCompleted = exists
    ? current.completedChapters.filter((id) => id !== chapterId)
    : [...current.completedChapters, chapterId];

  const newBadges = [...current.unlockedBadges];
  if (chapterId.startsWith('term-') && !newBadges.includes('terminale-explorer')) {
    newBadges.push('terminale-explorer');
  }

  const updated: UserProgress = {
    ...current,
    completedChapters: newCompleted,
    unlockedBadges: newBadges,
  };

  saveUserProgress(updated);
  return updated;
}

export function addChatMessage(
  current: UserProgress,
  msg: Omit<ChatMessage, 'id' | 'timestamp'>
): UserProgress {
  const newMsg: ChatMessage = {
    id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    ...msg,
    timestamp: new Date().toISOString(),
  };

  const newBadges = [...current.unlockedBadges];
  if (!newBadges.includes('ai-scholar')) {
    newBadges.push('ai-scholar');
  }

  const updated: UserProgress = {
    ...current,
    chatSessions: [...current.chatSessions, newMsg],
    unlockedBadges: newBadges,
  };

  saveUserProgress(updated);
  return updated;
}

export function clearChatHistory(current: UserProgress): UserProgress {
  const updated: UserProgress = {
    ...current,
    chatSessions: [
      {
        id: 'welcome-msg',
        role: 'assistant',
        content: 'Conversation réinitialisée. Pose-moi une question sur le cours ou sur un exercice de maths !',
        timestamp: new Date().toISOString(),
      },
    ],
  };
  saveUserProgress(updated);
  return updated;
}

export function setActiveLevel(current: UserProgress, level: LyceeLevel): UserProgress {
  const updated = { ...current, activeLevel: level };
  saveUserProgress(updated);
  return updated;
}

export function updateStudyReminder(
  current: UserProgress,
  reminder: { enabled: boolean; time: string }
): UserProgress {
  const updated = { ...current, studyReminder: reminder };
  saveUserProgress(updated);
  return updated;
}

export function addCustomExercises(
  current: UserProgress,
  newExercises: Exercise[]
): UserProgress {
  const existing = current.customExercises || [];
  // Avoid duplicates by id
  const existingIds = new Set(existing.map((e) => e.id));
  const filteredNew = newExercises.filter((e) => !existingIds.has(e.id));

  const updated: UserProgress = {
    ...current,
    customExercises: [...filteredNew, ...existing],
  };

  saveUserProgress(updated);
  return updated;
}

export function deleteCustomExercise(
  current: UserProgress,
  exerciseId: string
): UserProgress {
  const existing = current.customExercises || [];
  const updated: UserProgress = {
    ...current,
    customExercises: existing.filter((e) => e.id !== exerciseId),
  };
  saveUserProgress(updated);
  return updated;
}

export function clearCustomExercises(
  current: UserProgress,
  chapterId?: string
): UserProgress {
  const existing = current.customExercises || [];
  const updated: UserProgress = {
    ...current,
    customExercises: chapterId
      ? existing.filter((e) => e.chapterId !== chapterId)
      : [],
  };
  saveUserProgress(updated);
  return updated;
}


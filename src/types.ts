export type LyceeLevel = 'seconde' | 'premiere' | 'terminale';

export type MathDomain = 'analyse' | 'algebre' | 'geometrie' | 'probabilites';

export interface Chapter {
  id: string;
  level: LyceeLevel;
  domain: MathDomain;
  title: string;
  shortCode: string;
  description: string;
  officialReference: string;
  iconName: string;
  order: number;
}

export interface CourseDefinition {
  term: string;
  definition: string;
  formula?: string;
  note?: string;
}

export interface CourseTheorem {
  name: string;
  statement: string;
  conditions?: string;
  remark?: string;
}

export interface CourseMethod {
  title: string;
  steps: string[];
  example: {
    problem: string;
    solution: string;
  };
}

export interface CourseNotion {
  title: string;
  subtitle?: string;
  content: string;
  keyPoints?: string[];
  formula?: string;
  example?: string;
}

export interface CourseSheet {
  chapterId: string;
  level: LyceeLevel;
  title: string;
  summary: string;
  notions?: CourseNotion[];
  keyDefinitions: CourseDefinition[];
  theorems: CourseTheorem[];
  methods: CourseMethod[];
  traps: string[];
  academicSources: string[];
}

export interface Flashcard {
  id: string;
  chapterId: string;
  level: LyceeLevel;
  front: string;
  back: string;
  formulaSnippet?: string;
  hint?: string;
  tip?: string;
}

export interface Exercise {
  id: string;
  chapterId: string;
  level: LyceeLevel;
  title: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  problem: string;
  formula?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  stepByStep: string[];
  trapWarning?: string;
  isAiGenerated?: boolean;
  createdAt?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface ExerciseRecord {
  completed: boolean;
  score: number;
  attempts: number;
  date: string;
}

export interface FlashcardRecord {
  ease: 'easy' | 'medium' | 'hard';
  reviewsCount: number;
  lastReviewed: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface StudyReminderSettings {
  enabled: boolean;
  time: string; // e.g. "18:30"
}

export interface UserProgress {
  streak: number;
  lastActiveDate: string;
  completedChapters: string[];
  exerciseHistory: Record<string, ExerciseRecord>;
  flashcardReviews: Record<string, FlashcardRecord>;
  chatSessions: ChatMessage[];
  studyReminder: StudyReminderSettings;
  unlockedBadges: string[];
  activeLevel: LyceeLevel;
  customExercises?: Exercise[];
}

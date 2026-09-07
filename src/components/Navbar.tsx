import React from 'react';
import { LyceeLevel } from '../types';
import {
  BookOpen,
  Moon,
  Sun,
  Download,
  Bell,
  Wifi,
  WifiOff,
  Flame,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface NavbarProps {
  currentLevel: LyceeLevel;
  onSelectLevel: (level: LyceeLevel) => void;
  activeTab: 'chapters' | 'flashcards' | 'exercises' | 'ai-tutor' | 'progress';
  onSelectTab: (tab: 'chapters' | 'flashcards' | 'exercises' | 'ai-tutor' | 'progress') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenReminderModal: () => void;
  onOpenPlayStoreModal: () => void;
  streak: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLevel,
  onSelectLevel,
  activeTab,
  onSelectTab,
  isDarkMode,
  onToggleDarkMode,
  onOpenReminderModal,
  onOpenPlayStoreModal,
  streak,
}) => {
  const { isInstallable, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/90 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => onSelectTab('chapters')}
            className="flex cursor-pointer items-center gap-2.5 transition hover:opacity-90"
            id="brand-logo-btn"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-500/20">
              <span className="font-mono text-xl font-black">∑</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                  Maths Lycée
                </span>
                <span className="hidden rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 sm:inline-block">
                  B.O. Officiel
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                2nde • 1ère • Terminale
              </p>
            </div>
          </div>
        </div>

        {/* Level Switcher (Pills) */}
        <div className="hidden md:flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => onSelectLevel('seconde')}
            id="nav-level-seconde"
            className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
              currentLevel === 'seconde'
                ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-300'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Seconde
          </button>
          <button
            onClick={() => onSelectLevel('premiere')}
            id="nav-level-premiere"
            className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
              currentLevel === 'premiere'
                ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-300'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            1ère Spécialité
          </button>
          <button
            onClick={() => onSelectLevel('terminale')}
            id="nav-level-terminale"
            className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
              currentLevel === 'terminale'
                ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-300'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Terminale Spé
          </button>
        </div>

        {/* Action icons & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Streak pill */}
          <button
            onClick={() => onSelectTab('progress')}
            id="nav-streak-pill"
            title="Série de travail quotidienne"
            className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 transition hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-300"
          >
            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{streak} j</span>
          </button>

          {/* Online/Offline Status Indicator */}
          <div
            title={isOnline ? 'En ligne' : 'Mode Hors-Ligne (Données locales prêtes)'}
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium transition ${
              isOnline
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
            }`}
          >
            {isOnline ? (
              <Wifi className="h-3 w-3" />
            ) : (
              <>
                <WifiOff className="h-3 w-3" />
                <span className="hidden sm:inline">Hors-Ligne</span>
              </>
            )}
          </div>

          {/* Play Store export guide */}
          <button
            onClick={onOpenPlayStoreModal}
            id="nav-playstore-btn"
            title="Comment publier sur Google Play Store"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition"
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          {/* Study Reminder Bell */}
          <button
            onClick={onOpenReminderModal}
            id="nav-reminder-btn"
            title="Rappels d'étude et notifications"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition"
          >
            <Bell className="h-4 w-4" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            id="nav-theme-toggle"
            title={isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* PWA Install Button if available */}
          {isInstallable && (
            <button
              onClick={install}
              id="nav-install-pwa-btn"
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition active:scale-95"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Installer</span>
            </button>
          )}

          {isIOS && (
            <button
              onClick={onOpenPlayStoreModal}
              id="nav-ios-install-btn"
              className="rounded-lg border border-slate-300 px-2 py-1 text-[11px] font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300"
            >
              Ajouter
            </button>
          )}
        </div>
      </div>

      {/* Navigation Sub-bar (Primary Views) */}
      <nav className="border-t border-slate-100 bg-slate-50/70 dark:border-slate-800/60 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-2 sm:px-6 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onSelectTab('chapters')}
              id="tab-chapters-btn"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === 'chapters'
                  ? 'bg-white text-emerald-700 shadow-xs dark:bg-slate-800 dark:text-emerald-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Chapitres & Cours</span>
            </button>

            <button
              onClick={() => onSelectTab('flashcards')}
              id="tab-flashcards-btn"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === 'flashcards'
                  ? 'bg-white text-emerald-700 shadow-xs dark:bg-slate-800 dark:text-emerald-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Flashcards</span>
            </button>

            <button
              onClick={() => onSelectTab('exercises')}
              id="tab-exercises-btn"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === 'exercises'
                  ? 'bg-white text-emerald-700 shadow-xs dark:bg-slate-800 dark:text-emerald-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                ✓
              </span>
              <span>Exercices Corrigés</span>
            </button>

            <button
              onClick={() => onSelectTab('ai-tutor')}
              id="tab-aitutor-btn"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === 'ai-tutor'
                  ? 'bg-white text-indigo-700 shadow-xs dark:bg-slate-800 dark:text-indigo-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>Tuteur IA</span>
            </button>

            <button
              onClick={() => onSelectTab('progress')}
              id="tab-progress-btn"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === 'progress'
                  ? 'bg-white text-emerald-700 shadow-xs dark:bg-slate-800 dark:text-emerald-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              <span>Mon Suivi</span>
            </button>
          </div>

          {/* Level Switcher on Mobile */}
          <div className="flex md:hidden items-center gap-1 pl-2">
            <select
              value={currentLevel}
              onChange={(e) => onSelectLevel(e.target.value as LyceeLevel)}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              id="mobile-level-select"
            >
              <option value="seconde">2nde</option>
              <option value="premiere">1ère Spé</option>
              <option value="terminale">Term Spé</option>
            </select>
          </div>
        </div>
      </nav>
    </header>
  );
};

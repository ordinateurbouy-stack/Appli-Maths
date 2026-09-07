import React, { useState } from 'react';
import { StudyReminderSettings } from '../types';
import {
  X,
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
  Flame,
  AlertCircle,
} from 'lucide-react';

interface StudyReminderModalProps {
  settings: StudyReminderSettings;
  onSaveSettings: (settings: StudyReminderSettings) => void;
  onClose: () => void;
}

export const StudyReminderModal: React.FC<StudyReminderModalProps> = ({
  settings,
  onSaveSettings,
  onClose,
}) => {
  const [enabled, setEnabled] = useState(settings.enabled);
  const [time, setTime] = useState(settings.time || '18:30');
  const [permissionState, setPermissionState] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  const handleRequestPermissionAndSave = async () => {
    if (typeof Notification !== 'undefined') {
      try {
        const result = await Notification.requestPermission();
        setPermissionState(result);
        if (result === 'granted') {
          onSaveSettings({ enabled: true, time });
          onClose();
        } else {
          onSaveSettings({ enabled: false, time });
        }
      } catch (e) {
        console.error('Erreur demande notification:', e);
        onSaveSettings({ enabled, time });
        onClose();
      }
    } else {
      onSaveSettings({ enabled, time });
      onClose();
    }
  };

  const handleSendTestNotification = () => {
    if (typeof Notification !== 'undefined') {
      if (Notification.permission === 'granted') {
        new Notification('🔔 Maths Lycée - Session d\'étude', {
          body: 'C\'est l\'heure de ton entraînement quotidien ! 5 minutes de révision pour garder ta flamme active 🔥',
          icon: '/pwa-192x192.png',
        });
        setTestNotificationSent(true);
        setTimeout(() => setTestNotificationSent(false), 4000);
      } else {
        Notification.requestPermission().then((res) => {
          setPermissionState(res);
          if (res === 'granted') {
            new Notification('🔔 Maths Lycée - Rappel activé', {
              body: 'Super ! Tes notifications de rappel de cours sont maintenant configurées.',
              icon: '/pwa-192x192.png',
            });
          }
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        id="study-reminder-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-xs">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Rappels de Session d'Étude
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Notifications push quotidiennes pour entretenir votre série
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-4">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Activer le rappel quotidien
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recevoir une notification push à l'heure sélectionnée
              </p>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="peer sr-only"
                id="toggle-reminder-checkbox"
              />
              <div className="peer h-6 w-11 rounded-full bg-slate-300 peer-checked:bg-emerald-600 peer-focus:outline-none dark:bg-slate-700 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
            </label>
          </div>

          {/* Time Picker */}
          <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800 space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Heure du rappel (conseillé : en fin d'après-midi ou début de soirée)
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white p-2.5 font-mono text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          {/* Tips for memory retention */}
          <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200/80 dark:bg-emerald-950/30 dark:border-emerald-900/40 text-xs text-emerald-950 dark:text-emerald-200 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-amber-500" />
              Le secret de la réussite en maths au lycée :
            </div>
            <p>
              10 à 15 minutes de révision quotidienne espacée (courbe d'Ebbinghaus) sont 3 fois plus
              efficaces qu'une séance de 3 heures la veille du contrôle !
            </p>
          </div>

          {/* Notification Permission Status */}
          {permissionState === 'denied' && (
            <div className="flex items-center gap-2 rounded-2xl bg-rose-50 p-3 text-xs font-medium text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>
                Les notifications sont bloquées par votre navigateur. Autorisez-les dans les
                paramètres de votre navigateur pour recevoir les rappels.
              </span>
            </div>
          )}

          {testNotificationSent && (
            <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-xs font-medium text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>Notification test envoyée avec succès !</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleSendTestNotification}
            id="btn-test-notification"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            Tester une notification
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              Annuler
            </button>
            <button
              onClick={handleRequestPermissionAndSave}
              id="btn-save-reminder"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

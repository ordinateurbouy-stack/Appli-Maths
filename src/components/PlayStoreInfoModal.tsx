import React from 'react';
import {
  X,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  Download,
  Terminal,
  ShieldCheck,
} from 'lucide-react';

interface PlayStoreInfoModalProps {
  onClose: () => void;
}

export const PlayStoreInfoModal: React.FC<PlayStoreInfoModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6"
        id="playstore-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Publication sur le Google Play Store
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Génération de l'APK / AAB via Trusted Web Activity (TWA)
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

        {/* Readiness Checklist */}
        <div className="rounded-2xl bg-emerald-50/70 p-4 border border-emerald-200/80 dark:bg-emerald-950/30 dark:border-emerald-900/40">
          <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5 mb-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Cette application est 100% prête pour le Play Store !
          </h4>
          <ul className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>
                <strong>Manifest PWA conforme :</strong> Icônes HD 192x192 & 512x512, maskable, nom court et couleurs de thème.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>
                <strong>Fonctionnement Hors-Ligne :</strong> Service Worker actif avec mise en cache des fiches, flashcards et exercices.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>
                <strong>Affichage Standalone immersif :</strong> Pas de barre d'adresse navigateur, comportement identique à une application native.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>
                <strong>Design Mobile & Mode Sombre :</strong> Ergonomie tactile avec cibles d'au moins 44px.
              </span>
            </li>
          </ul>
        </div>

        {/* Step-by-step methods */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Comment exporter le package Android (.aab / .apk) ?
          </h4>

          {/* Method 1: PWABuilder (Easiest) */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-900 dark:text-white">
                Méthode 1 (Recommandée & En 1 Clic) : PWABuilder
              </span>
              <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                Sans ligne de code
              </span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Déployez votre application ou récupérez l'URL publique de partage.</li>
              <li>Rendez-vous sur le site officiel <strong>pwabuilder.com</strong>.</li>
              <li>Entrez l'URL de votre application et cliquez sur <strong>Package for Store</strong>.</li>
              <li>Sélectionnez <strong>Google Play</strong> : PWABuilder génère le fichier <code>.aab</code> signé prêt à être uploadé sur la <strong>Google Play Console</strong>.</li>
            </ol>
          </div>

          {/* Method 2: Google Bubblewrap CLI (Advanced) */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-900 dark:text-white">
                Méthode 2 : Outil officiel Google (Bubblewrap CLI)
              </span>
              <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                CLI Google
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Bubblewrap est l'outil officiel en ligne de commande développé par les équipes Chrome de Google :
            </p>
            <div className="rounded-xl bg-slate-900 p-3 font-mono text-[11px] text-emerald-400 overflow-x-auto">
              <div>npm install -g @bubblewrap/cli</div>
              <div>bubblewrap init --manifest=https://mon-app.com/manifest.webmanifest</div>
              <div>bubblewrap build</div>
            </div>
          </div>
        </div>

        {/* Play Console Steps */}
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
          <div className="font-bold text-slate-800 dark:text-slate-200">
            Étapes finales sur la Google Play Console :
          </div>
          <p>1. Créez un compte développeur Google Play (frais unique de 25$).</p>
          <p>2. Créez une nouvelle fiche d'application "Maths Lycée : 2nde, 1ère, Terminale".</p>
          <p>3. Uploadez le fichier <code>.aab</code> généré dans la section Production.</p>
          <p>4. Complétez les captures d'écran et la description, puis soumettez pour publication !</p>
        </div>

        {/* Close button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

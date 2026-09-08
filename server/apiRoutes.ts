import { Router, Request, Response } from "express";
import { GoogleGenAI, Type } from "@google/genai";

export const apiRouter = Router();

// Lazy Gemini client getter
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Model fallback chain:
const TEXT_MODELS = [
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
];

async function generateWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
  }
) {
  let lastError: any = null;

  for (let i = 0; i < TEXT_MODELS.length; i++) {
    const model = TEXT_MODELS[i];
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      return { response, modelUsed: model };
    } catch (err: any) {
      lastError = err;
      const errMsg = String(err?.message || err);
      const isTransient =
        errMsg.includes("503") ||
        errMsg.includes("high demand") ||
        errMsg.includes("UNAVAILABLE") ||
        errMsg.includes("429") ||
        errMsg.includes("RESOURCE_EXHAUSTED");

      if (isTransient && i < TEXT_MODELS.length - 1) {
        console.warn(
          `[Gemini] Le modèle ${model} est en forte demande temporaire (503). Bascule vers ${TEXT_MODELS[i + 1]}...`
        );
        await new Promise((resolve) => setTimeout(resolve, 600));
        continue;
      }
      console.warn(`[Gemini] Échec sur le modèle ${model}:`, errMsg.slice(0, 160));
    }
  }

  throw lastError;
}

// Health check handler
export const handleHealth = (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
};

// Chat handler
export const handleChat = async (req: Request, res: Response) => {
  try {
    const { message, level, chapter, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message requis" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: "Clé GEMINI_API_KEY non configurée sur le serveur.",
        offlineFallback: true,
        answer:
          "Le service IA nécessite une clé d'API valide. En attendant, vous pouvez consulter toutes les fiches de cours détaillées, les flashcards et les exercices corrigés directement disponibles dans l'application !",
      });
    }

    const systemPrompt = `Tu es un professeur de mathématiques bienveillant, clair et très pédagogue au lycée français.
Tu aides un élève de niveau ${level || "Lycée (Seconde, Première ou Terminale)"}${chapter ? ` qui travaille sur le chapitre "${chapter}"` : ""}.

MISSION PRIORITAIRE :
Rédige TOUTES tes réponses dans un français fluide, naturel et parfaitement compréhensible par un être humain (élève du secondaire).
Tes réponses doivent être limpides, agréables à lire, sans code informatique brut et sans complexité inutile.

RÈGLES DE RÉDACTION ET NOTATION :
1. CLARTÉ DU LANGAGE NATUREL :
   - Fais des phrases complètes, simples et bien tournées.
   - Explique toujours l'idée avec des mots simples avant ou après une formule (ex: "On cherche la somme de tous les entiers de 1 jusqu'à n", "L'hypothèse de récurrence consiste à supposer la propriété vraie au rang k").
   - Sois chaleureux, encourageant et accessible.

2. RIGUEUR ET NOTATION MATHÉMATIQUE PARFAITE :
   - Vérifie rigoureusement tes formules et inégalités ! Ne confonds jamais les symboles (par exemple : pour un entier supérieur ou égal à 1, écris $n \\geqslant 1$ ou $n \\ge 1$, et jamais $n \\leqslant 1$).
   - Formules dans le texte : entoure-les toujours de dollars simples $...$ (ex: $n \\geqslant 1$, $x^2 + 2x - 3 = 0$, $k+1$, $f'(x)$).
   - Formules clés en évidence : isole-les sur leur propre ligne avec des doubles dollars $$...$$ :
     $$1 + 2 + 3 + \\dots + n = \\frac{n(n+1)}{2}$$
   - Reste sur des expressions mathématiques standards et propres.

3. STRUCTURE AÉRÉE ET FACILE À LIRE :
   - Utilise des titres courts et clairs (ex: ### Un exercice pour t'entraîner, ### Méthode pas à pas).
   - Utilise des puces (- ...) ou des étapes numérotées (1. ..., 2. ...) pour séquencer la démarche.
   - Mets en **gras** les notions clés (ex: **Initialisation :**, **Hérédité :**, **Indice :**).

4. DÉMARCHE PÉDAGOGIQUE BIENVEILLANTE :
   - Guide l'élève étape par étape en lui donnant des indices constructifs plutôt que la solution brute immédiatement.
   - Termine par une question stimulante ou une proposition d'étape pour l'inviter à s'exprimer.`;

    // Build conversation context
    const formattedHistory = Array.isArray(history)
      ? history.slice(-6).map((h: { role: string; content: string }) => ({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.content }],
        }))
      : [];

    const contents = [
      ...formattedHistory,
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    let replyText = "Désolé, je n'ai pas pu formuler de réponse.";
    try {
      const { response } = await generateWithFallback(ai, {
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });
      replyText = response.text || replyText;
    } catch (geminiErr: unknown) {
      const errStr = String(geminiErr instanceof Error ? geminiErr.message : geminiErr);
      console.warn("[Chat] Modèles IA temporairement indisponibles (503):", errStr.slice(0, 120));
      replyText =
        "L'assistant pédagogique IA connaît temporairement un pic de fréquentation (serveurs en forte demande). Vous pouvez renouveler votre question dans un court instant. En attendant, toutes vos fiches de cours, flashcards et exercices corrigés restent immédiatement consultables !";
    }

    return res.json({ reply: replyText });
  } catch (err: unknown) {
    console.warn("Erreur requête chat:", err);
    const errorMessage = err instanceof Error ? err.message : "Erreur interne";
    return res.status(500).json({
      error: "Erreur lors de la communication avec l'assistant de maths.",
      details: errorMessage,
    });
  }
};

// Generate exercises handler
export const handleGenerateExercise = async (req: Request, res: Response) => {
  try {
    const { chapterId, chapterTitle, level, domain, difficulty, topicHint, count } = req.body;
    const numToGenerate = Math.min(Math.max(Number(count) || 1, 1), 3);

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        exercises: [],
        offlineFallback: true,
        notice: "Générateur paramétrique local actif.",
      });
    }

    const prompt = `Génère ${numToGenerate} exercice(s) de mathématiques inédit(s) avec correction complète pour le lycée français :
- Chapitre officiel : "${chapterTitle || chapterId}"
- Niveau scolaire : ${level || "Lycée"}
- Domaine : ${domain || "Mathématiques"}
- Niveau de difficulté ciblé : ${difficulty || "Moyen"}
${topicHint ? `- Thématique spécifique demandée : "${topicHint}"` : ""}

Consignes strictes :
1. Conforme au programme officiel de l'Éducation Nationale française (B.O.).
2. Énoncé clair, précis et rigoureux.
3. Proposer 4 choix de réponses (options A, B, C, D) dont UNE SEULE ET UNIQUE est mathématiquement correcte.
4. Fournir une explication synthétique.
5. Rédiger une résolution pas à pas complète (3 à 5 étapes bien expliquées).
6. Indiquer un piège classique ou une confusion fréquente chez les élèves.`;

    let formattedExercises: any[] = [];
    try {
      const { response } = await generateWithFallback(ai, {
        contents: prompt,
        config: {
          systemInstruction:
            "Tu es un professeur agrégé et concepteur officiel d'exercices de mathématiques pour le lycée général français et les épreuves du Baccalauréat. Tu fournis toujours un résultat JSON valide et strictement conforme au schéma.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            description: "Liste des exercices de mathématiques générés",
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Titre explicite de l'exercice" },
                difficulty: { type: Type.STRING, description: "Facile, Moyen ou Difficile" },
                problem: { type: Type.STRING, description: "Énoncé mathématique complet" },
                formula: { type: Type.STRING, description: "Formule ou équation mathématique clé liée au problème" },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Exactement 4 choix possibles distincts"
                },
                correctOptionIndex: { type: Type.INTEGER, description: "Index (0, 1, 2 ou 3) de la réponse exacte" },
                explanation: { type: Type.STRING, description: "Explication synthétique de la réponse" },
                stepByStep: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Résolution pas à pas rédigée avec étapes claires"
                },
                trapWarning: { type: Type.STRING, description: "Piège fréquent ou mise en garde pédagogique" }
              },
              required: ["title", "difficulty", "problem", "options", "correctOptionIndex", "explanation", "stepByStep"]
            }
          }
        }
      });

      const jsonText = response.text ? response.text.trim() : "[]";
      let parsed: any;
      try {
        parsed = JSON.parse(jsonText);
      } catch (parseErr) {
        console.warn("JSON parse error, attempting slice:", parseErr);
        const match = jsonText.match(/\[.*\]/s);
        parsed = match ? JSON.parse(match[0]) : [];
      }

      if (!Array.isArray(parsed)) {
        parsed = [parsed];
      }

      formattedExercises = parsed.map((item: any, idx: number) => ({
        id: `gen-ai-${chapterId}-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
        chapterId: chapterId || "general",
        level: level || "premiere",
        title: item.title || `Exercice : ${chapterTitle}`,
        difficulty: item.difficulty || difficulty || "Moyen",
        problem: item.problem || "Résoudre l'exercice proposé.",
        formula: item.formula || undefined,
        options: Array.isArray(item.options) && item.options.length === 4 ? item.options : ["Option A", "Option B", "Option C", "Option D"],
        correctOptionIndex: typeof item.correctOptionIndex === "number" ? Math.min(Math.max(item.correctOptionIndex, 0), 3) : 0,
        explanation: item.explanation || "Solution de l'exercice.",
        stepByStep: Array.isArray(item.stepByStep) && item.stepByStep.length > 0 ? item.stepByStep : [item.explanation || "Étape 1 : Calculer la solution."],
        trapWarning: item.trapWarning || undefined,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      }));
    } catch (geminiErr: unknown) {
      const errStr = String(geminiErr instanceof Error ? geminiErr.message : geminiErr);
      console.warn("[Génération Exercice IA] Modèles en forte demande temporaire (503):", errStr.slice(0, 140));
      return res.json({
        exercises: [],
        offlineFallback: true,
        notice: "Pic de demande temporaire sur l'IA, génération locale activée sans interruption.",
      });
    }

    return res.json({ exercises: formattedExercises });
  } catch (err: unknown) {
    console.warn("Erreur générale génération exercice:", err);
    return res.json({
      exercises: [],
      offlineFallback: true,
    });
  }
};

// Route definitions (supporting both with and without /api prefix for Vercel/Express flexibility)
apiRouter.get("/health", handleHealth);
apiRouter.get("/api/health", handleHealth);

apiRouter.post("/chat", handleChat);
apiRouter.post("/api/chat", handleChat);

apiRouter.post("/generate-exercise", handleGenerateExercise);
apiRouter.post("/api/generate-exercise", handleGenerateExercise);

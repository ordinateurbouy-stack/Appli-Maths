import { GoogleGenAI } from "@google/genai";

const TEXT_MODELS = [
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
];

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Méthode non autorisée. Utilisez POST." }));
    return;
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    body = body || {};

    const { message, level, chapter, history } = body;

    if (!message || typeof message !== "string") {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Le champ 'message' est requis." }));
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          reply:
            "⚠️ **Configuration Vercel requise** : La clé d'API Gemini n'est pas encore enregistrée sur votre projet Vercel.\n\n👉 **Pour l'activer en 1 minute** :\n1. Rendez-vous sur votre tableau de bord [Vercel](https://vercel.com) > projet `appli-maths-v3`.\n2. Allez dans **Settings** > **Environment Variables**.\n3. Ajoutez la variable `GEMINI_API_KEY` avec votre clé Google AI Studio.\n4. Cliquez sur **Save**, puis redéployez le projet.\n\nEn attendant, toutes les fiches de cours, flashcards et exercices corrigés restent 100% accessibles !",
          configured: false,
        })
      );
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const systemPrompt = `Tu es un professeur de mathématiques bienveillant, clair et très pédagogue au lycée français.
Tu aides un élève de niveau ${level || "Lycée (Seconde, Première ou Terminale)"}${chapter ? ` qui travaille sur le chapitre "${chapter}"` : ""}.

MISSION PRIORITAIRE :
Rédige TOUTES tes réponses dans un français fluide, naturel et parfaitement compréhensible par un élève du secondaire.
Tes réponses doivent être limpides, agréables à lire, sans code informatique brut.

RÈGLES DE RÉDACTION ET NOTATION :
1. CLARTÉ : Phrases complètes, simples et bien tournées. Explique toujours l'idée avec des mots simples avant ou après une formule.
2. NOTATION MATHÉMATIQUE PARFAITE :
   - Formules dans le texte : entoure-les de dollars simples $...$ (ex: $n \\ge 1$, $x^2 + 2x - 3 = 0$, $k+1$, $f'(x)$).
   - Formules clés en évidence : isole-les sur leur propre ligne avec doubles dollars $$...$$
3. STRUCTURE : Titres courts (ex: ### Méthode pas à pas), étapes numérotées, mots-clés en **gras**.
4. PÉDAGOGIE BIENVEILLANTE : Donne des indices constructifs et pose des questions stimulantes.`;

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

    let replyText = "Désolé, je n'ai pas pu formuler de réponse pour le moment.";
    let lastError: any = null;

    for (let i = 0; i < TEXT_MODELS.length; i++) {
      const model = TEXT_MODELS[i];
      try {
        const result = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });
        if (result?.text) {
          replyText = result.text;
          lastError = null;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[Gemini API] Échec sur le modèle ${model}:`, err?.message || err);
      }
    }

    if (lastError && replyText === "Désolé, je n'ai pas pu formuler de réponse pour le moment.") {
      replyText =
        "L'assistant IA est temporairement très sollicité ou la clé d'API a atteint son quota. Réessayez dans un court instant !";
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ reply: replyText }));
  } catch (error: any) {
    console.error("Vercel Chat Handler Error:", error);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        reply:
          "Une erreur est survenue lors de l'appel à l'assistant IA : " +
          (error?.message || "Erreur interne"),
        error: error?.message || String(error),
      })
    );
  }
}

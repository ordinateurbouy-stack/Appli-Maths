import { GoogleGenAI, Type } from "@google/genai";

const TEXT_MODELS = [
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
];

export default async function handler(req: any, res: any) {
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

    const { chapterId, chapterTitle, level, domain, difficulty, topicHint, count } = body;
    const numToGenerate = Math.min(Math.max(Number(count) || 1, 1), 3);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          exercises: [],
          offlineFallback: true,
          notice: "Clé GEMINI_API_KEY non configurée sur Vercel.",
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

    for (let i = 0; i < TEXT_MODELS.length; i++) {
      const model = TEXT_MODELS[i];
      try {
        const result = await ai.models.generateContent({
          model,
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
                    description: "Exactement 4 choix possibles distincts",
                  },
                  correctOptionIndex: { type: Type.INTEGER, description: "Index (0, 1, 2 ou 3) de la réponse exacte" },
                  explanation: { type: Type.STRING, description: "Explication synthétique de la réponse" },
                  stepByStep: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Résolution pas à pas rédigée avec étapes claires",
                  },
                  trapWarning: { type: Type.STRING, description: "Piège fréquent ou mise en garde pédagogique" },
                },
                required: [
                  "title",
                  "difficulty",
                  "problem",
                  "options",
                  "correctOptionIndex",
                  "explanation",
                  "stepByStep",
                ],
              },
            },
          },
        });

        const jsonText = result?.text ? result.text.trim() : "[]";
        let parsed: any;
        try {
          parsed = JSON.parse(jsonText);
        } catch {
          const match = jsonText.match(/\[.*\]/s);
          parsed = match ? JSON.parse(match[0]) : [];
        }

        if (!Array.isArray(parsed)) {
          parsed = [parsed];
        }

        formattedExercises = parsed.map((item: any, idx: number) => ({
          id: `ai-gen-${Date.now()}-${idx}`,
          chapterId: chapterId || "custom",
          title: item.title || `Exercice : ${chapterTitle || "Mathématiques"}`,
          difficulty:
            item.difficulty === "Facile" || item.difficulty === "Difficile"
              ? item.difficulty
              : "Moyen",
          problem: item.problem || "Résoudre l'exercice proposé.",
          formula: item.formula || undefined,
          options:
            Array.isArray(item.options) && item.options.length >= 2
              ? item.options
              : ["Option A", "Option B", "Option C", "Option D"],
          correctOptionIndex:
            typeof item.correctOptionIndex === "number" &&
            item.correctOptionIndex >= 0 &&
            item.correctOptionIndex < (item.options?.length || 4)
              ? item.correctOptionIndex
              : 0,
          explanation: item.explanation || "Explication détaillée de la réponse.",
          stepByStep: Array.isArray(item.stepByStep) ? item.stepByStep : [],
          trapWarning: item.trapWarning || undefined,
        }));

        if (formattedExercises.length > 0) {
          break;
        }
      } catch (err: any) {
        console.warn(`[Exercise Gen] Échec sur le modèle ${model}:`, err?.message || err);
      }
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        exercises: formattedExercises,
        generatedWithAI: formattedExercises.length > 0,
      })
    );
  } catch (error: any) {
    console.error("Vercel Exercise Handler Error:", error);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        exercises: [],
        error: error?.message || String(error),
      })
    );
  }
}

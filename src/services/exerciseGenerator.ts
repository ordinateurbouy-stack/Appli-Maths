import { Exercise, Chapter, LyceeLevel } from '../types';

interface GenerationRequestParams {
  chapter: Chapter;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  topicHint?: string;
  count?: number;
}

/**
 * Random integer between min and max inclusive (excluding 0 if excludeZero is true)
 */
function randomInt(min: number, max: number, excludeZero = false): number {
  let val = Math.floor(Math.random() * (max - min + 1)) + min;
  if (excludeZero && val === 0) {
    val = Math.random() > 0.5 ? 1 : -1;
  }
  return val;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * High-quality offline parametric exercise generator for French Lycée mathematics.
 * Ensures the student can always generate unlimited exercises with rigorous step-by-step solutions,
 * even with no internet connection or offline PWA mode.
 */
export function generateParametricExercise(
  chapter: Chapter,
  difficulty: 'Facile' | 'Moyen' | 'Difficile' = 'Moyen',
  topicHint?: string
): Exercise {
  const timestamp = Date.now();
  const id = `gen-exo-${chapter.id}-${timestamp}-${Math.floor(Math.random() * 1000)}`;

  switch (chapter.id) {
    // ----------------------------------------------------
    // SECONDE: NOMBRES ET CALCULS
    // ----------------------------------------------------
    case 'sec-nombres-calculs': {
      const a = randomInt(2, 7);
      const b = randomInt(2, 6);
      const k = a * a * b; // sqrt(k) = a * sqrt(b)
      const correctOpt = `${a}√${b}`;
      const wrong1 = `${a * 2}√${b}`;
      const wrong2 = `${b}√${a}`;
      const wrong3 = `${a + 1}√${b}`;
      const opts = shuffle([correctOpt, wrong1, wrong2, wrong3]);

      return {
        id,
        chapterId: chapter.id,
        level: 'seconde',
        title: `Simplification de radicaux : √${k}`,
        difficulty,
        problem: `Écrire sous la forme a√b (avec a et b entiers, b le plus petit possible) le nombre réel :`,
        formula: `A = √${k}`,
        options: opts,
        correctOptionIndex: opts.indexOf(correctOpt),
        explanation: `On décompose ${k} sous la forme d'un produit d'un carré parfait par un entier : ${k} = ${a * a} × ${b}. Ainsi √${k} = √(${a * a}) × √${b} = ${a}√${b}.`,
        stepByStep: [
          `Étape 1 : Identifier le plus grand carré parfait divisant ${k}. Ici, ${a}² = ${a * a} et ${a * a} × ${b} = ${k}.`,
          `Étape 2 : Appliquer la règle des radicaux sur les produits : √(u × v) = √u × √v (pour u, v ≥ 0).`,
          `Étape 3 : Calculer √${a * a} = ${a}.`,
          `Conclusion : A = ${a}√${b}.`,
        ],
        trapWarning: `Ne confondez pas √(u + v) et √(u × v) ! √(u + v) ≠ √u + √v en général.`,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };
    }

    // ----------------------------------------------------
    // SECONDE: FONCTIONS & ÉQUATIONS
    // ----------------------------------------------------
    case 'sec-fonctions-generalites':
    case 'sec-fonctions-reference':
    case 'sec-equations-inequations': {
      const m = randomInt(-5, 5, true);
      const p = randomInt(-10, 10);
      const targetX = randomInt(-4, 6);
      const targetY = m * targetX + p;

      const correctOpt = `x = ${targetX}`;
      const wrong1 = `x = ${-targetX}`;
      const wrong2 = `x = ${targetX + 1}`;
      const wrong3 = `x = ${targetX - 2}`;
      const opts = shuffle([correctOpt, wrong1, wrong2, wrong3]);

      return {
        id,
        chapterId: chapter.id,
        level: 'seconde',
        title: `Recherche d'antécédent pour une fonction affine`,
        difficulty,
        problem: `Soit la fonction affine f définie sur ℝ par f(x) = ${m}x ${p >= 0 ? '+ ' + p : '- ' + Math.abs(p)}. Déterminer l'antécédent de ${targetY} par f.`,
        formula: `f(x) = ${targetY}`,
        options: opts,
        correctOptionIndex: opts.indexOf(correctOpt),
        explanation: `Trouver l'antécédent de ${targetY} revient à résoudre l'équation f(x) = ${targetY}, ce qui donne ${m}x = ${targetY - p}, donc x = ${targetX}.`,
        stepByStep: [
          `Étape 1 : Poser l'équation ${m}x ${p >= 0 ? '+ ' + p : '- ' + Math.abs(p)} = ${targetY}.`,
          `Étape 2 : Isoler le terme en x en soustrayant ${p} des deux côtés : ${m}x = ${targetY - p}.`,
          `Étape 3 : Diviser par le coefficient ${m} : x = ${targetY - p} / (${m}) = ${targetX}.`,
        ],
        trapWarning: `Attention à la distinction : f(${targetY}) est l'image de ${targetY}, alors que l'antécédent est la valeur x telle que f(x) = ${targetY}.`,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };
    }

    // ----------------------------------------------------
    // SECONDE: GÉOMÉTRIE & VECTEURS
    // ----------------------------------------------------
    case 'sec-geometrie-vecteurs':
    case 'sec-droites-plans': {
      const xA = randomInt(-5, 5);
      const yA = randomInt(-5, 5);
      const xB = randomInt(-5, 5);
      const yB = randomInt(-5, 5);
      const xAB = xB - xA;
      const yAB = yB - yA;

      const correctOpt = `(${xAB} ; ${yAB})`;
      const wrong1 = `(${xB + xA} ; ${yB + yA})`;
      const wrong2 = `(${-xAB} ; ${-yAB})`;
      const wrong3 = `(${yAB} ; ${xAB})`;
      const opts = shuffle([correctOpt, wrong1, wrong2, wrong3]);

      return {
        id,
        chapterId: chapter.id,
        level: 'seconde',
        title: `Coordonnées du vecteur AB dans un repère`,
        difficulty,
        problem: `Dans un repère orthonormé (O; i, j), on donne les points A(${xA} ; ${yA}) et B(${xB} ; ${yB}). Quelles sont les coordonnées du vecteur AB ?`,
        formula: `vecteur(AB) = (x_B - x_A ; y_B - y_A)`,
        options: opts,
        correctOptionIndex: opts.indexOf(correctOpt),
        explanation: `La formule donne x_AB = xB - xA = ${xB} - (${xA}) = ${xAB}, et y_AB = yB - yA = ${yB} - (${yA}) = ${yAB}.`,
        stepByStep: [
          `Étape 1 : Se rappeler que les coordonnées de AB sont obtenues par (extrémité - origine).`,
          `Étape 2 : Calculer l'abscisse : x_B - x_A = ${xB} - (${xA}) = ${xAB}.`,
          `Étape 3 : Calculer l'ordonnée : y_B - y_A = ${yB} - (${yA}) = ${yAB}.`,
        ],
        trapWarning: `Ne calculez pas (x_A - x_B), cela donnerait le vecteur opposé BA !`,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };
    }

    // ----------------------------------------------------
    // PREMIÈRE: SECOND DEGRÉ
    // ----------------------------------------------------
    case 'prem-second-degre': {
      // Create roots x1 and x2
      const x1 = randomInt(-4, 4);
      const x2 = randomInt(-4, 4);
      const a = randomInt(1, 2);
      // P(x) = a*(x - x1)*(x - x2) = a*(x^2 - (x1+x2)x + x1*x2)
      const b = -a * (x1 + x2);
      const c = a * x1 * x2;
      const delta = b * b - 4 * a * c;

      const bStr = b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`;
      const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;

      let correctOpt = '';
      if (x1 === x2) {
        correctOpt = `Une solution double : x = ${x1}`;
      } else {
        const sorted = [x1, x2].sort((n1, n2) => n1 - n2);
        correctOpt = `Deux solutions : x₁ = ${sorted[0]} et x₂ = ${sorted[1]}`;
      }

      const wrong1 = `Deux solutions : x₁ = ${-x1} et x₂ = ${-x2}`;
      const wrong2 = `Aucune solution réelle (Δ < 0)`;
      const wrong3 = `Une solution unique : x = ${x1 + 1}`;
      const opts = shuffle([correctOpt, wrong1, wrong2, wrong3]);

      return {
        id,
        chapterId: chapter.id,
        level: 'premiere',
        title: `Résolution de l'équation du second degré`,
        difficulty,
        problem: `Résoudre dans ℝ l'équation polynomiale du second degré suivante :`,
        formula: `${a}x² ${bStr} ${cStr} = 0`,
        options: opts,
        correctOptionIndex: opts.indexOf(correctOpt),
        explanation: `On calcule le discriminant Δ = b² - 4ac = (${b})² - 4(${a})(${c}) = ${delta}. Comme Δ ≥ 0, on applique les formules des racines réelles.`,
        stepByStep: [
          `Étape 1 : Identifier les coefficients a = ${a}, b = ${b}, c = ${c}.`,
          `Étape 2 : Calculer le discriminant : Δ = b² - 4ac = (${b})² - 4 × ${a} × ${c} = ${delta}.`,
          `Étape 3 : ${delta > 0 ? `Comme Δ > 0, l'équation admet deux solutions distinctes réelles : x = (-b ± √Δ) / (2a).` : `Comme Δ = 0, l'équation admet une solution double : x = -b / (2a).`}`,
          `Étape 4 : Application numérique : ${correctOpt}.`,
        ],
        trapWarning: `Pensez à bien mettre des parenthèses autour de b : (-b)² est toujours positif !`,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };
    }

    // ----------------------------------------------------
    // PREMIÈRE: DÉRIVATION
    // ----------------------------------------------------
    case 'prem-derivation': {
      const a = randomInt(2, 5);
      const b = randomInt(2, 6);
      const c = randomInt(-8, 8);
      // f(x) = a*x^3 - b*x^2 + c*x
      // f'(x) = 3a*x^2 - 2b*x + c
      const derivA = 3 * a;
      const derivB = 2 * b;

      const correctOpt = `f'(x) = ${derivA}x² - ${derivB}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)}`;
      const wrong1 = `f'(x) = ${a}x² - ${b}x + ${c}`;
      const wrong2 = `f'(x) = ${derivA}x³ - ${derivB}x²`;
      const wrong3 = `f'(x) = ${derivA}x² + ${derivB}x - ${c}`;
      const opts = shuffle([correctOpt, wrong1, wrong2, wrong3]);

      return {
        id,
        chapterId: chapter.id,
        level: 'premiere',
        title: `Calcul de la fonction dérivée d'un polynôme de degré 3`,
        difficulty,
        problem: `Soit f la fonction définie et dérivable sur ℝ par f(x) = ${a}x³ - ${b}x² ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)}x - 7. Déterminer l'expression de f'(x).`,
        formula: `f(x) = ${a}x³ - ${b}x² ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)}x - 7`,
        options: opts,
        correctOptionIndex: opts.indexOf(correctOpt),
        explanation: `On applique la dérivation terme à terme : (xⁿ)' = n*xⁿ⁻¹ et la dérivée d'une constante est 0. Donc (${a}x³)' = ${derivA}x², (-${b}x²)' = -${derivB}x, et (${c}x)' = ${c}.`,
        stepByStep: [
          `Étape 1 : Utiliser la règle de dérivation d'une puissance : pour x³, la dérivée est 3x². Donc (${a} × x³)' = ${a} × 3x² = ${derivA}x².`,
          `Étape 2 : Pour x², la dérivée est 2x. Donc (-${b} × x²)' = -${b} × 2x = -${derivB}x.`,
          `Étape 3 : Pour le terme linéaire ${c}x, la dérivée est ${c}. Pour la constante -7, la dérivée est 0.`,
          `Étape 4 : Assembler l'expression finale : ${correctOpt}.`,
        ],
        trapWarning: `La dérivée d'une constante isolée est 0, ne laissez pas traîner le terme constant !`,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };
    }

    // ----------------------------------------------------
    // PREMIÈRE: SUITES NUMÉRIQUES
    // ----------------------------------------------------
    case 'prem-suites-numeriques': {
      const u0 = randomInt(2, 10);
      const r = randomInt(3, 7);
      const n = randomInt(8, 20);
      const un = u0 + n * r;

      const correctOpt = `u_${n} = ${un}`;
      const wrong1 = `u_${n} = ${u0 + (n - 1) * r}`;
      const wrong2 = `u_${n} = ${un + r}`;
      const wrong3 = `u_${n} = ${un - 2 * r}`;
      const opts = shuffle([correctOpt, wrong1, wrong2, wrong3]);

      return {
        id,
        chapterId: chapter.id,
        level: 'premiere',
        title: `Terme général d'une suite arithmétique`,
        difficulty,
        problem: `Soit (u_n) une suite arithmétique de premier terme u₀ = ${u0} et de raison r = ${r}. Calculer la valeur exacte de u_${n}.`,
        formula: `u_n = u_0 + n × r`,
        options: opts,
        correctOptionIndex: opts.indexOf(correctOpt),
        explanation: `Pour toute suite arithmétique de premier terme u₀ et de raison r, le terme général est u_n = u₀ + n × r. Pour n = ${n} : u_${n} = ${u0} + ${n} × ${r} = ${un}.`,
        stepByStep: [
          `Étape 1 : Rappeler la formule explicite pour une suite arithmétique débutant à n=0 : u_n = u₀ + n × r.`,
          `Étape 2 : Remplacer par les données : n = ${n}, u₀ = ${u0}, r = ${r}.`,
          `Étape 3 : Calculer le produit : ${n} × ${r} = ${n * r}.`,
          `Étape 4 : Additionner u₀ : ${u0} + ${n * r} = ${un}.`,
        ],
        trapWarning: `Si la suite commençait à u₁, la formule serait u_n = u₁ + (n - 1)r. Attention à l'indice de départ !`,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };
    }

    // ----------------------------------------------------
    // TERMINALE: EXPONENTIELLE ET LOGARITHME
    // ----------------------------------------------------
    case 'term-fonction-exponentielle-log': {
      const a = randomInt(2, 5);
      const b = randomInt(1, 4);
      // f(x) = e^(a*x + b) -> f'(x) = a * e^(a*x + b)
      const correctOpt = `f'(x) = ${a}e^(${a}x + ${b})`;
      const wrong1 = `f'(x) = e^(${a}x + ${b})`;
      const wrong2 = `f'(x) = (${a}x + ${b})e^(${a}x + ${b})`;
      const wrong3 = `f'(x) = ${a}x e^(${a}x)`;
      const opts = shuffle([correctOpt, wrong1, wrong2, wrong3]);

      return {
        id,
        chapterId: chapter.id,
        level: 'terminale',
        title: `Dérivée de la composée e^(u(x))`,
        difficulty,
        problem: `Déterminer la dérivée de la fonction f définie sur ℝ par f(x) = e^(${a}x + ${b}).`,
        formula: `(e^u)' = u' × e^u`,
        options: opts,
        correctOptionIndex: opts.indexOf(correctOpt),
        explanation: `Pour f(x) = e^(u(x)), la formule de dérivation d'une fonction composée donne f'(x) = u'(x) × e^(u(x)). Ici u(x) = ${a}x + ${b} donc u'(x) = ${a}.`,
        stepByStep: [
          `Étape 1 : Poser u(x) = ${a}x + ${b}.`,
          `Étape 2 : Calculer la dérivée u'(x) = ${a}.`,
          `Étape 3 : Appliquer le théorème de composition : (e^u)' = u' × e^u.`,
          `Étape 4 : Conclure : f'(x) = ${a}e^(${a}x + ${b}).`,
        ],
        trapWarning: `L'oubli de la dérivée interne u' est l'une des erreurs les plus pénalisées au Baccalauréat !`,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };
    }

    // ----------------------------------------------------
    // TERMINALE: LIMITES ET CONTINUITÉ
    // ----------------------------------------------------
    case 'term-limites-continuite': {
      const numCoeff = randomInt(2, 6);
      const denCoeff = randomInt(2, 5);
      const correctOpt = `${numCoeff}/${denCoeff}`;
      const wrong1 = `+∞`;
      const wrong2 = `0`;
      const wrong3 = `${numCoeff}`;
      const opts = shuffle([correctOpt, wrong1, wrong2, wrong3]);

      return {
        id,
        chapterId: chapter.id,
        level: 'terminale',
        title: `Limite en +∞ d'une fraction rationnelle de même degré`,
        difficulty,
        problem: `Déterminer la limite en +∞ de la fonction rationnelle f définie par :`,
        formula: `lim (x → +∞) (${numCoeff}x² - 3x + 1) / (${denCoeff}x² + 5x - 2)`,
        options: opts,
        correctOptionIndex: opts.indexOf(correctOpt),
        explanation: `En +∞, une fonction rationnelle a la même limite que le quotient de ses termes de plus haut degré : lim (${numCoeff}x²)/(${denCoeff}x²) = ${numCoeff}/${denCoeff}.`,
        stepByStep: [
          `Étape 1 : Remarquer qu'il s'agit d'une forme indéterminée du type "∞ / ∞".`,
          `Étape 2 : Factoriser le numérateur et le dénominateur par le monôme de plus haut degré x².`,
          `Étape 3 : Simplifier par x² : le quotient devient (${numCoeff} - 3/x + 1/x²) / (${denCoeff} + 5/x - 2/x²).`,
          `Étape 4 : Comme lim (1/x) = 0 quand x → +∞, les termes s'annulent et la limite vaut ${numCoeff}/${denCoeff}.`,
        ],
        trapWarning: `Cette règle du quotient des termes de plus haut degré s'applique UNIQUEMENT en ±∞, jamais en un point x₀ fini !`,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };
    }

    // ----------------------------------------------------
    // TERMINALE: GÉOMÉTRIE DANS L'ESPACE
    // ----------------------------------------------------
    case 'term-geometrie-espace': {
      const a = randomInt(1, 4);
      const b = randomInt(-4, 4, true);
      const c = randomInt(-3, 3, true);
      const d = randomInt(-9, 9);
      const correctOpt = `n(${a} ; ${b} ; ${c})`;
      const wrong1 = `n(${a} ; ${b} ; ${-d})`;
      const wrong2 = `n(${-a} ; ${b} ; ${c})`;
      const wrong3 = `n(1 ; 1 ; 1)`;
      const opts = shuffle([correctOpt, wrong1, wrong2, wrong3]);

      return {
        id,
        chapterId: chapter.id,
        level: 'terminale',
        title: `Vecteur normal à un plan dans l'espace`,
        difficulty,
        problem: `Dans un repère orthonormé de l'espace, le plan (P) a pour équation cartésienne : ${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}y ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)}z ${d >= 0 ? '+ ' + d : '- ' + Math.abs(d)} = 0. Donner un vecteur normal à ce plan.`,
        formula: `ax + by + cz + d = 0 => n(a ; b ; c)`,
        options: opts,
        correctOptionIndex: opts.indexOf(correctOpt),
        explanation: `Tout plan d'équation cartésienne ax + by + cz + d = 0 admet pour vecteur normal n(a ; b ; c). Les coefficients de x, y et z donnent directement les coordonnées.`,
        stepByStep: [
          `Étape 1 : Identifier la forme générale d'un plan dans l'espace : ax + by + cz + d = 0.`,
          `Étape 2 : Lire les coefficients respectifs : a = ${a}, b = ${b}, c = ${c}.`,
          `Étape 3 : Le vecteur de coordonnées (a ; b ; c) est orthogonal à tout vecteur directeur du plan.`,
          `Étape 4 : Conclure que n(${a} ; ${b} ; ${c}) est un vecteur normal au plan.`,
        ],
        trapWarning: `Ne faites pas intervenir le terme constant d dans les coordonnées du vecteur normal !`,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };
    }

    // ----------------------------------------------------
    // PROBABILITÉS (ALL LEVELS)
    // ----------------------------------------------------
    case 'sec-probabilites-echantillonnage':
    case 'prem-probabilites-conditionnelles':
    case 'term-probabilites-variables': {
      const pA = 0.4;
      const pB = 0.5;
      const pInter = 0.2;
      const pUnion = Number((pA + pB - pInter).toFixed(2));

      const correctOpt = `${pUnion}`;
      const wrong1 = `0.90`;
      const wrong2 = `0.60`;
      const wrong3 = `0.80`;
      const opts = shuffle([correctOpt, wrong1, wrong2, wrong3]);

      return {
        id,
        chapterId: chapter.id,
        level: chapter.level,
        title: `Probabilité de la réunion de deux événements`,
        difficulty,
        problem: `Soient A et B deux événements d'un univers Ω tels que P(A) = ${pA}, P(B) = ${pB} et P(A ∩ B) = ${pInter}. Calculer P(A ∪ B).`,
        formula: `P(A ∪ B) = P(A) + P(B) - P(A ∩ B)`,
        options: opts,
        correctOptionIndex: opts.indexOf(correctOpt),
        explanation: `Par le théorème fondamental des probabilités : P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = ${pA} + ${pB} - ${pInter} = ${pUnion}.`,
        stepByStep: [
          `Étape 1 : Écrire la formule de la réunion : P(A ∪ B) = P(A) + P(B) - P(A ∩ B).`,
          `Étape 2 : Remplacer par les valeurs de l'énoncé : ${pA} + ${pB} - ${pInter}.`,
          `Étape 3 : Calculer la somme : ${pA} + ${pB} = ${(pA + pB).toFixed(2)}.`,
          `Étape 4 : Soustraire l'intersection : ${(pA + pB).toFixed(2)} - ${pInter} = ${pUnion}.`,
        ],
        trapWarning: `N'oubliez pas de soustraire P(A ∩ B) ! L'addition simple P(A) + P(B) n'est valable que si les événements sont incompatibles (disjoints).`,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };
    }

    // ----------------------------------------------------
    // GENERIC DEFAULT TEMPLATE FOR ANY OTHER CHAPTER
    // ----------------------------------------------------
    default: {
      const valA = randomInt(2, 6);
      const valB = randomInt(1, 5);
      const res = valA * valB;

      const correctOpt = `x = ${valA}`;
      const wrong1 = `x = ${valA + 2}`;
      const wrong2 = `x = ${valA - 1}`;
      const wrong3 = `x = ${-valA}`;
      const opts = shuffle([correctOpt, wrong1, wrong2, wrong3]);

      return {
        id,
        chapterId: chapter.id,
        level: chapter.level,
        title: `Application fondamentale : ${chapter.title}`,
        difficulty,
        problem: `Dans le cadre du chapitre "${chapter.title}" (${chapter.shortCode}), résoudre l'équation suivante : ${valB}x = ${res}.`,
        formula: `${valB}x = ${res}`,
        options: opts,
        correctOptionIndex: opts.indexOf(correctOpt),
        explanation: `En divisant les deux membres par ${valB}, on obtient x = ${res} / ${valB} = ${valA}.`,
        stepByStep: [
          `Étape 1 : Poser l'égalité algébrique : ${valB}x = ${res}.`,
          `Étape 2 : Isoler x en effectuant l'opération inverse (division par le coefficient ${valB} ≠ 0).`,
          `Étape 3 : Conclure que la solution unique est x = ${valA}.`,
        ],
        trapWarning: `Vérifiez toujours que le coefficient par lequel vous divisez n'est pas nul.`,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };
    }
  }
}

/**
 * Requests exercise generation from the server (using Gemini AI).
 * If the server is offline or fails, seamlessly falls back to the parametric math engine.
 */
export async function requestExerciseGeneration(
  params: GenerationRequestParams
): Promise<Exercise[]> {
  const count = params.count || 1;
  const exercises: Exercise[] = [];

  try {
    const response = await fetch('/api/generate-exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chapterId: params.chapter.id,
        chapterTitle: params.chapter.title,
        level: params.chapter.level,
        domain: params.chapter.domain,
        difficulty: params.difficulty,
        topicHint: params.topicHint,
        count: count,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.exercises) && data.exercises.length > 0) {
        return data.exercises;
      }
    }
  } catch (err) {
    console.warn('Network unavailable or API error, falling back to local math generator:', err);
  }

  // Fallback parametric generator (works 100% offline!)
  for (let i = 0; i < count; i++) {
    const exo = generateParametricExercise(params.chapter, params.difficulty, params.topicHint);
    exercises.push(exo);
  }

  return exercises;
}

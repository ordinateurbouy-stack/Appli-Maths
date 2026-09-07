import { CourseSheet } from '../../types';

export const TERMINALE_COURSES: Record<string, CourseSheet> = {
  'term-suites-recurrence': {
    chapterId: 'term-suites-recurrence',
    level: 'terminale',
    title: 'Suites, Récurrence & Limites de suites',
    summary: 'Principe fondamental du raisonnement par récurrence (initialisation, hérédité, conclusion), suites majorées, minorées, bornées, théorème de convergence monotone, opérations sur les limites, théorèmes de comparaison et théorème des gendarmes.',
    academicSources: [
      'Programme de Terminale Spécialité Mathématiques (B.O. spécial n°8 du 25 juillet 2019)',
      'Ressources Éduscol : Raisonnement par récurrence, limites et théorèmes de convergence',
    ],
    notions: [
      {
        title: '1. L\'axiome et la démarche du raisonnement par récurrence',
        subtitle: 'Démontrer une propriété vraie pour une infinité d\'entiers naturels',
        content: 'Pour démontrer qu\'une propriété P(n) est vraie pour tout entier n ≥ n₀, on doit impérativement valider les trois étapes.',
        keyPoints: [
          'Initialisation : vérifier explicitement que la propriété P(n₀) est vraie pour le premier rang n₀ (calcul des deux membres).',
          'Hérédité : fixer un entier k ≥ n₀. Supposer que P(k) est vraie (Hypothèse de Récurrence - HR). Démontrer sous cette hypothèse que P(k+1) est vraie.',
          'Conclusion : P(n₀) est vraie et la propriété est héréditaire pour tout k ≥ n₀, donc par principe de récurrence, P(n) est vraie pour tout n ≥ n₀.',
        ],
        formula: '[P(n₀) vraie et (∀k ≥ n₀, P(k) ⇒ P(k+1))] ⇒ ∀n ≥ n₀, P(n) vraie',
        example: 'Pour prouver 2ⁿ ≥ n+1 pour n ≥ 0 : Initialisation n=0 : 2⁰ = 1 ≥ 1 (vrai). Hérédité : supposons 2ᵏ ≥ k+1. Alors 2ᵏ⁺¹ = 2 × 2ᵏ ≥ 2(k+1) = 2k + 2 = (k+2) + k ≥ k+2 = (k+1)+1. Conclusion : vrai pour tout n.',
      },
      {
        title: '2. Suites bornées et variations',
        subtitle: 'Majorant, minorant et monotonie',
        content: 'La délimitation des valeurs d\'une suite est indispensable pour étudier sa convergence.',
        keyPoints: [
          'Suite majorée : il existe un réel M tel que pour tout n, u_n ≤ M. M est un majorant.',
          'Suite minorée : il existe un réel m tel que pour tout n, u_n ≥ m. m est un minorant.',
          'Suite bornée : à la fois majorée et minorée (il existe m et M tels que m ≤ u_n ≤ M).',
          'Théorème fondamental de convergence monotone : toute suite CROISSANTE et MAJORÉE est convergente (admet une limite finie L). Toute suite DÉCROISSANTE et MINORÉE est convergente.',
        ],
        formula: 'Croissante + Majorée ⇒ Convergente ; Décroissante + Minorée ⇒ Convergente',
      },
      {
        title: '3. Limite d\'une suite et limites de référence',
        subtitle: 'Comportement quand n tend vers +∞',
        content: 'La limite étudie le comportement de u_n lorsque l\'indice n devient infiniment grand.',
        keyPoints: [
          'Suite convergente : admet une limite réelle FINIE L (lim_{n → +∞} u_n = L). Tout intervalle ouvert centré en L contient tous les termes à partir d\'un certain rang N.',
          'Suite divergente : soit elle tend vers +∞ ou -∞, soit elle n\'admet aucune limite (ex: u_n = (-1)ⁿ).',
          'Limites des suites de référence : lim n = +∞, lim n² = +∞, lim √n = +∞ ; lim 1/n = 0, lim 1/n² = 0, lim 1/√n = 0.',
          'Limite d\'une suite géométrique qⁿ : si q > 1, lim qⁿ = +∞ ; si q = 1, suite constante égale à 1 ; si -1 < q < 1 (|q| < 1), lim qⁿ = 0 ; si q ≤ -1, pas de limite.',
        ],
        formula: 'Si |q| < 1 : lim_{n → +∞} qⁿ = 0 ; Si q > 1 : lim_{n → +∞} qⁿ = +∞',
      },
      {
        title: '4. Théorèmes de comparaison et d\'encadrement (Gendarmes)',
        subtitle: 'Déterminer une limite sans calcul direct',
        content: 'Lorsque l\'expression directe est complexe (avec sinus, cosinus, alternances), on utilise des encadrements.',
        keyPoints: [
          'Théorème de minoration (vers +∞) : si u_n ≥ v_n à partir d\'un certain rang et si lim v_n = +∞, alors lim u_n = +∞.',
          'Théorème de majoration (vers -∞) : si u_n ≤ v_n à partir d\'un certain rang et si lim v_n = -∞, alors lim u_n = -∞.',
          'Théorème d\'encadrement (Théorème des Gendarmes) : si v_n ≤ u_n ≤ w_n à partir d\'un certain rang, et si lim v_n = lim w_n = L (fini), alors la suite (u_n) converge et lim u_n = L.',
        ],
        formula: 'v_n ≤ u_n ≤ w_n et lim v_n = lim w_n = L ⇒ lim u_n = L',
        example: 'Pour u_n = (sin n) / n : comme -1 ≤ sin(n) ≤ 1, on a -1/n ≤ u_n ≤ 1/n. Or lim(-1/n) = lim(1/n) = 0. Par le théorème des gendarmes, lim u_n = 0.',
      },
    ],
    keyDefinitions: [
      {
        term: 'Limite finie d\'une suite',
        definition: 'Une suite (u_n) a pour limite le réel L si tout intervalle ouvert contenant L contient tous les termes de la suite à partir d\'un certain rang.',
      },
      {
        term: 'Suite arithmético-géométrique',
        definition: 'Suite définie par une relation de récurrence de la forme u_{n+1} = a·u_n + b (a ≠ 1, b ≠ 0), résolue en introduisant une suite auxiliaire géométrique v_n = u_n - c avec c = b / (1 - a).',
      },
    ],
    theorems: [
      {
        name: 'Théorème de convergence monotone',
        statement: 'Toute suite croissante et majorée est convergente vers une limite L ≤ M (où M est un majorant). Toute suite décroissante et minorée est convergente vers une limite L ≥ m (où m est un minorant).',
        conditions: 'Attention : le théorème affirme l\'existence de la limite L mais ne donne pas sa valeur exacte directement !',
      },
    ],
    methods: [
      {
        title: 'Étudier la convergence d\'une suite arithmético-géométrique u_{n+1} = 0,5 u_n + 3 avec u_0 = 10',
        steps: [
          'Chercher le point fixe c vérifiant c = 0,5c + 3 ⇔ 0,5c = 3 ⇔ c = 6.',
          'Poser la suite auxiliaire v_n = u_n - 6.',
          'Montrer que (v_n) est géométrique : v_{n+1} = u_{n+1} - 6 = (0,5u_n + 3) - 6 = 0,5(u_n - 6) = 0,5 v_n. v_0 = 10 - 6 = 4. Raison q = 0,5.',
          'Exprimer v_n puis u_n en fonction de n : v_n = 4 × (0,5)ⁿ ⇒ u_n = 6 + 4 × (0,5)ⁿ.',
          'Calculer la limite : comme |0,5| < 1, lim (0,5)ⁿ = 0. Donc lim u_n = 6.',
        ],
        example: {
          problem: 'Déterminer la limite de u_{n+1} = 0,8 u_n + 2 avec u_0 = 5.',
          solution: 'Point fixe : c = 0,8c + 2 ⇒ 0,2c = 2 ⇒ c = 10. v_n = u_n - 10 est géométrique de raison 0,8 et v_0 = -5. u_n = 10 - 5(0,8)ⁿ. Comme 0,8 ∈ ]-1 ; 1[, lim (0,8)ⁿ = 0 donc lim u_n = 10.',
        },
      },
    ],
    traps: [
      'Écrire dans l\'hérédité : "Supposons que P(n) est vraie pour tout n" (c\'est supposer la conclusion !). Il faut écrire : "Soit k un entier fixé ≥ n₀, supposons P(k) vraie".',
      'Confondre majorant et limite : une suite croissante majorée par 10 peut très bien converger vers 7 (10 est un majorant, 7 est la borne supérieure et la limite).',
      'Oublier de vérifier l\'initialisation (certaines propriétés sont héréditaires sans être jamais initialisées !).',
    ],
  },

  'term-limites-continuite': {
    chapterId: 'term-limites-continuite',
    level: 'terminale',
    title: 'Limites de fonctions, Continuité & TVI',
    summary: 'Limites finies et infinies aux bornes, asymptotes verticales, horizontales et obliques, opérations et levée des formes indéterminées, continuité, Théorème des Valeurs Intermédiaires (TVI), corollaire d\'unicité (bijection) et méthode de dichotomie.',
    academicSources: [
      'Programme de Terminale Spécialité Mathématiques (B.O. 2019) - Analyse',
      'Éduscol : Continuité, TVI et approximations de solutions',
    ],
    notions: [
      {
        title: '1. Comportement asymptotique et asymptotes',
        subtitle: 'Traduire graphiquement les limites infinies',
        content: 'Les asymptotes sont des droites dont la courbe C_f se rapproche arbitrairement près à l\'infini ou au voisinage d\'une valeur interdite.',
        keyPoints: [
          'Asymptote verticale d\'équation x = a : si lim_{x → a} f(x) = +∞ ou -∞ (à gauche ou à droite).',
          'Asymptote horizontale d\'équation y = L : si lim_{x → +∞} f(x) = L ou lim_{x → -∞} f(x) = L (L réel fini).',
          'Position relative par rapport à l\'asymptote y = L : s\'obtient en étudiant le signe de la différence f(x) - L.',
        ],
        formula: 'lim_{x → a} f(x) = ±∞ ⇔ Asymptote x = a ; lim_{x → ±∞} f(x) = L ⇔ Asymptote y = L',
      },
      {
        title: '2. Formes indéterminées et techniques de levée',
        subtitle: 'Les 4 formes indéterminées officielles',
        content: 'Il existe 4 cas où les théorèmes sur les opérations ne permettent pas de conclure directement.',
        keyPoints: [
          'Les 4 formes indéterminées (FI) : "+∞ - ∞", "0 × ∞", "0 / 0" et "∞ / ∞".',
          'Rappel essentiel : "0 / ∞" n\'est PAS indéterminé (cela fait 0) ; "k / 0" (avec k ≠ 0) donne ±∞ ; "k / ∞" donne 0.',
          'Technique 1 (Polynômes en ±∞) : factoriser par le terme de plus haut degré. La limite d\'un polynôme en ±∞ est celle de son monôme de plus haut degré.',
          'Technique 2 (Fractions rationnelles en ±∞) : factoriser par le monôme de plus haut degré au numérateur et au dénominateur et simplifier.',
          'Technique 3 (Radicaux en cas de "+∞ - ∞" ou "0 / 0") : multiplier par l\'expression conjuguée.',
        ],
        formula: 'Formes indéterminées : [+∞ - ∞], [0 × ∞], [0 / 0], [∞ / ∞]',
      },
      {
        title: '3. Continuité d\'une fonction sur un intervalle',
        subtitle: 'Définition et propriétés',
        content: 'Une fonction est continue lorsque sa courbe représentative peut se tracer sans rupture ni saut.',
        keyPoints: [
          'Continuité en un point x₀ : f est continue en x₀ si lim_{x → x₀} f(x) = f(x₀).',
          'Continuité sur un intervalle : f est continue sur I si elle est continue en tout point de I.',
          'Fonctions usuelles continues : toutes les fonctions polynômes, rationnelles, trigonométriques, racine carrée, exponentielle et logarithme sont continues sur leur ensemble de définition.',
          'Toute fonction dérivable sur un intervalle est AUTOMATIQUEMENT CONTINUE sur cet intervalle (l\'inverse est faux : |x| est continue en 0 mais non dérivable en 0).',
        ],
        formula: 'f dérivable sur I ⇒ f continue sur I',
      },
      {
        title: '4. Théorème des Valeurs Intermédiaires (TVI) et Corollaire d\'unicité',
        subtitle: 'Résolution et existence de solutions d\'équations f(x) = k',
        content: 'Le TVI garantit l\'existence de solutions d\'une équation sans nécessiter de formule explicite.',
        keyPoints: [
          'TVI général (Existence) : si f est CONTINUE sur [a ; b], alors pour tout réel k compris entre f(a) et f(b), l\'équation f(x) = k admet AU MOINS une solution c dans [a ; b].',
          'Corollaire du TVI / Théorème de la bijection (Existence et Unicité) : si f est CONTINUE ET STRICTEMENT MONOTONE sur [a ; b], alors pour tout réel k compris entre f(a) et f(b), l\'équation f(x) = k admet une UNIQUE solution α dans [a ; b].',
          'Les 3 hypothèses obligatoires à rédiger au Bac : 1) Continuité de f, 2) Stricte monotonie (croissante ou décroissante), 3) k est strictement compris entre les images des bornes (f(a) < k < f(b) ou f(b) < k < f(a)).',
        ],
        formula: 'f continue + strictement monotone sur [a;b] + k ∈ [f(a);f(b)] ⇒ ! α ∈ [a;b], f(α) = k',
      },
    ],
    keyDefinitions: [
      {
        term: 'Théorème des Valeurs Intermédiaires',
        definition: 'Théorème fondamental de topologie assurant qu\'une fonction continue sur un segment prend toutes les valeurs intermédiaires entre ses bornes.',
      },
      {
        term: 'Dichotomie',
        definition: 'Algorithme d\'approximation consistant à diviser par deux à chaque étape la largeur de l\'intervalle contenant la racine α.',
      },
    ],
    theorems: [
      {
        name: 'Corollaire du TVI (Théorème d\'existence et d\'unicité)',
        statement: 'Soit f une fonction continue et strictement monotone sur un intervalle [a ; b]. Pour tout réel k compris entre f(a) et f(b), l\'équation f(x) = k admet une unique solution α dans l\'intervalle [a ; b]. Ce théorème s\'étend aux intervalles ouverts ou non bornés en utilisant les limites aux bornes.',
      },
    ],
    methods: [
      {
        title: 'Rédiger rigoureusement l\'application du corollaire du TVI pour montrer que f(x) = 0 admet une unique solution',
        steps: [
          '1) Justifier la continuité de f sur l\'intervalle I (ex: "f est dérivable sur I donc continue sur I").',
          '2) Calculer la dérivée f\'(x) et démontrer que f est STRICTEMENT croissante (ou décroissante) sur I.',
          '3) Calculer les valeurs (ou les limites) aux bornes de l\'intervalle.',
          '4) Vérifier que 0 est compris entre ces deux valeurs (ex: f(a) < 0 < f(b)).',
          '5) Conclure : "D\'après le corollaire du théorème des valeurs intermédiaires, l\'équation f(x) = 0 admet une unique solution α sur I".',
        ],
        example: {
          problem: 'Montrer que x³ + x - 1 = 0 admet une unique solution sur [0 ; 1].',
          solution: 'f(x) = x³ + x - 1 est un polynôme donc continue et dérivable sur ℝ. f\'(x) = 3x² + 1 > 0 pour tout x, donc f est strictement croissante sur [0 ; 1]. f(0) = -1 et f(1) = 1. Comme 0 ∈ [-1 ; 1], d\'après le corollaire du TVI, f(x) = 0 admet une unique solution α ∈ [0 ; 1].',
        },
      },
    ],
    traps: [
      'Oublier de mentionner la continuité avant d\'invoquer le TVI (le TVI est FAUX si la fonction n\'est pas continue !).',
      'Oublier la stricte monotonie pour conclure à l\'UNICITÉ de la solution (sans stricte monotonie, on ne peut affirmer qu\'au moins une solution).',
      'Confondre valeur de α (l\'abscisse inconnue) et f(α) (l\'ordonnée qui vaut 0).',
    ],
  },

  'term-derivation-convexite': {
    chapterId: 'term-derivation-convexite',
    level: 'terminale',
    title: 'Compléments de dérivation & Convexité',
    summary: 'Dérivée de la composée g ∘ f, dérivée seconde f\'\', définition géométrique et analytique de la convexité et de la concavité, caractérisation par la dérivée seconde, point d\'inflexion et inégalités de convexité usuelles.',
    academicSources: [
      'Programme officiel Terminale Spécialité (B.O. 2019) - Analyse',
      'Éduscol : Fonctions convexes, concaves et points d\'inflexion',
    ],
    notions: [
      {
        title: '1. Dérivation de fonctions composées',
        subtitle: 'La règle de la chaîne (Chain Rule)',
        content: 'La composition de deux fonctions dérivables f et g produit une fonction dérivable dont la dérivée combine les deux dérivées.',
        keyPoints: [
          'Théorème de dérivation de la composée : si f est dérivable sur I et g dérivable sur f(I), alors g ∘ f est dérivable sur I et (g ∘ f)\'(x) = f\'(x) × g\'(f(x)).',
          'Dérivée de e^{u(x)} : (eᵘ)\' = u\' × eᵘ.',
          'Dérivée de ln(u(x)) : (ln u)\' = u\' / u (pour u(x) > 0).',
          'Dérivée de (u(x))ⁿ : (uⁿ)\' = n × u\' × uⁿ⁻¹.',
          'Dérivée de √(u(x)) : (√u)\' = u\' / (2√u) (pour u(x) > 0).',
        ],
        formula: '(g ∘ f)\' = f\' · (g\' ∘ f) ; (eᵘ)\' = u\'·eᵘ ; (ln u)\' = u\'/u ; (uⁿ)\' = n·u\'·uⁿ⁻¹',
        example: 'Pour f(x) = (3x² - 5)⁴ : u = 3x² - 5 ⇒ u\' = 6x. f\'(x) = 4(6x)(3x² - 5)³ = 24x(3x² - 5)³.',
      },
      {
        title: '2. Notion géométrique de convexité et concavité',
        subtitle: 'Position de la courbe par rapport à ses tangentes et ses cordes',
        content: 'La convexité décrit la façon dont la courbe se courbe vers le haut ou vers le bas.',
        keyPoints: [
          'Fonction convexe sur un intervalle I : sa courbe est située ENTIÈREMENT AU-DESSUS de chacune de ses tangentes. Les segments reliant deux points de la courbe (les cordes) sont situés au-dessus de la courbe.',
          'Fonction concave sur un intervalle I : sa courbe est située ENTIÈREMENT AU-DESSOUS de chacune de ses tangentes. Les cordes sont situées sous la courbe.',
          'Exemples de référence : x ↦ x² et x ↦ eˣ sont convexes sur ℝ. x ↦ ln(x) est concave sur ]0 ; +∞[. x ↦ √x est concave sur [0 ; +∞[.',
        ],
        formula: 'Convexe : courbe au-dessus des tangentes ; Concave : courbe au-dessous des tangentes',
      },
      {
        title: '3. Caractérisations analytiques par f\' et la dérivée seconde f\'\'',
        subtitle: 'Les critères d\'étude pratiques',
        content: 'On étudie la convexité en analysant la dérivée première f\' ou la dérivée seconde f\'\'.',
        keyPoints: [
          'Caractérisation par f\' : f est convexe sur I ⇔ sa fonction dérivée f\' est CROISSANTE sur I. f est concave ⇔ f\' est DÉCROISSANTE sur I.',
          'Caractérisation par f\'\' (si f est deux fois dérivable) : f est CONVEXE sur I ⇔ pour tout x ∈ I, f\'\'(x) ≥ 0.',
          'f est CONCAVE sur I ⇔ pour tout x ∈ I, f\'\'(x) ≤ 0.',
        ],
        formula: 'f convexe sur I ⇔ f\' croissante ⇔ f\'\'(x) ≥ 0 sur I',
      },
      {
        title: '4. Point d\'inflexion',
        subtitle: 'Changement de courbure et traversée de la tangente',
        content: 'Un point d\'inflexion est un point de la courbe où la convexité change de sens.',
        keyPoints: [
          'Définition géométrique : un point I(x₀ ; f(x₀)) est un point d\'inflexion de C_f si la courbe traverse sa tangente en ce point (la fonction passe de convexe à concave ou inversement).',
          'Critère analytique fondamental : I(x₀ ; f(x₀)) est un point d\'inflexion si et seulement si la dérivée seconde f\'\' S\'ANNULE EN CHANGEANT DE SIGNE en x₀ (ou f\' admet un extremum local en x₀).',
        ],
        formula: 'Point d\'inflexion en x₀ ⇔ f\'\'(x₀) = 0 ET f\'\' change de signe en x₀',
        example: 'Pour f(x) = x³ : f\'(x) = 3x², f\'\'(x) = 6x. f\'\'(0) = 0 et 6x passe de négatif à positif en 0. Le point O(0 ; 0) est un point d\'inflexion, et la tangente y = 0 traverse la courbe.',
      },
    ],
    keyDefinitions: [
      {
        term: 'Dérivée seconde f\'\'',
        definition: 'Fonction obtenue en dérivant la fonction dérivée f\'. Elle mesure l\'accélération et le taux de variation de la pente de la tangente.',
      },
      {
        term: 'Point d\'inflexion',
        definition: 'Point où la courbe représentative traverse sa tangente, marquant une inversion de concavité.',
      },
    ],
    theorems: [
      {
        name: 'Inégalités de convexité fondamentales',
        statement: 'Par convexité de l\'exponentielle en 0 : pour tout x ∈ ℝ, eˣ ≥ x + 1. Par concavité du logarithme en 1 : pour tout x > 0, ln(x) ≤ x - 1.',
      },
    ],
    methods: [
      {
        title: 'Déterminer les intervalles de convexité et les points d\'inflexion de f(x)',
        steps: [
          'Calculer la dérivée première f\'(x).',
          'Calculer la dérivée seconde f\'\'(x) = (f\'(x))\'.',
          'Résoudre l\'équation f\'\'(x) = 0 et dresser le tableau de signes de f\'\'(x).',
          'Conclure : sur les intervalles où f\'\'(x) > 0, f est convexe ; où f\'\'(x) < 0, f est concave.',
          'Si f\'\'(x₀) = 0 avec changement de signe, conclure que le point (x₀ ; f(x₀)) est un point d\'inflexion.',
        ],
        example: {
          problem: 'Étudier la convexité de f(x) = x⁴ - 6x² + 2 sur ℝ.',
          solution: 'f\'(x) = 4x³ - 12x. f\'\'(x) = 12x² - 12 = 12(x² - 1) = 12(x - 1)(x + 1). f\'\' s\'annule en -1 et 1 en changeant de signe. f\'\'(x) > 0 sur ]-∞ ; -1[ et ]1 ; +∞[ (f est convexe). f\'\'(x) < 0 sur ]-1 ; 1[ (f est concave). Les points d\'inflexion sont en x = -1 et x = 1.',
        },
      },
    ],
    traps: [
      'Confondre les zéros de f\' (qui donnent les extremums de f) et les zéros de f\'\' (qui donnent les points d\'inflexion).',
      'Affirmer qu\'il y a point d\'inflexion dès que f\'\'(x₀) = 0. Il faut OBLIGATOIREMENT un changement de signe de f\'\' (ex: pour x⁴ en 0, f\'\'(0)=0 mais 12x² ≥ 0 ne change pas de signe : pas de point d\'inflexion !).',
    ],
  },

  'term-logarithme-neperien': {
    chapterId: 'term-logarithme-neperien',
    level: 'terminale',
    title: 'Fonction Logarithme népérien (ln)',
    summary: 'Définition comme bijection réciproque de l\'exponentielle, domaine ]0 ; +∞[, propriétés algébriques, limites aux bornes, croissances comparées, dérivée de ln(u) et étude de fonctions.',
    academicSources: [
      'Programme de Terminale Spécialité Mathématiques (B.O. 2019) - Analyse',
      'Éduscol : Logarithme népérien et croissances comparées',
    ],
    notions: [
      {
        title: '1. Définition et lien avec la fonction exponentielle',
        subtitle: 'La bijection réciproque',
        content: 'La fonction exponentielle étant continue et strictement croissante de ℝ sur ]0 ; +∞[, elle réalise une bijection. Sa réciproque est le logarithme népérien noté ln.',
        keyPoints: [
          'Pour tout réel x > 0 et tout réel y : y = ln(x) ⇔ x = eʸ.',
          'Ensemble de définition : la fonction ln est définie EXCLUSIVEMENT sur ]0 ; +∞[ (ln(0) et ln(-3) n\'existent pas !).',
          'Valeurs clés : ln(1) = 0 et ln(e) = 1.',
          'Identités réciproques : pour tout x > 0, e^{ln x} = x ; pour tout x ∈ ℝ, ln(eˣ) = x.',
          'Symétrie graphique : les courbes de ln et exp sont symétriques par rapport à la première bissectrice (droite y = x).',
        ],
        formula: 'y = ln(x) ⇔ eʸ = x ; e^{ln x} = x (x > 0) ; ln(eˣ) = x (x ∈ ℝ)',
      },
      {
        title: '2. Propriétés algébriques fondamentales',
        subtitle: 'Transformation des produits en sommes',
        content: 'Le logarithme transforme les multiplications en additions et les divisions en soustractions.',
        keyPoints: [
          'Relation fondamentale : pour tous réels a > 0 et b > 0, ln(a × b) = ln(a) + ln(b).',
          'Inverse : ln(1 / b) = -ln(b).',
          'Quotient : ln(a / b) = ln(a) - ln(b).',
          'Puissance entière ou réelle : ln(aⁿ) = n × ln(a) (pour tout n ∈ ℤ).',
          'Radical : ln(√a) = 1/2 ln(a).',
        ],
        formula: 'ln(ab) = ln a + ln b ; ln(a/b) = ln a - ln b ; ln(aⁿ) = n·ln a ; ln(√a) = 1/2 ln a',
        example: 'ln(72) = ln(8 × 9) = ln(2³ × 3²) = 3 ln(2) + 2 ln(3).',
      },
      {
        title: '3. Dérivée, variations et convexité',
        subtitle: 'Stricte croissance et concavité sur ]0 ; +∞[',
        content: 'La fonction logarithme est infiniment dérivable sur son domaine de définition.',
        keyPoints: [
          'Dérivée de ln(x) : pour tout x > 0, (ln x)\' = 1 / x.',
          'Dérivée de ln(u(x)) : si u est une fonction dérivable et strictement positive sur I, alors (ln u)\' = u\' / u.',
          'Variations : comme 1/x > 0 pour tout x > 0, la fonction ln est STRICTEMENT CROISSANTE sur ]0 ; +∞[.',
          'Résolution : ln(a) = ln(b) ⇔ a = b et ln(a) < ln(b) ⇔ a < b.',
          'Signe de ln(x) : ln(x) < 0 pour x ∈ ]0 ; 1[, ln(1) = 0, et ln(x) > 0 pour x ∈ ]1 ; +∞[.',
          'Concavité : (ln x)\'\' = -1 / x² < 0, donc la fonction ln est STRICTEMENT CONCAVE sur ]0 ; +∞[.',
        ],
        formula: '(ln x)\' = 1/x ; (ln u)\' = u\'/u ; ln a < ln b ⇔ a < b',
      },
      {
        title: '4. Limites aux bornes et croissances comparées',
        subtitle: 'Comportements limites indispensables pour le Bac',
        content: 'Le logarithme croît plus lentement vers +∞ que n\'importe quelle puissance de x.',
        keyPoints: [
          'Limite en 0⁺ : lim_{x → 0⁺} ln(x) = -∞ (l\'axe des ordonnées x = 0 est asymptote verticale).',
          'Limite en +∞ : lim_{x → +∞} ln(x) = +∞.',
          'Croissance comparée en +∞ : lim_{x → +∞} [ln(x) / x] = 0. Plus généralement, pour tout n > 0 : lim_{x → +∞} [ln(x) / xⁿ] = 0.',
          'Croissance comparée en 0⁺ : lim_{x → 0⁺} [x · ln(x)] = 0. Plus généralement : lim_{x → 0⁺} [xⁿ · ln(x)] = 0.',
        ],
        formula: 'lim_{x→+∞} ln(x)/xⁿ = 0 ; lim_{x→0⁺} xⁿ·ln(x) = 0 (n > 0)',
      },
    ],
    keyDefinitions: [
      {
        term: 'Fonction logarithme népérien',
        definition: 'Fonction réciproque de la fonction exponentielle, définie sur ]0 ; +∞[.',
      },
    ],
    theorems: [
      {
        name: 'Théorème des croissances comparées',
        statement: 'Au voisinage de +∞, toute puissance xⁿ (n > 0) l\'emporte sur la fonction logarithme : ln(x) / xⁿ tend vers 0. Au voisinage de 0⁺, la puissance xⁿ l\'emporte sur le logarithme : xⁿ ln(x) tend vers 0.',
      },
    ],
    methods: [
      {
        title: 'Résoudre une équation avec logarithmes : ln(2x - 1) + ln(x + 2) = ln(10)',
        steps: [
          'Déterminer impérativement l\'ensemble de validité D : 2x - 1 > 0 (x > 1/2) et x + 2 > 0 (x > -2). Donc D = ]1/2 ; +∞[.',
          'Utiliser la formule de la somme pour regrouper : ln[(2x - 1)(x + 2)] = ln(10).',
          'Appliquer l\'injectivité de ln : (2x - 1)(x + 2) = 10 ⇔ 2x² + 3x - 2 = 10 ⇔ 2x² + 3x - 12 = 0.',
          'Résoudre l\'équation du second degré pour trouver les racines réelles.',
          'Ne retenir UNIQUEMENT que les solutions qui appartiennent à l\'ensemble de validité D.',
        ],
        example: {
          problem: 'Résoudre dans ℝ : ln(x - 3) = 2.',
          solution: 'Domaine de validité : x - 3 > 0 ⇔ x > 3. Par passage à l\'exponentielle : x - 3 = e² ⇔ x = e² + 3. Comme e² + 3 > 3, la solution est unique : S = {e² + 3}.',
        },
      },
    ],
    traps: [
      'Résoudre une équation avec ln sans avoir d\'abord déterminé le domaine d\'existence (on risque de retenir une valeur où l\'expression n\'existe pas !).',
      'Écrire que ln(a + b) = ln(a) + ln(b). C\'est faux : ln(a × b) = ln(a) + ln(b).',
      'Écrire (ln x)² = 2 ln x. C\'est faux : ln(x²) = 2 ln x, mais (ln x)² = (ln x) × (ln x).',
    ],
  },

  'term-integration-primitives': {
    chapterId: 'term-integration-primitives',
    level: 'terminale',
    title: 'Primitives, Calcul Intégral & Intégration par parties',
    summary: 'Notion de primitive d\'une fonction continue, primitives usuelles et formes composées, intégrale définie ∫_a^b f(t) dt, relation de Chasles, linéarité, positivité, valeur moyenne, calcul d\'aires et intégration par parties (IPP).',
    academicSources: [
      'Programme officiel Terminale Spécialité (B.O. 2019) - Analyse',
      'Éduscol : Primitives, intégration et équations différentielles',
    ],
    notions: [
      {
        title: '1. Notion de primitive d\'une fonction continue',
        subtitle: 'L\'opération réciproque de la dérivation',
        content: 'Soit f une fonction continue sur un intervalle I. Une primitive de f sur I est une fonction F dérivable sur I telle que F\'(x) = f(x).',
        keyPoints: [
          'Théorème d\'existence : toute fonction continue sur un intervalle admet des primitives sur cet intervalle.',
          'Ensemble des primitives : si F est une primitive de f, toutes les primitives de f s\'écrivent F(x) + C, où C est une constante réelle.',
          'Primitive vérifiant une condition initiale : il existe une unique primitive F vérifiant F(x₀) = y₀.',
        ],
        formula: 'F\'(x) = f(x) ; Toutes les primitives : F(x) + C (C ∈ ℝ)',
      },
      {
        title: '2. Primitives des fonctions usuelles et formes composées',
        subtitle: 'Le tableau des primitives indispensables',
        content: 'L\'identification des formes composées u\' × g(u) est la technique centrale du calcul de primitives.',
        keyPoints: [
          'xⁿ (n ≠ -1) : primitive xⁿ⁺¹ / (n + 1).',
          '1 / x sur ]0 ; +∞[ : primitive ln(x).',
          'eˣ : primitive eˣ.',
          '1 / √x : primitive 2√x.',
          'Forme u\' × uⁿ (n ≠ -1) : primitive uⁿ⁺¹ / (n + 1).',
          'Forme u\' / u : primitive ln(|u|).',
          'Forme u\' × eᵘ : primitive eᵘ.',
          'Forme u\' / √u : primitive 2√u.',
        ],
        formula: '∫ u\'·uⁿ dx = uⁿ⁺¹/(n+1) ; ∫ u\'/u dx = ln|u| ; ∫ u\'·eᵘ dx = eᵘ',
        example: 'Pour f(x) = 2x e^{x²} : on reconnaît u\' eᵘ avec u(x) = x² et u\'(x) = 2x. Une primitive est F(x) = e^{x²}.',
      },
      {
        title: '3. Définition et propriétés de l\'intégrale',
        subtitle: 'Théorème fondamental de l\'analyse',
        content: 'Soit f une fonction continue sur [a ; b] et F une primitive de f.',
        keyPoints: [
          'Définition : l\'intégrale de a à b de f est le nombre réel noté ∫_a^b f(t) dt = [F(t)]_a^b = F(b) - F(a).',
          'Relation de Chasles : pour tous a, b, c, ∫_a^c f(t) dt + ∫_c^b f(t) dt = ∫_a^b f(t) dt.',
          'Linéarité : ∫_a^b (α f(t) + β g(t)) dt = α ∫_a^b f(t) dt + β ∫_a^b g(t) dt.',
          'Positivité : si f ≥ 0 sur [a ; b] (avec a ≤ b), alors ∫_a^b f(t) dt ≥ 0.',
          'Conservation de l\'ordre : si f ≤ g sur [a ; b], alors ∫_a^b f ≤ ∫_a^b g.',
          'Valeur moyenne de f sur [a ; b] : μ = 1 / (b - a) × ∫_a^b f(t) dt.',
        ],
        formula: '∫_a^b f(t) dt = F(b) - F(a) ; Valeur moyenne : μ = 1/(b - a) ∫_a^b f(t) dt',
      },
      {
        title: '4. Interprétation géométrique comme aire et Intégration par parties (IPP)',
        subtitle: 'Calcul d\'aires et formule d\'intégration par parties',
        content: 'L\'intégrale mesure l\'aire algébrique sous la courbe dans un repère orthogonal.',
        keyPoints: [
          'Aire sous une courbe positive : si f ≥ 0 sur [a ; b], ∫_a^b f(t) dt représente l\'aire du domaine délimité par C_f, l\'axe (Ox) et les droites x = a et x = b (en unités d\'aire).',
          'Aire entre deux courbes : si f(x) ≥ g(x) sur [a ; b], l\'aire délimitée entre les deux courbes est Aire = ∫_a^b [f(x) - g(x)] dx.',
          'Formule d\'Intégration Par Parties (IPP) : pour deux fonctions u et v de classe C¹ sur [a ; b] : ∫_a^b u\'(t) v(t) dt = [u(t) v(t)]_a^b - ∫_a^b u(t) v\'(t) dt.',
          'Règle mnémotechnique ALPES pour choisir v(t) : Arcsin, Logarithme, Polynôme, Exponentielle, Sinus/Cosinus.',
        ],
        formula: '∫_a^b u\'(t) v(t) dt = [u(t) v(t)]_a^b - ∫_a^b u(t) v\'(t) dt',
      },
    ],
    keyDefinitions: [
      {
        term: 'Primitive',
        definition: 'Fonction F telle que F\' = f sur un intervalle donné.',
      },
      {
        term: 'Intégration par parties (IPP)',
        definition: 'Méthode d\'intégration issue de la règle de dérivation d\'un produit (uv)\' = u\'v + uv\'.',
      },
    ],
    theorems: [
      {
        name: 'Théorème fondamental de l\'analyse',
        statement: 'La fonction définie par Φ(x) = ∫_a^x f(t) dt est la primitive de f sur [a ; b] qui s\'annule en a. Sa dérivée vérifie Φ\'(x) = f(x).',
      },
    ],
    methods: [
      {
        title: 'Calculer une intégrale avec une intégration par parties : I = ∫_0^1 (2x + 1) eˣ dx',
        steps: [
          'Choisir v(x) et u\'(x) selon ALPES : le polynôme 2x + 1 se simplifie par dérivation, donc poser v(x) = 2x + 1 et u\'(x) = eˣ.',
          'Calculer la dérivée v\'(x) = 2 et la primitive u(x) = eˣ.',
          'Appliquer la formule : I = [(2x + 1) eˣ]_0^1 - ∫_0^1 2 eˣ dx.',
          'Calculer le crochet : [(2(1) + 1) e¹] - [(2(0) + 1) e⁰] = 3e - 1.',
          'Calculer l\'intégrale restante : ∫_0^1 2eˣ dx = [2eˣ]_0^1 = 2e - 2.',
          'Faire la soustraction : I = (3e - 1) - (2e - 2) = 3e - 1 - 2e + 2 = e + 1.',
        ],
        example: {
          problem: 'Calculer J = ∫_1^e ln(x) dx.',
          solution: 'Poser u\'(x) = 1 ⇒ u(x) = x, et v(x) = ln(x) ⇒ v\'(x) = 1/x. J = [x ln x]_1^e - ∫_1^e x(1/x) dx = (e ln e - 1 ln 1) - ∫_1^e 1 dx = e - [x]_1^e = e - (e - 1) = 1.',
        },
      },
    ],
    traps: [
      'Inverser les bornes dans le calcul du crochet : c\'est toujours F(b) - F(a) ("Haut MOINS Bas").',
      'Oublier le signe moins devant l\'intégrale dans l\'IPP : [uv] MOINS ∫ uv\'.',
      'Oublier que l\'intégrale d\'une fonction négative est un nombre négatif (pour calculer une aire géométrique, il faut prendre -∫ ou |∫|).',
    ],
  },

  'term-geometrie-espace': {
    chapterId: 'term-geometrie-espace',
    level: 'terminale',
    title: 'Géométrie dans l\'espace (Repères, Droites & Plans)',
    summary: 'Repérage cartésien tridimensionnel (O ; i, j, k), produit scalaire dans l\'espace, orthogonalité, représentations paramétriques de droites, équations cartésiennes de plans ax + by + cz + d = 0 et positions relatives.',
    academicSources: [
      'Programme de Terminale Spécialité Mathématiques (B.O. 2019) - Géométrie',
      'Éduscol : Produit scalaire dans l\'espace, droites et plans',
    ],
    notions: [
      {
        title: '1. Repérage orthonormé et produit scalaire dans l\'espace',
        subtitle: 'Extension des formules du plan à trois dimensions (x, y, z)',
        content: 'Dans un repère orthonormé (O ; i, j, k), chaque point est caractérisé par un triplet de coordonnées (x ; y ; z).',
        keyPoints: [
          'Coordonnées d\'un vecteur AB : (xB - xA ; yB - yA ; zB - zA).',
          'Milieu I du segment [AB] : ((xA+xB)/2 ; (yA+yB)/2 ; (zA+zB)/2).',
          'Norme d\'un vecteur u(x ; y ; z) : ||u|| = √(x² + y² + z²).',
          'Distance euclidienne AB : AB = √((xB - xA)² + (yB - yA)² + (zB - zA)²).',
          'Produit scalaire analytique : pour u(x ; y ; z) et v(x\' ; y\' ; z\'), u · v = x·x\' + y·y\' + z·z\'.',
          'Critère d\'orthogonalité : u ⊥ v ⇔ u · v = 0 ⇔ x·x\' + y·y\' + z·z\' = 0.',
        ],
        formula: 'u · v = xx\' + yy\' + zz\' ; AB = √((x_B-x_A)² + (y_B-y_A)² + (z_B-z_A)²)',
      },
      {
        title: '2. Représentation paramétrique d\'une droite',
        subtitle: 'Une droite définie par un point et un vecteur directeur',
        content: 'Soit d la droite passant par A(xA ; yA ; zA) et de vecteur directeur u(a ; b ; c) non nul.',
        keyPoints: [
          'Le point M(x ; y ; z) appartient à d si et seulement si AM et u sont colinéaires : AM = t·u pour un réel t ∈ ℝ.',
          'Système de représentation paramétrique : x = xA + a·t ; y = yA + b·t ; z = zA + c·t (avec t ∈ ℝ).',
          't est le paramètre réel. À chaque valeur de t correspond un unique point de la droite.',
        ],
        formula: 'Droite : { x = x_A + at ; y = y_A + bt ; z = z_A + ct } (t ∈ ℝ)',
        example: 'Droite passant par A(1 ; -2 ; 3) et de vecteur directeur u(2 ; 0 ; -1) : { x = 1 + 2t ; y = -2 ; z = 3 - t } (t ∈ ℝ).',
      },
      {
        title: '3. Équation cartésienne d\'un plan',
        subtitle: 'Plan défini par un point et un vecteur normal',
        content: 'Un vecteur normal n non nul à un plan P est orthogonal à tout vecteur directeur du plan.',
        keyPoints: [
          'M(x ; y ; z) appartient au plan passant par A et de vecteur normal n si et seulement si AM · n = 0.',
          'Équation cartésienne générale : ax + by + cz + d = 0, où les coefficients a, b, c sont les coordonnées du vecteur normal n(a ; b ; c).',
          'Réciproquement, tout ensemble de points vérifiant ax + by + cz + d = 0 (avec (a,b,c) ≠ (0,0,0)) est un plan de vecteur normal n(a ; b ; c).',
        ],
        formula: 'Plan P : ax + by + cz + d = 0 avec vecteur normal n(a ; b ; c)',
      },
      {
        title: '4. Positions relatives et intersections dans l\'espace',
        subtitle: 'Droites, plans et projection orthogonale',
        content: 'L\'intersection d\'objets géométriques se résout par des systèmes d\'équations.',
        keyPoints: [
          'Intersection droite/plan : on injecte la représentation paramétrique de la droite (x(t), y(t), z(t)) dans l\'équation cartésienne du plan pour déterminer la valeur du paramètre t.',
          'Droites dans l\'espace : deux droites peuvent être coplanaires (sécantes ou parallèles) OU NON COPLANAIRES (ni sécantes ni parallèles).',
          'Deux plans sont parallèles si et seulement si leurs vecteurs normaux sont colinéaires. S\'ils ne sont pas parallèles, ils se coupent selon une DROITE.',
          'Projection orthogonale d\'un point H sur un plan P : H est l\'intersection du plan P avec la droite perpendiculaire à P passant par ce point.',
        ],
      },
    ],
    keyDefinitions: [
      {
        term: 'Vecteur normal à un plan',
        definition: 'Vecteur non nul orthogonal à deux vecteurs non colinéaires du plan.',
      },
      {
        term: 'Droites non coplanaires',
        definition: 'Deux droites de l\'espace qui n\'appartiennent à aucun plan commun. Elles ne sont ni parallèles ni sécantes.',
      },
    ],
    theorems: [
      {
        name: 'Caractérisation de l\'orthogonalité droite-plan',
        statement: 'Une droite d de vecteur directeur u est orthogonale à un plan P si et seulement si son vecteur directeur u est colinéaire à un vecteur normal n du plan.',
      },
    ],
    methods: [
      {
        title: 'Déterminer le point d\'intersection d\'une droite d et d\'un plan P',
        steps: [
          'Écrire la représentation paramétrique de d : { x = x_A + at ; y = y_A + bt ; z = z_A + ct }.',
          'Remplacer x, y et z par ces expressions en fonction de t dans l\'équation du plan ax + by + cz + d = 0.',
          'Résoudre l\'équation du premier degré d\'inconnue t.',
          'Réinjecter la valeur de t obtenue dans la représentation paramétrique de d pour trouver les coordonnées du point d\'intersection.',
        ],
        example: {
          problem: 'Trouver l\'intersection de d: { x = 1 + 2t ; y = -t ; z = 3 + t } avec le plan P: 2x + y - z + 4 = 0.',
          solution: '2(1 + 2t) + (-t) - (3 + t) + 4 = 0 ⇔ 2 + 4t - t - 3 - t + 4 = 0 ⇔ 2t + 3 = 0 ⇔ t = -1,5. En remplaçant t = -1,5 : x = 1 - 3 = -2 ; y = 1,5 ; z = 3 - 1,5 = 1,5. Le point d\'intersection est I(-2 ; 1,5 ; 1,5).',
        },
      },
    ],
    traps: [
      'Affirmer que deux droites non parallèles se coupent obligatoirement : dans l\'espace, elles peuvent être NON COPLANAIRES (passer l\'une au-dessus de l\'autre sans jamais se toucher !).',
      'Confondre le vecteur normal n(a ; b ; c) d\'un plan avec un vecteur contenu dans le plan. n est PERPENDICULAIRE au plan.',
    ],
  },

  'term-loi-binomiale': {
    chapterId: 'term-loi-binomiale',
    level: 'terminale',
    title: 'Loi Binomiale & Épreuves de Bernoulli',
    summary: 'Épreuve et schéma de Bernoulli (indépendance), coefficients binomiaux (formule, symétrie, triangle de Pascal), loi binomiale B(n, p), espérance mathématique E(X) = np, variance V(X) = np(1-p) et calculs de probabilités cumulées.',
    academicSources: [
      'Programme de Terminale Spécialité Mathématiques (B.O. 2019) - Probabilités',
      'Éduscol : Modélisation par la loi binomiale et échantillonnage',
    ],
    notions: [
      {
        title: '1. Épreuve et Schéma de Bernoulli',
        subtitle: 'Répétition d\'épreuves identiques et indépendantes',
        content: 'La loi binomiale est le modèle probabiliste par excellence du comptage des succès.',
        keyPoints: [
          'Épreuve de Bernoulli : expérience aléatoire ne comportant que deux issues contraires : le Succès (S) de probabilité p, et l\'Échec (E) de probabilité q = 1 - p.',
          'Schéma de Bernoulli d\'ordre n : répétition de n épreuves de Bernoulli IDENTIQUES et INDÉPENDANTES (le résultat de chaque tirage n\'affecte pas les suivants, comme un tirage avec remise).',
        ],
        formula: 'P(S) = p ; P(E) = 1 - p',
      },
      {
        title: '2. Coefficients binomiaux et Triangle de Pascal',
        subtitle: 'Dénombrement des chemins réalisant k succès',
        content: 'Le coefficient binomial (n parmi k) représente le nombre de chemins comportant exactement k succès dans l\'arbre à n niveaux.',
        keyPoints: [
          'Notation : (n parmi k) ou C(n, k).',
          'Formule avec factorielles : (n parmi k) = n! / [k! (n - k)!], où n! = 1 × 2 × ... × n (avec 0! = 1 par convention).',
          'Valeurs remarquables : (n parmi 0) = 1, (n parmi n) = 1, (n parmi 1) = n.',
          'Symétrie : (n parmi k) = (n parmi n - k).',
          'Relation de Pascal (Triangle de Pascal) : (n parmi k) + (n parmi k + 1) = (n + 1 parmi k + 1).',
        ],
        formula: '(n parmi k) = n! / [k!(n - k)!] ; (n parmi k) + (n parmi k+1) = (n+1 parmi k+1)',
      },
      {
        title: '3. La Loi Binomiale B(n, p)',
        subtitle: 'Formule de calcul et distribution de probabilité',
        content: 'Soit X la variable aléatoire comptant le nombre total de succès obtenus à l\'issue d\'un schéma de Bernoulli.',
        keyPoints: [
          'X suit la loi binomiale de paramètres n et p, notée X ~ B(n, p).',
          'Valeurs possibles de X : entiers k ∈ {0, 1, 2, ..., n}.',
          'Formule fondamentale : pour tout entier k compris entre 0 et n : P(X = k) = (n parmi k) × pᵏ × (1 - p)ⁿ⁻ᵏ.',
        ],
        formula: 'P(X = k) = (n parmi k) × pᵏ × (1 - p)ⁿ⁻ᵏ',
        example: 'Pour X ~ B(4 ; 0,3) : P(X = 2) = (4 parmi 2) × (0,3)² × (0,7)² = 6 × 0,09 × 0,49 = 0,2646 (26,46%).',
      },
      {
        title: '4. Paramètres de la loi : Espérance, Variance et Écart-type',
        subtitle: 'Moyenne et dispersion théoriques',
        content: 'Les paramètres de la loi binomiale se calculent par des formules simplifiées immédiates.',
        keyPoints: [
          'Espérance mathématique : E(X) = n × p. (Moyenne théorique du nombre de succès sur n répétitions).',
          'Variance : V(X) = n × p × (1 - p).',
          'Écart-type : σ(X) = √V(X) = √(n × p × (1 - p)).',
          'Probabilité "au moins un succès" : P(X ≥ 1) = 1 - P(X = 0) = 1 - (1 - p)ⁿ.',
        ],
        formula: 'E(X) = n·p ; V(X) = n·p(1 - p) ; P(X ≥ 1) = 1 - (1 - p)ⁿ',
      },
    ],
    keyDefinitions: [
      {
        term: 'Loi binomiale',
        definition: 'Loi de probabilité discrète modélisant le nombre de succès dans une suite de n épreuves de Bernoulli indépendantes de même paramètre p.',
      },
    ],
    theorems: [
      {
        name: 'Formule du binôme de Newton',
        statement: 'Pour tous réels a et b et tout entier n ∈ ℕ : (a + b)ⁿ = ∑_{k=0}^n (n parmi k) aᵏ bⁿ⁻ᵏ. En posant a = p et b = 1 - p, on vérifie que la somme de toutes les probabilités P(X=k) vaut (p + 1 - p)ⁿ = 1ⁿ = 1.',
      },
    ],
    methods: [
      {
        title: 'Calculer la probabilité d\'obtenir "au moins un succès" P(X ≥ 1)',
        steps: [
          'Identifier la loi : X suit B(n, p).',
          'Écrire l\'événement contraire : l\'événement contraire de "au moins un succès" (X ≥ 1) est "zéro succès" (X = 0).',
          'Calculer P(X = 0) = (1 - p)ⁿ.',
          'Conclure : P(X ≥ 1) = 1 - P(X = 0) = 1 - (1 - p)ⁿ.',
        ],
        example: {
          problem: 'On lance 6 fois une pièce équilibrée (p = 0,5). Quelle est la probabilité d\'obtenir au moins un Pile ?',
          solution: 'X suit B(6 ; 0,5). P(X = 0) = (0,5)⁶ = 1/64. P(X ≥ 1) = 1 - 1/64 = 63/64 ≈ 0,9844 (soit 98,44%).',
        },
      },
    ],
    traps: [
      'Appliquer la loi binomiale sans avoir justifié l\'INDÉPENDANCE des épreuves (ex: tirages sans remise dans une petite population ne sont PAS indépendants !).',
      'Confondre P(X < k) et P(X ≤ k) : comme X ne prend que des entiers, P(X < 3) = P(X ≤ 2) = P(X=0) + P(X=1) + P(X=2).',
    ],
  },

  'term-complexes-notions': {
    chapterId: 'term-complexes-notions',
    level: 'terminale',
    title: 'Nombres complexes (Algèbre, Trigonométrie & Géométrie)',
    summary: 'Ensemble ℂ, nombre imaginaire i (i² = -1), forme algébrique z = a + ib, conjugué z̄, module |z|, argument arg(z), forme trigonométrique, notation exponentielle d\'Euler z = r e^{iθ}, formules de Moivre et d\'Euler, et équations du second degré à coefficients réels.',
    academicSources: [
      'Programme de Terminale Maths Expertes & Complémentaires (B.O. 2019)',
      'Éduscol : Nombres complexes, géométrie et trigonométrie',
    ],
    notions: [
      {
        title: '1. Forme algébrique et conjugué dans ℂ',
        subtitle: 'L\'extension imaginaire de ℝ',
        content: 'Il existe un ensemble noté ℂ contenant ℝ, doté d\'un élément noté i vérifiant i² = -1.',
        keyPoints: [
          'Forme algébrique : tout nombre complexe z s\'écrit de manière unique z = a + i·b, où a et b sont des réels.',
          'Partie réelle : Re(z) = a. Partie imaginaire : Im(z) = b (attention : Im(z) est un nombre RÉEL).',
          'Complexe nul : a + ib = 0 ⇔ a = 0 et b = 0.',
          'Conjugué de z : noté z̄ = a - ib. Propriétés : z + z̄ = 2a = 2Re(z) ; z - z̄ = 2ib = 2i Im(z) ; z × z̄ = a² + b² (toujours un réel positif !).',
          'Règles opératoires du conjugué : conj(z + z\') = z̄ + z̄\' et conj(z × z\') = z̄ × z̄\'.',
        ],
        formula: 'z = a + ib ; i² = -1 ; z̄ = a - ib ; z·z̄ = a² + b²',
        example: 'Pour z = 3 - 4i : Re(z) = 3, Im(z) = -4. z̄ = 3 + 4i. z × z̄ = 3² + (-4)² = 9 + 16 = 25.',
      },
      {
        title: '2. Module et Argument d\'un nombre complexe',
        subtitle: 'Interprétation géométrique dans le plan complexe',
        content: 'Dans le plan muni d\'un repère orthonormé direct (O ; u, v), à tout z = a + ib correspond un unique point M(a ; b) (appelé point image) et le vecteur OM (vecteur image). z est l\'affixe de M.',
        keyPoints: [
          'Module |z| : distance OM. |z| = √(a² + b²) = √(z · z̄). Propriétés : |z × z\'| = |z| × |z\'| et |z / z\'| = |z| / |z\'|.',
          'Argument arg(z) (pour z ≠ 0) : mesure de l\'angle orienté (u, OM) modulo 2π. Noté θ.',
          'Formules de passage : a = |z| cos(θ) et b = |z| sin(θ). Donc cos(θ) = a / |z| et sin(θ) = b / |z|.',
          'Propriétés de l\'argument : arg(z × z\') = arg(z) + arg(z\') [2π] ; arg(1 / z) = -arg(z) [2π] ; arg(z / z\') = arg(z) - arg(z\') [2π].',
        ],
        formula: '|z| = √(a² + b²) ; cos(θ) = a/|z| ; sin(θ) = b/|z|',
      },
      {
        title: '3. Forme trigonométrique et notation exponentielle d\'Euler',
        subtitle: 'Formules de Moivre et formules d\'Euler',
        content: 'La notation exponentielle condense magnifiquement les règles de multiplication et d\'angles.',
        keyPoints: [
          'Forme trigonométrique : z = r (cos θ + i sin θ), avec r = |z| > 0 et θ = arg(z).',
          'Notation exponentielle : par convention d\'Euler, e^{iθ} = cos(θ) + i sin(θ). Donc z = r e^{iθ}.',
          'Formule de Moivre : (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ), soit (e^{iθ})ⁿ = e^{i·nθ}.',
          'Formules d\'Euler : cos(θ) = (e^{iθ} + e^{-iθ}) / 2 et sin(θ) = (e^{iθ} - e^{-iθ}) / (2i).',
          'L\'identité d\'Euler remarquable : e^{iπ} + 1 = 0.',
        ],
        formula: 'z = r·e^{iθ} ; (e^{iθ})ⁿ = e^{inθ} ; cos θ = (e^{iθ} + e^{-iθ})/2 ; sin θ = (e^{iθ} - e^{-iθ})/(2i)',
      },
      {
        title: '4. Équations du second degré dans ℂ',
        subtitle: 'Résolution de az² + bz + c = 0 à coefficients réels avec Δ < 0',
        content: 'Dans ℂ, toute équation du second degré admet des solutions, même lorsque Δ < 0.',
        keyPoints: [
          'Calcul du discriminant réel : Δ = b² - 4ac.',
          'Si Δ > 0 : 2 racines réelles distinctes (-b ± √Δ) / (2a).',
          'Si Δ = 0 : 1 racine réelle double -b / (2a).',
          'Si Δ < 0 : 2 racines COMPLEXES CONJUGUÉES distinctes : z₁ = (-b - i√|Δ|) / (2a) et z₂ = (-b + i√|Δ|) / (2a).',
        ],
        formula: 'Si Δ < 0 : z_{1,2} = (-b ± i√|Δ|) / (2a)',
        example: 'Résoudre z² - 2z + 5 = 0 : Δ = (-2)² - 4(1)(5) = 4 - 20 = -16 = (4i)². Racines : z₁ = (2 - 4i)/2 = 1 - 2i et z₂ = 1 + 2i.',
      },
    ],
    keyDefinitions: [
      {
        term: 'Affixe d\'un point',
        definition: 'Nombre complexe z = a + ib associé au point M(a ; b) dans le plan complexe.',
      },
      {
        term: 'Module',
        definition: 'Longueur du segment reliant l\'origine au point image de z, égale à √(a² + b²).',
      },
    ],
    theorems: [
      {
        name: 'Formule de Moivre',
        statement: 'Pour tout réel θ et tout entier relatif n : (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ).',
      },
    ],
    methods: [
      {
        title: 'Mettre un nombre complexe sous forme exponentielle : z = -1 + i√3',
        steps: [
          'Calculer le module r = |z| = √((-1)² + (√3)²) = √(1 + 3) = √4 = 2.',
          'Déterminer cos(θ) = a / r = -1 / 2 et sin(θ) = b / r = √3 / 2.',
          'Identifier l\'angle remarquable : cos(π/3) = 1/2. Comme le cosinus est négatif et le sinus positif, θ = π - π/3 = 2π/3.',
          'Écrire la forme exponentielle : z = 2 e^{i 2π/3}.',
        ],
        example: {
          problem: 'Écrire z = 1 - i sous forme exponentielle.',
          solution: '|z| = √(1² + (-1)²) = √2. cos(θ) = 1/√2 = √2/2 et sin(θ) = -1/√2 = -√2/2. Donc θ = -π/4. z = √2 e^{-i π/4}.',
        },
      },
    ],
    traps: [
      'Inclure le "i" dans la partie imaginaire : pour 3 - 5i, Im(z) = -5 (et NON -5i !).',
      'Oublier le "i" au dénominateur dans la formule d\'Euler du sinus : c\'est divisé par 2i et non par 2.',
      'Oublier la racine carrée dans le module : |a + ib| = √(a² + b²) et non a² + b².',
    ],
  },
};

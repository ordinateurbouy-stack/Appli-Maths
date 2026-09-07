import { CourseSheet } from '../../types';

export const PREMIERE_COURSES: Record<string, CourseSheet> = {
  'prem-second-degre': {
    chapterId: 'prem-second-degre',
    level: 'premiere',
    title: 'Polynômes du second degré & Équations',
    summary: 'Étude exhaustive du trinôme f(x) = ax² + bx + c (a ≠ 0) : forme canonique, discriminant Δ, factorisation, racines réelles, signe, variations de la parabole, somme et produit des racines.',
    academicSources: [
      'Programme de Première Spécialité Mathématiques (B.O. n°1 du 22 janvier 2019)',
      'Éduscol : Algèbre et étude des trinômes du second degré',
    ],
    notions: [
      {
        title: '1. Forme développée et forme canonique',
        subtitle: 'Identification du sommet de la parabole',
        content: 'Toute fonction polynôme du second degré peut s\'écrire de plusieurs manières selon l\'objectif recherché (résolution, variations, factorisation).',
        keyPoints: [
          'Forme développée : f(x) = ax² + bx + c, avec a, b, c réels et a ≠ 0.',
          'Forme canonique : f(x) = a(x - α)² + β, où α = -b / (2a) et β = f(α) = -(b² - 4ac) / (4a).',
          'Interprétation graphique : la courbe représentative est une parabole de sommet S(α ; β) et d\'axe de symétrie vertical la droite d\'équation x = α.',
          'Orientation de la parabole : tournée vers le haut si a > 0 (admet un minimum en α) ; tournée vers le bas si a < 0 (admet un maximum en α).',
        ],
        formula: 'f(x) = a(x + b/(2a))² - (b² - 4ac)/(4a) = a(x - α)² + β',
        example: 'Pour f(x) = 2x² - 8x + 5 : a = 2, b = -8. α = -(-8)/(2×2) = 2. β = f(2) = 2(4) - 16 + 5 = -3. Forme canonique : 2(x - 2)² - 3. Sommet S(2 ; -3).',
      },
      {
        title: '2. Discriminant et racines réelles de ax² + bx + c = 0',
        subtitle: 'Les trois cas selon le signe de Δ',
        content: 'Le discriminant noté Δ (delta) régit l\'existence et le nombre de points de contact de la parabole avec l\'axe des abscisses.',
        keyPoints: [
          'Formule du discriminant : Δ = b² - 4ac.',
          'Si Δ > 0 : 2 racines réelles distinctes : x₁ = (-b - √Δ) / (2a) et x₂ = (-b + √Δ) / (2a). La parabole coupe l\'axe (Ox) en deux points.',
          'Si Δ = 0 : 1 racine réelle double : x₀ = -b / (2a). La parabole est tangente à l\'axe (Ox) en son sommet.',
          'Si Δ < 0 : aucune racine réelle. La parabole ne coupe jamais l\'axe (Ox).',
        ],
        formula: 'Δ = b² - 4ac ; x_{1,2} = (-b ± √Δ) / (2a)',
      },
      {
        title: '3. Factorisation et signe du trinôme',
        subtitle: 'Règle générale d\'évaluation du signe',
        content: 'La connaissance des racines permet d\'obtenir immédiatement la factorisation et le tableau de signes.',
        keyPoints: [
          'Factorisation si Δ > 0 : f(x) = a(x - x₁)(x - x₂). Ne jamais oublier le coefficient multiplicateur "a" !',
          'Factorisation si Δ = 0 : f(x) = a(x - x₀)².',
          'Factorisation si Δ < 0 : aucune factorisation dans ℝ.',
          'Règle du signe : ax² + bx + c est TOUJOURS du signe de a, sauf ENTRE les racines (lorsque Δ > 0) où il est du signe opposé à a ("signe de -a entre les racines").',
        ],
        formula: 'Si Δ > 0 : f(x) = a(x - x₁)(x - x₂)',
      },
      {
        title: '4. Relations entre coefficients et racines',
        subtitle: 'Somme et produit des racines (Relations de Viète)',
        content: 'Si un trinôme ax² + bx + c admet deux racines x₁ et x₂, leurs somme et produit sont reliés directement aux coefficients a, b, c.',
        keyPoints: [
          'Somme des racines : S = x₁ + x₂ = -b / a.',
          'Produit des racines : P = x₁ × x₂ = c / a.',
          'Application : permet de trouver une racine évidente (1, -1, 2) et d\'en déduire instantanément la seconde sans calculer Δ.',
          'Deux réels ont pour somme S et pour produit P si et seulement s\'ils sont les solutions de l\'équation X² - SX + P = 0.',
        ],
        formula: 'x₁ + x₂ = -b/a ; x₁ × x₂ = c/a ; X² - SX + P = 0',
        example: 'Pour x² - 5x + 6 = 0 : S = 5, P = 6. On voit immédiatement les racines 2 et 3 car 2 + 3 = 5 et 2 × 3 = 6.',
      },
    ],
    keyDefinitions: [
      {
        term: 'Racine d\'un polynôme',
        definition: 'Tout nombre réel r vérifiant f(r) = 0. Géométriquement, c\'est l\'abscisse d\'un point d\'intersection de la courbe avec l\'axe horizontal (Ox).',
      },
      {
        term: 'Forme canonique',
        definition: 'Écriture a(x - α)² + β d\'un trinôme mettant en évidence les coordonnées du sommet S(α, β) de sa parabole.',
      },
    ],
    theorems: [
      {
        name: 'Théorème du signe du trinôme',
        statement: 'Pour tout réel x, le trinôme ax² + bx + c est du signe de a si Δ < 0. Si Δ = 0, il est du signe de a pour x ≠ -b/(2a) et s\'annule en cette racine. Si Δ > 0, il est du signe opposé à a sur l\'intervalle ouvert ]x₁ ; x₂[ et du signe de a à l\'extérieur.',
      },
    ],
    methods: [
      {
        title: 'Résoudre une inéquation du second degré : ax² + bx + c ≥ 0',
        steps: [
          'Calculer le discriminant Δ = b² - 4ac.',
          'Déterminer les racines éventuelles x₁ et x₂.',
          'Identifier le signe du coefficient a.',
          'Appliquer le théorème du signe : le trinôme est du signe de a à l\'extérieur des racines et de -a à l\'intérieur.',
          'Conclure en écrivant l\'intervalle ou la réunion d\'intervalles correspondant à l\'inégalité demandée.',
        ],
        example: {
          problem: 'Résoudre dans ℝ : -2x² + 5x - 2 > 0.',
          solution: 'a = -2, b = 5, c = -2. Δ = 25 - 4(-2)(-2) = 25 - 16 = 9 = 3². Racines : x₁ = (-5 - 3)/(-4) = 2 et x₂ = (-5 + 3)/(-4) = 1/2. Puisque a = -2 < 0, le trinôme est STRICTEMENT POSITIF (signe opposé à a) STRICTEMENT ENTRE les racines. Donc S = ]1/2 ; 2[.',
        },
      },
    ],
    traps: [
      'Oublier le facteur "a" lors de la factorisation : écrire (x - 1/2)(x - 2) au lieu de 2(x - 1/2)(x - 2) pour 2x² - 5x + 2.',
      'Confondre le signe de a et le signe de Δ. Le signe de Δ donne le nombre de racines (2, 1 ou 0), alors que le signe de a donne le sens d\'ouverture de la parabole.',
      'Inverser les signes dans α : rappel α = -b / (2a) et non +b / (2a).',
    ],
  },

  'prem-derivation': {
    chapterId: 'prem-derivation',
    level: 'premiere',
    title: 'Dérivation locale & globale, tangentes et variations',
    summary: 'Comprendre le nombre dérivé comme limite du taux de variation et coefficient directeur de la tangente, équation de la tangente, dérivation des fonctions usuelles et opérations, lien fondamental avec le sens de variation et recherche d\'extremums.',
    academicSources: [
      'Programme de Première Spécialité Mathématiques (B.O. 2019) - Analyse',
      'Ressources Éduscol : Nombre dérivé, tangentes et étude de variations',
    ],
    notions: [
      {
        title: '1. Taux de variation et nombre dérivé en un point',
        subtitle: 'Approche locale et interprétation géométrique',
        content: 'Le nombre dérivé mesure la vitesse instantanée d\'évolution de la fonction en un point précis.',
        keyPoints: [
          'Taux de variation entre a et a + h : τ(h) = [f(a + h) - f(a)] / h (pente de la sécante).',
          'Nombre dérivé f\'(a) : limite quand h tend vers 0 de ce taux de variation, si cette limite est un réel fini.',
          'Interprétation géométrique : f\'(a) est le coefficient directeur (la pente) de la tangente T_a à la courbe au point A(a ; f(a)).',
          'Équation fondamentale de la tangente : y = f\'(a)(x - a) + f(a).',
        ],
        formula: 'f\'(a) = lim_{h → 0} [f(a+h) - f(a)] / h ; y = f\'(a)(x - a) + f(a)',
        example: 'Pour f(x) = x² en a = 3 : f\'(3) = 2(3) = 6 et f(3) = 9. Tangente : y = 6(x - 3) + 9 = 6x - 9.',
      },
      {
        title: '2. Tableau des dérivées des fonctions usuelles',
        subtitle: 'Formules de référence à mémoriser',
        content: 'Chaque fonction usuelle possède une fonction dérivée calculable sur son ensemble de dérivabilité.',
        keyPoints: [
          'Constante c : (c)\' = 0 sur ℝ.',
          'Fonction x : (x)\' = 1 ; plus généralement (ax + b)\' = a sur ℝ.',
          'Puissance xⁿ (n ∈ ℕ*) : (xⁿ)\' = n·xⁿ⁻¹ sur ℝ.',
          'Inverse 1/x : (1/x)\' = -1 / x² sur ]-∞ ; 0[ et ]0 ; +∞[.',
          'Racine carrée √x : (√x)\' = 1 / (2√x) sur ]0 ; +∞[ (attention : non dérivable en 0 !).',
          'Exponentielle eˣ : (eˣ)\' = eˣ sur ℝ.',
        ],
        formula: '(xⁿ)\' = n·xⁿ⁻¹ ; (1/x)\' = -1/x² ; (√x)\' = 1/(2√x) ; (eˣ)\' = eˣ',
      },
      {
        title: '3. Règles de dérivation des opérations',
        subtitle: 'Somme, produit, quotient et composée affine',
        content: 'Soient u et v deux fonctions dérivables sur un intervalle I.',
        keyPoints: [
          'Somme : (u + v)\' = u\' + v\'.',
          'Multiplication par une constante k : (k·u)\' = k·u\'.',
          'Produit de deux fonctions : (u × v)\' = u\'v + uv\' (JAMAIS u\'v\' !).',
          'Inverse d\'une fonction (v ≠ 0) : (1 / v)\' = -v\' / v².',
          'Quotient de deux fonctions (v ≠ 0) : (u / v)\' = (u\'v - uv\') / v².',
          'Composée affine : si g(x) = f(ax + b), alors g\'(x) = a × f\'(ax + b).',
        ],
        formula: '(uv)\' = u\'v + uv\' ; (u/v)\' = (u\'v - uv\') / v² ; (f(ax+b))\' = a·f\'(ax+b)',
      },
      {
        title: '4. Lien fondamental entre signe de la dérivée et variations',
        subtitle: 'Théorème de Lagrange et recherche d\'extremums',
        content: 'Le signe de la dérivée f\' régit intégralement le sens de variation de f.',
        keyPoints: [
          'Si f\'(x) > 0 sur un intervalle I (sauf éventuellement en un nombre fini de points où f\' s\'annule), alors f est STRICTEMENT CROISSANTE sur I.',
          'Si f\'(x) < 0 sur I, alors f est STRICTEMENT DÉCROISSANTE sur I.',
          'Si f\'(x) = 0 sur tout l\'intervalle I, alors f est CONSTANTE sur I.',
          'Extremum local : si f\'(x₀) = 0 ET que f\' CHANGE DE SIGNE en x₀, alors f admet un extremum local (maximum si f\' passe de + à -, minimum si f\' passe de - à +) en x₀.',
        ],
        formula: 'f\'(x) > 0 ⇔ f croissante ; f\'(x) < 0 ⇔ f décroissante',
      },
    ],
    keyDefinitions: [
      {
        term: 'Nombre dérivé',
        definition: 'Coefficient directeur de la tangente à la courbe au point d\'abscisse a, défini par la limite du taux d\'accroissement.',
      },
      {
        term: 'Point stationnaire / critique',
        definition: 'Point x₀ où la dérivée s\'annule : f\'(x₀) = 0. La tangente à la courbe y est horizontale.',
      },
    ],
    theorems: [
      {
        name: 'Théorème de la dérivation et des extremums',
        statement: 'Soit f une fonction dérivable sur un intervalle ouvert I. Si f admet un extremum local en x₀ ∈ I, alors f\'(x₀) = 0. Attention, la réciproque est fausse : f\' peut s\'annuler sans changement de signe (ex: f(x) = x³ en 0 où f\'(0)=0 mais 0 n\'est pas un extremum).',
      },
    ],
    methods: [
      {
        title: 'Étudier les variations complètes d\'une fonction rationnelle',
        steps: [
          'Déterminer le domaine de définition et de dérivabilité D.',
          'Calculer f\'(x) en appliquant la formule du quotient (u\'v - uv\') / v².',
          'Développer et réduire le numérateur SANS JAMAIS développer le dénominateur v² (qui est toujours strictement positif !).',
          'Étudier le signe du numérateur (souvent du second degré via Δ).',
          'Dresser le tableau de signes de f\'(x) puis le tableau de variations complet de f.',
        ],
        example: {
          problem: 'Étudier les variations de f(x) = (2x + 1) / (x - 3) sur ℝ \\ {3}.',
          solution: 'u = 2x + 1 ⇒ u\' = 2 ; v = x - 3 ⇒ v\' = 1. f\'(x) = [2(x - 3) - (2x + 1)(1)] / (x - 3)² = (2x - 6 - 2x - 1) / (x - 3)² = -7 / (x - 3)². Comme -7 < 0 et (x - 3)² > 0, f\'(x) < 0 sur ]-∞ ; 3[ et sur ]3 ; +∞[. f est strictement décroissante sur chacun des deux intervalles.',
        },
      },
    ],
    traps: [
      'Écrire que (u × v)\' = u\' × v\'. C\'est une erreur majeure d\'examen : la formule exacte est (u v)\' = u\'v + uv\'.',
      'Développer le dénominateur v² dans la dérivée d\'un quotient : le garder sous forme v² permet de savoir immédiatement qu\'il est positif !',
      'Penser qu\'un zéro de la dérivée donne toujours un extremum : il faut obligatoirement qu\'il y ait un CHANGEMENT DE SIGNE de la dérivée.',
    ],
  },

  'prem-suites-numeriques': {
    chapterId: 'prem-suites-numeriques',
    level: 'premiere',
    title: 'Suites numériques (Arithmétiques & Géométriques)',
    summary: 'Définitions explicite et par récurrence, sens de variation, modélisation par suites arithmétiques et géométriques, formules explicites du terme général et calcul des sommes de termes consécutifs.',
    academicSources: [
      'Programme officiel de Première Spécialité (B.O. 2019) - Analyse discrète',
      'Éduscol : Suites arithmétiques, géométriques et algorithmique',
    ],
    notions: [
      {
        title: '1. Modes de génération et variations d\'une suite',
        subtitle: 'Formule explicite vs relation de récurrence',
        content: 'Une suite numérique (u_n) est une fonction définie sur ℕ (ou une partie de ℕ) qui à chaque entier naturel n associe un réel u_n.',
        keyPoints: [
          'Formule explicite : u_n = f(n). Permet de calculer n\'importe quel terme directement sans connaître les précédents (ex: u_n = 3n² - 1).',
          'Relation de récurrence : u_{n+1} = f(u_n) avec la donnée d\'un terme initial u_0. Chaque terme se calcule à partir du précédent.',
          'Sens de variation : pour étudier les variations, on étudie le signe de la différence u_{n+1} - u_n. Si u_{n+1} - u_n ≥ 0 pour tout n, la suite est croissante.',
          'Cas de termes strictement positifs : on peut aussi comparer le quotient u_{n+1} / u_n à 1.',
        ],
        formula: 'u_{n+1} - u_n ≥ 0 ⇔ (u_n) croissante ; u_{n+1} - u_n ≤ 0 ⇔ (u_n) décroissante',
      },
      {
        title: '2. Suites arithmétiques',
        subtitle: 'Progression par addition d\'une raison constante r',
        content: 'Chaque terme s\'obtient en ajoutant un même réel constant r (la raison) au terme précédent.',
        keyPoints: [
          'Définition par récurrence : u_{n+1} = u_n + r.',
          'Formule explicite : u_n = u_0 + n·r, ou plus généralement u_n = u_p + (n - p)·r.',
          'Sens de variation : si r > 0, la suite est strictement croissante. Si r < 0, strictement décroissante. Si r = 0, constante.',
          'Représentation graphique : les points de coordonnées (n ; u_n) sont situés sur une droite de coefficient directeur r.',
        ],
        formula: 'u_n = u_0 + n·r ; u_n = u_p + (n - p)·r',
        example: 'Si u_0 = 4 et r = -3 : u_n = 4 - 3n. u_{10} = 4 - 3(10) = -26.',
      },
      {
        title: '3. Suites géométriques',
        subtitle: 'Progression par multiplication par une raison q',
        content: 'Chaque terme s\'obtient en multipliant le précédent par un même réel constant q ≠ 0 (la raison).',
        keyPoints: [
          'Définition par récurrence : u_{n+1} = q × u_n.',
          'Formule explicite : u_n = u_0 × qⁿ, ou plus généralement u_n = u_p × qⁿ⁻ᵖ.',
          'Sens de variation (pour u_0 > 0) : si q > 1, la suite est strictement croissante. Si 0 < q < 1, strictement décroissante. Si q < 0, la suite oscille (signe alterné, ni croissante ni décroissante).',
          'Comportement asymptotique : si |q| < 1, lim_{n → +∞} qⁿ = 0. Si q > 1, lim_{n → +∞} qⁿ = +∞.',
        ],
        formula: 'u_n = u_0 × qⁿ ; u_n = u_p × qⁿ⁻ᵖ',
        example: 'Si u_0 = 5 et q = 2 : u_n = 5 × 2ⁿ. u_6 = 5 × 64 = 320.',
      },
      {
        title: '4. Sommes de termes consécutifs',
        subtitle: 'Formules fondamentales de sommation',
        content: 'Le calcul rapide de la somme des termes consécutifs est une compétence majeure d\'examen.',
        keyPoints: [
          'Somme des premiers entiers : 1 + 2 + 3 + ... + n = n(n + 1) / 2.',
          'Somme de termes d\'une suite arithmétique : S = (Nombre de termes) × [(1er terme + Dernier terme) / 2].',
          'Somme des puissances consécutives de q ≠ 1 : 1 + q + q² + ... + qⁿ = (1 - qⁿ⁺¹) / (1 - q).',
          'Somme de termes d\'une suite géométrique : S = (1er terme) × [(1 - q^{Nombre de termes}) / (1 - q)].',
          'Règle de comptage du nombre de termes : de u_p à u_n inclus, il y a exactement (n - p + 1) termes.',
        ],
        formula: 'S_{arith} = N × (u_{deb} + u_{fin})/2 ; S_{geom} = u_{deb} × (1 - q^N)/(1 - q)',
      },
    ],
    keyDefinitions: [
      {
        term: 'Raison d\'une suite',
        definition: 'Constante r (pour une suite arithmétique) ou q (pour une suite géométrique) qui caractérise le passage d\'un terme au suivant.',
      },
    ],
    theorems: [
      {
        name: 'Caractérisation arithmétique et géométrique de trois termes consécutifs',
        statement: 'Trois réels a, b, c sont trois termes consécutifs d\'une suite arithmétique si et seulement si 2b = a + c (b est la moyenne arithmétique de a et c). Ils sont termes consécutifs d\'une suite géométrique positive si et seulement si b² = a × c (b est la moyenne géométrique de a et c).',
      },
    ],
    methods: [
      {
        title: 'Calculer la somme S = u_3 + u_4 + ... + u_{15} d\'une suite arithmétique',
        steps: [
          'Calculer le nombre de termes N = 15 - 3 + 1 = 13 termes.',
          'Calculer la valeur du premier terme de la somme (ici u_3) et du dernier terme (u_{15}).',
          'Appliquer la formule S = N × (u_3 + u_{15}) / 2.',
        ],
        example: {
          problem: 'Soit (u_n) arithmétique avec u_0 = 2 et r = 3. Calculer S = u_5 + u_6 + ... + u_{20}.',
          solution: 'u_5 = 2 + 5(3) = 17. u_{20} = 2 + 20(3) = 62. Nombre de termes : 20 - 5 + 1 = 16. S = 16 × (17 + 62) / 2 = 8 × 79 = 632.',
        },
      },
    ],
    traps: [
      'Compter n - p termes au lieu de n - p + 1. De u_0 à u_{10}, il y a 11 termes (10 - 0 + 1 = 11) !',
      'Confondre n et n+1 dans l\'exposant de la formule géométrique : l\'exposant de q est TOUJOURS le NOMBRE TOTAL de termes additionnés.',
    ],
  },

  'prem-trigonometrie': {
    chapterId: 'prem-trigonometrie',
    level: 'premiere',
    title: 'Trigonométrie & Cercle trigonométrique',
    summary: 'Le cercle trigonométrique orienté, mesure d\'angles en radians, enroulement de la droite réelle, définitions du cosinus et du sinus, valeurs remarquables, angles associés et équations trigonométriques fondamentales.',
    academicSources: [
      'Programme officiel de Première Spécialité (B.O. 2019) - Géométrie et trigonométrie',
      'Éduscol : Trigonométrie circulaire et formules d\'angles',
    ],
    notions: [
      {
        title: '1. Le cercle trigonométrique et le radian',
        subtitle: 'Orientation du plan et enroulement de la droite réelle',
        content: 'Le cercle trigonométrique est un cercle de rayon 1 centré à l\'origine O, muni d\'une orientation directe (sens trigonométrique = sens anti-horaire).',
        keyPoints: [
          'Le radian est l\'unité d\'angle telle que la longueur de l\'arc intercepté sur le cercle de rayon 1 est égale à la mesure de l\'angle.',
          'Équivalence fondamentale : π radians = 180 degrés. Formule de conversion : angle_rad = angle_deg × π / 180.',
          'Enroulement de la droite des réels : chaque réel x correspond à un unique point M du cercle, mais un point M correspond à une infinité de réels : x + 2kπ (k ∈ ℤ).',
        ],
        formula: 'π rad = 180° ; Longueur d\'arc : L = R × θ',
        example: '30° = π/6 rad ; 45° = π/4 rad ; 60° = π/3 rad ; 90° = π/2 rad.',
      },
      {
        title: '2. Cosinus et Sinus d\'un réel',
        subtitle: 'Coordonnées du point M sur le cercle',
        content: 'Pour tout réel x, le point M associé par enroulement a pour coordonnées (cos x ; sin x).',
        keyPoints: [
          'L\'abscisse de M est cos(x), l\'ordonnée de M est sin(x).',
          'Bornes universelles : pour tout x ∈ ℝ, -1 ≤ cos(x) ≤ 1 et -1 ≤ sin(x) ≤ 1.',
          'Relation fondamentale de Pythagore : cos²(x) + sin²(x) = 1 pour tout x ∈ ℝ.',
          'Périodicité : cos(x + 2π) = cos(x) et sin(x + 2π) = sin(x).',
          'Parité : cos(-x) = cos(x) (la fonction cosinus est paire) ; sin(-x) = -sin(x) (la fonction sinus est impaire).',
        ],
        formula: 'cos²(x) + sin²(x) = 1 ; cos(x + 2kπ) = cos(x) ; sin(x + 2kπ) = sin(x)',
      },
      {
        title: '3. Valeurs remarquables',
        subtitle: 'Tableau des valeurs exactes à connaître impérativement',
        content: 'Les angles remarquables du premier quadrant (0, π/6, π/4, π/3, π/2) sont la clé de toutes les déductions.',
        keyPoints: [
          'Pour x = 0 : cos(0) = 1 et sin(0) = 0.',
          'Pour x = π/6 (30°) : cos(π/6) = √3 / 2 et sin(π/6) = 1 / 2.',
          'Pour x = π/4 (45°) : cos(π/4) = √2 / 2 et sin(π/4) = √2 / 2.',
          'Pour x = π/3 (60°) : cos(π/3) = 1 / 2 et sin(π/3) = √3 / 2.',
          'Pour x = π/2 (90°) : cos(π/2) = 0 et sin(π/2) = 1.',
          'Moyen mnémotechnique : pour les sinus de 0 à π/2, écrire √(0)/2, √(1)/2, √(2)/2, √(3)/2, √(4)/2.',
        ],
        formula: 'cos(π/4) = sin(π/4) = √2/2 ; cos(π/3) = 1/2 ; sin(π/3) = √3/2',
      },
      {
        title: '4. Formules des angles associés et équations',
        subtitle: 'Symétries sur le cercle et résolution',
        content: 'La géométrie du cercle permet de retrouver tous les angles reliés par symétrie.',
        keyPoints: [
          'Angles opposés : cos(-x) = cos(x) et sin(-x) = -sin(x).',
          'Angles supplémentaires (π - x) : cos(π - x) = -cos(x) et sin(π - x) = sin(x).',
          'Angles diamétralement opposés (π + x) : cos(π + x) = -cos(x) et sin(π + x) = -sin(x).',
          'Angles complémentaires (π/2 - x) : cos(π/2 - x) = sin(x) et sin(π/2 - x) = cos(x).',
          'Résolution de cos(x) = cos(a) : équivaut à x = a + 2kπ ou x = -a + 2kπ (k ∈ ℤ).',
          'Résolution de sin(x) = sin(a) : équivaut à x = a + 2kπ ou x = π - a + 2kπ (k ∈ ℤ).',
        ],
        formula: 'cos(x) = cos(a) ⇔ x = ±a + 2kπ ; sin(x) = sin(a) ⇔ x = a + 2kπ ou x = π - a + 2kπ',
      },
    ],
    keyDefinitions: [
      {
        term: 'Cercle trigonométrique',
        definition: 'Cercle de rayon 1 centré à l\'origine O(0,0), orienté dans le sens direct (sens inverse des aiguilles d\'une montre).',
      },
    ],
    theorems: [
      {
        name: 'Identité trigonométrique fondamentale',
        statement: 'Pour tout réel x : cos²(x) + sin²(x) = 1. Elle permet d\'obtenir |sin(x)| à partir de cos(x) et réciproquement.',
      },
    ],
    methods: [
      {
        title: 'Résoudre l\'équation cos(2x) = 1/2 sur l\'intervalle [0 ; 2π[',
        steps: [
          'Identifier l\'angle remarquable : cos(π/3) = 1/2.',
          'Écrire les deux familles de solutions générales : 2x = π/3 + 2kπ ou 2x = -π/3 + 2kπ (k ∈ ℤ).',
          'Diviser par 2 : x = π/6 + kπ ou x = -π/6 + kπ.',
          'Sélectionner les valeurs appartenant à l\'intervalle demandé [0 ; 2π[ en faisant varier k.',
        ],
        example: {
          problem: 'Résoudre cos(2x) = 1/2 pour x ∈ [0 ; 2π[.',
          solution: 'x = π/6 + kπ donne pour k=0 : π/6 ; pour k=1 : 7π/6. x = -π/6 + kπ donne pour k=1 : 5π/6 ; pour k=2 : 11π/6. Les solutions dans [0 ; 2π[ sont S = {π/6, 5π/6, 7π/6, 11π/6}.',
        },
      },
    ],
    traps: [
      'Oublier la seconde famille de solutions : pour cos(x) = a, il y a DEUX solutions modulo 2π (a et -a) ; pour sin(x) = a, il y a a et π - a.',
      'Régler sa calculatrice en degrés au lieu de radians pour les calculs de trigonométrie au lycée.',
    ],
  },

  'prem-produit-scalaire': {
    chapterId: 'prem-produit-scalaire',
    level: 'premiere',
    title: 'Produit scalaire dans le plan',
    summary: 'Définitions du produit scalaire (géométrique avec cosinus, projection orthogonale, expression analytique, formule des normes), orthogonalité de vecteurs, théorème d\'Al-Kashi, théorème de la médiane et équations de droites par vecteur normal.',
    academicSources: [
      'Programme de Première Spécialité (B.O. 2019) - Géométrie vectorielle',
      'Éduscol : Produit scalaire, orthogonalité et relations métriques',
    ],
    notions: [
      {
        title: '1. Les différentes expressions du produit scalaire',
        subtitle: 'Quatre manières équivalentes de calculer u · v',
        content: 'Le produit scalaire de deux vecteurs u et v est un NOMBRE RÉEL (un scalaire), et non un vecteur !',
        keyPoints: [
          '1) Formule trigonométrique : u · v = ||u|| × ||v|| × cos(θ), où θ est l\'angle orienté (u, v).',
          '2) Projection orthogonale : si AB et AC sont non nuls et H est le projeté orthogonal de C sur (AB), alors AB · AC = AB × AH si H est dans le sens de AB, et -AB × AH si H est en sens inverse.',
          '3) Expression analytique (dans un repère orthonormé) : pour u(x ; y) et v(x\' ; y\'), u · v = x·x\' + y·y\'.',
          '4) Formule des normes : u · v = 1/2 [ ||u + v||² - ||u||² - ||v||² ] = 1/2 [ ||u||² + ||v||² - ||u - v||² ].',
        ],
        formula: 'u · v = ||u||·||v||·cos(θ) = xx\' + yy\' = 1/2(||u+v||² - ||u||² - ||v||²)',
      },
      {
        title: '2. Propriétés algébriques et orthogonalité',
        subtitle: 'Bilinéarité, symétrie et carré scalaire',
        content: 'Le produit scalaire respecte les mêmes règles de développement que le produit usuel des réels.',
        keyPoints: [
          'Symétrie : u · v = v · u.',
          'Bilinéarité : u · (v + w) = u·v + u·w et (k·u) · v = k(u · v).',
          'Carré scalaire : u · u = u² = ||u||². Un carré scalaire est toujours positif ou nul.',
          'Critère fondamental d\'orthogonalité : deux vecteurs u et v sont orthogonaux (noté u ⊥ v) si et seulement si leur produit scalaire est nul : u · v = 0.',
        ],
        formula: 'u ⊥ v ⇔ u · v = 0 ⇔ xx\' + yy\' = 0',
      },
      {
        title: '3. Théorème d\'Al-Kashi et théorème de la médiane',
        subtitle: 'Relations métriques dans le triangle quelconque',
        content: 'Le produit scalaire permet de généraliser le théorème de Pythagore à n\'importe quel triangle.',
        keyPoints: [
          'Théorème d\'Al-Kashi (Loi des cosinus) : dans un triangle ABC quelconque, BC² = AB² + AC² - 2·AB·AC·cos(Â). (Formule a² = b² + c² - 2bc cos(A)).',
          'Théorème de la médiane : si I est le milieu du segment [BC], alors pour tout point A, AB² + AC² = 2·AI² + BC² / 2. Également : AB · AC = AI² - BC² / 4.',
        ],
        formula: 'BC² = AB² + AC² - 2·AB·AC·cos(Â) ; AB² + AC² = 2AI² + BC²/2',
      },
      {
        title: '4. Vecteur normal et équation de droite',
        subtitle: 'Caractérisation géométrique par l\'orthogonalité',
        content: 'Un vecteur normal n non nul à une droite d est orthogonal à tout vecteur directeur de d.',
        keyPoints: [
          'Si d a pour équation cartésienne ax + by + c = 0, alors le vecteur n(a ; b) est un VECTEUR NORMAL à d.',
          'Réciproquement, la droite passant par A(xA ; yA) et de vecteur normal n(a ; b) a pour équation : a(x - xA) + b(y - yA) = 0.',
        ],
        formula: 'n(a ; b) normal à la droite d : ax + by + c = 0',
        example: 'Droite passant par A(1 ; 2) et de vecteur normal n(3 ; -4) : 3(x - 1) - 4(y - 2) = 0 ⇔ 3x - 4y + 5 = 0.',
      },
    ],
    keyDefinitions: [
      {
        term: 'Vecteur normal',
        definition: 'Vecteur non nul n orthogonal à un vecteur directeur de la droite d.',
        formula: 'n ⊥ u ⇔ n · u = 0',
      },
    ],
    theorems: [
      {
        name: 'Théorème d\'Al-Kashi',
        statement: 'Dans tout triangle ABC avec a = BC, b = AC et c = AB : a² = b² + c² - 2bc cos(Â). Si Â = 90°, cos(Â) = 0 et on retrouve le théorème de Pythagore a² = b² + c².',
      },
    ],
    methods: [
      {
        title: 'Calculer la mesure d\'un angle dans un triangle avec Al-Kashi',
        steps: [
          'Écrire la formule d\'Al-Kashi contenant l\'angle recherché : a² = b² + c² - 2bc cos(Â).',
          'Isoler cos(Â) : cos(Â) = (b² + c² - a²) / (2bc).',
          'Calculer la valeur numérique de cos(Â).',
          'Utiliser la touche arccos / cos⁻¹ de la calculatrice pour obtenir l\'angle en degrés ou radians.',
        ],
        example: {
          problem: 'Dans un triangle ABC, AB = 5, AC = 6 et BC = 7. Calculer la mesure de l\'angle BAC.',
          solution: 'BC² = AB² + AC² - 2·AB·AC·cos(Â) ⇒ 49 = 25 + 36 - 2(5)(6)cos(Â) ⇒ 49 = 61 - 60cos(Â) ⇒ 60cos(Â) = 12 ⇒ cos(Â) = 12/60 = 0,2. Â = arccos(0,2) ≈ 78,5°.',
        },
      },
    ],
    traps: [
      'Penser que le produit scalaire est un vecteur. Le produit scalaire u · v est TOUJOURS un NOMBRE RÉEL.',
      'Confondre vecteur directeur (-b ; a) et vecteur normal (a ; b) pour la droite ax + by + c = 0.',
      'Oublier le signe moins dans la projection orthogonale lorsque le projeté H est de sens opposé au vecteur de référence.',
    ],
  },

  'prem-fonction-exponentielle': {
    chapterId: 'prem-fonction-exponentielle',
    level: 'premiere',
    title: 'La Fonction Exponentielle',
    summary: 'Définition axiomatique (f\' = f et f(0) = 1), unicité, notation d\'Euler eˣ, propriétés algébriques fondamentales, stricte positivité, stricte croissance, dérivée de e^{u(x)} et résolution d\'équations/inéquations.',
    academicSources: [
      'Programme de Première Spécialité Mathématiques (B.O. 2019) - Analyse',
      'Éduscol : Fonction exponentielle et modélisation de croissances',
    ],
    notions: [
      {
        title: '1. Définition et nombre e d\'Euler',
        subtitle: 'L\'unique fonction égale à sa propre dérivée',
        content: 'Il existe une unique fonction f dérivable sur ℝ telle que f\' = f et f(0) = 1. Cette fonction est appelée la fonction exponentielle et notée exp.',
        keyPoints: [
          'Équation différentielle caractéristique : f\'(x) = f(x) pour tout x ∈ ℝ et f(0) = 1.',
          'Le nombre e d\'Euler : e = exp(1) ≈ 2,71828... (nombre transcendant irrationnel).',
          'Notation en puissance : pour tout réel x, on note exp(x) = eˣ.',
        ],
        formula: '(eˣ)\' = eˣ ; e⁰ = 1 ; e¹ = e ≈ 2,718',
      },
      {
        title: '2. Propriétés algébriques fondamentales',
        subtitle: 'Transformation des sommes en produits',
        content: 'La fonction exponentielle possède la propriété remarquable de transformer une addition en multiplication.',
        keyPoints: [
          'Relation fonctionnelle fondamentale : e^{x + y} = eˣ × eʸ pour tous x, y ∈ ℝ.',
          'Exponentielle de l\'opposé : e^{-x} = 1 / eˣ.',
          'Différence : e^{x - y} = eˣ / eʸ.',
          'Puissance entière : (eˣ)ⁿ = e^{n·x} pour tout n ∈ ℤ.',
          'Racine : e^{x / 2} = √(eˣ).',
        ],
        formula: 'e^{a + b} = eᵃ × eᵇ ; e^{-a} = 1 / eᵃ ; e^{a - b} = eᵃ / eᵇ ; (eᵃ)ⁿ = e^{na}',
        example: 'Simplifier A = (e³)² × e⁻⁴ / e² = e⁶ × e⁻⁴ / e² = e² / e² = 1.',
      },
      {
        title: '3. Stricte positivité et sens de variation',
        subtitle: 'Une courbe toujours au-dessus de l\'axe des abscisses',
        content: 'L\'exponentielle ne s\'annule jamais et reste rigoureusement positive sur tout ℝ.',
        keyPoints: [
          'Théorème de positivité : pour tout réel x, eˣ > 0.',
          'Conséquence : l\'équation eˣ = 0 ou eˣ = -3 n\'a AUCUNE SOLUTION dans ℝ.',
          'Sens de variation : comme sa dérivée est (eˣ)\' = eˣ > 0, la fonction exponentielle est STRICTEMENT CROISSANTE sur tout ℝ.',
          'Résolution d\'égalités et d\'inégalités : eᵃ = eᵇ ⇔ a = b et eᵃ < eᵇ ⇔ a < b.',
        ],
        formula: 'Pour tout x ∈ ℝ : eˣ > 0 ; eᵃ < eᵇ ⇔ a < b',
      },
      {
        title: '4. Dérivée de fonctions composées de type e^{u(x)}',
        subtitle: 'Généralisation de la règle de dérivation',
        content: 'Si u est une fonction dérivable sur un intervalle I, la fonction f(x) = e^{u(x)} est dérivable sur I.',
        keyPoints: [
          'Formule de dérivation : (e^{u(x)})\' = u\'(x) × e^{u(x)}.',
          'Cas particulier affine : (e^{ax + b})\' = a × e^{ax + b}.',
          'Signe de la dérivée : comme e^{u(x)} > 0 pour tout x, le signe de la dérivée f\'(x) est EXACTEMENT le signe de u\'(x).',
        ],
        formula: '(eᵘ)\' = u\'·eᵘ ; (e^{ax+b})\' = a·e^{ax+b}',
        example: 'Si f(x) = e^{-x² + 3x}, alors u(x) = -x² + 3x ⇒ u\'(x) = -2x + 3. f\'(x) = (-2x + 3)e^{-x² + 3x}.',
      },
    ],
    keyDefinitions: [
      {
        term: 'Fonction exponentielle',
        definition: 'Unique fonction dérivable sur ℝ vérifiant f\' = f et f(0) = 1.',
      },
    ],
    theorems: [
      {
        name: 'Théorème d\'inégalité de convexité',
        statement: 'Pour tout réel x, eˣ ≥ x + 1. La courbe de l\'exponentielle est entièrement située au-dessus de sa tangente en 0 (d\'équation y = x + 1).',
      },
    ],
    methods: [
      {
        title: 'Étudier les variations d\'une fonction avec exponentielle f(x) = (2x - 1)eˣ',
        steps: [
          'Calculer f\'(x) à l\'aide de la dérivée d\'un produit (uv)\' = u\'v + uv\'.',
          'Factoriser impérativement par eˣ : f\'(x) = eˣ [u\' + u].',
          'Étudier le signe de la parenthèse (car eˣ > 0 pour tout x).',
          'Dresser le tableau de variations.',
        ],
        example: {
          problem: 'Déterminer les variations de f(x) = (x - 2)eˣ sur ℝ.',
          solution: 'u(x) = x - 2 ⇒ u\'(x) = 1. v(x) = eˣ ⇒ v\'(x) = eˣ. f\'(x) = 1·eˣ + (x - 2)eˣ = (1 + x - 2)eˣ = (x - 1)eˣ. Comme eˣ > 0, f\'(x) a le signe de x - 1. f\'(x) < 0 sur ]-∞ ; 1[ et f\'(x) > 0 sur ]1 ; +∞[. f admet un minimum en x = 1 qui vaut f(1) = -e.',
        },
      },
    ],
    traps: [
      'Penser que eˣ peut s\'annuler : l\'équation eˣ = 0 n\'a PAS de solution.',
      'Oublier u\' dans la dérivée de eᵘ : écrire (e^{3x})\' = e^{3x} au lieu de 3e^{3x}.',
      'Confondre e^{a + b} avec eᵃ + eᵇ. Rappel : e^{a+b} = eᵃ × eᵇ.',
    ],
  },

  'prem-probabilites-conditionnelles': {
    chapterId: 'prem-probabilites-conditionnelles',
    level: 'premiere',
    title: 'Probabilités conditionnelles & Variables aléatoires',
    summary: 'Probabilité conditionnelle P_B(A), arbres pondérés et règles de chemin, formule des probabilités totales (partition), indépendance de deux événements, loi de probabilité d\'une variable aléatoire, espérance E(X), variance V(X) et écart-type σ(X).',
    academicSources: [
      'Programme de Première Spécialité (B.O. 2019) - Probabilités et statistiques',
      'Éduscol : Conditionnement, probabilités totales et variables aléatoires',
    ],
    notions: [
      {
        title: '1. Probabilité conditionnelle',
        subtitle: 'Calculer la probabilité d\'un événement sachant qu\'un autre est réalisé',
        content: 'Soient A et B deux événements avec P(B) > 0. La probabilité conditionnelle de A sachant B est notée P_B(A) ou P(A | B).',
        keyPoints: [
          'Formule de définition : P_B(A) = P(A ∩ B) / P(B).',
          'Formule produit : P(A ∩ B) = P(B) × P_B(A) = P(A) × P_A(B).',
          'Attention à la notation : l\'événement qui est "sachant" se trouve en indice.',
        ],
        formula: 'P_B(A) = P(A ∩ B) / P(B) ; P(A ∩ B) = P(B) × P_B(A)',
        example: 'Si P(B) = 0,4 et P(A ∩ B) = 0,1, alors P_B(A) = 0,1 / 0,4 = 0,25 (soit 25%).',
      },
      {
        title: '2. Arbres pondérés et formule des probabilités totales',
        subtitle: 'Les deux règles fondamentales de calcul sur un arbre',
        content: 'Un arbre de probabilités pondéré traduit visuellement les étapes successives d\'une expérience aléatoire.',
        keyPoints: [
          'Règle des nœuds : la somme des probabilités issues d\'un même nœud est égale à 1 (ex: P_B(A) + P_B(Ā) = 1).',
          'Règle des chemins : la probabilité d\'une issue (au bout d\'un chemin) est le PRODUIT des probabilités portées par les branches de ce chemin.',
          'Partition de l\'univers : des événements B₁, B₂, ..., Bₖ forment une partition de Ω s\'ils sont deux à deux disjoints et que leur réunion est Ω.',
          'Formule des probabilités totales : pour toute partition (B, B̄), P(A) = P(A ∩ B) + P(A ∩ B̄) = P(B)×P_B(A) + P(B̄)×P_B̄(A).',
        ],
        formula: 'P(A) = P(B) × P_B(A) + P(B̄) × P_B̄(A)',
      },
      {
        title: '3. Indépendance de deux événements',
        subtitle: 'Absence d\'influence réciproque',
        content: 'Deux événements A et B sont indépendants lorsque la réalisation de l\'un ne modifie pas la probabilité de réalisation de l\'autre.',
        keyPoints: [
          'Critère multiplicatif universel : A et B sont indépendants si et seulement si P(A ∩ B) = P(A) × P(B).',
          'Si P(B) > 0, cela équivaut à : P_B(A) = P(A).',
          'Théorème : si A et B sont indépendants, alors A et B̄ sont également indépendants (de même pour Ā et B, et Ā et B̄).',
        ],
        formula: 'A et B indépendants ⇔ P(A ∩ B) = P(A) × P(B)',
      },
      {
        title: '4. Variable aléatoire discrète et paramètres',
        subtitle: 'Loi de probabilité, espérance, variance et écart-type',
        content: 'Une variable aléatoire X associe un nombre réel à chaque issue de l\'univers Ω.',
        keyPoints: [
          'Loi de probabilité : tableau qui à chaque valeur possible x_i associe sa probabilité p_i = P(X = x_i). La somme des p_i vaut toujours 1.',
          'Espérance mathématique E(X) : moyenne pondérée des valeurs prises par X. E(X) = ∑ x_i · P(X = x_i). (Si E(X) = 0, le jeu est dit équitable).',
          'Variance V(X) : mesure de dispersion par rapport à l\'espérance. V(X) = ∑ p_i (x_i - E(X))² = E(X²) - (E(X))² (formule de Koenig-Huygens).',
          'Écart-type σ(X) : racine carrée de la variance, de même unité que X. σ(X) = √V(X).',
        ],
        formula: 'E(X) = ∑ x_i·p_i ; V(X) = E(X²) - (E(X))² ; σ(X) = √V(X)',
      },
    ],
    keyDefinitions: [
      {
        term: 'Partition de l\'univers',
        definition: 'Ensemble d\'événements non vides deux à deux disjoints dont la réunion forme la totalité de l\'univers Ω.',
      },
      {
        term: 'Espérance mathématique',
        definition: 'Moyenne théorique que l\'on peut espérer obtenir en répétant l\'expérience un très grand nombre de fois.',
      },
    ],
    theorems: [
      {
        name: 'Propriétés de linéarité de l\'espérance',
        statement: 'Pour toutes variables aléatoires X et Y et tous réels a et b : E(aX + b) = a·E(X) + b et E(X + Y) = E(X) + E(Y). De plus, V(aX + b) = a²·V(X).',
      },
    ],
    methods: [
      {
        title: 'Appliquer la formule des probabilités totales avec un arbre pondéré',
        steps: [
          'Identifier les deux niveaux de l\'arbre (ex: Malade/Sain puis Test+/Test-).',
          'Placer les probabilités données sur les branches de premier niveau et sur les branches conditionnelles de second niveau.',
          'Calculer les probabilités complémentaires pour que la somme à chaque nœud fasse 1.',
          'Identifier les chemins menant à l\'événement A recherché.',
          'Calculer la probabilité de chaque chemin en multipliant les branches.',
          'Additionner les probabilités des chemins pour trouver P(A).',
        ],
        example: {
          problem: 'Une maladie touche 2% d\'une population. Un test est positif chez 95% des malades et chez 3% des non-malades. Quelle est la probabilité totale qu\'un test soit positif P(T) ?',
          solution: 'P(M) = 0,02 ⇒ P(M̄) = 0,98. P_M(T) = 0,95 et P_M̄(T) = 0,03. P(T) = P(M ∩ T) + P(M̄ ∩ T) = 0,02 × 0,95 + 0,98 × 0,03 = 0,019 + 0,0294 = 0,0484 (soit 4,84%).',
        },
      },
    ],
    traps: [
      'Confondre P_B(A) et P_A(B). Exemple : P_Malade(Test+) est la sensibilité du test, tandis que P_Test+(Malade) est la probabilité d\'être malade sachant que le test est positif !',
      'Confondre "incompatibles" (A ∩ B = ∅) et "indépendants" (P(A ∩ B) = P(A) × P(B)). Deux événements de probabilités non nulles ne peuvent pas être les deux à la fois !',
      'Oublier d\'élever l\'espérance au carré dans la formule de la variance : c\'est E(X²) - (E(X))².',
    ],
  },
};

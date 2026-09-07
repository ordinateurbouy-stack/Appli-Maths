import { CourseSheet } from '../../types';

export const SECONDE_COURSES: Record<string, CourseSheet> = {
  'sec-nombres-calculs': {
    chapterId: 'sec-nombres-calculs',
    level: 'seconde',
    title: 'Nombres, calculs, puissances et intervalles',
    summary: 'Comprendre la structure et les inclusions des ensembles de nombres (ℕ ⊂ ℤ ⊂ ⅅ ⊂ ℚ ⊂ ℝ), manipuler la valeur absolue comme distance, maîtriser le calcul algébrique (fractions, puissances, racines carrées) et résoudre des problèmes d\'intervalles.',
    academicSources: [
      'Programme de mathématiques de Seconde générale et technologique (B.O. spécial n°1 du 22 janvier 2019)',
      'Ressources Éduscol : Nombres réels, calculs et intervalles en 2nde',
    ],
    notions: [
      {
        title: '1. Classification et ensembles de nombres',
        subtitle: 'De l\'entier naturel au nombre réel',
        content: 'Chaque nombre appartient à un ensemble précis caractérisé par ses propriétés d\'écriture. Les ensembles s\'emboîtent rigoureusement par inclusion.',
        keyPoints: [
          'ℕ (Entiers naturels) : {0, 1, 2, 3...}. Nombres entiers positifs ou nuls.',
          'ℤ (Entiers relatifs) : {... -3, -2, -1, 0, 1, 2, 3...}. Entiers positifs ou négatifs.',
          'ⅅ (Nombres décimaux) : nombres s\'écrivant a / 10^p avec a ∈ ℤ et p ∈ ℕ. Leur écriture décimale possède un nombre fini de chiffres après la virgule.',
          'ℚ (Nombres rationnels) : fractions de la forme a / b avec a ∈ ℤ et b ∈ ℤ*. Leur écriture décimale est finie ou périodique.',
          'ℝ (Nombres réels) : ensemble de tous les nombres représentables sur la droite graduée continue, incluant les nombres irrationnels comme √2, √3 ou π.',
          'Chaîne d\'inclusions : ℕ ⊂ ℤ ⊂ ⅅ ⊂ ℚ ⊂ ℝ.',
        ],
        formula: 'ℕ ⊂ ℤ ⊂ ⅅ ⊂ ℚ ⊂ ℝ',
        example: '1/3 = 0,333... ∈ ℚ mais 1/3 ∉ ⅅ car sa partie décimale est infinie. √2 ≈ 1,414... ∈ ℝ mais √2 ∉ ℚ (irrationnel).',
      },
      {
        title: '2. Intervalles de la droite réelle',
        subtitle: 'Représentation géométrique et notation ensembliste',
        content: 'Un intervalle est un sous-ensemble continu de ℝ délimité par deux bornes. Les crochets indiquent si les bornes sont incluses (crochet fermé) ou exclues (crochet ouvert).',
        keyPoints: [
          '[a ; b] : intervalle fermé borné (a ≤ x ≤ b).',
          ']a ; b[ : intervalle ouvert borné (a < x < b).',
          '[a ; +∞[ : intervalle non borné à droite (x ≥ a). L\'infini est toujours exclu par convention.',
          'Intersection I ∩ J : ensemble des réels appartenant À LA FOIS à I et à J (condition "ET").',
          'Réunion I ∪ J : ensemble des réels appartenant à I OU à J (ou aux deux, condition "OU").',
        ],
        formula: 'x ∈ [a ; b] ⇔ a ≤ x ≤ b ; x ∈ ]-∞ ; c[ ⇔ x < c',
        example: 'Si I = [-2 ; 5] et J = [1 ; 8[, alors I ∩ J = [1 ; 5] et I ∪ J = [-2 ; 8[.',
      },
      {
        title: '3. Valeur absolue et notion de distance',
        subtitle: 'Définition analytique et interprétation géométrique',
        content: 'La valeur absolue d\'un réel x, notée |x|, représente la distance entre le point d\'abscisse x et l\'origine 0. Elle est TOUJOURS positive ou nulle.',
        keyPoints: [
          'Pour tout réel x : si x ≥ 0, |x| = x ; si x < 0, |x| = -x (ex: |-7| = -(-7) = 7).',
          'Interprétation de distance : pour deux points A(a) et B(b), la distance AB vaut |a - b| = |b - a|.',
          'Équation |x - c| = r : les points situés à distance r du centre c sont x = c - r et x = c + r.',
          'Inéquation |x - c| ≤ r : intervalle [c - r ; c + r].',
        ],
        formula: '|x - c| ≤ r ⇔ c - r ≤ x ≤ c + r ⇔ x ∈ [c - r ; c + r]',
        example: '|x - 3| ≤ 2 signifie que la distance entre x et 3 est inférieure ou égale à 2, soit x ∈ [3 - 2 ; 3 + 2] = [1 ; 5].',
      },
      {
        title: '4. Règles de calcul sur les puissances et radicaux',
        subtitle: 'Manipulations algébriques rigoureuses',
        content: 'Les puissances et racines carrées obéissent à des règles précises de simplification et de factorisation.',
        keyPoints: [
          'Puissances : aⁿ × aᵐ = aⁿ⁺ᵐ, (aⁿ)ᵐ = aⁿᵐ, aⁿ / aᵐ = aⁿ⁻ᵐ, a⁻ⁿ = 1 / aⁿ (avec a ≠ 0).',
          'Racines carrées (pour a, b ≥ 0) : √(a × b) = √a × √b ; si b > 0, √(a / b) = √a / √b.',
          'Simplification de radicaux : √(a² × b) = |a|√b = a√b si a ≥ 0.',
          'Technique de la quantité conjuguée pour éliminer une racine au dénominateur : multiplier par (√a ∓ √b).',
        ],
        formula: '√(a × b) = √a × √b ; 1 / (√a - b) = (√a + b) / (a - b²)',
        example: '√72 = √(36 × 2) = √36 × √2 = 6√2. Simplification de 2/(√3 - 1) = 2(√3 + 1)/(3 - 1) = √3 + 1.',
      },
    ],
    keyDefinitions: [
      {
        term: 'Ensemble des nombres rationnels ℚ',
        definition: 'Ensemble des nombres pouvant s\'écrire sous la forme d\'un quotient a/b où a est un entier relatif et b un entier relatif non nul.',
        formula: 'ℚ = { a / b | a ∈ ℤ, b ∈ ℤ* }',
        note: 'Tout nombre décimal est rationnel, mais l\'inverse est faux (ex: 1/7 ∈ ℚ et 1/7 ∉ ⅅ).',
      },
      {
        term: 'Distance sur la droite réelle',
        definition: 'Pour tous réels x et y, la distance entre les points d\'abscisses x et y sur une droite graduée est donnée par |x - y|.',
        formula: 'd(x, y) = |x - y| = |y - x| ≥ 0',
      },
      {
        term: 'Notation scientifique',
        definition: 'Écriture d\'un nombre décimal sous la forme a × 10ⁿ, où a est un nombre décimal tel que 1 ≤ |a| < 10 et n est un entier relatif.',
        formula: 'x = a × 10ⁿ avec 1 ≤ |a| < 10 et n ∈ ℤ',
      },
    ],
    theorems: [
      {
        name: 'Propriété de non-rationalité de √2',
        statement: 'Le nombre √2 est un irrationnel : il ne peut pas s\'écrire sous la forme d\'une fraction d\'entiers a/b. Sa démonstration historique par l\'absurde utilise la parité des entiers.',
      },
      {
        name: 'Non-linéarité fondamentale de la racine carrée',
        statement: 'Pour tous réels a > 0 et b > 0, √(a + b) < √a + √b. La racine carrée d\'une somme n\'est JAMAIS égale à la somme des racines carrées.',
        conditions: 'Valable pour tous réels strictement positifs a et b.',
      },
    ],
    methods: [
      {
        title: 'Éliminer une racine au dénominateur (Quantité conjuguée)',
        steps: [
          'Identifier la forme du dénominateur : a - √b ou √a + √b.',
          'Multiplier le numérateur et le dénominateur par l\'expression conjuguée correspondante.',
          'Développer le dénominateur à l\'aide de l\'identité remarquable (u - v)(u + v) = u² - v².',
          'Simplifier la fraction obtenue.',
        ],
        example: {
          problem: 'Écrire l\'expression A = 5 / (3 - √2) sous forme sans radical au dénominateur.',
          solution: 'A = [5 × (3 + √2)] / [(3 - √2)(3 + √2)] = 5(3 + √2) / (3² - (√2)²) = 5(3 + √2) / (9 - 2) = (15 + 5√2) / 7.',
        },
      },
      {
        title: 'Résoudre une inéquation avec valeur absolue du type |x - a| < r',
        steps: [
          'Interpréter géométriquement : x est à une distance du centre a strictement inférieure au rayon r.',
          'Traduire par un double encadrement : -r < x - a < r.',
          'Ajouter a aux trois membres : a - r < x < a + r.',
          'Écrire la solution sous forme d\'intervalle ouvert : S = ]a - r ; a + r[.',
        ],
        example: {
          problem: 'Résoudre dans ℝ : |2x - 6| ≤ 4.',
          solution: 'Factoriser par 2 : 2|x - 3| ≤ 4 ⇔ |x - 3| ≤ 2. La distance entre x et 3 est au plus 2. Donc 3 - 2 ≤ x ≤ 3 + 2, soit 1 ≤ x ≤ 5. S = [1 ; 5].',
        },
      },
    ],
    traps: [
      'Écrire que √(a² + b²) = a + b. Exemple classique : √(9 + 16) = √25 = 5, alors que √9 + √16 = 3 + 4 = 7 !',
      'Confondre -3² et (-3)². -3² = -(3²) = -9, alors que (-3)² = (-3) × (-3) = +9.',
      'Oublier que la valeur absolue |x| est toujours positive ou nulle. Une équation comme |x + 4| = -3 n\'a aucune solution (S = ∅).',
      'Inverser les crochets de l\'intersection et de la réunion : I ∩ J correspond aux éléments communs, I ∪ J regroupe tous les éléments.',
    ],
  },

  'sec-fonctions-generalites': {
    chapterId: 'sec-fonctions-generalites',
    level: 'seconde',
    title: 'Généralités sur les fonctions numériques',
    summary: 'Maîtriser le concept de dépendance fonctionnelle, déterminer le domaine de définition D_f, calculer et lire images et antécédents, caractériser le sens de variation, identifier les extremums et étudier la parité d\'une courbe.',
    academicSources: [
      'Programme de mathématiques de Seconde (B.O. 2019) - Analyse',
      'Éduscol : Fonctions numériques et modélisation en Seconde',
    ],
    notions: [
      {
        title: '1. Notion de fonction et domaine de définition',
        subtitle: 'Processus associant un unique résultat à chaque valeur',
        content: 'Une fonction f associe à chaque réel x d\'un ensemble D_f au plus un réel noté f(x). x est la variable indépendante, f(x) est l\'image de x.',
        keyPoints: [
          'Ensemble de définition D_f : ensemble de tous les réels x pour lesquels le calcul f(x) est possible dans ℝ.',
          'Deux contraintes fondamentales au lycée : un dénominateur ne peut JAMAIS être nul (division par zéro interdite), et l\'expression sous une racine carrée doit être POSITIVE ou nulle (≥ 0).',
        ],
        formula: 'D_f = {x ∈ ℝ | expression f(x) définie}',
        example: 'Pour f(x) = 1 / (x - 4), D_f = ℝ \\ {4} = ]-∞ ; 4[ ∪ ]4 ; +∞[. Pour g(x) = √(2x - 6), 2x - 6 ≥ 0 ⇔ x ≥ 3, donc D_g = [3 ; +∞[.',
      },
      {
        title: '2. Images et antécédents',
        subtitle: 'Sens direct et sens réciproque',
        content: 'Chaque élément x de D_f possède UNE SEULE image f(x). En revanche, un réel y peut posséder zéro, un ou plusieurs antécédents.',
        keyPoints: [
          'Calcul d\'image : pour trouver l\'image de a, on remplace x par a dans l\'expression de f(x).',
          'Calcul d\'antécédent(s) : pour trouver les antécédents de b, on résout l\'équation f(x) = b dans D_f.',
          'Lecture graphique : l\'image se lit sur l\'axe vertical des ordonnées (Oy). Les antécédents de k sont les abscisses des points d\'intersection entre la courbe C_f et la droite horizontale y = k.',
        ],
        formula: 'y = f(x) ⇔ (x, y) ∈ C_f',
        example: 'Si f(x) = x² - 5 : l\'image de 3 est f(3) = 3² - 5 = 4. Les antécédents de 4 vérifient x² - 5 = 4 ⇔ x² = 9 ⇔ x = 3 ou x = -3.',
      },
      {
        title: '3. Variations et extremums d\'une fonction',
        subtitle: 'Croissance, décroissance, maximum et minimum',
        content: 'L\'étude des variations décrit la façon dont f(x) évolue lorsque x grandit de gauche à droite sur un intervalle I.',
        keyPoints: [
          'Fonction strictement croissante sur I : elle conserve l\'ordre des réels. Pour tous a, b ∈ I, si a < b alors f(a) < f(b).',
          'Fonction strictement décroissante sur I : elle inverse l\'ordre des réels. Pour tous a, b ∈ I, si a < b alors f(a) > f(b).',
          'Maximum M de f sur I : f(x) ≤ M pour tout x ∈ I, et il existe x₀ tel que f(x₀) = M.',
          'Minimum m de f sur I : f(x) ≥ m pour tout x ∈ I, et il existe x₁ tel que f(x₁) = m.',
          'Tableau de variations : représentation synthétique avec flèches montantes et descendantes, bornes et valeurs remarquables.',
        ],
        formula: 'a < b ⇒ f(a) < f(b) (croissante) ; a < b ⇒ f(a) > f(b) (décroissante)',
      },
      {
        title: '4. Parité et symétrie géométrique',
        subtitle: 'Fonctions paires et fonctions impaires',
        content: 'La parité traduit des symétries remarquables de la courbe représentative C_f dans un repère orthogonal.',
        keyPoints: [
          'Condition préalable obligatoire : l\'ensemble de définition D_f doit être centré en 0 (si x ∈ D_f, alors -x ∈ D_f).',
          'Fonction paire : pour tout x ∈ D_f, f(-x) = f(x). La courbe C_f est symétrique par rapport à l\'axe des ordonnées (Oy).',
          'Fonction impaire : pour tout x ∈ D_f, f(-x) = -f(x). La courbe C_f est symétrique par rapport à l\'origine O(0,0) du repère.',
        ],
        formula: 'f(-x) = f(x) (paire) ; f(-x) = -f(x) (impaire)',
        example: 'f(x) = x² + 3 est paire : f(-x) = (-x)² + 3 = x² + 3 = f(x). g(x) = x³ - 2x est impaire : g(-x) = (-x)³ - 2(-x) = -x³ + 2x = -g(x).',
      },
    ],
    keyDefinitions: [
      {
        term: 'Courbe représentative C_f',
        definition: 'Ensemble de tous les points M du plan de coordonnées (x ; y) tels que x appartient au domaine de définition D_f et y = f(x).',
        formula: 'C_f = { M(x ; y) | x ∈ D_f et y = f(x) }',
      },
      {
        term: 'Extremum local / global',
        definition: 'Un maximum ou un minimum est dit global s\'il est valable sur tout le domaine de définition, ou local s\'il n\'est valable que sur un sous-intervalle ouvert centré autour du point.',
      },
    ],
    theorems: [
      {
        name: 'Caractérisation graphique des résolutions',
        statement: 'Les solutions de l\'équation f(x) = g(x) sont les abscisses des points d\'intersection des courbes C_f et C_g. Les solutions de l\'inéquation f(x) ≤ g(x) sont les abscisses des points pour lesquels la courbe C_f est située au-dessous ou sur la courbe C_g.',
      },
    ],
    methods: [
      {
        title: 'Déterminer le domaine de définition d\'une fonction avec quotient et radical',
        steps: [
          'Écrire la condition d\'existence du dénominateur : Dénominateur ≠ 0.',
          'Écrire la condition d\'existence sous le radical : Expression sous la racine ≥ 0.',
          'Résoudre chaque condition séparément.',
          'Faire l\'intersection des ensembles de solutions pour obtenir D_f.',
        ],
        example: {
          problem: 'Déterminer le domaine de définition de f(x) = (3x + 1) / [√(x + 2) - 1].',
          solution: 'Conditions : 1) Sous la racine : x + 2 ≥ 0 ⇔ x ≥ -2. 2) Dénominateur non nul : √(x + 2) - 1 ≠ 0 ⇔ √(x + 2) ≠ 1 ⇔ x + 2 ≠ 1 ⇔ x ≠ -1. Donc D_f = [-2 ; -1[ ∪ ]-1 ; +∞[.',
        },
      },
    ],
    traps: [
      'Confondre image et antécédent. Dire "calculer l\'image de 5" signifie x = 5 (calculer f(5)). Dire "calculer les antécédents de 5" signifie f(x) = 5 (résoudre l\'équation).',
      'Affirmer qu\'une fonction qui n\'est pas paire est forcément impaire. La grande majorité des fonctions ne sont ni paires ni impaires (ex: f(x) = 2x + 1).',
      'Oublier de vérifier si D_f est centré en 0 avant d\'étudier la parité. Si D_f = [0 ; +∞[, la fonction ne peut pas être paire.',
    ],
  },

  'sec-fonctions-reference': {
    chapterId: 'sec-fonctions-reference',
    level: 'seconde',
    title: 'Fonctions de référence',
    summary: 'Étude exhaustive des fonctions fondamentales au programme : affine, carré, inverse, racine carrée et cube. Connaître par cœur leurs courbes, propriétés de symétrie, sens de variation et comportement comparatif.',
    academicSources: [
      'B.O. spécial n°1 du 22 janvier 2019 - Fonctions de référence en Seconde',
      'Éduscol : Éléments d\'analyse et fonctions usuelles',
    ],
    notions: [
      {
        title: '1. Fonctions affines f(x) = ax + b',
        subtitle: 'La droite et le taux de variation constant',
        content: 'Une fonction affine est définie sur ℝ. Sa représentation graphique est une droite non verticale.',
        keyPoints: [
          'a est le coefficient directeur (la pente) : a = (f(x₂) - f(x₁)) / (x₂ - x₁).',
          'b est l\'ordonnée à l\'origine : c\'est l\'ordonnée du point d\'intersection de la droite avec l\'axe (Oy), soit f(0) = b.',
          'Si a > 0 : la fonction est strictement croissante sur ℝ.',
          'Si a < 0 : la fonction est strictement décroissante sur ℝ.',
          'Si a = 0 : la fonction est constante (droite horizontale y = b). Si b = 0 : fonction linéaire (droite passant par l\'origine O).',
          'Signe de ax + b : s\'annule en x = -b/a (si a ≠ 0). Du signe de a pour x > -b/a, et du signe opposé à a pour x < -b/a.',
        ],
        formula: 'f(x) = ax + b ; a = (y_B - y_A) / (x_B - x_A)',
        example: 'Pour f(x) = -3x + 6 : a = -3 < 0 donc f est strictement décroissante. Elle s\'annule en x = -6/(-3) = 2. f(x) > 0 sur ]-∞ ; 2[ et f(x) < 0 sur ]2 ; +∞[.',
      },
      {
        title: '2. Fonction carré f(x) = x²',
        subtitle: 'La parabole et les encadrements',
        content: 'Définie sur ℝ, la fonction carré est paire (courbe symétrique par rapport à l\'axe des ordonnées). Sa représentation est une parabole tournée vers le haut.',
        keyPoints: [
          'Sens de variation : strictement décroissante sur ]-∞ ; 0] et strictement croissante sur [0 ; +∞[.',
          'Extremum : admet un minimum absolu en x = 0 qui vaut f(0) = 0. Pour tout x ∈ ℝ, x² ≥ 0.',
          'Encadrement de x² : si a et b sont de même signe positif (0 ≤ a ≤ x ≤ b), alors a² ≤ x² ≤ b². Si a < 0 < b, le minimum est 0 et 0 ≤ x² ≤ max(a², b²).',
        ],
        formula: 'x² ≥ 0 pour tout x ∈ ℝ ; f(-x) = (-x)² = x²',
      },
      {
        title: '3. Fonction inverse f(x) = 1/x',
        subtitle: 'L\'hyperbole et les deux branches disjointes',
        content: 'Définie sur ℝ* = ]-∞ ; 0[ ∪ ]0 ; +∞[, la fonction inverse est impaire (courbe symétrique par rapport à l\'origine). Sa représentation est une hyperbole.',
        keyPoints: [
          'Variations : strictement décroissante sur ]-∞ ; 0[ et strictement décroissante sur ]0 ; +∞[.',
          'Attention : elle n\'est PAS décroissante sur ℝ* tout entier (ex: -2 < 3 mais f(-2) = -0,5 < f(3) = 0,33).',
          'Signe : 1/x < 0 si x < 0, et 1/x > 0 si x > 0.',
          'Comportement aux bornes : quand x devient très grand, 1/x tend vers 0. Quand x est proche de 0, |1/x| devient infiniment grand.',
        ],
        formula: 'f(x) = 1 / x pour x ≠ 0 ; f(-x) = -1/x = -f(x)',
      },
      {
        title: '4. Fonction racine carrée f(x) = √x et fonction cube f(x) = x³',
        subtitle: 'Croissance et position relative des courbes',
        content: 'Deux autres fonctions de référence aux propriétés complémentaires.',
        keyPoints: [
          'Fonction racine carrée √x : définie sur [0 ; +∞[, strictement croissante sur [0 ; +∞[, toujours positive.',
          'Fonction cube x³ : définie sur ℝ, impaire, strictement croissante sur tout ℝ. (Elle conserve le signe de x).',
          'Comparaison sur [0 ; 1] : pour tout x ∈ [0 ; 1], on a x³ ≤ x² ≤ x ≤ √x.',
          'Comparaison sur [1 ; +∞[ : pour tout x ≥ 1, on a √x ≤ x ≤ x² ≤ x³.',
        ],
        formula: 'Sur [0 ; 1] : x² ≤ x ≤ √x ; Sur [1 ; +∞[ : √x ≤ x ≤ x²',
      },
    ],
    keyDefinitions: [
      {
        term: 'Parabole',
        definition: 'Courbe représentative de la fonction carré d\'équation y = x². Le point O(0,0) est son sommet et l\'axe vertical (Oy) est son axe de symétrie.',
      },
      {
        term: 'Hyperbole',
        definition: 'Courbe représentative de la fonction inverse d\'équation y = 1/x, constituée de deux branches disjointes symétriques par rapport au centre O(0,0).',
      },
    ],
    theorems: [
      {
        name: 'Position relative de x, x² et √x',
        statement: 'Les courbes de x, x² et √x se coupent en deux points clés : (0 ; 0) et (1 ; 1). Sur ]0 ; 1[, la racine carrée est au-dessus de la droite y = x, elle-même au-dessus de la parabole y = x². Sur ]1 ; +∞[, l\'ordre est strictement inversé.',
      },
    ],
    methods: [
      {
        title: 'Encadrer x² et 1/x à partir d\'un encadrement de x',
        steps: [
          'Pour x² : déterminer si l\'intervalle de x contient 0. Si oui, la borne inférieure est obligatoirement 0 et la borne supérieure est le carré le plus grand.',
          'Pour 1/x : s\'assurer que l\'intervalle ne contient pas 0 (sinon la fonction n\'est pas définie). Inverser l\'ordre des inégalités car la fonction inverse est strictement décroissante sur chaque intervalle de même signe.',
        ],
        example: {
          problem: 'Soit x ∈ [-4 ; 3]. Donner l\'encadrement le plus précis possible de x².',
          solution: 'Puisque 0 ∈ [-4 ; 3], le minimum possible pour x² est 0² = 0. Les carrés des bornes sont (-4)² = 16 et 3² = 9. La valeur maximale est 16. Donc x² ∈ [0 ; 16].',
        },
      },
    ],
    traps: [
      'Écrire que si -4 ≤ x ≤ 3 alors (-4)² ≤ x² ≤ 3², ce qui donnerait 16 ≤ x² ≤ 9 ! Cela n\'a aucun sens car 16 n\'est pas inférieur à 9. Le bon résultat est 0 ≤ x² ≤ 16.',
      'Affirmer que la fonction inverse est décroissante sur ℝ*. Elle est décroissante sur ]-∞ ; 0[ et sur ]0 ; +∞[ séparément, mais pas sur leur réunion.',
      'Confondre le signe de f(x) et le sens de variation : une fonction peut être décroissante tout en restant positive (ex: 1/x sur ]0 ; +∞[).',
    ],
  },

  'sec-equations-inequations': {
    chapterId: 'sec-equations-inequations',
    level: 'seconde',
    title: 'Équations, inéquations et tableaux de signes',
    summary: 'Résoudre les équations produits et quotients, factoriser grâce aux identités remarquables, déterminer le signe d\'un produit ou quotient via un tableau de signes, et résoudre les inéquations avec rigueur.',
    academicSources: [
      'Programme de Seconde générale (B.O. 2019) - Algèbre',
      'Ressources Éduscol : Tableaux de signes et résolution d\'inéquations',
    ],
    notions: [
      {
        title: '1. Factorisations et identités remarquables',
        subtitle: 'Les trois identités fondamentales',
        content: 'Factoriser une expression algébrique consiste à transformer une somme en produit de facteurs.',
        keyPoints: [
          'Facteur commun : k·a + k·b = k(a + b).',
          'Première identité : a² + 2ab + b² = (a + b)².',
          'Deuxième identité : a² - 2ab + b² = (a - b)².',
          'Troisième identité (différence de deux carrés) : a² - b² = (a - b)(a + b).',
        ],
        formula: 'a² - b² = (a - b)(a + b)',
        example: 'Factoriser 4x² - 9 = (2x)² - 3² = (2x - 3)(2x + 3).',
      },
      {
        title: '2. Équations produits nuls et équations quotients nuls',
        subtitle: 'Propriété d\'intégrité de ℝ et valeurs interdites',
        content: 'La résolution de nombreuses équations non linéaires se ramène à l\'annulation d\'un produit ou d\'un quotient.',
        keyPoints: [
          'Théorème du produit nul : un produit de facteurs est nul si et seulement si au moins l\'un des facteurs est nul. A × B = 0 ⇔ A = 0 ou B = 0.',
          'Théorème du quotient nul : un quotient est nul si et seulement si son numérateur est nul ET son dénominateur est non nul. A / B = 0 ⇔ A = 0 et B ≠ 0.',
          'Toute valeur annulant le dénominateur est une valeur interdite à exclure impérativement avant toute simplification.',
        ],
        formula: 'A / B = 0 ⇔ A = 0 et B ≠ 0',
      },
      {
        title: '3. Signe du binôme ax + b et tableau de signes',
        subtitle: 'Règle des signes d\'un produit et d\'un quotient',
        content: 'L\'étude de signe permet de résoudre les inéquations sans risque d\'erreur d\'inversion.',
        keyPoints: [
          'Le binôme ax + b s\'annule en x = -b/a (avec a ≠ 0).',
          'Règle fondamentale : ax + b est du signe de a APRÈS sa racine (-b/a), et du signe opposé à a AVANT sa racine.',
          'Tableau de signes : une ligne par facteur, une ligne bilan avec la règle des signes (+ par + donne +, + par - donne -).',
          'Valeurs interdites dans le quotient : signalées par une DOUBLE BARRE sur la ligne du quotient.',
        ],
        formula: 'Pour x > -b/a : signe de a ; Pour x < -b/a : signe de -a',
      },
    ],
    keyDefinitions: [
      {
        term: 'Valeur interdite',
        definition: 'Nombre réel pour lequel une expression n\'est pas définie (notamment lorsqu\'il annule un dénominateur). Ces valeurs sont obligatoirement exclues du domaine de résolution.',
      },
    ],
    theorems: [
      {
        name: 'Conservation et changement de sens des inégalités',
        statement: 'On conserve le sens d\'une inégalité en ajoutant ou en soustrayant un même nombre aux deux membres, ou en multipliant (ou divisant) par un nombre strictement positif. En revanche, multiplier ou diviser par un nombre strictement négatif INVERSE le sens de l\'inégalité.',
        conditions: 'Attention : multiplier par une expression dépendant de x (dont on ne connaît pas le signe) est interdit !',
      },
    ],
    methods: [
      {
        title: 'Résoudre une inéquation quotient : (3x - 6) / (4 - x) ≥ 0',
        steps: [
          'Trouver la valeur interdite : 4 - x = 0 ⇔ x = 4.',
          'Trouver la racine du numérateur : 3x - 6 = 0 ⇔ x = 2.',
          'Dresser le tableau de signes avec les valeurs rangées dans l\'ordre croissant : -∞, 2, 4, +∞.',
          'Placer les signes pour 3x - 6 (a=3 > 0 : négatif puis positif après 2).',
          'Placer les signes pour 4 - x (a=-1 < 0 : positif puis négatif après 4).',
          'Ligne bilan : zéro en x = 2, double barre en x = 4.',
          'Lire l\'intervalle où le signe est positif ou nul : S = [2 ; 4[ (crochet ouvert en 4 à cause de la valeur interdite !).',
        ],
        example: {
          problem: 'Résoudre dans ℝ : (2x + 4) / (x - 3) ≤ 0.',
          solution: 'Racine numérateur : x = -2. Valeur interdite : x = 3. Le quotient est négatif entre -2 et 3. Donc S = [-2 ; 3[.',
        },
      },
    ],
    traps: [
      'Faire un produit en croix sur une inéquation : écrire (A / B) ≤ C ⇔ A ≤ B × C est TOTALEMENT FAUX car B peut être négatif ! Il faut tout passer à gauche et faire un tableau de signes.',
      'Oublier la double barre sur les valeurs interdites dans le tableau de signes.',
      'Fermer le crochet d\'une valeur interdite dans l\'ensemble des solutions.',
    ],
  },

  'sec-geometrie-vecteurs': {
    chapterId: 'sec-geometrie-vecteurs',
    level: 'seconde',
    title: 'Vecteurs, repérage et colinéarité',
    summary: 'Comprendre la notion de vecteur (direction, sens, norme), translation, égalité vectorielle, relation de Chasles, calcul des coordonnées, milieu, distance euclidienne et critère de colinéarité par le déterminant.',
    academicSources: [
      'Programme de Seconde (B.O. 2019) - Géométrie',
      'Éduscol : Vecteurs et coordonnées dans le plan',
    ],
    notions: [
      {
        title: '1. Définition et caractéristiques d\'un vecteur',
        subtitle: 'Direction, sens et longueur (norme)',
        content: 'Un vecteur AB non nul est caractérisé par trois éléments indissociables.',
        keyPoints: [
          'Sa direction : la droite (AB) et toutes les droites parallèles à (AB).',
          'Son sens : de l\'origine A vers l\'extrémité B.',
          'Sa norme : la longueur du segment [AB], notée ||AB|| = AB.',
          'Vecteur nul 0 : origine et extrémité confondues (norme 0, aucune direction).',
          'Égalité vectorielle : AB = CD si et seulement si ABDC est un parallélogramme (éventuellement aplati).',
        ],
        formula: 'AB = CD ⇔ ABDC est un parallélogramme',
      },
      {
        title: '2. Opérations sur les vecteurs',
        subtitle: 'Relation de Chasles et multiplication par un réel',
        content: 'Les vecteurs peuvent s\'additionner et se multiplier par des scalaires réels.',
        keyPoints: [
          'Relation de Chasles : pour tous points A, B, C du plan, AB + BC = AC.',
          'Vecteur opposé : -AB = BA. On a AB + BA = 0.',
          'Multiplication par k ∈ ℝ : ku a la même direction que u. Si k > 0, même sens ; si k < 0, sens contraire. Sa norme vaut ||ku|| = |k| × ||u||.',
        ],
        formula: 'AB + BC = AC ; ||k·u|| = |k| × ||u||',
      },
      {
        title: '3. Coordonnées dans un repère orthonormé',
        subtitle: 'Formules analytiques indispensables',
        content: 'Dans un repère orthonormé (O ; i, j), chaque point et chaque vecteur est repéré par un couple de coordonnées.',
        keyPoints: [
          'Vecteur AB : ses coordonnées sont (xB - xA ; yB - yA).',
          'Coordonnées du milieu I du segment [AB] : xI = (xA + xB) / 2 et yI = (yA + yB) / 2.',
          'Distance euclidienne AB : AB = √((xB - xA)² + (yB - yA)²).',
          'Somme et produit par un réel : u(x ; y) et v(x\' ; y\') ⇒ (u + v)(x + x\' ; y + y\') et (ku)(kx ; ky).',
        ],
        formula: 'AB = √((x_B - x_A)² + (y_B - y_A)²) ; I((x_A+x_B)/2 ; (y_A+y_B)/2)',
        example: 'Si A(1 ; 3) et B(4 ; 7) : AB(4 - 1 ; 7 - 3) = (3 ; 4). Distance AB = √(3² + 4²) = √25 = 5. Milieu I(2,5 ; 5).',
      },
      {
        title: '4. Colinéarité et déterminant',
        subtitle: 'Condition de parallélisme et d\'alignement',
        content: 'Deux vecteurs u et v sont colinéaires s\'ils ont la même direction, c\'est-à-dire s\'il existe k ∈ ℝ tel que v = ku (ou si l\'un d\'eux est nul).',
        keyPoints: [
          'Déterminant de u(x ; y) et v(x\' ; y\') : det(u, v) = x·y\' - y·x\'.',
          'Critère fondamental : u et v sont colinéaires ⇔ det(u, v) = 0 ⇔ x·y\' - y·x\' = 0.',
          'Application géométrique : les droites (AB) et (CD) sont parallèles ⇔ AB et CD sont colinéaires.',
          'Alignement de points : les points distincts A, B, C sont alignés ⇔ AB et AC sont colinéaires.',
        ],
        formula: 'det(u, v) = x·y\' - y·x\' = 0 ⇔ u et v colinéaires',
      },
    ],
    keyDefinitions: [
      {
        term: 'Norme d\'un vecteur',
        definition: 'Longueur géométrique du vecteur. Dans un repère orthonormé, pour u(x ; y), ||u|| = √(x² + y²).',
        formula: '||u|| = √(x² + y²)',
      },
      {
        term: 'Déterminant de deux vecteurs',
        definition: 'Nombre réel calculé par le produit en croix des coordonnées det(u, v) = xy\' - yx\'. Sa nullité caractérise la colinéarité.',
      },
    ],
    theorems: [
      {
        name: 'Théorème d\'alignement de points',
        statement: 'Trois points distincts A, B et C sont alignés si et seulement si les vecteurs AB et AC sont colinéaires, c\'est-à-dire det(AB, AC) = 0.',
      },
    ],
    methods: [
      {
        title: 'Démontrer que trois points A, B, C sont alignés',
        steps: [
          'Calculer les coordonnées du vecteur AB : (xB - xA ; yB - yA).',
          'Calculer les coordonnées du vecteur AC : (xC - xA ; yC - yA).',
          'Calculer le déterminant det(AB, AC) = xAB × yAC - yAB × xAC.',
          'Si le déterminant est nul, conclure que AB et AC sont colinéaires et donc que A, B, C sont alignés.',
        ],
        example: {
          problem: 'Les points A(-1 ; 2), B(1 ; 5) et C(5 ; 11) sont-ils alignés ?',
          solution: 'AB(1 - (-1) ; 5 - 2) = (2 ; 3). AC(5 - (-1) ; 11 - 2) = (6 ; 9). det(AB, AC) = 2 × 9 - 3 × 6 = 18 - 18 = 0. Les vecteurs sont colinéaires, donc A, B et C sont alignés.',
        },
      },
    ],
    traps: [
      'Inverser les coordonnées dans le vecteur : écrire xA - xB au lieu de xB - xA. Rappel : c\'est toujours "Extrémité MOINS Origine".',
      'Calculer la distance AB dans un repère non orthonormé. La formule AB = √((xB-xA)² + (yB-yA)²) n\'est valable QUE dans un repère orthonormé !',
      'Confondre AB = CD (qui implique ABDC parallélogramme, attention à l\'ordre des lettres) avec ABCD.',
    ],
  },

  'sec-droites-plan': {
    chapterId: 'sec-droites-plan',
    level: 'seconde',
    title: 'Équations de droites et systèmes linéaires',
    summary: 'Caractériser une droite par son équation cartésienne ax + by + c = 0 ou son équation réduite y = mx + p, déterminer un vecteur directeur, identifier les droites parallèles et trouver le point d\'intersection par résolution d\'un système.',
    academicSources: [
      'Programme officiel de Seconde (B.O. 2019) - Géométrie repérée',
      'Éduscol : Équations de droites et systèmes 2x2',
    ],
    notions: [
      {
        title: '1. Vecteur directeur d\'une droite',
        subtitle: 'Orientation géométrique d\'une droite',
        content: 'Un vecteur directeur u non nul donne la direction de la droite d. Tout vecteur colinéaire à u est également un vecteur directeur de d.',
        keyPoints: [
          'Une droite est entièrement déterminée par la donnée d\'un point A et d\'un vecteur directeur u.',
          'Le point M(x ; y) appartient à la droite passant par A et de vecteur directeur u si et seulement si AM et u sont colinéaires.',
        ],
        formula: 'M ∈ d(A, u) ⇔ det(AM, u) = 0',
      },
      {
        title: '2. Équation cartésienne ax + by + c = 0',
        subtitle: 'Forme générale pour toutes les droites',
        content: 'Toute droite du plan admet une équation cartésienne de la forme ax + by + c = 0, où a et b ne sont pas simultanément nuls.',
        keyPoints: [
          'Vecteur directeur immédiat : le vecteur u(-b ; a) est un vecteur directeur de la droite.',
          'Réciproque : si u(α ; β) est un vecteur directeur, alors l\'équation s\'écrit βx - αy + c = 0.',
          'Cas particuliers : si a = 0, by + c = 0 ⇒ droite horizontale y = -c/b. Si b = 0, ax + c = 0 ⇒ droite verticale x = -c/a.',
        ],
        formula: 'ax + by + c = 0 avec vecteur directeur u(-b ; a)',
        example: 'Pour 2x - 3y + 5 = 0, a = 2, b = -3. Un vecteur directeur est u(-(-3) ; 2) = u(3 ; 2).',
      },
      {
        title: '3. Équation réduite y = mx + p',
        subtitle: 'Pour les droites non verticales (b ≠ 0)',
        content: 'Lorsque b ≠ 0, on peut exprimer y en fonction de x pour obtenir l\'équation réduite.',
        keyPoints: [
          'm est le coefficient directeur (la pente) : m = (yB - yA) / (xB - xA).',
          'p est l\'ordonnée à l\'origine : la droite coupe l\'axe (Oy) au point (0 ; p).',
          'Vecteur directeur canonique : u(1 ; m).',
          'Parallélisme : deux droites non verticales sont parallèles si et seulement si elles ont le MÊME coefficient directeur (m = m\').',
        ],
        formula: 'y = mx + p ; m = (y_B - y_A) / (x_B - x_A)',
      },
      {
        title: '4. Systèmes de deux équations à deux inconnues',
        subtitle: 'Calcul du point d\'intersection de deux droites sécantes',
        content: 'Rechercher le point d\'intersection de deux droites revient à résoudre le système formé par leurs équations.',
        keyPoints: [
          'Méthode par substitution : isoler une variable dans une équation et l\'injecter dans l\'autre.',
          'Méthode par combinaison linéaire : multiplier les équations pour éliminer l\'une des variables par addition.',
          'Interprétation géométrique : 1 solution unique ⇔ droites sécantes ; 0 solution ⇔ droites strictement parallèles ; infinité de solutions ⇔ droites confondues.',
        ],
        formula: 'Système : { ax + by = c ; a\'x + b\'y = c\' }',
      },
    ],
    keyDefinitions: [
      {
        term: 'Coefficient directeur',
        definition: 'Nombre réel m qui mesure la pente de la droite. Il indique la variation de y lorsque x augmente de 1.',
        formula: 'm = Δy / Δx = (y_B - y_A) / (x_B - x_A)',
      },
    ],
    theorems: [
      {
        name: 'Critère de parallélisme de droites',
        statement: 'Deux droites d d\'équation ax + by + c = 0 et d\' d\'équation a\'x + b\'y + c\' = 0 sont parallèles si et seulement si leurs vecteurs directeurs u(-b ; a) et u\'(-b\' ; a\') sont colinéaires, c\'est-à-dire ab\' - a\'b = 0.',
      },
    ],
    methods: [
      {
        title: 'Trouver l\'équation réduite d\'une droite passant par deux points A et B (xA ≠ xB)',
        steps: [
          'Calculer le coefficient directeur m = (yB - yA) / (xB - xA).',
          'Écrire la forme y = mx + p avec la valeur de m trouvée.',
          'Utiliser les coordonnées de A : remplacer x par xA et y par yA pour trouver p : p = yA - m·xA.',
          'Écrire l\'équation finale.',
        ],
        example: {
          problem: 'Déterminer l\'équation réduite de la droite (AB) avec A(2 ; 3) et B(6 ; 11).',
          solution: 'm = (11 - 3) / (6 - 2) = 8 / 4 = 2. Donc y = 2x + p. A ∈ (AB) ⇒ 3 = 2(2) + p ⇒ p = 3 - 4 = -1. L\'équation est y = 2x - 1.',
        },
      },
    ],
    traps: [
      'Oublier le cas des droites verticales x = k : leur coefficient directeur n\'existe pas (division par zéro dans yB - yA / xB - xA).',
      'Confondre vecteur directeur u(-b ; a) et (a ; b). C\'est l\'opposé du coefficient de y en première coordonnée !',
    ],
  },

  'sec-statistiques': {
    chapterId: 'sec-statistiques',
    level: 'seconde',
    title: 'Statistiques descriptives & Indicateurs',
    summary: 'Analyser des séries de données quantitatives : effectifs, fréquences, moyenne pondérée, médiane, quartiles (Q1, Q3), étendue, écart interquartile et diagrammes en boîte à moustaches.',
    academicSources: [
      'Programme de Seconde (B.O. 2019) - Statistiques et probabilités',
      'Éduscol : Traitement de données et indicateurs de dispersion',
    ],
    notions: [
      {
        title: '1. Caractéristiques de position',
        subtitle: 'Moyenne pondérée et médiane',
        content: 'Les caractéristiques de position résument l\'ordre de grandeur central des valeurs d\'une série.',
        keyPoints: [
          'Moyenne pondérée x̄ : somme des produits (valeur × effectif) divisée par l\'effectif total N. Elle est très sensible aux valeurs extrêmes.',
          'Médiane Me : valeur qui partage la série ordonnée en deux groupes de même effectif. Au moins 50% des valeurs sont ≤ Me et au moins 50% sont ≥ Me. Elle est robuste (insensible aux valeurs extrêmes).',
          'Calcul de la médiane : si N est impair (N = 2k + 1), Me est la valeur de rang k + 1. Si N est pair (N = 2k), Me est la demi-somme des valeurs de rangs k et k + 1.',
        ],
        formula: 'x̄ = (∑ n_i × x_i) / N',
        example: 'Série ordonnée : 3, 5, 8, 12, 14 (N = 5, impair). Me est la 3ème valeur : Me = 8.',
      },
      {
        title: '2. Caractéristiques de dispersion',
        subtitle: 'Quartiles, étendue et écart interquartile',
        content: 'Les caractéristiques de dispersion mesurent la variabilité et l\'étalement des données autour des valeurs centrales.',
        keyPoints: [
          'Premier quartile Q1 : plus petite valeur de la série ordonnée telle qu\'au moins 25% des données soient inférieures ou égales à Q1 (rang = arrondi supérieur de N/4).',
          'Troisième quartile Q3 : plus petite valeur de la série ordonnée telle qu\'au moins 75% des données soient inférieures ou égales à Q3 (rang = arrondi supérieur de 3N/4).',
          'Étendue e : différence entre la valeur maximale et la valeur minimale (e = x_max - x_min).',
          'Écart interquartile : différence Q3 - Q1. Il contient au moins 50% des valeurs centrales de la série et n\'est pas perturbé par les valeurs aberrantes.',
        ],
        formula: 'Étendue = x_max - x_min ; Écart interquartile = Q3 - Q1',
      },
      {
        title: '3. Diagramme en boîte (Boîte à moustaches)',
        subtitle: 'Visualisation graphique des 5 nombres clés',
        content: 'Le diagramme en boîte représente schématiquement le résumé à cinq nombres : [Min, Q1, Médiane, Q3, Max].',
        keyPoints: [
          'La boîte centrale s\'étend de Q1 à Q3 (sa largeur est l\'écart interquartile).',
          'La médiane est marquée par un trait vertical à l\'intérieur de la boîte.',
          'Les moustaches s\'étendent de Min à Q1 et de Q3 à Max.',
          'Permet de comparer d\'un coup d\'œil deux populations ou échantillons.',
        ],
      },
    ],
    keyDefinitions: [
      {
        term: 'Médiane',
        definition: 'Nombre Me qui sépare une série statistique ordonnée en deux sous-ensembles de même effectif.',
      },
      {
        term: 'Quartiles Q1 et Q3',
        definition: 'Valeurs de la série qui coupent les données ordonnées aux seuils de 25% (un quart) et 75% (trois quarts).',
      },
    ],
    theorems: [
      {
        name: 'Propriété de linéarité de la moyenne',
        statement: 'Si chaque valeur xi d\'une série est multipliée par a et augmentée de b (yi = a·xi + b), alors la nouvelle moyenne vérifie ȳ = a·x̄ + b.',
      },
    ],
    methods: [
      {
        title: 'Déterminer la médiane et les quartiles d\'une série statistique discrète',
        steps: [
          'Ranger impérativement les données dans l\'ORDRE CROISSANT.',
          'Calculer l\'effectif total N.',
          'Pour Q1 : calculer N / 4. Prendre la valeur correspondant au rang entier supérieur ou égal.',
          'Pour Me : si N pair, moyenne des valeurs N/2 et (N/2)+1. Si N impair, valeur au rang (N+1)/2.',
          'Pour Q3 : calculer 3N / 4. Prendre la valeur correspondant au rang entier supérieur ou égal.',
        ],
        example: {
          problem: 'Déterminer Q1, Me et Q3 pour les 10 notes : 7, 8, 9, 11, 12, 13, 15, 16, 17, 19.',
          solution: 'N = 10. Q1 : 10/4 = 2,5 ⇒ 3ème note = 9. Médiane : N/2 = 5 ⇒ moyenne de la 5ème (12) et 6ème (13) note = 12,5. Q3 : 3×10/4 = 7,5 ⇒ 8ème note = 16.',
        },
      },
    ],
    traps: [
      'Calculer la médiane ou les quartiles sans avoir préalablement trié les données par ordre croissant.',
      'Prendre la moyenne de Q1 et Q3 pour trouver la médiane : c\'est faux car la répartition n\'est pas forcément symétrique.',
    ],
  },

  'sec-probabilites': {
    chapterId: 'sec-probabilites',
    level: 'seconde',
    title: 'Probabilités élémentaires & Événements',
    summary: 'Modéliser des situations aléatoires, manipuler les notions d\'univers, d\'événements contraires, d\'union et d\'intersection, calculer des probabilités dans le cas équiprobable et construire des arbres et tableaux.',
    academicSources: [
      'Programme de Seconde générale (B.O. 2019) - Probabilités',
      'Éduscol : Modélisation probabiliste et équiprobabilité',
    ],
    notions: [
      {
        title: '1. Vocabulaire des événements',
        subtitle: 'Univers, issues et types d\'événements',
        content: 'Une expérience aléatoire est une expérience dont on ne peut pas prévoir le résultat avec certitude, mais dont l\'ensemble des issues possibles est connu.',
        keyPoints: [
          'Univers Ω : ensemble de toutes les issues possibles de l\'expérience.',
          'Événement : sous-ensemble de l\'univers Ω.',
          'Événement certain (probabilité 1) : tout l\'univers Ω. Événement impossible (probabilité 0) : l\'ensemble vide ∅.',
          'Événement contraire Ā : ensemble des issues qui n\'appartiennent pas à A. On a P(Ā) = 1 - P(A).',
        ],
        formula: 'P(Ā) = 1 - P(A) ; 0 ≤ P(A) ≤ 1',
      },
      {
        title: '2. Réunion et intersection d\'événements',
        subtitle: 'Les connecteurs "OU" et "ET"',
        content: 'Les opérations ensemblistes permettent de définir de nouveaux événements composés.',
        keyPoints: [
          'Intersection A ∩ B : événement réalisé si A ET B sont réalisés simultanément.',
          'Réunion A ∪ B : événement réalisé si A OU B (ou les deux) est réalisé.',
          'Événements incompatibles (ou disjoints) : A et B ne peuvent pas se produire en même temps (A ∩ B = ∅, donc P(A ∩ B) = 0).',
          'Formule fondamentale de la réunion : P(A ∪ B) = P(A) + P(B) - P(A ∩ B).',
        ],
        formula: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)',
        example: 'Si P(A) = 0,6, P(B) = 0,5 et P(A ∩ B) = 0,3, alors P(A ∪ B) = 0,6 + 0,5 - 0,3 = 0,8.',
      },
      {
        title: '3. Équiprobabilité et outils de dénombrement',
        subtitle: 'Quand toutes les issues ont la même chance de survenir',
        content: 'Dans une situation d\'équiprobabilité (ex: dé équilibré, tirage au sort non truqué), le calcul se ramène à un comptage.',
        keyPoints: [
          'Formule de Laplace : P(A) = Nombre d\'issues favorables / Nombre d\'issues possibles = card(A) / card(Ω).',
          'Arbre de probabilités : la somme des probabilités issues d\'un même nœud vaut 1. La probabilité d\'un chemin est le produit des probabilités portées par ses branches.',
          'Tableau croisé d\'effectifs : permet de croiser deux caractères et de lire directement les intersections.',
        ],
        formula: 'P(A) = card(A) / card(Ω)',
      },
    ],
    keyDefinitions: [
      {
        term: 'Événements incompatibles',
        definition: 'Deux événements qui n\'ont aucune issue en commun (A ∩ B = ∅). Dans ce cas, P(A ∪ B) = P(A) + P(B).',
      },
    ],
    theorems: [
      {
        name: 'Loi des probabilités totales élémentaire',
        statement: 'Pour tout événement A : P(A) = P(A ∩ B) + P(A ∩ B̄), car B et B̄ forment une partition de l\'univers Ω.',
      },
    ],
    methods: [
      {
        title: 'Calculer la probabilité d\'une réunion P(A ∪ B) avec tableau croisé',
        steps: [
          'Compléter le tableau croisé avec les totaux par ligne et par colonne.',
          'Identifier le nombre total d\'issues N = card(Ω).',
          'Repérer card(A), card(B) et card(A ∩ B).',
          'Appliquer la formule P(A ∪ B) = P(A) + P(B) - P(A ∩ B) ou compter directement les cases correspondantes sans double compte.',
        ],
        example: {
          problem: 'Dans un groupe de 100 élèves, 60 font de l\'anglais (A), 40 de l\'espagnol (E) et 25 font les deux. Probabilité qu\'un élève fasse au moins une des deux langues ?',
          solution: 'P(A) = 60/100 = 0,6 ; P(E) = 40/100 = 0,4 ; P(A ∩ E) = 25/100 = 0,25. P(A ∪ E) = 0,6 + 0,4 - 0,25 = 0,75 (soit 75%).',
        },
      },
    ],
    traps: [
      'Ajouter directement P(A) + P(B) pour calculer P(A ∪ B) sans soustraire P(A ∩ B). On compterait alors deux fois les issues communes !',
      'Confondre "incompatibles" (ne peuvent pas se produire ensemble) et "indépendants" (la réalisation de l\'un n\'influence pas l\'autre).',
      'Oublier que la probabilité d\'un événement est toujours comprise entre 0 et 1 inclus.',
    ],
  },
};

/**
 * ============================================
 * DOUBLE DIÈSE - FICHIER DE CONTENU
 * ============================================
 *
 * Ce fichier contient TOUTES les données du site.
 * Pour modifier le contenu, éditez simplement les valeurs ci-dessous.
 *
 * STRUCTURE :
 * - navigation : liens du menu
 * - hero : section d'accueil
 * - conseil : présentation des services et cas clients
 * - media : podcast et critiques
 * - contact : informations de contact
 * - legal : mentions légales
 */

export const siteContent = {
  // ============================================
  // NAVIGATION
  // ============================================
  navigation: {
    logo: "Double Dièse",
    links: [
      { label: "Conseil", href: "#conseil" },
      { label: "Da Capo", href: "/da-capo" },
      { label: "Médias", href: "#medias" },
      { label: "À propos", href: "#a-propos" },
      { label: "Contact", href: "#contact" },
    ],
  },

  // ============================================
  // SECTION HERO
  // ============================================
  hero: {
    // Baseline principale affichée sur l'image
    headline: "Donner plus de portée à vos projets musicaux",
    // Sous-titre descriptif
    // Sous-titre ; le « | » marque le retour à la ligne
    subheadline: "Stratégie et outils pour la musique classique, | de la salle de réunion à la salle de concert.",
    // Texte du bouton principal
    ctaText: "Découvrir",
    ctaLink: "#conseil",
  },

  // ============================================
  // SECTION CONSEIL
  // ============================================
  conseil: {
    // Titre de la section
    title: "Conseil & stratégie",
    // Introduction
    introduction: `Expert-praticien au service des acteurs de la musique classique, j'accompagne 
    les institutions culturelles, festivals et artistes dans leur développement stratégique, 
    leur communication et leur approche des publics.`,

    // Services proposés
    services: [
      {
        title: "Stratégie",
        description: "Positionnement, développement d'audience et planification à long terme",
      },
      {
        title: "Marketing et communication",
        description: "Segmentation, identité éditoriale et présence médiatique",
      },
      {
        title: "Approche des publics",
        description: "Accompagnement des publics avant, pendant et après les concerts",
      },
    ],

    // ============================================
    // CAS CLIENTS
    // Pour ajouter un cas client, copiez un bloc et modifiez les valeurs
    // ============================================
    clients: [
      {
        name: "Festival 1001 Notes",
        year: "2025-2026",
        type: "Stratégies de publics",
        description:
          "Restructuration du système de billetterie pour en faire un outil de segmentation des publics en créant des offres différenciées. Conception de campagnes ciblées par profil d'audience.",
        logo: "",
        url: "https://www.festival1001notes.com",
      },
      {
        name: "Les Grands Interprètes",
        year: "2026-2027",
        type: "Médiation et fidélisation",
        description:
          "Conception et animation d'un cycle de cinq conférences autour du bestiaire musical, comme levier de fidélisation d'un public abonné. Production de vidéos de présentation de concert. Conférences avant-concert",
        logo: "",
        url: "https://www.lesgrandsinterpretes.com",
      },
      {
        name: "La Nouvelle Athènes, Centre des pianos romantiques",
        year: "2026-2027",
        type: "Communication et billetterie",
        description:
          "Un centre qui fait jouer des Erard et des Streicher touche un public rare, qu’il faut savoir retrouver d’une saison à l’autre. Séparation de la newsletter éditoriale et des campagnes de billetterie, segmentation de la base Brevo à partir de données d’achat disponibles et peu exploitées.",
        logo: "",
        url: "https://lanouvelleathenes.net/",
      },
      {
        name: "Projet uNopia",
        year: "2026",
        type: "Financement",
        description:
          "Audit du modèle de financement existant, sécurisation des subventions acquises, identification et approche de nouveaux financeurs. Accompagnement dans la structuration des dossiers.",
        logo: "",
        url: "https://www.unopia.eu/fr/le-projet/",
      },
      {
        name: "Festival Piano aux Jacobins",
        year: "2026",
        type: "Éditorial et production",
        description:
          "Conception et rédaction d'une série de trois vidéos de présentation pour la saison 2026 du festival. Chaque film construit un angle d'entrée dans un programme exigeant. Scripts validés par la direction du festival, crédité au générique. Déclinaison en teasers verticaux pour les réseaux sociaux.",
        logo: "",
        url: "https://pianojacobins.com/",
      },
      {
        name: "Festival de la Vézère",
        year: "2026-2027",
        type: "Mécénat",
        description:
          "Refonte complète de la relation mécènes : repositionnement de l'offre entreprises, création d'un club de partenaires avec ses propres temps forts, prospection de nouveaux acteurs. Construction d'une logique de fidélisation.",
        logo: "",
        url: "https://www.festival-vezere.com/",
      },
    ],
  },

  // ============================================
  // SECTION MÉDIAS
  // ============================================
  media: {
    title: "Voix & médias",
    introduction:
      "Au-delà du conseil, une présence active dans l'écosystème de la musique classique à travers le podcast, la critique et les articles de fond.",

    // ============================================
    // PODCAST
    // ============================================
    podcast: {
      title: "Le podcast",
      description:
        "Chaque épisode remonte le fil d’une année, d’une œuvre, d’un geste, pour comprendre comment le monde a changé… avec quelques notes de musique.",
      // URL d'intégration Ausha
      embedUrl:
        "https://player.ausha.co/?showId=YXWmlh1e6RZW&color=%23C8A45C&multishow=false&playlist=true&dark=false&v=3&playerId=ausha-hctK",
      // Lien vers la page du podcast
      externalLink: "https://podcast.ausha.co/revolutions-en-musique-2",
    },

    // ============================================
    // CRITIQUES
    // Pour ajouter une critique, copiez un bloc et modifiez les valeurs
    // ============================================
    critiques: {
      title: "Critiques musicales",
      description:
        "Chroniques et articles de fond publiés sur Bachtrack, première plateforme mondiale de critiques de concerts classiques.",
      items: [
        {
          title: "Soirée polonaise pour le retour de Tarmo Peltokoski au Capitole",
          date: "16 mars 2026",
          excerpt:
            "Le directeur musical de l'Orchestre National du Capitole de Toulouse a fait un retour plein d'autorité à son poste après cinq mois d'absence pour raisons de santé.",
          link: "https://bachtrack.com/fr_FR/critique-garcia-moriniere-variations-goldberg-auditorium-saint-pierre-des-cuisines-toulouse-decembre-2025",
        },
        {
          title: "La tempête András Schiff marque les esprits à Toulouse",
          date: "4 février 2026",
          excerpt:
            "Comment un concert marathon donné par l'un des derniers géants du clavier peut finir en quenouille.",
          link: "https://bachtrack.com/fr_FR/critique-andras-schiff-bach-haydn-mozart-beethoven-halle-aux-grains-toulouse-fevrier-2026",
        },
        {
          title: "Au fond des bois : l'impossible quête des facteurs d'instruments à vent",
          date: "1er janvier 2026",
          excerpt:
            "Enquête, interviews et récit dans le monde des instruments à vents, avec des instrumentistes, des facteurs et un atelier.",
          link: "https://bachtrack.com/fr_FR/dossier-enquete-fabrication-instruments-a-vent-buffet-crampon-selmer-decembre-2025",
        },
        {
          title: "Garcia et Morinière font des Variations Goldberg tout un monde de couleurs",
          date: "15 décembre 2025",
          excerpt:
            "C’est un éventail chatoyant et doucement irisé que les guitaristes ont ouvert ce soir, une vision unique des Goldberg.",
          link: "https://bachtrack.com/fr_FR/critique-garcia-moriniere-variations-goldberg-auditorium-saint-pierre-des-cuisines-toulouse-decembre-2025",
        },
      ],
    },
  },

  // ============================================
  // SECTION À PROPOS
  // ============================================
  about: {
    title: "À propos",
    name: "Thibault d'Hauthuille",
    role: "Consultant en musique classique",
    // Remplacez par l'URL de votre photo
    photo: "",
    // Votre biographie (quelques lignes)
    bio: `Je travaille au croisement de la stratégie et de la musique.
Après un parcours en direction du marketing et de la communication (15 ans en entreprise, 15 ans dans l'univers associatif dont 7 comme dirigeant), j’accompagne aujourd’hui des acteurs du secteur musical : artistes, agences, festivals, institutions, dans le développement de leurs projets : structuration, modèle économique, marketing, outils et relation aux publics.
En parallèle, mon activité d’auteur (critique, conférences, podcasts, newsletter) nourrit une compréhension fine des œuvres, des artistes et des attentes des publics.
C’est cette double lecture interne et externe qui me permet de construire des stratégies solides, mais aussi des contenus justes, lisibles et engageants.`,
  },

  // ============================================
  // SECTION CONTACT
  // ============================================
  contact: {
    title: "Contact",
    introduction: "Vous avez un projet ? Discutons de la manière dont je peux vous accompagner.",
    // Bouton principal : ouvre la messagerie du visiteur
    cta: "Écrivez-moi",
    // Objet proposé dans l'email (le visiteur peut le modifier)
    mailSubject: "Prise de contact",
    // Informations de contact directes
    directContact: {
      email: "tdhauthuille@double-diese.fr",
      // Laisser vide pour ne pas afficher de téléphone. Format libre, ex. "06 12 34 56 78"
      phone: "",
      linkedin: "https://linkedin.com/in/tdhauthuille",
      substack: "https://depuislefonddelasalle.substack.com/",
    },
  },

  // ============================================
  // MENTIONS LÉGALES
  // ============================================
  legal: {
    // Informations du propriétaire
    owner: {
      name: "Thibault d'Hauthuille",
      status: "Auto-entrepreneur",
      address: "26 impasse du Porche, 46140 Luzech",
      siret: "97900662400022",
      email: "tdhauthuille@double-diese.fr",
    },
    // Hébergeur
    host: {
      name: "OVH",
      address: "2 rue Kellermann - 59100 Roubaix - France",
      phone: "1007",
    },
    // Texte du copyright
    copyright: `© ${new Date().getFullYear()} Double Dièse. Tous droits réservés.`,
  },
};

// Export des types pour TypeScript
export type SiteContent = typeof siteContent;
export type Client = (typeof siteContent.conseil.clients)[0];
export type Critique = (typeof siteContent.media.critiques.items)[0];

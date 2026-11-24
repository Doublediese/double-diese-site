/**
 * Textes de la page Leggio (double-diese.fr/leggio) et du bandeau d'accueil.
 * Source : document « Page Leggio du site double-diese.fr », version validée par Thibault le 24 novembre 2026.
 * Règles posées ce jour-là : aucun nom de client avant le 13 janvier 2027, aucun prix en ligne.
 */

export type Moment = { titre: string; sousTitre: string; texte: string; pourVous: string };

export const leggio = {
  baseline: "Le pupitre de chaque spectateur.",
  introduction:
    "Leggio est un guide d'écoute propre à chaque concert. Il s'ouvre sur le téléphone, sans application à installer, et accompagne l'auditeur du moment où il réserve jusqu'au lendemain du concert. Il existe en deux versions.",
  portes: {
    saison: "Vous programmez des concerts : festival, saison, orchestre, maison d'opéra.",
    tour: "Vous emmenez vos programmes en tournée : ensemble, quatuor, soliste.",
  },

  guide: {
    titre: "Ce que le spectateur tient en main",
    points: [
      "La parole de l'artiste : pourquoi il a construit ce programme, en vidéo ou en audio.",
      "Chaque œuvre décrite à deux niveaux, « En bref » pour tous, « Pour aller plus loin » mouvement par mouvement pour les mélomanes.",
      "Un épisode audio de huit à dix minutes, illustré d'extraits musicaux, à écouter en voiture ou en cuisinant.",
      "En salle, quelques passages à guetter, et pour la musique vocale les textes chantés avec leur traduction.",
      "Le guide en français, en anglais ou dans les deux langues, aux couleurs de celui qui l'offre.",
    ],
  },

  saison: {
    pourQui: "Pour les festivals, les saisons, les orchestres et les maisons d'opéra.",
    moments: [
      {
        titre: "Avant",
        sousTitre: "l'envie",
        texte:
          "Le lien du guide part avec le billet, dans vos propres emails. L'abonné retrouve sur une page tous les concerts de sa saison ou de son festival, et chaque guide s'ouvre un mois avant le concert. D'un geste, la date entre dans son agenda et le guide part vers ceux qui l'accompagnent.",
        pourVous:
          "les accompagnants, que votre billetterie ignore, entrent dans le cercle avant le soir du concert.",
      },
      {
        titre: "Le soir",
        sousTitre: "l'écoute",
        texte:
          "Les portes s'ouvrent, l'écran aussi : « Installez-vous », le programme dans l'ordre, les passages à guetter. Quand le chef entre, l'écran passe au noir et propose le mode avion. À l'entracte, il se rallume sur la seconde partie et sur un mot de votre mécène.",
        pourVous:
          "depuis un simple téléphone, votre régisseur déclenche chaque moment, prévient la salle d'un retard, annonce le bis et publie les photos. Un code à six chiffres suffit pour confier la Régie à un bénévole.",
      },
      {
        titre: "À la sortie",
        sousTitre: "le souvenir",
        texte:
          "Les photos de la soirée peuvent être là dès la sortie, à garder ou à partager. Le spectateur dit en un mot ce qu'il emporte et le moment qui l'a saisi. Dans les jours qui suivent, votre email lui rapporte les mots de toute la salle.",
        pourVous:
          "un tableau de bord en direct, les avis, l'intention de retour et les adresses de ceux qui acceptent d'être recontactés.",
      },
      {
        titre: "Ensuite",
        sousTitre: "le retour",
        texte:
          "Le guide reste dans le téléphone. Son icône rouvre le dernier concert, l'épisode se réécoute, le prochain rendez-vous attend au bas de l'écran.",
        pourVous:
          "un bilan statistique du concert pour vos mécènes et vos financeurs, et un public qui porte enfin un nom.",
      },
    ] as Moment[],
    etAussi:
      "Une page avant-goût avec une capsule d'une à deux minutes, derrière un QR code imprimé sur vos programmes et vos affiches, qui mène à votre billetterie. Une place pour vos partenaires dans le guide. Des éditions et des concerts que votre équipe prépare elle-même. Un concert d'essai permanent pour former un bénévole la veille.",
  },

  tour: {
    pourQui: "Pour les ensembles, les quatuors, les trios et les solistes.",
    accroche: "Vos programmes sur le pupitre de chaque programmateur, puis de chaque spectateur.",
    faces: [
      {
        titre: "Le programmateur",
        texte:
          "Il reçoit dans vos emails un lien qui n'appartient qu'à lui. Il y trouve votre répertoire, avec en tête les programmes que vous avez choisis pour lui. Chaque fiche contient la vidéo, l'épisode audio, l'effectif et ses variantes, la durée, les besoins techniques, les lieux qui l'ont déjà accueilli et un kit à télécharger. Un bouton lui suffit pour dire son intérêt ou demander à être rappelé, en français ou en anglais.",
        notes: [
          {
            pour: "Pour vous",
            texte:
              "chaque geste du programmateur revient dans votre outil de suivi. Vous savez ce qu'il a ouvert, et vous relancez au bon moment.",
          },
        ],
      },
      {
        titre: "Le public",
        texte:
          "Chaque programme a son QR code, valable dans toutes les salles où vous le jouez. Le spectateur y trouve le guide de la soirée, puis le chemin vers votre disque, votre site ou un don.",
        notes: [
          { pour: "Pour vous", texte: "un guide écrit une fois sert à chaque date." },
          {
            pour: "Pour le lieu qui vous accueille",
            texte: "son public reste le sien, Leggio ne vous transmet aucun contact de spectateur.",
          },
        ],
      },
    ],
    passerelle: "Vous programmez, et un ensemble vous a envoyé son lien Leggio ? C'est Leggio Saison qui vous concerne.",
  },

  communs: {
    titre: "Ce qui vaut pour les deux faces de Leggio",
    points: [
      "Rien à installer : un QR code ou un lien, et le guide s'ouvre dans le navigateur.",
      "Vos couleurs passent avant les nôtres.",
      "Vos données restent les vôtres. Vous êtes responsable de traitement, Double Dièse est sous-traitant, et aucun fichier n'est croisé d'un client à l'autre.",
      "Leggio n'écrit jamais à votre public : tout message part de vos outils.",
      "Hébergement en Europe, code relu par un développeur indépendant, testé avec 1 200 téléphones connectés en même temps.",
    ],
  },

  auteurs: {
    titre: "Qui écrit les guides",
    paragraphes: [
      "Thibault d'Hauthuille, critique pour Bachtrack, auteur du podcast Révolutions en musique et ancien rédacteur en chef, conçoit chaque guide et en répond. Les textes sont écrits avec l'appui d'outils d'intelligence artificielle, vérifiés œuvre par œuvre par un rédacteur en chef, et l'épisode est dit par une voix humaine.",
      "Sur demande, un guide peut aussi être signé par un musicologue. Si vous avez déjà vos textes, nous les reprenons.",
    ],
  },

  commencer: {
    titre: "Commencer",
    texte:
      "Le plus simple est de voir Leggio appliqué à l'un de vos concerts ou de vos programmes. Nous préparons la démonstration dans votre univers.",
    boutonSaison: "Démo Leggio Saison",
    boutonTour: "Démo Leggio Tour",
    objetSaison: "Leggio Saison : démonstration",
    objetTour: "Leggio Tour : démonstration",
  },

  // Indépendance du conseil vis-à-vis de l'outil (validée par Thibault le 9 novembre 2026)
  independance:
    "Nos missions de conseil restent indépendantes de Leggio : nous ne vous le proposons que s'il répond à votre besoin.",

  // Bandeau de la page d'accueil
  bandeau: {
    texte:
      "Notre guide d'écoute pour chaque concert, en deux versions : Saison pour ceux qui programment, Tour pour ceux qui tournent.",
    lien: "Découvrir Leggio",
  },
};

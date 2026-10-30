import type { Translation } from './en';

export const fr: Translation = {
    siteName: 'The SPRAC Handbook',
    meta: {
        home: {
            title: 'The SPRAC Handbook · SPARC, CYLG et CYBAT expliqués',
            description: 'Base de connaissances non officielle sur SPARC, le Cyber Lehrgang et le bataillon cyber 42. Ce qu’ils sont, comment ils sont organisés et où en lire plus.',
        },
        legalNotice: {
            title: 'Mentions légales',
            description: 'Qui gère le SPRAC Handbook, un projet communautaire sans lien avec SPARC, l’Armée suisse ou le Commandement Cyber, et comment nous joindre.',
        },
        privacyPolicy: {
            title: 'Politique de confidentialité',
            description: 'Quelles données personnelles le SPRAC Handbook traite, pourquoi, pendant combien de temps, et vos droits selon le droit suisse de la protection des données.',
        },
    },
    nav: {
        home: 'Accueil',
        language: 'Langue',
        newTab: '(s’ouvre dans un nouvel onglet)',
    },
    home: {
        launch: {
            headlineStart: 'Lancement vers le ',
            headlineHighlight: 'premier dimanche de l’Avent.',
            intro: 'Le SPRAC Handbook est une base de connaissances non officielle, rédigée par des étudiants, sur SPARC, le Cyber Lehrgang et le bataillon cyber 42. Nous rédigeons et vérifions encore chaque page. D’ici le lancement, tu peux aider en signalant des problèmes dans le dépôt.',
            statusLabel: 'Statut',
            statusValue: 'En cours',
            launchLabel: 'Lancement prévu',
            launchValue: 'Fin nov. ou début déc. 2026',
            checkRepo: 'Voir le dépôt',
        },
        contribute: {
            title: 'Un problème ? Ouvre une issue.',
            introStart:
                'Avant le lancement, nous n’acceptons que des issues. Une information erronée, un lien cassé ou une faute ? Ouvre une issue dans le dépôt. Les pull requests pour de nouvelles pages ou des changements d’interface sont suspendues jusqu’au lancement.',
            introEmphasis: 'Les contributions ne sont acceptées que de la part d’étudiants SPARC et de personnes liées à SPARC.',
            code: '$ git checkout -b fix/typo',
            openIssue: 'Ouvrir une issue',
            viewRepo: 'Voir le dépôt',
            ways: {
                fact: { title: 'Information erronée ou obsolète', description: 'Dates, chiffres, conditions ou contacts qui ont changé.' },
                link: { title: 'Lien cassé', description: 'Un lien qui renvoie une erreur 404 ou vers la mauvaise page.' },
                typo: { title: 'Faute ou texte peu clair', description: 'Orthographe, grammaire ou formulation confuse.' },
            },
            privacyNote:
                'La vie privée d’abord : n’ouvre pas d’issues et ne commente pas avec un compte GitHub qui montre ton vrai nom ou d’autres informations personnelles. Utilise un compte séparé, par exemple avec ton alias SPARC.',
        },
    },
    footer: {
        tagline: 'Une base de connaissances non officielle sur SPARC, le Cyber Lehrgang et le bataillon cyber 42. Rédigée par des étudiants de la communauté SPARC, à partir de sources officielles.',
        resources: 'Ressources',
        contribute: 'Contribuer sur GitHub',
        officialSites: 'Sites officiels',
        cyberMiliz: 'Cyber-Miliz · CYLG',
        cyberBattalion42: 'Bataillon cyber 42',
        kommandoCyber: 'Commandement Cyber',
        legal: 'Mentions',
        legalNotice: 'Mentions légales',
        privacyPolicy: 'Politique de confidentialité',
        copyright: '© 2026 The SPRAC Handbook',
        disclaimer: 'Projet communautaire. Sans lien avec l’Armée suisse ni avec SPARC.',
        lastVerified: 'Dernière vérification · nov. 2026',
    },
    notFound: {
        documentTitle: 'Page introuvable',
        eyebrow: 'ERR_NOT_FOUND · 0x194',
        title: 'Page introuvable.',
        body: "Cette page n'existe pas ou a été déplacée.",
        backHome: "Retour à l'accueil",
    },
};
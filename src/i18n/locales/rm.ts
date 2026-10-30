import type { Translation } from './en';

// Rumantsch Grischun. Needs review by a native speaker.
export const rm: Translation = {
    siteName: 'The SPRAC Handbook',
    meta: {
        home: {
            title: 'The SPRAC Handbook · SPARC, CYLG e CYBAT explitgads',
            description: 'Banca da savida betg uffiziala davart SPARC, il Cyber Lehrgang ed il battagliun cyber 42. Tge ch’els èn, co ch’els èn organisads e nua leger dapli.',
        },
        legalNotice: {
            title: 'Impressum',
            description: 'Tgi che maina il SPRAC Handbook, in project da la communitad senza colliaziun cun SPARC, l’Armada svizra u il Commando Cyber, e co contactar nus.',
        },
        privacyPolicy: {
            title: 'Decleraziun da protecziun da datas',
            description: 'Tge datas persunalas ch’il SPRAC Handbook elavurescha, pertge, per quant ditg e tge dretgs che ti has tenor il dretg svizzer da protecziun da datas.',
        },
    },
    nav: {
        home: 'Pagina principala',
        language: 'Lingua',
        newTab: '(s’avra en in nov tab)',
    },
    home: {
        launch: {
            headlineStart: 'Lantschament enturn la ',
            headlineHighlight: 'emprima dumengia d’Advent.',
            intro: 'Il SPRAC Handbook è ina banca da savida betg uffiziala, scritta da students, davart SPARC, il Cyber Lehrgang ed il battagliun cyber 42. Nus scrivain e controllain anc mintga pagina. Fin al lantschament pos ti gidar cun annunziar problems en il repository.',
            statusLabel: 'Status',
            statusValue: 'En lavur',
            launchLabel: 'Lantschament planisà',
            launchValue: 'Fin nov. u entschatta dec. 2026',
            checkRepo: 'Al repository',
        },
        contribute: {
            title: 'Chattà in problem? Avra in issue.',
            introStart:
                'Avant il lantschament acceptain nus mo issues. Chattà ina indicaziun sbagliada, ina colliaziun ruta u in sbagl da scriver? Avra in issue en il repository. Pull requests per novas paginas u midadas da l’interfatscha èn pausadas fin al lantschament.',
            introEmphasis: 'Nus acceptain contribuziuns mo da students da SPARC e da persunas en connex cun SPARC.',
            code: '$ git checkout -b fix/typo',
            openIssue: 'Avrir in issue',
            viewRepo: 'Mussar il repository',
            ways: {
                fact: { title: 'Indicaziun sbagliada u veglia', description: 'Datas, cifras, pretensiuns u contacts ch’èn sa midads.' },
                link: { title: 'Colliaziun ruta', description: 'Ina colliaziun che dat ina errur 404 u maina a la faussa pagina.' },
                typo: { title: 'Sbagl da scriver u text betg cler', description: 'Ortografia, grammatica u formulaziuns confusas.' },
            },
            privacyNote:
                'Protecziun da datas l’emprim: n’avra nagins issues e na commentescha betg cun in conto da GitHub che mussa tes num vair u autras datas persunalas. Dovra in conto separà, per exempel cun tes alias da SPARC.',
        },
    },
    footer: {
        tagline: 'Ina banca da savida betg uffiziala davart SPARC, il Cyber Lehrgang ed il battagliun cyber 42. Fatga da students da la communitad da SPARC, sin basa da funtaunas uffizialas.',
        resources: 'Resursas',
        contribute: 'Collavurar sin GitHub',
        officialSites: 'Paginas uffizialas',
        cyberMiliz: 'Cyber-Miliz · CYLG',
        cyberBattalion42: 'Battagliun cyber 42',
        kommandoCyber: 'Commando Cyber',
        legal: 'Dretg',
        legalNotice: 'Impressum',
        privacyPolicy: 'Decleraziun da protecziun da datas',
        copyright: '© 2026 The SPRAC Handbook',
        disclaimer: 'Project da la communitad. Senza colliaziun cun l’Armada svizra u cun SPARC.',
        lastVerified: 'Ultima controlla · nov. 2026',
    },
    notFound: {
        documentTitle: 'Pagina betg chattada',
        eyebrow: 'ERR_NOT_FOUND · 0x194',
        title: 'Pagina betg chattada.',
        body: "Questa pagina n'exista betg u è vegnida spustada.",
        backHome: 'Enavos a la pagina principala',
    },
};
import type { Translation } from './en';

export const it: Translation = {
    siteName: 'The SPRAC Handbook',
    meta: {
        home: {
            title: 'The SPRAC Handbook · SPARC, CYLG e CYBAT spiegati',
            description: 'Base di conoscenze non ufficiale su SPARC, il Cyber Lehrgang e il battaglione cyber 42. Cosa sono, come sono strutturati e dove approfondire.',
        },
        legalNotice: {
            title: 'Note legali',
            description: 'Chi gestisce lo SPRAC Handbook, un progetto della community non affiliato a SPARC, all’Esercito svizzero o al Comando Cyber, e come contattarci.',
        },
        privacyPolicy: {
            title: 'Informativa sulla privacy',
            description: 'Quali dati personali tratta lo SPRAC Handbook, perché, per quanto tempo e quali diritti hai secondo il diritto svizzero sulla protezione dei dati.',
        },
    },
    nav: {
        home: 'Home',
        language: 'Lingua',
        newTab: '(si apre in una nuova scheda)',
    },
    home: {
        launch: {
            headlineStart: 'Lancio intorno alla ',
            headlineHighlight: 'prima domenica d’Avvento.',
            intro: 'Lo SPRAC Handbook è una base di conoscenze non ufficiale, scritta da studenti, su SPARC, il Cyber Lehrgang e il battaglione cyber 42. Stiamo ancora scrivendo e verificando ogni pagina. Fino al lancio puoi aiutare segnalando problemi nel repository.',
            statusLabel: 'Stato',
            statusValue: 'In lavorazione',
            launchLabel: 'Lancio previsto',
            launchValue: 'Fine nov. o inizio dic. 2026',
            checkRepo: 'Vai al repository',
        },
        contribute: {
            title: 'Trovato un problema? Apri una issue.',
            introStart:
                'Prima del lancio accettiamo solo issue. Hai trovato un’informazione sbagliata, un link rotto o un refuso? Apri una issue nel repository. Le pull request per nuove pagine o modifiche all’interfaccia sono sospese fino al lancio.',
            introEmphasis: 'Accettiamo contributi solo da studenti SPARC e da persone legate a SPARC.',
            code: '$ git checkout -b fix/typo',
            openIssue: 'Apri una issue',
            viewRepo: 'Vedi il repository',
            ways: {
                fact: { title: 'Informazione errata o superata', description: 'Date, numeri, requisiti o contatti che sono cambiati.' },
                link: { title: 'Link rotto', description: 'Un link che dà errore 404 o porta alla pagina sbagliata.' },
                typo: { title: 'Refuso o testo poco chiaro', description: 'Ortografia, grammatica o formulazioni confuse.' },
            },
            privacyNote:
                'Prima la privacy: non aprire issue e non commentare con un account GitHub che mostra il tuo vero nome o altri dati personali. Usa un account separato, per esempio con il tuo alias SPARC.',
        },
    },
    footer: {
        tagline: 'Una base di conoscenze non ufficiale su SPARC, il Cyber Lehrgang e il battaglione cyber 42. Scritta da studenti della community SPARC, basata su fonti ufficiali.',
        resources: 'Risorse',
        contribute: 'Contribuisci su GitHub',
        officialSites: 'Siti ufficiali',
        cyberMiliz: 'Cyber-Miliz · CYLG',
        cyberBattalion42: 'Battaglione cyber 42',
        kommandoCyber: 'Comando Cyber',
        legal: 'Note legali',
        legalNotice: 'Note legali',
        privacyPolicy: 'Informativa sulla privacy',
        copyright: '© 2026 The SPRAC Handbook',
        disclaimer: 'Progetto della community. Non affiliato all’Esercito svizzero né a SPARC.',
        lastVerified: 'Ultima verifica · nov. 2026',
    },
    notFound: {
        documentTitle: 'Pagina non trovata',
        eyebrow: 'ERR_NOT_FOUND · 0x194',
        title: 'Pagina non trovata.',
        body: 'Questa pagina non esiste o è stata spostata.',
        backHome: 'Torna alla home',
    },
};
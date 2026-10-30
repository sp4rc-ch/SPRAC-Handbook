import type { Translation } from './en';

export const de: Translation = {
    siteName: 'The SPRAC Handbook',
    meta: {
        home: {
            title: 'The SPRAC Handbook · SPARC, CYLG und CYBAT erklärt',
            description: 'Inoffizielle Wissensdatenbank zu SPARC, dem Cyber Lehrgang und dem Cyber Bataillon 42. Was sie sind, wie sie aufgebaut sind und wo du mehr liest.',
        },
        legalNotice: {
            title: 'Impressum',
            description: 'Wer das SPRAC Handbook betreibt, ein Community-Projekt ohne Verbindung zu SPARC, der Schweizer Armee oder dem Kommando Cyber, und wie du uns erreichst.',
        },
        privacyPolicy: {
            title: 'Datenschutzerklärung',
            description: 'Welche Personendaten das SPRAC Handbook bearbeitet, wozu, wie lange, und welche Rechte du nach Schweizer Datenschutzrecht hast.',
        },
    },
    nav: {
        home: 'Startseite',
        language: 'Sprache',
        newTab: '(öffnet in neuem Tab)',
    },
    home: {
        launch: {
            headlineStart: 'Launch rund um den ',
            headlineHighlight: 'ersten Advent.',
            intro: 'Das SPRAC Handbook ist eine inoffizielle, von Studierenden erstellte Wissensdatenbank zu SPARC, dem Cyber Lehrgang und dem Cyber Bataillon 42. Wir schreiben und prüfen noch jede Seite. Bis zum Launch kannst du helfen, indem du Fehler im Repo meldest.',
            statusLabel: 'Status',
            statusValue: 'In Arbeit',
            launchLabel: 'Geplanter Launch',
            launchValue: 'Ende Nov. oder Anfang Dez. 2026',
            checkRepo: 'Zum Repo',
        },
        contribute: {
            title: 'Fehler entdeckt? Eröffne ein Issue.',
            introStart:
                'Vor dem Launch nehmen wir nur Issues an. Falsche Angabe, defekter Link oder Tippfehler gefunden? Eröffne ein Issue im Repo. Pull Requests für neue Seiten oder UI-Änderungen sind bis zum Launch pausiert.',
            introEmphasis: 'Beiträge nehmen wir nur von SPARC-Teilnehmenden und Personen mit Bezug zu SPARC an.',
            code: '$ git checkout -b fix/typo',
            openIssue: 'Issue eröffnen',
            viewRepo: 'Repo ansehen',
            ways: {
                fact: { title: 'Falsche oder veraltete Angabe', description: 'Daten, Zahlen, Anforderungen oder Kontakte, die sich geändert haben.' },
                link: { title: 'Defekter Link', description: 'Ein Link, der ins Leere führt oder auf die falsche Seite zeigt.' },
                typo: { title: 'Tippfehler oder unklarer Text', description: 'Rechtschreibung, Grammatik oder verwirrende Formulierungen.' },
            },
            privacyNote:
                'Datenschutz zuerst: Eröffne keine Issues und kommentiere nicht mit einem GitHub-Konto, das deinen echten Namen oder andere persönliche Angaben zeigt. Nutze ein separates Konto, zum Beispiel mit deinem SPARC-Alias.',
        },
    },
    footer: {
        tagline: 'Eine inoffizielle Wissensdatenbank zu SPARC, dem Cyber Lehrgang und dem Cyber Bataillon 42. Erstellt von Studierenden aus der SPARC-Community, basierend auf offiziellen Quellen.',
        resources: 'Ressourcen',
        contribute: 'Auf GitHub mitwirken',
        officialSites: 'Offizielle Seiten',
        cyberMiliz: 'Cyber-Miliz · CYLG',
        cyberBattalion42: 'Cyber Bataillon 42',
        kommandoCyber: 'Kommando Cyber',
        legal: 'Rechtliches',
        legalNotice: 'Impressum',
        privacyPolicy: 'Datenschutzerklärung',
        copyright: '© 2026 The SPRAC Handbook',
        disclaimer: 'Community-Projekt. Keine Verbindung zur Schweizer Armee oder zu SPARC.',
        lastVerified: 'Zuletzt geprüft · Nov. 2026',
    },
    notFound: {
        documentTitle: 'Seite nicht gefunden',
        eyebrow: 'ERR_NOT_FOUND · 0x194',
        title: 'Seite nicht gefunden.',
        body: 'Diese Seite existiert nicht oder wurde verschoben.',
        backHome: 'Zurück zur Startseite',
    },
};
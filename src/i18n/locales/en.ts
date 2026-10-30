export const en = {
    siteName: 'The SPRAC Handbook',
    /** Search result title and description per page. */
    meta: {
        home: {
            title: 'The SPRAC Handbook · SPARC, CYLG and CYBAT explained',
            description: 'Unofficial knowledge base on SPARC, the Cyber Lehrgang and Cyber Bataillon 42. What they are, how they are built and where to read more.',
        },
        legalNotice: {
            title: 'Legal notice',
            description: 'Who runs the SPRAC Handbook, a community project not affiliated with SPARC, the Swiss Armed Forces or the Cyber Command, and how to reach us.',
        },
        privacyPolicy: {
            title: 'Privacy policy',
            description: 'Which personal data the SPRAC Handbook processes, why, for how long, and which rights you have under Swiss data protection law.',
        },
    },
    nav: {
        home: 'Home',
        language: 'Language',
        newTab: '(opens in a new tab)',
    },
    home: {
        launch: {
            headlineStart: 'Launching around the ',
            headlineHighlight: 'first Advent.',
            intro: "The SPRAC Handbook is an unofficial, student-made knowledge base on SPARC, the Cyber Lehrgang and Cyber Bataillon 42. We're still writing and fact-checking every page. Until launch, you can help by reporting issues in the repo.",
            statusLabel: 'Status',
            statusValue: 'Work in progress',
            launchLabel: 'Estimated launch',
            launchValue: 'End of Nov or early Dec 2026',
            checkRepo: 'Check out the repo',
        },
        contribute: {
            title: 'Spotted a problem? Open an issue.',
            introStart:
                'Before launch we only take issues. Found a wrong fact, a broken link or a typo? Open an issue in the repo. Pull requests for new pages or UI changes are paused until launch.',
            introEmphasis: 'Contributions are only accepted from SPARC students and people associated with SPARC.',
            code: '$ git checkout -b fix/typo',
            openIssue: 'Open an issue',
            viewRepo: 'View the repo',
            ways: {
                fact: { title: 'Wrong or outdated fact', description: 'Dates, numbers, requirements or contacts that changed.' },
                link: { title: 'Broken link', description: 'A link that 404s or points to the wrong page.' },
                typo: { title: 'Typo or unclear text', description: 'Spelling, grammar or confusing wording.' },
            },
            privacyNote:
                "Privacy first: don't open issues or comment with a GitHub account that shows your real name or other personal info. Use a separate account, for example with your SPARC alias.",
        },
    },
    footer: {
        tagline: 'An unofficial knowledge base on SPARC, the Cyber Lehrgang and Cyber Bataillon 42. Made by students from the SPARC community, sourced from official pages.',
        resources: 'Resources',
        contribute: 'Contribute on GitHub',
        officialSites: 'Official sites',
        cyberMiliz: 'Cyber-Miliz · CYLG',
        cyberBattalion42: 'Cyber Bataillon 42',
        kommandoCyber: 'Kommando Cyber',
        legal: 'Legal',
        legalNotice: 'Legal notice',
        privacyPolicy: 'Privacy policy',
        copyright: '© 2026 The SPRAC Handbook',
        disclaimer: 'Community project. Not affiliated with the Swiss Armed Forces or SPARC.',
        lastVerified: 'Last verified · Nov 2026',
    },
    notFound: {
        documentTitle: 'Page not found',
        eyebrow: 'ERR_NOT_FOUND · 0x194',
        title: 'Page not found.',
        body: "This page doesn't exist or was moved.",
        backHome: 'Back to home',
    },
};

/** Shape every locale must match. Derived from English so a missing key fails the build. */
export type Translation = typeof en;
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
export const en = {
    siteName: 'The SPRAC Handbook',
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

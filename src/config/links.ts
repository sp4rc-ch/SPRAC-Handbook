export const REPO_URL = 'https://github.com/sp4rc-ch/SPRAC-Handbook/';

/** The student wiki, the sister site to the handbook. */
export const WIKI_URL = 'https://wiki.sprac.ch';

/** Placeholder until an issue tracker exists. */
export const ISSUE_URL = 'https://github.com/sp4rc-ch/SPRAC-Handbook/issues';

/** vo1n, maintainer: contact for questions, legal and privacy requests. */
export const CONTACT_EMAIL = 'contact@sprac.ch';

/** Federal Data Protection and Information Commissioner. */
export const FDPIC_URL = 'https://www.edoeb.admin.ch';

export const EXTERNAL_LINKS = {
    sparc: 'https://sparc-cyberdefence.ch',
    sparcEvents: 'https://events.sparc-cyberdefence.ch',
    sparcEmail: 'mailto:info@sparc-cyberdefence.ch',
    sparcPhone: 'tel:+41584652222',
    vlogin: 'https://idp.viam.admin.ch/selfadmin/newletter',
    vtg: 'https://www.vtg.admin.ch',
    cyberMiliz: 'https://www.vtg.admin.ch/cyber-miliz',
    cyberBattalion42: 'https://www.vtg.admin.ch/neu-gegrundetes-bataillon-ubernimmt-kommando',
    kommandoCyber: 'https://www.vtg.admin.ch/kdo-cy',
} as const;

/** GitHub page that edits a file of this repository on the dev branch. */
export const editUrl = (file: string) => `${REPO_URL}edit/dev/${file}`;

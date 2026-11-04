export const REPO_URL = 'https://github.com/sprac-ch/handbook/';

/** GitHub page of a file of this repository on the dev branch, for example `content/sparc.md`. */
export const fileUrl = (file: string) => `${REPO_URL}blob/dev/${file}`;

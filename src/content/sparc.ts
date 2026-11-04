import { readProgram, type ProgramPage, type SectionKind } from './program';

/** The sections of content/sparc.md after "At a glance", in order. */
const LAYOUT: SectionKind[] = ['text', 'requirements', 'levels', 'tiles', 'steps', 'rules', 'yesno', 'links'];

let page: ProgramPage | undefined;

/** Content of content/sparc.md. */
export function getSparc(): ProgramPage {
    return (page ??= readProgram('sparc', LAYOUT));
}

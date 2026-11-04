import { readProgram, type ProgramPage, type SectionKind } from './program';

/** The sections of content/cylg.md after "At a glance", in order. */
const LAYOUT: SectionKind[] = ['tiles', 'requirements', 'levels', 'steps', 'tiles', 'rules', 'yesno', 'links'];

let page: ProgramPage | undefined;

/** Content of content/cylg.md. */
export function getCylg(): ProgramPage {
    return (page ??= readProgram('cylg', LAYOUT));
}

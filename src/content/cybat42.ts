import { readProgram, type ProgramPage, type SectionKind } from './program';

/** The sections of content/cybat42.md after "At a glance", in order. */
const LAYOUT: SectionKind[] = ['tiles', 'tiles', 'checklists', 'steps', 'rules', 'yesno', 'links'];

let page: ProgramPage | undefined;

/** Content of content/cybat42.md. */
export function getCybat42(): ProgramPage {
    return (page ??= readProgram('cybat42', LAYOUT));
}

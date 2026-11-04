import { ProgramPageView } from '@/components/program/ProgramPageView';
import { getSparc } from '@/content/sparc';

/** SPARC program page. Content: content/sparc.md. */
export function Sparc() {
    return <ProgramPageView page={getSparc()} contentFile="sparc" />;
}

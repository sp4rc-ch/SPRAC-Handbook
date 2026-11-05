import { ProgramPageView } from '@/components/program/ProgramPageView';
import { getCybat42 } from '@/content/cybat42';

/** Cyber Bataillon 42 program page. Content: content/cybat42.md. */
export function Cybat42() {
    return <ProgramPageView page={getCybat42()} contentFile="cybat42" />;
}

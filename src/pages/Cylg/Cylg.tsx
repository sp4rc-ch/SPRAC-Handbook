import { ProgramPageView } from '@/components/program/ProgramPageView';
import { getCylg } from '@/content/cylg';

/** Cyber Lehrgang program page. Content: content/cylg.md. */
export function Cylg() {
    return <ProgramPageView page={getCylg()} contentFile="cylg" />;
}

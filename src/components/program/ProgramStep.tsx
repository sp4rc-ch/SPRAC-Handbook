import { Inline } from '@/components/content/Inline';

type ProgramStepProps = {
    number: number;
    title: string;
    text: string;
};

/** Numbered step: a ring with the number, the title next to it and the text underneath. */
export function ProgramStep({ number, title, text }: ProgramStepProps) {
    return (
        <li className="flex flex-col gap-1">
            <div className="flex items-center gap-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong bg-canvas font-mono text-sm leading-[1.6] text-fg">{number}</span>
                <h3 className="min-w-0 flex-1 text-base leading-[1.2] font-medium text-fg">{title}</h3>
            </div>
            <p className="pl-14 text-sm leading-[1.5] text-fg-muted">
                <Inline text={text} />
            </p>
        </li>
    );
}

import { useState, type ReactNode } from 'react';
import { CheckItem } from '@/components/program/CheckItem';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SmartLink } from '@/components/ui/SmartLink';
import type { Situation } from '@/content/path';

/** What every box of a panel (by when, you need, where) looks like: a small mono label above its content. */
function Detail({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-elevated p-5">
            <h4 className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-muted uppercase">{label}</h4>
            {children}
        </div>
    );
}

/** The next step for one situation. */
function Panel({ situation, hidden }: { situation: Situation; hidden: boolean }) {
    const { byWhen, needs, where, extra, button } = situation;

    return (
        <div
            id={`panel-${situation.id}`}
            role="tabpanel"
            aria-labelledby={`situation-${situation.id}`}
            hidden={hidden}
            className={`${hidden ? 'hidden' : 'flex'} flex-col gap-6 rounded-xl border border-line bg-surface px-5 py-6 md:gap-7 md:p-10 xl:gap-8 xl:p-12`}
        >
            <div className="flex flex-col gap-3">
                <p className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-accent uppercase">Next step · {situation.label}</p>
                <h3 className="font-display text-2xl leading-[1.2] font-medium tracking-[-0.015em] md:text-[28px] lg:text-[32px]">{situation.title}</h3>
                <p className="max-w-[760px] text-base leading-[1.6] text-fg-muted md:text-lg">{situation.text}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Detail label={byWhen.label}>
                    <p className="font-display text-xl leading-[1.4] font-medium tracking-[-0.005em]">{byWhen.value}</p>
                    {byWhen.note && <p className="text-sm leading-[1.5] text-fg-muted">{byWhen.note}</p>}
                </Detail>
                <Detail label={needs.label}>
                    <ul className="flex flex-col gap-3">
                        {needs.items.map((item) => (
                            <CheckItem key={item}>{item}</CheckItem>
                        ))}
                    </ul>
                </Detail>
                <Detail label={where.label}>
                    {where.places.map((place) => (
                        <div key={place.note} className="flex flex-col gap-3">
                            <p className="text-sm leading-[1.5] text-fg-muted">{place.note}</p>
                            {place.href ? (
                                <SmartLink href={place.href} className="text-sm leading-[1.2] font-medium break-words text-accent hover:underline focus-visible:underline focus-visible:outline-none">
                                    {place.value}
                                </SmartLink>
                            ) : (
                                <p className="text-sm leading-[1.2] font-medium break-words text-accent">{place.value}</p>
                            )}
                        </div>
                    ))}
                </Detail>
            </div>

            {extra && (
                <Detail label={extra.label}>
                    <p className="text-sm leading-[1.5] text-fg-muted">{extra.text}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {extra.topics.map((topic) => (
                            <Badge key={topic.label} tone={topic.tone}>
                                {topic.label}
                            </Badge>
                        ))}
                    </div>
                </Detail>
            )}

            <div>
                <Button href={button.href} iconSrc={button.icon} fullWidthOnMobile>
                    {button.label}
                </Button>
            </div>
        </div>
    );
}

type SituationPickerProps = { situations: Situation[]; initial: number; /** Accessible name of the list of chips. */ label: string };

/**
 * "Where are you now?": one chip per situation and the panel of the selected one. All panels are in the page
 * (the others hidden), so the text is in the pre-rendered HTML for readers that do not run JavaScript.
 */
export function SituationPicker({ situations, initial, label }: SituationPickerProps) {
    const [selected, setSelected] = useState(initial);

    return (
        <div className="flex flex-col gap-10">
            <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
                {situations.map((situation, index) => {
                    const active = index === selected;
                    return (
                        <button
                            key={situation.id}
                            id={`situation-${situation.id}`}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            aria-controls={`panel-${situation.id}`}
                            onClick={() => setSelected(index)}
                            className={`rounded-full border px-4 py-3 text-sm leading-[1.2] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                                active ? 'border-transparent bg-accent text-on-accent focus-visible:outline-fg' : 'border-line bg-surface text-fg-muted hover:text-fg focus-visible:outline-accent'
                            }`}
                        >
                            {situation.label}
                        </button>
                    );
                })}
            </div>
            {situations.map((situation, index) => (
                <Panel key={situation.id} situation={situation} hidden={index !== selected} />
            ))}
        </div>
    );
}

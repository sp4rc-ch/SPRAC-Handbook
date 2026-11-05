import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { publicUrl } from '@/config/assets';
import type { PathPage, Station } from '@/content/path';

const NODE = 'assets/path/node.svg';

/**
 * One stop of the route. Desktop (xl): the stops sit side by side on a track. Tablet and phone: they are stacked
 * with a rail on the left, where the line runs from each node to the next.
 */
function StationItem({ station, last }: { station: Station; last: boolean }) {
    const isPhoto = station.logo.endsWith('.png');

    return (
        <li className="flex gap-4 md:gap-6 xl:flex-col xl:gap-4">
            <div className="relative flex flex-col items-center self-stretch xl:items-start xl:self-auto">
                <img src={publicUrl(NODE)} alt="" width={28} height={28} className="relative size-7 shrink-0" />
                {!last && <span className="min-h-px w-0.5 flex-1 bg-accent xl:hidden" />}
            </div>
            <div className={`flex min-w-0 flex-1 flex-col gap-3 xl:gap-4 ${last ? '' : 'pb-8 md:pb-10'} xl:pb-0`}>
                <div className="flex items-center gap-[14px] xl:flex-col xl:items-start xl:gap-4">
                    {/* The Swiss Army shield is a photo on black: "lighten" lets the canvas show through, as in the design. */}
                    <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg md:size-12 xl:size-14">
                        <img src={publicUrl(station.logo)} alt="" className={`size-full object-contain ${isPhoto ? 'mix-blend-lighten' : ''}`} />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-1 xl:flex-none xl:gap-1.5">
                        <p className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-muted uppercase">{station.phase}</p>
                        <h3 className="font-display text-xl leading-[1.3] font-medium tracking-[-0.01em] md:text-[22px] xl:text-2xl">{station.title}</h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {station.badges.map((badge) => (
                        <Badge key={badge.label} tone={badge.tone}>
                            {badge.label}
                        </Badge>
                    ))}
                </div>
                <p className="text-sm leading-[1.5] text-fg-muted">{station.text}</p>
            </div>
        </li>
    );
}

/** The route card: four stops, the lateral entry hint and a legend. */
export function RouteMap({ route }: { route: PathPage['route'] }) {
    const [main, lateral] = route.legend;
    const { lateral: entry } = route;

    return (
        <div className="flex flex-col gap-7 rounded-xl border border-line bg-surface px-5 py-6 md:gap-8 md:p-10 xl:gap-10 xl:p-12">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-accent uppercase">{route.title}</h2>
                <ul className="flex items-center gap-5 font-mono text-xs leading-[1.4] text-fg-muted">
                    <li className="flex items-center gap-2">
                        <img src={publicUrl('assets/path/legend-main-route.svg')} alt="" width={20} height={2} />
                        {main}
                    </li>
                    <li className="flex items-center gap-2">
                        <img src={publicUrl('assets/path/legend-lateral-entry.svg')} alt="" width={20} height={2} />
                        {lateral}
                    </li>
                </ul>
            </div>

            <ol className="relative flex flex-col xl:grid xl:grid-cols-4 xl:gap-6">
                {/* The track behind the four nodes (desktop only): from the first node to the last. */}
                <span aria-hidden="true" className="absolute top-[13px] left-3.5 hidden h-0.5 w-[calc(75%+18px)] bg-accent xl:block" />
                {route.stations.map((station, index) => (
                    <StationItem key={station.title} station={station} last={index === route.stations.length - 1} />
                ))}
            </ol>

            <div className="flex flex-col gap-3 border-t border-line-subtle pt-6 md:flex-row md:items-center md:gap-4 xl:pt-8">
                <div className="flex shrink-0 items-center gap-2.5">
                    <img src={publicUrl('assets/path/lateral-entry-line.svg')} alt="" width={24} height={2} />
                    <Badge tone="neutral">{entry.tag}</Badge>
                </div>
                <p className="min-w-0 text-sm leading-[1.5] text-fg-muted md:flex-1">{entry.text}</p>
                <div className="md:shrink-0">
                    <Button href={entry.button.href} iconSrc={entry.button.icon} variant="ghost">
                        {entry.button.label}
                    </Button>
                </div>
            </div>
        </div>
    );
}

import { publicUrl } from '@/config/assets';
import { getSite } from '@/content/site';
import { Link } from '@/router/Link';
import { buildPath } from '@/router/routes';

/** Site logo + name from content/site.md. Links to the home page. */
export function Logo() {
    const site = getSite();

    return (
        <Link href={buildPath('home')} className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <img src={publicUrl(site.logo)} alt="" className="size-9 object-contain" />
            <span className="font-display text-xl leading-[1.4] font-medium tracking-[-0.005em] whitespace-nowrap">{site.name}</span>
        </Link>
    );
}

import { LOGO_URL } from '@/config/assets';
import { en as t } from '@/i18n/locales/en';
import { Link } from '@/router/Link';
import { buildPath } from '@/router/routes';

/** SPARC patch + wordmark. Links to the home page. */
export function Logo() {
    return (
        <Link href={buildPath('home')} className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <img src={LOGO_URL} alt="" className="size-9 object-contain" />
            <span className="font-display text-xl leading-[1.4] font-medium tracking-[-0.005em] whitespace-nowrap">{t.siteName}</span>
        </Link>
    );
}

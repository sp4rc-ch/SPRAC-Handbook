import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { MenuButton } from '@/components/ui/MenuButton';
import { WIKI_URL } from '@/config/links';
import { en as t } from '@/i18n/locales/en';
import { Link } from '@/router/Link';
import { usePathname } from '@/router/navigation';
import { buildPath, parsePath } from '@/router/routes';
import { Logo } from './Logo';
import { ProgramMenuItem } from './ProgramMenuItem';

/** Matches the `md` breakpoint: from here the links sit in the bar, below it they live in the burger menu. */
const BAR_QUERY = '(min-width: 768px)';

/** Pages that are not built yet use "#": the link stays, but nothing jumps. */
function keepInPlace(href: string) {
    return href === '#' ? (event: MouseEvent) => event.preventDefault() : undefined;
}

const LABEL = 'text-base leading-[1.2] font-medium whitespace-nowrap';

/** Nav link: secondary by default, primary on hover, 2px yellow indicator when active. */
function NavLink({ href, active = false, children }: { href: string; active?: boolean; children: ReactNode }) {
    const className = `group flex flex-col items-center gap-1 pt-3 pb-2 ${LABEL} ${active ? 'text-fg' : 'text-fg-muted hover:text-fg'} transition-colors focus-visible:text-fg focus-visible:outline-none`;
    const indicator = <span className={`h-0.5 w-full ${active ? 'bg-accent' : 'bg-transparent group-focus-visible:bg-line-strong'}`} />;

    if (href === '#') {
        return (
            <a href={href} onClick={keepInPlace(href)} className={className}>
                {children}
                {indicator}
            </a>
        );
    }

    return (
        <Link href={href} aria-current={active ? 'page' : undefined} className={className}>
            {children}
            {indicator}
        </Link>
    );
}

/** Nav dropdown: opens the Programs menu 8px under the trigger, caret flips up while open. */
function ProgramsDropdown() {
    const [open, setOpen] = useState(false);
    const wrapper = useRef<HTMLDivElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const menuId = useId();

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            setOpen(false);
            trigger.current?.focus();
        };
        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    return (
        <div
            ref={wrapper}
            className="relative"
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
            }}
        >
            <button
                ref={trigger}
                type="button"
                aria-expanded={open}
                aria-controls={menuId}
                onClick={() => setOpen((value) => !value)}
                className={`flex items-start gap-2 pt-3 pb-2 ${LABEL} ${open ? 'text-fg' : 'text-fg-muted hover:text-fg'} transition-colors focus-visible:text-fg focus-visible:outline-none`}
            >
                <span className="flex flex-col gap-1">
                    {t.nav.programs}
                    <span className="h-0.5 w-full" />
                </span>
                <span className="flex h-[19px] items-center">
                    <Icon name={open ? 'caret-up' : 'caret-down'} size={16} />
                </span>
            </button>
            {open && (
                <div id={menuId} className="absolute top-full left-0 z-50 mt-2 flex w-[368px] animate-fade-in flex-col gap-0.5 rounded-lg border border-line bg-elevated p-1 shadow-dropdown">
                    <p className="px-3 pt-2.5 pb-1.5 font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-muted uppercase">{t.nav.programs}</p>
                    {t.nav.programItems.map((item) => (
                        <ProgramMenuItem key={item.id} name={item.name} text={item.text} logo={item.logo} href="#" />
                    ))}
                </div>
            )}
        </div>
    );
}

/** Full-screen menu for phones, shown under the bar: Programs, Path, Glossary and the Wiki button. */
function MobileMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
    const row = 'flex items-center justify-between px-3 py-4 font-display text-lg leading-[1.4] font-medium tracking-[-0.005em] text-fg';

    return (
        <div
            id={id}
            onClick={(event) => (event.target as Element).closest('a') && onNavigate()}
            className="fixed inset-x-0 top-14 bottom-0 z-40 animate-fade-in overflow-y-auto bg-canvas md:hidden"
        >
            <nav aria-label={t.nav.primary} className="flex flex-col gap-6 px-4 py-6">
                <div className="flex flex-col gap-1">
                    <p className="px-3 pb-1 font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-muted uppercase">{t.nav.programs}</p>
                    {t.nav.programItems.map((item) => (
                        <ProgramMenuItem key={item.id} name={item.name} text={item.text} logo={item.logo} href="#" />
                    ))}
                </div>
                <div className="flex flex-col">
                    <a href="#" onClick={keepInPlace('#')} className={`${row} border-t border-line-subtle`}>
                        {t.nav.path}
                        <Icon name="caret-right" size={20} />
                    </a>
                    <a href="#" onClick={keepInPlace('#')} className={`${row} border-y border-line-subtle`}>
                        {t.nav.glossary}
                        <Icon name="caret-right" size={20} />
                    </a>
                    <div className="flex px-3 py-4">
                        <div className="flex flex-1 [&>a]:flex-1">
                            <Button href={WIKI_URL} external icon="arrow-up-right">
                                {t.nav.wiki}
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

/** 56px on phones, 64px on tablets, 72px on desktop. Phones: logo and burger, the rest lives in the menu. */
export function Navbar() {
    const pathname = usePathname();
    const onHome = parsePath(pathname) === 'home';
    // The menu is open for one page only: a page change closes it.
    const [openAt, setOpenAt] = useState<string | null>(null);
    const menuOpen = openAt === pathname;
    const menuId = useId();
    const closeMenu = () => setOpenAt(null);

    // Also close it whenever the bar grows wide enough to show the links.
    useEffect(() => {
        const query = window.matchMedia(BAR_QUERY);
        const onChange = () => query.matches && setOpenAt(null);
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, []);

    // While the menu is open the page behind it must not scroll; Escape closes it.
    useEffect(() => {
        if (!menuOpen) return;
        document.documentElement.classList.add('overflow-hidden');
        const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpenAt(null);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.documentElement.classList.remove('overflow-hidden');
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [menuOpen]);

    return (
        <header className="sticky top-0 z-50 shrink-0 border-b border-line-subtle bg-canvas">
            <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 md:h-16 md:px-8 lg:h-18 lg:px-20">
                <Logo />
                <nav aria-label={t.nav.primary} className="hidden items-center gap-8 md:flex lg:gap-10">
                    <NavLink href={buildPath('home')} active={onHome}>
                        {t.nav.homepage}
                    </NavLink>
                    <ProgramsDropdown />
                    <NavLink href="#">{t.nav.path}</NavLink>
                    <NavLink href="#">{t.nav.glossary}</NavLink>
                    <Button href={WIKI_URL} external icon="arrow-up-right">
                        {t.nav.wiki}
                    </Button>
                </nav>
                <div className="md:hidden">
                    <MenuButton open={menuOpen} onClick={() => setOpenAt(menuOpen ? null : pathname)} label={menuOpen ? t.nav.closeMenu : t.nav.openMenu} controls={menuId} />
                </div>
            </div>
            {menuOpen && <MobileMenu id={menuId} onNavigate={closeMenu} />}
        </header>
    );
}

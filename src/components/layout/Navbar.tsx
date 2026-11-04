import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { SmartLink } from '@/components/ui/SmartLink';
import { getSite } from '@/content/site';
import { usePathname } from '@/router/navigation';
import { linkKind, resolveHref } from '@/router/href';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { ProgramMenuItem } from './ProgramMenuItem';

/** Matches the `md` breakpoint: from here the links sit in the bar, below it they live in the burger menu. */
const BAR_QUERY = '(min-width: 768px)';

const LABEL = 'text-base leading-[1.2] font-medium whitespace-nowrap';

const withSlash = (path: string) => path.replace(/\/?$/, '/');

/** True when `href` (as written in content/site.md) is the page being shown. */
function isCurrent(href: string | undefined, pathname: string): boolean {
    return href !== undefined && linkKind(href) === 'internal' && withSlash(resolveHref(href)) === withSlash(pathname);
}

/** Nav link: secondary by default, primary on hover, 2px yellow indicator when active. */
function NavLink({ href, active = false, children }: { href: string; active?: boolean; children: ReactNode }) {
    return (
        <SmartLink href={href} aria-current={active ? 'page' : undefined} className={`group flex flex-col items-center gap-1 pt-3 pb-2 ${LABEL} ${active ? 'text-fg' : 'text-fg-muted hover:text-fg'} transition-colors focus-visible:text-fg focus-visible:outline-none`}>
            {children}
            <span className={`h-0.5 w-full ${active ? 'bg-accent' : 'bg-transparent group-focus-visible:bg-line-strong'}`} />
        </SmartLink>
    );
}

/** Nav dropdown: opens the Programs menu 8px under the trigger, caret flips up while open. */
function ProgramsDropdown({ active }: { active: boolean }) {
    const { nav } = getSite();
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
                className={`flex items-start gap-2 pt-3 pb-2 ${LABEL} ${open || active ? 'text-fg' : 'text-fg-muted hover:text-fg'} transition-colors focus-visible:text-fg focus-visible:outline-none`}
            >
                <span className="flex flex-col gap-1">
                    {nav.programsLabel}
                    <span className={`h-0.5 w-full ${active ? 'bg-accent' : ''}`} />
                </span>
                <span className="flex h-[19px] items-center">
                    <Icon name={open ? 'caret-up' : 'caret-down'} size={16} />
                </span>
            </button>
            {open && (
                <div id={menuId} className="absolute top-full left-0 z-50 mt-2 flex w-[368px] animate-fade-in flex-col gap-0.5 rounded-lg border border-line bg-elevated p-1 shadow-dropdown">
                    <p className="px-3 pt-2.5 pb-1.5 font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-muted uppercase">{nav.programsLabel}</p>
                    {nav.programs.map((item) => (
                        <ProgramMenuItem key={item.name} name={item.name} text={item.text} logo={item.logo} href={item.href} />
                    ))}
                </div>
            )}
        </div>
    );
}

/** 56px on phones, 64px on tablets, 72px on desktop. Phones: logo and burger, the rest lives in the menu. */
export function Navbar() {
    const { nav, labels } = getSite();
    const pathname = usePathname();
    // The menu is open for one page only: a page change closes it.
    const [openAt, setOpenAt] = useState<string | null>(null);
    const menuOpen = openAt === pathname;
    const menuId = useId();
    const closeMenu = useCallback(() => setOpenAt(null), []);

    // Also close it whenever the bar grows wide enough to show the links.
    useEffect(() => {
        const query = window.matchMedia(BAR_QUERY);
        const onChange = () => query.matches && setOpenAt(null);
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, []);

    // While the menu is open the page behind it must not scroll.
    useEffect(() => {
        if (!menuOpen) return;
        document.documentElement.classList.add('overflow-hidden');
        return () => document.documentElement.classList.remove('overflow-hidden');
    }, [menuOpen]);

    return (
        <header className="sticky top-0 z-50 shrink-0 border-b border-line-subtle bg-canvas">
            <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 md:h-16 md:px-8 lg:h-18 lg:px-20">
                <Logo />
                <nav aria-label={labels.mainNavigation} className="hidden items-center gap-8 md:flex lg:gap-10">
                    {nav.items.map((item) =>
                        item.href === undefined ? (
                            <ProgramsDropdown key={item.label} active={nav.programs.some((program) => isCurrent(program.href, pathname))} />
                        ) : (
                            <NavLink key={item.label} href={item.href} active={isCurrent(item.href, pathname)}>
                                {item.label}
                            </NavLink>
                        )
                    )}
                    <Button href={nav.button.href} iconSrc={nav.button.icon}>
                        {nav.button.label}
                    </Button>
                </nav>
                <MobileNav open={menuOpen} onToggle={() => setOpenAt(menuOpen ? null : pathname)} onClose={closeMenu} panelId={menuId} />
            </div>
        </header>
    );
}

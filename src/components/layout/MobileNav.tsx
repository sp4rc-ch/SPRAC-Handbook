import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { MenuButton } from '@/components/ui/MenuButton';
import { SmartLink } from '@/components/ui/SmartLink';
import { getSite } from '@/content/site';
import { ProgramMenuItem } from './ProgramMenuItem';
import { useMenuMotion } from './useMenuMotion';

type MobileNavProps = {
    open: boolean;
    onToggle: () => void;
    onClose: () => void;
    /** Id of the panel, for the burger's aria-controls. */
    panelId: string;
};

/**
 * The burger and the menu panel for phones: Programs, then the other links and the Wiki button. One `open` state drives
 * both, see `useMenuMotion`. The panel always exists but is hidden and inert while closed. Escape closes it and puts
 * the focus back on the burger. Content: content/site.md.
 */
export function MobileNav({ open, onToggle, onClose, panelId }: MobileNavProps) {
    const { nav, labels } = getSite();
    const root = useRef<HTMLDivElement>(null);
    const burger = useRef<HTMLButtonElement>(null);
    useMenuMotion(open, root);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            onClose();
            burger.current?.focus();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [open, onClose]);

    const row = 'flex items-center justify-between px-3 py-4 font-display text-lg leading-[1.4] font-medium tracking-[-0.005em] text-fg';
    // The first link is the Homepage: on phones the logo already leads there.
    const items = nav.items.slice(1);
    const hasPrograms = items.some((item) => item.href === undefined);
    const links = items.filter((item) => item.href !== undefined);

    return (
        <div ref={root} className="md:hidden">
            <MenuButton ref={burger} open={open} onClick={onToggle} label={open ? labels.closeMenu : labels.openMenu} controls={panelId} />
            <div
                id={panelId}
                data-menu-panel=""
                hidden
                inert
                onClick={(event) => (event.target as Element).closest('a') && onClose()}
                className="fixed inset-x-0 top-14 z-40 h-[calc(100dvh-3.5rem)] overflow-hidden bg-canvas"
            >
                <nav aria-label={labels.mainNavigation} className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-6">
                    {hasPrograms && (
                        <div data-menu-programs="" className="flex flex-col gap-1">
                            <p className="px-3 pb-1 font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-muted uppercase">{nav.programsLabel}</p>
                            {nav.programs.map((program) => (
                                <ProgramMenuItem key={program.name} name={program.name} text={program.text} logo={program.logo} href={program.href} />
                            ))}
                        </div>
                    )}
                    <div data-menu-pages="" className="flex flex-col">
                        {links.map((item, index) => (
                            <SmartLink key={item.label} href={item.href!} className={`${row} border-t border-line-subtle ${index === links.length - 1 ? 'border-b' : ''}`}>
                                {item.label}
                                <Icon name="caret-right" size={20} />
                            </SmartLink>
                        ))}
                        <div className="flex px-3 py-4">
                            <div className="flex flex-1 [&>a]:flex-1">
                                <Button href={nav.button.href} iconSrc={nav.button.icon}>
                                    {nav.button.label}
                                </Button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

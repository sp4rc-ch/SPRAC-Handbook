import { Icon } from '@/components/ui/Icon';
import { asset } from '@/config/assets';

type ProgramMenuItemProps = {
    name: string;
    text: string;
    /** File name (without extension) of the square mark in public/assets/logos. */
    logo: string;
    href: string;
};

/** Row inside the Programs dropdown and the mobile menu: mark, title, one-line description, chevron. */
export function ProgramMenuItem({ name, text, logo, href }: ProgramMenuItemProps) {
    return (
        <a
            href={href}
            // The program pages are not built yet: keep the row, do not jump.
            onClick={href === '#' ? (event) => event.preventDefault() : undefined}
            className="group/item flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-overlay focus-visible:bg-overlay focus-visible:outline-none"
        >
            <img src={asset(`logos/${logo}.svg`)} alt="" width={40} height={40} className="size-10 shrink-0" />
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-base leading-[1.2] font-medium whitespace-nowrap text-fg">{name}</span>
                <span className="text-xs leading-[1.4] text-fg-muted">{text}</span>
            </span>
            <Icon name="caret-right" size={16} className="text-fg-subtle transition-colors group-hover/item:text-fg group-focus-visible/item:text-fg" />
        </a>
    );
}

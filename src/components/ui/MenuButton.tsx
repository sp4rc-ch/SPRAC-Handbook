import type { Ref } from 'react';

type MenuButtonProps = {
    open: boolean;
    onClick: () => void;
    label: string;
    controls: string;
    ref?: Ref<HTMLButtonElement>;
};

const BAR = 'absolute left-[11px] h-0.5 w-[18px] rounded-[1px] bg-current';

/**
 * The burger as in the Figma frame "Menu Button / G Pick out": a 40px button with three 18 x 2px bars at x = 11 and
 * y = 12, 19 and 26 (custom bars, not an icon). The bars are only drawn here. They are moved by `useMenuMotion`,
 * which finds them through their `data-bar` attributes, so they animate in step with the menu panel.
 */
export function MenuButton({ open, onClick, label, controls, ref }: MenuButtonProps) {
    return (
        <button
            ref={ref}
            type="button"
            onClick={onClick}
            aria-label={label}
            aria-expanded={open}
            aria-controls={controls}
            className="relative block size-10 shrink-0 overflow-hidden rounded-md text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
            <span aria-hidden="true" data-bar="top" className={`${BAR} top-[12px]`} />
            <span aria-hidden="true" data-bar="middle" className={`${BAR} top-[19px]`} />
            <span aria-hidden="true" data-bar="bottom" className={`${BAR} top-[26px]`} />
        </button>
    );
}

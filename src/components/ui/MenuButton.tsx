type MenuButtonProps = {
    open: boolean;
    onClick: () => void;
    label: string;
    controls: string;
};

const BAR = 'absolute left-[3px] h-[1.5px] w-[18px] rounded-full bg-current transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none';

/**
 * Burger for phones, 40px hit area, no background. Animation "Pick out": the middle bar is pulled out
 * to the right, then the top and bottom bars meet in the middle and cross into an X. Closing plays it backwards.
 */
export function MenuButton({ open, onClick, label, controls }: MenuButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            aria-expanded={open}
            aria-controls={controls}
            className="group flex size-10 shrink-0 items-center justify-center rounded-md text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
            <span aria-hidden="true" className="relative block size-6">
                <span className={`${BAR} top-[5.25px] group-aria-expanded:translate-y-1.5 group-aria-expanded:rotate-45 group-aria-expanded:delay-150`} />
                <span className={`${BAR} top-[11.25px] delay-150 group-aria-expanded:translate-x-3 group-aria-expanded:opacity-0 group-aria-expanded:delay-0`} />
                <span className={`${BAR} top-[17.25px] group-aria-expanded:-translate-y-1.5 group-aria-expanded:-rotate-45 group-aria-expanded:delay-150`} />
            </span>
        </button>
    );
}

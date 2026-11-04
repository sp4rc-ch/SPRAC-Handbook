import { useEffect, useId, useRef, useState, type PointerEvent } from 'react';
import { en } from '@/i18n/locales/en';

/** The only thing the site stores in the browser, as described in the privacy policy. */
const STORAGE_KEY = 'sprac.disclaimer-accepted';

/** Matches the `md` breakpoint: from here the disclaimer is a centred dialog, below it a bottom sheet. */
const DIALOG_QUERY = '(min-width: 768px)';

/** Dragged further than this, or flicked faster, and the sheet is dismissed. */
const DISMISS_DISTANCE = 100;
const DISMISS_VELOCITY = 0.5;

/** Storage can be blocked (private mode, site data off): then the disclaimer simply shows on every visit. */
function hasAccepted(): boolean {
    try {
        return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
}

function rememberAccepted() {
    try {
        localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
        // Nothing to do: the disclaimer comes back on the next visit.
    }
}

/**
 * First-visit disclaimer. Desktop and iPad: centred dialog over a dimmed page. iPhone: bottom
 * sheet that slides up and can be dragged down to dismiss. "I understand" closes both and stores
 * the choice until the site data is cleared. Rendered only in the browser, so the pre-rendered
 * HTML never contains it.
 */
export function DisclaimerDialog() {
    const [open, setOpen] = useState(false);
    const [dragY, setDragY] = useState(0);
    const [dragging, setDragging] = useState(false);
    const drag = useRef({ startY: 0, startTime: 0 });
    const dialogRef = useRef<HTMLDivElement>(null);
    const titleId = useId();
    const { disclaimer } = en;

    useEffect(() => {
        if (!hasAccepted()) setOpen(true);
    }, []);

    useEffect(() => {
        if (!open) return;
        // The dialog itself, not the button: focusing the button would draw its keyboard focus ring on load.
        dialogRef.current?.focus();
        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = overflow;
        };
    }, [open]);

    if (!open) return null;

    const dismiss = () => {
        rememberAccepted();
        setOpen(false);
    };

    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        // The button keeps its own click, and the dialog layout is not draggable.
        if ((event.target as HTMLElement).closest('button') || window.matchMedia(DIALOG_QUERY).matches) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = { startY: event.clientY, startTime: event.timeStamp };
        setDragging(true);
    };

    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (dragging) setDragY(Math.max(0, event.clientY - drag.current.startY));
    };

    const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
        if (!dragging) return;
        setDragging(false);
        const distance = Math.max(0, event.clientY - drag.current.startY);
        const velocity = distance / Math.max(1, event.timeStamp - drag.current.startTime);
        if (event.type === 'pointerup' && (distance > DISMISS_DISTANCE || velocity > DISMISS_VELOCITY)) {
            dismiss();
        } else {
            setDragY(0);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-8">
            <div aria-hidden="true" className="absolute inset-0 animate-fade-in bg-black/64 backdrop-blur-[3px] motion-reduce:animate-none" />
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerEnd}
                onPointerCancel={onPointerEnd}
                style={dragY ? { transform: `translateY(${dragY}px)` } : undefined}
                className={`relative flex w-full outline-none touch-none flex-col items-center gap-5 rounded-t-xl border-t border-line bg-surface px-4 pt-2 pb-10 shadow-sheet animate-sheet-in motion-reduce:animate-none md:w-[480px] md:touch-auto md:animate-dialog-in md:items-start md:gap-6 md:rounded-xl md:border md:p-8 md:shadow-dialog ${
                    dragging ? '' : 'transition-transform duration-200'
                }`}
            >
                <div aria-hidden="true" className="flex w-full justify-center pb-1 md:hidden">
                    <div className="h-[5px] w-9 rounded-full bg-line-strong" />
                </div>

                <div className="flex w-full flex-col gap-2">
                    <p className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-accent uppercase">{disclaimer.eyebrow}</p>
                    <h2 id={titleId} className="font-display text-xl leading-[1.3] font-medium tracking-[-0.01em] md:text-2xl">
                        {disclaimer.title}
                    </h2>
                </div>

                <div className="flex w-full flex-col gap-3 text-sm leading-[1.5] text-fg-muted md:text-base md:leading-[1.6]">
                    <p>{disclaimer.body1}</p>
                    <p>{disclaimer.body2}</p>
                </div>

                <div className="w-full pt-1 md:pt-0">
                    <button
                        type="button"
                        onClick={dismiss}
                        className="inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-base leading-[1.2] font-medium whitespace-nowrap text-on-accent transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
                    >
                        {disclaimer.confirm}
                    </button>
                </div>
            </div>
        </div>
    );
}

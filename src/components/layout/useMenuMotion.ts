import { animate, motionValue, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, type RefObject } from 'react';

/*
 * Mobile menu animation, from the Figma handoff "Dev spec / Mobile menu animation" (flow "Mobile menu animation").
 *
 * One value, `progress`, drives the burger bars and the menu panel together:
 *   0 = closed, 1 = the boundary between the two phases (panel 320px tall), 2 = open.
 * Every animated property is a straight line from its closed value to its value at 1, and on to its open value at 2
 * (see `three`). The numbers below are the keyframes of the spec.
 *
 * Phase 1 takes 200 ms with E1 = cubic-bezier(0.5, 0, 0.75, 0), phase 2 takes 350 ms with E2, the Figma "Gentle"
 * spring (the exact curve from get_motion_context). Opening runs 0 -> 1 -> 2, closing runs 2 -> 1 -> 0, so the same
 * easing sits in each phase in both directions. It plays once and does not repeat.
 *
 * Interrupting is free: a tap while it plays starts the other direction from the current value, nothing is queued,
 * and a value that is already past the phase boundary skips straight to its second phase.
 *
 * prefers-reduced-motion: no transforms. The panel fades in or out over 150 ms and the burger swaps instantly.
 */

const E1: [number, number, number, number] = [0.5, 0, 0.75, 0];
const E2 = (t: number) => 1 - Math.exp(-t * 7.6657) * (Math.cos(t * 6.7605) + 1.1339 * Math.sin(t * 6.7605));
const PHASE_1 = 0.2;
const PHASE_2 = 0.35;
const FADE = 0.15;

/** Height of the panel at the boundary between the phases, and the height of the header above it. */
const MID_HEIGHT = 320;
const HEADER = 56;

/** Value at `progress`: closed at 0, `mid` at 1, `open` at 2. Beyond both ends the lines continue, which is the spring's overshoot. */
const three = (progress: number, closed: number, mid: number, open: number) => (progress <= 1 ? closed + (mid - closed) * progress : mid + (open - mid) * (progress - 1));

type Parts = {
    top: HTMLElement;
    middle: HTMLElement;
    bottom: HTMLElement;
    panel: HTMLElement;
    programs: HTMLElement;
    pages: HTMLElement;
};

function findParts(root: HTMLElement): Parts | null {
    const find = (selector: string) => root.querySelector<HTMLElement>(selector);
    const [top, middle, bottom, panel, programs, pages] = [
        find('[data-bar="top"]'),
        find('[data-bar="middle"]'),
        find('[data-bar="bottom"]'),
        find('[data-menu-panel]'),
        find('[data-menu-programs]'),
        find('[data-menu-pages]'),
    ];
    return top && middle && bottom && panel && programs && pages ? { top, middle, bottom, panel, programs, pages } : null;
}

/**
 * Animates the burger and the panel inside `root` for the `open` state. The parts are found by `data-bar`,
 * `data-menu-panel`, `data-menu-programs` and `data-menu-pages`. Styles are written through the DOM, not as style
 * attributes, because the build's Content Security Policy blocks inline style attributes in the pre-rendered HTML.
 */
export function useMenuMotion(open: boolean, root: RefObject<HTMLElement | null>) {
    const [values] = useState(() => ({ progress: motionValue(0), fade: motionValue(0) }));
    const parts = useRef<Parts | null>(null);
    const playing = useRef<{ stop: () => void } | null>(null);
    const lastOpen = useRef(false);
    const reduced = useRef(false);
    const prefersReduced = useReducedMotion();

    useEffect(() => {
        reduced.current = !!prefersReduced;
    }, [prefersReduced]);

    useEffect(() => {
        const found = root.current ? findParts(root.current) : null;
        if (!found) return;
        parts.current = found;
        const { top, middle, bottom, panel, programs, pages } = found;
        const { progress, fade } = values;

        const render = () => {
            const p = progress.get();

            // Burger: the bars cross into an X, the middle bar slides out and fades.
            top.style.transform = `translateY(${three(p, 0, 0, 7)}px) rotate(${three(p, 0, 0, 45)}deg) scaleX(${three(p, 1, 1, 1.111)})`;
            bottom.style.transform = `translateY(${three(p, 0, 0, -7)}px) rotate(${three(p, 0, 0, -45)}deg) scaleX(${three(p, 1, 1, 1.111)})`;
            middle.style.transform = `translateX(${three(p, 0, 24, 24)}px)`;
            middle.style.opacity = String(three(p, 1, 0, 0));

            if (reduced.current) {
                // No height, no movement: the finished panel just fades.
                panel.style.height = '';
                panel.style.opacity = String(fade.get());
                programs.style.opacity = '';
                programs.style.transform = '';
                pages.style.opacity = '';
                pages.style.transform = '';
                return;
            }

            // Panel grows from 0 to 320px, then to the full height below the header. At rest it is sized by CSS.
            const full = window.innerHeight - HEADER;
            panel.style.height = p === 2 ? '' : `${Math.max(0, three(p, 0, MID_HEIGHT, full))}px`;
            panel.style.opacity = '';
            programs.style.opacity = String(three(p, 0, 0.5, 1));
            programs.style.transform = `translateY(${three(p, -8, -4, 0)}px)`;
            pages.style.opacity = String(three(p, 0, 0, 1));
            pages.style.transform = `translateY(${three(p, -16, -12, 0)}px)`;
        };

        const stopProgress = progress.on('change', render);
        const stopFade = fade.on('change', render);
        render();

        return () => {
            stopProgress();
            stopFade();
            playing.current?.stop();
            parts.current = null;
        };
    }, [root, values]);

    useEffect(() => {
        if (lastOpen.current === open) return;
        lastOpen.current = open;

        const found = parts.current;
        if (!found) return;
        const { panel } = found;
        const { progress, fade } = values;
        const target = open ? 2 : 0;

        playing.current?.stop();

        // Opening: the panel must be reachable before it shows. Closing: it stops taking input at once.
        if (open) {
            panel.hidden = false;
            panel.inert = false;
        } else {
            panel.inert = true;
        }

        const finish = () => {
            progress.set(target);
            if (!open) panel.hidden = true;
        };

        if (reduced.current) {
            progress.set(target);
            playing.current = animate(fade, open ? 1 : 0, {
                duration: FADE,
                ease: 'linear',
                onComplete: () => {
                    if (!open) panel.hidden = true;
                },
            });
            return;
        }

        // From the current value: both phases when it is still before the boundary, only the second when it is past it.
        const from = progress.get();
        const twoPhases = open ? from < 1 : from > 1;
        playing.current = twoPhases
            ? animate(progress, [from, 1, target], { duration: PHASE_1 + PHASE_2, times: [0, PHASE_1 / (PHASE_1 + PHASE_2), 1], ease: [E1, E2], onComplete: finish })
            : animate(progress, [from, target], { duration: PHASE_2, ease: E2, onComplete: finish });
    }, [open, values]);
}

import { useCallback } from 'react';
import { asset, type IconName } from '@/config/assets';

type IconProps = {
    name: IconName;
    /** Pixel size. Figma rule: 24 default, 20 in buttons and inputs, 16 inline with Body/S. */
    size?: number;
    className?: string;
};

/**
 * Phosphor icon drawn through a CSS mask, so it takes the current text colour
 * (the SVG files themselves are filled with text/primary). The size and mask are set through
 * the DOM after mount, not as a style attribute: the build's Content Security Policy blocks
 * inline style attributes, which would strip them from the pre-rendered HTML.
 */
export function Icon({ name, size = 24, className = '' }: IconProps) {
    const ref = useCallback(
        (element: HTMLSpanElement | null) => {
            if (!element) return;
            const url = `url("${asset(`icons/${name}.svg`)}")`;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.maskImage = url;
            element.style.webkitMaskImage = url;
            element.style.maskSize = 'contain';
            element.style.maskRepeat = 'no-repeat';
        },
        [name, size]
    );

    return <span ref={ref} aria-hidden="true" className={`inline-block shrink-0 bg-current ${className}`} />;
}
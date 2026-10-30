import { asset, type IconName } from '@/config/assets';

type IconProps = {
    name: IconName;
    /** Pixel size. Figma rule: 24 default, 20 in buttons and inputs, 16 inline with Body/S. */
    size?: number;
    className?: string;
};

/**
 * Phosphor icon drawn through a CSS mask, so it takes the current text colour
 * (the SVG files themselves are filled with text/primary).
 */
export function Icon({ name, size = 24, className = '' }: IconProps) {
    const url = `url("${asset(`icons/${name}.svg`)}")`;

    return (
        <span
            aria-hidden="true"
            className={`inline-block shrink-0 bg-current ${className}`}
            style={{ width: size, height: size, maskImage: url, WebkitMaskImage: url, maskSize: 'contain', maskRepeat: 'no-repeat' }}
        />
    );
}
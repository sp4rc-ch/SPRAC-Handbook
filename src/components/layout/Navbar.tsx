import { LanguageSelect } from './LanguageSelect';
import { Logo } from './Logo';

/** 56px on phones, 64px on tablets, 72px on desktop. */
export function Navbar() {
    return (
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-line-subtle bg-canvas px-4 md:h-16 md:px-8 lg:h-18 lg:px-20">
            <Logo />
            <LanguageSelect />
        </header>
    );
}

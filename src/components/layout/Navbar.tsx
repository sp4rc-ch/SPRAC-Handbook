import { Logo } from './Logo';

/** 56px on phones, 64px on tablets, 72px on desktop. */
export function Navbar() {
    return (
        <header className="shrink-0 border-b border-line-subtle bg-canvas">
            <div className="mx-auto flex h-14 max-w-[1440px] items-center px-4 md:h-16 md:px-8 lg:h-18 lg:px-20">
                <Logo />
            </div>
        </header>
    );
}
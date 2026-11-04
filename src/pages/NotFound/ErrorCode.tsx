/** Large "404" with a terminal-style block cursor. Sizes follow the 393 / 834 / 1440 frames. */
export function ErrorCode() {
    return (
        <div className="flex items-center gap-2 md:gap-2.5 lg:gap-3">
            <p className="font-mono text-[128px] leading-none font-medium tracking-[-0.06em] md:text-[168px] lg:text-[200px]">404</p>
            <span aria-hidden="true" className="h-[92px] w-3 bg-accent md:h-[121px] md:w-[15px] lg:h-36 lg:w-[18px]" />
        </div>
    );
}

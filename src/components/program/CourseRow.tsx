type CourseRowProps = {
    code: string;
    name: string;
    description: string;
};

/** One course of a level: yellow code, name, short description. */
export function CourseRow({ code, name, description }: CourseRowProps) {
    return (
        <li className="flex items-start gap-4 border-b border-line-subtle py-4 last:border-b-0 md:gap-6">
            <span className="w-12 shrink-0 font-mono text-sm leading-[1.6] text-accent">{code}</span>
            <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="w-full text-base leading-[1.2] font-medium text-fg">{name}</span>
                <span className="w-full text-sm leading-[1.5] text-fg-muted">{description}</span>
            </span>
        </li>
    );
}

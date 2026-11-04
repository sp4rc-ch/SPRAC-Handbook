import { CourseRow } from './CourseRow';

type LevelCardProps = {
    title: string;
    text: string;
    /** Code, name and description of each course. */
    courses: [string, string, string][];
};

/** A SPARC level (Explorer, Defender, Operator) with its courses. */
export function LevelCard({ title, text, courses }: LevelCardProps) {
    return (
        <article className="flex flex-col gap-1 rounded-xl border border-line-subtle bg-surface px-5 py-6 md:p-8">
            <header className="flex flex-col gap-2 pb-3">
                <h3 className="font-display text-xl leading-[1.3] font-medium tracking-[-0.01em] md:text-2xl">{title}</h3>
                <p className="text-sm leading-[1.5] text-fg-muted">{text}</p>
            </header>
            <ul className="flex flex-col gap-1">
                {courses.map(([code, name, description]) => (
                    <CourseRow key={code} code={code} name={name} description={description} />
                ))}
            </ul>
        </article>
    );
}

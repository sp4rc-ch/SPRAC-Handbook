import { Inline } from '@/components/content/Inline';
import type { Course } from '@/content/sparc';
import { CourseRow } from './CourseRow';

type LevelCardProps = {
    title: string;
    text: string;
    courses: Course[];
};

/** A SPARC level (Explorer, Defender, Operator) with its courses. */
export function LevelCard({ title, text, courses }: LevelCardProps) {
    return (
        <article className="flex flex-col gap-1 rounded-xl border border-line-subtle bg-surface px-5 py-6 md:p-8">
            <header className="flex flex-col gap-2 pb-3">
                <h3 className="font-display text-xl leading-[1.3] font-medium tracking-[-0.01em] md:text-2xl">{title}</h3>
                <p className="text-sm leading-[1.5] text-fg-muted">
                    <Inline text={text} />
                </p>
            </header>
            <ul className="flex flex-col gap-1">
                {courses.map((course) => (
                    <CourseRow key={course.code} code={course.code} name={course.name} description={course.description} />
                ))}
            </ul>
        </article>
    );
}

import { Fragment } from 'react';
import { TextLink } from '@/components/legal/TextLink';
import { publicUrl } from '@/config/assets';
import { parseInline } from '@/content/markdown';

/** Renders a piece of text from a content file: **bold**, *italic*, `code`, [links](url) and ![images](path) become markup. */
export function Inline({ text }: { text: string }) {
    return (
        <>
            {parseInline(text).map((part, index) => {
                switch (part.kind) {
                    case 'bold':
                        return (
                            <strong key={index} className="font-medium text-fg">
                                {part.text}
                            </strong>
                        );
                    case 'italic':
                        return <em key={index}>{part.text}</em>;
                    case 'code':
                        return (
                            <code key={index} className="rounded-sm bg-overlay px-1 font-mono text-[0.9em] text-fg">
                                {part.text}
                            </code>
                        );
                    case 'image':
                        return <img key={index} src={publicUrl(part.src)} alt={part.alt} className="inline-block size-5 align-text-bottom" />;
                    case 'link':
                        return (
                            <TextLink key={index} href={part.href}>
                                {part.label}
                            </TextLink>
                        );
                    default:
                        return <Fragment key={index}>{part.text}</Fragment>;
                }
            })}
        </>
    );
}

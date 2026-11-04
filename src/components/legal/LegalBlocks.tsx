import { Inline } from '@/components/content/Inline';
import { Callout } from '@/components/ui/Callout';
import { parseInline, type Block } from '@/content/markdown';
import { BulletList } from './BulletList';
import { DataTable } from './DataTable';
import { DetailList } from './DetailList';
import { Paragraph } from './LegalSection';

/** "**Label:** value": a list made only of these becomes a key/value list. */
const LABELLED = /^\*\*([^*]+?):\*\*\s*([\s\S]*)$/;

/** The blocks of a section of a legal page: paragraphs, bullet or key/value lists, tables and notes. */
export function LegalBlocks({ blocks }: { blocks: Block[] }) {
    return (
        <>
            {blocks.map((block, index) => {
                switch (block.kind) {
                    case 'paragraph': {
                        // A line that holds nothing but a link is shown as the link alone, without paragraph spacing.
                        const parts = parseInline(block.text);
                        if (parts.length === 1 && parts[0].kind === 'link') {
                            return (
                                <div key={index}>
                                    <Inline text={block.text} />
                                </div>
                            );
                        }
                        return (
                            <Paragraph key={index}>
                                <Inline text={block.text} />
                            </Paragraph>
                        );
                    }
                    case 'list': {
                        const labelled = block.items.map((item) => LABELLED.exec(item));
                        if (labelled.every(Boolean)) {
                            return <DetailList key={index} rows={labelled.map((match) => ({ label: match![1], value: <Inline text={match![2]} /> }))} />;
                        }
                        return <BulletList key={index} items={block.items.map((item) => <Inline key={item} text={item} />)} />;
                    }
                    case 'table':
                        return <DataTable key={index} columns={block.header} rows={block.rows} />;
                    case 'quote':
                        return (
                            <Callout key={index}>
                                <Inline text={block.text} />
                            </Callout>
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
}

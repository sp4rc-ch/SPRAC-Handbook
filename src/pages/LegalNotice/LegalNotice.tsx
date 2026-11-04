import { LegalBlocks } from '@/components/legal/LegalBlocks';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { LegalSection } from '@/components/legal/LegalSection';
import { readLegal } from '@/content/legal';

/** Content: content/legal-notice.md. */
export function LegalNotice() {
    const page = readLegal('legal-notice');

    return (
        <LegalLayout title={page.title} lead={page.lead} meta={page.meta}>
            {page.sections.map((section) => (
                <LegalSection key={section.heading} heading={section.heading}>
                    <LegalBlocks blocks={section.blocks} />
                </LegalSection>
            ))}
        </LegalLayout>
    );
}

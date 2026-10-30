import { DetailList } from '@/components/legal/DetailList';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { LegalSection, Paragraph } from '@/components/legal/LegalSection';
import { TextLink } from '@/components/legal/TextLink';
import { CONTACT_EMAIL, REPO_URL } from '@/config/links';
import { useLanguage, useTranslation } from '@/i18n/LanguageContext';
import { buildPath } from '@/router/routes';

export function LegalNotice() {
    const language = useLanguage();
    const { legal, legalNotice: page } = useTranslation();

    return (
        <LegalLayout
            title={page.title}
            lead={page.lead}
            meta={[
                { label: legal.lastUpdated, value: legal.lastUpdatedDate },
                { label: page.projectLabel, value: page.project },
                { label: legal.law, value: page.law },
            ]}
        >
            <LegalSection heading={page.who.heading}>
                <Paragraph>{page.who.body}</Paragraph>
                <DetailList
                    rows={[
                        { label: legal.repoOwner, value: 'An0n' },
                        { label: legal.maintainer, value: 'vo1n' },
                    ]}
                />
            </LegalSection>

            <LegalSection heading={page.contact.heading}>
                <DetailList
                    rows={[
                        { label: legal.email, value: <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-accent">{CONTACT_EMAIL}</a> },
                        { label: page.contact.repositoryLabel, value: <TextLink href={REPO_URL} external>GitHub</TextLink> },
                    ]}
                />
                <Paragraph>{page.contact.body}</Paragraph>
            </LegalSection>

            <LegalSection heading={page.nonCommercial.heading}>
                <Paragraph>{page.nonCommercial.body}</Paragraph>
            </LegalSection>

            <LegalSection heading={page.notOfficial.heading}>
                <Paragraph>{page.notOfficial.body1}</Paragraph>
                <Paragraph>{page.notOfficial.body2}</Paragraph>
            </LegalSection>

            <LegalSection heading={page.accuracy.heading}>
                <Paragraph>{page.accuracy.body1}</Paragraph>
                <Paragraph>{page.accuracy.body2}</Paragraph>
            </LegalSection>

            <LegalSection heading={page.externalLinks.heading}>
                <Paragraph>{page.externalLinks.body}</Paragraph>
            </LegalSection>

            <LegalSection heading={page.copyright.heading}>
                <DetailList
                    rows={[
                        { label: page.copyright.textsLabel, value: page.copyright.licenceNotChosen },
                        { label: page.copyright.codeLabel, value: page.copyright.licenceNotChosen },
                        { label: page.copyright.iconsLabel, value: page.copyright.icons },
                        { label: page.copyright.fontsLabel, value: page.copyright.fonts },
                    ]}
                />
                <Paragraph>{page.copyright.body}</Paragraph>
            </LegalSection>

            <LegalSection heading={page.otherTexts}>
                <div>
                    <TextLink href={buildPath(language, 'privacyPolicy')}>{legal.privacyPolicy}</TextLink>
                </div>
            </LegalSection>
        </LegalLayout>
    );
}
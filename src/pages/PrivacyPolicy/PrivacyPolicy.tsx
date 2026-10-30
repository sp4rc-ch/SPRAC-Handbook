import { BulletList } from '@/components/legal/BulletList';
import { DataTable } from '@/components/legal/DataTable';
import { DetailList } from '@/components/legal/DetailList';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { Emphasis, LegalSection, Paragraph } from '@/components/legal/LegalSection';
import { TextLink } from '@/components/legal/TextLink';
import { CONTACT_EMAIL, FDPIC_URL, REPO_URL } from '@/config/links';
import { useLanguage, useTranslation } from '@/i18n/LanguageContext';
import { buildPath } from '@/router/routes';

export function PrivacyPolicy() {
    const language = useLanguage();
    const { legal, privacy: page } = useTranslation();
    const mail = (
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-fg hover:text-accent">
            {CONTACT_EMAIL}
        </a>
    );

    return (
        <LegalLayout
            title={page.title}
            lead={page.lead}
            meta={[
                { label: legal.lastUpdated, value: legal.lastUpdatedDate },
                { label: page.appliesToLabel, value: 'sprac.ch' },
                { label: legal.law, value: page.law },
            ]}
        >
            <LegalSection heading={page.overview.heading}>
                <Paragraph>{page.overview.body}</Paragraph>
            </LegalSection>

            <LegalSection heading={page.responsible.heading}>
                <Paragraph>{page.responsible.body}</Paragraph>
                <DetailList
                    rows={[
                        { label: legal.repoOwner, value: 'An0n' },
                        { label: legal.maintainer, value: 'vo1n' },
                        { label: legal.email, value: mail },
                    ]}
                />
            </LegalSection>

            <LegalSection heading={page.visiting.heading}>
                <Paragraph>{page.visiting.intro}</Paragraph>
                <BulletList items={page.visiting.items} />
                <DetailList
                    rows={[
                        { label: legal.purpose, value: page.visiting.purpose },
                        { label: legal.retention, value: page.visiting.retention },
                    ]}
                />
                <Paragraph>{page.visiting.outro}</Paragraph>
            </LegalSection>

            <LegalSection heading={page.email.heading}>
                <Paragraph>{page.email.body}</Paragraph>
                <DetailList
                    rows={[
                        { label: legal.purpose, value: page.email.purpose },
                        { label: legal.retention, value: page.email.retention },
                    ]}
                />
            </LegalSection>

            <LegalSection heading={page.repository.heading}>
                <Paragraph>
                    {page.repository.body1Start}
                    <TextLink href={REPO_URL} external>
                        GitHub
                    </TextLink>
                    {page.repository.body1End}
                </Paragraph>
                <Paragraph>
                    {page.repository.body2} <Emphasis>{page.repository.body2Emphasis}</Emphasis>
                </Paragraph>
            </LegalSection>

            <LegalSection heading={page.notDo.heading}>
                <BulletList items={page.notDo.items} />
            </LegalSection>

            <LegalSection heading={page.cookies.heading}>
                <Paragraph>{page.cookies.body1}</Paragraph>
                <Paragraph>{page.cookies.body2}</Paragraph>
                <Paragraph>{page.cookies.body3}</Paragraph>
            </LegalSection>

            <LegalSection heading={page.fonts.heading}>
                <Paragraph>{page.fonts.body1}</Paragraph>
                <Paragraph>{page.fonts.body2}</Paragraph>
            </LegalSection>

            <LegalSection heading={page.recipients.heading}>
                <BulletList
                    items={page.recipients.items.map((item) => (
                        <>
                            <Emphasis>{item.name}</Emphasis>
                            {item.text}
                        </>
                    ))}
                />
            </LegalSection>

            <LegalSection heading={page.abroad.heading}>
                <Paragraph>{page.abroad.intro}</Paragraph>
                <DataTable columns={page.abroad.columns} rows={page.abroad.rows} />
                <Paragraph>{page.abroad.outro}</Paragraph>
            </LegalSection>

            <LegalSection heading={page.security.heading}>
                <Paragraph>{page.security.body}</Paragraph>
            </LegalSection>

            <LegalSection heading={page.rights.heading}>
                <Paragraph>{page.rights.intro}</Paragraph>
                <BulletList items={page.rights.items} />
                <Paragraph>
                    <Emphasis>{page.rights.practiceEmphasis}</Emphasis> {page.rights.practice}
                </Paragraph>
                <Paragraph>
                    {page.rights.requestStart}
                    {mail}
                    {page.rights.requestEnd}
                </Paragraph>
                <Paragraph>{page.rights.complaint}</Paragraph>
                <div>
                    <TextLink href={FDPIC_URL} external>
                        edoeb.admin.ch
                    </TextLink>
                </div>
            </LegalSection>

            <LegalSection heading={page.youngPeople.heading}>
                <Paragraph>{page.youngPeople.body}</Paragraph>
            </LegalSection>

            <LegalSection heading={page.changes.heading}>
                <Paragraph>{page.changes.body}</Paragraph>
                <div>
                    <TextLink href={buildPath(language, 'legalNotice')}>{legal.legalNotice}</TextLink>
                </div>
            </LegalSection>
        </LegalLayout>
    );
}
import type { ReactNode } from 'react';
import { EXTERNAL_LINKS, REPO_URL } from '@/config/links';
import { en } from '@/i18n/locales/en';
import { buildPath } from '@/router/routes';
import { FooterLink } from './FooterLink';
import { Logo } from './Logo';

function LinkGroup({ title, children }: { title: string; children: ReactNode }) {
    return (
        <nav aria-label={title} className="flex flex-col items-center gap-3 md:items-start lg:w-[180px]">
            <h2 className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] whitespace-nowrap text-fg-subtle uppercase">{title}</h2>
            {children}
        </nav>
    );
}

/** Desktop and iPad share one layout; on phones the groups and bottom bar are centred. */
export function Footer() {
    const { footer } = en;

    return (
        <footer className="border-t border-line-subtle bg-canvas">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 pt-12 pb-8 md:gap-10 md:px-8 lg:px-20 lg:pt-16">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
                        <Logo />
                        <p className="text-sm leading-[1.5] text-fg-muted md:w-[236px] lg:w-[340px]">{footer.tagline}</p>
                    </div>

                    <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-6 lg:gap-20">
                        <LinkGroup title={footer.resources}>
                            {/* Contacts and Further reading are not built yet: placeholders. */}
                            <FooterLink href="#">{footer.contacts}</FooterLink>
                            <FooterLink href="#">{footer.furtherReading}</FooterLink>
                            <FooterLink href={REPO_URL} external>
                                {footer.contribute}
                            </FooterLink>
                        </LinkGroup>
                        <LinkGroup title={footer.officialSites}>
                            <FooterLink href={EXTERNAL_LINKS.sparc} external>
                                SPARC
                            </FooterLink>
                            <FooterLink href={EXTERNAL_LINKS.cyberMiliz} external>
                                {footer.cyberMiliz}
                            </FooterLink>
                            <FooterLink href={EXTERNAL_LINKS.cyberBattalion42} external>
                                {footer.cyberBattalion42}
                            </FooterLink>
                            <FooterLink href={EXTERNAL_LINKS.kommandoCyber} external>
                                {footer.kommandoCyber}
                            </FooterLink>
                        </LinkGroup>
                        <LinkGroup title={footer.legal}>
                            <FooterLink href={buildPath('legalNotice')}>{footer.legalNotice}</FooterLink>
                            <FooterLink href={buildPath('privacyPolicy')}>{footer.privacyPolicy}</FooterLink>
                        </LinkGroup>
                    </div>
                </div>

                <div className="h-px bg-line-subtle" />

                <div className="flex flex-col items-center gap-2 text-center text-xs leading-[1.4] md:flex-row md:items-end md:justify-between md:text-left lg:items-center">
                    <div className="flex flex-col items-center gap-0.5 md:items-start md:gap-1 lg:flex-row lg:gap-4">
                        <p className="text-fg-muted">{footer.copyright}</p>
                        <p className="text-fg-subtle">{footer.disclaimer}</p>
                    </div>
                    <p className="font-mono whitespace-nowrap text-fg-subtle uppercase">{footer.lastVerified}</p>
                </div>
            </div>
        </footer>
    );
}

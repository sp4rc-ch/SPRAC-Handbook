import { useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { LanguageContext } from '@/i18n/LanguageContext';
import { detectLanguage } from '@/i18n/languages';
import { navigate, usePathname } from '@/router/navigation';
import { parsePath } from '@/router/routes';
import { NotFound } from '@/pages/NotFound/NotFound';

export function App() {
    const route = parsePath(usePathname());
    const language = route.language;
    const rest = route.language === undefined ? route.rest : undefined;

    // Paths without a language prefix ("/", "/legal-notice") go to the browser's language.
    useEffect(() => {
        if (rest === undefined) return;
        const base = import.meta.env.BASE_URL.replace(/\/$/, '');
        navigate(`${base}/${detectLanguage()}${rest ? `/${rest}` : ''}`, { replace: true });
    }, [rest]);

    useEffect(() => {
        if (language) document.documentElement.lang = language;
    }, [language]);

    if (route.language === undefined) return null;

    return (
        <LanguageContext value={route.language}>
            {/* Home, legal notice and privacy policy are not built yet. */}
            {route.page === 'notFound' ? <NotFound /> : <PageLayout />}
        </LanguageContext>
    );
}

import { useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { detectLanguage } from '@/i18n/detectLanguage';
import { LanguageContext } from '@/i18n/LanguageContext';
import { DEFAULT_LANGUAGE } from '@/i18n/languages';
import { NotFound } from '@/pages/NotFound/NotFound';
import { navigate, usePathname } from '@/router/navigation';
import { parsePath } from '@/router/routes';
import { usePageMeta } from '@/seo/usePageMeta';

export function App() {
    const route = parsePath(usePathname());
    const rest = route.language === undefined ? route.rest : undefined;

    // Paths without a language prefix ("/", "/legal-notice") go to the browser's language.
    useEffect(() => {
        if (rest === undefined) return;
        const base = import.meta.env.BASE_URL.replace(/\/$/, '');
        navigate(`${base}/${detectLanguage()}/${rest ? `${rest.replace(/\/$/, '')}/` : ''}`, { replace: true });
    }, [rest]);

    usePageMeta(route.language ?? DEFAULT_LANGUAGE, route.language === undefined ? 'home' : route.page);

    if (route.language === undefined) return null;

    return (
        <LanguageContext value={route.language}>
            {/* Home, legal notice and privacy policy are not built yet. */}
            {route.page === 'notFound' ? <NotFound /> : <PageLayout />}
        </LanguageContext>
    );
}
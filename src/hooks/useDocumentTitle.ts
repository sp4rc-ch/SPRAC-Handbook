import { useEffect } from 'react';
import { useTranslation } from '@/i18n/LanguageContext';

/** Sets the tab title as "<page> · <site name>". */
export function useDocumentTitle(pageTitle?: string) {
    const { siteName } = useTranslation();

    useEffect(() => {
        document.title = pageTitle ? `${pageTitle} · ${siteName}` : siteName;
    }, [pageTitle, siteName]);
}

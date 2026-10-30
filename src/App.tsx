import { useEffect } from 'react';
import { detectLanguage } from '@/i18n/languages';
import { navigate, usePathname } from '@/router/navigation';
import { parsePath } from '@/router/routes';

export function App() {
    const route = parsePath(usePathname());

    useEffect(() => {
        if (route.language === undefined) {
            const base = import.meta.env.BASE_URL.replace(/\/$/, '');
            navigate(`${base}/${detectLanguage()}${route.rest ? `/${route.rest}` : ''}`, { replace: true });
        }
    }, [route]);

    if (route.language === undefined) return null;

    return (
        <p>
            {route.language} / {route.page}
        </p>
    );
}

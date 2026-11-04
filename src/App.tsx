import { Cylg } from '@/pages/Cylg/Cylg';
import { Home } from '@/pages/Home/Home';
import { LegalNotice } from '@/pages/LegalNotice/LegalNotice';
import { NotFound } from '@/pages/NotFound/NotFound';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy/PrivacyPolicy';
import { Sparc } from '@/pages/Sparc/Sparc';
import { usePathname } from '@/router/navigation';
import { parsePath } from '@/router/routes';
import { usePageMeta } from '@/seo/usePageMeta';

export function App() {
    const page = parsePath(usePathname());

    usePageMeta(page);

    return (
        <>
            {page === 'home' && <Home />}
            {page === 'sparc' && <Sparc />}
            {page === 'cylg' && <Cylg />}
            {page === 'legalNotice' && <LegalNotice />}
            {page === 'privacyPolicy' && <PrivacyPolicy />}
            {page === 'notFound' && <NotFound />}
        </>
    );
}

import type { ReactNode } from 'react';
import { DisclaimerDialog } from '@/components/ui/DisclaimerDialog';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

/** The 404 design has no footer; every other page does. */
export function PageLayout({ children, footer = true }: { children?: ReactNode; footer?: boolean }) {
    return (
        <div className="flex min-h-dvh flex-col">
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            {footer && <Footer />}
            <DisclaimerDialog />
        </div>
    );
}

import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

export function PageLayout({ children }: { children?: ReactNode }) {
    return (
        <div className="flex min-h-dvh flex-col">
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
        </div>
    );
}
// app/layout.js
import './globals.css';
import { Providers } from './providers';
import { Playfair_Display, Inter } from 'next/font/google';
import Link from 'next/link';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata = {
  title: 'Know Dubai',
  description: 'Luxury travel & services',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

function Header() {
  const nav = [
    { label: 'Home', href: '/' },
    { label: 'Packages', href: '/packages' },
    { label: 'Work in Dubai', href: '/#work' },
    { label: 'Business Setup', href: '/#business' },
    { label: 'Investments', href: '/#invest' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/85 backdrop-blur shadow-[0_4px_24px_rgba(2,6,23,.08)]">
      <div className="container flex h-16 items-center justify-between gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-[var(--navy)]">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--gold)] text-white shadow-lg">
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="currentColor">
              <path d="M2 12c4-4 9-6 14-6h6l-4 4h-4c-3 0-6 1-8 3l-4 4 4-1c3-1 6-1 9 0l5 1-3 3c-5 0-10-2-15-6z"/>
            </svg>
          </span>
          <span className="text-xl font-bold tracking-wide">WINGS 2 Dubai</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex md:items-center md:gap-7" aria-label="Primary">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="relative text-[15px] text-slate-700 hover:text-[var(--navy)] after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:scale-x-0 hover:after:scale-x-100 after:bg-[var(--gold)] after:transition-transform"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Header CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact?source=header_cta"
            className="inline-flex items-center rounded-full bg-[var(--gold)] px-4 py-2 text-sm font-medium text-[var(--navy)] hover:brightness-95"
          >
            Send Inquiry
          </Link>
        </div>

        {/* Mobile drawer (CSS-only via checkbox + peer) */}
        <div className="md:hidden">
          {/* 1) Hidden checkbox controls open/close */}
          <input id="nav-toggle" type="checkbox" className="peer sr-only" />

          {/* 2) Trigger button (label toggles checkbox) */}
          <label
            htmlFor="nav-toggle"
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-slate-200"
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </label>

          {/* 3) Backdrop */}
          <label
            htmlFor="nav-toggle"
            className="fixed inset-0 z-[59] hidden bg-black/40 peer-checked:block"
            aria-hidden="true"
          />

          {/* 4) Panel */}
          <div className="fixed right-0 top-0 z-[60] h-full w-[80%] max-w-xs translate-x-full bg-white shadow-2xl transition-transform duration-300 peer-checked:translate-x-0">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="font-semibold text-[var(--navy)]">Menu</span>

              {/* Close button (label toggles checkbox off) */}
              <label
                htmlFor="nav-toggle"
                className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-slate-200"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </label>
            </div>

            <nav className="px-2 py-2">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="block rounded-md px-3 py-3 text-[var(--navy)]/90 hover:bg-slate-100"
                >
                  {n.label}
                </Link>
              ))}
              <div className="px-2">
                <Link
                  href="/contact?source=header_cta"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[var(--gold)] px-4 py-2 text-sm font-medium text-[var(--navy)]"
                >
                  Send Inquiry
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.className}>
      <body className={`${inter.className} text-slate-900`}>
        <Providers>
          <Header />
          {/* Spacer for fixed header */}
          <div className="h-16" />
          {children}
          <footer className="bg-white border-t border-slate-200">
            <div className="container py-8 flex items-center justify-between text-sm text-slate-600">
              <div>© {new Date().getFullYear()} Know Dubai</div>
              <div className="flex gap-6">
                <Link href="#">Terms</Link>
                <Link href="#">Privacy</Link>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}

import './globals.css';
import { Providers } from './providers';
import { Playfair_Display, Inter } from 'next/font/google';
const playfair = Playfair_Display({ subsets:['latin'], weight:['400','600','700']});
const inter = Inter({ subsets:['latin'], weight:['400','500','600']});

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-slate-900`}>
        <Providers>
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/70 backdrop-blur">
            <div className="container py-4 flex items-center justify-between">
              <a href="/" className="flex items-center gap-3">
                <img src="/logo-kd.svg" alt="Know Dubai monogram" className="h-8 w-8"/>
                <img src="/logo-know-dubai.svg" alt="Know Dubai" className="h-8"/>
              </a>
              <nav className="hidden md:flex items-center gap-8 text-sm">
                <a href="/#know-dubai" className="hover:text-[var(--navy)]">Know Dubai</a>
                <a href="/packages" className="hover:text-[var(--navy)]">Packages</a>
                <a href="/#work" className="hover:text-[var(--navy)]">Work in Dubai</a>
                <a href="/#business" className="hover:text-[var(--navy)]">Business Setup</a>
                <a href="/#invest" className="hover:text-[var(--navy)]">Investments</a>
                <a href="/contact?source=nav" className="btn btn-dark">Inquire</a>
              </nav>
            </div>
          </header>
          {children}
          <footer className="bg-white border-t border-slate-200">
            <div className="container py-8 flex items-center justify-between text-sm text-slate-600">
              <div>© {new Date().getFullYear()} Know Dubai</div>
              <div className="flex gap-6"><a href="#">Terms</a><a href="#">Privacy</a></div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}

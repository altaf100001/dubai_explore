'use client';
import { useSearchParams } from 'next/navigation';
export default function ThankYou(){
  const sp = useSearchParams();
  const source = sp.get('source') || 'direct';
  const pkg = sp.get('pkg') || '';
  return (
    <main className="container py-20">
      <h1 className="font-serif text-4xl text-[var(--navy)]">Thank you! 🎉</h1>
      <p className="mt-3 text-slate-600">We’ve received your inquiry and will contact you within 24 hours.</p>
      <div className="mt-6 text-sm text-slate-500">Ref: <b>{source}</b>{pkg ? ` • Package: ${pkg}` : ''}</div>
      <div className="mt-8 flex gap-3">
        <a href="/packages" className="btn btn-dark">Explore More Packages</a>
        <a href="/" className="btn">Back to Home</a>
      </div>
    </main>
  );
}

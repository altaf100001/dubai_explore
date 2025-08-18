'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@/components/ui/dialog';

export default function PackageDetail({ params }){
  const { slug } = params;
  const sp = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const DB = {
    'discover-dubai': { title:'Discover Dubai', price:'From $799' },
    'exotic-5d6n': { title:'Exotic Package (5D/6N)', price:'From $1,499' },
    'adventure': { title:'Adventure Package', price:'From $1,299' },
    'wedding': { title:'Destination Wedding Package', price:'Custom' },
    'events-business': { title:'Events & Business Visit', price:'From $1,899' },
    'food-shopping': { title:'Food Mania & Shopping', price:'From $999' },
  }
  const data = DB[slug] || { title:'Package', price:'Contact us' };
  const lead = () => { const source = sp.get('source') || 'detail'; router.push(`/contact?source=${source}&pkg=${slug}`); }

  return (
    <main className="container py-16">
      <h1 className="font-serif text-3xl text-[var(--navy)]">{data.title}</h1>
      <div className="mt-2 text-slate-600">{data.price}</div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="grid grid-cols-3 gap-3">
            <img src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1600&auto=format&fit=crop" alt="Dubai skyline" className="aspect-[16/10] w-full h-auto rounded-xl col-span-3 object-cover" loading="lazy"/>
            <img src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=600&auto=format&fit=crop" alt="Palm Jumeirah" className="aspect-square w-full h-auto rounded-xl object-cover" loading="lazy"/>
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop" alt="Desert dunes" className="aspect-square w-full h-auto rounded-xl object-cover" loading="lazy"/>
            <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop" alt="Dubai Marina" className="aspect-square w-full h-auto rounded-xl object-cover" loading="lazy"/>
          </div>
          <div className="mt-6 space-y-3 text-slate-700">
            <p>Highlights: Burj Khalifa, Desert Safari, Marina Cruise, Palm Jumeirah.</p>
            <p>Includes: Hotel, breakfast, airport transfers, guided tours.</p>
            <p>Excludes: Flights (optional add-on), personal expenses.</p>
          </div>
        </div>
        <aside className="shad-card p-6 h-max">
          <div className="text-[var(--navy)] font-medium">Ready to plan?</div>
          <div className="text-sm text-slate-600 mt-1">Get a custom quote in 24 hours.</div>
          <button onClick={lead} className="mt-4 w-full btn btn-gold">Get Quote</button>
          <button onClick={()=>setOpen(true)} className="mt-3 w-full btn border border-slate-300">Quick Enquiry</button>
          <a href="/packages" className="mt-3 w-full btn border border-slate-300 text-center">Back to Packages</a>
        </aside>
      </div>

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogHeader title="Quick Enquiry" subtitle="We’ll get back within 24 hours" />
        <DialogBody>
          <form action="/contact">
            <input type="hidden" name="source" value="detail_quick"/>
            <input type="hidden" name="pkg" value={slug}/>
            <div className="grid grid-cols-1 gap-3">
              <input name="name" className="shad-input" placeholder="Full Name" required/>
              <input name="email" className="shad-input" placeholder="Email" type="email" required/>
              <input name="phone" className="shad-input" placeholder="Phone"/>
              <button className="btn btn-gold">Continue</button>
            </div>
          </form>
        </DialogBody>
        <DialogFooter><button onClick={()=>setOpen(false)} className="btn border border-slate-300">Close</button></DialogFooter>
      </Dialog>
    </main>
  );
}

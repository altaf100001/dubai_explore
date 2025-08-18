'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLead } from '@/store';
import { GoldButton, GhostButton } from '@/components/ui/button';

const SLIDES = [
  { title: 'Discover Dubai', subtitle: "Perfect introduction to Dubai's icons & experiences.", img: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1600&auto=format&fit=crop', pkg: 'discover-dubai' },
  { title: 'Exotic Package (5D/6N)', subtitle: 'Immersive luxury + adventure. 5★ stays, yacht tour & more.', img: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1600&auto=format&fit=crop', pkg: 'exotic-5d6n' },
  { title: 'Adventure Package', subtitle: 'Skydiving, dune bashing, zip-lining — thrill ready.', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop', pkg: 'adventure' },
];

const CARDS = [
  { title: 'Discover Dubai', price: 'From $799', slug: 'discover-dubai' },
  { title: 'Exotic Package (5D/6N)', price: 'From $1,499', slug: 'exotic-5d6n' },
  { title: 'Adventure Package', price: 'From $1,299', slug: 'adventure' },
  { title: 'Destination Wedding Package', price: 'Custom', slug: 'wedding' },
  { title: 'Events & Business Visit', price: 'From $1,899', slug: 'events-business' },
  { title: 'Food Mania & Shopping', price: 'From $999', slug: 'food-shopping' },
];

export default function Home(){
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => { timerRef.current = setInterval(()=>setIndex(i=>(i+1)%SLIDES.length), 5000); return ()=>clearInterval(timerRef.current); }, []);

  const goTo = (i) => setIndex((i+SLIDES.length)%SLIDES.length);
  const goPackage = (slug) => router.push(`/packages/${slug}?source=hero`);
  const goLead = (source, pkg='') => { dispatch(setLead({ source, pkg })); router.push(`/contact?source=${source}&pkg=${pkg}`); }

  return (<main>
    <section className="relative">
      <div className="relative h-[72vh] overflow-hidden">
        {SLIDES.map((s, i) => (
          <div key={s.title} className={`absolute inset-0 transition-opacity duration-700 ${i===index?'opacity-100':'opacity-0'}`}>
            <img src={s.img} alt={s.title} className="h-full w-full object-cover"/>
            <div className="absolute inset-0 bg-black/30"/>
            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <div className="w-full md:w-2/3 lg:w-1/2">
                  <h1 className="font-serif text-4xl md:text-5xl text-white tracking-tight">{s.title}</h1>
                  <p className="mt-4 text-white/90 text-lg">{s.subtitle}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <GoldButton onClick={()=>goPackage(s.pkg)}>View Package</GoldButton>
                    <GhostButton onClick={()=>goLead('hero_cta', s.pkg)}>Get Quote</GhostButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={()=>goTo(index-1)} aria-label="Previous slide" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white">◀<span className="sr-only">Previous</span></button>
        <button onClick={()=>goTo(index+1)} aria-label="Next slide" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white">▶<span className="sr-only">Next</span></button>
        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2">
          {SLIDES.map((_, i) => (<button key={i} onClick={()=>goTo(i)} className={`h-2.5 w-2.5 rounded-full transition-all ${i===index?'bg-white w-6':'bg-white/60'}`} aria-label={`Go to slide ${i+1}`}/>))}
        </div>
      </div>
    </section>

    <div className="bg-[var(--navy)] text-white">
      <div className="container py-3 text-sm opacity-90">World's Safest City • Tax-Free Income • Luxury Lifestyle • Global Business Hub • World-Class Infrastructure</div>
    </div>

    <section id="know-dubai" className="container py-16">
      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 md:col-span-7">
          <h2 className="font-serif text-3xl text-[var(--navy)]">Know Dubai</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">Dubai has transformed from a desert outpost into one of the world's most vibrant and luxurious cities.</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Safest City","Culinary Paradise","Luxury Lifestyle","A Place to Call Home"].map(t=>(
              <div key={t} className="rounded-2xl border border-slate-200 p-5">
                <div className="font-medium text-[var(--navy)]">{t}</div>
                <p className="mt-2 text-sm text-slate-600">Explore how Dubai delivers on {t.toLowerCase()} with world-class amenities.</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-5"><div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100"/></div>
      </div>
    </section>

    <section id="packages" className="bg-slate-50">
      <div className="container py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl text-[var(--navy)]">Travel Packages</h2>
          <a href="/packages?source=home_viewall" className="text-sm text-[var(--navy)] underline underline-offset-4">View all</a>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map(p=>(
            <div key={p.slug} className="shad-card overflow-hidden">
              <div className="aspect-[16/10] w-full bg-slate-100"/>
              <div className="p-5">
                <div className="flex items-center justify-between"><h3 className="font-medium text-[var(--navy)]">{p.title}</h3><span className="text-sm text-slate-600">{p.price}</span></div>
                <p className="mt-2 text-sm text-slate-600">Curated highlights • Flexible itinerary • Premium support</p>
                <div className="mt-4 flex gap-3">
                  <a href={`/packages/${p.slug}?source=home_card`} className="text-sm text-[var(--navy)] underline underline-offset-4">View details →</a>
                  <button onClick={()=>goLead('home_card_cta', p.slug)} className="text-sm text-[var(--navy)] bg-[var(--gold)]/20 hover:bg-[var(--gold)]/30 px-3 py-1 rounded-full">Get Quote</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="work" className="container py-16">
      <h2 className="font-serif text-3xl text-[var(--navy)]">Work in Dubai</h2>
      <p className="mt-4 max-w-3xl text-slate-700">Exceptional career opportunities with tax-free income…</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Job Seeker Visa","Freelancer Visa","Job Opportunities"].map(t=>(
          <div key={t} className="shad-card p-6">
            <div className="font-medium text-[var(--navy)]">{t}</div>
            <p className="mt-2 text-sm text-slate-600">End-to-end assistance and tailored guidance.</p>
            <a href={`/contact?source=work_box_cta&pkg=${encodeURIComponent(t)}`} className="mt-4 inline-block text-sm text-[var(--navy)] underline underline-offset-4">Ask About {t} →</a>
          </div>
        ))}
      </div>
    </section>

    <section id="business" className="bg-slate-50">
      <div className="container py-16">
        <h2 className="font-serif text-3xl text-[var(--navy)]">Business Setup, Advisory & Consulting</h2>
        <p className="mt-4 max-w-3xl text-slate-700">Comprehensive solutions to establish and grow your business…</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Business Licensing","Residence Visa","PRO Services","Banking & Accounting"].map(t=>(
            <div key={t} className="shad-card p-6">
              <div className="font-medium text-[var(--navy)]">{t}</div>
              <p className="mt-2 text-sm text-slate-600">Streamlined processes, expert guidance.</p>
              <a href={`/contact?source=business_box_cta&pkg=${encodeURIComponent(t)}`} className="mt-4 inline-block text-sm text-[var(--navy)] underline underline-offset-4">Get Assistance →</a>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="invest" className="container py-16">
      <h2 className="font-serif text-3xl text-[var(--navy)]">Investments in Dubai</h2>
      <p className="mt-4 max-w-3xl text-slate-700">Explore real estate, business acquisition, and more…</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="shad-card p-6">
          <div className="font-medium text-[var(--navy)]">Real Estate Projects</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1">
            <li>Luxury Apartments • Commercial • Off-Plan • Vacation Homes</li>
            <li>Attractive returns with strong regulatory safeguards</li>
          </ul>
          <a href="/contact?source=invest_box_cta&pkg=real-estate" className="mt-4 inline-block text-sm text-[var(--navy)] underline underline-offset-4">Request Properties →</a>
        </div>
        <div className="shad-card p-6">
          <div className="font-medium text-[var(--navy)]">Golden Visa Program</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1">
            <li>10-year residency • Family inclusion • No sponsor</li>
          </ul>
          <a href="/contact?source=invest_box_cta&pkg=golden-visa" className="mt-4 inline-block text-sm text-[var(--navy)] underline underline-offset-4">Check Eligibility →</a>
        </div>
      </div>
    </section>

    <section className="bg-[var(--navy)] text-white">
      <div className="container py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-serif text-2xl">Ready to plan your Dubai journey?</div>
        <GoldButton onClick={()=>goLead('cta_bar','')}>Get a Free Quote</GoldButton>
      </div>
    </section>
  </main>);
}

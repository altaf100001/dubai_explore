'use client';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setLead } from '@/store';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import FallbackImage from '@/components/fallback-image';
import Link from 'next/link';

/* ===================== Icons ===================== */
const IconChevronLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" d="M15 6l-6 6 6 6" />
  </svg>
);
const IconChevronRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" d="M9 6l6 6-6 6" />
  </svg>
);

/* ===================== Data ===================== */
const SLIDES = [
  {
    title: 'Luxury Dubai Experiences',
    subtitle: 'Discover the epitome of luxury with our curated Dubai packages.',
    img: 'https://images.unsplash.com/photo-1546412414-8035e1776c9a?q=80&w=870&auto=format&fit=crop',
    pkg: 'discover-dubai',
  },
  {
    title: 'Exotic Package (5D/6N)',
    subtitle: 'Immersive luxury + adventure. 5★ stays, yacht tour & more.',
    img: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1600&auto=format&fit=crop',
    pkg: 'exotic-5d6n',
  },
  {
    title: 'Adventure Package',
    subtitle: 'Skydiving, dune bashing, zip-lining — thrill ready.',
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop',
    pkg: 'adventure',
  },
];

const CARDS = [
  { title: 'Discover Dubai', price: 'From $799', slug: 'discover-dubai', img: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=1600&auto=format&fit=crop' },
  { title: 'Exotic Package (5D/6N)', price: 'From $1,499', slug: 'exotic-5d6n', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop' },
  { title: 'Adventure Package', price: 'From $1,299', slug: 'adventure', img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop' },
  { title: 'Destination Wedding Package', price: 'Custom', slug: 'wedding', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop' },
  { title: 'Events & Business Visit', price: 'From $1,899', slug: 'events-business', img: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1600&auto=format&fit=crop' },
  { title: 'Food Mania & Shopping', price: 'From $999', slug: 'food-shopping', img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop' },
];

/* ===================== Hero Slider ===================== */
function HeroSlider({ slides = SLIDES }) {
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const timerRef = useRef(null);
  const startX = useRef(null);
  const length = slides.length;

  const goTo = useCallback((i) => setIndex(((i % length) + length) % length), [length]);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isHover || isPointerDown) return;
    if (typeof document !== 'undefined' && document.hidden) return;
    clearTimer();
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, 6000);
    return () => clearTimer();
  }, [index, length, isHover, isPointerDown, prefersReducedMotion, clearTimer]);

  const onPointerDown = (e) => {
    e.target.setPointerCapture?.(e.pointerId);
    startX.current = e.clientX;
    setIsPointerDown(true);
  };
  const onPointerUp = (e) => {
    if (startX.current == null) {
      setIsPointerDown(false);
      return;
    }
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
    startX.current = null;
    setIsPointerDown(false);
  };

  return (
    <section className="relative">
      <div
        className="relative h-[78vh] min-h-[520px] overflow-hidden"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {slides.map((s, i) => (
          <div key={s.title} className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}>
            <img src={s.img} alt={s.title} className="h-full w-full object-cover" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/50" />
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto w-full max-w-4xl text-center">
                <h1 className="font-serif text-4xl md:text-6xl text-white drop-shadow">{s.title}</h1>
                <p className="mx-auto mt-4 max-w-2xl text-white/90 md:text-lg">{s.subtitle}</p>
                <div className="mt-7 flex items-center justify-center gap-3">
                  <Button asChild className="rounded-full bg-[var(--gold)] text-[var(--navy)] hover:brightness-95">
                    <Link href={`/packages/${s.pkg}?source=hero`}>Explore Packages</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-white/70 bg-white/10 text-white hover:bg-white/20">
                    <Link href={`/contact?source=hero_cta&pkg=${s.pkg}`}>Send Inquiry</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        ))}

        <Button size="icon" onClick={prev} aria-label="Previous slide" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-md">
          <IconChevronLeft className="h-5 w-5" />
        </Button>
        <Button size="icon" onClick={next} aria-label="Next slide" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-md">
          <IconChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}

/* ===================== Page ===================== */
export default function Home() {
  const dispatch = useDispatch();
  const goLead = (source, pkg = '') => {
    dispatch(setLead({ source, pkg }));
  };

  return (
    <main>
      <HeroSlider />

      {/* KNOW DUBAI */}
      <section id="know-dubai" className="container py-16">
        <div className="grid grid-cols-12 gap-8 items-center">
          <motion.div className="col-span-12 md:col-span-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--navy)]">Know Dubai</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Dubai is where futuristic skylines meet warm Arabian hospitality. By day, marvel at soaring
              landmarks and pristine beaches; by night, dine on rooftop terraces, cruise the Marina, and
              wander vibrant souks and designer districts.
            </p>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Whether you’re planning a luxury holiday, a business venture, or a long-stay experience,
              Dubai blends comfort, safety, and spectacle in a way few cities can.
            </p>
            <ul className="mt-5 space-y-2 text-slate-700">
              <li>• <b>Safest global hub</b> with world-class infrastructure</li>
              <li>• <b>Luxury lifestyle</b>: 5★ resorts, fine dining, private yachts</li>
              <li>• <b>Iconic attractions</b>: Burj Khalifa, Desert Safari, Palm Jumeirah</li>
              <li>• <b>Tax-free income</b> and thriving business ecosystem</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <Button asChild className="rounded-full bg-[var(--gold)] text-[var(--navy)] hover:brightness-95">
                <Link href="/packages?source=know_cta">Explore Packages</Link>
              </Button>
              <Button asChild variant="secondary" className="rounded-full">
                <Link href="/contact?source=know_cta">Plan My Trip</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div className="col-span-12 md:col-span-6">
            <FallbackImage
              src="https://images.unsplash.com/photo-1668030727305-7446cb674733?q=80&w=736&auto=format&fit=crop"
              fallback="/images/know-side.png"
              alt="Dubai skyline & lifestyle"
              className="w-[70%] h-auto rounded-2xl object-cover shadow-[0_20px_60px_rgba(2,6,23,.15)]"
            />
          </motion.div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="bg-slate-50">
        <div className="container py-16">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-3xl text-[var(--navy)]">Travel Packages</h2>
            <Link href="/packages?source=home_viewall" className="text-sm text-[var(--navy)] underline underline-offset-4">
              View all
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {CARDS.map((p) => (
              <motion.div key={p.slug} className="shad-card overflow-hidden">
                <FallbackImage src={p.img} fallback={`/images/${p.slug}.png`} alt={p.title} className="aspect-[16/10] w-full h-auto object-cover" />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-[var(--navy)]">{p.title}</h3>
                    <span className="text-sm text-slate-600">{p.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">Curated highlights • Flexible itinerary • Premium support</p>
                  <div className="mt-4 flex gap-3">
                    <Link href={`/packages/${p.slug}?source=home_card`} className="text-sm text-[var(--navy)] underline underline-offset-4">
                      View details →
                    </Link>
                    <Link href={`/contact?source=home_card_cta&pkg=${p.slug}`} className="text-sm text-[var(--navy)] bg-[var(--gold)]/20 hover:bg-[var(--gold)]/30 px-3 py-1 rounded-full">
                      Get Quote
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="container py-16">
        <h2 className="font-serif text-3xl text-[var(--navy)]">Work in Dubai</h2>
        <p className="mt-4 max-w-3xl text-slate-700">Exceptional career opportunities with tax-free income…</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Job Seeker Visa', 'Freelancer Visa', 'Job Opportunities'].map((t) => (
            <div key={t} className="shad-card p-6">
              <div className="font-medium text-[var(--navy)]">{t}</div>
              <p className="mt-2 text-sm text-slate-600">End-to-end assistance and tailored guidance.</p>
              <Link href={`/contact?source=work_box_cta&pkg=${encodeURIComponent(t)}`} className="mt-4 inline-block text-sm text-[var(--navy)] underline underline-offset-4">
                Ask About {t} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* BUSINESS */}
      <section id="business" className="bg-slate-50">
        <div className="container py-16">
          <h2 className="font-serif text-3xl text-[var(--navy)]">Business Setup, Advisory & Consulting</h2>
          <p className="mt-4 max-w-3xl text-slate-700">Comprehensive solutions to establish and grow your business…</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Business Licensing', 'Residence Visa', 'PRO Services', 'Banking & Accounting'].map((t) => (
              <div key={t} className="shad-card p-6">
                <div className="font-medium text-[var(--navy)]">{t}</div>
                <p className="mt-2 text-sm text-slate-600">Streamlined processes, expert guidance.</p>
                <Link href={`/contact?source=business_box_cta&pkg=${encodeURIComponent(t)}`} className="mt-4 inline-block text-sm text-[var(--navy)] underline underline-offset-4">
                  Get Assistance →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVEST */}
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
            <Link href="/contact?source=invest_box_cta&pkg=real-estate" className="mt-4 inline-block text-sm text-[var(--navy)] underline underline-offset-4">
              Request Properties →
            </Link>
          </div>
          <div className="shad-card p-6">
            <div className="font-medium text-[var(--navy)]">Golden Visa Program</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1">
              <li>10-year residency • Family inclusion • No sponsor</li>
            </ul>
            <Link href="/contact?source=invest_box_cta&pkg=golden-visa" className="mt-4 inline-block text-sm text-[var(--navy)] underline underline-offset-4">
              Check Eligibility →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BAR */}
      <section className="bg-[var(--navy)] text-white">
        <div className="container py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl">Ready to experience Dubai?</h3>
            <p className="mt-2 text-white/80">Let’s curate your perfect trip, business plan, or investment journey.</p>
          </div>
          <Button asChild size="lg" className="rounded-full bg-[var(--gold)] text-[var(--navy)] hover:brightness-95">
            <Link href="/contact?source=cta_bar">Get Started</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

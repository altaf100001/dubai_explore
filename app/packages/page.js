export const metadata = { title: 'Packages - Know Dubai' };
const LIST = [
  { title:'Discover Dubai', slug:'discover-dubai', price:'From $799', img:'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=1600&auto=format&fit=crop' },
  { title:'Exotic Package (5D/6N)', slug:'exotic-5d6n', price:'From $1,499', img:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop' },
  { title:'Adventure Package', slug:'adventure', price:'From $1,299', img:'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop' },
  { title:'Destination Wedding Package', slug:'wedding', price:'Custom', img:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop' },
  { title:'Events & Business Visit', slug:'events-business', price:'From $1,899', img:'https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1600&auto=format&fit=crop' },
  { title:'Food Mania & Shopping', slug:'food-shopping', price:'From $999', img:'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop' },
];
export default function Packages(){
  return (<main className="container py-16">
    <h1 className="font-serif text-3xl text-[var(--navy)]">All Packages</h1>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {LIST.map(p => (
        <a key={p.slug} href={`/packages/${p.slug}?source=list_card`} className="shad-card overflow-hidden">
          <img src={p.img} onError={(e)=>{ e.currentTarget.src = `/images/${p.slug.replace(/[^a-z-]/g,"")||"pkg"}.png`; }} alt={p.title} className="aspect-[16/10] w-full h-auto object-cover"/>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-[var(--navy)]">{p.title}</h3>
              <span className="text-sm text-slate-600">{p.price}</span>
            </div>
            <div className="mt-4 text-sm text-[var(--navy)] underline underline-offset-4">View details →</div>
          </div>
        </a>
      ))}
    </div>
  </main>);
}

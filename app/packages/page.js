export const metadata = { title: 'Packages - Know Dubai' };
const LIST = [
  { title:'Discover Dubai', slug:'discover-dubai', price:'From $799' },
  { title:'Exotic Package (5D/6N)', slug:'exotic-5d6n', price:'From $1,499' },
  { title:'Adventure Package', slug:'adventure', price:'From $1,299' },
  { title:'Destination Wedding Package', slug:'wedding', price:'Custom' },
  { title:'Events & Business Visit', slug:'events-business', price:'From $1,899' },
  { title:'Food Mania & Shopping', slug:'food-shopping', price:'From $999' },
];
export default function Packages(){
  return (<main className="container py-16">
    <h1 className="font-serif text-3xl text-[var(--navy)]">All Packages</h1>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {LIST.map(p => (
        <a key={p.slug} href={`/packages/${p.slug}?source=list_card`} className="shad-card">
          <div className="aspect-[16/10] w-full bg-slate-100"/>
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

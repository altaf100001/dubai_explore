export async function POST(request){
  const data = await request.json();
  const FORMSPREE_ID = process.env.FORMSPREE_ID;
  try{
    if(FORMSPREE_ID){
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:'POST', headers:{ 'Content-Type':'application/json', 'Accept':'application/json' }, body: JSON.stringify(data)
      });
      if(!res.ok) throw new Error('Formspree error');
    }
    return new Response(JSON.stringify({ ok:true }), { status:200, headers:{'Content-Type':'application/json'} });
  }catch(e){
    return new Response(JSON.stringify({ ok:false, error:e.message }), { status:500, headers:{'Content-Type':'application/json'} });
  }
}

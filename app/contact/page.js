'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';

export default function Contact(){
  const sp = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({ name:'', email:'', phone:'', dates:'', interest:'', message:'', source:'', pkg:'' });

  useEffect(() => { setForm(f => ({...f, source: sp.get('source')||'', pkg: sp.get('pkg')||''})); }, [sp]);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e){
    e.preventDefault(); setStatus('Submitting…');
    try{
      const res = await fetch('/api/lead', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      if(!res.ok) throw new Error('bad');
      const qs = new URLSearchParams({ source: form.source||'', pkg: form.pkg||'' }).toString();
      router.push(`/thank-you?${qs}`);
    }catch{ setStatus('Failed to submit. Please try again.'); }
  }

  return (
    <main className="bg-[var(--navy)] text-white">
      <div className="container py-16">
        <h1 className="font-serif text-3xl">Send an Inquiry</h1>
        <p className="mt-2 opacity-80">We’ll get back within 24 hours with tailored options.</p>
        <form onSubmit={onSubmit} className="mt-8 grid grid-cols-12 gap-4">
          <Input name="name" value={form.name} onChange={onChange} placeholder="Full Name" className="col-span-12 md:col-span-4" required/>
          <Input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email" className="col-span-12 md:col-span-4" required/>
          <Input name="phone" value={form.phone} onChange={onChange} placeholder="Phone" className="col-span-12 md:col-span-4"/>
          <Input name="dates" value={form.dates} onChange={onChange} placeholder="Travel Dates" className="col-span-12 md:col-span-6"/>
          <Input name="interest" value={form.interest} onChange={onChange} placeholder="Interest (Packages / Work / Business / Invest)" className="col-span-12 md:col-span-6"/>
          <Textarea name="message" value={form.message} onChange={onChange} placeholder="Your message" className="col-span-12"/>
          <input type="hidden" name="source" value={form.source} readOnly/>
          <input type="hidden" name="pkg" value={form.pkg} readOnly/>
          <div className="col-span-12">
            <button type="submit" className="btn btn-gold">Send Inquiry</button>
            <span className="ml-3 text-sm opacity-90">{status}</span>
          </div>
        </form>
      </div>
    </main>
  );
}

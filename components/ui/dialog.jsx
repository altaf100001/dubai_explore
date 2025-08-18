'use client';
import { useEffect } from 'react';
export function Dialog({ open, onClose, children }){
  useEffect(() => { function esc(e){ if(e.key==='Escape') onClose?.() } if(open) document.addEventListener('keydown', esc); return () => document.removeEventListener('keydown', esc); }, [open, onClose]);
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">{children}</div>
      </div>
    </div>
  );
}
export function DialogHeader({ title, subtitle }){
  return (<div className="px-6 pt-5 pb-2 border-b border-slate-200"><div className="text-lg font-medium">{title}</div>{subtitle?<div className="text-sm text-slate-500 mt-1">{subtitle}</div>:null}</div>);
}
export function DialogBody({ children }){ return <div className="px-6 py-4">{children}</div> }
export function DialogFooter({ children }){ return <div className="px-6 pb-5 flex items-center justify-end gap-2">{children}</div> }

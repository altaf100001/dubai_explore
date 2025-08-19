import { Suspense } from 'react';
import ContactForm from './contact-form';

export default function ContactPage(){
  return (
    <Suspense fallback={<div className="container py-16">Loading...</div>}>
      <ContactForm />
    </Suspense>
  );
}

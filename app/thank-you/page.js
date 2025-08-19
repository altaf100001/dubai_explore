import { Suspense } from 'react';
import ThankYouContent from './content';

export default function ThankYouPage(){
  return (
    <Suspense fallback={<div className="container py-20">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}

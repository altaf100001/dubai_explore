'use client';
import { useState } from 'react';
export default function FallbackImage({ src, fallback, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <img
      src={imgSrc}
      onError={() => setImgSrc(fallback)}
      {...props}
    />
  );
}

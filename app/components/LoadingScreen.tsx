'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="loading-screen" className={hidden ? 'hidden' : ''}>
      <div className="loading-petal">
        <span></span><span></span><span></span>
      </div>
      <p className="loading-text">Memuat Undangan…</p>
    </div>
  );
}

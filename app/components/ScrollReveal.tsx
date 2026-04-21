'use client';

import { useEffect, useRef } from 'react';

export default function ScrollReveal() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    // Observe all existing reveal elements
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Re-observe dynamically added elements
    const interval = setInterval(() => {
      document.querySelectorAll('.reveal:not(.revealed)').forEach(el => observer.observe(el));
    }, 1000);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return null;
}

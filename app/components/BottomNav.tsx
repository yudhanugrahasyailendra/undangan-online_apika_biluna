'use client';

import { useState, useEffect, useCallback } from 'react';

const sections = ['home', 'acara', 'galeri', 'video', 'rsvp', 'gift'];
const navItems = [
  { icon: 'fa-solid fa-house-heart', label: 'Home' },
  { icon: 'fa-regular fa-calendar-days', label: 'Acara' },
  { icon: 'fa-regular fa-images', label: 'Galeri' },
  { icon: 'fa-regular fa-circle-play', label: 'Video' },
  // { icon: 'fa-regular fa-envelope-open', label: 'RSVP' },
  // { icon: 'fa-solid fa-gift', label: 'Gift' },
];

export default function BottomNav({ visible }: { visible: boolean }) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let current = 'home';
      sections.forEach(id => {
        const sec = document.getElementById(id);
        if (sec && sec.offsetTop - 120 <= scrollY) current = id;
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <nav id="bottom-nav" className={visible ? 'visible' : ''}>
      {navItems.map((item, i) => (
        <a
          key={sections[i]}
          className={`nav-item ${activeSection === sections[i] ? 'active' : ''}`}
          onClick={() => scrollToSection(sections[i])}
        >
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

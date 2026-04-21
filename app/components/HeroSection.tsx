'use client';

import { useState, useEffect, useCallback } from 'react';
import { invitationData } from '../data/invitation-data';
import { useToast } from './ToastProvider';

export default function HeroSection() {
  const { showToast } = useToast();
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });

  // Countdown timer
  useEffect(() => {
    const target = new Date(invitationData.eventDate).getTime();

    function update() {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setCountdown({ days: '00', hours: '00', mins: '00', secs: '00' });
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        mins: String(mins).padStart(2, '0'),
        secs: String(secs).padStart(2, '0'),
      });
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const shareInvitation = useCallback(() => {
    const url = window.location.href;
    const title = `Undangan Sukuran Kelahiran ${invitationData.babyName}`;
    const text = `Kami mengundang Anda untuk hadir dalam acara sukuran kelahiran putri kami, ${invitationData.babyName}. Silakan buka undangan kami.`;

    if (navigator.share) {
      navigator.share({ title, text, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        showToast('🔗 Link undangan berhasil disalin!', 'fa-link');
      }).catch(() => {
        showToast('Salin link: ' + url, 'fa-link');
      });
    }
  }, [showToast]);

  const saveToCalendar = useCallback(() => {
    const d = invitationData;
    function toICS(dateStr: string) {
      return dateStr.replace(/[-:]/g, '').split('.')[0];
    }

    const content = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//APIKA BILUNA//ID',
      'BEGIN:VEVENT',
      `DTSTART:${toICS(d.eventDate)}`,
      `DTEND:${toICS(d.eventEndDate)}`,
      `SUMMARY:Sukuran Kelahiran ${d.babyName}`,
      `DESCRIPTION:${d.openingMessage}`,
      `LOCATION:${d.locationName}, ${d.address}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `undangan-${d.babyName.replace(/\s+/g, '-').toLowerCase()}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📅 File kalender berhasil diunduh!', 'fa-calendar-check');
  }, [showToast]);

  return (
    <section id="home">
      <div className="hero-bg-decor">
        <div className="hero-blob" style={{ width: 280, height: 280, background: '#f9c8d8', top: -80, right: -60 }}></div>
        <div className="hero-blob" style={{ width: 220, height: 220, background: '#f0e4c8', bottom: -60, left: -40 }}></div>
      </div>

      <div className="reveal">
        <p className="hero-top-label">✦ Dengan Penuh Syukur ✦</p>
      </div>

      <div className="reveal reveal-delay-1" style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
        <div className="hero-baby-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={invitationData.heroImage} alt="APIKA BILUNA" loading="lazy" />
        </div>
        <div className="hero-badge">
          <i className="fa-solid fa-star" style={{ color: 'var(--champagne)' }}></i>
          <span>Putri Kami</span>
        </div>
      </div>

      <div className="reveal reveal-delay-2">
        <h1 className="hero-name">
          Apika
          <span>Biluna</span>
        </h1>
        <p className="hero-script-sub">Welcome to the world, little one 🌸</p>
        <p className="hero-quote">{invitationData.openingMessage}</p>
      </div>

      <div className="reveal reveal-delay-2">
        <div className="hero-date-pill">
          <i className="fa-regular fa-calendar-heart"></i>
          <span>{invitationData.eventDisplayDate}</span>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="countdown-wrap reveal reveal-delay-3">
        <div className="countdown-box">
          <span className="countdown-num">{countdown.days}</span>
          <span className="countdown-label">Hari</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-num">{countdown.hours}</span>
          <span className="countdown-label">Jam</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-num">{countdown.mins}</span>
          <span className="countdown-label">Menit</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-num">{countdown.secs}</span>
          <span className="countdown-label">Detik</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="hero-cta-group reveal reveal-delay-4">
        <button className="btn-primary" onClick={() => scrollToSection('acara')}>
          <i className="fa-solid fa-location-dot"></i> Lihat Acara
        </button>
        <button className="btn-secondary" onClick={shareInvitation}>
          <i className="fa-solid fa-share-nodes"></i> Bagikan
        </button>
        <button className="btn-ghost" onClick={saveToCalendar}>
          <i className="fa-regular fa-calendar-plus"></i> Kalender
        </button>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { invitationData } from '../data/invitation-data';

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const win = window as unknown as Record<string, unknown>;
        const pauseMusic = win.__pauseMusic;
        if (typeof pauseMusic === 'function') {
          (pauseMusic as () => void)();
        }

        video.play().catch(() => {});
      },
      { threshold: 0.55 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="video" ref={sectionRef}>
      <div className="section-tag reveal">❈ Video ❈</div>
      <h2 className="section-title reveal">
        Momen<br /><em style={{ fontStyle: 'italic', color: 'var(--mauve)' }}>Bahagia Kami</em>
      </h2>
      <div className="section-divider reveal"></div>

      <div className="video-wrap reveal reveal-delay-1">
        <video ref={videoRef} controls muted playsInline preload="metadata">
          <source src={invitationData.videoSrc} type="video/mp4" />
          Browser Anda tidak mendukung video.
        </video>
      </div>
      <p className="video-caption reveal reveal-delay-2">
        &quot;Hari dimana penantian panjang kami berakhir Manis. Allah Maha Besar.&quot;
      </p>
    </section>
  );
}

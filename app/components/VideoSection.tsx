'use client';

import { invitationData } from '../data/invitation-data';

export default function VideoSection() {
  return (
    <section id="video">
      <div className="section-tag reveal">❈ Video ❈</div>
      <h2 className="section-title reveal">
        Momen<br /><em style={{ fontStyle: 'italic', color: 'var(--mauve)' }}>Bahagia Kami</em>
      </h2>
      <div className="section-divider reveal"></div>

      <div className="video-wrap reveal reveal-delay-1">
        <video controls muted playsInline preload="metadata">
          <source src={invitationData.videoSrc} type="video/mp4" />
          Browser Anda tidak mendukung video.
        </video>
      </div>
      <p className="video-caption reveal reveal-delay-2">
        &quot;Setiap tangisan pertamamu adalah musik terindah di telinga kami.&quot;
      </p>
    </section>
  );
}

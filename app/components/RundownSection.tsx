'use client';

import { rundownItems } from '../data/invitation-data';

export default function RundownSection() {
  return (
    <section id="rundown">
      <div className="section-tag reveal">❈ Rangkaian Acara ❈</div>
      <h2 className="section-title reveal">
        Rundown<br /><em style={{ fontStyle: 'italic', color: 'var(--mauve)' }}>Acara</em>
      </h2>
      <div className="section-divider reveal"></div>

      <div className="timeline reveal reveal-delay-1">
        {rundownItems.map((item, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot">{item.emoji}</div>
            <div className="timeline-content">
              <p className="timeline-time">{item.time}</p>
              <p className="timeline-title">{item.title}</p>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

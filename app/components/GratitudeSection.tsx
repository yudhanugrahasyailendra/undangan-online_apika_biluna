'use client';

import { invitationData } from '../data/invitation-data';

export default function GratitudeSection() {
  const parentsText = `${invitationData.fatherName} & ${invitationData.motherName}`;

  return (
    <section id="syukur">
      <div className="section-tag reveal">❈ Rasa Syukur ❈</div>
      <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
        Pesan dari<br /><em style={{ fontStyle: 'italic', color: 'var(--mauve)' }}>Keluarga</em>
      </h2>
      <div className="section-divider reveal"></div>
      <div className="ornament-sep reveal">
        <div className="ornament-sep-line"></div>
        <span className="ornament-sep-icon">✿</span>
        <div className="ornament-sep-line"></div>
      </div>

      <div className="quote-card reveal reveal-delay-1">
        <p className="quote-text">{invitationData.gratitudeQuote}</p>
        <p className="quote-source">— Untaian Syukur —</p>
      </div>

      <div className="family-message-card reveal reveal-delay-2">
        <p className="family-msg-title">Dengan Segenap Cinta</p>
        <p className="family-msg-text">{invitationData.familyMessage}</p>
        <p className="family-signature">~~ {parentsText} ~~</p>
      </div>
    </section>
  );
}

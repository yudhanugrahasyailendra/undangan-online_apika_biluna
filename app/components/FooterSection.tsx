'use client';

import { invitationData } from '../data/invitation-data';

export default function FooterSection() {
  const parentsText = `${invitationData.fatherName} & ${invitationData.motherName}`;

  return (
    <section id="penutup">
      <div className="footer-blob" style={{ width: 250, height: 250, background: 'var(--rose)', top: -60, right: -60 }}></div>
      <div className="footer-blob" style={{ width: 180, height: 180, background: 'var(--sand)', bottom: 20, left: -40 }}></div>

      <div className="ornament-sep reveal" style={{ marginBottom: 28 }}>
        <div className="ornament-sep-line"></div>
        <span className="ornament-sep-icon">✿</span>
        <div className="ornament-sep-line"></div>
      </div>

      <p className="footer-main-name reveal">Apika Biluna</p>
      <p className="hero-script-sub reveal" style={{ color: 'var(--champagne)', marginBottom: 16 }}>
        Our little miracle 🌷
      </p>
      <p className="footer-thanks reveal reveal-delay-1">
        Terima kasih telah menjadi bagian dari momen terindah dalam hidup kami. Kehadiran dan doa Anda adalah anugerah yang kami syukuri.
      </p>
      <div className="footer-heart reveal reveal-delay-2">♥</div>
      <p className="footer-parents reveal reveal-delay-3">
        Dengan cinta, <br />
        <em>{parentsText}</em>
      </p>
      <p className="footer-copy reveal reveal-delay-4">
        &copy; 2026 · Undangan Digital · APIKA BILUNA
      </p>
    </section>
  );
}

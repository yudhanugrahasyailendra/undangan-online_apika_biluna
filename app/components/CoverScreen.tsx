'use client';

import { useState, useEffect } from 'react';
import { invitationData } from '../data/invitation-data';

interface CoverScreenProps {
  onOpen: () => void;
}

export default function CoverScreen({ onOpen }: CoverScreenProps) {
  const [hidden, setHidden] = useState(false);
  const [recipient, setRecipient] = useState('Bapak/Ibu/Saudara/i');

  const parentsText = `${invitationData.fatherName} & ${invitationData.motherName}`;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
      setRecipient(decodeURIComponent(guestName));
    }
  }, []);

  const handleOpen = () => {
    setHidden(true);
    document.body.classList.remove('cover-open');
    onOpen();
  };

  return (
    <div id="cover-screen" className={hidden ? 'hidden' : ''}>
      {/* Background decorations */}
      <div className="cover-bg">
        <div className="cover-blob cover-blob-1"></div>
        <div className="cover-blob cover-blob-2"></div>
        <div className="cover-blob cover-blob-3"></div>
        <div className="cover-floats">
          <div className="float-dot" style={{ width: 12, height: 12, top: '20%', left: '15%', animationDelay: '0s' }}></div>
          <div className="float-dot" style={{ width: 6, height: 6, top: '30%', right: '20%', animationDelay: '1s', background: 'var(--champagne)' }}></div>
          <div className="float-dot" style={{ width: 10, height: 10, bottom: '25%', right: '15%', animationDelay: '2s' }}></div>
          <div className="float-dot" style={{ width: 8, height: 8, bottom: '35%', left: '10%', animationDelay: '0.5s', background: 'var(--sand)' }}></div>
        </div>
        <div className="cover-ornament" style={{ top: '10%', left: '8%', fontSize: 20 }}>✿</div>
        <div className="cover-ornament" style={{ top: '15%', right: '10%', fontSize: 16, animationDuration: '15s' }}>✾</div>
        <div className="cover-ornament" style={{ bottom: '20%', left: '12%', fontSize: 14, animationDuration: '25s' }}>❋</div>
        <div className="cover-ornament" style={{ bottom: '15%', right: '8%', fontSize: 18, animationDuration: '18s' }}>✿</div>
      </div>

      {/* Cover Content */}
      <div className="cover-content">
        <p className="cover-label">✦ Undangan Sukuran Kelahiran ✦</p>

        <div className="cover-hero-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={invitationData.coverImage} alt="Bayi" />
        </div>

        <div className="cover-divider">
          <div className="cover-divider-line"></div>
          <i className="fa-solid fa-heart cover-divider-icon"></i>
          <div className="cover-divider-line"></div>
        </div>

        <h1 className="cover-baby-name">
          <em>Apika</em>
          {' '}Biluna
        </h1>

        <p className="cover-script">Putri Tercinta Kami</p>
        <p className="cover-parent-info">Buah cinta dari</p>
        <p className="cover-parent-name">{parentsText}</p>

        <p className="cover-to-label">Kepada Yth.</p>
        <p className="cover-recipient">{recipient}</p>

        <button className="cover-open-btn" onClick={handleOpen}>
          <i className="fa-solid fa-envelope-open-text"></i>
          Buka Undangan
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState, useCallback, useEffect } from 'react';
import { useToast } from './ToastProvider';

export default function RSVPSection() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [status, setStatus] = useState('hadir');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
      setName(decodeURIComponent(guestName));
    }
  }, []);

  const changeCount = useCallback((delta: number) => {
    setGuestCount(prev => Math.max(1, Math.min(10, prev + delta)));
  }, []);

  const submitRSVP = useCallback(() => {
    if (!name.trim()) {
      showToast('⚠️ Mohon isi nama Anda terlebih dahulu', 'fa-triangle-exclamation');
      return;
    }

    // Also add to guestbook if has message
    if (message.trim()) {
      const entry = { name: name.trim(), message: message.trim(), time: new Date().toISOString() };
      const stored = JSON.parse(localStorage.getItem('inv_guestbook') || '[]');
      stored.unshift(entry);
      localStorage.setItem('inv_guestbook', JSON.stringify(stored));
      // Dispatch custom event for guestbook to update
      window.dispatchEvent(new Event('guestbook-updated'));
    }

    const statusText = status === 'hadir' ? 'hadir' : 'berhalangan';
    showToast(`🌸 Terima kasih, ${name.trim()}! Konfirmasi Anda (${statusText}) telah diterima.`, 'fa-circle-check');

    // Reset form
    setName('');
    setMessage('');
    setGuestCount(1);
  }, [name, message, status, showToast]);

  return (
    <section id="rsvp">
      <div className="section-tag reveal">❈ Konfirmasi ❈</div>
      <h2 className="section-title reveal">
        RSVP<br /><em style={{ fontStyle: 'italic', color: 'var(--mauve)' }}>Kehadiran</em>
      </h2>
      <div className="section-divider reveal"></div>
      <p className="section-subtitle reveal" style={{ marginBottom: 28 }}>
        Konfirmasi kehadiran Anda sangat berarti bagi kami.
      </p>

      <div className="rsvp-form-wrap reveal reveal-delay-1">
        <div className="form-group">
          <label className="form-label" htmlFor="rsvp-name">Nama Lengkap</label>
          <input
            className="form-input"
            type="text"
            id="rsvp-name"
            placeholder="Masukkan nama Anda..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Jumlah Tamu</label>
          <div className="number-input-wrap">
            <button className="num-btn" onClick={() => changeCount(-1)} type="button">−</button>
            <input
              type="number"
              className="guest-count-input"
              value={guestCount}
              min={1}
              max={10}
              readOnly
            />
            <button className="num-btn" onClick={() => changeCount(1)} type="button">+</button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Status Kehadiran</label>
          <div className="radio-group">
            <input
              type="radio"
              name="rsvp-status"
              id="rsvp-hadir"
              value="hadir"
              className="radio-option"
              checked={status === 'hadir'}
              onChange={() => setStatus('hadir')}
            />
            <label className="radio-label" htmlFor="rsvp-hadir">
              <i className="fa-solid fa-circle-check"></i> Hadir
            </label>
            <input
              type="radio"
              name="rsvp-status"
              id="rsvp-berhalangan"
              value="berhalangan"
              className="radio-option"
              checked={status === 'berhalangan'}
              onChange={() => setStatus('berhalangan')}
            />
            <label className="radio-label" htmlFor="rsvp-berhalangan">
              <i className="fa-regular fa-circle-xmark"></i> Berhalangan
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="rsvp-msg">Ucapan Singkat</label>
          <textarea
            className="form-textarea"
            id="rsvp-msg"
            placeholder="Tuliskan ucapan atau pesan Anda..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button className="btn-submit" onClick={submitRSVP}>
          <i className="fa-solid fa-paper-plane"></i> &nbsp;Kirim Konfirmasi
        </button>
      </div>
    </section>
  );
}

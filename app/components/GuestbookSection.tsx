'use client';

import { useState, useEffect, useCallback } from 'react';
import { defaultGuestEntries } from '../data/invitation-data';
import { useToast } from './ToastProvider';

interface GuestEntry {
  name: string;
  message: string;
  time: string;
}

function formatTime(isoStr: string) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function GuestbookSection() {
  const { showToast } = useToast();
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [gbName, setGbName] = useState('');
  const [gbMsg, setGbMsg] = useState('');

  const loadGuestbook = useCallback(() => {
    const stored: GuestEntry[] = JSON.parse(localStorage.getItem('inv_guestbook') || '[]');
    setEntries([...stored, ...defaultGuestEntries]);
  }, []);

  useEffect(() => {
    loadGuestbook();
    // Listen for updates from RSVP section
    const handler = () => loadGuestbook();
    window.addEventListener('guestbook-updated', handler);

    // Pre-fill name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
      setGbName(decodeURIComponent(guestName));
    }

    return () => window.removeEventListener('guestbook-updated', handler);
  }, [loadGuestbook]);

  const addGuestEntry = useCallback(() => {
    if (!gbName.trim() || !gbMsg.trim()) {
      showToast('⚠️ Mohon isi nama dan ucapan Anda', 'fa-triangle-exclamation');
      return;
    }

    const entry: GuestEntry = {
      name: gbName.trim(),
      message: gbMsg.trim(),
      time: new Date().toISOString(),
    };
    const stored: GuestEntry[] = JSON.parse(localStorage.getItem('inv_guestbook') || '[]');
    stored.unshift(entry);
    localStorage.setItem('inv_guestbook', JSON.stringify(stored));

    setGbName('');
    setGbMsg('');
    loadGuestbook();
    showToast('🌸 Ucapan Anda telah ditambahkan, terima kasih!', 'fa-heart');
  }, [gbName, gbMsg, showToast, loadGuestbook]);

  return (
    <section id="ucapan">
      <div className="section-tag reveal">❈ Ucapan ❈</div>
      <h2 className="section-title reveal">
        Buku<br /><em style={{ fontStyle: 'italic', color: 'var(--mauve)' }}>Tamu</em>
      </h2>
      <div className="section-divider reveal"></div>

      {/* Add entry form */}
      <div className="guestbook-add-form reveal reveal-delay-1">
        <div className="form-group">
          <label className="form-label" htmlFor="gb-name">Nama Anda</label>
          <input
            className="form-input"
            type="text"
            id="gb-name"
            placeholder="Siapa kamu?"
            value={gbName}
            onChange={(e) => setGbName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="gb-msg">Ucapan &amp; Doa</label>
          <textarea
            className="form-textarea"
            id="gb-msg"
            placeholder="Tuliskan doa terbaikmu..."
            value={gbMsg}
            onChange={(e) => setGbMsg(e.target.value)}
          ></textarea>
        </div>
        <button className="btn-primary" onClick={addGuestEntry} style={{ width: '100%', justifyContent: 'center' }}>
          <i className="fa-regular fa-paper-plane"></i> &nbsp;Kirim Ucapan
        </button>
      </div>

      {/* Entries list */}
      <div className="guestbook-entries">
        {entries.map((e, i) => (
          <div key={i} className="guest-entry">
            <div className="guest-entry-header">
              <div className="guest-avatar">{(e.name || '?')[0].toUpperCase()}</div>
              <div>
                <p className="guest-name">{e.name}</p>
                <p className="guest-time">{formatTime(e.time)}</p>
              </div>
            </div>
            <p className="guest-message">{e.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

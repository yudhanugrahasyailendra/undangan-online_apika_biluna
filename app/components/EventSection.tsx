'use client';

import { invitationData } from '../data/invitation-data';

export default function EventSection() {
  const evDateObj = new Date(invitationData.eventDate);
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const dayName = dayNames[evDateObj.getDay()];
  const dateStr = `${evDateObj.getDate()} ${monthNames[evDateObj.getMonth()]} ${evDateObj.getFullYear()}`;
  const timeStr = evDateObj.getHours().toString().padStart(2, '0') + '.' + evDateObj.getMinutes().toString().padStart(2, '0');

  return (
    <section id="acara">
      <div className="section-tag reveal">❈ Detail Acara ❈</div>
      <h2 className="section-title reveal">
        Sukuran<br /><em style={{ fontStyle: 'italic', color: 'var(--mauve)' }}>Kelahiran</em>
      </h2>
      <div className="section-divider reveal"></div>

      <div className="event-card-wrap">
        <div className="event-row reveal reveal-delay-1">
          {/* Date Card */}
          <div className="event-card">
            <div className="event-card-icon"><i className="fa-regular fa-calendar-days"></i></div>
            <p className="event-card-label">Tanggal</p>
            <p className="event-card-value">{dayName}<br />{dateStr}</p>
          </div>
          {/* Time Card */}
          <div className="event-card">
            <div className="event-card-icon"><i className="fa-regular fa-clock"></i></div>
            <p className="event-card-label">Waktu</p>
            <p className="event-card-value">{timeStr}</p>
            <p className="event-card-sub">WITA – Selesai</p>
          </div>
        </div>

        {/* Location Card */}
        <div className="event-card reveal reveal-delay-2">
          <div className="event-card-icon"><i className="fa-solid fa-location-dot"></i></div>
          <p className="event-card-label">Lokasi</p>
          <p className="event-card-value">{invitationData.locationName}</p>
          <p className="event-card-sub">{invitationData.address}</p>
        </div>

        {/* Map Button */}
        <div className="reveal reveal-delay-3">
          <a href={invitationData.mapsLink} target="_blank" rel="noopener noreferrer" className="btn-map">
            <i className="fa-solid fa-map-location-dot"></i>
            Buka Lokasi di Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

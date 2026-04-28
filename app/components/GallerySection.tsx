'use client';

import { useState, useEffect, useCallback } from 'react';
import { invitationData } from '../data/invitation-data';

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [imgStyle, setImgStyle] = useState({ opacity: 1, transform: 'scale(1)' });
  const [touchStartX, setTouchStartX] = useState(0);

  const images = invitationData.galleryImages;

  const openLightbox = (index: number) => {
    setCurrentIdx(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const navigate = useCallback((dir: number) => {
    setImgStyle({ opacity: 0, transform: 'scale(0.95)' });
    setTimeout(() => {
      setCurrentIdx(prev => (prev + dir + images.length) % images.length);
      setImgStyle({ opacity: 1, transform: 'scale(1)' });
    }, 150);
  }, [images.length]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'Escape') closeLightbox();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, navigate, closeLightbox]);

  return (
    <>
      <section id="galeri">
        <div className="section-tag reveal">❈ Galeri Foto ❈</div>
        <h2 className="section-title reveal">
          Momen<br /><em style={{ fontStyle: 'italic', color: 'var(--mauve)' }}>Berharga</em>
        </h2>
        <div className="section-divider reveal"></div>
        <p className="gallery-subtitle reveal reveal-delay-1">
          Sentuh foto untuk melihat lebih jelas
        </p>

        <div className="gallery-grid reveal reveal-delay-2">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              className="gallery-item"
              onClick={() => openLightbox(i)}
              aria-label={`Buka foto ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Foto ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <div
        id="lightbox"
        className={lightboxOpen ? 'open' : ''}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX;
          if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
        }}
      >
        <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Tutup galeri">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <button
          type="button"
          className="lightbox-prev"
          onClick={(e) => { e.stopPropagation(); navigate(-1); }}
          aria-label="Foto sebelumnya"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="lightbox-img"
          src={images[currentIdx]}
          alt=""
          style={{ ...imgStyle, transition: 'opacity 0.3s, transform 0.3s' }}
        />
        <button
          type="button"
          className="lightbox-next"
          onClick={(e) => { e.stopPropagation(); navigate(1); }}
          aria-label="Foto selanjutnya"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <p className="lightbox-counter">{currentIdx + 1} / {images.length}</p>
      </div>
    </>
  );
}

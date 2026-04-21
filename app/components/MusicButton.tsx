'use client';

import { useState, useRef, useCallback } from 'react';
import { invitationData } from '../data/invitation-data';

export default function MusicButton({ visible }: { visible: boolean }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing]);

  // Auto-play attempt (called externally via ref)
  const tryPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  // Expose tryPlay to parent
  if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>).__tryPlayMusic = tryPlay;
  }

  return (
    <>
      <audio ref={audioRef} loop preload="none" src={invitationData.audioSrc}></audio>
      <button
        id="music-btn"
        className={`${visible ? 'visible' : ''} ${playing ? 'playing' : ''}`}
        onClick={toggleMusic}
        title="Musik"
        aria-label="Toggle musik"
      >
        <i className={playing ? 'fa-solid fa-compact-disc' : 'fa-solid fa-music'}></i>
      </button>
    </>
  );
}

'use client';

import { useState, useCallback, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CoverScreen from './components/CoverScreen';
import HeroSection from './components/HeroSection';
import EventSection from './components/EventSection';
import GratitudeSection from './components/GratitudeSection';
import GallerySection from './components/GallerySection';
import VideoSection from './components/VideoSection';
import RundownSection from './components/RundownSection';
import RSVPSection from './components/RSVPSection';
import TestimonialSection from './components/TestimonialSection';
// import GiftSection from './components/GiftSection';
import FooterSection from './components/FooterSection';
import MusicButton from './components/MusicButton';
import BottomNav from './components/BottomNav';
import BackToTop from './components/BackToTop';
import ScrollReveal from './components/ScrollReveal';
import ToastProvider from './components/ToastProvider';

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [showUI, setShowUI] = useState(false);

  // Set body class on mount
  useEffect(() => {
    document.body.classList.add('cover-open');
    return () => {
      document.body.classList.remove('cover-open');
    };
  }, []);

  const handleOpenInvitation = useCallback(() => {
    setIsOpened(true);

    // Show floating UI elements after animation
    setTimeout(() => {
      setShowUI(true);
    }, 600);

    // Try to play music
    setTimeout(() => {
      const tryPlay = (window as unknown as Record<string, unknown>).__tryPlayMusic;
      if (typeof tryPlay === 'function') {
        (tryPlay as () => void)();
      }
    }, 300);

    // Scroll to hero
    setTimeout(() => {
      const home = document.getElementById('home');
      if (home) {
        home.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }, []);

  return (
    <ToastProvider>
      <LoadingScreen />
      <CoverScreen onOpen={handleOpenInvitation} />

      <div id="main-content" className={isOpened ? 'visible' : ''}>
        <HeroSection />
        <EventSection />
        <GratitudeSection />
        <GallerySection />
        <VideoSection />
        {/* <RundownSection />
        <RSVPSection /> */}
        <TestimonialSection />
        {/* <GiftSection /> */}
        <FooterSection />
      </div>

      <MusicButton visible={showUI} />
      <BottomNav visible={showUI} />
      <BackToTop />
      <ScrollReveal />
    </ToastProvider>
  );
}

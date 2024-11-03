import React, { useEffect, useState, useCallback } from 'react';
import HeroSection from '@/components/index/HeroSection';
import ServiceSection from '@/components/index/ServiceSection';
import TeamSection from '@/components/index/TeamSection';
import useStore from '@/store/useStore';

const Index = () => {
  const navHeight = useStore((state) => state.navHeight);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [heroHeight, setHeroHeight] = useState(0);

  const calculateHeroHeight = useCallback(() => {
    const windowHeight = window.innerHeight;
    setHeroHeight(windowHeight - navHeight);
  }, [navHeight]);

  const scrollToContent = useCallback(() => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    const content = document.getElementById('service-section');
    
    if (content) {
      const offsetTop = heroHeight;
      window.scrollTo({ 
        top: offsetTop, 
        behavior: 'smooth' 
      });

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }, [heroHeight, isScrolling]);
  
  const handleWheel = useCallback((e) => {
    if (isScrolling) return;
    
    const scrollTop = window.scrollY|| document.documentElement.scrollTop;
    
    if (e.deltaY > 0 && scrollTop < heroHeight) {
      e.preventDefault();
      scrollToContent();
    }
  }, [scrollToContent, isScrolling, heroHeight]);

  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!touchStart || isScrolling) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const touchEnd = e.touches[0].clientY;
    const deltaY = touchStart - touchEnd;

    if (deltaY > 50 && scrollTop < heroHeight) {
      e.preventDefault();
      scrollToContent();
    }
  }, [touchStart, isScrolling, scrollToContent, heroHeight]);

  const handleTouchEnd = useCallback(() => {
    setTouchStart(null);
  }, []);

  useEffect(() => {
    calculateHeroHeight();
    window.addEventListener('resize', calculateHeroHeight);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('resize', calculateHeroHeight);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, calculateHeroHeight]);

  return (
    <>
      <section 
        id="hero-section" 
        className="relative w-full"
      >
        <HeroSection scrollToContent={scrollToContent} />
      </section>
      <section 
        id="service-section" 
        className="relative w-full"
      >
        <ServiceSection />
      </section>
      <section 
        id="team-section" 
        className="relative w-full"
      >
        <TeamSection />
      </section>
    </>
  );
};

export default Index;
import dynamic from 'next/dynamic';
import React, { useEffect, useState, useCallback } from 'react';
import useStore from '@/store/useStore';

const LoadingSection = ({ isDark = false }) => (
  <div 
    className={`w-full h-screen animate-pulse ${
      isDark ? 'bg-slate-100 dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-900'
    }`} 
  />
);

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
    const heroSection = document.getElementById('hero-section');
    const serviceSection = document.getElementById('service-section');
    
    if (heroSection && serviceSection) {
      const heroRect = heroSection.getBoundingClientRect();
      const targetScroll = window.scrollY + heroRect.height;
      
      window.scrollTo({ 
        top: targetScroll, 
        behavior: 'smooth' 
      });

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }, [isScrolling]);
  
  const handleWheel = useCallback((e) => {
    if (isScrolling) return;
    
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;
    
    const heroRect = heroSection.getBoundingClientRect();
    const isInHeroSection = heroRect.bottom > 0 && heroRect.top <= 0;
    
    if (e.deltaY > 0 && isInHeroSection) {
      e.preventDefault();
      scrollToContent();
    }
  }, [scrollToContent, isScrolling]);

  const handleTouchStart = useCallback((e) => {
    const target = e.target;
    if (target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') || 
        target.closest('.swiper-slide')) return;
    
    setTouchStart(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback((e) => {
    const target = e.target;
    if (!touchStart || 
        isScrolling || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') || 
        target.closest('.swiper-slide')) return;

    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;

    const touchEnd = e.touches[0].clientY;
    const deltaY = touchStart - touchEnd;
    const heroRect = heroSection.getBoundingClientRect();

    if (deltaY > 50 && heroRect.bottom > 0 && !isScrolling) {
      e.preventDefault();
      setIsScrolling(true);
      scrollToContent();
      setTimeout(() => setIsScrolling(false), 1000);
    }
  }, [touchStart, isScrolling, scrollToContent]);

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

  const sections = [
    {
      id: 'hero-section',
      Component: dynamic(
        () => import('@/components/index/HeroSection'),
        { loading: () => <LoadingSection isDark={true} /> }
      ),
      props: { scrollToContent }
    },
    {
      id: 'service-section',
      Component: dynamic(
        () => import('@/components/index/ServiceSection'),
        { loading: () => <LoadingSection isDark={false} /> }
      )
    },
    {
      id: 'team-section',
      Component: dynamic(
        () => import('@/components/index/TeamSection'),
        { loading: () => <LoadingSection isDark={true} /> }
      )
    }
  ];

  return (
    <>
      {sections.map((section) => (
        <section 
          key={section.id} 
          id={section.id} 
          className="relative w-full"
        >
          <section.Component {...section.props} />
        </section>
      ))}
    </>
  );
};

export default Index;
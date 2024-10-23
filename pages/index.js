import React, { useEffect, useState, useCallback } from 'react';
import HeroSection from'@/components/index/HeroSection';
import ServiceSection from'@/components/index/ServiceSection';
import TeamSection from'@/components/index/TeamSection';

const Index = () => {
  const NAVBAR_HEIGHT = 59;

  const scrollToContent = () => {
    const content = document.getElementById('service-section');
    if (content) {
      const offsetTop = content.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const handleWheel = useCallback((event) => {
    if (event.deltaY > 0) { 
      scrollToContent();
    }
  }, []);

  useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (heroSection) {
        heroSection.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleWheel]);

  return (
    <>
      <div id="hero-section" className='hero'>
        <HeroSection scrollToContent={scrollToContent} />
      </div>
      <div id="service-section" className='content'>
        <ServiceSection />
      </div>
      <div id="team-section">
        <TeamSection />
      </div>
    </>
  );
};

export default Index;
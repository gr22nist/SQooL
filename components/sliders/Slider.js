import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import Slide from './Slide';
import SliderControls from './SliderControls';

const Slider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = useCallback(() => {
    setTransitionEnabled(true);
    setCurrentSlide((prev) => (prev === slides.length + 1 ? 1 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setTransitionEnabled(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length : prev - 1));
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setTransitionEnabled(true);
    setCurrentSlide(index + 1);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      resetTimeout();
      timeoutRef.current = setTimeout(nextSlide, 5000);
    }
    return () => {
      resetTimeout();
    };
  }, [nextSlide, isPlaying, currentSlide]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleIndicatorClick = (index) => {
    goToSlide(index);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleTransitionEnd = () => {
    if (currentSlide === slides.length + 1) {
      setTransitionEnabled(false);
      setCurrentSlide(1);
    } else if (currentSlide === 0) {
      setTransitionEnabled(false);
      setCurrentSlide(slides.length);
    }
  };

  const slider = `
    w-full 
    max-w-[calc(100vw-32px)] // 양쪽 패딩을 고려한 최대 너비
    relative 
    overflow-hidden 
    scrollbar-hide 
    cursor-grab
  `;

  const slidesWrapper = `
    flex 
    w-full
    ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}
  `;

  return (
    <div
      className={slider}
      {...handlers}
      onDragStart={(e) => e.preventDefault()}
    >
      <div 
        className={slidesWrapper} 
        style={{
          transform: `translateX(-${currentSlide * 100}%)`
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <Slide>{slides[slides.length - 1]}</Slide>
        {slides.map((slide, index) => (
          <Slide key={index}>{slide}</Slide>
        ))}
        <Slide>{slides[0]}</Slide>
      </div>
      <SliderControls
        currentSlide={currentSlide}
        slides={slides}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        handleIndicatorClick={handleIndicatorClick}
      />
    </div>
  );
};

export default Slider;
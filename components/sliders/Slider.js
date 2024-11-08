import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import Slide from './Slide';
import SliderControls from './SliderControls';
import Link from 'next/link';

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
    max-w-[calc(100vw-32px)]
    lg:max-w-content-full
    relative 
    overflow-hidden 
    scrollbar-hide 
    cursor-grab
    border
    rounded-xl
  `;

  const slidesWrapper = `
    flex 
    ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}
  `;

  const SlideContent = ({ slide }) => {
    return (
      <div className="flex flex-col items-center gap-4 text-center p-4">
        <p className="text-lg">{slide.content}</p>
        {slide.link && (
          <Link 
            href={slide.link} 
            className="slide-link"
            onClick={(e) => e.stopPropagation()}
          >
            {slide.buttonText}
          </Link>
        )}
      </div>
    );
  };

  return (
    <div
      className={slider}
      {...handlers}
      onDragStart={(e) => e.preventDefault()}
    >
      <div 
        className={slidesWrapper} 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
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
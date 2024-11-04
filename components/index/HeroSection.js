import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useStore from '@/store/useStore'; 
import { HeroBtn, ScrollDown } from'../icons/IconSet'; 

/**
 * HeroSection 컴포넌트
 * - 메인 페이지의 히어로 섹션을 담당하는 컴포넌트입니다.
 * - 다크 모드에 따라 스타일이 동적으로 변경됩니다.
 * - SQooL 에디터로 이동하는 버튼과 페이지 아래로 스크롤하는 버튼을 포함합니다.
 * - Zustand를 사용하여 전역 다크 모드 상태를 관리합니다.
 *
 * @param {function} scrollToContent - 페이지 아래로 스크롤하는 함수입니다.
 */
const HeroSection = ({ scrollToContent }) => {
  const { isDarkMode } = useStore();
  const [typedText, setTypedText] = useState('');
  const fullText = '한글 데이터로 배우는\n마음 편한 SQLite!';
  
  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setTypedText(currentText);
        currentIndex++;
        setTimeout(typeText, 100);
      }
    };
    
    typeText();
  }, []);

  const hero = `
    w-full
    h-[100dvh]
    relative
  `;

  const heroIcon = `${isDarkMode ? 'fill-slate-900' : 'fill-slate-50'}`;
  const heroContent = `
    w-full h-full
    flex flex-col items-center justify-center
    px-6
    gap-10
    relative
  `;
  const heroBtn = `
    relative
    w-auto inline-flex items-center
    px-6 py-3 sm:px-8 sm:py-4 
    rounded-lg gap-2 
    text-base sm:text-lg
    overflow-hidden
    ${isDarkMode
      ? 'bg-slate-50 text-slate-900 hover:bg-secondaryDark'
      : 'bg-slate-900 text-slate-50 hover:bg-secondaryLight'
    }
    transition-all duration-300
    before:absolute before:inset-0 
    before:bg-gradient-to-r 
    before:from-transparent before:via-white/20 before:to-transparent
    before:translate-x-[-200%]
    hover:before:translate-x-[200%]
    before:transition-transform before:duration-700
  `;

  const scrollDownBtn = `
    absolute 
    left-0 right-0
    bottom-8 sm:bottom-10
    mx-auto
    w-12 h-12 sm:w-16 sm:h-16 
    flex justify-center items-center 
    animate-bounce hover:opacity-80 
    duration-500
    z-10
  `;

  return (
    <section className={`
      ${hero} 
      ${isDarkMode ? 'heroDark' : 'heroLight'}
      relative overflow-hidden
    `}>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-grid" />
      <div className={heroContent}>
        <h1 className="text-4xl sm:text-5xl font-semibold text-center whitespace-pre-line leading-normal lg:leading-relaxed">
          {typedText}
        </h1>
        <Link href="/editor" className={heroBtn}>
          <HeroBtn width={20} height={21} className={heroIcon} />
          SQooL 에디터 실행
        </Link>
        <button 
          className={`
            ${scrollDownBtn}
            transform hover:translate-y-1
            transition-transform duration-300
          `} 
          onClick={scrollToContent}
        >
          <ScrollDown 
            width={24} 
            height={50} 
            className="fill-slate-400 stroke-slate-400 sm:w-[32px] sm:h-[67px]" 
          />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

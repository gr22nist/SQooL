import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useStore from '@/store/useStore'; 
import { HeroBtn, ScrollDown } from'../icons/IconSet'; 
import Image from 'next/image';
import useMediaQuery from '@/hooks/useMediaQuery';
import heroBgLightMobile from '@/public/img/hero_bg_light_mobile.png';
import heroBgLight from '@/public/img/hero_bg_light.png';
import heroBgDarkMobile from '@/public/img/hero_bg_dark_mobile.png';
import heroBgDark from '@/public/img/hero_bg_dark.png';

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
  const isDarkMode = useStore((state) => state.isDarkMode);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [visibleLines, setVisibleLines] = useState([]);
  const textLines = ['한글 데이터로 배우는', '마음 편한 SQLite!'];
  
  useEffect(() => {
    const showLines = async () => {
      for (let i = 0; i < textLines.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setVisibleLines(prev => [...prev, i]);
      }
    };
    
    showLines();
  }, [textLines.length]);

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
    <div className="hero relative w-full h-screen">
      <Image
        src={isMobile 
          ? (isDarkMode ? heroBgDarkMobile : heroBgLightMobile)
          : (isDarkMode ? heroBgDark : heroBgLight)
        }
        alt="Background"
        fill
        priority
        quality={75}
        sizes="100vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <div className={heroContent}>
        <h1 className="text-4xl sm:text-5xl font-semibold text-center leading-normal lg:leading-relaxed">
          {textLines.map((line, index) => (
            <div
              key={index}
              className={`
                transition-all duration-700
                ${visibleLines.includes(index) 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4'}
              `}
            >
              {line}
            </div>
          ))}
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
          aria-label="다음 섹션으로 스크롤"
          title="아래로 스크롤하여 서비스 소개 보기"
          role="button"
          tabIndex={0}
        >
          <ScrollDown 
            width={24} 
            height={50} 
            className="fill-slate-400 stroke-slate-400 sm:w-8 sm:h-17"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;

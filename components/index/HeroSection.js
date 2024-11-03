import React from 'react';
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
    w-auto inline-flex items-center
    px-6 py-3 sm:px-8 sm:py-4 
    rounded-lg gap-2 
    text-base sm:text-lg
    ${isDarkMode
      ? 'bg-slate-50 text-slate-900 hover:bg-secondaryDark'
      : 'bg-slate-900 text-slate-50 hover:bg-secondaryLight'
    } duration-500
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
    <section className={`${hero} ${isDarkMode ? 'heroDark' : 'heroLight'}`}>
      <div className={heroContent}>
        <h1 className='text-4xl sm:text-5xl font-semibold text-center'>
          <span className="block leading-normal sm:leading-relaxed">
            한글 데이터로 배우는<br />마음 편한 SQLite!
          </span>
        </h1>
        <Link href="/editor" className={heroBtn}>
          <HeroBtn width={20} height={21} className={heroIcon} />
          SQooL 에디터 실행
        </Link>
        <button className={scrollDownBtn} onClick={scrollToContent}>
          <ScrollDown 
            width={24} 
            height={50} 
            className='fill-slate-400 stroke-slate-400 sm:w-[32px] sm:h-[67px]' 
          />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

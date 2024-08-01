// components/NavBar.js
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import useStore from '../store/useStore';
import DarkModeToggle from './DarkModeToggle';

const NavBar = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  // 스크롤 상태를 관리하기 위한 상태
  const [scrolled, setScrolled] = useState(false);

  // 스크롤 이벤트 핸들러 등록 및 해제
  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const container = `w-full py-4 text-xl font-bold fixed top-0 left-0 z-50 transition-colors duration-300 
    ${scrolled ? (
        isDarkMode 
        ? 'bg-slate-900 border-b-2 border-slate-800 opacity-90'
        : 'bg-slate-50 border-b-2 border-slate-200 opacity-90'
    ) : 'bg-transparent'}`;
  const navWrap = `max-w-content-full mx-auto flex justify-between items-center`;
  const navList = `flex justify-center items-center gap-12`;
  const listItem = `${isDarkMode ? 'text-slate-50 hover:text-primaryDark' : 'text-slate-900 hover:text-primaryLight'} duration-300`;

  return (
    <nav className={container}>
      <div className={navWrap}>
        <div>
          <Link href="/">
            {isDarkMode ? (
              <Image src="/img/logo_dark.svg" alt="다크모드 상태입니다" width={137} height={36} priority />
            ) : (
              <Image src="/img/logo_light.svg" alt="라이트모드 상태입니다" width={137} height={36} priority />
            )}
          </Link>
        </div>
        <div>
          <ul className={navList}>
            <li className={listItem}>
              <Link href="/">홈</Link>
            </li>
            <li className={listItem}>
              <Link href="/start">시작하기</Link>
            </li>
            <li className={listItem}>
              <Link href="/editor">에디터</Link>
            </li>
            <li className={listItem}>
              <Link href="/article">아티클</Link>
            </li>
            <li className={listItem}>
              <DarkModeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
// components/NavBar.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useStore from '@/store/useStore';
import DarkModeToggle from './DarkModeToggle';
import { DarkLogo, LightLogo, SymbolDarkLogo, SymbolLightLogo } from '../icons/IconSet';
import { useRouter } from 'next/router';

const NavBar = ({ isFullWidth }) => {
  const router = useRouter();
  const { isDarkMode } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const container = `
    fixed top-0 left-0 right-0
    h-14 sm:h-18
    bg-opacity-80
    backdrop-blur-md
    transition-colors duration-200
    ${isDarkMode ? 'bg-slate-900/80' : 'bg-slate-50/80'}
    z-[90]
  `;

  const navWrap = `
    h-full
    mx-auto
    flex items-center justify-between
    gap-4
    transition-all duration-300
    xl:max-w-[1200px]
    px-4 sm:px-6 lg:px-8 xl:px-0
    z-[70]
  `;

  const desktopNavItem = `
    ${isDarkMode ? 'text-slate-50 hover:text-primaryDark' : 'text-slate-900 hover:text-primaryLight'} 
    duration-500 
    text-base lg:text-lg font-bold
    whitespace-nowrap
  `;

  const hamburgerBtn = `
    block lg:hidden
    w-10 h-10
    flex items-center justify-center
    ${isDarkMode ? 'text-slate-50' : 'text-slate-900'}
    text-2xl
  `;

  const mobileMenu = `
    lg:hidden
    fixed
    top-14 sm:top-18
    left-0
    w-full
    bg-opacity-100
    transform transition-transform duration-300 ease-in-out
    ${isMenuOpen ? 'translate-y-0 shadow-lg' : '-translate-y-full shadow-none'}
    ${isDarkMode ? 'bg-slate-900/90' : 'bg-slate-50/90'}
    z-[85]
  `;

  const mobileMenuItem = `
    block w-full text-sm font-extrabold
    ${isDarkMode 
      ? 'bg-slate-800 hover:bg-slate-700 text-slate-50 border-b border-slate-600/70'
      : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-b border-slate-300/70'
    }
    last:border-b-0
    px-6 py-4
    cursor-pointer
  `;

  return (
    <>
      <nav className={container}>
        <div className={navWrap}>
          <Link href="/">
            {isMobile ? (
              <div className="w-8 h-8 relative">
                {isDarkMode ? (
                  <SymbolDarkLogo 
                    width={32} 
                    height={32} 
                    title="Logo"
                    className="object-contain"
                  />
                ) : (
                  <SymbolLightLogo 
                    width={32} 
                    height={32} 
                    title="Logo"
                    className="object-contain"
                  />
                )}
              </div>
            ) : (
              isDarkMode ? (
                <DarkLogo width={128} height={34} title="Logo" />
              ) : (
                <LightLogo width={128} height={34} title="Logo" />
              )
            )}
          </Link>

          <div className="hidden lg:flex items-center gap-8 z-[60]">
            <ul className="flex items-center gap-8">
              <li className={desktopNavItem}><Link href="/start">학습하기</Link></li>
              <li className={desktopNavItem}><Link href="/editor">에디터</Link></li>
              <li className={desktopNavItem}><Link href="/article">아티클</Link></li>
            </ul>
            <DarkModeToggle />
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <DarkModeToggle />
            <button 
              className={hamburgerBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 열기"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      <div className={mobileMenu}>
        <ul>
          <li>
            <Link href="/start" className={mobileMenuItem}>
              학습하기
            </Link>
          </li>
          <li>
            <Link href="/editor" className={mobileMenuItem}>
              에디터
            </Link>
          </li>
          <li>
            <Link href="/article" className={mobileMenuItem}>
              아티클
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;

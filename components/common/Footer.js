import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useStore from '../../store/useStore'; 
import { LinkWISE, LinkGithub } from '../icons/IconSet';

const Footer = ({ isFullWidth }) => {
  const { isDarkMode } = useStore();

  const container = `
    w-full py-4 
    ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600 '} 
  `;

  const footerWrap = `
    ${isFullWidth ? 'w-full' : 'max-w-content-full mx-auto'}
    flex flex-col lg:flex-row
    justify-between
    items-center
    gap-6 lg:gap-0
    px-6 sm:px-8 lg:px-0
  `;

  const iconList = `
    flex justify-center items-center 
    gap-2
  `;

  const linkIcon = `
    w-8 h-8 p-1 
    flex justify-center items-center 
    rounded-2xl border-2 
    ${isDarkMode ? 'border-slate-500' : 'border-slate-300'} 
    hover:opacity-70 
    ease-in-out duration-150
  `;

  const pcSection = `
    hidden lg:flex items-center gap-4
  `;

  const mobileSection = `
    flex lg:hidden
    flex-col
    items-center
    gap-4
  `;

  return (
    <footer className={container}>
      <div className={`${footerWrap} hidden lg:flex`}>
        <div className="flex items-center gap-4">
          <Link href="/" legacyBehavior>
            <a>
              {isDarkMode ? (
                <Image src='/img/ci_logo_mono_dark.svg' alt='Logo' width={117} height={24} priority />
              ) : (
                <Image src='/img/ci_logo_mono_light.svg' alt='Logo' width={117} height={24} priority />
              )}
            </a>
          </Link>
          <span className="text-sm">
            Copyright ©WISE IT All Rights Reserved.
          </span>
        </div>

        <div className="flex items-center">
          <ul className={iconList}>
            <li>
              <Link href="/" legacyBehavior>
                <a className={linkIcon}>
                  <LinkWISE width={20} height={19} className="fill-slate-400" title="WISE IT 오피셜 페이지 링크" />
                </a>
              </Link>
            </li>
            <li>
              <a className={linkIcon}
                href='https://github.com/gr22nist/SQooL'
                target='_blank'
                rel='noopener noreferrer'>
                <LinkGithub width={20} height={20} className="fill-slate-400" title="Github 링크" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`${footerWrap} lg:hidden`}>
        <Link href="/" legacyBehavior>
          <a>
            {isDarkMode ? (
              <Image src='/img/ci_logo_mono_dark.svg' alt='Logo' width={117} height={24} priority />
            ) : (
              <Image src='/img/ci_logo_mono_light.svg' alt='Logo' width={117} height={24} priority />
            )}
          </a>
        </Link>

        <ul className={iconList}>
          <li>
            <Link href="/" legacyBehavior>
              <a className={linkIcon}>
                <LinkWISE width={20} height={19} className="fill-slate-400" title="WISE IT 오피셜 페이지 링크" />
              </a>
            </Link>
          </li>
          <li>
            <a className={linkIcon}
              href='https://github.com/gr22nist/SQooL'
              target='_blank'
              rel='noopener noreferrer'>
              <LinkGithub width={20} height={20} className="fill-slate-400" title="Github 링크" />
            </a>
          </li>
        </ul>

        <span className="text-xs text-center">
          Copyright ©WISE IT All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
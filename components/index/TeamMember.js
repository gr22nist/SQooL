// components/TeamMember.js
"use client";

import React from 'react'; 
import Image from 'next/image';
import Link from 'next/link';
import useStore from '@/store/useStore';
import useToast from '@/hooks/useToast';
import { MemberGithub, MemberEmail } from '../icons/IconSet';

const TeamMember = ({ avatarDark, avatarLight, bio, role, nickname, github, email, className }) => {
  const { isDarkMode } = useStore();
  const showToast = useToast();
  
  const copyClipboard = () => {
    navigator.clipboard.writeText(email).then(() => {
      showToast("✉️ 이메일 주소가 복사 되었습니다", 'success');
    }).catch(() => {
      showToast("⚠️ 이메일 주소 복사에 실패했습니다", 'error');
    });
  };
  
  const memberCard = `w-card-pc flex flex-col gap-4 py-8 justify-center items-center border-1 rounded-2xl`;
  const iconWrap = `flex gap-2`;
  const memberIcon = `${isDarkMode ? 'fill-slate-400 hover:fill-subDark' : 'fill-slate-400 hover:fill-subLight'} duration-500`;
  const roleBadge = `text-xs px-2 py-1 rounded font-semibold ${isDarkMode ? 'bg-primaryDark text-slate-900' : 'bg-primaryLight text-slate-50'}`

  return (
    <div className={memberCard}>
      <div className='relative w-40 h-40'>
        <Image 
          src={isDarkMode ? avatarDark : avatarLight} 
          alt={`${nickname} 아바타`} 
          fill 
          className="object-contain"
        />
      </div>
      <h3 className="text-xl font-bold">{nickname}</h3>
      <span className={roleBadge}>{role}</span>
      <p className='text-center'>{bio}</p>
      <div className={iconWrap}>
        <Link href={github} legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <MemberGithub width={24} height={24} className={memberIcon} />
          </a>
        </Link>
        <button onClick={copyClipboard} className='inline-flex gap-2'>
          <MemberEmail width={24} height={24} className={memberIcon} />
        </button>
      </div>
    </div>
  );
};

export default TeamMember;
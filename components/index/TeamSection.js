import React from 'react';
import TeamMember from '../TeamMember';
import TeamData from '@/data/TeamData';
import AnimatedSection from '../AnimatedSection';

const TeamSection = () => {
  const section = `
    w-full
    overflow-hidden
  `;

  const content = `
    container
    mx-auto
    flex flex-col 
    justify-center items-center 
    gap-10
    py-20 px-6 sm:px-8 lg:px-10
  `;

  const gridLayout = `
    grid
    grid-cols-1 
    sm:grid-cols-2 
    lg:grid-cols-4 
    gap-6
    w-full
    max-w-7xl
  `;

  return (
    <section className={section}>
      <div className={content}>
        <h2 className='text-2xl font-bold text-center'>
          팀 와이즈 잇 - WISE IT
        </h2>
        <p className='text-center text-gray-600 dark:text-gray-400'>
          본명의 이니셜을 줏어모으면 WISE가 되는 힙한 팀입니다
        </p>
        <AnimatedSection className='max-w-content-full'>
          <div className={gridLayout}>
            {TeamData.map((member, index) => (
              <TeamMember 
                key={index}
                avatarDark={member.avatarDark}
                avatarLight={member.avatarLight}
                nickname={member.nickname}
                role={member.role}
                bio={member.bio}
                email={member.email}
                github={member.github}
                className={`${index % 2 === 0 ? 'mt-0' : 'mt-4'}`}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TeamSection;

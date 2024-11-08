import React, { useState } from 'react';
import Document from '@/components/start/Document';
import dynamic from 'next/dynamic';
import useStore from '@/store/useStore';
import useMediaQuery from '@/hooks/useMediaQuery';
import EditorToggleButton from '@/components/start/EditorToggleButton';

const DynamicEditor = dynamic(
  () => import('@/components/editor/SqlEditor'),
  { ssr: false }
);

const Start = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const { isDarkMode, totalOffset } = useStore();

  const container = `
    w-full min-h-[calc(100vh-${totalOffset}px)]
    px-6 py-8
    flex items-start justify-center
    overflow-hidden
    ${isDarkMode ? 'bg-slate-900' : 'bg-white'}
  `;

  const contentWrapper = `
    w-full max-w-content-full
    flex items-start gap-6
    relative
  `;

  return (
    <main className={container}>
      <div className={contentWrapper}>
        <div className="flex-1 w-full xl:max-w-content-full h-[calc(100vh-4rem-2rem-2rem)]">
          <Document showEditor={isEditorOpen && isDesktop} />
        </div>
        <div 
          className={`
            hidden xl:block xl:w-[480px] xl:flex-shrink-0
            transition-[opacity,transform] duration-300 ease-in-out
            ${!isEditorOpen && 'opacity-0 translate-x-full absolute right-0'}
          `}
        >
          <DynamicEditor />
        </div>
        {isDesktop && (
          <EditorToggleButton 
            isEditorOpen={isEditorOpen}
            onClick={() => setIsEditorOpen(!isEditorOpen)}
          />
        )}
      </div>
    </main>
  );
};

export default Start;

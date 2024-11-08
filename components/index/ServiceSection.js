import React from 'react';
import ServiceData from '@/data/ServiceData';
import AnimatedSection from '../common/AnimatedSection';
import Slider from '../sliders/Slider';
import useStore from '@/store/useStore';

const ServiceSection = () => {
  const { isDarkMode } = useStore();

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
    pt-20 px-6 sm:px-8 lg:px-10
  `;

  const slides = ServiceData.map((service) => (
    <div key={service.id} className="w-full flex flex-col gap-3 px-6 pt-10 pb-20 justify-center items-center">
      <h3 className={`text-sm font-semibold mb-2 text-center ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
        {service.summary}
      </h3>
      <h2 className={`text-lg font-semibold text-center whitespace-pre-line ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
        {service.title}
      </h2>
      <p className={`text-sm text-center whitespace-pre-line ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
        {service.content}
      </p>
      {service.linkText && (
        <a 
          href={service.linkUrl}
          className={`
            relative
            w-auto inline-flex items-center justify-center
            px-4 py-2 sm:px-5 sm:py-2.5
            rounded-lg
            text-sm
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
          `}
        >
          {service.linkText}
        </a>
      )}
    </div>
  ));

  return (
    <section className={section}>
      <div className={content}>
        <h2 className={`text-xl sm:text-2xl font-bold text-center ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
          SQooL은 보다 즐거운 세상을 상상합니다
        </h2>
        <AnimatedSection className="w-full max-w-3xl">
          <Slider slides={slides} />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ServiceSection;

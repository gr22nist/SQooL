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
          className={`text-center mt-4 transition-colors duration-200 ${
            isDarkMode 
              ? 'text-primaryDark hover:text-secondaryDark' 
              : 'text-primaryLight hover:text-secondaryLight'
          }`}
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

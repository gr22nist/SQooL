import React from 'react';
import ServiceIntro from '../ServiceIntro';
import ServiceData from '@/data/ServiceData';
import AnimatedSection from '../AnimatedSection';
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
    <ServiceIntro
      key={service.id}
      icon={service.icon}
      summary={service.summary}
      title={service.title}
      content={service.content}
      linktext={service.linkText}
      linkUrl={service.linkUrl}
    />
  ));

  return (
    <section className={section}>
      <div className={content}>
        <h2 className='text-xl sm:text-2xl font-bold text-center'>
          SQooL은 보다 즐거운 세상을 상상합니다
        </h2>
        <AnimatedSection className="w-full">
          <Slider slides={slides} />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ServiceSection;

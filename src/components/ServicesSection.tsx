import React from 'react';
import FadeIn from './FadeIn';
import { useLanguage } from '../i18n';

export default function ServicesSection() {
  const { t } = useLanguage();

  const SERVICES = [
    {
      number: '01',
      name: t('services.1.name'),
      description: t('services.1.desc'),
    },
    {
      number: '02',
      name: t('services.2.name'),
      description: t('services.2.desc'),
    },
    {
      number: '03',
      name: t('services.3.name'),
      description: t('services.3.desc'),
    },
    {
      number: '04',
      name: t('services.4.name'),
      description: t('services.4.desc'),
    },
    {
      number: '05',
      name: t('services.5.name'),
      description: t('services.5.desc'),
    },
  ];

  return (
    <section
      id="price"
      className="theme-services-surface section-shadow rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="text-[var(--service-heading)] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 transition-colors duration-300"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 130px)' }}
        >
          {t('services.heading')}
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={20}>
            <div
              className="flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12 transition-colors duration-300"
              style={{
                borderBottom:
                  i < SERVICES.length - 1 ? '1px solid var(--service-border)' : 'none',
              }}
            >
              <span
                className="text-[var(--service-heading)] font-black flex-shrink-0 transition-colors duration-300"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-3 justify-center">
                <h3
                  className="text-[var(--service-heading)] font-medium uppercase transition-colors duration-300"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-[var(--service-text)] font-light leading-relaxed max-w-2xl transition-colors duration-300"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.7 }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
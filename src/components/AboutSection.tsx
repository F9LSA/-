import React from 'react';
import { Medal, Mail, Target } from 'lucide-react';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import { useLanguage } from '../i18n';

interface AboutSectionProps {
  showWhyChoose?: boolean;
}

export default function AboutSection({ showWhyChoose = false }: AboutSectionProps) {
  const { t } = useLanguage();

  const BIO_TEXT = t('about.bio');

  const ABOUT_CARDS = [
    {
      id: 'who-we-are',
      icon: Medal,
      title: t('about.whoWeAre.title'),
      description: t('about.whoWeAre.desc'),
    },
    {
      id: 'our-message',
      icon: Mail,
      title: t('about.ourMessage.title'),
      description: t('about.ourMessage.desc'),
    },
    {
      id: 'our-goal',
      icon: Target,
      title: t('about.ourGoal.title'),
      description: t('about.ourGoal.desc'),
    },
  ];

  const WHY_CHOOSE = [
    {
      number: '1',
      title: t('about.whyChoose.1.title'),
      description: t('about.whyChoose.1.desc'),
    },
    {
      number: '2',
      title: t('about.whyChoose.2.title'),
      description: t('about.whyChoose.2.desc'),
    },
    {
      number: '3',
      title: t('about.whyChoose.3.title'),
      description: t('about.whyChoose.3.desc'),
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 130px)' }}
        >
          {t('about.heading')}
        </h2>
      </FadeIn>

      {/* Animated bio text */}
      <div className="mt-10 sm:mt-14 md:mt-16" style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
        <AnimatedText
          text={BIO_TEXT}
          className="theme-secondary-text font-medium text-center leading-relaxed max-w-[560px]"
        />
      </div>

      {/* About cards */}
      <div className="mt-16 sm:mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-6xl w-full">
        {ABOUT_CARDS.map((card, i) => (
          <FadeIn key={card.id} delay={i * 0.15} y={30}>
            <div
              className="theme-dark-surface rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border-2 border-[var(--theme-border)] p-6 sm:p-8 md:p-10 h-full flex flex-col gap-4 transition-colors duration-300 hover:border-[var(--theme-hover)]"
            >
              <card.icon
                className="theme-secondary-text flex-shrink-0"
                strokeWidth={1.5}
                size={72}
              />
              <h3
                className="theme-primary-text font-black uppercase leading-tight"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.25rem)' }}
              >
                {card.title}
              </h3>
              <p
                className="theme-secondary-text font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', opacity: 0.8 }}
              >
                {card.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Why Choose AGHSAN */}
      {showWhyChoose && (
      <div className="mt-24 sm:mt-28 md:mt-32 max-w-6xl w-full">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-14 sm:mb-16 md:mb-20"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
          >
            {t('about.whyChoose.heading')}
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-8 sm:gap-10">
          {WHY_CHOOSE.map((item, i) => (
            <FadeIn key={item.number} delay={i * 0.1} y={20}>
              <div
                className="theme-dark-surface rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border-2 border-[var(--theme-border)] p-8 sm:p-10 md:p-12 flex flex-col gap-4 transition-colors duration-300 hover:border-[var(--theme-hover)]"
              >
                <span
                  className="hero-heading font-black leading-none flex-shrink-0"
                  style={{ fontSize: 'clamp(4rem, 12vw, 140px)', lineHeight: 1 }}
                >
                  {item.number}
                </span>
                <h3
                  className="theme-primary-text font-bold uppercase leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 2vw, 1.9rem)' }}
                >
                  {item.title}
                </h3>
                <p
                  className="theme-secondary-text font-light leading-relaxed max-w-2xl"
                  style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)', opacity: 0.8 }}
                >
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      )}
    </section>
  );
}
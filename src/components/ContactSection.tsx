import React from 'react';
import FadeIn from './FadeIn';
import { useLanguage } from '../i18n';

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="theme-dark-surface section-shadow relative rounded-t-[30px] sm:rounded-t-[50px] lg:rounded-t-[60px] px-4 sm:px-8 lg:px-10 pt-16 sm:pt-24 lg:pt-28 pb-16 sm:pb-20"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-12 sm:mb-20 lg:mb-24"
          style={{ fontSize: 'clamp(2rem, 10vw, 130px)' }}
        >
          {t('contact.heading')}
        </h2>
      </FadeIn>

      <div className="mx-auto grid max-w-6xl gap-6 sm:gap-10 lg:grid-cols-3">
        <FadeIn delay={0.1} y={30}>
          <div className="theme-dark-surface rounded-[24px] sm:rounded-[40px] lg:rounded-[50px] border-2 border-[var(--theme-border)] p-5 sm:p-8 lg:p-10 h-full flex flex-col gap-4 transition-colors duration-300 hover:border-[var(--theme-hover)]">
            <h3 className="mb-2 text-lg font-semibold uppercase tracking-[0.2em] theme-primary-text">
              {t('contact.whatsapp')}
            </h3>
            <p className="leading-7 theme-secondary-text">{t('contact.location')}</p>
            <a
              href="https://g.co/kgs/zpxZwG"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-medium underline underline-offset-4 transition hover:opacity-80 theme-primary-text"
            >
              {t('contact.maps')}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={30}>
          <div className="theme-dark-surface rounded-[24px] sm:rounded-[40px] lg:rounded-[50px] border-2 border-[var(--theme-border)] p-5 sm:p-8 lg:p-10 h-full flex flex-col gap-4 transition-colors duration-300 hover:border-[var(--theme-hover)]">
            <h3 className="mb-2 text-lg font-semibold uppercase tracking-[0.2em] theme-primary-text">
              {t('contact.workingHours')}
            </h3>
            <p className="leading-7 theme-secondary-text">{t('contact.satThu')}</p>
            <p className="leading-7 theme-secondary-text">{t('contact.service247')}</p>
            <p className="leading-7 theme-secondary-text">{t('contact.noFriday')}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} y={30}>
          <div className="theme-dark-surface rounded-[24px] sm:rounded-[40px] lg:rounded-[50px] border-2 border-[var(--theme-border)] p-5 sm:p-8 lg:p-10 h-full flex flex-col gap-4 transition-colors duration-300 hover:border-[var(--theme-hover)]">
            <h3 className="mb-2 text-lg font-semibold uppercase tracking-[0.2em] theme-primary-text">
              {t('contact.contact')}
            </h3>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=Hshamdini%40gmail.com&utm_source=chatgpt.com"
              target="_blank"
              rel="noreferrer"
              className="mb-2 block leading-7 underline underline-offset-4 transition hover:opacity-80 theme-primary-text"
            >
              Hshamdini@gmail.com
            </a>
            <a
              href="tel:0114542266"
              className="block leading-7 underline underline-offset-4 transition hover:opacity-80 theme-primary-text"
            >
              +966 57 177 3490
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
import React from 'react';
import FadeIn from './FadeIn';
import Magnet from './Magnet';
import { useLanguage } from '../i18n';
import featherImage from '../../External Photos/Feather.png';
import aghsanBlackImage from '../../External Photos/أغصان black.png';
import aghsanWhiteImage from '../../External Photos/أغصان white.png';

// Website domain (code-only label — not displayed on the site)
const WEBSITE_DOMAIN = 'https://aghsan.com';

export type TabId = 'home' | 'about' | 'services' | 'projects';

interface HeroSectionProps {
  isLightMode: boolean;
  onToggleTheme: () => void;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function HeroSection({
  isLightMode,
  onToggleTheme,
  activeTab,
  onTabChange,
}: HeroSectionProps) {
  const isHome = activeTab === 'home';
  const { t, toggleLanguage, isArabic } = useLanguage();

  const NAV_LINKS: { label: string; tab: TabId }[] = [
    { label: t('nav.aghsan'), tab: 'home' },
    { label: t('nav.about'), tab: 'about' },
    { label: t('nav.services'), tab: 'services' },
    { label: t('nav.projects'), tab: 'projects' },
  ];

  return (
    <section
      className={`relative flex flex-col ${isHome ? 'h-screen' : ''}`}
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav">
        <nav className="relative flex justify-between items-center gap-4 px-6 md:px-10 pt-6 md:pt-8 shadow-lg">
          {/* Left: logo */}
          <button
            type="button"
            onClick={() => onTabChange('home')}
            className="opacity-100 transition-opacity duration-200 hover:opacity-70"
          >
            <img
              src={isLightMode ? aghsanBlackImage : aghsanWhiteImage}
              alt="أغصان"
              className="h-10 md:h-14 lg:h-16 w-auto select-none pointer-events-none"
              draggable={false}
            />
          </button>

          {/* Center: nav links */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-8">
            {NAV_LINKS.filter((link) => link.tab !== 'home').map((link) => (
              <button
                key={link.tab}
                type="button"
                onClick={() => onTabChange(link.tab)}
                className={`${isLightMode ? 'text-black' : 'theme-primary-text'} font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 ${
                  activeTab === link.tab ? 'opacity-100 underline underline-offset-8' : 'opacity-60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: language toggle + theme toggle */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Switch language"
              className={`${isLightMode ? 'text-black' : 'theme-primary-text'} rounded-full px-3 py-2 text-xs font-medium uppercase tracking-wider shadow-2xl transition-colors hover:bg-[var(--theme-hover)] md:px-4 md:text-sm`}
            >
              {isArabic ? 'عربي/إنجليزي' : 'EN/AR'}
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${isLightMode ? 'dark' : 'light'} mode`}
              className={`${isLightMode ? 'text-black' : 'theme-primary-text'} rounded-full px-3 py-2 text-xs font-medium uppercase tracking-wider shadow-2xl transition-colors hover:bg-[var(--theme-hover)] md:px-4 md:text-sm`}
            >
              {isLightMode ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </nav>
      </FadeIn>

      {/* Hero content — only shown on the home tab */}
      {isHome && (
        <>
          {/* Hero Heading */}
          <div className="overflow-hidden mt-10 sm:mt-8 md:mt-6 px-2">
            <FadeIn delay={0.15} y={40}>
              <h1
                className={`hero-heading font-black uppercase tracking-tight leading-none whitespace-normal w-full text-center ${
                  isArabic
                    ? 'text-[8.5vw] sm:text-[9.5vw] md:text-[10.5vw] lg:text-[11.5vw]'
                    : 'text-[8vw] sm:text-[9vw] md:text-[10vw] lg:text-[11vw]'
                }`}
              >
                {t('hero.welcome')}
              </h1>
            </FadeIn>
          </div>

          {/* Portrait */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 z-10 w-[110px] sm:w-[135px] md:w-[165px] lg:w-[200px]">
            <FadeIn delay={0.6} y={30}>
              <Magnet padding={150} strength={3}>
                <img
                  src={featherImage}
                  alt="Feather"
                  className="w-full h-auto select-none pointer-events-none -rotate-[35deg]"
                  draggable={false}
                />
              </Magnet>
            </FadeIn>
          </div>

          {/* Bottom bar */}
          <div className="mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 relative z-20">
            <FadeIn delay={0.35} y={20}>
              <p
                className="theme-secondary-text font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
                style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
              >
                {t('hero.tagline')}
              </p>
            </FadeIn>
          </div>
        </>
      )}
    </section>
  );
}
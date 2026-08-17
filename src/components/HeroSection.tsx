import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const NAV_LINKS: { label: string; tab: TabId }[] = [
    { label: t('nav.aghsan'), tab: 'home' },
    { label: t('nav.about'), tab: 'about' },
    { label: t('nav.services'), tab: 'services' },
    { label: t('nav.projects'), tab: 'projects' },
  ];

  const DRAWER_LINKS = NAV_LINKS.filter((link) => link.tab !== 'home');

  // Close drawer on Escape key + lock body scroll while open
  useEffect(() => {
    if (!isDrawerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Close drawer whenever active tab changes
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [activeTab]);

  const textColorClass = isLightMode ? 'text-black' : 'theme-primary-text';

  const handleNavClick = (tab: TabId) => {
    onTabChange(tab);
    setIsDrawerOpen(false);
  };

  return (
    <section
      className={`relative flex flex-col ${isHome ? 'h-screen' : ''}`}
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav">
        <nav className="relative flex justify-between items-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6 lg:pt-8 shadow-lg">
          {/* Left: logo */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="opacity-100 transition-opacity duration-200 hover:opacity-70"
          >
            <img
              src={isLightMode ? aghsanBlackImage : aghsanWhiteImage}
              alt="أغصان"
              className="h-8 sm:h-10 lg:h-14 xl:h-16 w-auto select-none pointer-events-none"
              draggable={false}
            />
          </button>

          {/* Center: nav links (desktop only) */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-4 lg:gap-8">
            {NAV_LINKS.filter((link) => link.tab !== 'home').map((link) => (
              <button
                key={link.tab}
                type="button"
                onClick={() => onTabChange(link.tab)}
                className={`${isLightMode ? 'text-black' : 'theme-primary-text'} font-medium uppercase tracking-wider text-sm lg:text-lg xl:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 ${
                  activeTab === link.tab ? 'opacity-100 underline underline-offset-8' : 'opacity-60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: language toggle + theme toggle + hamburger (mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Switch language"
              className={`${textColorClass} rounded-full px-2.5 sm:px-3 py-2 text-[10px] sm:text-xs font-medium uppercase tracking-wider shadow-2xl transition-colors hover:bg-[var(--theme-hover)] lg:px-4 lg:text-sm`}
            >
              {isArabic ? 'عربي/إنجليزي' : 'EN/AR'}
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${isLightMode ? 'dark' : 'light'} mode`}
              className={`${textColorClass} rounded-full px-2.5 sm:px-3 py-2 text-[10px] sm:text-xs font-medium uppercase tracking-wider shadow-2xl transition-colors hover:bg-[var(--theme-hover)] lg:px-4 lg:text-sm`}
            >
              {isLightMode ? '🌙 Dark' : '☀️ Light'}
            </button>

            {/* Hamburger menu — mobile only, rightmost */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label={t('nav.menu')}
              className={`${textColorClass} lg:hidden rounded-full p-2.5 shadow-2xl transition-colors hover:bg-[var(--theme-hover)]`}
            >
              <Menu className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </nav>
      </FadeIn>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="drawer-backdrop"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer-panel"
              className="fixed top-0 bottom-0 z-50 w-[85%] max-w-sm theme-dark-surface theme-primary-text shadow-2xl lg:hidden"
              style={{
                [isArabic ? 'right' : 'left']: 0,
              }}
              initial={{ x: isArabic ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isArabic ? '100%' : '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.menu')}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[var(--theme-border)]">
                <span className="text-sm font-medium uppercase tracking-[0.2em] theme-secondary-text">
                  {t('nav.menu')}
                </span>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label={t('nav.close')}
                  className={`${textColorClass} rounded-full p-2 transition-colors hover:bg-[var(--theme-hover)]`}
                >
                  <X className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </div>

              {/* Drawer nav links — all except أغصان */}
              <nav className="flex flex-col px-4 py-6 gap-2">
                {DRAWER_LINKS.map((link, index) => (
                  <motion.button
                    key={link.tab}
                    type="button"
                    onClick={() => handleNavClick(link.tab)}
                    initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.06, duration: 0.3 }}
                    className={`flex items-center justify-between rounded-xl px-4 py-4 text-lg font-medium uppercase tracking-wider text-start transition-colors hover:bg-[var(--theme-hover)] ${
                      activeTab === link.tab
                        ? 'opacity-100 underline underline-offset-8'
                        : 'opacity-60'
                    }`}
                  >
                    {link.label}
                    <span className="theme-secondary-text text-xs opacity-60">
                      {isArabic ? '←' : '→'}
                    </span>
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero content — only shown on the home tab */}
      {isHome && (
        <>
          {/* Centered hero content (mobile) */}
          <div className="flex flex-col items-center justify-center flex-1 lg:block lg:flex-none">
            {/* Hero Heading */}
            <div className="overflow-hidden lg:mt-6 lg:mb-0 px-2">
              <FadeIn delay={0.15} y={40}>
                <h1
                  className={`hero-heading font-black uppercase tracking-tight leading-none whitespace-normal w-full text-center ${
                    isArabic
                      ? 'text-[11vw] sm:text-[9.5vw] lg:text-[10.5vw] xl:text-[11.5vw]'
                      : 'text-[10.5vw] sm:text-[9vw] lg:text-[10vw] xl:text-[11vw]'
                  }`}
                >
                  {/* Desktop: single string (unchanged) */}
                  <span className="max-[639px]:hidden">{t('hero.welcome')}</span>
                  {/* Mobile: single line only */}
                  <span className="hidden max-[639px]:block">
                    {t('hero.welcome.line1')}
                  </span>
                </h1>
              </FadeIn>
            </div>

            {/* Portrait */}
            <div className="relative mx-auto mt-3 sm:mt-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 z-10 w-[120px] sm:w-[135px] lg:w-[165px] xl:w-[200px]">
              <FadeIn delay={0.6} y={30}>
                <Magnet padding={150} strength={3}>
                  {/* Mobile: أغصان logo (white in dark mode, black in light mode) */}
                  <img
                    src={isLightMode ? aghsanBlackImage : aghsanWhiteImage}
                    alt="أغصان"
                    className="w-full h-auto select-none pointer-events-none sm:hidden"
                    draggable={false}
                  />
                  {/* Desktop: feather (unchanged) */}
                  <img
                    src={featherImage}
                    alt="Feather"
                    className="w-full h-auto select-none pointer-events-none -rotate-[35deg] hidden sm:block"
                    draggable={false}
                  />
                </Magnet>
              </FadeIn>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-auto flex justify-between items-end px-4 sm:px-6 lg:px-10 pb-5 sm:pb-7 lg:pb-10 relative z-20">
            <FadeIn delay={0.35} y={20}>
              <p
                className="theme-secondary-text font-light uppercase tracking-wide leading-snug max-w-[140px] sm:max-w-[220px] lg:max-w-[260px]"
                style={{ fontSize: 'clamp(0.65rem, 1.4vw, 1.5rem)' }}
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
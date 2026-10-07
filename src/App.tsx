import React, { useEffect, useState } from 'react';
import HeroSection, { TabId } from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import { LanguageProvider, useLanguage } from './i18n';

function AppContent() {
  const [isLightMode, setIsLightMode] = useState(() => {
    return window.localStorage.getItem('sephr-theme') === 'light';
  });

  const [activeTab, setActiveTab] = useState<TabId>('home');
  const { t } = useLanguage();

  useEffect(() => {
    document.documentElement.dataset.theme = isLightMode ? 'light' : 'dark';
    window.localStorage.setItem('sephr-theme', isLightMode ? 'light' : 'dark');
  }, [isLightMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [activeTab]);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
  };

  const renderSite = () => (
    <div className="relative">
      <div className="theme-page-bg min-h-screen" style={{ overflowX: 'clip' }}>
        <HeroSection
          isLightMode={isLightMode}
          onToggleTheme={() => setIsLightMode((current) => !current)}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {activeTab === 'home' && (
          <>
            <AboutSection showWhyChoose />
            <ServicesSection />
          </>
        )}

        {activeTab === 'about' && <AboutSection showWhyChoose />}

        {activeTab === 'services' && <ServicesSection />}

        <footer className="theme-dark-surface theme-primary-text border-t border-[var(--theme-border)] px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 sm:gap-10 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold uppercase tracking-[0.2em]">{t('footer.whatsapp')}</h3>
              <a
                href="http://wa.me/966563124416"
                target="_blank"
                rel="noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="mt-3 inline-flex items-center justify-center rounded-full border border-[var(--theme-border)] p-3 transition-colors hover:bg-[var(--theme-hover)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold uppercase tracking-[0.2em]">{t('footer.workingHours')}</h3>
              <p className="leading-7 theme-secondary-text">{t('footer.satThu')}</p>
              <p className="leading-7 theme-secondary-text">{t('footer.hours')}</p>
              <p className="leading-7 theme-secondary-text">{t('footer.noFriday')}</p>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold uppercase tracking-[0.2em]">{t('footer.contact')}</h3>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=g.aleqseller%40gmail.com&utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="mb-2 block leading-7 underline underline-offset-4 transition hover:opacity-80"
              >
                g.aleqseller@gmail.com
              </a>
              <p className="block leading-7 theme-secondary-text select-all">
                +966 56 312 4416
              </p>
            </div>
          </div>
        </footer>
        <div className="theme-dark-surface theme-primary-text border-t border-[var(--theme-border)] px-4 sm:px-6 pb-8 sm:pb-10 pt-4 sm:pt-6 lg:px-10">
          <p className="text-center text-sm theme-secondary-text">
            {t('footer.copyright')}
          </p>
        </div>
      </div>

    </div>
  );

  return renderSite();
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
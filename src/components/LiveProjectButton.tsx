import React from 'react';
import { useLanguage } from '../i18n';

interface LiveProjectButtonProps {
  className?: string;
  expanded?: boolean;
  onClick?: () => void;
}

export default function LiveProjectButton({ className = '', expanded = false, onClick }: LiveProjectButtonProps) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`theme-primary-text rounded-full border-2 border-[var(--theme-text)] font-medium uppercase tracking-widest px-5 sm:px-10 py-2.5 sm:py-3.5 text-xs sm:text-base whitespace-nowrap transition-colors duration-200 hover:bg-[var(--theme-hover)] ${className}`}
    >
      {expanded ? t('projects.close') : t('projects.live')}
    </button>
  );
}
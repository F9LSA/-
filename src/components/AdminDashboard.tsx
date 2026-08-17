import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../i18n';

interface AdminDashboardProps {
  onLogout: () => void;
  onBack: () => void;
}

export default function AdminDashboard({ onLogout, onBack }: AdminDashboardProps) {
  const { t } = useLanguage();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserEmail(data.user.email || '');
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="min-h-screen theme-page-bg">
      {/* Admin Navbar */}
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 shadow-lg theme-dark-surface theme-primary-text">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium uppercase tracking-wider theme-secondary-text underline underline-offset-4 transition hover:opacity-80"
        >
          {t('admin.dashboard.back')}
        </button>

        <span className="text-lg font-bold uppercase tracking-[0.2em]">
          {t('admin.dashboard.title')}
        </span>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-[var(--theme-border)] px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-[var(--theme-hover)]"
        >
          {t('admin.dashboard.logout')}
        </button>
      </nav>

      {/* Admin Content */}
      <div className="px-4 sm:px-6 lg:px-10 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-[var(--theme-border)] theme-dark-surface theme-primary-text shadow-2xl p-6">
            <h2 className="text-xl font-semibold uppercase tracking-wider mb-4">
              {t('admin.dashboard.welcome')}
            </h2>
            <p className="theme-secondary-text mb-2">
              {t('admin.dashboard.loggedInAs')}: <span className="font-medium">{userEmail}</span>
            </p>
            <p className="theme-secondary-text text-sm">
              {t('admin.dashboard.placeholder')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
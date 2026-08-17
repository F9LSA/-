import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../i18n';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export default function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data?.user) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen theme-page-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--theme-border)] theme-dark-surface theme-primary-text shadow-2xl p-8">
        <h1 className="text-2xl font-bold uppercase tracking-[0.2em] mb-6 text-center">
          {t('admin.login.title')}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium uppercase tracking-wider theme-secondary-text mb-1">
              {t('auth.login.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-[var(--theme-border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-primary)]"
              placeholder="admin@aghsan.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium uppercase tracking-wider theme-secondary-text mb-1">
              {t('auth.login.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[var(--theme-border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-primary)]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 theme-secondary-text" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--theme-primary)] text-white font-semibold uppercase tracking-wider py-3 transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {loading ? t('auth.login.loading') : t('auth.login.submit')}
          </button>
        </form>

        <button
          type="button"
          onClick={onBack}
          className="mt-4 w-full text-center text-sm theme-secondary-text underline underline-offset-4 transition hover:opacity-80"
        >
          {t('auth.login.back')}
        </button>
      </div>
    </div>
  );
}
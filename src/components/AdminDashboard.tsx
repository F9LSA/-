import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../i18n';

interface AdminDashboardProps {
  onLogout: () => void;
  onBack: () => void;
  onViewSite: () => void;
}

interface ProjectRow {
  id: string;
  number: string;
  title_en: string;
  title_ar: string;
  category_en: string;
  category_ar: string;
  description_en: string;
  description_ar: string;
  image_url: string;
  created_at: string;
}

export default function AdminDashboard({ onLogout, onBack, onViewSite }: AdminDashboardProps) {
  const { t } = useLanguage();
  const [userEmail, setUserEmail] = useState('');
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [categoryEn, setCategoryEn] = useState('');
  const [categoryAr, setCategoryAr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserEmail(data.user.email || '');
      }
    };
    getUser();
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return;
    }

    if (data) {
      setProjects(data as ProjectRow[]);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!titleEn.trim() || !titleAr.trim()) {
      setMessage({ type: 'error', text: 'Please fill in the project title in both languages.' });
      return;
    }

    if (!imageFile) {
      setMessage({ type: 'error', text: 'Please select a project image.' });
      return;
    }

    setUploading(true);

    try {
      // 1. Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;

      // 3. Get next project number
      const nextNumber = String(projects.length + 11).padStart(2, '0');

      // 4. Insert into projects table
      const { error: insertError } = await supabase
        .from('projects')
        .insert({
          number: nextNumber,
          title_en: titleEn.trim(),
          title_ar: titleAr.trim(),
          category_en: categoryEn.trim() || 'Project',
          category_ar: categoryAr.trim() || 'مشروع',
          description_en: descriptionEn.trim(),
          description_ar: descriptionAr.trim(),
          image_url: imageUrl,
        });

      if (insertError) {
        throw new Error(insertError.message);
      }

      // Reset form
      setTitleEn('');
      setTitleAr('');
      setCategoryEn('');
      setCategoryAr('');
      setDescriptionEn('');
      setDescriptionAr('');
      setImageFile(null);
      setImagePreview(null);

      setMessage({ type: 'success', text: 'Project added successfully!' });
      fetchProjects();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to add project.' });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
      return;
    }

    setMessage({ type: 'success', text: 'Project deleted successfully!' });
    fetchProjects();
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

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onViewSite}
            className="rounded-full bg-[var(--theme-primary)] px-4 py-2 text-sm font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-80"
          >
            {t('admin.dashboard.viewSite')}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-[var(--theme-border)] px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-[var(--theme-hover)]"
          >
            {t('admin.dashboard.logout')}
          </button>
        </div>
      </nav>

      {/* Admin Content */}
      <div className="px-4 sm:px-6 lg:px-10 py-8">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Welcome card */}
          <div className="rounded-2xl border border-[var(--theme-border)] theme-dark-surface theme-primary-text shadow-2xl p-6">
            <h2 className="text-xl font-semibold uppercase tracking-wider mb-4 text-center">
              {t('admin.dashboard.welcome')}
            </h2>
            <p className="theme-secondary-text mb-2">
              {t('admin.dashboard.loggedInAs')}: <span className="font-medium">{userEmail}</span>
            </p>
          </div>

          {/* Add Project Form */}
          <div className="rounded-2xl border border-[var(--theme-border)] theme-dark-surface theme-primary-text shadow-2xl p-6">
            <h2 className="text-xl font-semibold uppercase tracking-wider mb-6 text-center">
              Add New Project
            </h2>

            {message && (
              <div
                className={`mb-4 rounded-xl px-4 py-3 text-sm ${
                  message.type === 'success'
                    ? 'bg-green-500/10 text-green-600 border border-green-500/30'
                    : 'bg-red-500/10 text-red-600 border border-red-500/30'
                }`}
                role="alert"
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider theme-secondary-text mb-1">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[var(--theme-border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-primary)]"
                    placeholder="Project title in English"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium uppercase tracking-wider theme-secondary-text mb-1 text-right"
                    dir="rtl"
                    style={{ fontFamily: "'Tajawal', 'Kanit', sans-serif" }}
                  >
                    العنوان (بالعربية) *
                  </label>
                  <input
                    type="text"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[var(--theme-border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-primary)]"
                    placeholder="عنوان المشروع بالعربية"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider theme-secondary-text mb-1">
                    Category (English)
                  </label>
                  <input
                    type="text"
                    value={categoryEn}
                    onChange={(e) => setCategoryEn(e.target.value)}
                    className="w-full rounded-xl border border-[var(--theme-border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-primary)]"
                    placeholder="e.g. Kiosk, Booth, Exhibition"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium uppercase tracking-wider theme-secondary-text mb-1 text-right"
                    dir="rtl"
                    style={{ fontFamily: "'Tajawal', 'Kanit', sans-serif" }}
                  >
                    الفئة (بالعربية)
                  </label>
                  <input
                    type="text"
                    value={categoryAr}
                    onChange={(e) => setCategoryAr(e.target.value)}
                    className="w-full rounded-xl border border-[var(--theme-border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-primary)]"
                    placeholder="مثال: كشك، جناح، معرض"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider theme-secondary-text mb-1">
                    Description (English)
                  </label>
                  <textarea
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-[var(--theme-border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-primary)] resize-y"
                    placeholder="Project description in English"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium uppercase tracking-wider theme-secondary-text mb-1 text-right"
                    dir="rtl"
                    style={{ fontFamily: "'Tajawal', 'Kanit', sans-serif" }}
                  >
                    الوصف (بالعربية)
                  </label>
                  <textarea
                    value={descriptionAr}
                    onChange={(e) => setDescriptionAr(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-[var(--theme-border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-primary)] resize-y"
                    placeholder="وصف المشروع بالعربية"
                    dir="rtl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium uppercase tracking-wider theme-secondary-text mb-1">
                  Project Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--theme-primary)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--theme-primary)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-80"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Project preview"
                      className="h-40 w-full object-cover rounded-xl border border-[var(--theme-border)]"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full rounded-xl bg-[var(--theme-primary)] text-white font-semibold uppercase tracking-wider py-3 transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {uploading ? 'Uploading & Saving...' : 'Add Project'}
              </button>
            </form>
          </div>

          {/* Projects List */}
          <div className="rounded-2xl border border-[var(--theme-border)] theme-dark-surface theme-primary-text shadow-2xl p-6">
            <h2 className="text-xl font-semibold uppercase tracking-wider mb-6">
              Existing Projects ({projects.length})
            </h2>

            {projects.length === 0 ? (
              <p className="theme-secondary-text text-sm">No projects added yet.</p>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 rounded-xl border border-[var(--theme-border)] p-4"
                  >
                    <img
                      src={project.image_url}
                      alt={project.title_en}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{project.title_en}</p>
                      <p className="text-sm theme-secondary-text truncate">{project.title_ar}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(project.id)}
                      className="rounded-full border border-red-500/30 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
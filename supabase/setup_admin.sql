-- ============================================================
-- AGHSAN: Complete Supabase setup (run once in SQL Editor)
-- Ensures: projects table + RLS, project-images bucket + RLS,
--          and creates the admin auth user.
-- Safe to run multiple times (idempotent).
-- ============================================================

-- ------------------------------------------------------------
-- 1. PROJECTS TABLE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  category_en TEXT NOT NULL,
  category_ar TEXT NOT NULL,
  description_en TEXT DEFAULT '',
  description_ar TEXT DEFAULT '',
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read projects" ON public.projects;
CREATE POLICY "Public read projects" ON public.projects
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated insert projects" ON public.projects;
CREATE POLICY "Authenticated insert projects" ON public.projects
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated update projects" ON public.projects;
CREATE POLICY "Authenticated update projects" ON public.projects
  FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated delete projects" ON public.projects;
CREATE POLICY "Authenticated delete projects" ON public.projects
  FOR DELETE TO authenticated USING (true);

-- ------------------------------------------------------------
-- 2. PROJECT-IMAGES STORAGE BUCKET
-- ------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read project images" ON storage.objects;
CREATE POLICY "Public read project images" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Authenticated upload project images" ON storage.objects;
CREATE POLICY "Authenticated upload project images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Authenticated update project images" ON storage.objects;
CREATE POLICY "Authenticated update project images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Authenticated delete project images" ON storage.objects;
CREATE POLICY "Authenticated delete project images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'project-images');

-- ------------------------------------------------------------
-- 3. ADMIN AUTH USER
--    Change the email & password below to your admin login.
--    (Password will be hashed automatically by Supabase.)
--    If the user already exists, this does nothing.
-- ------------------------------------------------------------
DO $$
DECLARE
  admin_email TEXT := 'admin@aghsan.com';
  admin_password TEXT := 'ChangeThisPassword123!';
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = admin_email
  ) THEN
    PERFORM supabase_auth.admin.create_user(
      jsonb_build_object(
        'email', admin_email,
        'password', admin_password,
        'email_confirm', true
      )
    );
  END IF;
END $$;
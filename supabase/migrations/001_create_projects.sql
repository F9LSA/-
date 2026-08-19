-- Create projects table
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

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read projects" ON public.projects
  FOR SELECT USING (true);

-- Authenticated users can insert
CREATE POLICY "Authenticated insert projects" ON public.projects
  FOR INSERT TO authenticated WITH CHECK (true);

-- Authenticated users can update
CREATE POLICY "Authenticated update projects" ON public.projects
  FOR UPDATE TO authenticated USING (true);

-- Authenticated users can delete
CREATE POLICY "Authenticated delete projects" ON public.projects
  FOR DELETE TO authenticated USING (true);

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read project images" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated upload project images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Authenticated update project images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated delete project images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'project-images');
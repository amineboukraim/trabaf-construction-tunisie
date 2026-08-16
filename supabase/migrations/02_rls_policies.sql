-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ ACCESS
CREATE POLICY "Public read access for published projects" ON public.projects
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for active services" ON public.services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for settings" ON public.company_settings
  FOR SELECT USING (true);

-- 2. PUBLIC INSERT FOR MESSAGES (CONTACT FORM)
CREATE POLICY "Public insert access for contact messages" ON public.messages
  FOR INSERT WITH CHECK (true);

-- 3. ADMIN FULL ACCESS (AUTHENTICATED USERS)
CREATE POLICY "Admin full access for projects" ON public.projects
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access for services" ON public.services
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access for messages" ON public.messages
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access for settings" ON public.company_settings
  FOR ALL TO authenticated USING (true);

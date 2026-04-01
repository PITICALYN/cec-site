-- 1. Tabela de Matrículas (Enrollments)
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    course_name TEXT NOT NULL,
    status TEXT DEFAULT 'pending', 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabela de Leads/Contatos (Leads)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabela de Ouvidoria/Reclamações (Complaints)
CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT, 
    phone TEXT, 
    description TEXT NOT NULL,
    status TEXT DEFAULT 'unread', 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Segurança)
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Políticas de Inserção Pública
CREATE POLICY "Public enrollment insert" ON public.enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public lead insert" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public complaint insert" ON public.complaints FOR INSERT WITH CHECK (true);

-- Políticas de Gestão (Apenas Admins)
CREATE POLICY "Admin enrollment manage" ON public.enrollments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin lead manage" ON public.leads FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin complaint manage" ON public.complaints FOR ALL TO authenticated USING (true) WITH CHECK (true);

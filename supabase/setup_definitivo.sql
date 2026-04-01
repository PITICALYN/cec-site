-- SCRIPT DE CONFIGURAÇÃO REPETÍVEL (Setup Definitivo)
-- Use este script para garantir que o banco e o conteúdo estejam 100% corretos.

-- 1. Criação de Tabelas
CREATE TABLE IF NOT EXISTS public.site_content (
    id TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    course TEXT,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    type TEXT DEFAULT 'text',
    evaluation_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Segurança (RLS)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir leitura pública do conteúdo" ON public.site_content;
CREATE POLICY "Permitir leitura pública do conteúdo" ON public.site_content FOR SELECT USING (true);
DROP POLICY IF EXISTS "Permitir atualização para admins" ON public.site_content;
CREATE POLICY "Permitir atualização para admins" ON public.site_content FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Leitura pública de depoimentos aprovados" ON public.testimonials;
CREATE POLICY "Leitura pública de depoimentos aprovados" ON public.testimonials FOR SELECT USING (status = 'approved');
DROP POLICY IF EXISTS "Alunos podem inserir depoimentos" ON public.testimonials;
CREATE POLICY "Alunos podem inserir depoimentos" ON public.testimonials FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins controlam depoimentos" ON public.testimonials;
CREATE POLICY "Admins controlam depoimentos" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');

-- 3. Inserção de Dados (Usando Dollar Quoting $$ para evitar erro de aspas)
INSERT INTO public.site_content (id, data)
VALUES ('main-content', $$
{
  "navbar": {
    "logo": "CEC",
    "sublogo": "Engenharia",
    "logo_img": "logo_oficial.png",
    "links": ["Home", "Cursos", "Sobre Nós", "Contato"],
    "social": {
      "instagram": "https://www.instagram.com/cec_engenharia_capacitacao/",
      "linkedin": "https://linkedin.com/company/cec-engenharia"
    },
    "actions": {
      "login": "Acesso Aluno",
      "cta": "Matricule-se"
    }
  },
  "hero": {
    "badge": "CAPACITAÇÃO PROFISSIONAL",
    "title": "Domine a\nPrecisão Industrial.",
    "description": "Formação técnica especializada para o setor de engenharia, caldeiraria e montagem industrial com instrutores certificados e infraestrutura de ponta.",
    "cta": "Ver Cursos Disponíveis",
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    "cert_badge": "logo_abendi_new.png",
    "features": ["Certificação Reconhecida", "Infraestrutura Completa"],
    "cert_card": {
      "title": "CERTIFICAÇÃO RECONHECIDA",
      "text": "Diplomas válidos em todo território nacional."
    }
  }
}
$$)
ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;

INSERT INTO public.testimonials (name, course, content, status, evaluation_date)
VALUES 
('Ricardo Souza', 'Inspetor Dimensional', 'Curso excelente! A parte prática com a Estação Total mudou meu patamar profissional.', 'approved', '2026-02-15'),
('Mariana Costa', 'Caldeiraria e Tubulação', 'Instrutores de altíssimo nível. A CEC realmente prepara para o mercado.', 'approved', '2026-03-01')
ON CONFLICT DO NOTHING;

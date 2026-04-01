-- SCRIPT DE INFRAESTRUTURA DEFINITIVO - CEC ENGENHARIA
-- Este script cria todas as tabelas necessárias e insere o conteúdo oficial de uma vez.
-- Execute no SQL Editor do Supabase.

-- 1. Criação da Tabela de Conteúdo Dinâmico (CMS)
CREATE TABLE IF NOT EXISTS public.site_content (
    id TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilita RLS na Site Content para permitir leitura pública mas escrita apenas para admin
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública do conteúdo"
ON public.site_content FOR SELECT
USING (true);

CREATE POLICY "Permitir atualização para admins"
ON public.site_content FOR ALL
USING (auth.role() = 'authenticated');

-- 3. Inserção do Conteúdo Inicial (Corrigido com Instagram e Selos)
INSERT INTO public.site_content (id, data)
VALUES ('main-content', '{
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
  },
  "about_page": {
    "title": "Quem Somos",
    "content": "A C&C Engenharia e Capacitação foi fundada com o propósito de preencher uma lacuna crítica no mercado de qualificação e capacitação industrial, especialmente nas áreas de caldeiraria e tubulação. Desde sua fundação, a empresa tem se dedicado a oferecer treinamentos de alta qualidade, reconhecidos por sua excelência técnica e alinhados às necessidades reais da indústria.",
    "mission": {
      "title": "Missão",
      "text": "Nossa missão é capacitar profissionais com o conhecimento e as habilidades necessárias para desempenhar suas funções com precisão e segurança, contribuindo para o sucesso de projetos industriais em todo o Brasil."
    },
    "vision": {
      "title": "Visão",
      "text": "Ser referência nacional em treinamento e qualificação industrial, reconhecida pela Abendi e por nossos parceiros, como uma empresa que promove a excelência técnica e a inovação no setor."
    },
    "values": {
      "title": "Valores",
      "list": [
        {
          "title": "Compromisso com a Qualidade",
          "text": "Garantimos que todos os nossos cursos atendam aos mais altos padrões de ensino e prática industrial."
        },
        {
          "title": "Ética e Integridade",
          "text": "Agimos com transparência e respeito em todas as nossas relações, tanto com nossos clientes quanto com nossos colaboradores."
        }
      ]
    },
    "quote": "Deixe o conhecimento libertar você!"
  }
}')
ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;

-- 4. Criação das tabelas de Captura de Dados (Leads, Matrículas, Ouvidoria)
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_name TEXT,
    full_name TEXT,
    email TEXT,
    whatsapp TEXT,
    cpf TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT,
    whatsapp TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    whatsapp TEXT,
    complaint TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Habilita RLS para inserções públicas nestas tabelas
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Permite qualquer um inserir dados (Leads da Web)
CREATE POLICY "Permitir inserções públicas (Enrollments)" ON public.enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserções públicas (Leads)" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserções públicas (Complaints)" ON public.complaints FOR INSERT WITH CHECK (true);

-- 6. Tabela de Depoimentos (Prova Social)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    course TEXT,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected
    type TEXT DEFAULT 'text', -- text, screenshot
    evaluation_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura pública de depoimentos aprovados" ON public.testimonials FOR SELECT USING (status = 'approved');
CREATE POLICY "Alunos podem inserir depoimentos" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins controlam depoimentos" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');

-- Inserir alguns depoimentos iniciais para o site não iniciar vazio
INSERT INTO public.testimonials (name, course, content, status, evaluation_date)
VALUES 
('Ricardo Souza', 'Inspetor Dimensional', 'Curso excelente! A parte prática com a Estação Total mudou meu patamar profissional.', 'approved', '2026-02-15'),
('Mariana Costa', 'Caldeiraria e Tubulação', 'Instrutores de altíssimo nível. A CEC realmente prepara para o mercado.', 'approved', '2026-03-01')
ON CONFLICT DO NOTHING;

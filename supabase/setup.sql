-- 1. Criar a tabela de conteúdo do site
CREATE TABLE IF NOT EXISTS public.site_content (
    id TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar Row Level Security (Segurança por linha)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 3. Criar Políticas de Acesso
-- Permitir que qualquer pessoa leia o conteúdo
CREATE POLICY "Permitir leitura pública" 
ON public.site_content FOR SELECT 
USING (true);

-- Permitir que apenas usuários autenticados (Admins) editem o conteúdo
CREATE POLICY "Permitir edição apenas para admins" 
ON public.site_content FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 4. Inserir o Conteúdo Inicial (Copie o conteúdo do seu content.json aqui se quiser migrar agora)
INSERT INTO public.site_content (id, data)
VALUES ('main-content', '{
  "navbar": {
    "logo": "CEC",
    "sublogo": "Engenharia",
    "links": ["Home", "Cursos", "Sobre Nós", "Contato"],
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
    "features": ["Certificação Reconhecida", "Infraestrutura Completa"],
    "cert_card": {
      "title": "CERTIFICAÇÃO RECONHECIDA",
      "text": "Diplomas válidos em todo território nacional."
    }
  },
  "courses_section": {
    "title": "Nossas Formações",
    "subtitle": "Programas intensivos desenhados para suprir a demanda de profissionais qualificados em inspeção e medição industrial.",
    "courses": [
      {
        "id": 1,
        "title": "Inspetor Dimensional de Caldeiraria e Tubulação (CD-CL)",
        "description": "Capacitação completa para profissionais de controle de qualidade, focada em normas técnicas e medições de precisão em estruturas metálicas.",
        "duration": "100 Horas",
        "type": "Presencial + Híbrido",
        "category": "MAIS PROCURADO"
      },
      {
        "id": 2,
        "title": "Estação Total Aplicado a Caldeiraria",
        "description": "Treinamento avançado em medições tridimensionais e locação industrial utilizando equipamentos de topografia de alta precisão.",
        "duration": "80 Horas",
        "type": "Equipamento Incluso",
        "category": "ESPECIALIZAÇÃO"
      },
      {
        "id": 3,
        "title": "Controle Dimensional - CD-CM",
        "description": "Especialização em controle dimensional com foco em Máquinas de Medir por Coordenadas (MMC), garantindo precisão milimétrica.",
        "duration": "60 Horas",
        "type": "Tecnologia MMC",
        "category": "ESPECIALIZAÇÃO"
      },
      {
        "id": 4,
        "title": "Controle Dimensional - CD-TO",
        "description": "Domine técnicas de alinhamento e nivelamento industrial utilizando Teodolito e Optical Tooling para grandes montagens.",
        "duration": "90 Horas",
        "type": "Alinhamento Óptico",
        "category": "ESPECIALIZAÇÃO"
      }
    ]
  },
  "stats": {
    "grid": [
      {"label": "ANOS DE MERCADO", "value": "15+"},
      {"label": "ALUNOS FORMADOS", "value": "2k+"},
      {"label": "APROVAÇÃO", "value": "98%"},
      {"label": "FOCO PRÁTICO", "value": "100%"}
    ],
    "title": "Excelência Técnica que Abre Portas",
    "description": "Na CEC Engenharia, não entregamos apenas certificados. Preparamos o profissional para os desafios reais do canteiro de obras e da indústria pesada.",
    "benefits": [
      "Instrutores Experientes: Atuantes nos maiores projetos petrolíferos e indústrias do país.",
      "Material Didático Exclusivo: Conteúdo atualizado com as últimas normas ABNT e internacionais."
    ]
  },
  "cta_section": {
    "title": "Pronto para elevar sua carreira técnica?",
    "text": "Inscreva-se hoje e garanta sua vaga na próxima turma. Condições especiais para grupos e empresas.",
    "buttons": ["Quero me Matricular", "Falar com Consultor"]
  },
  "footer": {
    "brand_desc": "Referência em capacitação técnica e soluções de engenharia para o setor industrial.",
    "newsletter": {
      "title": "Newsletter",
      "text": "Receba novidades sobre novos treinamentos e cursos."
    },
    "copyright": "© 2026 CEC Engenharia e Capacitação. Todos os direitos reservados."
  }
}')
ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;

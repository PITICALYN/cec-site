-- ATUALIZAÇÃO CRÍTICA DE CONTEÚDO (Sincronização Código vs Banco de Dados)
-- Execute este script no SQL Editor do Supabase para aplicar os novos links e imagens.

UPDATE public.site_content
SET data = '{
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
    "title": "Domine a Precision Industrial.",
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
}'::jsonb
WHERE id = 'main-content';

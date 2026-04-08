import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Lendo as variáveis do .env manualmente para o script de node
const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/VITE_SUPABASE_URL=(.*)/)[1].trim();
const key = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(url, key);

async function createMaster() {
  const email = 'webdesigner@cec.com.br';
  const password = 'cec@admin2026';

  console.log(`Tentando cadastrar ${email}...`);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: 'admin' }
    }
  });

  if (error) {
    if (error.message.includes('already registered')) {
      console.log('Aviso: O usuário já existe. Se não consegue logar, a senha está errada. Você pode resetá-la no painel do Supabase.');
    } else {
      console.error('Erro:', error.message);
    }
  } else {
    console.log('Sucesso! Webdesigner cadastrado.');
    console.log('E-mail:', email);
    console.log('Senha:', password);
  }
}

createMaster();

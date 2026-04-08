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
    if (error.message.includes('already registered') || error.message.includes('Email already in use')) {
      console.log('✅ O usuário já existe no banco do Supabase.');
      console.log('Se você está recebendo "Credenciais Inválidas", pode ser que a senha original no banco não seja "cec@admin2026".');
      console.log('Nesse caso, você deve ir no painel do Supabase -> Authentication -> Users e clicar em "Reset Password".');
    } else {
      console.error('❌ Erro:', error.message);
    }
  } else {
    console.log('🎉 SUCESSO! Webdesigner cadastrado com a senha: cec@admin2026');
  }
}

createMaster();

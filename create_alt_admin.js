import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/VITE_SUPABASE_URL=(.*)/)[1].trim();
const key = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(url, key);

async function createAdmin() {
  const email = 'admin@cec.com.br';
  const password = 'CEC@admin2026!';

  console.log(`Tentando cadastrar ${email}...`);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: 'admin' }
    }
  });

  if (error) {
    console.error('Erro:', error.message);
  } else {
    console.log('🎉 SUCESSO! Admin criado.');
    console.log('E-mail:', email);
    console.log('Senha:', password);
  }
}

createAdmin();

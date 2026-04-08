import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/VITE_SUPABASE_URL=(.*)/)[1].trim();
const key = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(url, key);

async function createUsers() {
  const users = [
    { email: 'webdesigner@cec.com.br', password: 'CEC@admin2026!' },
    { email: 'admin@cec.com.br',       password: 'CEC@admin2026!' },
  ];

  for (const u of users) {
    const { data, error } = await supabase.auth.signUp({
      email: u.email,
      password: u.password,
      options: { data: { role: 'admin' } }
    });

    if (error) {
      console.log(`❌ Erro ao criar ${u.email}: ${error.message}`);
    } else {
      console.log(`✅ Criado: ${u.email}`);
    }
  }

  console.log('\n--- TESTANDO LOGIN WEBDESIGNER ---');
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: 'webdesigner@cec.com.br',
    password: 'CEC@admin2026!'
  });

  if (loginError) {
    console.log('❌ Login ainda falhou:', loginError.message);
  } else {
    console.log('🎉 LOGIN FUNCIONANDO! Webdesigner autenticado com sucesso.');
  }
}

createUsers();

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/VITE_SUPABASE_URL=(.*)/)[1].trim();
const key = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(url, key);

async function testLogin() {
  const email = 'webdesigner@cec.com.br';
  const password = 'cec@admin2026';

  console.log(`Testando login para ${email}...`);
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('❌ ERRO DETALHADO DO SUPABASE:', error.message);
    if (error.message.includes('Email not confirmed')) {
      console.log('---');
      console.log('DIAGNÓSTICO: O e-mail não foi confirmado. Você PRECISA desativar "Confirm Email" nas configurações do Supabase.');
    }
  } else {
    console.log('✅ LOGIN BATEU! O problema pode ser no cache do seu navegador ou no redirecionamento.');
  }
}

testLogin();

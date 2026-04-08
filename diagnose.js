import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/VITE_SUPABASE_URL=(.*)/)[1].trim();
const key = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1].trim();

console.log('URL:', url);
console.log('Key (primeiros 20 chars):', key.substring(0, 20) + '...');

const supabase = createClient(url, key);

async function diagnose() {
  console.log('\n--- TESTANDO CONEXÃO ---');
  
  // Teste 1: Checar se o projeto está online
  try {
    const { data, error } = await supabase.from('site_content').select('id').limit(1);
    if (error) {
      console.log('❌ Erro na tabela site_content:', error.message);
      console.log('Código:', error.code);
    } else {
      console.log('✅ Conexão com banco OK');
    }
  } catch (e) {
    console.log('❌ Erro de conexão total:', e.message);
  }

  // Teste 2: Checar auth
  try {
    const { data: { session } } = await supabase.auth.getSession();
    console.log('\n--- TESTANDO AUTH ---');
    console.log('Sessão atual:', session ? 'Logado' : 'Nenhuma sessão');
  } catch (e) {
    console.log('❌ Erro no Auth:', e.message);
  }

  // Teste 3: Tentar fazer signup
  console.log('\n--- TESTANDO SIGN UP ---');
  const testEmail = `test_${Date.now()}@temp.com`;
  const { data, error } = await supabase.auth.signUp({
    email: testEmail,
    password: 'Test@123456'
  });
  
  if (error) {
    console.log('❌ Erro no signUp:', error.message);
    console.log('Status:', error.status);
  } else {
    console.log('✅ SignUp funcionou! Usuário de teste criado:', testEmail);
    console.log('Email Confirmado?', data.user?.email_confirmed_at ? 'SIM' : 'NÃO - precisa confirmar e-mail');
  }
}

diagnose();

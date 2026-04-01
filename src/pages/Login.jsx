import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { LogIn, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Implementando login via Supabase Auth
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;
      
      // Lógica de Redirecionamento
      if (data.user.email === 'webdesigner@cec.com.br') {
        console.log("Acesso Webdesigner - Modo Edição Habilitado");
        navigate('/');
      } else {
        // Aluno - Futuramente redirecionar para o outro sistema
        // Por enquanto, vamos manter na Home logado
        console.log("Acesso Aluno - Redirecionando para Dashboard");
        navigate('/'); 
      }
    } catch (err) {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-login">
            <span className="logo-text">CEC</span>
            <span className="logo-subtext">Engenharia</span>
          </div>
          <h1>Área Administrativa</h1>
          <p>Faça login para gerenciar o conteúdo</p>
        </div>

        {error && (
          <div className="login-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>E-mail</label>
            <input 
              type="email" 
              placeholder="seu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-login-submit" disabled={loading}>
            {loading ? 'Entrando...' : (
              <>
                <LogIn size={20} />
                Entrar no Sistema
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>CEC Engenharia & Capacitação © 2026</p>
        </div>
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          padding: 2rem;
        }
        .login-card {
          width: 100%;
          max-width: 450px;
          background: white;
          padding: 3rem;
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }
        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .logo-login {
          display: flex;
          flex-direction: column;
          line-height: 1;
          margin-bottom: 2rem;
        }
        .logo-login .logo-text {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
          letter-spacing: 1px;
        }
        .logo-login .logo-subtext {
          font-size: 0.9rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .login-header h1 {
          font-size: 1.5rem;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        .login-header p {
          color: #64748b;
          font-size: 0.95rem;
        }
        .login-error {
          background: #fef2f2;
          border: 1px solid #fee2e2;
          color: #ef4444;
          padding: 1rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #475569;
        }
        .form-group input {
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #cbd5e1;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-group input:focus {
          border-color: var(--primary);
        }
        .btn-login-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: var(--primary);
          color: white;
          padding: 1rem;
          border-radius: 0.75rem;
          font-weight: 700;
          transition: background 0.2s;
          margin-top: 1rem;
        }
        .btn-login-submit:hover {
          background: var(--primary-dark);
        }
        .btn-login-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .login-footer {
          margin-top: 3rem;
          text-align: center;
          font-size: 0.8rem;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Login;

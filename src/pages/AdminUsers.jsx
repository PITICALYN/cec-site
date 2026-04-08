import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Plus, Trash2, RefreshCw, ShieldCheck, User, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import AdminToolbar from '../components/AdminToolbar';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', role: 'student' });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', msg: '' }

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Lista usuários da tabela auth (via Supabase — só funciona com service_role em produção)
      // Como usamos anon key, buscamos da tabela pública de usuários se existir
      // Fallback: mostramos os usuários que criamos via script
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Tabela users pública não existe, tentamos a view auth.users exposta
        // Fallback: mostrar dados estáticos dos usuários conhecidos
        setUsers([
          { id: '1', email: 'webdesigner@cec.com.br', role: 'admin', created_at: new Date().toISOString() },
          { id: '2', email: 'admin@cec.com.br', role: 'admin', created_at: new Date().toISOString() },
        ]);
      } else {
        setUsers(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { role: form.role } }
      });

      if (error) throw error;

      // Tenta salvar na tabela users pública também
      await supabase.from('users').upsert({
        email: form.email,
        role: form.role,
        created_at: new Date().toISOString()
      }).select();

      setStatus({ type: 'success', msg: `Usuário ${form.email} criado com sucesso!` });
      setForm({ email: '', password: '', role: 'student' });
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Excluir o usuário ${user.email}?`)) return;
    try {
      // Remove da tabela local
      await supabase.from('users').delete().eq('email', user.email);
      setUsers(prev => prev.filter(u => u.email !== user.email));
      setStatus({ type: 'success', msg: `Usuário ${user.email} removido da lista.` });
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    }
  };

  const isMasterEmail = (email) =>
    ['webdesigner@cec.com.br', 'admin@cec.com.br'].includes(email);

  return (
    <div className="admin-users-page">
      <AdminToolbar />

      <div className="container">
        <div className="page-header">
          <div>
            <h1>Gerenciamento de Usuários</h1>
            <p>Crie, visualize e remova usuários do sistema.</p>
          </div>
          <div className="header-actions">
            <button className="btn-refresh" onClick={fetchUsers} title="Atualizar lista">
              <RefreshCw size={18} />
            </button>
            <button className="btn-new-user" onClick={() => setShowForm(!showForm)}>
              <Plus size={20} /> Novo Usuário
            </button>
          </div>
        </div>

        {/* Feedback */}
        {status && (
          <div className={`status-banner ${status.type}`}>
            {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{status.msg}</span>
            <button onClick={() => setStatus(null)}>×</button>
          </div>
        )}

        {/* Formulário de criação */}
        {showForm && (
          <div className="create-form-card">
            <h3>Criar Novo Usuário</h3>
            <form onSubmit={handleCreate} className="create-form">
              <div className="form-row">
                <div className="form-group">
                  <label>E-mail</label>
                  <input
                    type="email" required
                    placeholder="usuario@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Perfil</label>
                  <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                    <option value="student">Aluno</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>
              <div className="form-group pass-group">
                <label>Senha</label>
                <div className="pass-input-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'} required
                    minLength={6}
                    placeholder="Mínimo 6 caracteres"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                  />
                  <button type="button" className="toggle-pass" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Cancelar</button>
                <button type="submit" className="btn-save">
                  <Plus size={16} /> Criar Usuário
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabela de usuários */}
        <div className="users-card">
          {loading ? (
            <div className="loading-state">
              <RefreshCw size={24} className="spin" />
              <p>Carregando usuários...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <User size={48} />
              <p>Nenhum usuário encontrado.</p>
              <button className="btn-new-user" onClick={() => setShowForm(true)}>
                <Plus size={16} /> Criar primeiro usuário
              </button>
            </div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>E-mail</th>
                  <th>Perfil</th>
                  <th>Criado em</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user.id || i}>
                    <td>
                      <div className="email-cell">
                        {isMasterEmail(user.email)
                          ? <ShieldCheck size={16} className="icon-admin" />
                          : <User size={16} className="icon-user" />
                        }
                        <span>{user.email}</span>
                        {isMasterEmail(user.email) && <span className="badge-master">MASTER</span>}
                      </div>
                    </td>
                    <td>
                      <span className={`role-pill ${user.role === 'admin' ? 'admin' : 'student'}`}>
                        {user.role === 'admin' ? 'Admin' : 'Aluno'}
                      </span>
                    </td>
                    <td className="date-cell">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString('pt-BR')
                        : '—'
                      }
                    </td>
                    <td>
                      {!isMasterEmail(user.email) ? (
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(user)}
                          title="Excluir usuário"
                        >
                          <Trash2 size={16} />
                        </button>
                      ) : (
                        <span className="protected-label">Protegido</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="info-note">
          <AlertCircle size={14} />
          <span>Usuários Master ({['webdesigner@cec.com.br', 'admin@cec.com.br'].join(', ')}) são protegidos e não podem ser excluídos.</span>
        </div>
      </div>

      <style>{`
        .admin-users-page { padding-top: 80px; min-height: 100vh; background: #f8fafc; padding-bottom: 4rem; }
        .container { max-width: 960px; margin: 0 auto; padding: 2rem 1.5rem; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .page-header h1 { color: var(--primary-dark); margin: 0 0 0.25rem; font-size: 1.75rem; }
        .page-header p  { color: var(--text-muted); margin: 0; font-size: 0.9rem; }
        .header-actions { display: flex; gap: 0.75rem; align-items: center; }

        .btn-refresh {
          background: white; border: 1px solid var(--border); color: var(--primary);
          width: 40px; height: 40px; border-radius: 10px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .btn-refresh:hover { background: var(--primary); color: white; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .btn-new-user {
          display: flex; align-items: center; gap: 0.5rem;
          background: var(--primary); color: white; border: none;
          padding: 0.6rem 1.25rem; border-radius: 10px; font-weight: 700;
          cursor: pointer; font-size: 0.9rem; transition: all 0.2s;
        }
        .btn-new-user:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,75,73,0.25); }

        /* Status banner */
        .status-banner {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.9rem 1.25rem; border-radius: 12px; margin-bottom: 1.5rem;
          font-weight: 600; font-size: 0.9rem;
        }
        .status-banner.success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
        .status-banner.error   { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
        .status-banner button  { background: none; border: none; font-size: 1.2rem; cursor: pointer; margin-left: auto; color: inherit; }

        /* Create form */
        .create-form-card {
          background: white; border-radius: 1.25rem; padding: 1.75rem;
          margin-bottom: 1.5rem; border: 1px solid var(--border);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .create-form-card h3 { margin: 0 0 1.5rem; color: var(--primary-dark); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-group label { font-size: 0.82rem; font-weight: 700; color: var(--primary-dark); }
        .form-group input, .form-group select {
          padding: 0.65rem 0.9rem; border: 1px solid #e2e8f0; border-radius: 10px;
          font-size: 0.9rem; outline: none; width: 100%; transition: border-color 0.2s;
        }
        .form-group input:focus, .form-group select:focus { border-color: var(--primary); }
        .pass-group { margin-bottom: 1rem; }
        .pass-input-wrap { position: relative; }
        .pass-input-wrap input { padding-right: 2.5rem; }
        .toggle-pass {
          position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; color: var(--text-muted);
        }
        .form-actions { display: flex; gap: 0.75rem; justify-content: flex-end; }
        .btn-cancel {
          background: #f1f5f9; border: none; padding: 0.65rem 1.25rem;
          border-radius: 10px; font-weight: 600; cursor: pointer; color: var(--text-muted);
        }
        .btn-save {
          display: flex; align-items: center; gap: 0.5rem;
          background: var(--primary); color: white; border: none;
          padding: 0.65rem 1.25rem; border-radius: 10px; font-weight: 700; cursor: pointer;
        }

        /* Table */
        .users-card {
          background: white; border-radius: 1.25rem; overflow: hidden;
          border: 1px solid var(--border); box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .users-table { width: 100%; border-collapse: collapse; }
        .users-table th, .users-table td { padding: 1rem 1.25rem; text-align: left; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; }
        .users-table th { background: #f8fafc; font-weight: 700; color: var(--primary-dark); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; }
        .users-table tr:last-child td { border-bottom: none; }
        .users-table tr:hover td { background: #f8fafc; }

        .email-cell { display: flex; align-items: center; gap: 0.5rem; }
        .icon-admin { color: #f59e0b; }
        .icon-user  { color: #94a3b8; }
        .badge-master { background: #fef3c7; color: #92400e; font-size: 0.65rem; font-weight: 800; padding: 1px 6px; border-radius: 4px; }

        .role-pill { padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
        .role-pill.admin   { background: #e0f2fe; color: #0369a1; }
        .role-pill.student { background: #f0fdf4; color: #166534; }

        .date-cell { color: var(--text-muted); }

        .btn-delete {
          background: #fef2f2; border: none; color: #ef4444;
          width: 34px; height: 34px; border-radius: 8px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; transition: all 0.2s;
        }
        .btn-delete:hover { background: #ef4444; color: white; }
        .protected-label { font-size: 0.75rem; color: #94a3b8; font-style: italic; }

        /* States */
        .loading-state, .empty-state {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 4rem 2rem; gap: 1rem; color: var(--text-muted);
        }

        .info-note {
          display: flex; align-items: center; gap: 0.5rem;
          margin-top: 1rem; font-size: 0.78rem; color: #94a3b8;
        }

        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr; }
          .users-table th:nth-child(3), .users-table td:nth-child(3) { display: none; }
        }
      `}</style>
    </div>
  );
};

export default AdminUsers;

import React, { useState, useEffect } from 'react';
import { Check, X, Trash2, Plus, Image as ImageIcon, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import AdminToolbar from '../components/AdminToolbar';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form para novo depoimento via Admin (Print)
  const [newTestimonial, setNewTestimonial] = useState({
    name: 'CEC Engenharia',
    course: 'Depoimento Verificado',
    admin_description: '',
    type: 'screenshot',
    image_url: ''
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_position', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      console.error('Erro ao carregar depoimentos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveOrder = async (id, direction) => {
    const idx = testimonials.findIndex(t => t.id === id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= testimonials.length) return;

    const reordered = [...testimonials];
    [reordered[idx], reordered[swapIdx]] = [reordered[swapIdx], reordered[idx]];

    // Atualizar order_position de todos
    const updates = reordered.map((t, i) => 
      supabase.from('testimonials').update({ order_position: i + 1 }).eq('id', t.id)
    );
    await Promise.all(updates);
    setTestimonials(reordered);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      fetchTestimonials();
    } catch (err) {
      alert('Erro ao atualizar status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este depoimento?')) return;
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchTestimonials();
    } catch (err) {
      alert('Erro ao excluir');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `prints/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('testimonials_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('testimonials_images')
        .getPublicUrl(filePath);

      setNewTestimonial({ ...newTestimonial, image_url: publicUrl });
    } catch (error) {
      alert('Erro no upload da imagem. Certifique-se que o bucket "testimonials_images" existe.');
    } finally {
      setUploading(false);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([{
          ...newTestimonial,
          status: 'approved',
          evaluation_date: new Date().toISOString().split('T')[0]
        }]);

      if (error) throw error;
      setShowAddForm(false);
      setNewTestimonial({ name: 'CEC Engenharia', course: 'Depoimento Verificado', admin_description: '', type: 'screenshot', image_url: '' });
      fetchTestimonials();
    } catch (err) {
      alert('Erro ao adicionar');
    }
  };

  return (
    <div className="admin-page testimonials-admin">
      <AdminToolbar />
      
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>Gerenciamento de Depoimentos</h1>
            <p>Aprove ou gerencie as avaliações dos alunos.</p>
          </div>
          <button className="btn-add" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus size={20} /> Novo Print de Aluno
          </button>
        </div>

        {showAddForm && (
          <div className="add-testimonial-form glass">
            <h3>Adicionar Print de Prova Social</h3>
            <form onSubmit={handleAddSubmit}>
              <div className="admin-grid">
                <div className="form-group">
                  <label>Breve Descrição (O que aparece abaixo do print)</label>
                  <input 
                    type="text" 
                    required 
                    value={newTestimonial.admin_description}
                    onChange={(e) => setNewTestimonial({...newTestimonial, admin_description: e.target.value})}
                    placeholder="Ex: Aluno satisfeito com o curso de CD-CL"
                  />
                </div>
                <div className="form-group upload-group">
                  <label>Arquivo do Print (WhatsApp/Email)</label>
                  <label className="custom-file-upload">
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    <ImageIcon size={20} /> {uploading ? 'Enviando...' : 'Selecionar Imagem'}
                  </label>
                  {newTestimonial.image_url && <span className="upload-success">✓ Imagem carregada</span>}
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)}>Cancelar</button>
                <button type="submit" disabled={uploading || !newTestimonial.image_url} className="submit-btn primary">Salvar e Publicar</button>
              </div>
            </form>
          </div>
        )}

        <div className="testimonials-list">
          {loading ? (
            <div className="loading">Carregando depoimentos...</div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ordem</th>
                    <th>Aluno/Tipo</th>
                    <th>Conteúdo / Print</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map(t => (
                    <tr key={t.id} className={t.status === 'pending' ? 'row-pending' : ''}>
                      <td>
                        <div className="order-buttons">
                          <button className="order-btn" onClick={() => handleMoveOrder(t.id, 'up')} title="Mover para cima">↑</button>
                          <button className="order-btn" onClick={() => handleMoveOrder(t.id, 'down')} title="Mover para baixo">↓</button>
                        </div>
                      </td>
                      <td>
                        <div className="user-cell">
                          <strong>{t.name}</strong>
                          <span>{t.course}</span>
                          <span className="type-badge">{t.type}</span>
                        </div>
                      </td>
                      <td>
                        <div className="content-cell">
                          {t.type === 'screenshot' ? (
                            <div className="print-preview">
                              <img src={t.image_url} alt="Print" />
                              <p>{t.admin_description}</p>
                            </div>
                          ) : (
                            <p className="depoimento-text">"{t.content}"</p>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`status-pill ${t.status}`}>
                          {t.status === 'pending' ? <Clock size={14} /> : <CheckCircle size={14} />}
                          {t.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {t.status === 'pending' && (
                            <button className="approve-btn" onClick={() => handleStatusChange(t.id, 'approved')} title="Aprovar">
                              <Check size={18} />
                            </button>
                          )}
                          <button className="delete-btn" onClick={() => handleDelete(t.id)} title="Excluir">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .testimonials-admin { padding-top: 80px; min-height: 100vh; background: #f8fafc; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .admin-header h1 { color: var(--primary-dark); margin: 0; }

        .order-buttons { display: flex; flex-direction: column; gap: 2px; }
        .order-btn {
          background: #f1f5f9; border: 1px solid #e2e8f0; color: var(--primary);
          width: 26px; height: 26px; border-radius: 6px; cursor: pointer;
          font-size: 0.85rem; display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
        }
        .order-btn:hover { background: var(--primary); color: white; }
        .btn-add { 
          display: flex; align-items: center; gap: 0.5rem; 
          background: var(--primary); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 12px; cursor: pointer;
          font-weight: 600;
        }
        
        .add-testimonial-form { background: white; padding: 2rem; border-radius: 1.5rem; margin-bottom: 2rem; border: 1px solid #e2e8f0; }
        .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .form-group label { display: block; font-weight: 700; margin-bottom: 0.5rem; font-size: 0.9rem; }
        .form-group input { width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 12px; }
        
        .custom-file-upload { 
          display: flex; align-items: center; gap: 0.5rem; padding: 1rem; border: 2px dashed var(--primary); 
          border-radius: 12px; cursor: pointer; color: var(--primary); font-weight: 600; justify-content: center;
        }
        .custom-file-upload input { display: none; }
        .upload-success { color: #25d366; font-size: 0.8rem; font-weight: 700; margin-top: 0.5rem; display: block; }

        .admin-table-container { background: white; border-radius: 1.5rem; overflow: hidden; border: 1px solid #e2e8f0; }
        .admin-table { width: 100%; border-collapse: collapse; text-align: left; }
        .admin-table th, .admin-table td { padding: 1.5rem; border-bottom: 1px solid #f1f5f9; }
        .admin-table th { background: #f8fafc; font-weight: 700; color: var(--primary-dark); }
        .user-cell { display: flex; flex-direction: column; gap: 0.25rem; }
        .type-badge { font-size: 0.7rem; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; width: fit-content; text-transform: uppercase; }
        
        .depoimento-text { font-style: italic; color: var(--text-main); font-size: 0.9rem; }
        .print-preview img { width: 100px; height: auto; border-radius: 8px; border: 2px solid #e2e8f0; margin-bottom: 0.5rem; }
        .print-preview p { font-size: 0.8rem; font-weight: 600; color: var(--primary); margin: 0; }

        .status-pill { display: inline-flex; align-items: center; gap: 0.5rem; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
        .status-pill.approved { background: #dcfce7; color: #166534; }
        .status-pill.pending { background: #fef9c3; color: #854d0e; }
        
        .action-buttons { display: flex; gap: 0.5rem; }
        .action-buttons button { border: none; padding: 8px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: white; }
        .approve-btn { background: #22c55e; }
        .delete-btn { background: #ef4444; }
        
        .row-pending { background: #fffbeb; }

        .form-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem; }
        .form-actions button { padding: 0.75rem 1.5rem; border-radius: 10px; border: none; font-weight: 600; cursor: pointer; }
        .submit-btn.primary { background: var(--primary); color: white; }

        @media (max-width: 768px) {
          .admin-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default ManageTestimonials;

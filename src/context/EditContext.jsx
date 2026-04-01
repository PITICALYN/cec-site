import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import initialContent from '../data/content.json';

const EditContext = createContext();

export const useEdit = () => useContext(EditContext);

export const EditProvider = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(initialContent);

  // 1. Carregar Sessão e Dados Iniciais
  useEffect(() => {
    // Monitorar Mudanças de Autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Buscar Conteúdo do Banco de Dados
    fetchSiteContent();

    return () => subscription.unsubscribe();
  }, []);

  const fetchSiteContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('data')
        .eq('id', 'main-content')
        .single();

      if (error) {
        console.warn('Usando conteúdo local (tabela site_content não encontrada ou vazia).');
      } else if (data && data.data) {
        // Fusão inteligente: mantém o que tem no local e sobrepõe apenas o que vem do banco
        setContent(prev => ({
          ...prev,
          ...data.data
        }));
      }
    } catch (err) {
      console.error('Erro ao buscar conteúdo:', err);
    }
  };

  const updateContent = (path, value) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const addItemToList = (path, newItem) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      const list = current[keys[keys.length - 1]];
      if (Array.isArray(list)) {
        list.push({ ...newItem, id: Date.now() });
      }
      return newContent;
    });
  };

  const removeItemFromList = (path, index) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      const list = current[keys[keys.length - 1]];
      if (Array.isArray(list)) {
        list.splice(index, 1);
      }
      return newContent;
    });
  };

  const saveChanges = async () => {
    if (!user) {
      alert('Você precisa estar logado para salvar as alterações.');
      return;
    }

    try {
      // Salvar no Supabase (tabela site_content)
      const { error } = await supabase
        .from('site_content')
        .upsert({ id: 'main-content', data: content });

      if (error) throw error;

      setIsEditing(false);
      alert('Site atualizado com sucesso no banco de dados!');
    } catch (err) {
      console.error('Erro ao salvar no banco:', err);
      // Fallback para localStorage se o banco falhar
      localStorage.setItem('cec_content_backup', JSON.stringify(content));
      alert('Erro ao salvar no servidor. Uma cópia de emergência foi salva no seu navegador.');
    }
  };

  const discardChanges = () => {
    fetchSiteContent();
    setIsEditing(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsEditing(false);
    window.location.href = '/';
  };

  const toggleEditing = () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setIsEditing(!isEditing);
  };

  // Verificação de Master User (Webdesigner)
  const isMaster = user?.email === 'webdesigner@cec.com.br';

  return (
    <EditContext.Provider value={{ 
      user,
      isAdmin: !!user,
      isMaster,
      isEditing, 
      content, 
      updateContent, 
      saveChanges, 
      discardChanges,
      toggleEditing,
      logout,
      loading
    }}>
      {children}
    </EditContext.Provider>
  );
};

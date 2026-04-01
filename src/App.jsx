import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EditProvider } from './context/EditContext';
import Home from './pages/Home';
import Login from './pages/Login';
import ManageUsers from './pages/ManageUsers';
import ManageTestimonials from './pages/ManageTestimonials';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <EditProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Painel de Edição Protegido */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />

        {/* Gestão de Usuários (Apenas Master Admin) */}
        <Route 
          path="/admin/usuarios" 
          element={
            <ProtectedRoute requireMaster={true}>
              <ManageUsers />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </EditProvider>
  );
}

export default App;

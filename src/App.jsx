import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EditProvider } from './context/EditContext';
import Home from './pages/Home';
import Login from './pages/Login';
import ManageTestimonials from './pages/ManageTestimonials';
import AdminUsers from './pages/AdminUsers';
import ProtectedRoute from './components/ProtectedRoute';

// Novas Páginas Institucionais e de Conversão
import AboutUs from './pages/AboutUs';
import Enrollment from './pages/Enrollment';
import Contact from './pages/Contact';
import Complaint from './pages/Complaint';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

import AdminToolbar from './components/AdminToolbar';

function App() {
  return (
    <EditProvider>
      <AdminToolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Páginas Públicas Institucionais */}
        <Route path="/sobre-nos" element={<AboutUs />} />
        <Route path="/matricula" element={<Enrollment />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/ouvidoria" element={<Complaint />} />
        <Route path="/termos" element={<Terms />} />
        <Route path="/privacidade" element={<Privacy />} />

        {/* Painel Administrativo de Depoimentos */}
        <Route 
          path="/admin/testimonials" 
          element={
            <ProtectedRoute>
              <ManageTestimonials />
            </ProtectedRoute>
          } 
        />

        {/* Gestão de Usuários (Apenas Master Admin) */}
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute requireMaster={true}>
              <AdminUsers />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </EditProvider>
  );
}

export default App;

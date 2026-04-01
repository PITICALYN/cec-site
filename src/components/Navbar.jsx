import React from 'react';
import { User, Menu } from 'lucide-react';
import { useEdit } from '../context/EditContext';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

const Navbar = () => {
  const { content } = useEdit();
  const { navbar } = content;

  return (
    <nav className="glass sticky-nav">
      <div className="container nav-content">
        <div className="logo-container-liquid">
          <EditableImage 
            path="navbar.logo_img" 
            initialValue={navbar.logo_img} 
            className="logo-img-main"
            alt="CEC Engenharia Logo"
          />
        </div>
        
        {/* Menu e outras ações permanecem os mesmos */}
        <ul className="nav-links">
          {navbar.links.map((link, index) => (
            <li key={index}>
              <a href={`#${link.toLowerCase().replace(/\s+/g, '')}`}>
                <EditableText 
                  path={`navbar.links.${index}`} 
                  initialValue={link} 
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href="#" className="btn-login">
            <User size={18} />
            <EditableText 
              path="navbar.actions.login" 
              initialValue={navbar.actions.login} 
            />
          </a>
          <button className="btn-primary">
            <EditableText 
              path="navbar.actions.cta" 
              initialValue={navbar.actions.cta} 
            />
          </button>
          <button className="mobile-menu">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .sticky-nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          height: 90px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        
        /* Efeito Liquid Glass no Logo */
        .logo-container-liquid {
          position: relative;
          padding: 8px;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(15px) saturate(160%);
          -webkit-backdrop-filter: blur(15px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1),
                    inset 0 0 10px rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 160px;
          height: 65px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .logo-container-liquid:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          background: rgba(255, 255, 255, 0.5);
        }
        
        :global(.logo-img-main) {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain !important;
          mix-blend-mode: multiply; /* Mescla fundos brancos do PNG se houver */
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        .nav-links a {
          font-weight: 500;
          color: var(--text-main);
          font-size: 0.95rem;
        }
        .nav-links a:hover {
          color: var(--primary);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .btn-login {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--primary);
        }
        .mobile-menu {
          display: none;
          color: var(--primary);
        }

        @media (max-width: 968px) {
          .nav-links, .btn-login {
            display: none;
          }
          .mobile-menu {
            display: block;
          }
          .logo-container-liquid {
            width: 130px;
            height: 55px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

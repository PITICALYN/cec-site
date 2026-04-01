import { Link } from 'react-router-dom';
import { User, Menu, Camera, Share2 } from 'lucide-react';
import { useEdit } from '../context/EditContext';
import EditableText from './EditableText';
import EditableSlot from './EditableSlot';

const Navbar = () => {
  const { content } = useEdit();
  const { navbar } = content;

  return (
    <nav className="glass sticky-nav">
      <div className="container nav-content">
        <div className="logo-container-liquid">
          <EditableSlot 
            path="navbar.logo_img" 
            initialValue={navbar.logo_img} 
            className="logo-img-main"
            tagName="h1"
            style={{ 
              fontSize: '1.5rem', 
              fontWeight: '800', 
              color: 'var(--primary)',
              margin: '0',
              textAlign: 'center',
              width: '100%'
            }}
          />
        </div>
        
        <ul className="nav-links">
          {navbar.links.map((link, index) => (
            <li key={index}>
              <Link to={link === 'Home' ? '/' : `/${link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')}`}>
                <EditableText 
                  path={`navbar.links.${index}`} 
                  initialValue={link} 
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          {/* Redes Sociais Dinâmicas */}
          <div className="social-links-nav">
            <a href={navbar.social?.instagram} target="_blank" rel="noopener noreferrer" className="social-btn" title="Instagram">
              <Camera size={18} />
            </a>
            <a href={navbar.social?.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn">
              <Share2 size={18} />
            </a>
          </div>

          <Link to="/login" className="btn-login">
            <User size={18} />
            <EditableText 
              path="navbar.actions.login" 
              initialValue={navbar.actions.login} 
            />
          </Link>
          <Link to="/matricula" className="btn-primary btn-nav-cta">
            <EditableText 
              path="navbar.actions.cta" 
              initialValue={navbar.actions.cta} 
            />
          </Link>
          <button className="mobile-menu">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .social-links-nav {
          display: flex;
          gap: 0.75rem;
          margin-right: 1rem;
          padding-right: 1.5rem;
          border-right: 1px solid rgba(0, 0, 0, 0.1);
        }
        .social-btn {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(0, 75, 73, 0.05);
          color: var(--primary);
          transition: all 0.3s ease;
        }
        .social-btn:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-2px);
        }
        .btn-nav-cta {
          padding: 0.6rem 1.25rem;
          font-size: 0.85rem;
        }
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

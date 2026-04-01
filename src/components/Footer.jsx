import { Link } from 'react-router-dom';
import { Mail, Camera, Share2, Star, MapPin, FileText } from 'lucide-react';
import { useEdit } from '../context/EditContext';
import EditableText from './EditableText';

const Footer = () => {
  const { content } = useEdit();
  const { footer, navbar } = content;

  return (
    <footer className="footer bg-soft" id="contato">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo-footer">
            <span className="logo-text">
              <EditableText 
                path="navbar.logo" 
                initialValue={navbar.logo} 
              />
            </span>
            <span className="logo-subtext">
              <EditableText 
                path="navbar.sublogo" 
                initialValue={navbar.sublogo} 
              />
            </span>
          </div>
          <div className="brand-desc">
            <EditableText 
              path="footer.brand_desc" 
              initialValue={footer.brand_desc} 
              tagName="p" 
            />
          </div>
          <div className="social-links">
            <a href={navbar.social?.instagram} target="_blank" rel="noopener noreferrer"><Camera size={20} /></a>
            <a href={navbar.social?.linkedin} target="_blank" rel="noopener noreferrer"><Share2 size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Links Rápidos</h4>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/cursos">Treinamentos</Link></li>
            <li><Link to="/sobre-nos">Sobre Nós</Link></li>
            <li><Link to="/contato">Fale Conosco</Link></li>
          </ul>
        </div>

        <div className="footer-legal">
          <h4>Institucional</h4>
          <ul>
            <li><Link to="/termos">Termos de Uso</Link></li>
            <li><Link to="/privacidade">Política de Privacidade</Link></li>
            <li><Link to="/ouvidoria">Canal de Ouvidoria</Link></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>
            <EditableText 
              path="footer.newsletter.title" 
              initialValue={footer.newsletter.title} 
            />
          </h4>
          <div className="newsletter-desc">
            <EditableText 
              path="footer.newsletter.text" 
              initialValue={footer.newsletter.text} 
              tagName="p" 
            />
          </div>
          <div className="newsletter-input">
            <input type="email" placeholder="Seu e-mail" />
            <button className="btn-send">
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-content">
          <EditableText 
            path="footer.copyright" 
            initialValue={footer.copyright} 
            tagName="p" 
          />
          <div className="bottom-info">
            <div className="info-item">
              <FileText size={14} />
              <EditableText path="footer.cnpj" initialValue="CNPJ: 00.000.000/0001-00" />
            </div>
            <div className="info-item">
              <MapPin size={14} />
              <EditableText path="footer.address" initialValue="Rio de Janeiro, RJ" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          padding-top: 5rem;
          border-top: 1px solid var(--border);
        }
        .footer-content {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
          gap: 4rem;
          margin-bottom: 5rem;
        }
        :global(.brand-desc) {
          margin: 1.5rem 0;
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .social-links {
          display: flex;
          gap: 1.5rem;
        }
        .social-links a {
          color: var(--primary);
          background: white;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid var(--border);
        }
        .footer ul li {
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-muted);
        }
        .footer ul li a:hover {
          color: var(--primary);
        }
        .footer h4 {
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        .newsletter-input {
          display: flex;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }
        .newsletter-input input {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          outline: none;
        }
        .btn-send {
          background: var(--primary);
          color: white;
          width: 45px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer-bottom {
          padding: 2rem 0;
          border-top: 1px solid var(--border);
          background: white;
        }
        .bottom-content {
          display: flex;
          justify-content: space-between;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .bottom-info {
          display: flex;
          gap: 2rem;
        }

        @media (max-width: 968px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }
        @media (max-width: 568px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
          .bottom-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          .bottom-info {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

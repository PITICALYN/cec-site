import React from 'react';
import { Mail, Globe, Users, Share2 } from 'lucide-react';
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
            <a href="#"><Globe size={20} /></a>
            <a href="#"><Users size={20} /></a>
            <a href="#"><Share2 size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Links Rápidos</h4>
          <ul>
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
        </div>

        <div className="footer-legal">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Termos de Uso</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Trabalhe Conosco</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>
            <EditableText 
              path="footer.newsletter.title" 
              initialValue={footer.newsletter.title} 
            />
          </h4>
          <EditableText 
            path="footer.newsletter.text" 
            initialValue={footer.newsletter.text} 
            tagName="p" 
          />
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
            <span>CNPJ: 00.000.000/0001-00</span>
            <span>Macaé, RJ</span>
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

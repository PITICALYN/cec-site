import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton = () => {
  return (
    <div className="whatsapp-floating">
      <motion.a 
        href="https://wa.me/5500000000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-btn"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="btn-badge">1</div>
        <MessageCircle size={32} />
      </motion.a>

      <motion.div 
        className="whatsapp-tooltip"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        Como podemos ajudar hoje?
      </motion.div>

      <style jsx>{`
        .whatsapp-floating {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-direction: row-reverse;
        }
        .whatsapp-btn {
          background: #25d366;
          color: white;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
          position: relative;
        }
        .btn-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ff4b4b;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }
        .whatsapp-tooltip {
          background: white;
          padding: 0.75rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border);
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .whatsapp-floating { bottom: 1.5rem; right: 1.5rem; }
          .whatsapp-btn { width: 60px; height: 60px; }
          .whatsapp-tooltip { display: none; }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;

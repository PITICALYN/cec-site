import React from 'react';
import { Clock, Monitor, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEdit } from '../context/EditContext';
import EditableText from './EditableText';

const Courses = () => {
  const { content } = useEdit();
  const { courses_section } = content;

  return (
    <section className="courses-section section-padding bg-soft" id="cursos">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <EditableText 
              path="courses_section.title" 
              initialValue={courses_section.title} 
              tagName="div" 
            />
          </h2>
          <div className="section-subtitle">
            <EditableText 
              path="courses_section.subtitle" 
              initialValue={courses_section.subtitle} 
              tagName="p" 
            />
          </div>
        </div>

        <div className="courses-grid">
          {courses_section.courses.map((course, index) => (
            <motion.div 
              key={course.id}
              className="course-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card-image-box">
                <span className="card-badge">
                  <EditableText 
                    path={`courses_section.courses.${index}.category`} 
                    initialValue={course.category} 
                  />
                </span>
                {/* Imagem estática por enquanto */}
                <img 
                  src={`https://images.unsplash.com/photo-${index === 0 ? '1542435503-956c469947f6' : index === 1 ? '1504917595217-d4dc5f566f63' : index === 2 ? '1534398079543-7ae6d016b86a' : '1581092160562-40aa08e78837'}?q=80&w=2000&auto=format&fit=crop`} 
                  alt={course.title} 
                  className="card-img" 
                />
              </div>
              
              <div className="card-content">
                <h3 className="card-title">
                  <EditableText 
                    path={`courses_section.courses.${index}.title`} 
                    initialValue={course.title} 
                    tagName="div" 
                  />
                </h3>
                <div className="card-desc">
                  <EditableText 
                    path={`courses_section.courses.${index}.description`} 
                    initialValue={course.description} 
                    tagName="p" 
                  />
                </div>
                
                <div className="card-meta">
                  <div className="meta-item">
                    <Clock size={16} />
                    <EditableText 
                      path={`courses_section.courses.${index}.duration`} 
                      initialValue={course.duration} 
                    />
                  </div>
                  <div className="meta-item">
                    <Monitor size={16} />
                    <EditableText 
                      path={`courses_section.courses.${index}.type`} 
                      initialValue={course.type} 
                    />
                  </div>
                </div>

                <div className="card-actions">
                  <button className="btn-primary btn-sm">Matrícula</button>
                  <button className="btn-text">
                    Detalhes 
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section-header {
          text-align: left;
          margin-bottom: 4rem;
        }
        .section-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        :global(.section-subtitle) {
          color: var(--text-muted);
          max-width: 600px;
          font-size: 1.125rem;
        }
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2.5rem;
        }
        .course-card {
          background: var(--surface);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border);
          transition: var(--transition);
        }
        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-light);
        }
        .card-image-box {
          position: relative;
          height: 220px;
        }
        .card-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--primary);
          color: white;
          padding: 0.35rem 0.75rem;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 700;
          z-index: 2;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .card-content {
          padding: 2rem;
        }
        .card-title {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          line-height: 1.4;
          height: 3.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        :global(.card-desc) {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          height: 4.8rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--primary);
          font-weight: 600;
        }
        .card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .btn-sm {
          padding: 0.6rem 1.5rem;
          font-size: 0.9rem;
        }
        .btn-text {
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .btn-text:hover {
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .courses-grid {
            grid-template-columns: 1fr;
          }
          .section-header { text-align: center; }
          :global(.section-subtitle) { margin-inline: auto; }
        }
      `}</style>
    </section>
  );
};

export default Courses;

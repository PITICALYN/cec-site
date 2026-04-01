import React from 'react';
import { Clock, Monitor, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEdit } from '../context/EditContext';
import EditableText from './EditableText';

const Courses = () => {
  const { content, isEditing, addItemToList, removeItemFromList } = useEdit();
  const { courses_section } = content;

  const handleAddCourse = () => {
    const newCourse = {
      title: "Novo Treinamento",
      description: "Descrição do novo treinamento teórico ou prático.",
      duration: "00 Horas",
      type: "Presencial/Híbrido",
      category: "NOVO"
    };
    addItemToList('courses_section.courses', newCourse);
  };

  return (
    <section className="courses-section section-padding bg-soft" id="cursos">
      <div className="container">
        <div className="section-header">
          <div className="header-with-actions">
            <div>
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
            {isEditing && (
              <button className="btn-add-course" onClick={handleAddCourse}>
                <Plus size={20} /> Adicionar Curso
              </button>
            )}
          </div>
        </div>

        <div className="courses-grid">
          <AnimatePresence>
            {courses_section.courses.map((course, index) => (
              <motion.div 
                key={course.id || index}
                className="course-card"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-image-box">
                  {isEditing && (
                    <button 
                      className="btn-remove-course" 
                      onClick={() => removeItemFromList('courses_section.courses', index)}
                      title="Excluir este curso"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <span className="card-badge">
                    <EditableText 
                      path={`courses_section.courses.${index}.category`} 
                      initialValue={course.category} 
                    />
                  </span>
                  <img 
                    src={`https://images.unsplash.com/photo-${index % 5 === 0 ? '1542435503-956c469947f6' : index % 5 === 1 ? '1504917595217-d4dc5f566f63' : index % 5 === 2 ? '1534398079543-7ae6d016b86a' : index % 5 === 3 ? '1581092160562-40aa08e78837' : '1504384308090-c89eececbf8e'}?q=80&w=2000&auto=format&fit=crop`} 
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
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .header-with-actions {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
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
        .btn-add-course {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 15px -3px rgba(0, 75, 73, 0.2);
          transition: all 0.3s;
        }
        .btn-add-course:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 20px -3px rgba(0, 75, 73, 0.3);
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
        .btn-remove-course {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #ef4444;
          color: white;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          opacity: 0.8;
          transition: all 0.2s;
        }
        .btn-remove-course:hover {
          opacity: 1;
          transform: scale(1.1);
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
        }
        :global(.card-desc) {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          height: 4.8rem;
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

        @media (max-width: 768px) {
          .courses-grid { grid-template-columns: 1fr; }
          .header-with-actions { flex-direction: column; align-items: center; text-align: center; }
          :global(.section-subtitle) { margin-inline: auto; }
        }
      `}</style>
    </section>
  );
};

export default Courses;

'use client';

import { useState, useEffect } from 'react';
import ProjectsManager from '@/components/admin/ProjectsManager';
// import TechStackManager from '@/components/admin/TechStackManager';
// import BlogManager from '@/components/admin/BlogManager';
// import ServicesManager from '@/components/admin/ServicesManager';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('projects');

  // Fonction pour détecter le hash dans l'URL et changer de section
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
    }
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">
        {activeSection === 'projects' && 'Gestion des Projets'}
        {/* {activeSection === 'techstack' && 'Gestion des Technologies'}
        {activeSection === 'blogs' && 'Gestion des Articles'}
        {activeSection === 'services' && 'Gestion des Services'} */}
      </h2>

      {activeSection === 'projects' && <ProjectsManager />}
      {/* {activeSection === 'techstack' && <TechStackManager />} */}
      {/* {activeSection === 'blogs' && <BlogManager />} */}
      {/* {activeSection === 'services' && <ServicesManager />} */}
    </div>
  );
}
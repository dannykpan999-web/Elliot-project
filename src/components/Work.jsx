import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './styles/work.module.css';
import SectionWrapper from '../hoc';
import { projects } from '../constants';
import { textVariant } from '../utils/motion';
import Popup from './Popup';
import ProjectCard from './ProjectCard';
import ParticlesBackground from './ParticlesBackground';

const Work = () => {
  const [isOpen, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handlePopupClick = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handlePopupClose = () => {
    setSelectedProject(null);
    setOpen(false);
  };

  return (
    <div className={style.work_section}>
      {/* Animated Background */}
      <ParticlesBackground />

      <motion.div variants={textVariant()} className={style.header}>
        <span className={style.subtitle}>Portfolio</span>
        <h1 className={style.title}>My Recent Works</h1>
        <p className={style.description}>
          Each project showcases my skills in building responsive, user-friendly applications
          with modern technologies.
        </p>
      </motion.div>

      <div className={style.project_container}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onLearnMore={handlePopupClick}
          />
        ))}
      </div>

      {/* Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <Popup handleClose={handlePopupClose} project={selectedProject} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Work, 'work', 'my-8');

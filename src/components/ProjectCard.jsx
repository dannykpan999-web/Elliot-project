import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import style from './styles/projectCard.module.css';

const ProjectCard = ({ project, index, onLearnMore }) => {
  const handleCardClick = () => {
    onLearnMore(project);
  };

  return (
    <motion.div
      className={style.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Gradient border */}
      <div className={style.gradient_border} />

      {/* Image Section - Clickable */}
      <div
        className={style.image_container}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      >
        <img
          src={project.img}
          alt={project.name}
          className={style.image}
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className={style.image_overlay}>
          <div className={style.overlay_content}>
            <span className={style.view_text}>View Details</span>
            <span className={style.view_icon}>→</span>
          </div>
        </div>

        {/* Floating tech badge */}
        <div className={style.floating_badge}>
          <span className={style.badge_dot} />
          <span>{project.tech[0]}</span>
        </div>
      </div>

      {/* Info Section */}
      <div className={style.info}>
        <h3 className={style.title}>{project.name}</h3>
        <p className={style.description}>{project.desc}</p>

        {/* Tech Stack */}
        <div className={style.tech_container}>
          {project.tech.slice(0, 4).map((tech, i) => (
            <span key={tech} className={style.tech_tag} data-index={i}>
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className={style.tech_more}>+{project.tech.length - 4}</span>
          )}
        </div>

        {/* Action links */}
        <div className={style.actions}>
          <a
            href={project.source_link}
            target="_blank"
            rel="noreferrer"
            className={style.action_link}
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub className={style.action_icon} />
            Code
          </a>
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noreferrer"
              className={`${style.action_link} ${style.action_link_primary}`}
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt className={style.action_icon} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    img: PropTypes.string.isRequired,
    source_link: PropTypes.string.isRequired,
    live_link: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onLearnMore: PropTypes.func.isRequired,
};

export default ProjectCard;

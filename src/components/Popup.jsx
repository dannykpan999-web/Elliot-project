import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import style from './styles/popup.module.css';

const Popup = ({ handleClose, project }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [handleClose]);

  const nextImage = () => {
    setImageLoaded(false);
    setCurrentImage((prev) => (prev + 1) % project.carousel.length);
  };

  const prevImage = () => {
    setImageLoaded(false);
    setCurrentImage((prev) => (prev - 1 + project.carousel.length) % project.carousel.length);
  };

  const goToImage = (index) => {
    setImageLoaded(false);
    setCurrentImage(index);
  };

  return (
    <motion.div
      className={style.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleClose}
    >
      {/* Background blur particles effect */}
      <div className={style.particles}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={style.particle} style={{ '--delay': `${i * 0.5}s` }} />
        ))}
      </div>

      <motion.div
        className={style.modal}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient border effect */}
        <div className={style.gradient_border} />

        {/* Close button */}
        <motion.button
          type="button"
          className={style.close_btn}
          onClick={handleClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoClose />
        </motion.button>

        {/* Modal content */}
        <div className={style.modal_content}>
          {/* Image carousel section */}
          <div className={style.carousel_section}>
            <div className={style.image_container}>
              {/* Navigation arrows */}
              {project.carousel.length > 1 && (
                <>
                  <motion.button
                    type="button"
                    className={`${style.nav_btn} ${style.nav_prev}`}
                    onClick={prevImage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaChevronLeft />
                  </motion.button>
                  <motion.button
                    type="button"
                    className={`${style.nav_btn} ${style.nav_next}`}
                    onClick={nextImage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaChevronRight />
                  </motion.button>
                </>
              )}

              {/* Main image */}
              <motion.img
                key={currentImage}
                src={project.carousel[currentImage]}
                alt={`${project.name} screenshot ${currentImage + 1}`}
                className={style.carousel_image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                onLoad={() => setImageLoaded(true)}
              />

              {/* Loading shimmer */}
              {!imageLoaded && <div className={style.image_shimmer} />}

              {/* Image counter badge */}
              {project.carousel.length > 1 && (
                <div className={style.image_counter}>
                  {currentImage + 1} / {project.carousel.length}
                </div>
              )}
            </div>

            {/* Dot indicators */}
            {project.carousel.length > 1 && (
              <div className={style.dots_container}>
                {project.carousel.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${style.dot} ${index === currentImage ? style.dot_active : ''}`}
                    onClick={() => goToImage(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info section */}
          <div className={style.info_section}>
            {/* Project header */}
            <div className={style.header}>
              <motion.h2
                className={style.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.name}
              </motion.h2>

              {/* Tech tags */}
              <motion.div
                className={style.tech_container}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.tech.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className={style.tech_tag}
                    data-index={index % 4}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              className={style.description_container}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className={style.section_label}>About this project</h3>
              <p className={style.description}>{project.desc}</p>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className={style.actions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href={project.source_link}
                target="_blank"
                rel="noreferrer"
                className={style.action_btn}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaGithub className={style.btn_icon} />
                <span>View Source</span>
              </motion.a>

              {project.live_link && (
                <motion.a
                  href={project.live_link}
                  target="_blank"
                  rel="noreferrer"
                  className={`${style.action_btn} ${style.action_btn_primary}`}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaExternalLinkAlt className={style.btn_icon} />
                  <span>Live Demo</span>
                </motion.a>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

Popup.propTypes = {
  handleClose: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    carousel: PropTypes.arrayOf(PropTypes.string).isRequired,
    source_link: PropTypes.string.isRequired,
    live_link: PropTypes.string,
  }).isRequired,
};

export default Popup;

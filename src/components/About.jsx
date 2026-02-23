import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../hoc';
import style from './styles/about.module.css';
import { textVariant, fadeIn } from '../utils/motion';

const About = () => (
  <>
    <motion.h1 variants={textVariant()} className={style.title}>
      About Me
    </motion.h1>
    <div className={style.para}>
      <motion.p variants={fadeIn('', '', 0.5, 1)} className={style.text}>
        Hey there! I&apos;m
        {' '}
        <a
          href="https://www.linkedin.com/in/kaungmyatkyaw/"
          target="_blank"
          className={style.link}
          rel="noreferrer"
        >
          Austin Kniga Bartlett (Austin),
        </a>
        {' '}
        I'm a senior full stack software engineer with a passion for creative problem-solving and a strong record of delivering high-quality products.I specialize in JavaScript and Typescript, and I'm experienced with frameworks like React, Next.js, Redux, React Native, 
      </motion.p>
      <motion.p variants={fadeIn('', '', 1, 1)} className={style.text}>
        Vue.js, and Angular. I'm confident in backend work, with expertise in Node.js, Express.js, Nest.js, and Python. For data visualization, I've used D3.js, HighCharts, amCharts, CSS, and HTML5 to create engaging and informative interfaces.
      </motion.p>
      <motion.p variants={fadeIn('', '', 1.25, 1)} className={style.text}>
        Ready to bring your project to life? Reach out—I&apos;m excited to collaborate!
        {' '}
        <a
          href="https://drive.google.com/file/d/1tciorak3ZNmMrPPnG_b9eSMnv94fY61_/view?usp=sharing"
          target="_blank"
          className={style.link}
          rel="noreferrer"
        >
          Check out my resume
        </a>
        {' '}
        for more insights into my journey and qualifications.
      </motion.p>
    </div>
  </>
);

export default SectionWrapper(About, 'about', '');

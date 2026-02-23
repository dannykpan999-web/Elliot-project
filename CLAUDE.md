# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Austin Kniga Bartlett built with React 18, Vite, and Tailwind CSS. Features 3D graphics (Three.js), animations (Framer Motion), and interactive components.

Live site: https://rhbarry.me/

## Commands

```bash
# Development
npm run dev          # Start Vite dev server

# Build
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally

# Deployment
npm run deploy       # Deploy to GitHub Pages (runs build first via predeploy)
```

No test script is configured in `package.json` despite Jest being a devDependency.

## Architecture

### Tech Stack
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + CSS Modules per component (`src/components/styles/*.module.css`)
- **Animation:** Framer Motion for transitions, React Parallax Tilt for hover effects
- **3D Graphics:** Three.js via @react-three/fiber and @react-three/drei
- **Contact:** Formspree (form posts to `https://formspree.io/f/mgeqgkdd`)

### Key Files
- `src/constants/index.js` - All static content (projects, technologies, services, social, navLinks)
- `src/utils/motion.js` - Reusable Framer Motion animation variants
- `src/hoc/SectionWrapper.jsx` - HOC that wraps sections with scroll-triggered animations
- `src/ThemeContext.jsx` - React Context providing `theme` ('dark'|'light') and `toggleTheme`
- `src/index.css` - CSS variable definitions for both themes

### Theme System
- `ThemeProvider` wraps the app and applies `.App.dark` or `.App.light` class to a root `<div>`
- CSS variables (`--navy`, `--cyan`, `--white`, `--grey`, `--light-grey`, `--light-blue`, `--dark-blue`, `--low-opacity`) are defined in `src/index.css` for both themes
- Tailwind color names (`navy`, `cyan`, `grey`, `light_grey`, `dark_blue`) map to the dark-mode hex values in `tailwind.config.js` — use CSS variables for theme-reactive styles instead

### Animation Patterns
`utils/motion.js` exports variants used with Framer Motion:
- `textVariant(delay?)` - Slides up from y:-50 with spring
- `fadeIn(direction, type, delay, duration)` - Directional fade (directions: 'left', 'right', 'up', 'down')
- `zoomIn(delay, duration)` - Scale from 0
- `slideIn(direction, type, delay, duration)` - Full-width/height slide (uses % values, unlike fadeIn which uses px)
- `staggerContainer(staggerChildren?, delayChildren?)` - Orchestrates child animations

`SectionWrapper(Component, idName, margin)` - HOC signature:
- `idName` becomes the `id` of an anchor `<span>` for hash navigation
- `margin` is a Tailwind class applied to the `<motion.section>` (e.g. `'my-8'`)
- On mobile, animations replay on each viewport entry; on desktop (≥768px) they only play once

### Data Structures in `src/constants/index.js`
- `technologies` items: `{ stack: ['languages'|'frameworks'|'tools', 'all'], name, icon }`
- `projects` items: `{ id, name, desc, tech[], img, carousel[], source_link, live_link }`
- `social` items: `{ id, name, url, icon, icon1 }` — `icon` for dark theme, `icon1` for light theme
- `services` items: `{ id, icon, title, text }`
- `navLinks` items: `{ id, name, url }` — URLs use hash format (`/#about`)

### Component Notes
- `Testimonial` is imported in `App.jsx` but commented out — it exists as a component but is not rendered
- `Navbar` becomes `position: fixed` after scrolling past 780px
- `Work` opens a `Popup` component for project detail view with a `react-slick` carousel
- Each section component (About, TechStack, Service, Work, Contact) is exported as `SectionWrapper(Component, id, margin)` at the bottom of the file

## Configuration Files
- `tailwind.config.js` - Custom colors (dark-mode values only; use CSS variables for theme switching)
- `vite.config.js` - `base: '/'`, manual chunk splitting per `node_modules` package
- `.eslintrc.json` - Airbnb style guide

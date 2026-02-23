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
npm run deploy       # Deploy to GitHub Pages (runs build first)
```

## Architecture

### Tech Stack
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS with custom color palette (navy, cyan, white, grey, light_grey, dark_blue)
- **Animation:** Framer Motion for transitions, React Parallax Tilt for hover effects
- **3D Graphics:** Three.js via @react-three/fiber and @react-three/drei
- **Contact:** EmailJS for form submissions

### Key Directories
- `src/components/` - All React components (Navbar, Home, About, Work, Contact, etc.)
- `src/components/styles/` - CSS modules for component-specific styles
- `src/constants/index.js` - All static data (projects, technologies, services, social links, nav links)
- `src/utils/motion.js` - Reusable Framer Motion animation variants
- `src/hoc/SectionWrapper.jsx` - HOC that wraps sections with scroll animations
- `src/assets/` - Images, icons, and static files

### Theme System
- Dark/light theme toggle via React Context (`src/ThemeContext.jsx`)
- CSS variables defined in `src/index.css` (--navy, --cyan, --white, etc.)
- Theme class applied to root div in App.jsx

### Animation Patterns
The `utils/motion.js` file exports reusable variants:
- `textVariant()` - Text animations with spring physics
- `fadeIn(direction, type, delay, duration)` - Directional fade-ins
- `zoomIn(delay, duration)` - Scale animations
- `slideIn(direction, type, delay, duration)` - Slide effects
- `staggerContainer()` - Staggered children animations

Use `SectionWrapper` HOC to add scroll-triggered animations to any section component.

### Data Management
All static content lives in `src/constants/index.js`:
- `technologies` - Tech stack icons and categories
- `projects` - Portfolio projects with carousel images and links
- `services` - Services offered
- `social` - Social media links with dark/light variants
- `navLinks` - Navigation items

### Component Structure
Main app layout in `App.jsx`:
1. Home (hero with 3D Stars canvas)
2. Navbar (fixed, scroll-aware, theme toggle)
3. About
4. TechStack
5. Service
6. Work (portfolio projects)
7. Contact (EmailJS integration)
8. Footer

## Configuration Files
- `tailwind.config.js` - Custom colors and theme extensions
- `vite.config.js` - Build config with manual chunk splitting
- `.eslintrc.json` - Airbnb style with relaxed rules for flexibility

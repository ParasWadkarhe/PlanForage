// src/lib/motionPresets.js

// Basic fade and slide animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

export const fadeOut = {
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: 'easeIn' },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

// Scale animations
export const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.2, ease: 'easeOut' },
};

export const scaleOut = {
  exit: { scale: 0.9, opacity: 0 },
  transition: { duration: 0.2, ease: 'easeIn' },
};

export const zoomIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

export const zoomOut = {
  exit: { scale: 0.8, opacity: 0 },
  transition: { duration: 0.25, ease: 'easeIn' },
};

export const popIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

// Sliding animations
export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

export const slideDown = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

export const slideLeft = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

export const slideRight = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

// Hover and tap effects
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.2 },
};

export const iconHover = {
  whileHover: { scale: 1.1 },
  transition: { duration: 0.15 },
};

// Pulsing and looping
export const subtlePulse = {
  animate: {
    scale: [1, 1.02, 1],
  },
  transition: {
    duration: 1.2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Staggered list items
export const listItem = (index = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: {
    duration: 0.25,
    ease: 'easeOut',
    delay: index * 0.05,
  },
});
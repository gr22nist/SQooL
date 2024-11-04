export const pageTransition = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { 
    duration: 0.3,
    ease: [0.4, 0, 0.3, 1]
  }
};
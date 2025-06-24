import React from 'react';
import { motion } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';

interface ScrollButtonProps {
  targetId: string;
  className?: string;
  children: React.ReactNode;
}

const ScrollButton = ({ targetId, className, children }: ScrollButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={className}
      whileHover={{ y: -4 }}
      whileTap={{ y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};

export default ScrollButton; 
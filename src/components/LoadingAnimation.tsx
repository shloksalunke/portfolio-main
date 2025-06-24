import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const LoadingAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const tl = gsap.timeline();
    const loadingDuration = 3;
    let animationFrame: number;

    const updateLoadingProgress = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTimeRef.current) / 1000;
      const progress = Math.min(100, Math.floor((elapsed / loadingDuration) * 100));
      
      setLoadingPercent(progress);
      
      if (progress < 100) {
        animationFrame = requestAnimationFrame(updateLoadingProgress);
      } else {
        // When loading reaches 100%, start fade out
        tl.to('.loading-container', {
          opacity: 0,
          duration: 0.5,
          onComplete
        });
      }
    };

    animationFrame = requestAnimationFrame(updateLoadingProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loading-container fixed inset-0 bg-black z-50">
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="loader mb-8 scale-100 md:scale-100 scale-75">
          <div className="loader-inner">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="loader-line-wrap">
                <div className="loader-line"></div>
              </div>
            ))}
          </div>
        </div>
        <motion.h1 
          className="loading-text text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-8"
        >
          LOADING
        </motion.h1>
        <div className="w-48 md:w-64 h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm mb-4">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
            style={{ width: `${loadingPercent}%` }}
          />
        </div>
        <motion.div className="text-lg md:text-xl font-medium text-cyan-400">
          {loadingPercent}%
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingAnimation; 
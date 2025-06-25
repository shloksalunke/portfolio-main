import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import welcomeVideo from './2792370-hd_1920_1080_30fps.mp4'; // Import the video directly

const Welcome = ({ onComplete }: { onComplete: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (!isMobile && videoRef.current) {
      videoRef.current.play();
      const timer = setTimeout(() => {
        onComplete();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [onComplete, isMobile]);

  if (isMobile) {
    return (
      <div className="welcome-container fixed inset-0 bg-[rgb(8,7,8)] z-50 flex items-center justify-center">
        <motion.div
          initial={{ y: -200, rotate: 45 }}
          animate={{ 
            y: 0,
            rotate: 0,
            transition: { 
              type: "spring",
              damping: 12,
              stiffness: 100,
              duration: 1.5
            }
          }}
          onAnimationComplete={onComplete}
          className="w-32 h-32 relative coffee-cup"
        >
          {/* Cup Body */}
          <div className="absolute w-24 h-20 border-4 border-cyan-400 rounded-b-full" />
          {/* Cup Handle */}
          <div className="absolute top-2 right-0 w-8 h-10 border-4 border-l-0 border-cyan-400 rounded-r-full" />
          {/* Steam Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              y: [-5, -10, -5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-4 left-4 w-16 h-4"
          >
            <div className="w-2 h-2 bg-cyan-400/30 rounded-full absolute left-0" />
            <div className="w-2 h-2 bg-cyan-400/30 rounded-full absolute left-1/3" />
            <div className="w-2 h-2 bg-cyan-400/30 rounded-full absolute left-2/3" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="welcome-container fixed inset-0 bg-black z-50 w-screen h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="w-screen h-screen object-cover absolute inset-0"
        src={welcomeVideo}
        muted
        playsInline
        autoPlay
      >
        <source 
          src={welcomeVideo}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Welcome; 
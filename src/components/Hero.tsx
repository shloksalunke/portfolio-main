import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import ScrollButton from './ScrollButton';

const Hero = () => {
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate video overlay
    tl.fromTo(videoOverlayRef.current,
      { opacity: 1 },
      {
        opacity: 0.7,
        duration: 2,
        ease: "power2.inOut"
      }
    );

    // Animate content with glitch effect
    const content = contentRef.current;
    if (content) {
      const glitchAnimation = () => {
        gsap.to(content, {
          skewX: gsap.utils.random(-10, 10),
          duration: 0.1,
          onComplete: () => {
            gsap.to(content, {
              skewX: 0,
              duration: 0.1
            });
          }
        });
      };

      const interval = setInterval(() => {
        if (Math.random() > 0.8) {
          glitchAnimation();
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ filter: 'brightness(0.3)' }}
        >
          <source src="https://cdn.coverr.co/videos/coverr-abstract-digital-network-9235/1080p.mp4" type="video/mp4" />
        </video>
        <div
          ref={videoOverlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"
        />
      </div>

      {/* Content */}
      <motion.div
        ref={contentRef}
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Shlok Salunke
        </motion.h1>

        <div className="text-lg md:text-xl lg:text-2xl text-cyan-400 mb-8 relative">
          <TypeAnimation
            sequence={[
              'Artificial Intelligence',
              1000,
              'Machine Learning',
              1000,
              'Generative AI',
              1000,
              'LangChain & RAG',
              1000,
              'Model Deployment',
              1000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="relative z-10"
          />
          <motion.span
            className="cursor absolute -right-2 top-0 h-full w-[2px] bg-cyan-400"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse" />
        </div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-4 md:gap-6 mb-6 md:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="https://github.com/shloksalunke"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transform hover:scale-110 transition-all"
            whileHover={{ scale: 1.2 }}
          >
            <i className="fab fa-github text-2xl" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/shlok-salunke-4947b429b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transform hover:scale-110 transition-all"
            whileHover={{ scale: 1.2 }}
          >
            <i className="fab fa-linkedin text-2xl" />
          </motion.a>
          <motion.a
            href="mailto:shloksalunke56@"
            className="text-cyan-400 hover:text-cyan-300 transform hover:scale-110 transition-all"
            whileHover={{ scale: 1.2 }}
          >
            <i className="fas fa-envelope text-2xl" />
          </motion.a>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <ScrollButton
            targetId="contact"
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-full font-semibold 
                       transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            Get in Touch
          </ScrollButton>
          <ScrollButton
            targetId="projects"
            className="bg-transparent border-2 border-cyan-500 text-cyan-500 px-6 py-3 rounded-full font-semibold 
                       transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            View Projects
          </ScrollButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
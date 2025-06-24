import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TypeAnimation } from 'react-type-animation';
import LoadingAnimation from './components/LoadingAnimation';
import Welcome from './components/Welcome';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import BackgroundAnimation from './components/BackgroundAnimation';
import Experience from './components/Experience';
import Journey from './components/Journey';

function App() {
  const [currentState, setCurrentState] = useState<'loading' | 'welcome' | 'main'>('loading');

  useGSAP(() => {
    gsap.to('.cursor', {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
    });
  }, []);

  if (currentState === 'loading') {
    return <LoadingAnimation onComplete={() => setCurrentState('welcome')} />;
  }

  if (currentState === 'welcome') {
    return <Welcome onComplete={() => setCurrentState('main')} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-black text-white min-h-screen overflow-hidden"
      >
        <BackgroundAnimation />
        <div className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Certificates />
          <Journey />
          <Contact />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
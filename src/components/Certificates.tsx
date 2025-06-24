import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

// Import all certificate images
const certificates = [
  {
    id: 1,
    title: "certificate 1",
    image: new URL('../certificates/1.png', import.meta.url).href,
    thumbnail: new URL('../certificates/1.png', import.meta.url).href,
    issuer: "DeepLearning.AI & Stanford",
    date: "2024"
  },
  {
    id: 2,
    title: "certificate 2",
    image: new URL('../certificates/2.png', import.meta.url).href,
    thumbnail: new URL('../certificates/2.png', import.meta.url).href,
    issuer: "DeepLearning.AI",
    date: "2023"
  },
  {
    id: 3,
    title: "certificate 3",
    image: new URL('../certificates/3.png', import.meta.url).href,
    thumbnail: new URL('../certificates/3.png', import.meta.url).href,
    issuer: "Activeloop",
    date: "2024"
  },
  {
    id: 4,
    title: "certificate 4",
    image: new URL('../certificates/4.png', import.meta.url).href,
    thumbnail: new URL('../certificates/4.png', import.meta.url).href,
    issuer: "Coding Ninjas",
    date: "2023"
  },
  {
    id: 5,
    title: "Certificate 5",
    image: new URL('../certificates/5.png', import.meta.url).href,
    thumbnail: new URL('../certificates/5.png', import.meta.url).href,
    issuer: "Issuer 5",
    date: "2024"
  },
  {
    id: 6,
    title: "Certificate 6",
    image: new URL('../certificates/6.png', import.meta.url).href,
    thumbnail: new URL('../certificates/6.png', import.meta.url).href,
    issuer: "Issuer 6",
    date: "2024"
  },
  {
    id: 7,
    title: "Certificate 7",
    image: new URL('../certificates/7.png', import.meta.url).href,
    thumbnail: new URL('../certificates/7.png', import.meta.url).href,
    issuer: "Issuer 7",
    date: "2024"
  },
  {
    id: 8,
    title: "Certificate 8",
    image: new URL('../certificates/8.png', import.meta.url).href,
    thumbnail: new URL('../certificates/8.png', import.meta.url).href,
    issuer: "Issuer 8",
    date: "2024"
  },
  {
    id: 9,
    title: "Certificate 9",
    image: new URL('../certificates/9.png', import.meta.url).href,
    thumbnail: new URL('../certificates/9.png', import.meta.url).href,
    issuer: "Issuer 9",
    date: "2024"
  }
];

const Certificates = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [stripIndex, setStripIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % certificates.length);
    setStripIndex((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    setStripIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Certificates & Achievements
        </motion.h2>

        <div className="project-carousel relative">
          {/* Main Certificate Display */}
          <div className="project-screen relative w-full md:w-[768px] h-auto md:h-[451px] mx-auto">
            <div className="certificate-display-container">
              <div 
                className="project-detail bg-gray-800 rounded-lg overflow-hidden"
                {...swipeHandlers}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <img 
                      src={certificates[activeIndex].image}
                      alt={certificates[activeIndex].title}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="navigation-buttons absolute left-0 right-0 top-1/2 -translate-y-1/2 
                            flex justify-between px-4 z-20 md:px-8">
                <motion.button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-gray-800/80 text-cyan-400 
                            hover:bg-gray-700/80 transition-all duration-300 
                            hover:scale-110"
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-gray-800/80 text-cyan-400 
                            hover:bg-gray-700/80 transition-all duration-300 
                            hover:scale-110"
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates; 
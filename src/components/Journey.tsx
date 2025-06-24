import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Journey.css';
import { useSwipeable } from 'react-swipeable';

const journeyImages = [
  { id: 1, image: 'https://via.placeholder.com/300x400?text=Memory+1' },
  { id: 2, image: 'https://via.placeholder.com/300x400?text=Memory+2' },
  { id: 3, image: 'https://via.placeholder.com/300x400?text=Memory+3' },
  { id: 4, image: 'https://via.placeholder.com/300x400?text=Memory+4' },
  { id: 5, image: 'https://via.placeholder.com/300x400?text=Memory+5' },
  { id: 6, image: 'https://via.placeholder.com/300x400?text=Memory+6' },
  { id: 7, image: 'https://via.placeholder.com/300x400?text=Memory+7' },
];

const Journey = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % journeyImages.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + journeyImages.length) % journeyImages.length);
  };

  useEffect(() => {
    const carousel = document.querySelector('.journey-carousel') as HTMLElement;
    if (carousel) {
      const angle = (selectedIndex / journeyImages.length) * -360;
      carousel.style.transform = `rotateY(${angle}deg)`;
    }
  }, [selectedIndex]);

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
    <section className="journey-section bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        {/* Heading Section */}
        <div className="heading-container mb-48 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-cyan-400 journey-heading">
              Journey & Memories
            </h2>
          </motion.div>
        </div>

        {/* Carousel Section */}
        <div className="carousel-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="journey-frame">
              <div className="journey-object">
                <div 
                  className="journey-carousel"
                  {...swipeHandlers}
                >
                  {journeyImages.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="journey-cell"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <img 
                        src={item.image} 
                        alt={`Journey ${item.id}`}
                      />
                    </motion.div>
                  ))}
                </div>
                
                <div className="journey-controls">
                  <motion.button
                    onClick={handlePrev}
                    className="control-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    className="control-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Journey; 
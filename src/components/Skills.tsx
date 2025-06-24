import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [selectedCategory, setSelectedCategory] = useState('Machine Learning');
  const [oldCategory, setOldCategory] = useState('');

  useEffect(() => {
    if (selectedCategory !== oldCategory) {
      setOldCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const skillCategories = [
    {
      name: 'Core AIML Programming',
      skills: [
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'C++', icon: 'fas fa-code' },
        { name: 'SQL', icon: 'fas fa-database' }
      ]
    },
    {
      name: 'Libraries & Data Processing',
      skills: [
        { name: 'Pandas', icon: 'fas fa-table' },
        { name: 'NumPy', icon: 'fas fa-square-root-alt' },
        { name: 'Scikit-learn', icon: 'fas fa-cogs' },
        { name: 'Matplotlib', icon: 'fas fa-chart-line' }
      ]
    },
    {
      name: 'Frameworks & Tools',
      skills: [
        { name: 'LangChain', icon: 'fas fa-link' },
        { name: 'TensorFlow', icon: 'fas fa-brain' },
        { name: 'Keras', icon: 'fas fa-project-diagram' },
        { name: 'Streamlit', icon: 'fas fa-desktop' },
        { name: 'FAISS', icon: 'fas fa-database' },
        { name: 'PyPDFLoader', icon: 'fas fa-file-pdf' },
        { name: 'Jupyter Notebook', icon: 'fas fa-book' },
        { name: 'Git', icon: 'fab fa-git-alt' }
      ]
    },
    {
      name: 'AI Domains',
      skills: [
        { name: 'Machine Learning', icon: 'fas fa-robot' },
        { name: 'Generative AI', icon: 'fas fa-magic' },
        { name: 'RAG (Retrieval-Augmented Generation)', icon: 'fas fa-sync-alt' },
        { name: 'CNNs', icon: 'fas fa-eye' },
        { name: 'NLP (Introductory)', icon: 'fas fa-language' }
      ]
    },
    {
      name: 'Data Science & Visualization',
      skills: [
        { name: 'Web Scraping', icon: 'fas fa-code' },
        { name: 'Data Preprocessing', icon: 'fas fa-tasks' },
        { name: 'Regression', icon: 'fas fa-chart-line' },
        { name: 'Classification', icon: 'fas fa-clone' },
        { name: 'Data Analytics', icon: 'fas fa-chart-bar' },
        { name: 'Tableau', icon: 'fas fa-chart-pie' }
      ]
    },
    {
      name: 'Other Tools',
      skills: [
        { name: 'Microsoft Excel', icon: 'fas fa-file-excel' },
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS', icon: 'fab fa-css3-alt' }
      ]
    }
  ];


  const cardVariants = {
    hidden: (custom: { index: number; isOlder: boolean }) => ({
      opacity: 0,
      x: custom.isOlder ? '100%' : '-100%',
      y: custom.index * 10,
      rotate: custom.isOlder ? -10 : 10,
      scale: 0.8,
      transition: {
        duration: 0.3,
        delay: custom.index * 0.05
      }
    }),
    visible: (custom: { index: number }) => ({
      opacity: 1,
      x: 0,
      y: custom.index * 10,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: custom.index * 0.1
      }
    }),
    exit: (custom: { index: number; isOlder: boolean }) => ({
      opacity: 0,
      x: custom.isOlder ? '-100%' : '100%',
      rotate: custom.isOlder ? 10 : -10,
      scale: 0.8,
      transition: {
        duration: 0.3,
        delay: custom.index * 0.05
      }
    })
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Technical Skills
        </motion.h2>

        <div className="relative">
          {/* Navigation Menu */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {skillCategories.map((category) => (
              <motion.button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all relative
                  ${selectedCategory === category.name
                    ? 'text-white'
                    : 'text-gray-400 hover:text-cyan-400'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
                {selectedCategory === category.name && (
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Display */}
          <div className="relative h-[600px] perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 content-start"
              >
                {skillCategories
                  .find(cat => cat.name === selectedCategory)
                  ?.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      custom={{
                        index,
                        isOlder: selectedCategory > oldCategory
                      }}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg
                        border border-gray-700/50 hover:border-cyan-500/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <i className={`${skill.icon} text-3xl text-cyan-400`} />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
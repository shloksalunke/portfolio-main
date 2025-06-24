import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [showEducation, setShowEducation] = useState(false);

  const educationData = [
    {
      degree: "Bachelor of Technology in Artificial Intelligence and Machine learning",
      school: "Narsee Monjee Institute of Management and Studies, Shirpur",
      year: "2023 - 2027",
      details: "🧠 AIML student ( CGPA: 3.0/4.0) exploring ML, Deep Learning, RAG & real-world AI apps with Python.",
      icon: "🎓",
      color: "from-cyan-500 to-blue-500"
    },
    {
      degree: "HSC",
      school: "Defence Career Academy, SambhajiNagar",
      year: "2021 - 2023",
      details: "While pursuing HSC, I actively managed college studies along with dedicated preparation for the NDA exam, showing my focus and determination.",
      icon: "🎯",
      color: "from-purple-500 to-pink-500"
    },
    {
      degree: "Secondary School Education",
      school: "Shri Mahavir English Medium School,Shahada",
      year: "2018 - 2021",
      details: "Demonstrated excellence in academics and extracurricular activities.",
      icon: "🌟",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      rotateY: 0
    }
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800/50 p-4 md:p-8 rounded-lg backdrop-blur-sm"
          >
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Professional Summary</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I’m an aspiring AI Engineer currently pursuing my B.Tech in Artificial Intelligence and Machine Learning. With a solid foundation in Python, Scikit-learn, and AI model deployment, I have hands-on experience in building intelligent systems from scratch and taking them to production.
              </p>

              <p>
                My journey in AI has been shaped through real-world projects where I developed AI-powered tools, intelligent PDF chatbots, and optimization algorithms using advanced ML techniques. I enjoy transforming complex problems into practical, working solutions.
              </p>

              <p>
                I’ve earned certifications in Machine Learning, Web Scraping, and Artificial Intelligence from leading platforms like IBM, Great Learning, and INI. I’ve also gained virtual internship experience focused on sustainable AI practices and modern LLM-based applications.
              </p>

              <p>
                My current focus is on exploring the capabilities of Generative AI, LangChain, Retrieval-Augmented Generation (RAG), and agentic workflows. I love experimenting with LLMs and building applications that push the limits of automation and intelligence.
              </p>

              <p>
                I’m deeply passionate about building ethical, scalable, and practical AI systems that solve real-world problems. Whether it's deploying models, fine-tuning transformer architectures, or integrating APIs for smart functionality — I strive to deliver impactful results with precision.
              </p>

            </div>
          </motion.div>

          {/* Education Journey */}
          <motion.div className="relative px-4 md:px-0">
            <motion.button
              onClick={() => setShowEducation(!showEducation)}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {showEducation ? 'Hide Education Journey' : 'View Education Journey'}
            </motion.button>

            <AnimatePresence>
              {showEducation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 space-y-6 perspective-1000"
                >
                  {educationData.map((edu, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      className={`
                        bg-gradient-to-r ${edu.color} p-1 rounded-xl
                        transform-gpu transition-all duration-300
                        hover:shadow-xl hover:shadow-cyan-500/20
                      `}
                    >
                      <div className="bg-gray-900 p-6 rounded-lg h-full">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                              {edu.degree}
                            </h4>
                            <p className="text-gray-300 mt-2 font-medium">{edu.school}</p>
                          </div>
                          <span className="text-4xl ml-4 transform transition-transform group-hover:rotate-12">
                            {edu.icon}
                          </span>
                        </div>
                        <div className="mt-4">
                          <p className="text-cyan-300/80 text-sm font-medium inline-flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            {edu.year}
                          </p>
                          <p className="text-gray-400 mt-2 text-sm leading-relaxed">{edu.details}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
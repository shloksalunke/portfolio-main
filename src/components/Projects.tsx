import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import colabIcon from './colab.jpeg';
import { useSwipeable } from 'react-swipeable';

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [currentCard, setCurrentCard] = React.useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "AskMyPDF – AI-Powered PDF Chatbot using RAG",
      description: "Privacy-first chatbot that answers PDF-based queries using a Retrieval-Augmented Generation pipeline.",
      technologies: [
        "LangChain", "MistralAI", "FAISS", "PyPDFLoader", "Streamlit", "Python"
      ],
      details: [
        "Built fully local RAG chatbot for secure document-based QA.",
        "Developed backend: PDF chunking, embeddings, FAISS vector DB, LLM querying.",
        "Implemented frontend with Streamlit for real-time PDF chat.",
        "Handled session memory and chat history efficiently."
      ],
      github: "https://github.com/shloksalunke/AskMyPDF-RAG.git"
    },
    {
      title: "Predicting House Prices with Machine Learning",
      description: "Linear Regression model for predicting housing prices based on location and demographics.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Jupyter Notebook"],
      details: [
        "Trained model using features like area income, house age, and room count.",
        "Performed EDA and regression evaluation to interpret predictions.",
        "Visualized prediction trends and model accuracy."
      ],
      github: "https://github.com/shloksalunke/House-Price-Prediction-In-USA.git"
    },
    {
      title: "Citrus Plant Disease Detection using CNN",
      description: "Custom CNN model to detect multiple citrus leaf diseases for smart agriculture applications.",
      technologies: ["TensorFlow", "Keras", "Python", "Matplotlib"],
      details: [
        "Trained on categorized plant leaf image dataset.",
        "Handled image preprocessing and data augmentation.",
        "Achieved high accuracy in classifying that the plant is heathy or non-healthy."
      ],
      github: "https://github.com/shloksalunke/Citrus-Plant-Disease-Detection-Project.git"
    },
    {
      title: "Placement Prediction System",
      description: "ML-based model to predict chances of campus placement using academic and skill-based features.",
      technologies: ["Python", "Scikit-learn", "Logistic Regression", "Jupyter Notebook"],
      details: [
        "Used academic data (CGPA, scores) and extracurricular inputs.",
        "Trained Logistic Regression model for binary classification.",
        "Evaluated accuracy and visualized feature importance."
      ],
      github: "https://github.com/shloksalunke/Placement-prediction-ml-model-using-logistic-regression.git"
    },

    {
      title: "Assignment Problem Solver using Genetic Algorithm",
      description: "Streamlit-based interactive GA solver for optimal resource-task assignment.",
      technologies: ["Streamlit", "Python", "Genetic Algorithm"],
      details: [
        "Takes dynamic user-input cost matrix for assignments.",
        "Applies GA for finding optimal allocations.",
        "Designed responsive UI with interactive matrix editing."
      ],
      github: "https://github.com/shloksalunke/Assignment-Problem-Optimization-using-Genetic-Algorithm.git"
    },
    {
      title: "Blood Bank Management System (BBMS)",
      description: "Full-stack DBMS project managing donor/patient data and hospital blood flow.",
      technologies: ["MySQL", "Flask", "PHP", "HTML/CSS"],
      details: [
        "Created relational schema with full constraints and normalization.",
        "Connected database with PHP/Flask UI for real-time CRUD operations.",
        "Implemented features like blood requests, donations, and inventory updates."
      ]
    },
    {
      title: "Voice AI Assistant – REX (JARVIS-style)",
      description: "Voice-activated AI assistant with wake-word detection, multitasking, and bilingual support.",
      technologies: ["SpeechRecognition", "TTS", "Flask", "JavaScript", "Python"],
      details: [
        "Built custom voice command system activated by 'Hey Rex'.",
        "Supports English and Hindi inputs and responses.",
        "Controls system functions, answers queries, and interacts via UI."
      ],
      status: "In Progress"
    },
    {
      title: "Wind Power Generation Forecasting",
      description: "ML regression model to predict wind energy output from weather and turbine data.",
      technologies: ["Pandas", "Scikit-learn", "Python", "Matplotlib"],
      details: [
        "Used real-world dataset during AICTE internship.",
        "Applied regression models to forecast power trends.",
        "Visualized output trends and validated model accuracy."
      ],
      github: "https://github.com/shloksalunke/Wind_Power_generating_Forecasting_Project.git"
    }

  ];


  const navigateCard = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentCard(prev => (prev > 0 ? prev - 1 : projects.length - 1));
    } else {
      setCurrentCard(prev => (prev < projects.length - 1 ? prev + 1 : 0));
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigateCard('next'),
    onSwipedRight: () => navigateCard('prev'),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <section id="projects" className="min-h-screen py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        <div className="relative max-w-[90vw] md:max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-4 z-20">
            <motion.button
              onClick={() => navigateCard('prev')}
              className="p-3 rounded-full bg-gray-800/80 text-cyan-400 hover:bg-gray-700/80
                        transition-all duration-300 hover:scale-110"
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={() => navigateCard('next')}
              className="p-3 rounded-full bg-gray-800/80 text-cyan-400 hover:bg-gray-700/80
                        transition-all duration-300 hover:scale-110"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Project Cards */}
          <div className="relative h-[600px] perspective-1000" ref={cardsRef} {...swipeHandlers}>
            <AnimatePresence mode="wait">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className={`card-wrapper absolute w-full ${index === currentCard
                    ? 'card--current'
                    : index === (currentCard + 1) % projects.length
                      ? 'card--next'
                      : 'card--out'
                    }`}
                  initial={false}
                  animate={{
                    zIndex: index === currentCard ? 10 : index === (currentCard + 1) % projects.length ? 5 : 1,
                    rotate: index === currentCard ? -1 : index === (currentCard + 1) % projects.length ? 4 : 8,
                    translateX: index === currentCard ? '0%' : index === (currentCard + 1) % projects.length ? '25px' : '55px',
                    translateY: index === currentCard ? '0px' : index === (currentCard + 1) % projects.length ? '-25px' : '-50px',
                    scale: index === currentCard ? 1 : index === (currentCard + 1) % projects.length ? 1 : 0.95
                  }}
                  transition={{ duration: 0.6, ease: [0.8, 0.2, 0.1, 0.8] }}
                  style={{
                    cursor: index === currentCard ? 'auto' : 'pointer',
                    transformOrigin: '0 0'
                  }}
                >
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-1">
                    <div className="bg-gray-900 p-8 h-[500px] relative overflow-hidden">
                      <div className="flex flex-col h-full">
                        <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                          {project.title}
                        </h3>

                        <p className="text-gray-300 mb-6">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <ul className="space-y-2 mb-6 text-gray-300 flex-grow">
                          {project.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-1">▹</span>
                              {detail}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto">
                          {project.colab ? (
                            <a
                              href={project.colab}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
                            >
                              <img
                                src={colabIcon}
                                alt="Colab Icon"
                                className="h-6 w-6 object-cover rounded"
                              />
                              <span>View in Google Colab</span>
                              <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                            </a>
                          ) : project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
                            >
                              <Github className="w-5 h-5" />
                              <span>View on GitHub</span>
                              <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentCard
                  ? 'bg-cyan-400 w-4'
                  : 'bg-gray-600 hover:bg-gray-500'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
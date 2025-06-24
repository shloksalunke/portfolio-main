import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSwipeable } from 'react-swipeable';

interface ExperienceData {
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
  color: string;
  icon: string;
}

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [activeCard, setActiveCard] = useState(0);

  const experiences: ExperienceData[] = [
    {
      company: "National Academic Internship Council",
      role: "Generative AI Intern",
      period: "June 2025 - June 2025",
      responsibilities: [
        "Selected through a national program for a 1-month internship in Generative AI",
        "Developed an AI-powered chatbot using Hugging Face Transformers API",
        "Implemented prompt handling, conversation flow, and real-time response generation",
        "Trained in LLMs, model deployment, and ethical AI development",
        "Enhanced API integration and technical communication skills through demos"
      ],
      color: "from-yellow-500 to-orange-500",
      icon: "🧠"
    },
    {
      company: "AICTE x Shell x Edunet (Skills4Future)",
      role: "Machine Learning Intern",
      period: "April 2025 - April 2025",
      responsibilities: [
        "Completed 4-week virtual internship focused on Machine Learning and Green Skills",
        "Built ML-based Wind Power Generation Forecasting model using real energy datasets",
        "Applied regression techniques to forecast clean energy trends",
        "Aligned project goals with Sustainable Development Goals (SDGs)",
        "Worked under expert mentorship using Python, Pandas, and ML frameworks"
      ],
      color: "from-green-500 to-emerald-500",
      icon: "🌱"
    },
    {
      company: "British Airways (via Forage)",
      role: "Virtual Intern – Data Analytics & AI",
      period: "February 2025 - February 2025",
      responsibilities: [
        "Explored data strategies to improve airline operations and customer experience",
        "Built predictive models to enhance operational efficiency",
        "Analyzed real-world airline datasets and generated actionable insights",
        "Applied machine learning techniques and visualized key trends"
      ],
      color: "from-blue-500 to-indigo-500",
      icon: "✈️"
    },
    {
      company: "Self-Initiated",
      role: "ML Project: House Price Prediction",
      period: "April 2025 - April 2025",
      responsibilities: [
        "Built a Linear Regression model to predict housing prices",
        "Used features like income, age, room count, and population metrics",
        "Trained and evaluated model using Scikit-learn in Jupyter Notebook",
        "Visualized results to interpret prediction behavior"
      ],
      color: "from-pink-500 to-red-500",
      icon: "🏠"
    },
    {
      company: "Self-Initiated",
      role: "RAG Project: AskMyPDF AI Chatbot",
      period: "June 2025 - June 2025",
      responsibilities: [
        "Built a privacy-friendly AI chatbot to answer natural language PDF queries",
        "Implemented LangChain, FAISS, and MistralAI for full RAG pipeline",
        "Handled PDF chunking, vector embeddings, and context-aware querying",
        "Developed a clean Streamlit frontend for file upload and live QA",
        "Managed session memory, chat history, and API integration debugging"
      ],
      color: "from-purple-600 to-violet-600",
      icon: "📄"
    }
  ];


  const navigateCard = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveCard(prev => (prev > 0 ? prev - 1 : experiences.length - 1));
    } else {
      setActiveCard(prev => (prev < experiences.length - 1 ? prev + 1 : 0));
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      rotateX: 15
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigateCard('next'),
    onSwipedRight: () => navigateCard('prev'),
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
          Professional Experience
        </motion.h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Experience Cards */}
          <div
            className="relative h-[500px] perspective-1000"
            {...swipeHandlers}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`absolute inset-0 bg-gradient-to-r ${experiences[activeCard].color} p-1 rounded-2xl`}
              >
                <div className="bg-gray-900 p-8 rounded-xl h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 text-6xl p-8 opacity-20">
                    {experiences[activeCard].icon}
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {experiences[activeCard].company}
                    </h3>
                    <h4 className="text-xl text-cyan-400 mb-4">
                      {experiences[activeCard].role}
                    </h4>
                    <p className="text-gray-400 mb-6">
                      {experiences[activeCard].period}
                    </p>

                    <ul className="space-y-3 max-h-[280px] overflow-y-auto custom-scrollbar">
                      {experiences[activeCard].responsibilities.map((resp, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <span className="text-cyan-400 mt-1">▹</span>
                          {resp}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop Navigation */}
          <div className="navigation-container hidden md:flex absolute -right-16 top-1/2 transform -translate-y-1/2 flex-col items-center gap-4">
            {/* Up Arrow */}
            <motion.button
              onClick={() => navigateCard('prev')}
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-cyan-400 
                        transition-all duration-300 hover:scale-110"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </motion.button>

            {/* Dots */}
            <div className="navigation-dots flex flex-col gap-3">
              {experiences.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCard(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 
                    ${activeCard === index
                      ? 'bg-cyan-400 scale-125'
                      : 'bg-gray-600 hover:bg-gray-400'}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Down Arrow */}
            <motion.button
              onClick={() => navigateCard('next')}
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-cyan-400 
                        transition-all duration-300 hover:scale-110"
              whileHover={{ y: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center justify-between w-full px-4">
              <motion.button
                onClick={() => navigateCard('prev')}
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-cyan-400 
                          transition-all duration-300 hover:scale-110"
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>

              <div className="navigation-dots flex gap-3">
                {experiences.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveCard(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 
                      ${activeCard === index
                        ? 'bg-cyan-400 scale-125'
                        : 'bg-gray-600 hover:bg-gray-400'}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={() => navigateCard('next')}
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-cyan-400 
                          transition-all duration-300 hover:scale-110"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 
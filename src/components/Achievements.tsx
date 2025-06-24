import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const achievements = [
    {
      title: "Global Rank 3613 – TCS CodeVita Season 12",
      description: "Achieved a global rank of 3613 in TCS CodeVita Season 12, one of the world’s largest coding competitions, enhancing my problem-solving and programming skills. 💻🌍"
    },
    {
      title: "Certificate of Appreciation – IBM Z Datathon 2024",
      description: "Received recognition for participating in the IBM Z Datathon 2024, gaining hands-on experience and insights from industry experts in data science and AI. 🚀"
    },
    {
      title: "Cyber Cypher 4.0- 2025",
      description: "Participated in Cyber Cypher 4.0 with Team Logic Lords, designing FlexLearn — a gamified educational app prototype to make learning fun and rewarding!🚀📱"
    }
  ];

  const stats = [
  { value: 3613, label: "Global Rank - CodeVita" },
  { value: 3, label: "Hackathon Participations" },
  { value: 5, label: "Technical Certifications" },
  { value: 100, label: "Problems Solved" }
  ];


  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Achievements
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              <h3 className="text-xl font-semibold mb-2 text-cyan-400">
                {achievement.title}
              </h3>
              <p className="text-gray-300">{achievement.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-cyan-400 mb-2">
                {inView && (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                  />
                )}
                +
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
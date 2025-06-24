import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import profilePic from './profile.jpg'; // Import profile picture

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [isMessageActive, setIsMessageActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Format the email body with proper line breaks
      const emailBody = encodeURIComponent(
        `Message: ${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
      );
      
      // Create mailto link with formatted content
      const mailtoLink = `mailto:shloksalunke56@gmail.com?subject=Message from ${encodeURIComponent(formData.name)}&body=${emailBody}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Reset form and close modal
      setFormData({ name: '', email: '', message: '' });
      setIsMessageActive(false);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleFollowClick = () => {
    window.open('https://www.linkedin.com/in/shlok-salunke-4947b429b', '_blank');
  };

  const socialLinks = [
    {
      href: "https://github.com/shloksalunke",
      className: "github",
      icon: <Github className="w-6 h-6" />,
      delay: 0.3
    },
    {
      href: "https://www.linkedin.com/in/shlok-salunke-4947b429b",
      className: "linkedin",
      icon: <Linkedin className="w-6 h-6" />,
      delay: 0.4
    },
    {
      href: "mailto:shloksalunke56@gmail.com",
      className: "email",
      icon: <Mail className="w-6 h-6" />,
      delay: 0.5
    }
  ];

  return (
    <section id="contact" className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black relative" ref={ref}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ff2846] to-[#6944ff] opacity-20" />

      <div className="container mx-auto px-4 py-10 md:py-20 relative z-10">
        <motion.div 
          className="profile-card js-profile-card max-w-[90vw] md:max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="profile-card__img mb-12"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src={profilePic}
              alt="Shlok" 
              className="w-[150px] h-[150px] object-cover rounded-full"
            />
          </motion.div>

          <div className="profile-card__cnt">
            <motion.div 
              className="profile-card__name mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Shlok Salunke
            </motion.div>

            <motion.div 
              className="profile-card__txt"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Artificial Intelligence
            </motion.div>

            <div className="profile-card-social mt-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className={`profile-card-social__item ${link.className}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: link.delay }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="icon-font">
                    {link.icon}
                  </span>
                </motion.a>
              ))}
            </div>

            <motion.div 
              className="profile-card-ctr mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button 
                className="profile-card__button button--blue"
                onClick={() => setIsMessageActive(!isMessageActive)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Message
              </motion.button>
              <motion.button 
                onClick={handleFollowClick}
                className="profile-card__button button--orange"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Follow
              </motion.button>
            </motion.div>

            <AnimatePresence>
              {isMessageActive && (
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.form 
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6"
                    onSubmit={handleSendMessage}
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                  >
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name" 
                        required
                        className="w-full p-4 bg-white/90 border-2 border-gray-200 rounded-lg 
                                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                 transition-all outline-none text-gray-800"
                      />
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email" 
                        required
                        className="w-full p-4 bg-white/90 border-2 border-gray-200 rounded-lg 
                                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                 transition-all outline-none text-gray-800"
                      />
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your Message..."
                        required
                        rows={6}
                        className="w-full p-4 bg-white/90 border-2 border-gray-200 rounded-lg 
                                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                 transition-all outline-none text-gray-800 resize-none"
                      />
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                      <motion.button 
                        type="submit"
                        className="profile-card__button button--blue"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Send
                      </motion.button>

                      <motion.button 
                        type="button"
                        className="profile-card__button button--gray"
                        onClick={() => {
                          setIsMessageActive(false);
                          setFormData({ name: '', email: '', message: '' });
                        }}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Experience } from './components/Experience';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { TestDriveModal } from './components/TestDriveModal';
import { TestDriveProvider } from './context/TestDriveContext';
import { ModelProvider } from './context/ModelContext';
import { AddCarDisplayPage } from './pages/AddCarDisplay';
import { CarDisplaySection } from './components/CarDisplaySection';
import { CarDisplay } from './pages/CarDisplay';

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 50 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -50 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const sectionVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

function HomePage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div id="home" className="relative">
        <Header />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Hero />
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <CarDisplaySection />
        </motion.div>
      </div>
      
      <div id="sticky-container" className="relative">
        <motion.section 
          id="experience" 
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Experience />
        </motion.section>
        
        <motion.section 
          id="services" 
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Services />
        </motion.section>
        
        <motion.section 
          id="about" 
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <About />
        </motion.section>
      </div>
      
      <Footer />
    </motion.div>
  );
}

function App() {
  return (
    <TestDriveProvider>
      <ModelProvider>
        <Router>
          <AnimatePresence mode="wait">
            <div className="min-h-screen bg-custom-black">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add-car-display" element={<AddCarDisplayPage />} />
                <Route path="/car-display" element={<CarDisplay />} />
              </Routes>
              <TestDriveModal />
            </div>
          </AnimatePresence>
        </Router>
      </ModelProvider>
    </TestDriveProvider>
  );
}

export default App;
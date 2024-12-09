import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { useTestDriveModal } from '../context/TestDriveContext';

export function Hero() {
  const { openTestDriveModal } = useTestDriveModal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source 
          src="/src/2024 Lamborghini Revuelto - New Supercar in Beautiful Details.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to improve text readability */}
      <motion.div 
        className="absolute inset-0 bg-custom-black/60 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <Container className="relative z-20">
        <motion.div 
          className="max-w-2xl text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-custom-gold mb-6 leading-tight"
            variants={itemVariants}
          >
            Your Journey,<br />
            Your Style,<br />
            Your Way
          </motion.h1>
          
          <motion.p 
            className="text-xl text-custom-white/70 mb-8 max-w-lg mx-auto md:mx-0"
            variants={itemVariants}
          >
            Experience the pinnacle of automotive excellence with our curated collection of premium vehicles.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            variants={itemVariants}
          >
            <Button 
              variant="primary" 
              size="lg" 
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              animation="none"
              onClick={openTestDriveModal}
              className="hover:scale-105 transition-transform duration-300"
            >
              Book Test Drive
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="hover:scale-105 transition-transform duration-300"
            >
              Explore Inventory
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
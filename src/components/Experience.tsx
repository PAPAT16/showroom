import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Award, Headphones, Star, Zap } from 'lucide-react';
import { Container } from './ui/Container';

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType;
  color: string;
  details: string[];
}

const features: Feature[] = [
  {
    title: 'Premium Protection',
    description: 'Comprehensive warranty coverage and maintenance packages.',
    icon: Shield,
    color: 'text-emerald-400',
    details: [
      '5-Year/Unlimited Mileage Warranty',
      'Complimentary Scheduled Maintenance',
      'Roadside Assistance Program'
    ]
  },
  {
    title: '24/7 Concierge',
    description: 'Round-the-clock support for all automotive needs.',
    icon: Headphones,
    color: 'text-sky-400',
    details: [
      'Instant Technical Support',
      'Global Emergency Assistance',
      'Personal Vehicle Coordinator'
    ]
  },
  {
    title: 'Elite Benefits',
    description: 'Exclusive member events and priority access.',
    icon: Star,
    color: 'text-amber-400',
    details: [
      'Exclusive Model Preview Events',
      'VIP Track Day Experiences',
      'Personalized Performance Tuning'
    ]
  },
  {
    title: 'Advanced Technology',
    description: 'Cutting-edge automotive innovation at your fingertips.',
    icon: Zap,
    color: 'text-purple-400',
    details: [
      'AI-Powered Diagnostics',
      'Over-the-Air Updates',
      'Advanced Driver Assistance'
    ]
  }
];

export function Experience() {
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
    <section 
      id="experience" 
      className="py-20 bg-gradient-to-b from-custom-black to-custom-dark-gray"
    >
      <Container>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold mb-4 section-title"
            style={{ color: 'rgb(187,155,49)' }}
          >
            The DRIVERX Elite Experience
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-custom-white/70 max-w-2xl mx-auto"
          >
            Elevate your automotive journey with our comprehensive suite of premium services, 
            designed to provide unparalleled luxury, support, and innovation.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.title}
              variants={itemVariants}
              className="bg-custom-dark-gray/30 p-6 rounded-2xl hover:bg-custom-dark-gray/50 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <feature.icon className={`w-12 h-12 ${feature.color} mr-4`} />
                <h3 className="text-xl font-bold text-custom-gold">{feature.title}</h3>
              </div>
              <p className="text-custom-white/70 mb-4">{feature.description}</p>
              <ul className="space-y-2 text-custom-white/60">
                {feature.details.map((detail, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2 text-custom-gold">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
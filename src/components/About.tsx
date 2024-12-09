import { motion } from 'framer-motion';
import { 
  Trophy, 
  Globe, 
  Star, 
  Users,
  Rocket,
  Target,
  Heart
} from 'lucide-react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';

const companyValues = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Uncompromising attention to detail in every aspect of our service.',
    color: 'text-emerald-400'
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Driven by a genuine love for automotive excellence.',
    color: 'text-rose-400'
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'Constantly pushing the boundaries of automotive technology.',
    color: 'text-sky-400'
  }
];

export function About() {
  const statsData = [
    {
      icon: Trophy,
      value: '15+',
      label: 'Years of Excellence',
      color: 'text-amber-400'
    },
    {
      icon: Globe,
      value: '50+',
      label: 'Global Locations',
      color: 'text-emerald-400'
    },
    {
      icon: Star,
      value: '4.9',
      label: 'Customer Satisfaction',
      color: 'text-rose-400'
    },
    {
      icon: Users,
      value: '10K+',
      label: 'Satisfied Clients',
      color: 'text-sky-400'
    }
  ];

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
      id="about" 
      className="py-20 bg-gradient-to-b from-custom-dark-gray to-custom-black"
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants}>
            <h2 
              className="text-4xl font-bold mb-6"
              style={{ color: 'rgb(187,155,49)' }}
            >
              About DRIVERX
            </h2>
            <p className="text-custom-white/70 mb-6 leading-relaxed">
              DRIVERX was founded with a singular vision: to redefine the automotive experience. 
              We are more than just a dealership; we are passionate curators of automotive excellence, 
              dedicated to delivering not just vehicles, but dreams on wheels.
            </p>
            <p className="text-custom-white/70 mb-8 leading-relaxed">
              Our commitment transcends traditional boundaries. We believe in creating lasting relationships, 
              providing unparalleled service, and continuously pushing the limits of automotive innovation.
            </p>
            
            {/* Company Values */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {companyValues.map((value) => (
                <motion.div 
                  key={value.title}
                  variants={itemVariants}
                  className="bg-custom-dark-gray/30 p-4 rounded-xl text-center hover:bg-custom-dark-gray/50 transition-all duration-300 ease-in-out transform hover:-translate-y-2"
                >
                  <value.icon className={`w-10 h-10 ${value.color} mx-auto mb-3`} />
                  <h3 className="text-lg font-bold text-custom-white mb-2">{value.title}</h3>
                  <p className="text-custom-white/70 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex space-x-4">
              <Button variant="primary" size="lg">
                Our Story
              </Button>
              <Button variant="outline" size="lg">
                Meet the Team
              </Button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 gap-6"
          >
            {statsData.map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-custom-dark-gray/30 p-6 rounded-2xl text-center hover:bg-custom-dark-gray/50 transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              >
                <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                <h3 className="text-3xl font-bold text-custom-white mb-2">{stat.value}</h3>
                <p className="text-custom-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

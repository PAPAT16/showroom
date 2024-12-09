import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Cars', path: '/car-display' },
    { label: 'About', path: '/#about' },
    { label: 'Experience', path: '/#experience' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (path: string) => {
    if (path.startsWith('/#')) {
      const sectionId = path.split('/#')[1];
      const section = document.getElementById(sectionId);
      
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    } else {
      navigate(path);
      setIsMenuOpen(false);
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 120, 
        damping: 15 
      }
    },
    exit: { 
      opacity: 0, 
      y: -50,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={navVariants}
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-custom-black/20 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => navigateToSection('/')} 
          className="cursor-pointer flex items-center space-x-3"
        >
          <Logo className="h-10 w-25 object-contain" />
          <span 
            className="text-xl font-bold tracking-wider"
            style={{ color: 'rgb(187,155,49)' }}
          >
          
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <motion.button
              key={link.path}
              onClick={() => navigateToSection(link.path)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                text-custom-white/70 
                hover:text-custom-gold 
                transition-colors 
                duration-300 
                font-medium
                relative
                group
              "
            >
              {link.label}
              <span 
                className="
                  absolute 
                  bottom-[-4px] 
                  left-0 
                  w-0 
                  h-[2px] 
                  bg-custom-gold 
                  group-hover:w-full 
                  transition-all 
                  duration-300
                "
              />
            </motion.button>
          ))}
          <Button 
            variant="primary" 
            size="md" 
            onClick={() => navigateToSection('/contact')}
            className="px-6 py-2"
          >
            Contact Us
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="text-custom-white hover:text-custom-gold"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'tween' }}
            className="
              md:hidden 
              fixed 
              top-16 
              left-0 
              right-0 
              bg-custom-black/90 
              backdrop-blur-lg 
              shadow-lg
              py-6
            "
          >
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <motion.button
                  key={link.path}
                  onClick={() => navigateToSection(link.path)}
                  whileTap={{ scale: 0.95 }}
                  className="
                    text-custom-white/80 
                    text-lg 
                    text-left 
                    py-2 
                    hover:text-custom-gold 
                    transition-colors 
                    duration-300
                  "
                >
                  {link.label}
                </motion.button>
              ))}
              <Button 
                variant="primary" 
                size="md" 
                onClick={() => navigateToSection('/contact')}
                className="px-6 py-2"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
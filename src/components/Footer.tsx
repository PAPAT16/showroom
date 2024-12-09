import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-react';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { useTestDriveModal } from '../context/TestDriveContext';

export function Footer() {
  const { openTestDriveModal } = useTestDriveModal();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Models', href: '#models' },
    { label: 'Services', href: '#services' },
    { label: 'Experience', href: '#experience' },
    { label: 'About', href: '#about' },
  ];

  const contactInfo = [
    { 
      icon: MapPin, 
      text: '123 Luxury Drive, Premium District, CA 90210' 
    },
    { 
      icon: Phone, 
      text: '+1 (888) DRIVERX' 
    },
    { 
      icon: Mail, 
      text: 'support@driverx.com' 
    }
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: 'https://facebook.com/driverx',
      color: 'text-blue-600 hover:text-blue-700' 
    },
    { 
      icon: Twitter, 
      href: 'https://twitter.com/driverx',
      color: 'text-sky-500 hover:text-sky-600' 
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/driverx',
      color: 'text-pink-600 hover:text-pink-700' 
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/driverx',
      color: 'text-blue-800 hover:text-blue-900' 
    }
  ];

  return (
    <footer className="bg-custom-black py-16">
      <Container>
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-3xl font-bold text-custom-gold mb-4">DRIVERX</h3>
            <p className="text-custom-white/70 mb-4">
              Redefining automotive excellence through innovation, passion, and unparalleled service.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${social.color} transition-colors duration-300`}
                >
                  <social.icon className="w-6 h-6 hover:scale-110 transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xl font-bold text-custom-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-custom-white/70 hover:text-custom-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button 
                  onClick={openTestDriveModal}
                  className="text-custom-white/70 hover:text-custom-gold transition-colors"
                >
                  Book Test Drive
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className="text-xl font-bold text-custom-gold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <contact.icon className="w-5 h-5 text-custom-gold mt-1 flex-shrink-0" />
                  <span className="text-custom-white/70">{contact.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-xl font-bold text-custom-gold mb-4">Stay Updated</h4>
            <p className="text-custom-white/70 mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 bg-custom-dark-gray text-custom-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-custom-gold"
              />
              <Button 
                variant="primary" 
                className="rounded-l-none"
                onClick={openTestDriveModal}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-custom-dark-gray/30 text-center">
          <p className="text-custom-white/70">
            {currentYear} DRIVERX. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

import React from 'react';
import { 
  Wrench, 
  CarFront, 
  ShieldCheck, 
  Truck, 
  Gauge, 
  Paintbrush 
} from 'lucide-react';
import { Container } from './ui/Container';

const services = [
  {
    icon: Wrench,
    title: 'Precision Maintenance',
    description: 'Comprehensive service and repair for all luxury vehicle models, ensuring peak performance and longevity.',
    color: 'text-custom-gold'
  },
  {
    icon: CarFront,
    title: 'Custom Detailing',
    description: 'Meticulous detailing services that restore and protect your vehicle\'s pristine appearance.',
    color: 'text-custom-gold'
  },
  {
    icon: ShieldCheck,
    title: 'Warranty Protection',
    description: 'Extended warranty options and comprehensive protection plans for complete peace of mind.',
    color: 'text-custom-gold'
  },
  {
    icon: Truck,
    title: 'Concierge Delivery',
    description: 'White-glove delivery service bringing your dream vehicle directly to your doorstep.',
    color: 'text-custom-gold'
  },
  {
    icon: Gauge,
    title: 'Performance Tuning',
    description: 'Advanced performance upgrades and customization for the most discerning automotive enthusiasts.',
    color: 'text-custom-gold'
  },
  {
    icon: Paintbrush,
    title: 'Custom Styling',
    description: 'Bespoke styling packages and personalization to make your vehicle truly unique.',
    color: 'text-custom-gold'
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-custom-black to-custom-dark-gray">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-custom-gold mb-4">
            Our Premium Services
          </h2>
          <p className="text-custom-white/70 max-w-2xl mx-auto">
            Elevate your automotive experience with our comprehensive range of specialized services.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-custom-dark-gray/30 p-6 rounded-2xl hover:bg-custom-dark-gray/50 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <service.icon className={`w-12 h-12 ${service.color} mr-4`} />
                <h3 className="text-xl font-bold text-custom-gold">
                  {service.title}
                </h3>
              </div>
              <p className="text-custom-white/70">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

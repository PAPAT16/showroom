import React from 'react';
import { Shield, Clock, Award } from 'lucide-react';
import { Container } from '../ui/Container';

export function CarFeatures() {
  const features = [
    {
      icon: Shield,
      title: "Premium Protection",
      description: "Comprehensive warranty coverage and maintenance packages for peace of mind."
    },
    {
      icon: Clock,
      title: "24/7 Concierge",
      description: "Round-the-clock support and assistance for all your automotive needs."
    },
    {
      icon: Award,
      title: "Elite Benefits",
      description: "Exclusive member events and priority access to new model releases."
    }
  ];

  return (
    <section id="features" className="py-20 bg-black">
      <Container>
        <h2 className="text-4xl font-bold text-white mb-16 text-center">The Elite Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <feature.icon className="w-16 h-16 text-gold-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
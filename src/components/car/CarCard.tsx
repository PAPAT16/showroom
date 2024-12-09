import React from 'react';
import { Car } from '../../types/car';
import { Button } from '../ui/Button';

interface CarCardProps extends Car { }

export function CarCard({ name, price, image, specs, features }: CarCardProps) {
  return (
    <div className="bg-black rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="relative h-64">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gold-500 text-xl mb-2">Starting at ${price}</p>
        <p className="text-gray-400 mb-4">{specs}</p>
        {features && (
          <div className="mb-4">
            <h4 className="text-white text-sm mb-2">Key Features:</h4>
            <ul className="text-gray-400 text-sm">
              {features.map((feature) => (
                <li key={feature} className="mb-1">• {feature}</li>
              ))}
            </ul>
          </div>
        )}
        <Button variant="primary" className="w-full">
          Learn More
        </Button>
      </div>
    </div>
  );
}
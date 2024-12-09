import React from 'react';

interface CarCardProps {
  name: string;
  price: string;
  image: string;
  specs: string;
}

export function CarCard({ name, price, image, specs }: CarCardProps) {
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
        <button className="w-full bg-gold-500 text-black py-2 rounded-full hover:bg-gold-600 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
}
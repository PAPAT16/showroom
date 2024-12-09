import React from 'react';
import { CarCard } from './CarCard';

export function FeaturedCars() {
  const featuredCars = [
    {
      id: 1,
      name: "S-Class Sedan",
      price: "110,000",
      image: "https://images.unsplash.com/photo-1622200294737-488215cc7e60?auto=format&fit=crop&q=80",
      specs: "4.0L V8 Biturbo | 496 HP"
    },
    {
      id: 2,
      name: "GT Coupé",
      price: "165,000",
      image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80",
      specs: "4.0L V8 | 523 HP"
    },
    {
      id: 3,
      name: "Executive SUV",
      price: "95,000",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80",
      specs: "3.0L I6 | 429 HP"
    }
  ];

  return (
    <section id="featured" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      </div>
    </section>
  );
}
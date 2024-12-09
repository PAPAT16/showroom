import React, { useState } from 'react';
import { Car } from '../../types/car';
import { CarCard } from './CarCard';
import { Button } from '../ui/Button';

interface CarGridProps {
  cars: Car[];
  className?: string;
}

export function CarGrid({ cars, className = '' }: CarGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'sedan', 'suv', 'sports'];

  const filteredCars = selectedCategory === 'all'
    ? cars
    : cars.filter(car => car.category?.toLowerCase() === selectedCategory);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
        {filteredCars.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </div>
    </div>
  );
}
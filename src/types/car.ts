export interface Car {
  id: number;
  name: string;
  price: string;
  image: string;
  specs: string;
  category?: string;
  features?: string[];
}

export interface CarFilters {
  category: string;
  priceRange: [number, number];
}
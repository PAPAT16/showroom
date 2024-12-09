import { Car } from '../types/car';

export const cars: Car[] = [
  {
    id: 1,
    name: "S-Class Sedan",
    price: "110,000",
    image: "https://images.unsplash.com/photo-1622200294737-488215cc7e60?auto=format&fit=crop&q=80",
    specs: "4.0L V8 Biturbo | 496 HP",
    category: "Sedan",
    features: ["Massage Seats", "Night Vision", "Executive Package"]
  },
  {
    id: 2,
    name: "GT Coupé",
    price: "165,000",
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80",
    specs: "4.0L V8 | 523 HP",
    category: "Coupe",
    features: ["Race Mode", "Carbon Fiber Package", "AMG Performance"]
  },
  {
    id: 3,
    name: "Executive SUV",
    price: "95,000",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80",
    specs: "3.0L I6 | 429 HP",
    category: "SUV",
    features: ["Off-Road Package", "Third Row Seating", "Panoramic Roof"]
  }
];
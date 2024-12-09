import { useState } from 'react';
import { motion } from 'framer-motion';
import { useModelContext } from '../context/ModelContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CarDisplaySection() {
  const { models } = useModelContext();
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const handleNextCar = () => {
    setCurrentCarIndex((prev) => (prev + 1) % models.length);
  };

  const handlePrevCar = () => {
    setCurrentCarIndex((prev) => (prev - 1 + models.length) % models.length);
  };

  if (models.length === 0) {
    return null;
  }

  const currentCar = models[currentCarIndex];

  return (
    <motion.section 
      id="car-display"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-custom-black text-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-custom-gold">
          Our Latest Additions
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Car Images Carousel */}
          <div className="relative">
            <div className="flex justify-center items-center space-x-4">
              {models.length > 1 && (
                <button 
                  onClick={handlePrevCar}
                  className="text-custom-gold hover:text-custom-gold/80"
                >
                  <ChevronLeft size={40} />
                </button>
              )}
              
              <motion.div
                key={currentCar.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-full rounded-lg overflow-hidden"
              >
                {currentCar.images.map((image) => (
                  <img 
                    key={image.id}
                    src={image.url} 
                    alt={`${currentCar.name} - ${image.type}`}
                    className={`w-full h-auto object-cover ${
                      image.type === 'main' ? 'block' : 'hidden'
                    }`}
                  />
                ))}
              </motion.div>
              
              {models.length > 1 && (
                <button 
                  onClick={handleNextCar}
                  className="text-custom-gold hover:text-custom-gold/80"
                >
                  <ChevronRight size={40} />
                </button>
              )}
            </div>
          </div>

          {/* Car Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-custom-gold">
              {currentCar.name}
            </h3>
            
            <div className="space-y-4">
              <p className="text-gray-300">{currentCar.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Category</p>
                  <p className="font-semibold">{currentCar.category}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Price</p>
                  <p className="font-semibold">{currentCar.price}</p>
                </div>
              </div>
            </div>

            {/* Additional Image Previews */}
            <div className="flex space-x-4 mt-6">
              {currentCar.images
                .filter((img) => img.type !== 'main')
                .map((image) => (
                  <img 
                    key={image.id}
                    src={image.url} 
                    alt={`${currentCar.name} - ${image.type}`}
                    className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition-opacity"
                  />
                ))
              }
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useModelContext } from '../context/ModelContext';
import { ChevronLeft, ChevronRight, Image, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function CarDisplay() {
  const navigate = useNavigate();
  const { models } = useModelContext();
  const [currentModelIndex, setCurrentModelIndex] = useState(0);

  const handleNextModel = () => {
    setCurrentModelIndex((prev) => (prev + 1) % models.length);
  };

  const handlePrevModel = () => {
    setCurrentModelIndex((prev) => (prev - 1 + models.length) % models.length);
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  if (models.length === 0) {
    return (
      <div className="min-h-screen bg-black/90 backdrop-blur-sm flex items-center justify-center text-white">
        <div className="text-center">
          <Image size={64} className="mx-auto mb-4 text-custom-gold" />
          <h2 className="text-3xl font-bold text-custom-gold">No Cars Available</h2>
          <p className="mt-2 text-gray-400">Add some cars to display them here</p>
          <Button
            variant="primary"
            size="lg"
            onClick={handleReturnHome}
            className="mt-6 flex items-center justify-center space-x-2"
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const currentModel = models[currentModelIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black/90 backdrop-blur-sm text-white flex items-center justify-center p-8"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Return to Home Button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={handleReturnHome}
          className="absolute top-4 left-4"
          icon={<ArrowLeft size={24} />}
        />

        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
          {/* Navigation Button - Previous */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrevModel}
            className="hidden md:flex"
            icon={<ChevronLeft size={32} />}
          />

          {/* Car Details */}
          <motion.div 
            key={currentModel.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-custom-gold mb-4">
              {currentModel.name}
            </h1>
            <p className="text-xl text-gray-300 mb-6">{currentModel.category}</p>
            <p className="text-3xl font-semibold text-white mb-6">
              ${currentModel.price.toLocaleString()}
            </p>
            <p className="text-gray-400 mb-8">{currentModel.description}</p>
            
            <div className="grid grid-cols-3 gap-4">
              {currentModel.specs && (
                <>
                  <div>
                    <h3 className="text-custom-gold font-semibold">Acceleration</h3>
                    <p>{currentModel.specs.acceleration || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="text-custom-gold font-semibold">Top Speed</h3>
                    <p>{currentModel.specs.topSpeed || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="text-custom-gold font-semibold">Power</h3>
                    <p>{currentModel.specs.power || 'N/A'}</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Car Image */}
          <motion.div 
            key={`image-${currentModel.id}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <img 
              src={
                currentModel.images.find(img => img.type === 'main')?.url || 
                currentModel.images[0]?.url
              } 
              alt={currentModel.name} 
              className="max-w-full h-auto object-contain rounded-lg shadow-2xl"
            />
          </motion.div>

          {/* Navigation Button - Next */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleNextModel}
            className="hidden md:flex"
            icon={<ChevronRight size={32} />}
          />

          {/* Mobile Navigation */}
          <div className="md:hidden flex space-x-4 mt-8">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrevModel}
              icon={<ChevronLeft size={24} />}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleNextModel}
              icon={<ChevronRight size={24} />}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

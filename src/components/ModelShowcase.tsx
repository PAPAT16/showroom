import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Circle, CircleDot } from 'lucide-react';
import { Button } from './ui/Button';
import { useTestDriveModal } from '../context/TestDriveContext';

interface Model {
  id: string;
  name: string;
  category: string;
  price: string;
  specs: {
    acceleration: string;
    topSpeed: string;
    power: string;
  };
  description: string;
  images: {
    main: string;
    interior: string;
    side: string;
    rear: string;
  };
}

const luxuryModels: Model[] = [
  {
    id: '1',
    name: 'Phantom Sovereign',
    category: 'Luxury Sedan',
    price: '$450,000',
    specs: {
      acceleration: '0-60 mph: 4.3s',
      topSpeed: '155 mph',
      power: '563 hp',
    },
    description: 'The epitome of luxury, combining timeless elegance with cutting-edge technology.',
    images: {
      main: 'src/Model=Urus SE, Type=LightCC (1).jpg',
      interior: 'src/Model=Urus SE, Type=LightCC (1).jpg',
      side: 'src/Model=Urus SE, Type=LightCC (1).jpg',
      rear: 'src/Model=Urus SE, Type=LightCC (1).jpg',
    }
  },
  {
    id: '2',
    name: 'Vanguard GT',
    category: 'Sports Car',
    price: '$385,000',
    specs: {
      acceleration: '0-60 mph: 2.8s',
      topSpeed: '205 mph',
      power: '710 hp',
    },
    description: 'Precision engineering meets raw power in this masterpiece of automotive design.',
    images: {
      main: '/models/vanguard-front.jpg',
      interior: '/models/vanguard-interior.jpg',
      side: '/models/vanguard-side.jpg',
      rear: '/models/vanguard-rear.jpg',
    }
  },
  {
    id: '3',
    name: 'Celestial SUV',
    category: 'Luxury SUV',
    price: '$325,000',
    specs: {
      acceleration: '0-60 mph: 3.5s',
      topSpeed: '180 mph',
      power: '650 hp',
    },
    description: 'Dominate any terrain while surrounded by unparalleled luxury and comfort.',
    images: {
      main: '/models/celestial-front.jpg',
      interior: '/models/celestial-interior.jpg',
      side: '/models/celestial-side.jpg',
      rear: '/models/celestial-rear.jpg',
    }
  },
];

export function ModelShowcase() {
  const [activeModel, setActiveModel] = useState<Model>(luxuryModels[0]);
  const [activeView, setActiveView] = useState<keyof Model['images']>('main');
  const [direction, setDirection] = useState(0);
  const { openTestDriveModal } = useTestDriveModal();

  const handleNext = () => {
    setDirection(1);
    const currentIndex = luxuryModels.findIndex(model => model.id === activeModel.id);
    const nextIndex = (currentIndex + 1) % luxuryModels.length;
    setActiveModel(luxuryModels[nextIndex]);
    setActiveView('main');
  };

  const handlePrev = () => {
    setDirection(-1);
    const currentIndex = luxuryModels.findIndex(model => model.id === activeModel.id);
    const prevIndex = currentIndex === 0 ? luxuryModels.length - 1 : currentIndex - 1;
    setActiveModel(luxuryModels[prevIndex]);
    setActiveView('main');
  };

  const handleViewChange = (view: keyof Model['images']) => {
    setActiveView(view);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const imageVariants = {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-custom-black overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={`${activeModel.id}-${activeView}`}
          className="absolute inset-0 w-full h-full"
          custom={direction}
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
            style={{ backgroundImage: `url(${activeModel.images[activeView]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-custom-black via-custom-black/80 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-custom-gold text-xl font-semibold">
                {activeModel.category}
              </h3>
              <h2 className="text-5xl font-bold text-white font-orbitron">
                {activeModel.name}
              </h2>
              <p className="text-3xl text-custom-gold font-light">
                {activeModel.price}
              </p>
            </motion.div>

            <motion.p 
              className="text-white/80 text-lg max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {activeModel.description}
            </motion.p>

            <motion.div 
              className="grid grid-cols-3 gap-6 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {Object.entries(activeModel.specs).map(([key, value]) => (
                <div key={key} className="text-center">
                  <p className="text-custom-gold font-semibold">{value}</p>
                  <p className="text-white/60 text-sm capitalize">{key}</p>
                </div>
              ))}
            </motion.div>

            {/* View Selection */}
            <motion.div 
              className="flex space-x-6 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {(Object.keys(activeModel.images) as Array<keyof Model['images']>).map((view) => (
                <button
                  key={view}
                  onClick={() => handleViewChange(view)}
                  className={`flex flex-col items-center space-y-2 group ${
                    activeView === view ? 'text-custom-gold' : 'text-white/60'
                  }`}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden group-hover:ring-2 group-hover:ring-custom-gold transition-all">
                    <img 
                      src={activeModel.images[view]} 
                      alt={`${view} view`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm capitalize">
                    {view === 'main' ? 'Front' : view}
                  </span>
                </button>
              ))}
            </motion.div>

            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button 
                variant="primary" 
                size="lg" 
                onClick={openTestDriveModal}
              >
                Book Test Drive
              </Button>
              <Button 
                variant="outline" 
                size="lg"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -left-20 top-1/2 transform -translate-y-1/2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-custom-gold/10 hover:bg-custom-gold/20 transition-colors"
              >
                <ChevronLeft className="w-8 h-8 text-custom-gold" />
              </button>
            </div>
            <div className="absolute -right-20 top-1/2 transform -translate-y-1/2">
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-custom-gold/10 hover:bg-custom-gold/20 transition-colors"
              >
                <ChevronRight className="w-8 h-8 text-custom-gold" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Model Selection Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {luxuryModels.map((model) => (
          <button
            key={model.id}
            onClick={() => {
              setDirection(model.id > activeModel.id ? 1 : -1);
              setActiveModel(model);
              setActiveView('main');
            }}
            className="focus:outline-none"
          >
            {model.id === activeModel.id ? (
              <CircleDot className="w-4 h-4 text-custom-gold" />
            ) : (
              <Circle className="w-4 h-4 text-white/40" />
            )}
          </button>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-20 left-0 right-0 flex justify-center space-x-4 z-20">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-custom-gold/10 hover:bg-custom-gold/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-custom-gold" />
        </button>
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-custom-gold/10 hover:bg-custom-gold/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-custom-gold" />
        </button>
      </div>
    </section>
  );
}

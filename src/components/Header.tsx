import React from 'react';
import { Car } from 'lucide-react';
import { useTestDriveModal } from '../context/TestDriveContext';
import { TestDriveModal } from './TestDriveModal';

export function Navbar() {
  const { openTestDriveModal, isTestDriveModalOpen, closeTestDriveModal } = useTestDriveModal();

  return (
    <>
      <nav className="fixed w-full bg-white/20 backdrop-blur-lg z-50 rounded-b-[40px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-custom-gold" />
               <span className="text-2xl font-bold text-custom-gold">DRIVERX</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#featured" className="text-custom-gold hover:text-custom-gold/80 transition-colors">Featured</a>
                <a href="#experience" className="text-custom-gold hover:text-custom-gold/80 transition-colors">Experience</a>
                <button 
                  onClick={openTestDriveModal}
                  className="bg-custom-gold text-black px-6 py-2 rounded-full hover:bg-custom-gold/80 transition-colors"
                >
                  Book Test Drive
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <TestDriveModal 
        isOpen={isTestDriveModalOpen} 
        onClose={closeTestDriveModal} 
      />
    </>
  );
}
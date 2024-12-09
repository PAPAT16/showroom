import React, { useState, FormEvent } from 'react';
import { X, Car } from 'lucide-react';
import { Button } from './ui/Button';
import { useTestDriveModal } from '../context/TestDriveContext';

export function TestDriveModal() {
  const { isTestDriveModalOpen, closeTestDriveModal } = useTestDriveModal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    model: '',
    preferredDate: '',
    preferredTime: ''
  });

  const carModels = [
    'Luxury Sedan',
    'Sports Coupe',
    'SUV',
    'Electric Vehicle',
    'Convertible',
    'Performance Sedan'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.phone || !formData.model) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically send the data to a backend service
    console.log('Test Drive Booking Submitted:', formData);
    
    // Show success message
    alert(`Thank you, ${formData.name}! Your test drive for the ${formData.model} has been scheduled.`);
    
    // Reset form and close modal
    setFormData({
      name: '',
      email: '',
      phone: '',
      model: '',
      preferredDate: '',
      preferredTime: ''
    });
    closeTestDriveModal();
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: '',
      email: '',
      phone: '',
      model: '',
      preferredDate: '',
      preferredTime: ''
    });
    
    // Close the modal
    closeTestDriveModal();
  };

  if (!isTestDriveModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex justify-center items-center">
      <div className="bg-custom-dark-gray rounded-2xl w-full max-w-sm mx-4 p-6 relative">
        <button 
          onClick={closeTestDriveModal} 
          className="absolute top-3 right-3 text-custom-white hover:text-custom-gold"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-4">
          <Car className="w-12 h-12 mx-auto text-custom-gold mb-2" />
          <h2 className="text-2xl font-bold text-custom-gold">Book a Test Drive</h2>
          <p className="text-custom-white/70 text-sm mt-1">
            Experience the pinnacle of automotive excellence
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-custom-white/70 mb-1 text-sm">Full Name*</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
              className="w-full px-3 py-2 bg-custom-black/30 text-custom-white rounded-lg focus:outline-none focus:ring-1 focus:ring-custom-gold text-sm"
            />
          </div>

          <div>
            <label className="block text-custom-white/70 mb-1 text-sm">Email*</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-custom-black/30 text-custom-white rounded-lg focus:outline-none focus:ring-1 focus:ring-custom-gold text-sm"
            />
          </div>

          <div>
            <label className="block text-custom-white/70 mb-1 text-sm">Phone*</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 bg-custom-black/30 text-custom-white rounded-lg focus:outline-none focus:ring-1 focus:ring-custom-gold text-sm"
            />
          </div>

          <div>
            <label className="block text-custom-white/70 mb-1 text-sm">Select Model*</label>
            <select 
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-custom-black/30 text-custom-white rounded-lg focus:outline-none focus:ring-1 focus:ring-custom-gold text-sm"
            >
              <option value="">Choose a model</option>
              {carModels.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-custom-white/70 mb-1 text-sm">Preferred Date</label>
              <input 
                type="date" 
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-custom-black/30 text-custom-white rounded-lg focus:outline-none focus:ring-1 focus:ring-custom-gold text-sm"
              />
            </div>
            <div>
              <label className="block text-custom-white/70 mb-1 text-sm">Preferred Time</label>
              <input 
                type="time" 
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-custom-black/30 text-custom-white rounded-lg focus:outline-none focus:ring-1 focus:ring-custom-gold text-sm"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              className="flex-1"
            >
              Book Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

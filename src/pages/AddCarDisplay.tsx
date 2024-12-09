import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModelContext } from '../context/ModelContext';
import { ImagePlus, Link, Upload, Trash2, Edit } from 'lucide-react';

export function AddCarDisplayPage() {
  const { models, addModel, deleteModel, updateModel } = useModelContext();
  const [carDetails, setCarDetails] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    images: [] as { id: string, name: string, url: string, type: 'main' | 'interior' | 'side' | 'rear' }[]
  });

  const [imageInputs, setImageInputs] = useState({
    main: { url: '', file: null as File | null },
    interior: { url: '', file: null as File | null },
    side: { url: '', file: null as File | null },
    rear: { url: '', file: null as File | null }
  });

  const [editingModel, setEditingModel] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCarDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUrlChange = (type: 'main' | 'interior' | 'side' | 'rear', url: string) => {
    setImageInputs(prev => ({
      ...prev,
      [type]: { ...prev[type], url }
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'interior' | 'side' | 'rear') => {
    const file = e.target.files?.[0];
    if (file) {
      setImageInputs(prev => ({
        ...prev,
        [type]: { ...prev[type], file }
      }));
    }
  };

  const processImage = (type: 'main' | 'interior' | 'side' | 'rear'): Promise<{ id: string, name: string, url: string, type: 'main' | 'interior' | 'side' | 'rear' } | null> => {
    return new Promise((resolve) => {
      const input = imageInputs[type];
      
      // Prioritize file upload over URL
      if (input.file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            id: `image_${type}_${Date.now()}`,
            name: input.file!.name,
            url: reader.result as string,
            type: type
          });
        };
        reader.readAsDataURL(input.file);
      } else if (input.url) {
        // Validate URL
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (urlRegex.test(input.url)) {
          resolve({
            id: `image_${type}_${Date.now()}`,
            name: `${type}_image_url`,
            url: input.url,
            type: type
          });
        } else {
          alert(`Invalid URL for ${type} image`);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!carDetails.name || !carDetails.category || !carDetails.price) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Process images
      const processedImages = await Promise.all([
        processImage('main'),
        processImage('interior'),
        processImage('side'),
        processImage('rear')
      ]);

      // Filter out null images
      const validImages = processedImages.filter(img => img !== null) as { 
        id: string, 
        name: string, 
        url: string, 
        type: 'main' | 'interior' | 'side' | 'rear' 
      }[];

      // Ensure at least one image is added
      if (validImages.length === 0) {
        alert('Please add at least one image');
        return;
      }

      // Check if editing an existing model or adding a new one
      if (editingModel) {
        // Update existing model
        updateModel(editingModel, {
          ...carDetails,
          id: editingModel,
          images: validImages,
          specs: {
            acceleration: '',
            topSpeed: '',
            power: ''
          }
        });
        setEditingModel(null);
      } else {
        // Add new model
        addModel({
          ...carDetails,
          id: `car_${Date.now()}`,
          images: validImages,
          specs: {
            acceleration: '',
            topSpeed: '',
            power: ''
          }
        });
      }

      // Reset form
      setCarDetails({
        name: '',
        category: '',
        price: '',
        description: '',
        images: []
      });

      setImageInputs({
        main: { url: '', file: null },
        interior: { url: '', file: null },
        side: { url: '', file: null },
        rear: { url: '', file: null }
      });

      alert('Car added/updated successfully!');
    } catch (error) {
      console.error('Error adding/updating car:', error);
      alert('Failed to add/update car. Please try again.');
    }
  };

  const handleEditModel = (model: CarModel) => {
    setEditingModel(model.id);
    setCarDetails({
      name: model.name,
      category: model.category,
      price: model.price,
      description: model.description,
      images: model.images
    });
    
    // Reset image inputs
    setImageInputs({
      main: { url: '', file: null },
      interior: { url: '', file: null },
      side: { url: '', file: null },
      rear: { url: '', file: null }
    });
  };

  const handleDeleteModel = (modelId: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      deleteModel(modelId);
    }
  };

  const ImageUploadSection = (type: 'main' | 'interior' | 'side' | 'rear') => {
    const input = imageInputs[type];
    
    return (
      <div className="space-y-2">
        <label className="block text-custom-gold mb-2 capitalize">{type} Image</label>
        
        <div className="grid grid-cols-2 gap-4">
          {/* URL Input */}
          <div className="relative">
            <div className="flex items-center">
              <Link className="absolute left-3 text-custom-gold/70" size={20} />
              <input 
                type="text" 
                placeholder="Image URL"
                value={input.url}
                onChange={(e) => handleImageUrlChange(type, e.target.value)}
                className="w-full bg-gray-900/50 backdrop-blur-sm text-white p-3 pl-10 rounded hover:bg-gray-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-custom-gold"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="relative">
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleFileUpload(e, type)}
              className="hidden"
              id={`file-upload-${type}`}
            />
            <label 
              htmlFor={`file-upload-${type}`}
              className="flex items-center justify-center w-full bg-gray-800 text-white p-3 rounded cursor-pointer hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-custom-gold"
            >
              <Upload className="mr-2 text-custom-gold" size={20} />
              Choose File
            </label>
          </div>
        </div>

        {/* Preview */}
        {(input.url || input.file) && (
          <div className="mt-4">
            <img 
              src={input.file ? URL.createObjectURL(input.file) : input.url}
              alt={`${type} preview`}
              className="w-full h-40 object-cover rounded"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black/90 backdrop-blur-sm text-white p-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-custom-gold flex items-center">
          <ImagePlus className="mr-4 text-custom-gold" size={40} />
          {editingModel ? 'Edit Car Display' : 'Add Car Display'}
        </h1>
        
        {/* Existing Models Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-custom-gold mb-4">Existing Cars</h2>
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model) => (
                <motion.div 
                  key={model.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 relative hover:bg-gray-800/60 transition-colors"
                >
                  {/* Car Image */}
                  <div className="mb-4">
                    <img 
                      src={model.images.find(img => img.type === 'main')?.url || model.images[0]?.url} 
                      alt={model.name} 
                      className="w-full h-40 object-cover rounded"
                    />
                  </div>

                  {/* Car Details */}
                  <div>
                    <h3 className="text-xl font-bold text-custom-gold">{model.name}</h3>
                    <p className="text-gray-400">{model.category}</p>
                    <p className="text-white font-semibold">${model.price}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <motion.button
                      onClick={() => handleEditModel(model)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-custom-gold/20 text-custom-gold p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-custom-gold"
                    >
                      <Edit size={20} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteModel(model.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-red-500/20 text-red-500 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-custom-gold">Car Name</label>
            <input 
              type="text"
              name="name"
              value={carDetails.name}
              onChange={handleInputChange}
              className="w-full bg-gray-900/50 backdrop-blur-sm text-white p-3 rounded hover:bg-gray-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-custom-gold"
              placeholder="Enter car name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-custom-gold">Category</label>
            <input 
              type="text"
              name="category"
              value={carDetails.category}
              onChange={handleInputChange}
              className="w-full bg-gray-900/50 backdrop-blur-sm text-white p-3 rounded hover:bg-gray-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-custom-gold"
              placeholder="Enter car category"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-custom-gold">Price</label>
            <input 
              type="text"
              name="price"
              value={carDetails.price}
              onChange={handleInputChange}
              className="w-full bg-gray-900/50 backdrop-blur-sm text-white p-3 rounded hover:bg-gray-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-custom-gold"
              placeholder="Enter car price"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-custom-gold">Description</label>
            <textarea 
              name="description"
              value={carDetails.description}
              onChange={handleInputChange}
              className="w-full bg-gray-900/50 backdrop-blur-sm text-white p-3 rounded hover:bg-gray-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-custom-gold"
              placeholder="Enter car description"
              rows={4}
            />
          </div>

          {/* Image Upload Sections */}
          <div className="space-y-6">
            {ImageUploadSection('main')}
            {ImageUploadSection('interior')}
            {ImageUploadSection('side')}
            {ImageUploadSection('rear')}
          </div>

          <button 
            type="submit"
            className="w-full bg-custom-gold text-black p-4 rounded-full hover:bg-custom-gold/80 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-custom-gold/50"
          >
            <ImagePlus className="mr-2" size={24} />
            {editingModel ? 'Update Car Display' : 'Add Car Display'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

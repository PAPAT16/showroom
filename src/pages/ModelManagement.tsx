import React, { useState, FormEvent, useContext } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Upload, Image } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ModelContext } from '../context/ModelContext';

interface ModelImage {
  id: string;
  name: string;
  url: string;
  type: 'main' | 'interior' | 'side' | 'rear';
}

interface ModelFormData {
  id?: string;
  name: string;
  category: string;
  price: string;
  specs: {
    acceleration: string;
    topSpeed: string;
    power: string;
  };
  description: string;
  images: ModelImage[];
}

export function ModelManagementPage() {
  const { models, addModel, updateModel, deleteModel } = useContext(ModelContext);
  
  const [isAddingModel, setIsAddingModel] = useState(false);
  const [editingModel, setEditingModel] = useState<ModelFormData | null>(null);
  
  const [formData, setFormData] = useState<ModelFormData>({
    name: '',
    category: '',
    price: '',
    specs: {
      acceleration: '',
      topSpeed: '',
      power: ''
    },
    description: '',
    images: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested specs
    if (name.startsWith('specs.')) {
      const specKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specs: {
          ...prev.specs,
          [specKey]: value
        }
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: ModelImage['type']) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage: ModelImage = {
          id: `${Date.now()}-${type}`,
          name: file.name,
          url: reader.result as string,
          type
        };

        setFormData(prev => ({
          ...prev,
          images: [...prev.images.filter(img => img.type !== type), newImage]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (imageId: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.category || !formData.price || formData.images.length === 0) {
      alert('Please fill in all required fields and upload at least one image');
      return;
    }

    if (editingModel) {
      // Update existing model
      updateModel({
        ...formData,
        id: editingModel.id
      });
    } else {
      // Add new model
      addModel({
        ...formData,
        id: `${Date.now()}`
      });
    }

    // Reset form
    setFormData({
      name: '',
      category: '',
      price: '',
      specs: {
        acceleration: '',
        topSpeed: '',
        power: ''
      },
      description: '',
      images: []
    });
    setIsAddingModel(false);
    setEditingModel(null);
  };

  const handleEdit = (model: ModelFormData) => {
    setEditingModel(model);
    setFormData(model);
    setIsAddingModel(true);
  };

  const imageTypes: ModelImage['type'][] = ['main', 'interior', 'side', 'rear'];

  return (
    <div className="container mx-auto px-4 py-12 bg-custom-black min-h-screen text-custom-white">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-custom-gold">Model Management</h1>
          <Button 
            variant="primary" 
            onClick={() => setIsAddingModel(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Model</span>
          </Button>
        </div>

        {isAddingModel && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-custom-dark-gray rounded-lg p-6 mb-8 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Model Name*</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-custom-black/30 text-custom-white rounded-lg focus:outline-none focus:ring-1 focus:ring-custom-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category*</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-custom-black/30 text-custom-white rounded-lg focus:outline-none focus:ring-1 focus:ring-custom-gold"
                >
                  <option value="">Select Category</option>
                  <option value="Luxury Sedan">Luxury Sedan</option>
                  <option value="Sports Car">Sports Car</option>
                  <option value="Luxury SUV">Luxury SUV</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Price*</label>
                <input 
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-custom-black/30 text-custom-white rounded-lg focus:outline-none focus:ring-1 focus:ring-custom-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-custom-black/30 text-custom-white rounded-lg focus:outline-none focus:ring-1 focus:ring-custom-gold"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Acceleration</label>
                <input 
                  type="text"
                  name="specs.acceleration"
                  value={formData.specs.acceleration}
                  onChange={handleInputChange}
                  placeholder="0-60 mph"
                  className="w-full px-3 py-2 bg-custom-black/30 text-custom-white rounded-lg focus:outline-none focus:ring-1 focus:ring-custom-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Top Speed</label>
                <input 
                  type="text"
                  name="specs.topSpeed"
                  value={formData.specs.topSpeed}
                  onChange={handleInputChange}
                  placeholder="Max Speed"
                  className="w-full px-3 py-2 bg-custom-black/30 text-custom-white rounded-lg focus:outline-none focus:ring-1 focus:ring-custom-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Power</label>
                <input 
                  type="text"
                  name="specs.power"
                  value={formData.specs.power}
                  onChange={handleInputChange}
                  placeholder="Horsepower"
                  className="w-full px-3 py-2 bg-custom-black/30 text-custom-white rounded-lg focus:outline-none focus:ring-1 focus:ring-custom-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-4">Model Images*</label>
              <div className="grid md:grid-cols-4 gap-4">
                {imageTypes.map((type) => (
                  <div key={type} className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      id={`upload-${type}`}
                      onChange={(e) => handleImageUpload(e, type)}
                      className="hidden"
                    />
                    <label 
                      htmlFor={`upload-${type}`}
                      className={`
                        w-full h-40 border-2 border-dashed rounded-lg flex flex-col 
                        items-center justify-center cursor-pointer transition-colors
                        ${formData.images.some(img => img.type === type) 
                          ? 'border-custom-gold' 
                          : 'border-white/20 hover:border-custom-gold'
                        }
                      `}
                    >
                      {formData.images.find(img => img.type === type) ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={formData.images.find(img => img.type === type)?.url} 
                            alt={type} 
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              removeImage(formData.images.find(img => img.type === type)!.id);
                            }}
                            className="absolute top-2 right-2 bg-red-500/80 p-1 rounded-full hover:bg-red-600/80"
                          >
                            <Trash2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 text-white/50 mb-2" />
                          <span className="text-white/60 capitalize">{type} View</span>
                        </>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                type="submit" 
                variant="primary"
                className="flex-1"
              >
                {editingModel ? 'Update Model' : 'Add Model'}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setIsAddingModel(false);
                  setEditingModel(null);
                  setFormData({
                    name: '',
                    category: '',
                    price: '',
                    specs: {
                      acceleration: '',
                      topSpeed: '',
                      power: ''
                    },
                    description: '',
                    images: []
                  });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-custom-gold mb-6">Existing Models</h2>
          {models.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              <Image className="w-16 h-16 mx-auto mb-4 text-white/40" />
              <p>No models added yet. Click "Add New Model" to get started.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model) => (
                <motion.div 
                  key={model.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-custom-dark-gray rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="relative h-48">
                    <img 
                      src={model.images.find(img => img.type === 'main')?.url || ''} 
                      alt={model.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-custom-gold mb-2">{model.name}</h3>
                    <p className="text-white/70 mb-4">{model.category}</p>
                    <div className="flex justify-between">
                      <span className="text-custom-gold font-semibold">{model.price}</span>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(model)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteModel(model.id!)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

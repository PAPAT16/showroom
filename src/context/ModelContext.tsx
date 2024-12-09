import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Image {
  id: string;
  name: string;
  url: string;
  type: 'main' | 'interior' | 'side' | 'rear';
}

interface CarSpecs {
  acceleration: string;
  topSpeed: string;
  power: string;
}

export interface CarModel {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  images: Image[];
  specs: CarSpecs;
}

interface ModelContextType {
  models: CarModel[];
  addModel: (model: CarModel) => void;
  updateModel: (id: string, model: CarModel) => void;
  deleteModel: (id: string) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const [models, setModels] = useState<CarModel[]>(() => {
    // Initialize from localStorage
    const savedModels = localStorage.getItem('driverx-models');
    return savedModels ? JSON.parse(savedModels) : [];
  });

  // Save to localStorage whenever models change
  const saveModels = (updatedModels: CarModel[]) => {
    setModels(updatedModels);
    localStorage.setItem('driverx-models', JSON.stringify(updatedModels));
  };

  const addModel = (model: CarModel) => {
    const updatedModels = [...models, model];
    saveModels(updatedModels);
  };

  const updateModel = (id: string, updatedModel: CarModel) => {
    const updatedModels = models.map(model => 
      model.id === id ? updatedModel : model
    );
    saveModels(updatedModels);
  };

  const deleteModel = (id: string) => {
    const updatedModels = models.filter(model => model.id !== id);
    saveModels(updatedModels);
  };

  return (
    <ModelContext.Provider value={{ 
      models, 
      addModel, 
      updateModel, 
      deleteModel 
    }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModelContext() {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModelContext must be used within a ModelProvider');
  }
  return context;
}

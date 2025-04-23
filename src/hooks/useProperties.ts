import { useState, useEffect } from 'react';
import { 
  getAllProperties, 
  getPropertyById, 
  filterProperties as filterPropertiesService,
  addProperty as addPropertyService,
  updateProperty as updatePropertyService,
  removeProperty as removePropertyService
} from '@/services/propertyService';
import { Property, PropertyFilter } from '@/types/property';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProperties();
      setProperties(data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar imóveis');
      setLoading(false);
      console.error(err);
    }
  };

  const getProperty = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const property = await getPropertyById(id);
      setLoading(false);
      return property;
    } catch (err) {
      setError('Erro ao carregar imóvel');
      setLoading(false);
      console.error(err);
      return null;
    }
  };

  const filterProperties = async (filters: PropertyFilter) => {
    setLoading(true);
    setError(null);
    try {
      // Mapear o transactionType para o campo type do serviço
      const serviceFilters = {
        ...filters,
        type: filters.transactionType
      };
      
      // Remover o transactionType pois ele não é usado no serviço
      delete serviceFilters.transactionType;
      
      const filtered = await filterPropertiesService(serviceFilters);
      setProperties(filtered);
      setLoading(false);
      return filtered;
    } catch (err) {
      setError('Erro ao filtrar imóveis');
      setLoading(false);
      console.error(err);
      return [];
    }
  };

  const addProperty = async (property: Omit<Property, 'id'>, imageFile?: File) => {
    setLoading(true);
    setError(null);
    try {
      const newProperty = await addPropertyService(property, imageFile);
      if (newProperty) {
        setProperties([...properties, newProperty]);
      }
      setLoading(false);
      return newProperty;
    } catch (err) {
      setError('Erro ao adicionar imóvel');
      setLoading(false);
      console.error(err);
      return null;
    }
  };

  const updateProperty = async (id: string, updates: Partial<Property>, imageFile?: File) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProperty = await updatePropertyService(id, updates, imageFile);
      if (updatedProperty) {
        setProperties(
          properties.map(property => 
            property.id === id ? updatedProperty : property
          )
        );
      }
      setLoading(false);
      return updatedProperty;
    } catch (err) {
      setError('Erro ao atualizar imóvel');
      setLoading(false);
      console.error(err);
      return null;
    }
  };

  const removeProperty = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const success = await removePropertyService(id);
      if (success) {
        setProperties(properties.filter(property => property.id !== id));
      }
      setLoading(false);
      return success;
    } catch (err) {
      setError('Erro ao remover imóvel');
      setLoading(false);
      console.error(err);
      return false;
    }
  };

  return {
    properties,
    loading,
    error,
    fetchProperties,
    getProperty,
    filterProperties,
    addProperty,
    updateProperty,
    removeProperty
  };
} 
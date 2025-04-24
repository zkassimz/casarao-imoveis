import { Property } from '../types/property';
import { properties } from './properties';

// Função para obter todos os imóveis
export function getAllProperties(): Property[] {
  // Em uma aplicação real, isso buscaria dados de uma API ou banco de dados
  // Por enquanto, usamos os dados de exemplo
  return [...properties];
}

// Função para obter um imóvel pelo ID
export function getPropertyById(id: string): Property | undefined {
  return properties.find((property) => property.id === id);
}

// Função para filtrar imóveis
export function filterProperties(filters: {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  propertyType?: string;
}): Property[] {
  let filtered = [...properties];
  
  if (filters.minPrice) {
    filtered = filtered.filter(property => property.price >= filters.minPrice!);
  }
  
  if (filters.maxPrice) {
    filtered = filtered.filter(property => property.price <= filters.maxPrice!);
  }
  
  if (filters.bedrooms) {
    filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms!);
  }
  
  if (filters.propertyType) {
    filtered = filtered.filter(property => property.propertyType === filters.propertyType);
  }
  
  return filtered;
}

// Função para adicionar um novo imóvel
export function addProperty(property: Omit<Property, 'id'>): Property {
  // Em uma aplicação real, isso enviaria dados para uma API ou banco de dados
  // Por enquanto, apenas simulamos a adição ao array local
  
  // Gerar um novo ID (em uma aplicação real, isso seria feito pelo backend)
  const highestId = properties.reduce((max, p) => {
    const id = parseInt(p.id);
    return id > max ? id : max;
  }, 0);
  
  const newId = (highestId + 1).toString();
  
  const newProperty: Property = {
    ...property,
    id: newId
  };
  
  // Adicionar à lista (em uma aplicação real, isso seria persistido)
  properties.push(newProperty);
  
  return newProperty;
}

// Função para atualizar um imóvel existente
export function updateProperty(id: string, updates: Partial<Property>): Property | undefined {
  // Em uma aplicação real, isso enviaria dados para uma API ou banco de dados
  // Por enquanto, apenas simulamos a atualização no array local
  
  const index = properties.findIndex((property) => property.id === id);
  
  if (index === -1) {
    return undefined;
  }
  
  // Atualizar o imóvel
  properties[index] = {
    ...properties[index],
    ...updates
  };
  
  return properties[index];
}

// Função para remover um imóvel
export function deleteProperty(id: string): boolean {
  // Em uma aplicação real, isso enviaria uma solicitação para uma API ou banco de dados
  // Por enquanto, apenas simulamos a remoção do array local
  
  const index = properties.findIndex((property) => property.id === id);
  
  if (index === -1) {
    return false;
  }
  
  // Remover o imóvel
  properties.splice(index, 1);
  
  return true;
}

// Função para salvar os dados em um arquivo JSON (simulação)
export function savePropertiesToJSON(): string {
  // Em uma aplicação real, isso seria feito pelo backend
  // Aqui apenas convertemos para string JSON para demonstração
  return JSON.stringify(properties, null, 2);
}

// Função para carregar dados de um arquivo JSON (simulação)
export function loadPropertiesFromJSON(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData) as Property[];
    
    // Validar se os dados têm o formato correto
    if (!Array.isArray(data)) {
      return false;
    }
    
    // Limpar dados existentes e adicionar novos
    properties.length = 0;
    properties.push(...data);
    
    return true;
  } catch (error) {
    console.error('Erro ao carregar dados JSON:', error);
    return false;
  }
}

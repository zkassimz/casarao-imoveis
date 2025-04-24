import { Property } from '../types/property';
import { Timestamp } from 'firebase/firestore';

// Propriedades de exemplo - usando URLs estáveis do Unsplash
export const properties: Property[] = [
  {
    id: '1',
    title: 'Casa de Luxo em Alphaville',
    price: 1200000,
    address: 'Rua das Palmeiras, 123 - Alphaville',
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    type: 'venda',
    propertyType: 'casa',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    description: 'Luxuosa casa em condomínio fechado, com piscina, espaço gourmet e vista panorâmica.',
    features: ['Piscina', 'Jardim', 'Academia', 'Segurança 24h', 'Garagem para 4 carros'],
    status: 'disponível',
    createdAt: Timestamp.fromDate(new Date('2023-01-10')),
    updatedAt: Timestamp.fromDate(new Date('2023-01-10'))
  },
  {
    id: '2',
    title: 'Apartamento Moderno no Centro',
    price: 450000,
    address: 'Av. Paulista, 1500 - Centro',
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    type: 'venda',
    propertyType: 'apartamento',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    description: 'Apartamento moderno com excelente localização, próximo a transporte público e centros comerciais.',
    features: ['Varanda', 'Academia', 'Portaria 24h', 'Área de lazer'],
    status: 'disponível',
    createdAt: Timestamp.fromDate(new Date('2023-02-15')),
    updatedAt: Timestamp.fromDate(new Date('2023-02-15'))
  },
  {
    id: '3',
    title: 'Casa com Quintal em Condomínio',
    price: 3500,
    address: 'Rua dos Ipês, 456 - Jardim das Flores',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: 'aluguel',
    propertyType: 'casa',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    description: 'Casa ampla em condomínio fechado com segurança 24h, perfeita para famílias.',
    features: ['Churrasqueira', 'Quintal amplo', 'Área de lazer', 'Segurança 24h'],
    status: 'disponível',
    createdAt: Timestamp.fromDate(new Date('2023-03-05')),
    updatedAt: Timestamp.fromDate(new Date('2023-03-05'))
  },
  {
    id: '4',
    title: 'Cobertura Duplex com Vista para o Mar',
    price: 1800000,
    address: 'Av. Beira Mar, 789 - Praia Grande',
    bedrooms: 3,
    bathrooms: 3,
    area: 220,
    type: 'venda',
    propertyType: 'apartamento',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    description: 'Cobertura duplex com terraço e vista panorâmica para o mar. Acabamento de alto padrão.',
    features: ['Vista para o mar', 'Terraço', 'Piscina privativa', 'Sauna', '3 vagas de garagem'],
    status: 'disponível',
    createdAt: Timestamp.fromDate(new Date('2023-04-20')),
    updatedAt: Timestamp.fromDate(new Date('2023-04-20'))
  },
  {
    id: '5',
    title: 'Terreno para Construção em Área Nobre',
    price: 850000,
    address: 'Rua das Acácias, 321 - Alphaville II',
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    type: 'venda',
    propertyType: 'terreno',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    description: 'Terreno plano em localização privilegiada, ideal para construção de residência de alto padrão.',
    features: ['Plano', 'Infraestrutura completa', 'Pronto para construir'],
    status: 'disponível',
    createdAt: Timestamp.fromDate(new Date('2023-05-12')),
    updatedAt: Timestamp.fromDate(new Date('2023-05-12'))
  },
  {
    id: '6',
    title: 'Sala Comercial no Centro Empresarial',
    price: 2800,
    address: 'Av. Empresarial, 1000 - Centro',
    bedrooms: 0,
    bathrooms: 1,
    area: 45,
    type: 'aluguel',
    propertyType: 'comercial',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
    description: 'Sala comercial em localização estratégica, com recepção compartilhada e estacionamento.',
    features: ['Ar condicionado', 'Estacionamento', 'Segurança', 'Internet fibra'],
    status: 'disponível',
    createdAt: Timestamp.fromDate(new Date('2023-06-01')),
    updatedAt: Timestamp.fromDate(new Date('2023-06-01'))
  }
];

// Funções auxiliares para trabalhar com propriedades

// Obter todas as propriedades
export function getAllProperties(): Property[] {
  return properties;
}

// Obter propriedade por ID
export function getPropertyById(id: string): Property | undefined {
  return properties.find(property => property.id === id);
}

// Filtrar propriedades
export function filterProperties(filters: {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  type?: 'venda' | 'aluguel';
  status?: string;
}): Property[] {
  return properties.filter(property => {
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
    if (filters.type && property.type !== filters.type) return false;
    if (filters.status && property.status !== filters.status) return false;
    return true;
  });
}

// Adicionar nova propriedade (para uso quando tiver um CMS ou admin)
export function addProperty(property: Omit<Property, 'id'>): Property {
  const highestId = properties.reduce((max, p) => {
    const id = parseInt(p.id);
    return id > max ? id : max;
  }, 0);
  
  const newId = (highestId + 1).toString();
  const newProperty = { ...property, id: newId };
  properties.push(newProperty);
  return newProperty;
}

// Atualizar propriedade existente
export function updateProperty(id: string, updates: Partial<Property>): Property | undefined {
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) return undefined;
  
  properties[index] = { ...properties[index], ...updates };
  return properties[index];
}

// Remover propriedade
export function removeProperty(id: string): boolean {
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  properties.splice(index, 1);
  return true;
}

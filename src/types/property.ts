import { Timestamp } from 'firebase/firestore';

export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  description?: string;
  propertyType?: 'casa' | 'apartamento' | 'terreno' | 'comercial';
  features?: string[];
  type: 'venda' | 'aluguel';
  status: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface PropertyFilter {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  propertyType?: 'casa' | 'apartamento' | 'terreno' | 'comercial';
  transactionType?: 'venda' | 'aluguel';
  status?: string;
} 
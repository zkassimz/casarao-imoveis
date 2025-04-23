export interface Property {
  id: number;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  description?: string;
  propertyType: 'casa' | 'apartamento' | 'terreno' | 'comercial';
  features?: string[];
}

// Dados de exemplo para imóveis
export const sampleProperties: Property[] = [
  {
    id: 1,
    title: 'Casa Moderna com Piscina',
    price: 850000,
    address: 'Rua das Flores, 123 - Centro',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=600&h=400',
    description: 'Linda casa moderna com piscina, área gourmet e jardim. Localização privilegiada próxima ao centro da cidade.',
    propertyType: 'casa',
    features: ['Piscina', 'Área Gourmet', 'Jardim', 'Garagem para 2 carros']
  },
  {
    id: 2,
    title: 'Apartamento de Luxo',
    price: 650000,
    address: 'Av. Principal, 456 - Jardim América',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600&h=400',
    description: 'Apartamento de alto padrão com acabamento de luxo, varanda gourmet e vista panorâmica da cidade.',
    propertyType: 'apartamento',
    features: ['Varanda Gourmet', 'Vista Panorâmica', 'Academia', 'Piscina no Prédio']
  },
  {
    id: 3,
    title: 'Terreno em Condomínio Fechado',
    price: 320000,
    address: 'Condomínio Vale Verde, Lote 78',
    bedrooms: 0,
    bathrooms: 0,
    area: 450,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600&h=400',
    description: 'Excelente terreno plano em condomínio fechado com segurança 24h e área de lazer completa.',
    propertyType: 'terreno',
    features: ['Plano', 'Condomínio Fechado', 'Segurança 24h']
  },
  {
    id: 4,
    title: 'Cobertura Duplex',
    price: 1200000,
    address: 'Rua das Palmeiras, 789 - Bairro Nobre',
    bedrooms: 4,
    bathrooms: 3,
    area: 240,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600&h=400',
    description: 'Cobertura duplex com terraço, piscina privativa e vista para o mar. Acabamento de alto padrão.',
    propertyType: 'apartamento',
    features: ['Duplex', 'Terraço', 'Piscina Privativa', 'Vista para o Mar']
  },
  {
    id: 5,
    title: 'Casa em Condomínio',
    price: 780000,
    address: 'Condomínio Bosque Real, 45',
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600&h=400',
    description: 'Casa em condomínio fechado com segurança 24h, área de lazer completa e amplo jardim.',
    propertyType: 'casa',
    features: ['Condomínio Fechado', 'Área de Lazer', 'Jardim', 'Segurança 24h']
  },
  {
    id: 6,
    title: 'Sala Comercial',
    price: 450000,
    address: 'Edifício Empresarial, Sala 302 - Centro',
    bedrooms: 0,
    bathrooms: 1,
    area: 75,
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600&h=400',
    description: 'Sala comercial em localização privilegiada no centro da cidade, com recepção e 2 vagas de garagem.',
    propertyType: 'comercial',
    features: ['Recepção', '2 Vagas de Garagem', 'Ar Condicionado', 'Prédio com Elevador']
  }
];

// Definição do tipo de propriedade
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
  propertyType?: 'casa' | 'apartamento' | 'terreno' | 'comercial';
  features?: string[];
  type: 'venda' | 'aluguel';
  status: string;
  driveImageId?: string; // Suporte opcional para imagens do Google Drive
}

// Propriedades de exemplo - usando URLs estáveis do Unsplash
export const properties: Property[] = [
  {
    id: 1,
    title: 'Casa Moderna com Piscina',
    price: 850000,
    address: 'Rua das Flores, 123 - Centro',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: 'venda',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1470&h=800',
    description: 'Luxuosa casa moderna com acabamento de alto padrão, piscina, área gourmet e amplo jardim. Localizada em condomínio fechado com total segurança e privacidade.',
    features: ['Piscina', 'Área Gourmet', 'Jardim', 'Garagem para 2 carros', 'Sistema de segurança'],
    status: 'disponível',
    propertyType: 'casa'
  },
  {
    id: 2,
    title: 'Apartamento de Luxo',
    price: 650000,
    address: 'Av. Principal, 456 - Jardim América',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    type: 'venda',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1470&h=800',
    description: 'Apartamento de alto padrão com vista panorâmica, 2 vagas de garagem, academia, piscina e área de lazer completa. Próximo a shoppings e serviços essenciais.',
    features: ['Varanda Gourmet', 'Vista para a cidade', 'Academia', 'Piscina', 'Salão de festas'],
    status: 'disponível',
    propertyType: 'apartamento'
  },
  {
    id: 3,
    title: 'Terreno em Condomínio Fechado',
    price: 320000,
    address: 'Condomínio Vale Verde, Lote 78',
    bedrooms: 0,
    bathrooms: 0,
    area: 450,
    type: 'venda',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1470&h=800',
    description: 'Excelente terreno plano em condomínio fechado de alto padrão. Oportunidade única para construir a casa dos seus sonhos com total segurança e infraestrutura completa.',
    features: ['Condomínio fechado', 'Área verde', 'Segurança 24h', 'Infraestrutura completa', 'Pronto para construir'],
    status: 'disponível',
    propertyType: 'terreno'
  },
  {
    id: 4,
    title: 'Cobertura Duplex',
    price: 1200000,
    address: 'Rua das Palmeiras, 789 - Bairro Nobre',
    bedrooms: 4,
    bathrooms: 3,
    area: 240,
    type: 'venda',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1470&h=800',
    description: 'Cobertura duplex com vista panorâmica espetacular, terraço com piscina privativa, churrasqueira e 3 vagas de garagem. Localização privilegiada com sunset incrível.',
    features: ['Piscina privativa', 'Vista panorâmica', 'Área gourmet', 'Suítes', 'Elevador privativo'],
    status: 'disponível',
    propertyType: 'apartamento'
  },
  {
    id: 5,
    title: 'Casa em Condomínio',
    price: 780000,
    address: 'Condomínio Bosque Real, 45',
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    type: 'venda',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1470&h=800',
    description: 'Casa em condomínio fechado com segurança 24h, área de lazer completa e amplo jardim.',
    features: ['Condomínio Fechado', 'Área de Lazer', 'Jardim', 'Segurança 24h'],
    status: 'disponível',
    propertyType: 'casa'
  },
  {
    id: 6,
    title: 'Sala Comercial',
    price: 450000,
    address: 'Edifício Empresarial, Sala 302 - Centro',
    bedrooms: 0,
    bathrooms: 1,
    area: 75,
    type: 'venda',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1470&h=800',
    description: 'Sala comercial em localização privilegiada no centro da cidade, com recepção e 2 vagas de garagem.',
    features: ['Recepção', '2 Vagas de Garagem', 'Ar Condicionado', 'Prédio com Elevador'],
    status: 'disponível',
    propertyType: 'comercial'
  },
  {
    id: 7,
    title: 'Apartamento para Aluguel',
    price: 2500,
    address: 'Rua dos Ipês, 234 - Jardim Botânico',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    type: 'aluguel',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=1470&h=800',
    description: 'Apartamento mobiliado para aluguel, com 2 quartos, sala ampla, cozinha equipada e área de serviço. Condomínio com piscina e academia.',
    features: ['Mobiliado', 'Piscina', 'Academia', 'Portaria 24h', 'Garagem'],
    status: 'disponível',
    propertyType: 'apartamento'
  },
  {
    id: 8,
    title: 'Casa para Temporada',
    price: 5000,
    address: 'Rua da Praia, 567 - Praia Grande',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    type: 'aluguel',
    imageUrl: 'https://images.unsplash.com/photo-1584738766473-61c083514bf4?auto=format&fit=crop&q=80&w=1470&h=800',
    description: 'Casa para temporada a 100m da praia, acomoda até 10 pessoas, com piscina, churrasqueira e ar-condicionado em todos os quartos. Ideal para férias em família.',
    features: ['Piscina', 'Churrasqueira', 'Ar-condicionado', 'Próximo à praia', 'Acomoda 10 pessoas'],
    status: 'disponível',
    propertyType: 'casa'
  },
  {
    id: 9,
    title: 'Loja Comercial',
    price: 8000,
    address: 'Av. do Comércio, 890 - Centro Comercial',
    bedrooms: 0,
    bathrooms: 2,
    area: 120,
    type: 'aluguel',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1470&h=800',
    description: 'Loja comercial com excelente visibilidade e fluxo de pessoas. Ponto consolidado, ideal para comércio varejista. Estacionamento para clientes.',
    features: ['Ponto comercial', 'Vitrine ampla', 'Estacionamento', 'Alta circulação'],
    status: 'disponível',
    propertyType: 'comercial'
  }
];

// Funções auxiliares para trabalhar com propriedades

// Obter todas as propriedades
export function getAllProperties(): Property[] {
  return properties;
}

// Obter propriedade por ID
export function getPropertyById(id: number): Property | undefined {
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
  const newId = Math.max(...properties.map(p => p.id)) + 1;
  const newProperty = { ...property, id: newId };
  properties.push(newProperty);
  return newProperty;
}

// Atualizar propriedade existente
export function updateProperty(id: number, updates: Partial<Property>): Property | undefined {
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) return undefined;
  
  properties[index] = { ...properties[index], ...updates };
  return properties[index];
}

// Remover propriedade
export function removeProperty(id: number): boolean {
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  properties.splice(index, 1);
  return true;
}

"use client";

import React, { useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilter from '@/components/PropertyFilter';
import Image from 'next/image';

// Dados de exemplo para imóveis
const sampleProperties = [
  {
    id: 1,
    title: 'Casa Moderna com Piscina',
    price: 850000,
    address: 'Rua das Flores, 123 - Centro',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    imageUrl: '/images/properties/modern-house.jpg',
    type: 'venda',
    description: 'Luxuosa casa moderna com acabamento de alto padrão, piscina, área gourmet e amplo jardim. Localizada em condomínio fechado com total segurança e privacidade.'
  },
  {
    id: 2,
    title: 'Apartamento de Luxo',
    price: 650000,
    address: 'Av. Principal, 456 - Jardim América',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    imageUrl: '/images/properties/casa1.jpg',
    type: 'venda',
    description: 'Apartamento de alto padrão com vista panorâmica, 2 vagas de garagem, academia, piscina e área de lazer completa. Próximo a shoppings e serviços essenciais.'
  },
  {
    id: 3,
    title: 'Terreno em Condomínio Fechado',
    price: 320000,
    address: 'Condomínio Vale Verde, Lote 78',
    bedrooms: 0,
    bathrooms: 0,
    area: 450,
    imageUrl: '/images/properties/hero.jpg',
    type: 'venda',
    description: 'Excelente terreno plano em condomínio fechado de alto padrão. Oportunidade única para construir a casa dos seus sonhos com total segurança e infraestrutura completa.'
  },
  {
    id: 4,
    title: 'Cobertura Duplex',
    price: 1200000,
    address: 'Rua das Palmeiras, 789 - Bairro Nobre',
    bedrooms: 4,
    bathrooms: 3,
    area: 240,
    imageUrl: '/images/properties/modern-house.jpg',
    type: 'venda',
    description: 'Cobertura duplex com vista panorâmica espetacular, terraço com piscina privativa, churrasqueira e 3 vagas de garagem. Localização privilegiada com sunset incrível.'
  },
  {
    id: 5,
    title: 'Casa em Condomínio',
    price: 780000,
    address: 'Condomínio Bosque Real, 45',
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    imageUrl: '/images/properties/casa1.jpg',
    type: 'venda',
    description: 'Casa moderna em condomínio com segurança 24h, 3 suítes, escritório, sala ampla com pé direito duplo e cozinha americana. Área de lazer completa no condomínio.'
  },
  {
    id: 6,
    title: 'Sala Comercial',
    price: 450000,
    address: 'Edifício Empresarial, Sala 302 - Centro',
    bedrooms: 0,
    bathrooms: 1,
    area: 75,
    imageUrl: '/images/properties/hero.jpg',
    type: 'venda',
    description: 'Sala comercial em localização estratégica no centro da cidade. Ideal para escritórios, consultórios ou espaço de coworking. Estacionamento rotativo no edifício.'
  },
  {
    id: 7,
    title: 'Apartamento para Aluguel',
    price: 2500,
    address: 'Rua dos Ipês, 234 - Jardim Botânico',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    imageUrl: '/images/properties/modern-house.jpg',
    type: 'aluguel',
    description: 'Apartamento mobiliado para aluguel, com 2 quartos, sala ampla, cozinha equipada e área de serviço. Condomínio com piscina e academia.'
  },
  {
    id: 8,
    title: 'Casa para Temporada',
    price: 5000,
    address: 'Rua da Praia, 567 - Praia Grande',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    imageUrl: '/images/properties/casa1.jpg',
    type: 'aluguel',
    description: 'Casa para temporada a 100m da praia, acomoda até 10 pessoas, com piscina, churrasqueira e ar-condicionado em todos os quartos. Ideal para férias em família.'
  },
  {
    id: 9,
    title: 'Loja Comercial',
    price: 8000,
    address: 'Av. do Comércio, 890 - Centro Comercial',
    bedrooms: 0,
    bathrooms: 2,
    area: 120,
    imageUrl: '/images/properties/hero.jpg',
    type: 'aluguel',
    description: 'Loja comercial com excelente visibilidade e fluxo de pessoas. Ponto consolidado, ideal para comércio varejista. Estacionamento para clientes.'
  }
];

export default function ImoveisPage() {
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties);

  const handleFilterChange = (filters: any) => {
    let filtered = [...sampleProperties];
    
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= filters.maxPrice);
    }
    
    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms);
    }
    
    if (filters.propertyType) {
      // Aqui seria necessário ter o tipo de propriedade nos dados
      // Esta é uma implementação simplificada
      if (filters.propertyType === 'casa') {
        filtered = filtered.filter(property => property.title.toLowerCase().includes('casa'));
      } else if (filters.propertyType === 'apartamento') {
        filtered = filtered.filter(property => property.title.toLowerCase().includes('apartamento'));
      } else if (filters.propertyType === 'terreno') {
        filtered = filtered.filter(property => property.title.toLowerCase().includes('terreno'));
      } else if (filters.propertyType === 'comercial') {
        filtered = filtered.filter(property => property.title.toLowerCase().includes('comercial'));
      }
    }
    
    if (filters.transactionType) {
      filtered = filtered.filter(property => property.type === filters.transactionType);
    }
    
    setFilteredProperties(filtered);
  };

  return (
    <main className="min-h-screen py-8">
      {/* Header Banner */}
      <section className="relative h-[40vh] pt-12 pb-16 flex items-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/properties/hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 relative z-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Nossos Imóveis
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Encontre o imóvel perfeito para você e sua família entre nossas opções exclusivas
          </p>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <PropertyFilter onFilterChange={handleFilterChange} />
        </div>
      </section>
      
      {/* Properties Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-primary text-center">Todos os Imóveis</h2>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map(property => (
                <PropertyCard 
                  key={property.id}
                  id={property.id}
                  title={property.title}
                  price={property.price}
                  address={property.address}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  area={property.area}
                  imageUrl={property.imageUrl}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">Nenhum imóvel encontrado com os filtros selecionados.</p>
              <button 
                onClick={() => setFilteredProperties(sampleProperties)} 
                className="btn-primary mt-4"
              >
                Ver Todos os Imóveis
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

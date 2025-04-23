"use client";

import React, { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilter from '@/components/PropertyFilter';
import Image from 'next/image';
import Benefits from '@/components/Benefits';

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
    imageUrl: '/images/properties/casa1.jpg'
  },
  {
    id: 2,
    title: 'Apartamento de Luxo',
    price: 650000,
    address: 'Av. Principal, 456 - Jardim América',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    imageUrl: '/images/properties/apartamento1.jpg'
  },
  {
    id: 3,
    title: 'Terreno em Condomínio Fechado',
    price: 320000,
    address: 'Condomínio Vale Verde, Lote 78',
    bedrooms: 0,
    bathrooms: 0,
    area: 450,
    imageUrl: '/images/properties/terreno1.jpg'
  },
  {
    id: 4,
    title: 'Cobertura Duplex',
    price: 1200000,
    address: 'Rua das Palmeiras, 789 - Bairro Nobre',
    bedrooms: 4,
    bathrooms: 3,
    area: 240,
    imageUrl: '/images/properties/cobertura1.jpg'
  },
  {
    id: 5,
    title: 'Casa em Condomínio',
    price: 780000,
    address: 'Condomínio Bosque Real, 45',
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    imageUrl: '/images/properties/casa2.jpg'
  },
  {
    id: 6,
    title: 'Sala Comercial',
    price: 450000,
    address: 'Edifício Empresarial, Sala 302 - Centro',
    bedrooms: 0,
    bathrooms: 1,
    area: 75,
    imageUrl: '/images/properties/comercial1.jpg'
  }
];

export default function Home() {
  const [filteredProperties, setFilteredProperties] = React.useState(sampleProperties);

  // Efeito de animação ao carregar a página
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-fade-in');
    elements.forEach((element, index) => {
      setTimeout(() => {
        (element as HTMLElement).style.opacity = '1';
        (element as HTMLElement).style.transform = 'translateY(0)';
      }, 100 * index);
    });
  }, []);

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
    
    setFilteredProperties(filtered);
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 flex items-center bg-gradient-to-b from-[#0f172a] to-[#0c1324]">
        <div className="container mx-auto px-4 relative z-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-10 md:mb-0 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Encontre o imóvel dos seus sonhos
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                A Casarão Imobiliária é o endereço dos bons negócios. Confira nossos imóveis e encontre o que você procura.
              </p>
              <a href="/imoveis" className="btn-primary text-lg px-8 py-3 inline-block">
                Ver Imóveis
              </a>
            </div>
            <div className="md:w-1/3 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
              <div className="animate-float">
                <Image
                  src="/images/logo-icon.png"
                  alt="Casarão Logotipo"
                  width={180}
                  height={180}
                  className="mx-auto filter brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-12 bg-[#0c1324]">
        <div className="container mx-auto px-4 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
          <PropertyFilter onFilterChange={handleFilterChange} />
        </div>
      </section>
      
      {/* Properties Section */}
      <section className="py-16 bg-gradient-to-t from-[#0f172a] to-[#0c1324]">
        <div className="container mx-auto px-4">
          <h2 className="section-title animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">Imóveis em Destaque</h2>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <div key={property.id} className="animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                  <PropertyCard 
                    id={property.id}
                    title={property.title}
                    price={property.price}
                    address={property.address}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    area={property.area}
                    imageUrl={property.imageUrl}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
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
      
      {/* About Section */}
      <section className="py-16 bg-[#0c1324]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
              <Image 
                src="/images/logo.png" 
                alt="Casarão Imobiliária" 
                width={400} 
                height={200} 
                className="mx-auto md:mx-0"
              />
              <h2 className="section-title mt-8">Sobre a Casarão</h2>
              <p className="text-gray-300 mb-6">
                A Casarão Imobiliária é especializada em encontrar o imóvel perfeito para você. Com anos de experiência no mercado, nossa equipe está pronta para ajudar em todas as etapas da compra, venda ou locação do seu imóvel.
              </p>
              <p className="text-gray-300">
                Nosso compromisso é oferecer um atendimento personalizado e de qualidade, garantindo a satisfação dos nossos clientes em cada negociação.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1a2437] p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-amber-500/20 hover:-translate-y-2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                  <h3 className="text-xl font-bold text-amber-500 mb-2">Missão</h3>
                  <p className="text-gray-300">Proporcionar a melhor experiência na busca pelo imóvel ideal, com transparência e excelência.</p>
                </div>
                <div className="bg-[#1a2437] p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-amber-500/20 hover:-translate-y-2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                  <h3 className="text-xl font-bold text-amber-500 mb-2">Visão</h3>
                  <p className="text-gray-300">Ser referência no mercado imobiliário, reconhecida pela qualidade e confiabilidade.</p>
                </div>
                <div className="bg-[#1a2437] p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-amber-500/20 hover:-translate-y-2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                  <h3 className="text-xl font-bold text-amber-500 mb-2">Valores</h3>
                  <p className="text-gray-300">Ética, transparência, compromisso e respeito em todas as negociações.</p>
                </div>
                <div className="bg-[#1a2437] p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-amber-500/20 hover:-translate-y-2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                  <h3 className="text-xl font-bold text-amber-500 mb-2">Diferencial</h3>
                  <p className="text-gray-300">Atendimento personalizado e conhecimento profundo do mercado imobiliário local.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <Benefits />
      
      {/* Contact CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-500 text-black">
        <div className="container mx-auto px-4 text-center animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
          <h2 className="text-3xl font-bold mb-6">Entre em contato conosco</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Estamos prontos para ajudar você a encontrar o imóvel dos seus sonhos ou a vender seu imóvel pelo melhor preço.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://wa.me/5577984090230" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-black text-white hover:bg-gray-800 font-bold py-3 px-6 rounded flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              WhatsApp
            </a>
            <a 
              href="mailto:valenthinadecarvalho@gmail.com" 
              className="bg-black text-white hover:bg-gray-800 font-bold py-3 px-6 rounded flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

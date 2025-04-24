"use client";

import React, { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilter from '@/components/PropertyFilter';
import Image from 'next/image';
import Benefits from '@/components/Benefits';
import { properties } from '@/data/properties';

export default function Home() {
  const [filteredProperties, setFilteredProperties] = React.useState(properties.slice(0, 6));

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
    let filtered = [...properties];
    
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
      filtered = filtered.filter(property => property.propertyType === filters.propertyType);
    }
    
    if (filters.transactionType) {
      filtered = filtered.filter(property => property.type === filters.transactionType);
    }
    
    // Limitamos a 6 imóveis na página inicial
    setFilteredProperties(filtered.slice(0, 6));
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 flex items-center bg-primary">
        <div className="container mx-auto px-4 relative z-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-10 md:mb-0 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Encontre o imóvel dos seus sonhos
              </h1>
              <p className="text-xl text-secondary mb-8">
                A Casarão Imobiliária é o endereço dos bons negócios. Confira nossos imóveis e encontre o que você procura.
              </p>
              <a href="/imoveis" className="bg-white text-primary hover:bg-secondary text-lg px-8 py-3 inline-block font-bold rounded">
                Ver Imóveis
              </a>
            </div>
            <div className="md:w-1/3 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
              <div className="animate-float">
                <Image
                  src="/images/logo-icon.svg"
                  alt="ImobTech Logotipo"
                  width={60}
                  height={60}
                  className="mb-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
          <PropertyFilter onFilterChange={handleFilterChange} />
        </div>
      </section>
      
      {/* Properties Section */}
      <section className="py-16 bg-background-light">
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
              <p className="text-xl text-primary-light">Nenhum imóvel encontrado com os filtros selecionados.</p>
              <button 
                onClick={() => setFilteredProperties(properties.slice(0, 6))} 
                className="bg-primary hover:bg-primary-light text-white font-bold py-2 px-6 rounded mt-4"
              >
                Ver Todos os Imóveis
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
              <Image 
                src="/images/logo.svg" 
                alt="ImobTech Logo" 
                width={200} 
                height={100} 
                className="mx-auto mb-8"
              />
              <h2 className="text-3xl font-bold mb-6 text-secondary">Nossa História</h2>
              <p className="text-primary-light leading-relaxed mb-8">
                A ImobTech foi fundada com a missão de transformar o mercado imobiliário através da tecnologia. 
                Nosso objetivo é proporcionar uma experiência transparente e eficiente na compra, venda e 
                aluguel de imóveis, combinando o conhecimento de nossos consultores com soluções digitais inovadoras.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                  <h3 className="text-xl font-bold text-primary mb-2">Missão</h3>
                  <p className="text-primary-light">Proporcionar a melhor experiência na busca pelo imóvel ideal, com transparência e excelência.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                  <h3 className="text-xl font-bold text-primary mb-2">Visão</h3>
                  <p className="text-primary-light">Ser referência no mercado imobiliário, reconhecida pela qualidade e confiabilidade.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                  <h3 className="text-xl font-bold text-primary mb-2">Valores</h3>
                  <p className="text-primary-light">Ética, transparência, compromisso e respeito em todas as negociações.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                  <h3 className="text-xl font-bold text-primary mb-2">Diferencial</h3>
                  <p className="text-primary-light">Atendimento personalizado e conhecimento profundo do mercado imobiliário local.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <Benefits />
      
      {/* Contact CTA Section */}
      <section className="py-16 bg-primary text-white">
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
              className="bg-accent-dark text-white hover:bg-primary-dark font-bold py-3 px-6 rounded flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              WhatsApp
            </a>
            <a 
              href="/contato" 
              className="bg-secondary text-primary hover:bg-secondary-dark font-bold py-3 px-6 rounded flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Formulário de Contato
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

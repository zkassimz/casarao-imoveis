"use client";

import React, { useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilter from '@/components/PropertyFilter';
import { properties, filterProperties } from '@/data/properties';

export default function ImoveisPage() {
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleFilterChange = (filters: any) => {
    // Usar a função filterProperties do nosso arquivo de dados
    const filtered = filterProperties({
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      bedrooms: filters.bedrooms,
      type: filters.transactionType,
      // Se tivermos propriedade type em filterProperties, podemos adicionar:
      // propertyType: filters.propertyType
    });
    
    setFilteredProperties(filtered);
  };

  return (
    <main className="min-h-screen py-8">
      {/* Header Banner */}
      <section className="relative h-[40vh] pt-12 pb-16 flex items-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80)' }}>
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
                  driveImageId={property.driveImageId}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">Nenhum imóvel encontrado com os filtros selecionados.</p>
              <button 
                onClick={() => setFilteredProperties(properties)} 
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

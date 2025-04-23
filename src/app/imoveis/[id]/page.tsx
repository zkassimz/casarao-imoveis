"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { properties, getPropertyById } from '@/data/properties';

export default function PropertyDetails() {
  const params = useParams();
  const propertyId = Number(params.id);
  
  // Encontrar o imóvel específico
  const property = getPropertyById(propertyId) || properties[0];
  
  // Formatar o preço em reais
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(property.price);

  // Determinar a URL da imagem
  const imageSrc = property.driveImageId
    ? `https://drive.google.com/uc?export=view&id=${property.driveImageId}`
    : property.imageUrl;

  return (
    <main className="min-h-screen py-8">
      {/* Header Banner */}
      <section className="relative h-[30vh] pt-12 pb-16 flex items-center bg-cover bg-center" style={{ backgroundImage: `url(${imageSrc})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-20">
          <Link href="/imoveis" className="flex items-center text-secondary hover:text-white mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para lista de imóveis
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {property.title}
          </h1>
          <p className="text-xl text-secondary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.address}
          </p>
        </div>
      </section>
      
      {/* Property Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Imagem */}
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src={imageSrc || 'https://via.placeholder.com/800x600?text=Imóvel'}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                onError={(e) => {
                  // Fallback para uma imagem padrão em caso de erro
                  (e.target as any).src = 'https://via.placeholder.com/800x600?text=Imóvel';
                }}
              />
            </div>
            
            {/* Informações */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  {formattedPrice}
                  <span className="text-primary-light ml-2 text-lg">
                    {property.type === 'aluguel' ? '/mês' : ''}
                  </span>
                </h2>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-primary text-lg font-bold">{property.bedrooms}</div>
                    <div className="text-primary-light text-sm">{property.bedrooms === 1 ? 'Quarto' : 'Quartos'}</div>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-primary text-lg font-bold">{property.bathrooms}</div>
                    <div className="text-primary-light text-sm">{property.bathrooms === 1 ? 'Banheiro' : 'Banheiros'}</div>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-primary text-lg font-bold">{property.area}</div>
                    <div className="text-primary-light text-sm">m²</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Descrição</h3>
                  <p className="text-primary-light">
                    {property.description || 'Informações detalhadas sobre este imóvel em breve.'}
                  </p>
                </div>
                
                {property.features && (
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-3">Características</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-primary-light">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {property.status && (
                  <div className="mt-4 bg-secondary p-3 rounded-lg">
                    <div className="text-sm text-primary-light">
                      Status: <span className="text-primary font-medium">{property.status}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Contato */}
              <div className="bg-primary p-6 rounded-lg shadow-lg text-white">
                <h3 className="text-xl font-bold mb-4">Interessado neste imóvel?</h3>
                <p className="mb-4">Entre em contato com nossos consultores para agendar uma visita ou obter mais informações.</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={`https://wa.me/5577984090230?text=Olá, tenho interesse no imóvel: ${property.title} (Ref: #${property.id})`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-accent-dark text-white hover:bg-primary-dark font-bold py-3 px-6 rounded flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <Link 
                    href="/contato" 
                    className="bg-secondary text-primary hover:bg-secondary-dark font-bold py-3 px-6 rounded flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Formulário de Contato
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 
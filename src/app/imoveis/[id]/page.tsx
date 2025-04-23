"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Dados de exemplo para imóveis (mesmo do arquivo imoveis/page.tsx)
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
    description: 'Luxuosa casa moderna com acabamento de alto padrão, piscina, área gourmet e amplo jardim. Localizada em condomínio fechado com total segurança e privacidade.',
    features: ['Piscina', 'Área Gourmet', 'Jardim', 'Garagem para 2 carros', 'Sistema de segurança']
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
    description: 'Apartamento de alto padrão com vista panorâmica, 2 vagas de garagem, academia, piscina e área de lazer completa. Próximo a shoppings e serviços essenciais.',
    features: ['Varanda Gourmet', 'Vista para a cidade', 'Academia', 'Piscina', 'Salão de festas']
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
    description: 'Excelente terreno plano em condomínio fechado de alto padrão. Oportunidade única para construir a casa dos seus sonhos com total segurança e infraestrutura completa.',
    features: ['Condomínio fechado', 'Área verde', 'Segurança 24h', 'Infraestrutura completa', 'Pronto para construir']
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
    description: 'Cobertura duplex com vista panorâmica espetacular, terraço com piscina privativa, churrasqueira e 3 vagas de garagem. Localização privilegiada com sunset incrível.',
    features: ['Piscina privativa', 'Vista panorâmica', 'Área gourmet', 'Suítes', 'Elevador privativo']
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
    description: 'Casa moderna em condomínio com segurança 24h, 3 suítes, escritório, sala ampla com pé direito duplo e cozinha americana. Área de lazer completa no condomínio.',
    features: ['Condomínio fechado', 'Área de lazer', 'Churrasqueira', 'Segurança 24h', 'Garagem para 2 carros']
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
    description: 'Sala comercial em localização estratégica no centro da cidade. Ideal para escritórios, consultórios ou espaço de coworking. Estacionamento rotativo no edifício.',
    features: ['Localização central', 'Prédio comercial', 'Estacionamento', 'Segurança', 'Elevadores']
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
    description: 'Apartamento mobiliado para aluguel, com 2 quartos, sala ampla, cozinha equipada e área de serviço. Condomínio com piscina e academia.',
    features: ['Mobiliado', 'Piscina', 'Academia', 'Portaria 24h', 'Garagem']
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
    description: 'Casa para temporada a 100m da praia, acomoda até 10 pessoas, com piscina, churrasqueira e ar-condicionado em todos os quartos. Ideal para férias em família.',
    features: ['Piscina', 'Churrasqueira', 'Ar-condicionado', 'Próximo à praia', 'Acomoda 10 pessoas']
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
    description: 'Loja comercial com excelente visibilidade e fluxo de pessoas. Ponto consolidado, ideal para comércio varejista. Estacionamento para clientes.',
    features: ['Ponto comercial', 'Vitrine ampla', 'Estacionamento', 'Alta circulação', 'Mezanino']
  }
];

export default function PropertyDetails() {
  const params = useParams();
  const propertyId = Number(params.id);
  
  // Encontrar o imóvel específico
  const property = sampleProperties.find(p => p.id === propertyId) || sampleProperties[0];
  
  // Formatar o preço em reais
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(property.price);

  return (
    <main className="min-h-screen py-8">
      {/* Header Banner */}
      <section className="relative h-[30vh] pt-12 pb-16 flex items-center bg-cover bg-center" style={{ backgroundImage: `url(${property.imageUrl})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-20">
          <Link href="/imoveis" className="flex items-center text-amber-500 hover:text-amber-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para lista de imóveis
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {property.title}
          </h1>
          <p className="text-xl text-gray-200 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                src={property.imageUrl || 'https://via.placeholder.com/800x600?text=Imóvel'}
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
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {formattedPrice}
                </h2>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-amber-500 text-lg font-bold">{property.bedrooms}</div>
                    <div className="text-gray-300 text-sm">{property.bedrooms === 1 ? 'Quarto' : 'Quartos'}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-amber-500 text-lg font-bold">{property.bathrooms}</div>
                    <div className="text-gray-300 text-sm">{property.bathrooms === 1 ? 'Banheiro' : 'Banheiros'}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-amber-500 text-lg font-bold">{property.area}</div>
                    <div className="text-gray-300 text-sm">m²</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-amber-500 mb-3">Descrição</h3>
                  <p className="text-gray-300">
                    {property.description || 'Informações detalhadas sobre este imóvel em breve.'}
                  </p>
                </div>
                
                {property.features && (
                  <div>
                    <h3 className="text-xl font-bold text-amber-500 mb-3">Características</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Contato */}
              <div className="bg-amber-500 p-6 rounded-lg shadow-lg text-black">
                <h3 className="text-xl font-bold mb-4">Interessado neste imóvel?</h3>
                <p className="mb-4">Entre em contato com nossos consultores para agendar uma visita ou obter mais informações.</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://wa.me/5577984090230?text=Olá, tenho interesse no imóvel: Referência #PKI-32" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-black text-white hover:bg-gray-800 font-bold py-3 px-6 rounded flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <Link 
                    href="/contato" 
                    className="bg-black text-white hover:bg-gray-800 font-bold py-3 px-6 rounded flex items-center justify-center gap-2"
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
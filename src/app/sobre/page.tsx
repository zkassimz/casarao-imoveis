"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';

export default function Sobre() {
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

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full pt-12 pb-16 flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#0c1324]">
        <div className="text-center animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
          <div className="flex flex-col items-center mb-12">
            <Image 
              src="/images/logo-icon.svg" 
              alt="ImobTech Logotipo" 
              width={100} 
              height={100} 
              className="mb-6"
            />
            <h1 className="text-4xl font-bold text-primary mb-4">Sobre a ImobTech</h1>
            <div className="w-20 h-1 bg-accent mb-8"></div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-lg text-primary-light mb-6">
              A ImobTech nasceu da união entre a experiência no mercado imobiliário e a inovação tecnológica.
              Nossa missão é proporcionar uma experiência diferenciada na compra, venda e aluguel de imóveis,
              combinando atendimento personalizado com soluções digitais de ponta.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16 bg-gradient-to-t from-[#0f172a] to-[#0c1324]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
              <h2 className="text-2xl font-bold text-amber-500 mb-4">Nossa História</h2>
              <p className="text-gray-300 mb-6">
                A Casarão Imobiliária nasceu do sonho de transformar a experiência de comprar, vender e alugar imóveis. 
                Com anos de experiência no mercado imobiliário, nossa equipe está comprometida em oferecer um serviço 
                personalizado e de qualidade, ajudando nossos clientes a encontrarem o imóvel perfeito para suas necessidades.
              </p>
              <p className="text-gray-300">
                Nosso compromisso é com a transparência, a ética e a satisfação dos nossos clientes em cada negociação. 
                Trabalhamos incansavelmente para construir relacionamentos duradouros baseados na confiança e no respeito.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#1a2437] p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-amber-500/20 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                  <h3 className="text-xl font-bold text-amber-500 mb-2">Missão</h3>
                  <p className="text-gray-300">Proporcionar a melhor experiência na busca pelo imóvel ideal, com transparência e excelência.</p>
                </div>
                <div className="bg-[#1a2437] p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-amber-500/20 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                  <h3 className="text-xl font-bold text-amber-500 mb-2">Visão</h3>
                  <p className="text-gray-300">Ser referência no mercado imobiliário, reconhecida pela qualidade e confiabilidade.</p>
                </div>
                <div className="bg-[#1a2437] p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-amber-500/20 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                  <h3 className="text-xl font-bold text-amber-500 mb-2">Valores</h3>
                  <p className="text-gray-300">Ética, transparência, compromisso e respeito em todas as negociações.</p>
                </div>
                <div className="bg-[#1a2437] p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-amber-500/20 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                  <h3 className="text-xl font-bold text-amber-500 mb-2">Diferencial</h3>
                  <p className="text-gray-300">Atendimento personalizado e conhecimento profundo do mercado imobiliário local.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-amber-500 mb-6 text-center animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">Nossa Equipe</h2>
            <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
              Contamos com profissionais qualificados e experientes, prontos para oferecer o melhor atendimento e 
              orientação em todas as etapas da sua jornada imobiliária.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#1a2437] p-6 rounded-lg text-center shadow-lg transition-all duration-500 hover:shadow-amber-500/20 hover:-translate-y-2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                <div className="w-32 h-32 bg-[#0f172a] rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-amber-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Carlos Silva</h3>
                <p className="text-amber-500 mb-2">Diretor</p>
                <p className="text-gray-300">Mais de 15 anos de experiência no mercado imobiliário, especialista em negociações de alto padrão.</p>
              </div>
              
              <div className="bg-[#1a2437] p-6 rounded-lg text-center shadow-lg transition-all duration-500 hover:shadow-amber-500/20 hover:-translate-y-2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                <div className="w-32 h-32 bg-[#0f172a] rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-amber-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Ana Oliveira</h3>
                <p className="text-amber-500 mb-2">Corretora Sênior</p>
                <p className="text-gray-300">Especialista em imóveis residenciais, com foco em atendimento personalizado e satisfação do cliente.</p>
              </div>
              
              <div className="bg-[#1a2437] p-6 rounded-lg text-center shadow-lg transition-all duration-500 hover:shadow-amber-500/20 hover:-translate-y-2 animate-fade-in opacity-0 transform translate-y-4 transition-all duration-700">
                <div className="w-32 h-32 bg-[#0f172a] rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-amber-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Marcos Santos</h3>
                <p className="text-amber-500 mb-2">Especialista Comercial</p>
                <p className="text-gray-300">Focado em imóveis comerciais e investimentos, com amplo conhecimento do mercado local.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

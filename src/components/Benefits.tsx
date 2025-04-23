"use client";

import React, { useEffect, useRef } from 'react';
import { FaHome, FaUserTie, FaFileContract, FaRocket } from 'react-icons/fa';

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, title, description, delay }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={itemRef}
      className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transform transition-all duration-700 opacity-0 translate-y-10 hover:shadow-lg"
    >
      <div className="text-3xl text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Benefits = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const benefits = [
    {
      icon: <FaHome />,
      title: "Imóveis Exclusivos",
      description: "Oferecemos uma seleção de imóveis cuidadosamente escolhidos para atender suas necessidades.",
      delay: 100
    },
    {
      icon: <FaUserTie />,
      title: "Atendimento Personalizado",
      description: "Nossa equipe está pronta para oferecer um atendimento exclusivo e adaptado ao seu perfil.",
      delay: 300
    },
    {
      icon: <FaFileContract />,
      title: "Documentação Facilitada",
      description: "Cuidamos de toda a burocracia para que você tenha uma experiência tranquila e segura.",
      delay: 500
    },
    {
      icon: <FaRocket />,
      title: "Agilidade no Processo",
      description: "Processos rápidos e eficientes para que você conquiste seu imóvel sem complicações.",
      delay: 700
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-16 px-4 bg-gray-50 transition-opacity duration-1000 opacity-0"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Por que escolher a Casarão Imóveis?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trabalhamos com excelência para proporcionar a melhor experiência na compra, venda ou aluguel do seu imóvel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={benefit.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits; 
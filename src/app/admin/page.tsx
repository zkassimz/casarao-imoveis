"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyForm from '@/components/PropertyForm';
import ExportImportTools from '@/components/ExportImportTools';
import { Property } from '@/data/properties';
import { getAllProperties, deleteProperty } from '@/data/propertyService';

export default function Admin() {
  const [properties, setProperties] = useState<Property[]>(getAllProperties());
  const [showForm, setShowForm] = useState(false);

  const handlePropertyAdded = (property: Property) => {
    setProperties([...properties]);
    setShowForm(false);
  };
  
  const handleDeleteProperty = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel?')) {
      const success = deleteProperty(id);
      if (success) {
        setProperties(properties.filter(property => property.id !== id));
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-amber-500">Painel Administrativo</h1>
            <button 
              onClick={() => setShowForm(!showForm)} 
              className="btn-primary"
            >
              {showForm ? 'Cancelar' : 'Adicionar Novo Imóvel'}
            </button>
          </div>
          
          {showForm && (
            <div className="mb-12">
              <PropertyForm onPropertyAdded={handlePropertyAdded} />
            </div>
          )}
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-amber-500 mb-6">Imóveis Cadastrados</h2>
            
            {properties.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Título</th>
                      <th className="p-4">Preço</th>
                      <th className="p-4">Tipo</th>
                      <th className="p-4">Quartos</th>
                      <th className="p-4">Área</th>
                      <th className="p-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property) => (
                      <tr key={property.id} className="border-b border-gray-700">
                        <td className="p-4">{property.id}</td>
                        <td className="p-4">{property.title}</td>
                        <td className="p-4">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(property.price)}
                        </td>
                        <td className="p-4 capitalize">{property.propertyType}</td>
                        <td className="p-4">{property.bedrooms}</td>
                        <td className="p-4">{property.area} m²</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                              Editar
                            </button>
                            <button 
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                              onClick={() => handleDeleteProperty(property.id)}
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">Nenhum imóvel cadastrado.</p>
            )}
          </div>
          
          <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-amber-500 mb-6">Exportar/Importar Dados</h2>
            <ExportImportTools />
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

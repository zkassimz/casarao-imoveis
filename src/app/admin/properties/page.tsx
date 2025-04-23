"use client";

import { useState } from 'react';
import { useProperties } from '@/hooks/useProperties';
import PropertyForm from '@/components/PropertyForm';
import { Property } from '@/types/property';
import Link from 'next/link';

export default function AdminPropertiesPage() {
  const { 
    properties, 
    loading, 
    error, 
    fetchProperties, 
    addProperty, 
    updateProperty, 
    removeProperty 
  } = useProperties();
  
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  
  const handleAddProperty = async (propertyData: Omit<Property, 'id'>, imageFile?: File) => {
    setFormLoading(true);
    try {
      await addProperty(propertyData, imageFile);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao adicionar imóvel:', error);
    } finally {
      setFormLoading(false);
    }
  };
  
  const handleEditProperty = async (propertyData: Omit<Property, 'id'>, imageFile?: File) => {
    if (!selectedProperty) return;
    
    setFormLoading(true);
    try {
      await updateProperty(selectedProperty.id, propertyData, imageFile);
      setSelectedProperty(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar imóvel:', error);
    } finally {
      setFormLoading(false);
    }
  };
  
  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel?')) {
      try {
        await removeProperty(id);
      } catch (error) {
        console.error('Erro ao remover imóvel:', error);
      }
    }
  };
  
  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsEditing(true);
    setShowForm(true);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Gerenciar Imóveis</h1>
          
          <div className="flex gap-4">
            <Link href="/admin" className="bg-primary-light text-white px-4 py-2 rounded hover:bg-primary">
              Voltar
            </Link>
            
            <button 
              onClick={() => {
                setSelectedProperty(null);
                setIsEditing(false);
                setShowForm(!showForm);
              }}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
            >
              {showForm && !isEditing ? 'Cancelar' : 'Adicionar Imóvel'}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        {showForm && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">
              {isEditing ? 'Editar Imóvel' : 'Adicionar Novo Imóvel'}
            </h2>
            <PropertyForm 
              property={selectedProperty || undefined}
              onSubmit={isEditing ? handleEditProperty : handleAddProperty}
              isLoading={formLoading}
            />
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Lista de Imóveis</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-primary-light">Carregando imóveis...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-primary-light">Nenhum imóvel cadastrado.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary">
                    <th className="border px-4 py-2 text-left">Título</th>
                    <th className="border px-4 py-2 text-left">Tipo</th>
                    <th className="border px-4 py-2 text-right">Preço</th>
                    <th className="border px-4 py-2 text-center">Quartos</th>
                    <th className="border px-4 py-2 text-center">Status</th>
                    <th className="border px-4 py-2 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-secondary-light">
                      <td className="border px-4 py-2">
                        <div className="flex items-center">
                          <div className="h-12 w-12 relative mr-3 flex-shrink-0">
                            <img 
                              src={property.imageUrl || 'https://via.placeholder.com/100?text=Sem+Imagem'} 
                              alt={property.title}
                              className="h-full w-full object-cover rounded"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Erro';
                              }} 
                            />
                          </div>
                          <span className="font-medium">{property.title}</span>
                        </div>
                      </td>
                      <td className="border px-4 py-2">
                        {property.propertyType} ({property.type})
                      </td>
                      <td className="border px-4 py-2 text-right">
                        {formatCurrency(property.price)}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {property.bedrooms}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          property.status === 'disponível' ? 'bg-green-100 text-green-800' : 
                          property.status === 'vendido' ? 'bg-red-100 text-red-800' :
                          property.status === 'alugado' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.status}
                        </span>
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex justify-center gap-2">
                          <Link 
                            href={`/imoveis/${property.id}`}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                            target="_blank"
                          >
                            Ver
                          </Link>
                          <button 
                            onClick={() => handleSelectProperty(property)}
                            className="bg-secondary text-primary px-2 py-1 rounded hover:bg-secondary-dark"
                          >
                            Editar
                          </button>
                          <button 
                            onClick={() => handleDeleteProperty(property.id)}
                            className="bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200"
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
          )}
        </div>
      </div>
    </div>
  );
} 
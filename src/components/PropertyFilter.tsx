import React, { useState } from 'react';

interface PropertyFilterProps {
  onFilterChange: (filters: any) => void;
}

export default function PropertyFilter({ onFilterChange }: PropertyFilterProps) {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [transactionType, setTransactionType] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      minPrice,
      maxPrice,
      bedrooms,
      propertyType,
      transactionType
    });
  };

  const clearFilters = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setBedrooms(null);
    setPropertyType(null);
    setTransactionType(null);
    onFilterChange({});
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4">Filtrar Imóveis</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label htmlFor="transactionType" className="block text-gray-300 mb-2">
              Tipo de Transação
            </label>
            <select
              id="transactionType"
              className="bg-gray-700 text-white rounded p-2 w-full"
              onChange={(e) => setTransactionType(e.target.value || null)}
              value={transactionType || ''}
            >
              <option value="">Todos</option>
              <option value="venda">Venda</option>
              <option value="aluguel">Aluguel</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="minPrice" className="block text-gray-300 mb-2">
              Preço Mínimo
            </label>
            <input
              type="number"
              id="minPrice"
              placeholder="R$ Mínimo"
              className="bg-gray-700 text-white rounded p-2 w-full"
              onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : null)}
              value={minPrice || ''}
            />
          </div>
          
          <div>
            <label htmlFor="maxPrice" className="block text-gray-300 mb-2">
              Preço Máximo
            </label>
            <input
              type="number"
              id="maxPrice"
              placeholder="R$ Máximo"
              className="bg-gray-700 text-white rounded p-2 w-full"
              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
              value={maxPrice || ''}
            />
          </div>
          
          <div>
            <label htmlFor="bedrooms" className="block text-gray-300 mb-2">
              Quartos
            </label>
            <select
              id="bedrooms"
              className="bg-gray-700 text-white rounded p-2 w-full"
              onChange={(e) => setBedrooms(e.target.value ? Number(e.target.value) : null)}
              value={bedrooms || ''}
            >
              <option value="">Qualquer</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="propertyType" className="block text-gray-300 mb-2">
              Tipo de Imóvel
            </label>
            <select
              id="propertyType"
              className="bg-gray-700 text-white rounded p-2 w-full"
              onChange={(e) => setPropertyType(e.target.value || null)}
              value={propertyType || ''}
            >
              <option value="">Todos</option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={clearFilters}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Limpar Filtros
          </button>
          
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded"
          >
            Aplicar Filtros
          </button>
        </div>
      </form>
    </div>
  );
}

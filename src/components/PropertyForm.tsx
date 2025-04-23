import React, { useState } from 'react';
import { Property } from '@/data/properties';
import { addProperty } from '@/data/propertyService';

interface PropertyFormProps {
  onPropertyAdded: (property: Property) => void;
}

export default function PropertyForm({ onPropertyAdded }: PropertyFormProps) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [area, setArea] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [propertyType, setPropertyType] = useState<'casa' | 'apartamento' | 'terreno' | 'comercial'>('casa');
  const [features, setFeatures] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validação básica
    if (!title || !price || !address || !area || !imageUrl || !propertyType) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Criar o novo imóvel
      const newProperty = addProperty({
        title,
        price: Number(price),
        address,
        bedrooms: Number(bedrooms) || 0,
        bathrooms: Number(bathrooms) || 0,
        area: Number(area),
        imageUrl,
        description,
        propertyType,
        features: features.split(',').map(feature => feature.trim()).filter(Boolean),
        type: 'venda',
        status: ''
      });

      // Notificar o componente pai
      onPropertyAdded(newProperty);

      // Limpar o formulário
      setTitle('');
      setPrice('');
      setAddress('');
      setBedrooms('');
      setBathrooms('');
      setArea('');
      setImageUrl('');
      setDescription('');
      setPropertyType('casa');
      setFeatures('');

      // Mostrar mensagem de sucesso
      setSuccess('Imóvel adicionado com sucesso!');
    } catch (err) {
      setError('Erro ao adicionar imóvel. Por favor, tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-amber-500 mb-6">Adicionar Novo Imóvel</h2>

      {error && (
        <div className="bg-red-900 text-white p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-900 text-white p-4 rounded-lg mb-6">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="title" className="block text-gray-300 mb-2">
              Título*
            </label>
            <input
              type="text"
              id="title"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Casa Moderna com Piscina"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-300 mb-2">
              Preço (R$)*
            </label>
            <input
              type="number"
              id="price"
              className="input-field"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 850000"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-300 mb-2">
              Endereço*
            </label>
            <input
              type="text"
              id="address"
              className="input-field"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ex: Rua das Flores, 123 - Centro"
            />
          </div>

          <div>
            <label htmlFor="propertyType" className="block text-gray-300 mb-2">
              Tipo de Imóvel*
            </label>
            <select
              id="propertyType"
              className="select-field"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as any)}
            >
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>

          <div>
            <label htmlFor="bedrooms" className="block text-gray-300 mb-2">
              Quartos
            </label>
            <input
              type="number"
              id="bedrooms"
              className="input-field"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              placeholder="Ex: 3"
            />
          </div>

          <div>
            <label htmlFor="bathrooms" className="block text-gray-300 mb-2">
              Banheiros
            </label>
            <input
              type="number"
              id="bathrooms"
              className="input-field"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              placeholder="Ex: 2"
            />
          </div>

          <div>
            <label htmlFor="area" className="block text-gray-300 mb-2">
              Área (m²)*
            </label>
            <input
              type="number"
              id="area"
              className="input-field"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Ex: 180"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-gray-300 mb-2">
              URL da Imagem*
            </label>
            <input
              type="text"
              id="imageUrl"
              className="input-field"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Ex: https://exemplo.com/imagem.jpg"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="features" className="block text-gray-300 mb-2">
              Características (separadas por vírgula)
            </label>
            <input
              type="text"
              id="features"
              className="input-field"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="Ex: Piscina, Área Gourmet, Jardim, Garagem para 2 carros"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-300 mb-2">
              Descrição
            </label>
            <textarea
              id="description"
              rows={4}
              className="input-field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o imóvel com detalhes..."
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary">
            Adicionar Imóvel
          </button>
        </div>
      </form>
    </div>
  );
}

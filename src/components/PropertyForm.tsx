import { useState, useEffect } from 'react';
import { Property } from '@/types/property';

interface PropertyFormProps {
  property?: Property;
  onSubmit: (property: Omit<Property, 'id'>, imageFile?: File) => Promise<void>;
  isLoading: boolean;
}

export default function PropertyForm({ property, onSubmit, isLoading }: PropertyFormProps) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'venda' | 'aluguel'>('venda');
  const [propertyType, setPropertyType] = useState<'casa' | 'apartamento' | 'terreno' | 'comercial' | ''>('');
  const [features, setFeatures] = useState<string[]>([]);
  const [status, setStatus] = useState('disponível');
  const [imageUrl, setImageUrl] = useState('');
  const [driveImageId, setDriveImageId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [featureInput, setFeatureInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (property) {
      setTitle(property.title);
      setPrice(property.price.toString());
      setAddress(property.address);
      setBedrooms(property.bedrooms.toString());
      setBathrooms(property.bathrooms.toString());
      setArea(property.area.toString());
      setDescription(property.description || '');
      setType(property.type);
      setPropertyType(property.propertyType || '');
      setFeatures(property.features || []);
      setStatus(property.status);
      setImageUrl(property.imageUrl || '');
      setDriveImageId(property.driveImageId || '');
      
      // Se tivermos uma imageUrl, use-a como preview
      if (property.imageUrl) {
        setPreviewUrl(property.imageUrl);
      }
    }
  }, [property]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Criar URL de preview para a imagem selecionada
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Limpar a URL externa, pois agora temos um arquivo local
      setImageUrl('');
      setDriveImageId('');
      
      // Limpar quando o componente for desmontado
      return () => URL.revokeObjectURL(objectUrl);
    }
  };
  
  const handleExternalImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setPreviewUrl(e.target.value);
    setImageFile(null);
    setDriveImageId('');
  };
  
  const handleDriveImageId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriveImageId(e.target.value);
    const driveUrl = `https://drive.google.com/uc?export=view&id=${e.target.value}`;
    setPreviewUrl(driveUrl);
    setImageFile(null);
    setImageUrl('');
  };

  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const propertyData: Omit<Property, 'id'> = {
      title,
      price: parseFloat(price),
      address,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      area: parseFloat(area),
      description,
      type,
      propertyType: propertyType as 'casa' | 'apartamento' | 'terreno' | 'comercial',
      features,
      status,
      imageUrl,
      driveImageId: driveImageId || undefined
    };
    
    await onSubmit(propertyData, imageFile || undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-primary mb-4">Informações Básicas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-primary-light mb-1">
              Título *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-primary-light mb-1">
              Preço (R$) *
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-primary-light mb-1">
              Endereço *
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-primary-light mb-1">
              Tipo de Transação *
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as 'venda' | 'aluguel')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              required
            >
              <option value="venda">Venda</option>
              <option value="aluguel">Aluguel</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="propertyType" className="block text-primary-light mb-1">
              Tipo de Imóvel *
            </label>
            <select
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as 'casa' | 'apartamento' | 'terreno' | 'comercial')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              required
            >
              <option value="">Selecione</option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="bedrooms" className="block text-primary-light mb-1">
              Quartos *
            </label>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              required
              min="0"
            />
          </div>
          
          <div>
            <label htmlFor="bathrooms" className="block text-primary-light mb-1">
              Banheiros *
            </label>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              required
              min="0"
            />
          </div>
          
          <div>
            <label htmlFor="area" className="block text-primary-light mb-1">
              Área (m²) *
            </label>
            <input
              type="number"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              required
              min="0"
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-primary-light mb-1">
              Status *
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              required
            >
              <option value="disponível">Disponível</option>
              <option value="vendido">Vendido</option>
              <option value="alugado">Alugado</option>
              <option value="reservado">Reservado</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-primary mb-4">Descrição</h3>
        
        <div>
          <label htmlFor="description" className="block text-primary-light mb-1">
            Descrição detalhada
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            rows={5}
          />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-primary mb-4">Características</h3>
        
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Adicionar característica"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
          />
          <button
            type="button"
            onClick={addFeature}
            className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-light"
          >
            Adicionar
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <div key={index} className="bg-secondary px-3 py-1 rounded-full flex items-center">
              <span>{feature}</span>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="ml-2 text-primary-light hover:text-primary"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-primary mb-4">Imagem</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-primary-light mb-1">
              Escolha uma opção:
            </label>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="image" className="block text-primary-light mb-1">
                  Upload de imagem
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="imageUrl" className="block text-primary-light mb-1">
                  URL da imagem (Unsplash, etc.)
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={handleExternalImageUrl}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="https://..."
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="driveImageId" className="block text-primary-light mb-1">
                  ID da imagem no Google Drive
                </label>
                <input
                  type="text"
                  id="driveImageId"
                  value={driveImageId}
                  onChange={handleDriveImageId}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="ID do Drive"
                />
              </div>
            </div>
          </div>
          
          {previewUrl && (
            <div className="mt-4">
              <p className="text-primary-light mb-2">Preview:</p>
              <div className="relative h-64 w-full rounded-lg overflow-hidden border border-gray-300">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Imagem+Inválida';
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Processando...' : property ? 'Atualizar Imóvel' : 'Cadastrar Imóvel'}
        </button>
      </div>
    </form>
  );
}

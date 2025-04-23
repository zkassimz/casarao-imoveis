import React from 'react';
import { savePropertiesToJSON, loadPropertiesFromJSON } from '@/data/propertyService';

export default function ExportImportTools() {
  const handleExport = () => {
    try {
      // Obter os dados em formato JSON
      const jsonData = savePropertiesToJSON();
      
      // Criar um blob com os dados
      const blob = new Blob([jsonData], { type: 'application/json' });
      
      // Criar uma URL para o blob
      const url = URL.createObjectURL(blob);
      
      // Criar um elemento de link para download
      const a = document.createElement('a');
      a.href = url;
      a.download = `casarao-imoveis-${new Date().toISOString().split('T')[0]}.json`;
      
      // Simular um clique no link para iniciar o download
      document.body.appendChild(a);
      a.click();
      
      // Limpar
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      alert('Erro ao exportar dados. Por favor, tente novamente.');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      
      if (!file) {
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const jsonData = e.target?.result as string;
          
          if (!jsonData) {
            throw new Error('Dados inválidos');
          }
          
          const success = loadPropertiesFromJSON(jsonData);
          
          if (success) {
            alert('Dados importados com sucesso!');
            // Recarregar a página para mostrar os novos dados
            window.location.reload();
          } else {
            throw new Error('Formato de dados inválido');
          }
        } catch (error) {
          console.error('Erro ao processar arquivo:', error);
          alert('Erro ao importar dados. Verifique se o arquivo está no formato correto.');
        }
      };
      
      reader.onerror = () => {
        alert('Erro ao ler o arquivo. Por favor, tente novamente.');
      };
      
      reader.readAsText(file);
    } catch (error) {
      console.error('Erro ao importar dados:', error);
      alert('Erro ao importar dados. Por favor, tente novamente.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Exportar Dados</h3>
        <p className="text-gray-300 mb-4">
          Exporte todos os imóveis cadastrados para um arquivo JSON que você pode salvar como backup.
        </p>
        <button onClick={handleExport} className="btn-primary">
          Exportar para JSON
        </button>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Importar Dados</h3>
        <p className="text-gray-300 mb-4">
          Importe imóveis a partir de um arquivo JSON previamente exportado.
        </p>
        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-amber-500 file:text-black"
          />
        </div>
      </div>
    </div>
  );
}

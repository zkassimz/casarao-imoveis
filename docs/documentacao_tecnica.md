# Documentação Técnica - Site Imobiliária Casarão

## Visão Geral do Projeto

Este documento fornece informações técnicas sobre a estrutura e funcionamento do site da Imobiliária Casarão, desenvolvido com Next.js e Tailwind CSS.

## Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento de aplicações web
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **React**: Biblioteca JavaScript para construção de interfaces

## Estrutura de Diretórios

```
casarao-imoveis/
├── public/               # Arquivos estáticos
│   ├── images/           # Imagens do site, incluindo logo
│   └── ...
├── src/
│   ├── app/              # Páginas da aplicação
│   │   ├── page.tsx      # Página inicial
│   │   ├── admin/        # Área administrativa
│   │   │   └── page.tsx  # Painel de administração
│   │   └── layout.tsx    # Layout principal
│   ├── components/       # Componentes reutilizáveis
│   │   ├── Navbar.tsx    # Barra de navegação
│   │   ├── Footer.tsx    # Rodapé
│   │   ├── PropertyCard.tsx     # Card de imóvel
│   │   ├── PropertyFilter.tsx   # Filtro de imóveis
│   │   ├── PropertyForm.tsx     # Formulário de imóveis
│   │   └── ExportImportTools.tsx # Ferramentas de exportação/importação
│   └── data/             # Dados e serviços
│       ├── properties.ts  # Estrutura de dados e exemplos
│       └── propertyService.ts # Serviços para gerenciamento de imóveis
└── docs/                 # Documentação
    └── manual_usuario.md # Manual do usuário
```

## Componentes Principais

### Navbar
Barra de navegação superior com logo e links para as principais seções do site.

### Footer
Rodapé com informações de contato e links rápidos.

### PropertyCard
Exibe informações de um imóvel em formato de card, incluindo imagem, título, preço, endereço e características.

### PropertyFilter
Permite filtrar imóveis por preço, número de quartos e tipo de imóvel.

### PropertyForm
Formulário para adicionar ou editar imóveis no painel administrativo.

### ExportImportTools
Componente para exportar e importar dados de imóveis em formato JSON.

## Modelo de Dados

O site utiliza a seguinte estrutura para os dados de imóveis:

```typescript
interface Property {
  id: number;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  description?: string;
  propertyType: 'casa' | 'apartamento' | 'terreno' | 'comercial';
  features?: string[];
}
```

## Serviços de Dados

O arquivo `propertyService.ts` contém funções para:

- Obter todos os imóveis
- Obter um imóvel específico por ID
- Filtrar imóveis por critérios
- Adicionar novos imóveis
- Atualizar imóveis existentes
- Excluir imóveis
- Exportar e importar dados em formato JSON

## Tema e Estilização

O site utiliza um tema escuro com detalhes em dourado/âmbar. A estilização é feita com Tailwind CSS, com classes personalizadas definidas no arquivo `globals.css`.

Cores principais:
- Fundo: Preto/cinza escuro
- Texto: Branco/cinza claro
- Destaque: Dourado (amber-500)
- Secundária: Cinza médio

## Funcionalidades Principais

### Página Inicial
- Exibição de imóveis em destaque
- Sistema de filtro de imóveis
- Seções informativas sobre a empresa

### Painel Administrativo
- Listagem de imóveis cadastrados
- Adição de novos imóveis
- Edição e exclusão de imóveis existentes
- Exportação e importação de dados

## Como Adicionar Novas Funcionalidades

### Adicionar Nova Página
1. Crie um novo diretório em `src/app/` com o nome da rota
2. Adicione um arquivo `page.tsx` com o componente da página
3. Adicione a diretiva "use client" se utilizar hooks do React
4. Importe os componentes necessários

### Adicionar Novo Componente
1. Crie um novo arquivo em `src/components/`
2. Implemente o componente com TypeScript e React
3. Exporte o componente como default
4. Importe e utilize onde necessário

## Personalização

### Alterar Logo
1. Substitua os arquivos em `public/images/logo.png` e `public/images/logo-icon.png`
2. Mantenha os mesmos nomes de arquivo para evitar alterações no código

### Alterar Cores
1. Modifique as variáveis de cor no arquivo `src/app/globals.css`
2. As cores principais estão definidas nas variáveis CSS na seção `:root`

## Considerações para Produção

Antes de implantar em produção, considere:

1. Substituir os dados de exemplo por um banco de dados real
2. Implementar autenticação para o painel administrativo
3. Otimizar imagens para melhor desempenho
4. Configurar um domínio personalizado

## Solução de Problemas Comuns

### Erro "useState only works in Client Components"
Adicione a diretiva "use client" no topo do arquivo que utiliza hooks do React.

### Imagens não aparecem
Verifique se as URLs das imagens estão corretas e acessíveis.

### Dados não persistem após recarregar a página
O sistema atual utiliza armazenamento em memória. Para persistência real, implemente um banco de dados.

### Páginas retornando erro 404
Verifique se todas as páginas necessárias foram criadas em src/app/ com seus respectivos arquivos page.tsx.

### Filtro de preço não aceita valores decimais
Os campos de preço foram configurados para aceitar valores decimais usando parseFloat() e o atributo step="0.01" nos inputs.

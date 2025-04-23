# Casarão Imobiliária

Sistema completo para uma imobiliária com gerenciamento de imóveis, integração com Firebase e painel administrativo.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização híbrida
- **Tailwind CSS**: Framework de CSS para estilização
- **Firebase**: Armazenamento de dados e autenticação
- **React Hook Form**: Gerenciamento de formulários
- **TypeScript**: Tipagem estática

## Configuração do Firebase

Para utilizar este projeto com o Firebase, você precisa:

1. Criar uma conta no [Firebase](https://firebase.google.com/)
2. Criar um novo projeto
3. Configurar o Firestore Database
4. Configurar o Authentication com provedor de e-mail/senha
5. Configurar o Storage para armazenamento de imagens
6. Copiar as credenciais do seu projeto Firebase

Renomeie o arquivo `.env.local.example` para `.env.local` e preencha com suas credenciais:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Estrutura do Banco de Dados Firebase

O projeto utiliza as seguintes coleções no Firestore:

- **properties**: Armazena informações dos imóveis
- **messages**: Armazena mensagens enviadas pelo formulário de contato
- **users**: Armazena informações de usuários administrativos

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Executar em modo de produção
npm start
```

## Funcionalidades

- 🏠 Listagem de imóveis com filtros
- 🔍 Página de detalhes de imóvel
- 📝 Formulário de contato
- 📱 Design responsivo
- 🔒 Área administrativa protegida
- 📊 Painel administrativo
- 📁 Upload de imagens para Firebase Storage
- 🔄 CRUD completo para imóveis

## Área Administrativa

O acesso à área administrativa é feito através da rota `/admin`. As credenciais devem ser configuradas no Firebase Authentication.

Para criar o primeiro usuário administrativo, use o Firebase Authentication para adicionar um usuário com e-mail e senha.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

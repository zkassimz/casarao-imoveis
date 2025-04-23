"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error: any) {
      setError('Falha ao fazer login. Verifique suas credenciais.');
      setLoading(false);
      console.error('Erro de login:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">Painel de Administração</h1>
        
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Login</h2>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-primary-light mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-primary-light mb-2">Senha</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-light disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 flex justify-end">
              <button
                onClick={handleLogout}
                className="bg-primary-light text-white px-4 py-2 rounded hover:bg-primary-dark"
              >
                Sair
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Módulos Administrativos</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/admin/properties" className="block">
                  <div className="bg-secondary p-6 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-primary mb-2">Gerenciar Imóveis</h3>
                    <p className="text-primary-light">
                      Adicione, edite e remova imóveis disponíveis no site.
                    </p>
                  </div>
                </Link>
                
                <Link href="/admin/users" className="block">
                  <div className="bg-secondary p-6 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-primary mb-2">Gerenciar Usuários</h3>
                    <p className="text-primary-light">
                      Adicione ou remova usuários administrativos.
                    </p>
                  </div>
                </Link>
                
                <Link href="/admin/messages" className="block">
                  <div className="bg-secondary p-6 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-primary mb-2">Mensagens</h3>
                    <p className="text-primary-light">
                      Visualize mensagens enviadas pelo formulário de contato.
                    </p>
                  </div>
                </Link>
                
                <Link href="/admin/settings" className="block">
                  <div className="bg-secondary p-6 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-primary mb-2">Configurações</h3>
                    <p className="text-primary-light">
                      Configure preferências e ajustes do site.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Estatísticas Rápidas</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-500 text-3xl font-bold">12</div>
                  <div className="text-primary-light">Imóveis Ativos</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-500 text-3xl font-bold">3</div>
                  <div className="text-primary-light">Vendidos este mês</div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-purple-500 text-3xl font-bold">8</div>
                  <div className="text-primary-light">Mensagens novas</div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-yellow-500 text-3xl font-bold">128</div>
                  <div className="text-primary-light">Visitas hoje</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

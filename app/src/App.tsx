import React, { useState } from 'react';
import Dashboard from './Dashboard';
import CadastrarProdutos from './CadastrarProdutos';
import ListarProdutos from './ListarProdutos';
import CadastrarUsuario from './CadastrarUsuario';
const API_BASE_URL = 'http://127.0.0.1:3000';

interface LoginResponse {
  nome: string;
  access_token: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const dados: LoginResponse = await response.json();

      if (dados.nome && dados.access_token) {
        setIsLoggedIn(true);

        localStorage.setItem('access_token', dados.access_token);
        localStorage.setItem('user_name', dados.nome);
      } else {
        setError('Usuário ou senha incorretos');
      }
    } catch (err) {
      setError('Erro ao conectar com a API');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('dashboard');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_name');
  };

  if (isLoggedIn) {
    switch (currentScreen) {
      case 'cadastrarprodutos':
        return <CadastrarProdutos onLogout={handleLogout} onNavigate={setCurrentScreen} />;

      case 'listarprodutos': 
        return <ListarProdutos onLogout={handleLogout} onNavigate={setCurrentScreen} />;
      
      default: 
        return <Dashboard onLogout={handleLogout} onNavigate={setCurrentScreen} />;
    }
  }

  if (currentScreen === 'cadastrarusuario') {
    return <CadastrarUsuario onBackToLogin={() => setCurrentScreen('dashboard')} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0c2a6b] to-[#041130] p-4">
      <div className="w-full max-w-md rounded-2xl bg-linear-to-b from-[#1872cc] to-[#0b6494] p-8 shadow-2xl md:p-12">
        <h1 className="text-center text-white text-3xl font-medium tracking-wide mb-8">GestoQ</h1>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="relative">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl text-white placeholder-white/80 bg-linear-to-r from-[#035bbd] to-[#12a9bc] border-none outline-none"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl text-white placeholder-white/80 bg-linear-to-r from-[#035bbd] to-[#12a9bc] border-none outline-none"
              required
            />
          </div>
          {error && (
            <div className="text-red-300 text-sm text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-5 rounded-xl text-white font-medium text-lg bg-[#0a2f7c] hover:bg-[#082563] shadow-md cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>

        <div className="flex justify-center gap-2 items-center mt-8 text-md">
          <p className="text-white/75">É novo por aqui?</p>
          <button  
            className="cursor-pointer text-white/80  hover:underline hover:text-white hover:font-medium"
            onClick={() => {
              setCurrentScreen('cadastrarusuario');
            }}
          >
            Criar conta
          </button>

        </div>
      </div>
    </div>
  );
}
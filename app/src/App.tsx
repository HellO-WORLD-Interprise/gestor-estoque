import React, { useState } from 'react';
import Dashboard from './Dashboard';
import CadastrarProduto from './CadastrarProduto';
import Estoque from './Estoque'; // 👈 Importando o novo componente

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard'); 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('dashboard'); 
  };

  // Roteamento condicional de telas internas do app
  if (isLoggedIn) {
    if (currentScreen === 'produtos') {
      return <CadastrarProduto onLogout={handleLogout} onNavigate={setCurrentScreen} />;
    }
    
    if (currentScreen === 'estoque') {
      return <Estoque onLogout={handleLogout} onNavigate={setCurrentScreen} />; // 👈 Adicionado aqui
    }
    
    return <Dashboard onLogout={handleLogout} onNavigate={setCurrentScreen} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c2a6b] to-[#041130] p-4">
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-[#1872cc] to-[#0b6494] p-8 shadow-2xl md:p-12">
        <h1 className="text-center text-white text-3xl font-medium tracking-wide mb-8">E-Gestor</h1>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="relative">
            <input type="email" placeholder="E-mail" className="w-full px-5 py-3.5 rounded-xl text-white placeholder-blue-100/70 bg-gradient-to-r from-[#035bbd] to-[#12a9bc] border-none outline-none" />
          </div>
          <div className="relative">
            <input type="password" placeholder="Senha" className="w-full px-5 py-3.5 rounded-xl text-white placeholder-blue-100/70 bg-gradient-to-r from-[#035bbd] to-[#12a9bc] border-none outline-none" />
          </div>
          <button type="submit" className="w-full py-3.5 mt-2 rounded-xl text-white font-medium text-lg bg-[#0a2f7c] hover:bg-[#082563] shadow-md">
            Entrar
          </button>
        </form>
        <div className="flex justify-between items-center mt-8 text-white/90 text-sm">
          <a href="#esquecer" className="hover:underline">Esqueceu a senha?</a>
          <a href="#criar" className="hover:underline">Criar conta</a>
        </div>
      </div>
    </div>
  );
}
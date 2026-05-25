
import React, { useState } from 'react';
import Dashboard from './Dashboard'; // Importa a tela do seu Dashboard

export default function App() {
  // Estado que controla qual tela exibir (false = Login, true = Dashboard)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Função que roda ao clicar em "Entrar"
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue
    setIsLoggedIn(true); // Força a entrada para o Dashboard direto
  };

  // Se o estado for true, renderiza o Dashboard e passa a função de voltar para o login
  if (isLoggedIn) {
    return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
  }

  // Se o estado for false, renderiza a sua tela de Login idêntica
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c2a6b] to-[#041130] p-4">
      {/* Card Principal de Login */}
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-[#1872cc] to-[#0b6494] p-8 shadow-2xl md:p-12">
        
        {/* Título */}
        <h1 className="text-center text-white text-3xl font-medium tracking-wide mb-8">
          E-Gestor
        </h1>

        {/* Formulário - Agora chama a função handleLogin ao enviar */}
        <form className="space-y-5" onSubmit={handleLogin}>
          
          {/* Campo de E-mail */}
          <div className="relative">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full px-5 py-3.5 rounded-xl text-white placeholder-blue-100/70 bg-gradient-to-r from-[#035bbd] to-[#12a9bc] border-none outline-none focus:ring-2 focus:ring-white/50 transition-all text-base"
            />
          </div>

          {/* Campo de Senha */}
          <div className="relative">
            <input
              type="password"
              placeholder="Senha"
              className="w-full px-5 py-3.5 rounded-xl text-white placeholder-blue-100/70 bg-gradient-to-r from-[#035bbd] to-[#12a9bc] border-none outline-none focus:ring-2 focus:ring-white/50 transition-all text-base"
            />
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-xl text-white font-medium text-lg bg-[#0a2f7c] hover:bg-[#082563] active:scale-[0.99] transition-all shadow-md"
          >
            Entrar
          </button>
        </form>

        {/* Links de Suporte / Rodapé */}
        <div className="flex justify-between items-center mt-8 text-white/90 text-sm">
          <a href="#esquecer" className="hover:underline transition-all">
            Esqueceu a senha?
          </a>
          <a href="#criar" className="hover:underline transition-all">
            Criar conta
          </a>
        </div>

      </div>
    </div>
  );
}
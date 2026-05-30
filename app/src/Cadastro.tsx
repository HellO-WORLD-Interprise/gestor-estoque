import React from 'react';

interface CadastroProps {
  onBackToLogin: () => void; // Função para voltar à tela de login
}

export default function Cadastro({ onBackToLogin }: CadastroProps) {
  // Dados dos inputs para o formulário
  const inputs = [
    { type: 'text', placeholder: 'Nome' },
    { type: 'email', placeholder: 'E-mail' },
    { type: 'password', placeholder: 'Senha' },
    { type: 'password', placeholder: 'Confirmar Senha' },
  ];

  return (
    // Fundo gradiente profundo e centralização total
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c2a6b] to-[#041130] p-4 font-sans">
      
      {/* Card Central com efeito "Glassmorphism" suave */}
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-sm p-8 shadow-2xl md:p-12 border border-white/10 relative overflow-hidden">
        
        {/* Título */}
        <h1 className="text-center text-white text-3xl font-medium tracking-wide mb-10">
          Criar Conta
        </h1>

        {/* Formulário */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Mapeando os inputs para manter o código limpo */}
          {inputs.map((input, index) => (
            <div key={index} className="relative group">
              <input
                type={input.type}
                placeholder={input.placeholder}
                className="w-full px-5 py-3.5 rounded-xl text-white placeholder-blue-100/70 bg-gradient-to-r from-[#035bbd] to-[#12a9bc] border-none outline-none focus:ring-2 focus:ring-white/50 transition-all text-base shadow-lg group-hover:from-[#0468d6] group-hover:to-[#13bed4]"
              />
            </div>
          ))}

          {/* Espaçador entre inputs e botão */}
          <div className="pt-2"></div>

          {/* Botão Cadastrar - Azul Marinho Escuro */}
          <button
            type="submit"
            className="w-full py-4 mt-2 rounded-xl text-white font-medium text-lg bg-[#0a1f4a] hover:bg-[#08183a] active:scale-[0.99] transition-all shadow-xl"
          >
            Cadastrar
          </button>
        </form>

        {/* Link para Voltar ao Login */}
        <div className="text-center mt-8">
          <button 
            onClick={onBackToLogin}
            className="text-white/80 hover:text-white transition-colors text-sm hover:underline"
          >
            Já tem uma conta? Entrar
          </button>
        </div>

      </div>
    </div>
  );
}
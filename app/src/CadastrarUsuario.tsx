import { useState } from 'react';
const API_BASE_URL = 'http://127.0.0.1:3000';

interface CadastrarUsuarioProps {
  onBackToLogin: () => void;
}


export default function CadastrarUsuario({ onBackToLogin }: CadastrarUsuarioProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validação: senhas iguais
    if (senha !== confirmarSenha) {
      setError('As senhas não conferem');
      return;
    }

    // Validação: campos obrigatórios
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar usuário');
      }

      setSuccess('Usuário cadastrado com sucesso! Redirecionando ao login...');
      setTimeout(() => {
        onBackToLogin();
        // Limpar formulário
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar com a API');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0c2a6b] to-[#041130] p-4 font-sans">
      
      <div className="w-full max-w-md rounded-2xl bg-linear-to-br from-[#1872cc] to-[#0b6494] p-8 shadow-2xl md:p-12 border border-white/10 relative overflow-hidden">
        
        <h1 className="text-center text-white text-3xl font-medium tracking-wide mb-10">
          Criar Conta
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="relative group">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl text-white placeholder-blue-100/80 bg-linear-to-r from-[#035bbd] to-[#12a9bc] border-none outline-none focus:ring-2 focus:ring-white/50 transition-all text-base shadow-lg group-hover:from-[#0468d6] group-hover:to-[#13bed4]"
              disabled={loading}
            />
          </div>

          <div className="relative group">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl text-white placeholder-blue-100/80 bg-linear-to-r from-[#035bbd] to-[#12a9bc] border-none outline-none focus:ring-2 focus:ring-white/50 transition-all text-base shadow-lg group-hover:from-[#0468d6] group-hover:to-[#13bed4]"
              disabled={loading}
            />
          </div>

          <div className="relative group">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl text-white placeholder-blue-100/80 bg-linear-to-r from-[#035bbd] to-[#12a9bc] border-none outline-none focus:ring-2 focus:ring-white/50 transition-all text-base shadow-lg group-hover:from-[#0468d6] group-hover:to-[#13bed4]"
              disabled={loading}
            />
          </div>

          <div className="relative group">
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl text-white placeholder-blue-100/80 bg-linear-to-r from-[#035bbd] to-[#12a9bc] border-none outline-none focus:ring-2 focus:ring-white/50 transition-all text-base shadow-lg group-hover:from-[#0468d6] group-hover:to-[#13bed4]"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-10 rounded-xl text-white font-medium text-lg bg-[#0a2f7c] hover:bg-[#082563] active:scale-[0.99] transition-all shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        {/* Link para Voltar ao Login */}
        <div className="flex justify-center gap-2 items-center mt-8 text-md">
          <p className="text-white/75">Já tem uma conta?</p>
          <button 
            onClick={onBackToLogin}
            disabled={loading}
            className="cursor-pointer text-white/80 hover:underline hover:text-white hover:font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Entrar
          </button>
        </div>

      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface Categoria {
  id_categoria: number;
  descricao: string;
}

interface AlterarProdutosProps {
  onLogout: () => void;
  onNavigate: (screen: string) => void;
  produtoId: number | null;
}

const API_BASE_URL = 'http://127.0.0.1:3000';

export default function AlterarProdutos({ onLogout, onNavigate, produtoId }: AlterarProdutosProps) {
  const [activeScreen, setActiveScreen] = useState<string>('alterarprodutos');
  const [userClickedEdit] = useState<boolean>(true);
  
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [idCategoria, setIdCategoria] = useState<number | ''>('');
  const [descricao, setDescricao] = useState('');
  
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (produtoId) {
      fetchProdutoECategorias();
    }
  }, [produtoId]);

  const fetchProdutoECategorias = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('access_token');

      // Fetch do produto específico
      const produtoResponse = await fetch(`${API_BASE_URL}/produtos/${produtoId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!produtoResponse.ok) {
        throw new Error('Erro ao carregar dados do produto');
      }

      const produtoData = await produtoResponse.json();
      setNome(produtoData.nome);
      setPreco(produtoData.preco.toString());
      setIdCategoria(produtoData.id_categoria || '');
      setDescricao(produtoData.descricao);

      // Fetch das categorias
      const categoriasResponse = await fetch(`${API_BASE_URL}/categorias`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!categoriasResponse.ok) {
        throw new Error('Erro ao carregar categorias');
      }

      const categoriasData: Categoria[] = await categoriasResponse.json();
      setCategorias(categoriasData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar com a API');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nome.trim() || !preco.trim() || !idCategoria || !descricao.trim()) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/produtos/${produtoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          preco: parseFloat(preco),
          id_categoria: idCategoria,
          descricao,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar produto');
      }

      setSuccess('Produto atualizado com sucesso!');
      setTimeout(() => {
        onNavigate('listarprodutos');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar com a API');
      console.error(err);
    }
  };

  const handleActiveWindow = (screen: string): boolean => {
    return activeScreen === screen;
  };

  const handleNavigation = (screen: string) => {
    setActiveScreen(screen);
    onNavigate(screen);
  };

  if (!produtoId) {
    return (
      <div className="flex bg-[#020617] min-h-screen text-white overflow-x-hidden">
        <Sidebar onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <Header onLogout={onLogout} />
          <main className="flex-1 p-8 md:p-12 flex items-center justify-center">
            <p className="text-red-400">Erro: Nenhum produto selecionado</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#020617] min-h-screen text-white overflow-x-hidden">
      <Sidebar onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col">

        <Header onLogout={onLogout} />
        <Navbar 
          pageName="Produtos" 
          onNavigate={handleNavigation} 
          activeWindow={handleActiveWindow}
          showEditButton={userClickedEdit}
        />
        <main className="flex-1 p-8 md:p-12 max-w-4xl w-full mx-auto space-y-8">
          <h1 className="text-3xl font-semibold tracking-wide text-[#aee2ff]">Alterar Produto</h1>

          {error && (
            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200">
              {success}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8 text-slate-400">
              Carregando dados do produto...
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-lg font-medium text-slate-200">Nome</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-900 outline-none"
                    disabled={loading}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-medium text-slate-200">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-900 outline-none"
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-lg font-medium text-slate-200">Categoria</label>
                  <select
                    value={idCategoria}
                    onChange={(e) => setIdCategoria(e.target.value ? parseInt(e.target.value) : '')}
                    className="w-full px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-700 outline-none cursor-pointer"
                    disabled={loading}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((cat) => (
                      <option key={cat.id_categoria} value={cat.id_categoria}>
                        {cat.descricao}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium text-slate-200">Descrição</label>
                <textarea
                  rows={4}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-900 outline-none resize-none"
                  disabled={loading}
                />
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full max-w-xs py-3.5 rounded-full text-white font-medium text-lg bg-linear-to-r from-[#091f52] to-[#124183] shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Atualizando...' : 'Atualizar'}
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
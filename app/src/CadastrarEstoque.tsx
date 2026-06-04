import { useState, useEffect } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface Produto {
  id_produto: number;
  nome: string;
}

interface CadastrarEstoqueProps {
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

const API_BASE_URL = 'http://127.0.0.1:3000';

export default function CadastrarEstoque({ onLogout, onNavigate }: CadastrarEstoqueProps) {
  const [activeScreen, setActiveScreen] = useState<string>('cadastrarestoque');
  
  const [idProduto, setIdProduto] = useState<number | ''>('');
  const [numNf, setNumNf] = useState('');
  const [lote, setLote] = useState('');
  const [qtde, setQtde] = useState('');
  const [dataFabricacao, setDataFabricacao] = useState('');
  
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProdutos, setLoadingProdutos] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      setLoadingProdutos(true);
      setError('');
      const token = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/produtos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar produtos');
      }

      const data: Produto[] = await response.json();
      setProdutos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar com a API');
      console.error(err);
    } finally {
      setLoadingProdutos(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validações
    if (!idProduto || !numNf.trim() || !lote.trim() || !qtde.trim() || !dataFabricacao) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    const qtdeNum = parseInt(qtde);
    if (isNaN(qtdeNum) || qtdeNum <= 0) {
      setError('Quantidade deve ser um número válido maior que 0');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/estoque`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_produto: idProduto,
          num_nf: numNf,
          lote,
          qtde: qtdeNum,
          data_fabricacao: dataFabricacao,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao registrar estoque');
      }

      setSuccess('Estoque registrado com sucesso! Redirecionando...');
      
      // Limpar formulário
      setIdProduto('');
      setNumNf('');
      setLote('');
      setQtde('');
      setDataFabricacao('');

      // Redirecionar após 2 segundos
      setTimeout(() => {
        onNavigate('listarestoque');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar com a API');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleActiveWindow = (screen: string): boolean => {
    return activeScreen === screen;
  };

  const handleNavigation = (screen: string) => {
    setActiveScreen(screen);
    onNavigate(screen);
  };

  return (
    <div className="flex bg-[#020617] min-h-screen text-white overflow-x-hidden">
      <Sidebar onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col">

        <Header onLogout={onLogout} />
        <Navbar 
          pageName="Estoque" 
          onNavigate={handleNavigation} 
          activeWindow={handleActiveWindow}
        />
        <main className="flex-1 p-8 md:p-12 max-w-4xl w-full mx-auto space-y-8">
          <h1 className="text-3xl font-semibold tracking-wide text-[#aee2ff]">Cadastrar Lote de Produto</h1>

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

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium text-slate-200">Produto</label>
                <select
                  value={idProduto}
                  onChange={(e) => setIdProduto(e.target.value ? parseInt(e.target.value) : '')}
                  className="w-full px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-700 outline-none cursor-pointer"
                  disabled={loading || loadingProdutos}
                >
                  <option value="">Selecione um produto</option>
                  {produtos.map((prod) => (
                    <option key={prod.id_produto} value={prod.id_produto}>
                      {prod.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium text-slate-200">Número NF</label>
                <input
                  type="text"
                  value={numNf}
                  onChange={(e) => setNumNf(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-900 outline-none"
                  disabled={loading}
                  placeholder="Ex: NF-001234"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium text-slate-200">Lote</label>
                <input
                  type="text"
                  value={lote}
                  onChange={(e) => setLote(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-900 outline-none"
                  disabled={loading}
                  placeholder="Ex: LOTE-2024-001"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium text-slate-200">Quantidade</label>
                <input
                  type="number"
                  value={qtde}
                  onChange={(e) => setQtde(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-900 outline-none"
                  disabled={loading}
                  placeholder="Ex: 100"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-slate-200">Data de Fabricação</label>
              <input
                type="date"
                value={dataFabricacao}
                onChange={(e) => setDataFabricacao(e.target.value)}
                className="w-full  cursor-pointer px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-900 outline-none"
                disabled={loading}
              />
            </div>

            <div className="flex justify-center pt-8">
              <button
                type="submit"
                disabled={loading || loadingProdutos}
                className="w-full max-w-xs py-3.5 rounded-full text-white font-medium text-lg bg-linear-to-r from-[#091f52] to-[#124183] shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Registrando...' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
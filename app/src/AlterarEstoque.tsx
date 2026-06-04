import { useState, useEffect } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface Produto {
  id_produto: number;
  nome: string;
}

interface Estoque {
  id_estoque: number;
  id_produto: number;
  num_nf: string;
  lote: string;
  qtde: number;
  data_fabricacao: string;
}

interface AlterarEstoqueProps {
  onLogout: () => void;
  onNavigate: (screen: string) => void;
  estoqueId: number | null;
}

const API_BASE_URL = 'http://127.0.0.1:3000';

export default function AlterarEstoque({ onLogout, onNavigate, estoqueId }: AlterarEstoqueProps) {
  const [activeScreen, setActiveScreen] = useState<string>('alterarestoque');
  const [userClickedEdit] = useState<boolean>(true);
  const [internalEstoqueId, setInternalEstoqueId] = useState<number | null>(estoqueId || null);
  
  const idPaUsar = internalEstoqueId || estoqueId;

  useEffect(() => {
    // Verifica se há um ID no localStorage (vindo do Dashboard)
    const storedId = localStorage.getItem('selectedEstoqueId');
    if (storedId && !estoqueId) {
      setInternalEstoqueId(parseInt(storedId, 10));
    }
  }, [estoqueId]);
  
  const [idProduto, setIdProduto] = useState<number | ''>('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [numNf, setNumNf] = useState('');
  const [lote, setLote] = useState('');
  const [qtde, setQtde] = useState('');
  const [dataFabricacao, setDataFabricacao] = useState('');
  
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (idPaUsar) {
      fetchEstoqueEProdutos();
    }
  }, [idPaUsar]);

  const fetchEstoqueEProdutos = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('access_token');

      // Fetch do estoque específico
      const estoqueResponse = await fetch(`${API_BASE_URL}/estoque/${idPaUsar}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!estoqueResponse.ok) {
        throw new Error('Erro ao carregar dados do estoque');
      }

      const estoqueData: Estoque = await estoqueResponse.json();
      setIdProduto(estoqueData.id_produto);
      setNumNf(estoqueData.num_nf);
      setLote(estoqueData.lote);
      setQtde(estoqueData.qtde.toString());
      setDataFabricacao(estoqueData.data_fabricacao);

      // Fetch de todos os produtos
      const produtosResponse = await fetch(`${API_BASE_URL}/produtos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!produtosResponse.ok) {
        throw new Error('Erro ao carregar produtos');
      }

      const produtosData: Produto[] = await produtosResponse.json();
      setProdutos(produtosData);

      // Buscar nome do produto atual
      const produtoAtual = produtosData.find(p => p.id_produto === estoqueData.id_produto);
      if (produtoAtual) {
        setNomeProduto(produtoAtual.nome);
      }
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

    // Validações
    if (!numNf.trim() || !lote.trim() || !qtde.trim() || !dataFabricacao) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    const qtdeNum = parseInt(qtde);
    if (isNaN(qtdeNum) || qtdeNum <= 0) {
      setError('Quantidade deve ser um número válido maior que 0');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/estoque/${idPaUsar}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          num_nf: numNf,
          lote,
          qtde: qtdeNum,
          data_fabricacao: dataFabricacao,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar estoque');
      }

      setSuccess('Estoque atualizado com sucesso!');
      setTimeout(() => {
        onNavigate('listarestoque');
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

  if (!idPaUsar) {
    return (
      <div className="flex bg-[#020617] min-h-screen text-white overflow-x-hidden">
        <Sidebar onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          <Header onLogout={onLogout} />
          <main className="flex-1 p-8 md:p-12 flex items-center justify-center">
            <p className="text-red-400">Erro: Nenhum estoque selecionado</p>
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
          pageName="Estoque" 
          onNavigate={handleNavigation} 
          activeWindow={handleActiveWindow}
          showEditButton={userClickedEdit}
        />
        <main className="flex-1 p-8 md:p-12 max-w-4xl w-full mx-auto space-y-8">
          <h1 className="text-3xl font-semibold tracking-wide text-[#aee2ff]">Alterar Estoque</h1>

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
              Carregando dados do estoque...
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-medium text-slate-200">Produto</label>
                  <input
                    type="text"
                    value={nomeProduto}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-600 text-slate-200 outline-none cursor-not-allowed"
                    disabled
                  />
                  <p className="text-sm text-slate-400">Não é possível alterar o produto</p>
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
                  className="w-full px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-900 outline-none"
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
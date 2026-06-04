import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Navbar from './Navbar';
import { PenBoxIcon, Trash2Icon } from 'lucide-react';

interface Estoque {
  id_estoque: number;
  num_nf: string;
  lote: string;
  nome: string;
  qtde: number;
  data_fabricacao: string;
  data_vencimento: string;
  prazo_restante: string;
}

interface ListarEstoqueProps {
  onLogout: () => void;
  onNavigate: (screen: string) => void;
  onEditEstoque?: (id: number) => void;
}

const API_BASE_URL = 'http://127.0.0.1:3000';

export default function ListarEstoque({ onLogout, onNavigate, onEditEstoque }: ListarEstoqueProps) {
  const [activeScreen, setActiveScreen] = useState<string>('listarestoque');
  const [userClickedEdit, setUserClickedEdit] = useState<boolean>(false);
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [nomeEstoqueDelete, setNomeEstoqueDelete] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingLoading, setDeletingLoading] = useState(false);

  useEffect(() => {
    fetchEstoques();
  }, []);

  const fetchEstoques = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/estoque/listagem/completa`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar estoques');
      }

      const data: Estoque[] = await response.json();
      setEstoques(data);
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

  const refreshList = async () => {
    await fetchEstoques();
  };

  const abrirModalDelete = (id: number, nome: string) => {
    setDeletingId(id);
    setNomeEstoqueDelete(nome);
    setShowDeleteModal(true);
  };

  const cancelarDelete = () => {
    setShowDeleteModal(false);
    setDeletingId(null);
    setNomeEstoqueDelete('');
  };

  const deletarEstoque = async () => {
    if (!deletingId) return;

    try {
      setDeletingLoading(true);
      const token = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/estoque/${deletingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar estoque');
      }

      setShowDeleteModal(false);
      setDeletingId(null);
      setNomeEstoqueDelete('');
      
      // Atualizar lista após delete
      await refreshList();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar com a API');
      console.error(err);
    } finally {
      setDeletingLoading(false);
    }
  };

  return (
    <div className="flex bg-[#020617] min-h-screen text-white overflow-x-hidden">
      {/* Barra Lateral */}
      <Sidebar onNavigate={onNavigate} />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        
        <Header onLogout={onLogout} />

        <Navbar 
          pageName="Estoque" 
          onNavigate={handleNavigation} 
          activeWindow={handleActiveWindow}
          showEditButton={userClickedEdit}
          onRefresh={refreshList}
        />
        <main className="flex-1 px-8 py-4 md:p-12 max-w-7xl w-full mx-auto space-y-8">
          <h1 className="text-3xl font-semibold tracking-wide text-[#aee2ff]">
            Listar Estoque
          </h1>

          {error && (
            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8 text-slate-400">
              Carregando estoques...
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/5 shadow-2xl">
              <table className="w-full text-left border-collapse">
                {/* Cabeçalho */}
                <thead>
                  <tr className="bg-linear-to-r from-[#091f52] to-[#124183] text-slate-200 font-medium text-sm border-b-white">
                    <th style={{ width: '5%' }} className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">NF</th>
                    <th className="px-6 py-4">Lote</th>
                    <th className="px-6 py-4">Produto</th>
                    <th className="px-6 py-4 text-center">Qtde</th>
                    <th className="px-6 py-4">Data Fab.</th>
                    <th className="px-6 py-4">Data Venc.</th>
                    <th className="px-6 py-4">Prazo Restante</th>
                    <th className="px-6 py-4 text-center">Ações</th>
                  </tr>
                </thead>
                
                {/* Corpo da Tabela */}
                <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                  {estoques.map((estoque) => (
                    <tr key={estoque.id_estoque} className="hover:bg-white/3 transition-colors">
                      <td className="px-6 py-4 font-mono text-[#2af5ff]">{estoque.id_estoque}</td>
                      <td className="px-6 py-4">{estoque.num_nf}</td>
                      <td className="px-6 py-4">{estoque.lote}</td>
                      <td className="px-6 py-4 font-medium text-white">{estoque.nome}</td>
                      <td className="px-6 py-4 text-center">{estoque.qtde}</td>
                      <td className="px-6 py-4">{estoque.data_fabricacao}</td>
                      <td className="px-6 py-4">{estoque.data_vencimento}</td>
                      <td className="px-6 py-4 text-yellow-300">{estoque.prazo_restante}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-5">
                          <button 
                            className="hover:text-[#03c0ca] transition-colors cursor-pointer"
                            onClick={() => {
                              onEditEstoque?.(estoque.id_estoque);
                              setUserClickedEdit(true);
                            }}
                          >
                            <PenBoxIcon size={20} />
                          </button>
                          <button 
                            className="hover:text-red-400 transition-colors cursor-pointer"
                            onClick={() => {
                              abrirModalDelete(estoque.id_estoque, `Lote ${estoque.lote}`);
                            }}
                          >
                            <Trash2Icon size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal de Confirmação de Delete */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#0f1419] rounded-lg p-8 max-w-sm mx-4 border border-white/10 shadow-2xl">
                <h2 className="text-xl font-semibold text-white mb-4">Confirmar Exclusão</h2>
                <p className="text-slate-300 mb-6">
                  Tem certeza que deseja excluir <span className="font-semibold text-[#aee2ff]">{nomeEstoqueDelete}</span>?
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={cancelarDelete}
                    disabled={deletingLoading}
                    className="flex-1 px-4 py-2 cursor-pointer rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={deletarEstoque}
                    disabled={deletingLoading}
                    className="flex-1 px-4 py-2 cursor-pointer rounded-lg bg-red-600 hover:bg-red-900 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingLoading ? 'Deletando...' : 'Confirmar'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
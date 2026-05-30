import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Navbar from './Navbar';
import { PenBoxIcon, Trash2Icon } from 'lucide-react';

interface Produto {
  id_produto: number;
  nome: string;
  preco: number;
  descricao: string;
  categoria: string;
  is_ativo: boolean;
}

interface ListarProdutosProps {
  onLogout: () => void;
  onNavigate: (screen: string) => void;
  onEditProduto?: (id: number) => void;
}

const API_BASE_URL = 'http://127.0.0.1:3000';

export default function ListarProdutos({ onLogout, onNavigate, onEditProduto }: ListarProdutosProps) {
  const [activeScreen, setActiveScreen] = useState<string>('listarprodutos');
  const [userClickedEdit, setUserClickedEdit] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [nomeProdutoDelete, setNomeProdutoDelete] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingLoading, setDeletingLoading] = useState(false);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/produtos/listagem/completa`, {
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
    await fetchProdutos();
  };

  const abrirModalDelete = (id: number, nome: string) => {
    setDeletingId(id);
    setNomeProdutoDelete(nome);
    setShowDeleteModal(true);
  };

  const cancelarDelete = () => {
    setShowDeleteModal(false);
    setDeletingId(null);
    setNomeProdutoDelete('');
  };

  const deletarProduto = async () => {
    if (!deletingId) return;

    try {
      setDeletingLoading(true);
      const token = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/produtos/${deletingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar produto');
      }

      setShowDeleteModal(false);
      setDeletingId(null);
      setNomeProdutoDelete('');
      
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
          pageName="Produtos" 
          onNavigate={handleNavigation} 
          activeWindow={handleActiveWindow}
          showEditButton={userClickedEdit}
          onRefresh={refreshList}
        />
        <main className="flex-1 px-8 py-4 md:p-12 max-w-7xl w-full mx-auto space-y-8">
          <h1 className="text-3xl font-semibold tracking-wide text-[#aee2ff]">
            Listar Produtos
          </h1>

          {error && (
            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8 text-slate-400">
              Carregando produtos...
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/5 shadow-2xl">
              <table className="w-full text-left border-collapse">
                {/* Cabeçalho */}
                <thead>
                  <tr className="bg-linear-to-r from-[#091f52] to-[#124183] text-slate-200 font-medium text-sm border-b-white">
                    <th style={{ width: '7%' }} className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Nome</th>
                    <th className="px-6 py-4">Preço</th>
                    <th className="px-6 py-4">Descrição</th>
                    <th className="px-6 py-4">Categoria</th>
                    <th className="px-6 py-4 text-center">Ações</th>
                  </tr>
                </thead>
                
                {/* Corpo da Tabela */}
                <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                  {produtos.map((prod) => (
                    <tr key={prod.id_produto} className="hover:bg-white/3 transition-colors">
                      <td className="px-6 py-4 font-mono text-[#2af5ff]">{prod.id_produto}</td>
                      <td className="px-6 py-4 font-medium text-white">{prod.nome}</td>
                      <td className="px-6 py-4">R$ {prod.preco}</td>
                      <td className="px-6 py-4">{prod.descricao}</td>
                      <td className="px-6 py-4">{prod.categoria}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-5">
                          <button 
                            className="hover:text-[#03c0ca] transition-colors cursor-pointer"
                            onClick={() => {
                              onEditProduto?.(prod.id_produto);
                              setUserClickedEdit(true);
                            }}
                          >
                            <PenBoxIcon size={20} />
                          </button>
                          <button 
                            className="hover:text-red-400 transition-colors cursor-pointer"
                            onClick={() => {
                              abrirModalDelete(prod.id_produto, prod.nome);
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
                  Tem certeza que deseja excluir o produto <span className="font-semibold text-[#aee2ff]">{nomeProdutoDelete}</span>?
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
                    onClick={deletarProduto}
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
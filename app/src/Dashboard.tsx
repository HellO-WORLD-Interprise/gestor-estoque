import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { EyeIcon } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

interface ItemEstoqueBaixo {
  id_estoque: number;
  id_produto: number;
  nome: string;
  qtde_item: number;
}

interface ItemProximoVencimento {
  id_estoque: number;
  nome: string;
  status_vencimento: string;
}

const API_BASE_URL = 'http://127.0.0.1:3000';

export default function Dashboard({ onLogout, onNavigate }: DashboardProps) {
  const [diversidadeProdutos, setDiversidadeProdutos] = useState(0);
  const [inventarioTotal, setInventarioTotal] = useState(0);
  const [countEstoqueBaixo, setCountEstoqueBaixo] = useState(0);
  const [countProximoVencimento, setCountProximoVencimento] = useState(0);
  const [itensEstoqueBaixo, setItensEstoqueBaixo] = useState<ItemEstoqueBaixo[]>([]);
  const [itensProximoVencimento, setItensProximoVencimento] = useState<ItemProximoVencimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cards = [
    { title: 'Diversidade de Itens', value: diversidadeProdutos },
    { title: 'Inventário Total', value: inventarioTotal },
    { title: 'Itens com Estoque Baixo', value: countEstoqueBaixo },
    { title: 'Itens Próximos do Vencimento', value: countProximoVencimento },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('access_token');

      if (!token) {
        throw new Error('Token não encontrado');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      // Buscar diversidade de produtos
      const diversidadeRes = await fetch(`${API_BASE_URL}/dashboard/diversidade-produtos`, {
        method: 'GET',
        headers,
      });
      if (diversidadeRes.ok) {
        const diversidadeData = await diversidadeRes.json();
        setDiversidadeProdutos(diversidadeData[0]?.diversidade_itens || 0);
      }

      // Buscar inventário total
      const inventarioRes = await fetch(`${API_BASE_URL}/dashboard/inventario-total`, {
        method: 'GET',
        headers,
      });
      if (inventarioRes.ok) {
        const inventarioData = await inventarioRes.json();
        setInventarioTotal(inventarioData[0]?.inventario || 0);
      }

      // Buscar count itens estoque baixo
      const countBaixoRes = await fetch(`${API_BASE_URL}/dashboard/itens-estoque-baixo/count`, {
        method: 'GET',
        headers,
      });
      if (countBaixoRes.ok) {
        const countBaixoData = await countBaixoRes.json();
        setCountEstoqueBaixo(countBaixoData.count || 0);
      }

      // Buscar count itens próximos vencimento
      const countVencimentoRes = await fetch(`${API_BASE_URL}/dashboard/itens-proximos-vencimento/count`, {
        method: 'GET',
        headers,
      });
      if (countVencimentoRes.ok) {
        const countVencimentoData = await countVencimentoRes.json();
        setCountProximoVencimento(countVencimentoData.count || 0);
      }

      // Buscar itens estoque baixo
      const itensRes = await fetch(`${API_BASE_URL}/dashboard/itens-estoque-baixo`, {
        method: 'GET',
        headers,
      });
      if (itensRes.ok) {
        const itensData: ItemEstoqueBaixo[] = await itensRes.json();
        setItensEstoqueBaixo(itensData);
      }

      // Buscar itens próximos vencimento
      const vencimentoRes = await fetch(`${API_BASE_URL}/dashboard/itens-proximos-vencimento`, {
        method: 'GET',
        headers,
      });
      if (vencimentoRes.ok) {
        const vencimentoData: ItemProximoVencimento[] = await vencimentoRes.json();
        setItensProximoVencimento(vencimentoData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar com a API');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditEstoque = (id: number) => {
    onNavigate('alterarestoque');
    // Você pode armazenar o id em localStorage ou passar via estado global
    localStorage.setItem('selectedEstoqueId', id.toString());
  };

  return (
    <div className="flex bg-[#020617] min-h-screen text-white overflow-x-hidden">
      <Sidebar onNavigate={onNavigate} /> {/* 👈 Passa a navegação para a Sidebar */}
      <div className="flex-1 flex flex-col">
        
        <Header onLogout={onLogout} />

        <main className="flex-1 p-8 md:p-12 space-y-12 max-w-7xl w-full mx-auto">
          <h1 className="text-3xl font-semibold tracking-wide text-slate-100">Visão Geral</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {cards.map((card, index) => (
              <div key={index} className="bg-linear-to-b from-[#0a2558] to-[#0d3880] p-6 rounded-lg shadow-lg border border-white/5 text-center flex flex-col justify-between h-40">
                <h3 className="text-sm text-slate-300 font-medium tracking-wide">{card.title}</h3>
                <span className="text-5xl font-bold text-white mb-2">{card.value}</span>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">

            <table className="w-full border-collapse border border-white/5 rounded-lg overflow-hidden text-left shadow-2xl tracking-wider">
              <thead>
                <tr className="bg-linear-to-r from-[#06183a] to-[#0e3b87] text-slate-200 font-medium text-sm border-b-white">
                  <th colSpan={4} className="text-center px-6 py-4">
                    Itens com Estoque Baixo
                  </th>
                </tr>
                <tr className="bg-linear-to-r from-[#06183a] to-[#0e3b87] text-slate-200 font-medium text-sm">
                  <th style={{ width: '15%' }} className="py-3 px-6 border border-white/5">ID</th>
                  <th style={{ width: '55%' }} className="py-3 px-6 border border-white/5">Nome</th>
                  <th style={{ width: '20%' }} className="py-3 px-6 border border-white/5">Qtde</th>
                  <th style={{ width: '10%' }} className="py-3 px-6 border border-white/5">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-4 px-6 text-center text-slate-400">Carregando...</td>
                  </tr>
                ) : itensEstoqueBaixo.length > 0 ? (
                  itensEstoqueBaixo.map((item) => (
                    <tr key={item.id_estoque} className="hover:bg-white/3 transition-colors">
                      <td className="py-3 px-6 font-mono text-[#2af5ff]">{item.id_estoque}</td>
                      <td className="text-sm tracking-wider py-3 px-6 font-medium text-white">{item.nome}</td>
                      <td className="text-sm tracking-wider py-3 px-6 font-medium text-white">{item.qtde_item}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-5">
                          <button 
                            className="hover:text-[#03c0ca] transition-colors cursor-pointer"
                            onClick={() => handleEditEstoque(item.id_estoque)}
                          >
                            <EyeIcon size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 px-6 text-center text-slate-400">Nenhum item com estoque baixo</td>
                  </tr>
                )}
              </tbody>

            </table>

            <table className="w-full border-collapse border border-white/5 rounded-lg overflow-hidden text-left shadow-2xl tracking-wider">
              <thead>
                <tr className="bg-linear-to-r from-[#06183a] to-[#0e3b87] text-slate-200 font-medium text-sm border-b-white">
                  <th colSpan={4} className="text-center px-6 py-4">
                    Itens Próximos do Vencimento
                  </th>
                </tr>
                <tr className="bg-linear-to-r from-[#06183a] to-[#0e3b87] text-slate-200 font-medium text-sm">
                  <th style={{ width: '15%' }} className="py-3 px-6 border border-white/5">ID</th>
                  <th style={{ width: '50%' }} className="py-3 px-6 border border-white/5">Nome</th>
                  <th style={{ width: '25%' }} className="py-3 px-6 border border-white/5">Status</th>
                  <th style={{ width: '10%' }} className="py-3 px-6 border border-white/5">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-4 px-6 text-center text-slate-400">Carregando...</td>
                  </tr>
                ) : itensProximoVencimento.length > 0 ? (
                  itensProximoVencimento.map((item) => (
                    <tr key={item.id_estoque} className="hover:bg-white/3 transition-colors">
                      <td className="py-3 px-6 font-mono text-[#2af5ff]">{item.id_estoque}</td>
                      <td className="text-sm tracking-wider py-3 px-6 font-medium text-white">{item.nome}</td>
                      <td className="text-sm tracking-wider py-3 px-6 font-medium text-white">{item.status_vencimento}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-5">
                          <button 
                            className="hover:text-[#03c0ca] transition-colors cursor-pointer"
                            onClick={() => handleEditEstoque(item.id_estoque)}
                          >
                            <EyeIcon size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 px-6 text-center text-slate-400">Nenhum item próximo do vencimento</td>
                  </tr>
                )}
              </tbody>

            </table>
            
          </div>
        </main>
      </div>
    </div>
  );
}
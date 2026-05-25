import Sidebar from './Sidebar';
import { LogOut, Edit2, Trash2 } from 'lucide-react';

interface EstoqueProps {
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

export default function Estoque({ onLogout, onNavigate }: EstoqueProps) {
  // Dados mockados para exemplo visual da tabela
  //  DEIXE ASSIM:
const produtos: any[] = [];

  return (
    <div className="flex bg-[#020617] min-h-screen text-white overflow-x-hidden">
      {/* Barra Lateral */}
      <Sidebar onNavigate={onNavigate} />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        {/* Barra Superior */}
        <header className="h-16 bg-gradient-to-r from-[#071d45] to-[#124285] px-8 flex items-center justify-between border-b border-white/5">
          <div className="w-1/3"></div>
          <h2 className="text-lg font-medium text-slate-200">Olá, usuário</h2>
          <div className="flex items-center gap-6">
            <span className="text-sm text-slate-300">Segunda-Feira - 01/01/2025</span>
            <button onClick={onLogout} className="text-slate-300 hover:text-red-400 transition-colors">
              <LogOut size={22} />
            </button>
          </div>
        </header>

        {/* Tabela de Produtos */}
        <main className="flex-1 p-8 md:p-12 max-w-7xl w-full mx-auto space-y-8">
          <h1 className="text-3xl font-semibold tracking-wide text-[#aee2ff]">
            Listar Produtos
          </h1>

          <div className="overflow-x-auto rounded-xl border border-white/5 shadow-2xl">
            <table className="w-full text-left border-collapse">
              {/* Cabeçalho igual ao da foto */}
              <thead>
                <tr className="bg-gradient-to-r from-[#091f52] to-[#124183] text-slate-200 font-medium text-sm border-b border-white/10">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Nome</th>
                  <th className="px-6 py-4">Lote</th>
                  <th className="px-6 py-4">Em Estoque</th>
                  <th className="px-6 py-4">Categoria</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              
              {/* Corpo da Tabela */}
              <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                {produtos.map((prod) => (
                  <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-[#2af5ff]">{prod.id}</td>
                    <td className="px-6 py-4 font-medium text-white">{prod.nome}</td>
                    <td className="px-6 py-4">{prod.lote}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        prod.estoque === 0 ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
                      }`}>
                        {prod.estoque} un
                      </span>
                    </td>
                    <td className="px-6 py-4">{prod.categoria}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <button className="text-slate-400 hover:text-[#2af5ff] transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button className="text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
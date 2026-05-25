import Sidebar from './Sidebar';
import { LogOut } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  onNavigate: (screen: string) => void; // 👈 Adicionado aqui
}

export default function Dashboard({ onLogout, onNavigate }: DashboardProps) {
  const cards = [
    { title: 'Diversidade de Itens', value: 0 },
    { title: 'Inventário Total', value: 0 },
    { title: 'Vendas no Mês', value: 0 },
    { title: 'NFs Emitidas', value: 0 },
  ];

  return (
    <div className="flex bg-[#020617] min-h-screen text-white overflow-x-hidden">
      <Sidebar onNavigate={onNavigate} /> {/* 👈 Passa a navegação para a Sidebar */}
      <div className="flex-1 flex flex-col">
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

        <main className="flex-1 p-8 md:p-12 space-y-12 max-w-7xl w-full mx-auto">
          <h1 className="text-3xl font-semibold tracking-wide text-slate-100">Visão Geral</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <div key={index} className="bg-gradient-to-b from-[#0a2558] to-[#0d3880] p-6 rounded-lg shadow-lg border border-white/5 text-center flex flex-col justify-between h-40">
                <h3 className="text-sm text-slate-300 font-medium tracking-wide">{card.title}</h3>
                <span className="text-5xl font-bold text-white mb-2">{card.value}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-[#06183a] to-[#0e3b87] h-14 rounded-md flex items-center justify-center border border-white/5 shadow-md text-sm font-medium tracking-wider text-slate-300">
              Itens acabando
            </div>
            <div className="bg-gradient-to-r from-[#06183a] to-[#0e3b87] h-14 rounded-md flex items-center justify-center border border-white/5 shadow-md text-sm font-medium tracking-wider text-slate-300">
              Itens mais vendidos
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
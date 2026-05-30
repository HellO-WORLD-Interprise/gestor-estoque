import Sidebar from './Sidebar';
import Header from './Header';
import { PenBoxIcon, Trash2Icon } from 'lucide-react';

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

            <table className="w-full border-collapse border border-white/5 rounded-lg overflow-hidden shadow-md">

              <thead>
                <tr className="bg-linear-to-r from-[#06183a] to-[#0e3b87]">
                  <th colSpan={3} className="text-sm font-medium tracking-wider text-slate-300 border border-white/5 p-3">
                    Itens acabando
                  </th>
                </tr>

                <tr className="bg-linear-to-r from-[#06183a] to-[#0e3b87]">
                  <th style={{ width: '15%' }} className="text-sm font-medium tracking-wider text-slate-300 border border-white/5 p-3 text-left">Id</th>
                  <th style={{ width: '65%' }} className="text-sm font-medium tracking-wider text-slate-300 border border-white/5 p-3 text-left">Nome</th>
                  <th style={{ width: '20%' }} className="text-sm font-medium tracking-wider text-slate-300 border border-white/5 p-3">Ações</th>
                </tr>
              </thead>

              <tbody>
                <tr className="bg-slate-300 text-blue-950">
                  <td className="text-sm tracking-wider p-3 border border-black/5">1</td>
                  <td className="text-sm tracking-wider p-3 border border-black/5">Produto 1</td>
                  <td className="text-sm tracking-wider p-3 border border-black/5">
                    <div className="flex justify-center space-x-5">
                      <a href="#"><PenBoxIcon size={20}/></a>
                      <a href="#"><Trash2Icon size={20}/></a>
                    </div>
                  </td>
                </tr>
              </tbody>

            </table>

            <table className="w-full border-collapse border border-white/5 rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-linear-to-r from-[#06183a] to-[#0e3b87]">
                  <th colSpan={3} className="text-sm font-medium tracking-wider text-slate-300 border border-white/5 p-3">
                    Itens mais vendidos
                  </th>
                </tr>
                <tr className="bg-linear-to-r from-[#06183a] to-[#0e3b87]">
                  <th style={{ width: '15%' }} className="text-sm font-medium tracking-wider text-slate-300 border border-white/5 p-3 text-left">Id</th>
                  <th style={{ width: '60%' }} className="text-sm font-medium tracking-wider text-slate-300 border border-white/5 p-3 text-left">Nome</th>
                  <th style={{ width: '25%' }} className="text-sm font-medium tracking-wider text-slate-300 border border-white/5 p-3 text-left">Ações</th>
                </tr>
              </thead>

              <tbody>
                <tr className="bg-slate-300 text-blue-950">
                  <td className="text-sm tracking-wider p-3 border border-black/5">1</td>
                  <td className="text-sm tracking-wider p-3 border border-black/5">Produto 1</td>
                  <td className="text-sm tracking-wider p-3 border border-black/5">a</td>
                </tr>
              </tbody>

            </table>
            
          </div>
        </main>
      </div>
    </div>
  );
}
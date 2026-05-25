import Sidebar from './Sidebar';
import { LogOut } from 'lucide-react';

interface CadastrarProdutoProps {
  onLogout: () => void;
  onNavigate: (screen: string) => void; // 👈 Adicionado aqui
}

export default function CadastrarProduto({ onLogout, onNavigate }: CadastrarProdutoProps) {
  return (
    <div className="flex bg-[#020617] min-h-screen text-white overflow-x-hidden">
      <Sidebar onNavigate={onNavigate} /> {/* 👈 Passa a navegação para a Sidebar */}
      <div className="flex-1 flex flex-col">
        {/* ... Restante do código do seu CadastrarProduto igualzinho ... */}
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

        <main className="flex-1 p-8 md:p-12 max-w-4xl w-full mx-auto space-y-8">
          <h1 className="text-3xl font-semibold tracking-wide text-[#aee2ff]">Cadastrar Produto</h1>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-lg font-medium text-slate-200">Nome</label>
                <input type="text" className="w-full px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-900 outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium text-slate-200">Preço</label>
                <input type="text" className="w-full px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-900 outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-lg font-medium text-slate-200">Categoria</label>
                <select className="w-full px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-700 outline-none" defaultValue="">
                  <option value="" disabled>Selecione</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-slate-200">Descrição</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-2xl bg-[#eef7fc] text-slate-900 outline-none resize-none" />
            </div>
            <div className="flex justify-center pt-4">
              <button type="submit" className="w-full max-w-xs py-3.5 rounded-full text-white font-medium text-lg bg-gradient-to-r from-[#091f52] to-[#124183] shadow-lg">
                Cadastrar
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
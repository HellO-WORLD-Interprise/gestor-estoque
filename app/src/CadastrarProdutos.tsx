import { useState } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface CadastrarProdutosProps {
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

export default function CadastrarProdutos({ onLogout, onNavigate }: CadastrarProdutosProps) {
  const [activeScreen, setActiveScreen] = useState<string>('cadastrarprodutos');
  // const [userClickedEdit, setUserClickedEdit] = useState<boolean>(false);

  const handleActiveWindow = (screen: string): boolean => {
    return activeScreen === screen;
  };

  const handleNavigation = (screen: string) => {
    setActiveScreen(screen);
    onNavigate(screen);
  };

  return (
    <div className="flex bg-[#020617] min-h-screen text-white overflow-x-hidden">
      <Sidebar onNavigate={onNavigate} /> {/* 👈 Passa a navegação para a Sidebar */}
      <div className="flex-1 flex flex-col">

        <Header onLogout={onLogout} />
        <Navbar 
          pageName="Produtos" 
          onNavigate={handleNavigation} 
          activeWindow={handleActiveWindow}
          // showEditButton={userClickedEdit}
        />
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
              <button type="submit" className="w-full max-w-xs py-3.5 rounded-full text-white font-medium text-lg bg-linear-to-r from-[#091f52] to-[#124183] shadow-lg">
                Cadastrar
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Home, BarChart3, DollarSign, Package, ClipboardList, Settings, ChevronLeft, ChevronsRight } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: 'Home', icon: Home },
    { name: 'Dashboard', icon: BarChart3 },
    { name: 'Finanças', icon: DollarSign },
    { name: 'Produtos', icon: Package },
    { name: 'Estoque', icon: ClipboardList },
    { name: 'Configurações', icon: Settings },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#1473cd] to-[#11a2bc] text-white flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4 flex items-center bg-[#07214a]/20 h-16 border-b border-white/10">
        <button onClick={() => setIsOpen(!isOpen)} className="text-[#2af5ff] hover:text-white transition-colors">
          {isOpen ? <ChevronLeft size={28} /> : <ChevronsRight size={28} />}
        </button>
      </div>
      <nav className="flex-1 py-6 space-y-2 px-3">
        {menuItems.map((item, index) => (
          <button key={index} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-all group">
            <div className="p-2 bg-[#051a3a]/40 rounded-full group-hover:bg-[#07214a] transition-all text-[#2af5ff]">
              <item.icon size={20} />
            </div>
            {isOpen && <span className="text-base font-medium tracking-wide">{item.name}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
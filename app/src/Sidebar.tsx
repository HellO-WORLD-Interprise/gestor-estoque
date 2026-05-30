import { useState } from 'react';
import { Home, Package, ClipboardList, Settings, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface SidebarProps {
  onNavigate: (screen: string) => void; // 👈 Nova propriedade para navegar
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: 'Home', icon: Home, id: 'home' },
    { name: 'Produtos', icon: Package, id: 'listarprodutos' },
    { name: 'Estoque', icon: ClipboardList, id: 'listarestoque' },
    { name: 'Configurações', icon: Settings, id: 'configuracoes' },
  ];

  return (
    <div className={`min-h-screen bg-linear-to-b from-[#1473cd] to-[#11a2bc] text-white flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="relative flex items-center bg-[#071d45] h-16 border-b border-white/10">
        <button onClick={() => setIsOpen(!isOpen)} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#2af5ff] hover:text-white transition-colors cursor-pointer">
          {isOpen ? <ChevronsLeft size={35} /> : <ChevronsRight size={35} />}
        </button>
      </div>

      <nav className={`flex flex-col flex-1 space-y-9 py-6 ${ isOpen ? 'px-3' : 'items-center' }`}>
        {menuItems.map((item, index) => (
          <button 
            key={index} 
            onClick={() => onNavigate(item.id)}
            className="space-x-4 flex items-center p-2 rounded-xl hover:bg-white/10 transition-all group cursor-pointer"
          >
            <div className="p-2 bg-[#051a3a] rounded-full group-hover:bg-[#07214a]/70 transition-all text-[#2af5ff]">
              <item.icon size={26} />
            </div>

            {isOpen && <span className="text-base font-medium tracking-wide">{item.name}</span>}

          </button>
        ))}
      </nav>
    </div>
  );
}
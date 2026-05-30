import { LogOut } from 'lucide-react';
const hoje = new Date();

interface HeaderProps {
    onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps ) {
    return (
        <header className="h-16 bg-linear-to-r from-[#071d45] to-[#124285] px-20 flex items-center justify-between border-b border-white/5">
            <h2 className="text-lg font-medium text-slate-200">Olá, {localStorage.getItem('user_name')}</h2>
            <span className="text-md text-slate-300 capitalize">
                { hoje.toLocaleDateString('pt-br', { weekday: 'long'}) }
                &nbsp; - &nbsp; 
                {hoje.toLocaleDateString('pt-br')}
            </span>
            <button onClick={onLogout} className="text-slate-300 hover:text-red-400 transition-colors cursor-pointer">
                <LogOut size={22} />
            </button>
        </header>
    )
}
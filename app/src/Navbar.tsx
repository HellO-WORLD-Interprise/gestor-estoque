interface NavbarProps {
    pageName: string;
    onNavigate: (screen: string) => void;
    activeWindow: (screen: string) => boolean;
    showEditButton?: boolean;
}

export default function navbar({ pageName, onNavigate, activeWindow, showEditButton = false }: NavbarProps) {
    const listFunctions = [
        { name: `Listar ${pageName}`, id: `listar${ pageName.toLowerCase() }` },
        { name: `Cadastrar ${pageName}`, id: `cadastrar${ pageName.toLowerCase() }` },
        ...(showEditButton ? [{ name: `Alterar ${pageName}`, id: `alterar${ pageName.toLowerCase() }` }] : []),
    ];

    return (
        <nav className='h-16 border-b-[#124285] px-10 flex items-center justify-baseline gap-5 border-b border-white/5'>
            <h2 className='text-xl font-bold pr-10'>Funções: </h2>
            {listFunctions.map((item, index) => (
                <button
                    key={index}
                    className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                        activeWindow(item.id) 
                            ? 'bg-white text-[#071d45]' 
                            : 'text-white hover:bg-white/10'
                    }`}
                    onClick={() => onNavigate(item.id)}
                >
                    {item.name}
                </button>
            ))}
        </nav>
    );
}
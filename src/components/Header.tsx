import { Menu, X, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onRefresh?: () => void; // Prop opcional para o refresh
}

const Header = ({ onRefresh }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Habilidades', href: '#skills' },
    { label: 'Experiência', href: '#experience' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Formação', href: '#education' },
    { label: 'Contato', href: '#contact' },
  ];

  // Função para formatar a data/hora
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    
    try {
      // Se tiver a prop onRefresh, chama ela
      if (onRefresh) {
        await onRefresh();
      } else {
        // Ou faz refresh da página
        window.location.reload();
      }
      
      // Atualiza o timestamp
      setLastUpdate(formatTime(new Date()));
      
      // Mostra feedback visual
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      setIsRefreshing(false);
    }
  };
 

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e Nome com botão de refresh integrado */}
          <div className="flex items-center space-x-3">
            <div className="w-16 h-8 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                <img className='w-full h-full rounded-full object-cover shadow-2xl'
                src="https://ik.imagekit.io/8h7kfljfc/portfolio/ChatGPT%20Image%20Jan%2012,%202026,%2001_53_48%20PM.png" alt="Logo" /></span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRefresh}
                  className="text-xl font-bold gradient-text hover:text-primary-600 transition-colors flex items-center group"
                  title="Clique para atualizar dados da planilha"
                  disabled={isRefreshing}
                >
                  Carlos Moroni
                  <RefreshCw 
                    className={`ml-2 h-4 w-4 transition-all ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`}
                  />
                </button>
                
                {/* Indicador visual de atualização */}
                {isRefreshing && (
                  <span className="text-xs text-gray-500 animate-pulse">
                    Atualizando...
                  </span>
                )}
              </div>
              
              {/* Timestamp discreto */}
              <span className="text-xs text-gray-400 mt-0.5">
                {lastUpdate}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-primary-500 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-primary-500 py-2 px-4 rounded-lg hover:bg-gray-50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Botão de refresh na versão mobile */}
              <button
                onClick={handleRefresh}
                className="flex items-center justify-center text-gray-600 hover:text-primary-500 py-2 px-4 rounded-lg hover:bg-gray-50 transition-all"
                disabled={isRefreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Atualizando...' : 'Atualizar dados'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import { Github, Linkedin, Heart, Code2, Palette, Zap, Rocket } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-card border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Logo e Copyright */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-linear-to-br from-primary-500 to-primary-700 rounded-lg shadow-lg"></div>
              <span className="text-xl font-bold text-light">
                Portfólio
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} Carlos Moroni Garcia. Todos os direitos reservados.
            </p>
          </div>
          
          {/* Stack Usada */}
          <div className="text-center">
            <p className="text-gray-400 mb-3 text-sm">Desenvolvido com</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-gray-800/50 text-primary-300 rounded-full text-xs border border-gray-700">
                <Rocket size={12} className="mr-1" />
                React 18
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-gray-800/50 text-primary-300 rounded-full text-xs border border-gray-700">
                <Code2 size={12} className="mr-1" />
                TypeScript
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-gray-800/50 text-primary-300 rounded-full text-xs border border-gray-700">
                <Palette size={12} className="mr-1" />
                Tailwind CSS
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-gray-800/50 text-primary-300 rounded-full text-xs border border-gray-700">
                <Zap size={12} className="mr-1" />
                Vite
              </span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="text-right">
            <div className="flex justify-end space-x-3">
              <a
                href="https://github.com/seuuser"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800/50 rounded-lg hover:bg-primary-900/30 transition-all duration-300 border border-gray-700 hover:border-primary-500/50 group"
                aria-label="GitHub"
              >
                <Github size={18} className="text-gray-300 group-hover:text-primary-400 transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/carlosmoronigarcia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800/50 rounded-lg hover:bg-primary-900/30 transition-all duration-300 border border-gray-700 hover:border-primary-500/50 group"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-gray-300 group-hover:text-primary-400 transition-colors" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-3 flex items-center justify-end">
              Feito com 
              <Heart size={14} className="mx-1 text-primary-500 animate-pulse-subtle" />
              e dedicação
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
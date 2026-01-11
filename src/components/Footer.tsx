import { Github, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo e Copyright */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg"></div>
              <span className="text-xl font-bold gradient-text">
                Portfólio
              </span>
            </div>
            <p className="text-gray-400">
              © {currentYear} Meu Portfólio. Todos os direitos reservados.
            </p>
          </div>
          
          {/* Stack Usada */}
          <div className="text-center">
            <p className="text-gray-400 mb-3">Desenvolvido com</p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1 bg-gray-800 text-primary-300 rounded-full text-sm">
                React 18
              </span>
              <span className="px-3 py-1 bg-gray-800 text-primary-300 rounded-full text-sm">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-gray-800 text-primary-300 rounded-full text-sm">
                Tailwind CSS
              </span>
              <span className="px-3 py-1 bg-gray-800 text-primary-300 rounded-full text-sm">
                Vite
              </span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="text-right">
            <div className="flex justify-end space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-gray-400 mt-4 flex items-center justify-end">
              Feito com <Heart size={16} className="mx-1 text-red-500" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
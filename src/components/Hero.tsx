import { usePortfolio } from '../hooks/usePortfolio';
import { ChevronDown, Mail, MapPin } from 'lucide-react';

const Hero = () => {
  const { data } = usePortfolio();

  if (!data?.personalInfo) return null;

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="lg:w-2/3 space-y-8 animate-smooth-slide-up">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-light mb-4">
              {data.personalInfo.name}
            </h1>
            <h2 className="text-xl md:text-2xl text-primary-400 font-semibold mb-6">
              {data.personalInfo.title}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl">
              {data.personalInfo.bio}
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-2 text-gray-300">
              <Mail size={18} className="text-primary-400" />
              <span>{data.personalInfo.email}</span>
            </div>
            
            {data.personalInfo.location && (
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin size={18} className="text-primary-400" />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-primary-900/30"
            >
              <span>Entre em Contato</span>
            </a>
            
            <a
              href="#projects"
              className="inline-flex items-center space-x-2 px-6 py-3 border border-primary-500 text-primary-400 font-medium rounded-lg hover:bg-primary-900/30 transition-all duration-300"
            >
              <span>Ver Projetos</span>
              <ChevronDown size={20} />
            </a>
          </div>
        </div>
        
        {/* Avatar */}
        <div className="lg:w-1/3 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary-500 shadow-2xl">
              <img
                src={data.personalInfo.avatar}
                alt={data.personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-600/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
import { usePortfolio } from '../hooks/usePortfolio';
import { Mail, MapPin, Phone } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import Avatar from './Avatar';

const Hero = () => {
  const { data, loading } = usePortfolio();

  if (loading) return <LoadingSpinner />;
  if (!data) return null;

  const { personalInfo } = data;

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                {personalInfo.name}
              </h1>
              <h2 className="text-2xl md:text-3xl mt-2 gradient-text font-semibold">
                {personalInfo.title}
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {personalInfo.bio}
            </p>
            
            <div className="space-y-3">
              {personalInfo.email && (
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail size={20} className="text-primary-500" />
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              )}
              
              {personalInfo.phone && (
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone size={20} className="text-primary-500" />
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              )}
              
              {personalInfo.location && (
                <div className="flex items-center space-x-3 text-gray-700">
                  <MapPin size={20} className="text-primary-500" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
            
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Entre em Contato
              </a>
            </div>
          </div>
          
          {/* Right Column - Avatar DINÂMICO */}
          <div className="flex justify-center animate-slide-up">
            <div className="relative">
              <div className="relative group">
                {/* Avatar da planilha */}
                <Avatar 
                  src={personalInfo.avatar ?? ''}
                  alt={personalInfo.name}
                  size="xl"
                  className="animate-slide-up"
                />
                
                {/* Indicador de que a foto é editável */}
                <div className="absolute inset-0 bg-linear-to-br from-primary-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-100 rounded-full -z-10 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-50 rounded-full -z-10"></div>
              
              {/* Badge indicando que é editável */}
              <div className="absolute -bottom-2 right-4 bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-gray-700">
                Foto editável
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
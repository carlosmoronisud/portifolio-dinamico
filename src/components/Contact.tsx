import { useState } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Globe, MessageCircle, Link } from 'lucide-react';
import { PortfolioService } from '../services/api';

const Contact = () => {
  const { data } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!data) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const portfolioService = PortfolioService.getInstance();
      await portfolioService.sendContactMessage(formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Entre em Contato
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Vamos conversar sobre como posso ajudar no seu próximo projeto
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column - Contact Info */}
        <div className="space-y-8 animate-fade-in">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Informações de Contato
            </h3>
            
            <div className="space-y-6">
              {data.personalInfo.email && (
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Mail className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a
                      href={`mailto:${data.personalInfo.email}`}
                      className="text-gray-900 font-medium hover:text-primary-600 transition-colors"
                    >
                      {data.personalInfo.email}
                    </a>
                  </div>
                </div>
              )}
              
              {data.personalInfo.phone && (
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Phone className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Telefone</p>
                    <a
                      href={`tel:${data.personalInfo.phone}`}
                      className="text-gray-900 font-medium hover:text-primary-600 transition-colors"
                    >
                      {data.personalInfo.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {data.personalInfo.location && (
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <MapPin className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Localização</p>
                    <p className="text-gray-900 font-medium">
                      {data.personalInfo.location}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Social Links */}
          {data.contactLinks && data.contactLinks.length > 0 && (
  <div>
    <h3 className="text-xl font-bold text-gray-900 mb-6">
      Conecte-se Comigo
    </h3>
    <div className="flex flex-wrap gap-4">
      {data.contactLinks.map((link) => {
        // Mapear tipos para ícones do Lucide
        const getIcon = (iconName: string) => {
          switch(iconName.toLowerCase()) {
            case 'linkedin': return <Linkedin size={20} />;
            case 'github': return <Github size={20} />;
            case 'email': return <Mail size={20} />;
            case 'portfolio': return <Globe size={20} />;
            case 'whatsapp': return <MessageCircle size={20} />;
            default: return <Link size={20} />;
          }
        };

        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
          >
            {getIcon(link.icon)}
            <span className="font-medium">{link.name}</span>
          </a>
        );
      })}
    </div>
  </div>
)}
        </div>
        
        {/* Right Column - Contact Form */}
        <div className="card animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nome *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Seu nome"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem *
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                placeholder="Como posso ajudar você?"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Enviar Mensagem</span>
                </>
              )}
            </button>
            
            {isSubmitted && (
              <div className="p-4 bg-green-50 text-green-700 rounded-lg animate-fade-in">
                Mensagem enviada com sucesso! Entrarei em contato em breve.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
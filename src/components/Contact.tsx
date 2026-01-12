import { useState } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Globe, MessageCircle, Link, User, MessageSquare } from 'lucide-react';
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
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Entre em Contato
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          Vamos conversar sobre como posso ajudar no seu próximo projeto
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Contact Info */}
        <div className="space-y-8 animate-fade-in">
          <div>
            <h3 className="text-xl font-bold text-light mb-6">
              Informações de Contato
            </h3>
            
            <div className="space-y-4">
              {data.personalInfo.email && (
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-dark-card hover:bg-gray-800/50 transition-all duration-300 border border-gray-800 hover:border-primary-500/30">
                  <div className="p-3 bg-primary-900/30 rounded-lg border border-primary-800/50">
                    <Mail className="text-primary-400" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a
                      href={`mailto:${data.personalInfo.email}`}
                      className="text-light font-medium hover:text-primary-400 transition-colors"
                    >
                      {data.personalInfo.email}
                    </a>
                  </div>
                </div>
              )}
              
              {data.personalInfo.phone && (
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-dark-card hover:bg-gray-800/50 transition-all duration-300 border border-gray-800 hover:border-primary-500/30">
                  <div className="p-3 bg-primary-900/30 rounded-lg border border-primary-800/50">
                    <Phone className="text-primary-400" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Telefone</p>
                    <a
                      href={`tel:${data.personalInfo.phone}`}
                      className="text-light font-medium hover:text-primary-400 transition-colors"
                    >
                      {data.personalInfo.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {data.personalInfo.location && (
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-dark-card hover:bg-gray-800/50 transition-all duration-300 border border-gray-800 hover:border-primary-500/30">
                  <div className="p-3 bg-primary-900/30 rounded-lg border border-primary-800/50">
                    <MapPin className="text-primary-400" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Localização</p>
                    <p className="text-light font-medium">
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
              <h3 className="text-xl font-bold text-light mb-6">
                Conecte-se Comigo
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.contactLinks.map((link) => {
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
                      className="inline-flex items-center space-x-2 px-4 py-3 bg-dark-card text-primary-300 rounded-lg hover:bg-primary-900/30 hover:text-primary-400 transition-all duration-300 border border-gray-800 hover:border-primary-500/50"
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
        <div className="bg-dark-card rounded-xl shadow-lg p-6 border border-gray-800 animate-smooth-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <User size={16} className="mr-2 text-primary-400" />
                Nome *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-light placeholder-gray-500"
                placeholder="Seu nome completo"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Mail size={16} className="mr-2 text-primary-400" />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-light placeholder-gray-500"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <MessageSquare size={16} className="mr-2 text-primary-400" />
                Mensagem *
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-light placeholder-gray-500 resize-none"
                placeholder="Como posso ajudar você? Descreva seu projeto ou dúvida..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-500 hover:to-primary-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary-900/30"
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
              <div className="p-4 bg-primary-900/20 text-primary-300 rounded-lg border border-primary-800/50 animate-fade-in">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span>Mensagem enviada com sucesso! Entrarei em contato em breve.</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
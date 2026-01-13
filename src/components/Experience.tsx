import { usePortfolio } from '../hooks/usePortfolio';
import { Calendar, Briefcase, TrendingUp } from 'lucide-react';
import SliderVertical from './sliders/SliderVertical';

const Experience = () => {
  const { data } = usePortfolio();

  if (!data?.experiences) return null;

  const renderExperienceItem = (exp: typeof data.experiences[0]) => (
    <div className="bg-dark-card rounded-xl shadow-lg p-6 border border-gray-800 h-full transition-all duration-300 hover:shadow-xl hover:border-primary-500/30 animate-smooth-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center mb-3">
            <div className="p-3 bg-primary-900/30 rounded-lg border border-primary-800/50 mr-4">
              <Briefcase className="text-primary-400" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-light">{exp.position}</h3>
              <div className="flex items-center text-primary-400 mt-1">
                <span className="font-medium">{exp.company}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-gray-400 bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-800">
          <Calendar size={16} className="mr-2 text-primary-400" />
          <span className="text-sm font-medium">
            {exp.startDate} - {exp.current ? 'Atual' : exp.endDate}
            {exp.current && (
              <span className="ml-2 px-3 py-1 bg-primary-900/30 text-primary-300 text-xs rounded-full font-semibold border border-primary-800/50">
                Atual
              </span>
            )}
          </span>
        </div>
      </div>
      
      <div className="prose max-w-none mb-6">
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center mb-3">
            <TrendingUp size={18} className="text-primary-400 mr-2" />
            <h4 className="font-semibold text-gray-300">Principais Responsabilidades</h4>
          </div>
          <ul className="space-y-3">
            {exp.description.map((item, idx) => (
              <li key={idx} className="flex items-start text-gray-400">
                <span className="text-primary-500 mr-3 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-800">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Tecnologias & Habilidades</h4>
        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-primary-900/20 text-primary-300 text-sm rounded-lg font-medium transition-all duration-300 hover:bg-primary-900/40 hover:scale-105 border border-primary-800/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Experiência Profissional
        </h2>
        {/* <p className="text-muted max-w-2xl mx-auto">
          Minha jornada profissional e conquistas ao longo dos anos
        </p> */}
      </div>
      
      <div className="max-w-4xl mx-auto">
        <SliderVertical
          items={data.experiences}
          renderItem={renderExperienceItem}
          itemsPerView={1}
          className="px-4 md:px-0"
          showControls={true}
          autoSlide={false}
          itemHeight={380}
        />
      </div>
    </div>
  );
};

export default Experience;
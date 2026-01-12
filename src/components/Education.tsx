import { usePortfolio } from '../hooks/usePortfolio';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import SliderHorizontal from './sliders/SliderHorizontal';

const Education = () => {
  const { data } = usePortfolio();

  if (!data?.education) return null;

  const getEducationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'graduação':
        return <GraduationCap size={24} />;
      case 'bootcamp':
        return <Award size={24} />;
      case 'especialização':
        return <Award size={24} />;
      case 'curso livre':
        return <GraduationCap size={24} />;
      default:
        return <GraduationCap size={24} />;
    }
  };

  const renderEducationItem = (edu: typeof data.education[0]) => (
    <div 
      key={edu.id} 
      className="bg-dark-card rounded-xl shadow-lg p-6 border border-gray-800 h-full group hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:border-primary-500/30"
      style={{ minHeight: '350px' }}
    >
      <div className="space-y-4 h-full flex flex-col">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-900/30 rounded-lg border border-primary-800/50">
              <div className="text-primary-400">
                {getEducationIcon(edu.field)}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-light">{edu.degree}</h3>
              <p className="text-primary-400 font-medium">{edu.field}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 grow">
          <div className="flex items-center text-gray-300">
            <span className="font-semibold">{edu.institution}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-400">
            <Calendar size={16} className="mr-2" />
            <span>{edu.startDate} - {edu.endDate}</span>
          </div>
          
          {edu.description && (
            <div className="mt-3">
              <p className="text-gray-400 text-sm line-clamp-4">
                {edu.description}
              </p>
            </div>
          )}
        </div>
        
        <div className="pt-4 border-t border-gray-800 mt-auto">
          <span className="inline-block px-3 py-1 bg-gray-800 text-primary-300 text-xs font-medium rounded-full border border-gray-700">
            {edu.field}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Formação Acadêmica
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          Minha trajetória educacional e qualificações
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <SliderHorizontal
          items={data.education}
          renderItem={renderEducationItem}
          itemsPerView={2}
          className="px-8 md:px-12"
          showControls={true}
          showDots={true}
          autoSlide={false}
          gap={32}
        />
      </div>
    </div>
  );
};

export default Education;
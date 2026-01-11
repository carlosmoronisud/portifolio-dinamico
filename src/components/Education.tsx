import { usePortfolio } from '../hooks/usePortfolio';
import { GraduationCap, Calendar } from 'lucide-react';

const Education = () => {
  const { data } = usePortfolio();

  if (!data?.education) return null;

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Formação Acadêmica
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Minha trajetória educacional e qualificações
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {data.education.map((edu) => (
          <div key={edu.id} className="card group hover:scale-[1.02] transition-transform duration-300">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <GraduationCap className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.field}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <span className="font-medium">{edu.institution}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>{edu.startDate} - {edu.endDate}</span>
                </div>
              </div>
              
              {edu.description && (
                <p className="text-gray-600 pt-2 border-t border-gray-100">
                  {edu.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
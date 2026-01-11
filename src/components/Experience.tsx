import { usePortfolio } from '../hooks/usePortfolio';
import { Calendar, Briefcase } from 'lucide-react';

const Experience = () => {
  const { data } = usePortfolio();

  if (!data?.experiences) return null;

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Experiência Profissional
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Minha jornada profissional e conquistas ao longo dos anos
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {data.experiences.map((exp, index) => (
          <div
            key={exp.id}
            className={`relative ${index < data.experiences.length - 1 ? 'mb-12' : ''}`}
          >
            <div className="flex flex-col md:flex-row">
              {/* Timeline Line for Desktop */}
              <div className="hidden md:flex items-start w-24 pt-8">
                <div className="relative">
                  <div className="w-0.5 h-full bg-primary-200 absolute left-3 top-0"></div>
                  <div className="w-6 h-6 rounded-full bg-primary-500 border-4 border-white shadow-lg z-10 relative"></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 card md:ml-8 animate-slide-up">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                    <div className="flex items-center mt-1 text-primary-600">
                      <Briefcase size={16} className="mr-2" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 md:mt-0 flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">
                      {exp.startDate} - {exp.current ? 'Atual' : exp.endDate}
                      {exp.current && (
                        <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                          Atual
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <ul className="list-disc pl-5 space-y-2 mt-4">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
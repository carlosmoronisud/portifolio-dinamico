import { usePortfolio } from '../hooks/usePortfolio';
import { Zap, Cpu, Database, Palette, Code, Terminal } from 'lucide-react';

const Skills = () => {
  const { data } = usePortfolio();

  if (!data?.skillCategories) return null;

  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('automação') || name.includes('low-code')) return <Zap size={20} />;
    if (name.includes('microsoft') || name.includes('365')) return <Cpu size={20} />;
    if (name.includes('dados') || name.includes('análise')) return <Database size={20} />;
    if (name.includes('desenvolvimento') || name.includes('dev')) return <Code size={20} />;
    if (name.includes('ferramentas')) return <Terminal size={20} />;
    return <Palette size={20} />;
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Habilidades & Competências
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          Tecnologias e ferramentas que utilizo
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.skillCategories.map((category) => (
          <div 
            key={category.id} 
            className="bg-dark-card rounded-xl shadow-lg p-6 border border-gray-800 hover:border-primary-500/30 transition-all duration-300"
          >
            <div className="flex items-center mb-6 pb-4 border-b border-gray-800">
              <div className="p-3 bg-primary-900/30 rounded-lg border border-primary-800/50 mr-4">
                <div className="text-primary-400">
                  {getCategoryIcon(category.name)}
                </div>
              </div>
              <h3 className="text-xl font-bold text-light">
                {category.name}
              </h3>
            </div>
            
            <div className="space-y-6">
              {category.skills.map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {skill.icon && (
                        <span className="mr-2 text-lg">{skill.icon}</span>
                      )}
                      <span className="font-medium text-gray-300">{skill.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary-400">
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-1000 ease-out shadow-inner"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  
                  {/* Level indicator dots */}
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Iniciante</span>
                    <span>Intermediário</span>
                    <span>Avançado</span>
                    <span>Especialista</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
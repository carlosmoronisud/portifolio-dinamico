import { usePortfolio } from '../hooks/usePortfolio';

const Skills = () => {
  const { data } = usePortfolio();

  if (!data?.skillCategories) return null;

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Habilidades & Competências
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tecnologias e ferramentas que utilizo para criar soluções digitais
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.skillCategories.map((category) => (
          <div key={category.id} className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
              {category.name}
            </h3>
            
            <div className="space-y-6">
              {category.skills.map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{skill.name}</span>
                    <span className="text-sm font-semibold text-primary-600">
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
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
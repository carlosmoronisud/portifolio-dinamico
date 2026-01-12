import { usePortfolio } from '../hooks/usePortfolio';
import { ExternalLink, Github, Star, Target, Lightbulb, TrendingUp } from 'lucide-react';
import SliderHorizontal from './sliders/SliderHorizontal';

const Projects = () => {
  const { data } = usePortfolio();

  if (!data?.projects) return null;

  const renderProjectItem = (project: typeof data.projects[0]) => (
    <div 
      key={project.id} 
      className="bg-dark-card rounded-xl shadow-lg p-6 border border-gray-800 h-full group hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:border-primary-500/30"
      style={{ minHeight: '500px' }}
    >
      <div className="space-y-4 h-full flex flex-col">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-light">
              {project.title}
            </h3>
            {project.featured && (
              <span className="px-3 py-1 bg-primary-900/30 text-primary-300 text-xs font-semibold rounded-full border border-primary-800/50">
                <Star size={14} className="inline mr-1" />
                Destaque
              </span>
            )}
          </div>
          <p className="text-gray-400">{project.description}</p>
        </div>
        
        <div className="space-y-4 grow">
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
            <div className="flex items-center mb-2">
              <Target size={16} className="text-primary-400 mr-2" />
              <h4 className="font-semibold text-gray-300">Desafio</h4>
            </div>
            <p className="text-sm text-gray-400 line-clamp-3">{project.problem}</p>
          </div>
          
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
            <div className="flex items-center mb-2">
              <Lightbulb size={16} className="text-primary-400 mr-2" />
              <h4 className="font-semibold text-gray-300">Solução</h4>
            </div>
            <p className="text-sm text-gray-400 line-clamp-3">{project.solution}</p>
          </div>
          
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
            <div className="flex items-center mb-2">
              <TrendingUp size={16} className="text-primary-400 mr-2" />
              <h4 className="font-semibold text-gray-300">Resultado</h4>
            </div>
            <p className="text-sm text-gray-400 line-clamp-3">{project.result}</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-300 mb-3">Tecnologias</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary-900/20 text-primary-300 text-sm rounded-full border border-primary-800/30"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 bg-gray-800 text-gray-400 text-sm rounded-full border border-gray-700">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-800 mt-auto">
          {project.demoUrl && project.demoUrl !== 'N/A' && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              <ExternalLink size={18} />
              <span>Demo</span>
            </a>
          )}
          
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-gray-300 font-medium transition-colors"
            >
              <Github size={18} />
              <span>Código</span>
            </a>
          )}
          
          {!project.demoUrl && !project.repoUrl && (
            <span className="text-gray-500 text-sm">Sem links disponíveis</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
          Projetos Destacados
        </h2>
        <p className="text-muted max-w-2xl mx-auto">
          Soluções desenvolvidas com impacto real e resultados mensuráveis
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <SliderHorizontal
          items={data.projects}
          renderItem={renderProjectItem}
          itemsPerView={3}
          className="px-8 md:px-12"
          showControls={true}
          showDots={true}
          autoSlide={false}
          gap={24}
        />
      </div>
    </div>
  );
};

export default Projects;
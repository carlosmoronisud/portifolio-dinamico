import { usePortfolio } from '../hooks/usePortfolio';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const { data } = usePortfolio();

  if (!data?.projects) return null;

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Projetos Destacados
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Soluções desenvolvidas com impacto real e resultados mensuráveis
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.projects.map((project) => (
          <div key={project.id} className="card group hover:scale-[1.02] transition-transform duration-300">
            <div className="space-y-4">
              {/* Project Header */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
              
              {/* Problem-Solution-Result */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Desafio</h4>
                  <p className="text-sm text-gray-600">{project.problem}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Solução</h4>
                  <p className="text-sm text-gray-600">{project.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Resultado</h4>
                  <p className="text-sm text-gray-600">{project.result}</p>
                </div>
              </div>
              
              {/* Technologies */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Tecnologias</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Links */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
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
                    className="inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    <Github size={18} />
                    <span>Código</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
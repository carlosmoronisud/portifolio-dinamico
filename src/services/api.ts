// Interface para a resposta direta da API do Google Sheets
// Interface para a resposta completa da API
interface GoogleSheetsApiResponse {
  success: boolean;
  data: {
    config: Array<{
      name: string;
      title: string;
      bio: string;
      email: string;
      linkedin?: string;
      github?: string;
      location?: string;
      avatar?: string;
    }>;
    skills: Array<{
      category: string;
      name: string;
      level: number;
      icon: string;
    }>;
    experience: Array<{
      company: string;
      role: string;
      period: string;
      description: string;
      tags: string[];
      highlight: boolean;
    }>;
    projects: Array<{
      id: number;
      title: string;
      problem: string;
      solution: string;
      result: string;
      technologies: string[];
      imageUrl?: string;
      liveUrl?: string;
      category: string;
    }>;
    education: Array<{
      institution: string;
      course: string;
      period: string;
      type: string;
      description: string;
    }>;
    contact: Array<{
      type: string;
      value: string;
      label: string;
      priority: number;
    }>;
  };
  timestamp: string;
}

// Import das nossas interfaces
// Import das nossas interfaces
import type {
  PortfolioData,
  PersonalInfo,
  SkillCategory,
  Skill,
  Experience,
  Project,
  Education,
  ContactLink
} from '../types/portfolio';

// URL da API do Google Apps Script
// URL da API do Google Apps Script
const API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL || '';

// Criar uma proxy para evitar CORS em desenvolvimento
const getAPIUrl = () => {
  if (!API_URL) return '';
  
  // Em produção, usa a URL direta
  if (!import.meta.env.DEV) return API_URL;
  
  // Em desenvolvimento, usa uma proxy CORS
  // Você pode usar um desses serviços:
  const proxyServices = [
    `https://corsproxy.io/?${encodeURIComponent(API_URL)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(API_URL)}`,
    `https://thingproxy.freeboard.io/fetch/${API_URL}`
  ];
  
  return proxyServices[0]; // Escolha um serviço
};


// No seu arquivo services/api.ts (PortfolioService)
export class PortfolioService {
  private static instance: PortfolioService;
  private useMockData: boolean;
  private cache: PortfolioData | null = null;
  private lastFetchTime: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos
  private refreshCallbacks: Array<() => void> = [];

  private constructor() {
    this.useMockData = !API_URL || API_URL === '';
  }

  static getInstance(): PortfolioService {
    if (!PortfolioService.instance) {
      PortfolioService.instance = new PortfolioService();
    }
    return PortfolioService.instance;
  }

  async fetchPortfolioData(forceRefresh = false): Promise<PortfolioData> {
    const apiUrl = getAPIUrl();
    
    // Verificar cache se não for forçado
    const now = Date.now();
    if (!forceRefresh && this.cache && (now - this.lastFetchTime) < this.CACHE_DURATION) {
      console.log('📦 Usando dados em cache');
      return this.cache;
    }

    if (!apiUrl || this.useMockData) {
      console.log('⚠️ Usando dados mockados');
      return this.getMockData();
    }

    try {
      console.log('🔄 Buscando dados da API:', apiUrl);
      
const response = await fetch(apiUrl, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'text/plain' 
  }
});
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      let googleData;
      
      try {
        googleData = JSON.parse(text);
      } catch (parseError) {
        console.error('❌ Erro ao parsear JSON:', parseError);
        throw new Error('Resposta não é um JSON válido');
      }
      
      console.log('✅ Dados recebidos da API:', {
        timestamp: googleData.timestamp,
        config: googleData.data?.config?.[0]?.name || 'N/A'
      });
      
      // Transformar e armazenar em cache
      const transformedData = this.transformGoogleData(googleData);
      this.cache = transformedData;
      this.lastFetchTime = now;
      
      // Notificar todos os subscribers que os dados foram atualizados
      this.notifyRefresh();
      
      return transformedData;
      
    } catch (error) {
      console.error('❌ Erro ao buscar dados:', error);
      return this.getMockData();
    }
    
  }

  // Método para forçar refresh
  async refreshData(): Promise<PortfolioData> {
    console.log('🔄 Forçando refresh dos dados...');
    return this.fetchPortfolioData(true);
  }

  // Limpar cache
  clearCache(): void {
    this.cache = null;
    this.lastFetchTime = 0;
    console.log('🗑️ Cache limpo');
  }

  // Gerenciamento de callbacks para refresh
  onRefresh(callback: () => void): void {
    this.refreshCallbacks.push(callback);
  }

  offRefresh(callback: () => void): void {
    this.refreshCallbacks = this.refreshCallbacks.filter(cb => cb !== callback);
  }

  private notifyRefresh(): void {
    this.refreshCallbacks.forEach(callback => callback());
  }

  // Método para obter timestamp do último fetch
  getLastFetchTime(): number {
    return this.lastFetchTime;
  }

private transformGoogleData(apiResponse: GoogleSheetsApiResponse): PortfolioData {
  // Verificar se a resposta foi bem sucedida
  if (!apiResponse.success) {
    throw new Error('Resposta da API não foi bem sucedida');
  }
  
  // Extrair os dados da resposta
  const googleData = apiResponse.data;
  
  // Extrair informações pessoais
  const config = googleData.config?.[0] || {};
  
  const personalInfo: PersonalInfo = {
    name: config.name || '',
    title: config.title || '',
    bio: config.bio || '',
    email: config.email || '',
    location: config.location || '',
    phone: '', // Adicione campo na planilha se quiser telefone
    // Usar avatar da planilha ou fallback padrão
    avatar: config.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  };

    // Habilidades agrupadas por categoria
    const skillCategoriesMap = new Map<string, Skill[]>();
    
    googleData.skills?.forEach((skill, index) => {
      const category = skill.category || 'Outros';
      const skillId = `${category.toLowerCase().replace(/\s+/g, '-')}-${index}`;
      
      const newSkill: Skill = {
        id: skillId,
        name: skill.name,
        level: Math.min(Math.max(skill.level * 20, 0), 100), // Converter escala 1-5 para 0-100
        category: category,
        icon: skill.icon || '⚙️'
      };
      
      if (!skillCategoriesMap.has(category)) {
        skillCategoriesMap.set(category, []);
      }
      skillCategoriesMap.get(category)!.push(newSkill);
    });

    const skillCategories: SkillCategory[] = Array.from(skillCategoriesMap.entries()).map(([category, skills], index) => ({
      id: `category-${index}`,
      name: category,
      skills
    }));

    // Experiência profissional
    const experiences: Experience[] = googleData.experience?.map((exp, index) => {
      const periodParts = exp.period?.split(' - ') || [];
      const isCurrent = periodParts[1] === 'presente';
      
      return {
        id: `exp-${index}`,
        company: exp.company || '',
        position: exp.role || '',
        startDate: periodParts[0] || '',
        endDate: isCurrent ? undefined : periodParts[1],
        current: isCurrent,
        description: exp.description ? [exp.description] : [],
        technologies: exp.tags || []
      };
    }) || [];

    // Projetos
    const projects: Project[] = googleData.projects?.filter(p => p.title).map((proj, index) => ({
      id: `proj-${index}`,
      title: proj.title || '',
      description: proj.problem ? `${proj.problem.substring(0, 100)}...` : '',
      problem: proj.problem || '',
      solution: proj.solution || '',
      result: proj.result || '',
      technologies: proj.technologies || [],
      demoUrl: proj.liveUrl,
      repoUrl: '',
      imageUrl: proj.imageUrl || 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=' + encodeURIComponent(proj.title?.substring(0, 20) || 'Projeto'),
      featured: index < 3 // Destacar os 3 primeiros projetos
    })) || [];

    // Educação
    const education: Education[] = googleData.education?.filter(e => e.institution).map((edu, index) => {
      const periodParts = edu.period?.split(' - ') || ['', ''];
      
      return {
        id: `edu-${index}`,
        institution: edu.institution || '',
        degree: edu.course || '',
        field: edu.type || '',
        startDate: periodParts[0] || '',
        endDate: periodParts[1] || '',
        description: edu.description || ''
      };
    }) || [];

    // Contatos
    const contactLinks: ContactLink[] = googleData.contact
      ?.filter(c => c.value && !c.value.includes('#ERROR!'))
      .map((contact, index) => ({
        id: `contact-${index}`,
        name: contact.label || contact.type,
        url: contact.value,
        icon: contact.type // Usaremos ícones baseados no tipo
      })) || [];

    return {
      personalInfo,
      skillCategories,
      experiences,
      projects,
      education,
      contactLinks
    };
  }

  private getMockData(): PortfolioData {
    // Retornar dados mockados baseados na sua planilha
    return {
      personalInfo: {
        name: 'Carlos Moroni Garcia',
        title: 'Analista de Sistemas & Especialista em Automação',
        bio: 'Transformo processos manuais em soluções escaláveis com Microsoft Power Platform, automação RPA e desenvolvimento de dashboards estratégicos. Atuo como responsável único de TI em organização com 70 colaboradores.',
        email: 'carlosmoronisud@gmail.com',
        phone: '+55 (19) 99999-9999',
        location: 'Campinas, SP',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
      },
      skillCategories: [
        {
          id: 'automacao',
          name: 'Automação & Low-Code',
          skills: [
            { id: 'power-automate', name: 'Power Automate (RPA)', level: 100, category: 'automacao', icon: '⚙️' },
            { id: 'power-apps', name: 'Power Apps', level: 100, category: 'automacao', icon: '📱' },
            { id: 'hubspot', name: 'HubSpot Automation', level: 80, category: 'automacao', icon: '🔄' },
          ]
        },
        {
          id: 'microsoft',
          name: 'Microsoft 365',
          skills: [
            { id: 'm365-admin', name: 'Microsoft 365 Admin Center', level: 100, category: 'microsoft', icon: '☁️' },
            { id: 'nonprofit', name: 'Gestão de Contas Nonprofit', level: 100, category: 'microsoft', icon: '👥' },
            { id: 'security', name: 'Políticas de Segurança & DNS', level: 80, category: 'microsoft', icon: '🔒' },
          ]
        }
      ],
      experiences: [
        {
          id: 'exp1',
          company: 'Instituto Social Espaço Negro - GEN',
          position: 'Analista de Sistemas / Responsável por TI',
          startDate: 'jul 2025',
          current: true,
          description: [
            'Lidero a transformação digital da organização, sendo o único responsável pela TI.',
            'Automatizei 5 fluxos internos, gerenciei 70 contas Microsoft 365.',
            'Criei dashboards estratégicos e desenvolvi aplicativos low-code para operação.'
          ],
          technologies: ['Power Automate', 'Power BI', 'Microsoft 365', 'Power Apps', 'Dashboard']
        }
      ],
      projects: [
        {
          id: 'proj1',
          title: 'Sistema de Controle de Ponto',
          description: 'Aplicativo low-code para registro de horas com validações em tempo real',
          problem: 'Controle manual de horas em planilhas desconexas...',
          solution: 'Desenvolvi um aplicativo low-code no Power Apps...',
          result: 'Redução de 12h/mês em planilhas manuais...',
          technologies: ['Power Apps', 'Power Automate', 'Power BI', 'Excel'],
          demoUrl: '',
          repoUrl: '',
          imageUrl: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Controle+Ponto',
          featured: true
        }
      ],
      education: [
        {
          id: 'edu1',
          institution: 'Universidade Presbiteriana Mackenzie',
          degree: 'Análise e Desenvolvimento de Sistemas',
          field: 'Graduação',
          startDate: 'fev 2025',
          endDate: 'dez 2027',
          description: 'Ênfase em desenvolvimento de software, arquitetura de sistemas e gestão de projetos de TI.'
        }
      ],
      contactLinks: [
        { id: 'email', name: 'Email', url: 'mailto:carlosmoronisud@gmail.com', icon: 'mail' },
        { id: 'linkedin', name: 'LinkedIn', url: 'https://linkedin.com/in/carlosmoronigarcia', icon: 'linkedin' },
        { id: 'github', name: 'GitHub', url: 'https://github.com/seuuser', icon: 'github' },
      ]
    };
  }

  // async sendContactMessage(data: {
  //   name: string;
  //   email: string;
  //   message: string;
  // }): Promise<boolean> {
  //   console.log('📧 Mensagem de contato:', data);
   
  //   return true;
  // }
}

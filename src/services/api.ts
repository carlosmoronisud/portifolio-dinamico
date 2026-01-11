// Interface para a resposta direta da API do Google Sheets

interface GoogleSheetsResponse {
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


export class PortfolioService {
  private static instance: PortfolioService;
  private useMockData: boolean;

  private constructor() {
    this.useMockData = !API_URL || API_URL === '';
  }

  static getInstance(): PortfolioService {
    if (!PortfolioService.instance) {
      PortfolioService.instance = new PortfolioService();
    }
    return PortfolioService.instance;
  }

  async fetchPortfolioData(): Promise<PortfolioData> {
    const apiUrl = getAPIUrl();
    
    if (!apiUrl || this.useMockData) {
      console.log('⚠️ Usando dados mockados (API_URL não configurada ou em desenvolvimento)');
      return this.getMockData();
    }

    try {
      console.log('🔄 Buscando dados da API:', apiUrl);
      const response = await fetch(apiUrl, {
        // Adicionar headers para evitar cache
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
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
        console.log('Texto recebido:', text.substring(0, 200));
        throw new Error('Resposta não é um JSON válido');
      }
      
      console.log('✅ Dados recebidos da API:', googleData);
      
      // Transformar dados do Google Sheets para nosso formato
      return this.transformGoogleData(googleData);
      
    } catch (error) {
      console.error('❌ Erro ao buscar dados da API:', error);
      console.log('🔄 Usando fallback para dados mockados');
      return this.getMockData();
    }
  }

  private transformGoogleData(googleData: GoogleSheetsResponse): PortfolioData {
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

  async sendContactMessage(data: {
    name: string;
    email: string;
    message: string;
  }): Promise<boolean> {
    console.log('📧 Mensagem de contato:', data);
    // Aqui você pode implementar o envio para outra aba do Google Sheets
    // ou para um serviço de email
    return true;
  }
}

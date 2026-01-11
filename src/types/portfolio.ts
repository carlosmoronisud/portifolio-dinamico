// Certifique-se que está exportando corretamente
export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ContactLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

// Export principal do PortfolioData
export interface PortfolioData {
  personalInfo: PersonalInfo;
  skillCategories: SkillCategory[];
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  contactLinks: ContactLink[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    avatar: ''
  },
  skillCategories: [],
  experiences: [],
  projects: [],
  education: [],
  contactLinks: []
};
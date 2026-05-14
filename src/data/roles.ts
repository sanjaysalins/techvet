export interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  techIds: string[];
}

export const ROLE_TEMPLATES: RoleTemplate[] = [
  {
    id: 'fullstack',
    name: 'Full-Stack Developer',
    description: 'Frontend + backend with cloud deployment.',
    techIds: ['react', 'typescript', 'nodejs', 'postgresql', 'docker', 'aws'],
  },
  {
    id: 'frontend',
    name: 'Frontend Engineer',
    description: 'Web UI specialist (React, modern tooling).',
    techIds: ['react', 'typescript', 'nextjs', 'tailwind', 'vite'],
  },
  {
    id: 'backend',
    name: 'Backend Engineer',
    description: 'API and services specialist.',
    techIds: ['nodejs', 'python', 'postgresql', 'redis', 'docker', 'kubernetes'],
  },
  {
    id: 'solution-architect',
    name: 'Solution Architect',
    description: 'Cloud architecture, services, infra.',
    techIds: ['kubernetes', 'terraform', 'aws', 'kafka', 'postgresql'],
  },
  {
    id: 'devops',
    name: 'DevOps / Platform',
    description: 'CI/CD, infra-as-code, container orchestration.',
    techIds: ['kubernetes', 'terraform', 'docker', 'github-actions', 'helm', 'observability'],
  },
  {
    id: 'sre',
    name: 'SRE / Platform Engineer',
    description: 'Reliability, observability, automation at scale.',
    techIds: ['kubernetes', 'terraform', 'observability', 'helm', 'go', 'python', 'aws'],
  },
  {
    id: 'data',
    name: 'Data Engineer',
    description: 'Pipelines, warehousing, streaming.',
    techIds: ['python', 'sql', 'dbt', 'databricks', 'kafka', 'airflow', 'postgresql'],
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Analysis, modelling, experimentation.',
    techIds: ['python', 'pandas', 'numpy', 'scikit-learn', 'sql', 'jupyter', 'databricks'],
  },
  {
    id: 'ai-ml',
    name: 'AI / ML Engineer',
    description: 'Build and deploy ML / LLM systems and RAG.',
    techIds: ['python', 'pytorch', 'huggingface-transformers', 'llm-api-sdk', 'vector-db', 'fastapi', 'docker', 'aws'],
  },
  {
    id: 'mobile',
    name: 'Mobile Engineer',
    description: 'iOS / Android / cross-platform.',
    techIds: ['swift', 'kotlin', 'react-native', 'expo', 'flutter'],
  },
  {
    id: 'security',
    name: 'Security Engineer (AppSec)',
    description: 'Application and cloud security.',
    techIds: ['python', 'oauth-identity', 'aws', 'kubernetes', 'docker', 'terraform', 'sql', 'observability'],
  },
  {
    id: 'qa',
    name: 'QA / Test Engineer',
    description: 'Test automation across UI, API, and load.',
    techIds: ['playwright', 'cypress', 'pytest', 'vitest', 'selenium', 'typescript', 'python', 'github-actions'],
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Start blank and add technologies as you go.',
    techIds: [],
  },
];

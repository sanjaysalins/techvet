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
    techIds: ['react', 'typescript', 'nodejs', 'postgresql', 'docker', 'aws-lambda'],
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
    techIds: [
      'kubernetes',
      'terraform',
      'aws-eks',
      'aws-lambda',
      'aws-rds',
      'kafka',
      'postgresql',
    ],
  },
  {
    id: 'devops',
    name: 'DevOps / Platform',
    description: 'CI/CD, infra-as-code, container orchestration.',
    techIds: ['kubernetes', 'terraform', 'docker', 'github-actions', 'argocd', 'gke'],
  },
  {
    id: 'data',
    name: 'Data Engineer',
    description: 'Pipelines, warehousing, streaming.',
    techIds: ['python', 'spark', 'kafka', 'airflow', 'bigquery', 'postgresql'],
  },
  {
    id: 'mobile',
    name: 'Mobile Engineer',
    description: 'iOS / Android / cross-platform.',
    techIds: ['swift', 'kotlin', 'react-native', 'flutter'],
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Start blank and add technologies as you go.',
    techIds: [],
  },
];

/**
 * Common abbreviations + alternative spellings recruiters write in job
 * descriptions. The catalog's `name` field already covers the canonical
 * form (e.g. "PostgreSQL", "Kubernetes") via case-insensitive substring
 * match, so this map only carries forms the name *won't* catch:
 * abbreviations ("K8s"), short forms ("Postgres"), or sibling product
 * names that map to the same catalog entry (Valkey → redis).
 *
 * Phase 1 of the JD-extraction feature uses these for deterministic
 * substring matching. Phase 2 (in-browser LLM) augments with contextual
 * extraction the rules miss.
 *
 * Editing rules of thumb:
 * - Aliases must be ≥3 characters; 2-char terms ("ts", "es", "rn") have
 *   too many false positives in prose.
 * - Avoid ambiguous abbreviations across techs (e.g. "TF" maps to
 *   terraform only — TensorFlow gets its full name).
 * - Concrete-product → generic mappings (Pinecone → vector-db) are fine
 *   when the catalog deliberately holds one generic entry.
 */
export const TECH_ALIASES: Record<string, string[]> = {
  kubernetes: ['k8s', 'kube'],
  postgresql: ['postgres', 'pg', 'psql'],
  mongodb: ['mongo'],
  redis: ['valkey'],
  elasticsearch: ['elastic', 'opensearch'],
  nodejs: ['node.js'],
  nextjs: ['next.js'],
  express: ['express.js', 'expressjs'],
  vue: ['vue.js', 'vuejs'],
  react: ['react.js', 'reactjs'],
  angular: ['angularjs', 'angular.js'],
  'react-native': ['react native', 'react-native'],
  terraform: ['tf', 'opentofu', 'tofu'],
  docker: ['dockerfile', 'docker compose', 'docker-compose'],
  'github-actions': ['github actions', 'gha'],
  'gitlab-ci': ['gitlab ci', 'gitlab pipelines'],
  aws: ['amazon web services'],
  azure: ['azure', 'microsoft azure'],
  gcp: ['gcp', 'google cloud', 'google cloud platform'],
  tailwind: ['tailwind', 'tailwindcss'],
  'oracle-db': ['oracle', 'oracle db'],
  csharp: ['c#'],
  cpp: ['c++'],
  dotnet: ['.net', 'asp.net', 'asp.net core', '.net core'],
  go: ['golang'],
  rust: ['rustlang'],
  swift: ['swiftlang'],
  kotlin: ['kotlinlang'],
  javascript: ['ecmascript'],
  'huggingface-transformers': ['huggingface', 'hugging face'],
  'llm-api-sdk': ['openai sdk', 'anthropic sdk', 'openai api', 'anthropic api'],
  'vector-db': [
    'vector database',
    'vector store',
    'pinecone',
    'weaviate',
    'qdrant',
    'chromadb',
    'chroma db',
    'milvus',
    'pgvector',
  ],
  'oauth-identity': ['oauth', 'oauth2', 'oidc', 'openid connect'],
  pytorch: ['torch'],
  tensorflow: ['keras'],
  'scikit-learn': ['sklearn', 'scikit'],
  pytest: ['py.test'],
  jest: ['jest framework'],
  cypress: ['cypress.io'],
  sql: ['ansi sql'],
  graphql: ['graph ql'],
  grpc: ['grpc protocol'],
  fastapi: ['fast api'],
  'spring-boot': ['spring boot', 'springboot'],
  // Round-13 F-W1: vendor-prefixed catalog names ("Apache Kafka",
  // "HashiCorp Vault") never matched a JD's bare form because
  // nameSearchTerms doesn't whitespace-split. Bare aliases close the gap.
  kafka: ['kafka'],
  spark: ['spark'],
  airflow: ['airflow'],
  flink: ['flink'],
  vault: ['vault', 'hcp vault'],
  // Round-13 sim 03 AI/ML: hyphenated variant of "Pydantic AI".
  'pydantic-ai': ['pydantic-ai'],
  // Round-13 sim 01 fintech: full word "OpenTelemetry" wasn't matched by
  // the catalog's "OTel" search term (word-boundary lookbehind).
  observability: ['opentelemetry'],
};

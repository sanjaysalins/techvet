# Round: 2026-05-16 phone-screening — cast

**Theme:** Phone screening, 5-10 min, recruiter typing while listening.
**Sessions:** 10
**Diversity goal:** Span seniority (junior → senior), career path
(traditional, bootcamp, self-taught, returner, contractor), and
template-fit (well-aligned → boundary cases).

Each persona is a sketch. The agent fills in the rest in section 1 of
their report.

---

## 01 — Janelle Park

- **Seniority:** Junior (1.5 yr since bootcamp)
- **Current role:** Frontend dev at a 40-person SaaS
- **Stack she names easily:** React 18, TypeScript, Tailwind, Vite, Jest
- **Stack she half-remembers:** Storybook (uses it but didn't set it up),
  some Playwright (Q&A team owns it)
- **What she'll be wrong about:** Calls Vite "the build thing" without
  knowing the version. Confuses TanStack Query with Redux Toolkit Query.
- **Why she's interesting:** First-job junior. The tool is built for
  recruiters screening mid/senior — does it fairly represent her?
- **Suggested template:** Frontend Engineer

---

## 02 — Marcus Lee

- **Seniority:** Career switcher, 1 yr coding (was a high-school teacher
  for 8 yr before)
- **Current role:** Junior backend dev at an EdTech startup
- **Stack he names easily:** Python, Django, PostgreSQL (basic queries),
  Git
- **Stack he half-remembers:** "We use Redis for something but the senior
  set it up," "AWS — I deploy via a script someone wrote"
- **What he'll be wrong about:** Mixes up SQLAlchemy and Django ORM. Says
  "we use Docker" but it's Docker Compose only.
- **Why he's interesting:** Career switcher, slow to enumerate, modest
  about what he knows. Recruiter risks under-scoring him *or* over-scoring
  him on Python (which he genuinely is fine at).
- **Suggested template:** Backend Engineer

---

## 03 — Priya Joshi

- **Seniority:** Junior-mid, 1.5 yr (started as data analyst,
  transitioning to data engineering)
- **Current role:** Analyst at a fintech, building her first pipelines
- **Stack she names easily:** SQL, Python (pandas), Airflow (uses, didn't
  build), Snowflake, dbt (writes models)
- **Stack she half-remembers:** Spark ("ran a notebook once"), Kafka
  ("the streaming team owns it")
- **What she'll be wrong about:** Calls dbt "the SQL framework". Doesn't
  know whether her Snowflake is on warehouse XS, S, or M.
- **Why she's interesting:** Career-transitioning junior. SQL is
  checklist-mode in TechVet (12 services); Snowflake is version-mode but
  she'd choose checklist if it existed.
- **Suggested template:** Data Engineer

---

## 04 — Tomás Reyes

- **Seniority:** Mid (4 yr, all at one Y Combinator startup that went
  Series B → flat-lined)
- **Current role:** Full-stack at the same startup; looking to leave
- **Stack he names easily:** Next.js (App Router), TypeScript, tRPC,
  Postgres, Tailwind, Vercel, Stripe
- **Stack he half-remembers:** "Some Python for ETL," "We had a Redis
  cache but I never touched it"
- **What he'll be wrong about:** Will name "Vercel" as his cloud (it's
  not in the catalog). May say Next.js 15 — actual is 14.
- **Why he's interesting:** Modern broad-shallow full-stack. The tool
  should rate him well; Vercel/tRPC/Stripe catalog gaps will show.
- **Suggested template:** Full-Stack Developer

---

## 05 — Lin Wei

- **Seniority:** Mid-senior (5 yr, all-Go-all-the-time at a payments shop)
- **Current role:** Backend dev; team is on-prem Kubernetes, no major
  cloud
- **Stack she names easily:** Go, gRPC, Postgres, Kafka, K8s, Prometheus,
  Grafana
- **Stack she half-remembers:** Some Python scripts; touched Elasticsearch
  briefly
- **What she'll be wrong about:** Doesn't know what "AWS depth" means —
  her stack runs on bare metal in a colo. Will say "no AWS" honestly.
- **Why she's interesting:** Strong engineer the tool will probably
  *under-rate* because she has zero cloud experience and the Backend
  template doesn't include Go. Catalog has Go but template doesn't.
- **Suggested template:** Backend Engineer (or Custom?)

---

## 06 — Aisha Khan

- **Seniority:** Mid (4 yr DevOps, started as a sysadmin)
- **Current role:** DevOps at a healthcare SaaS; GKE shop on GCP
- **Stack she names easily:** Kubernetes, Helm, Terraform, GitLab CI,
  Prometheus, Grafana, Vault
- **Stack she half-remembers:** ArgoCD (evaluated, didn't ship), Pulumi
  (read a tutorial)
- **What she'll be wrong about:** Confuses Helm chart versions with
  Kubernetes versions ("we're on 1.28"). Says "we use observability" as
  if it's a tool.
- **Why she's interesting:** Tests whether the DevOps template represents
  GCP shops fairly (catalog lists AWS/Azure/GCP, but template biases AWS).
- **Suggested template:** DevOps / Platform

---

## 07 — Hana Tanaka

- **Seniority:** Mid (3 yr iOS at a media company, now exploring Flutter)
- **Current role:** iOS developer; PM is pushing the team to evaluate
  cross-platform
- **Stack she names easily:** Swift, SwiftUI, UIKit (legacy modules),
  Combine, Xcode Cloud
- **Stack she half-remembers:** Flutter ("I built a side project last
  weekend"), Firebase (analytics only)
- **What she'll be wrong about:** Doesn't track Swift versions ("I just
  install Xcode and it works"). Will quote a Flutter version that's
  pre-3.x.
- **Why she's interesting:** Mobile specialist with a stack that's
  *barely* in the catalog (Swift yes, SwiftUI no, UIKit no, Xcode Cloud
  no, Combine no). The Mobile template includes Kotlin/Expo/RN that she
  doesn't touch.
- **Suggested template:** Mobile Engineer

---

## 08 — Dmitri Voinov

- **Seniority:** Senior contractor (12 yr, project-hops every 6-12 mo)
- **Current role:** Between contracts; last gig was Q1 2026
- **Stack he names easily:** "Everything." He'll list 25 things in 90
  seconds without depth: Ruby, Rails, Django, FastAPI, React, Vue,
  Postgres, MySQL, Mongo, Redis, K8s, Docker, AWS, GCP, Terraform,
  Ansible, Kafka, GraphQL, gRPC…
- **Stack he half-remembers:** Solidity (one 2018 project), Erlang ("I
  read a book")
- **What he'll be wrong about:** Quotes confident versions for everything,
  but his "Rails 7" is actually 2023 work and he hasn't touched it since.
- **Why he's interesting:** The "I touched everything" contractor. Tool
  will probably score him 15 Green / 5 Yellow / 0 Red, but a hiring
  manager would want to know *which* of those he can ramp on in a week vs.
  which need a refresher. `lastUsed` (priority #5) is the missing signal.
- **Suggested template:** Custom

---

## 09 — Sarah Mahoney

- **Seniority:** Senior returner (8 yr backend, then a 3 yr career break;
  now re-entering)
- **Current role:** Just finished a 6-week refresher bootcamp; looking
  for first role back
- **Stack she names easily:** Java (Spring), Postgres, AWS (Lambda, RDS,
  SQS — circa 2021), Jenkins
- **Stack she half-remembers:** "I heard there's a new Spring
  version… 6?", "Docker we used but I'd want to refresh"
- **What she'll be wrong about:** Quotes Spring Boot 2.5 (current is 3.4).
  Says "AWS" with old-style confidence but hasn't logged in since 2021.
- **Why she's interesting:** Strong fundamentals, stale specifics. Tool
  needs to surface "this person is excellent on the principles but the
  *versions* she'll quote are 4 yr old". `lastUsed` is the entire game
  here; without it she scores like she just left her last role.
- **Suggested template:** Backend Engineer

---

## 10 — Vikram Patel

- **Seniority:** Senior ML pivoting to GenAI (5 yr classical ML + 6 mo
  intensive LLM work)
- **Current role:** ML engineer at a martech company; recently rebranded
  the team as "GenAI Platform"
- **Stack he names easily:** Python, PyTorch, scikit-learn, pandas, numpy,
  AWS SageMaker, MLflow
- **Stack he half-remembers (but will overclaim):** LangChain ("I built a
  RAG pipeline last month"), vector databases ("we're evaluating Pinecone
  and Weaviate"), Bedrock ("I've called the API")
- **What he'll be wrong about:** Will quote "deep" depth on LangChain and
  llm-api-sdk when he's been hands-on for ~6 weeks. Genuinely deep on
  PyTorch + classical ML.
- **Why he's interesting:** The GenAI-hype self-overclaim case. Depth-lift
  on a Yellow LangChain version → Green will *exactly* hit the failure
  mode the scope-of-use axis was meant to prevent. Does scope=author
  actually catch this?
- **Suggested template:** AI / ML Engineer

---

## Diversity check

| Persona | Seniority | Path | Template-fit | Channel |
|---------|-----------|------|--------------|---------|
| Janelle | Junior (1.5y) | Bootcamp | Good fit | Phone |
| Marcus  | Junior (1y) | Career switcher | Good fit | Phone |
| Priya   | Junior-mid (1.5y) | Analyst→DE transition | Decent | Phone |
| Tomás   | Mid (4y) | Traditional | Good fit + Vercel/tRPC gaps | Phone |
| Lin     | Mid-senior (5y) | Traditional | Boundary (Go shop, no cloud) | Phone |
| Aisha   | Mid (4y) | Sysadmin→DevOps | Good fit, GCP bias test | Phone |
| Hana    | Mid (3y) | Traditional | Boundary (iOS-only, catalog gaps) | Phone |
| Dmitri  | Senior (12y) | Contractor | Custom; lastUsed test | Phone |
| Sarah   | Senior returner | Returner | Strong fit, stale-version test | Phone |
| Vikram  | Senior (5y+) | ML→GenAI pivot | Scope-cap test | Phone |

Seniority spread: 3 junior, 1 junior-mid, 3 mid, 1 mid-senior, 2 senior.
Paths: bootcamp, career switcher, transition, traditional×3, sysadmin,
contractor, returner, pivot. 4 explicit boundary / stress-test cases.

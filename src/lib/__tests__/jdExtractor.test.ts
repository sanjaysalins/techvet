import { describe, it, expect } from 'vitest';
import { extractTechsFromJD } from '../jdExtractor';
import technologies from '../../data/technologies.json';
import type { Technology } from '../../types';

const TECHS = technologies as Technology[];
const TECH_BY_ID = new Map(TECHS.map(t => [t.id, t]));

function ids(jd: string): string[] {
  return extractTechsFromJD(jd).map(e => e.id);
}

describe('extractTechsFromJD — Phase 1 rules-based extraction', () => {
  it('empty / whitespace input returns []', () => {
    expect(extractTechsFromJD('')).toEqual([]);
    expect(extractTechsFromJD('   \n\t   ')).toEqual([]);
  });

  it('catches canonical catalog names', () => {
    const r = ids('We use PostgreSQL, Redis, and Kubernetes in production.');
    expect(r).toContain('postgresql');
    expect(r).toContain('redis');
    expect(r).toContain('kubernetes');
  });

  it('catches common abbreviations via aliases', () => {
    const r = ids('Looking for K8s + TF + GHA experience.');
    expect(r).toContain('kubernetes');
    expect(r).toContain('terraform');
    expect(r).toContain('github-actions');
  });

  it('catches sibling product names that map to the catalog entry', () => {
    expect(ids('We are migrating from Redis to Valkey.')).toContain('redis');
    expect(ids('Vector search via Pinecone or Weaviate.')).toContain('vector-db');
    expect(ids('Using OpenSearch for log analytics.')).toContain('elasticsearch');
  });

  it('respects word boundaries — no partial-word matches', () => {
    expect(ids('We do not use postgresqlite or psqlite.')).not.toContain('postgresql');
    expect(ids('They are reactive in style.')).not.toContain('react');
    expect(ids('Goodbye and good luck.')).not.toContain('go');
  });

  it('catches multi-word names + dotted variants', () => {
    const r = ids('Built on Node.js with Next.js and Express.js.');
    expect(r).toContain('nodejs');
    expect(r).toContain('nextjs');
    expect(r).toContain('express');
  });

  it('catches names with special chars (C# / C++ / .NET)', () => {
    const r = ids('Backend in C# (.NET 8) with some legacy C++ components.');
    expect(r).toContain('csharp');
    expect(r).toContain('cpp');
    expect(r).toContain('dotnet');
  });

  it('returned IDs are all in the catalog (no hallucinated entries)', () => {
    const sampleJD = `
      Senior Full-Stack Engineer at a fintech.
      Stack: TypeScript, React, Next.js, Node.js, PostgreSQL, Redis, Docker, Kubernetes.
      Bonus: Terraform, GitHub Actions, AWS (Lambda, RDS, S3).
      Nice to have: Python, FastAPI, LangChain experience.
    `;
    const extracted = extractTechsFromJD(sampleJD);
    for (const e of extracted) {
      expect(TECH_BY_ID.has(e.id), `extracted unknown id: ${e.id}`).toBe(true);
    }
  });

  it('results sorted by category then name', () => {
    const r = extractTechsFromJD('We use React, PostgreSQL, AWS, and Docker.');
    for (let i = 1; i < r.length; i++) {
      const prev = r[i - 1];
      const cur = r[i];
      const sameCategory = prev.category === cur.category;
      const correctOrder = sameCategory
        ? prev.name.localeCompare(cur.name) <= 0
        : prev.category.localeCompare(cur.category) <= 0;
      expect(correctOrder, `out of order at index ${i}: ${prev.category}/${prev.name} → ${cur.category}/${cur.name}`).toBe(true);
    }
  });

  it('returns evidence — which terms matched', () => {
    const r = extractTechsFromJD('K8s and Kubernetes are the same thing.');
    const k8s = r.find(e => e.id === 'kubernetes');
    expect(k8s).toBeDefined();
    expect(k8s!.matched).toContain('Kubernetes');
    expect(k8s!.matched).toContain('k8s');
  });

  it('typical mid-senior JD lands ≥6 catalog hits', () => {
    const jd = `
      We're hiring a Senior Platform Engineer.
      Required: deep Kubernetes ops, Terraform, AWS, Docker, GitHub Actions, Python.
      Nice to have: Prometheus, Grafana, ArgoCD, Helm.
    `;
    expect(ids(jd).length).toBeGreaterThanOrEqual(6);
  });
});

describe('extractTechsFromJD — Round-13 validation regressions', () => {
  it('F-P1: "JUnit (Java)" no longer false-positives on JD mentioning Java', () => {
    // Pre-fix: catalog name "JUnit (Java)" split into ["JUnit", "Java"],
    // so any JD mentioning Java extracted JUnit. Fix: paren contents
    // without `/` are stripped (disambiguators / expansions / hints).
    const jd = 'Backend in Java 21 with Spring Boot.';
    const r = ids(jd);
    expect(r).toContain('java');
    expect(r).not.toContain('junit');
  });

  it('F-P1: paren-strip preserves alternatives list when `/` is inside', () => {
    // "Observability (Prometheus / Grafana / OTel)" — the alternatives
    // are useful search terms; must NOT be dropped.
    const r = ids('We use Prometheus and Grafana for monitoring.');
    expect(r).toContain('observability');
  });

  it('F-P1: paren-stripped disambiguators no longer match', () => {
    // "Expo (React Native)" — pre-fix, JD mentioning "React Native" would
    // extract both `expo` (via the paren content) AND `react-native`.
    // Post-fix, only `react-native` matches (Expo's name became just "Expo").
    const r = ids('We ship a React Native app.');
    expect(r).toContain('react-native');
    expect(r).not.toContain('expo');
  });

  it('F-W1: bare "Kafka" / "Flink" / "Vault" (vendor prefix stripped) match', () => {
    // Pre-fix: catalog name "Apache Kafka" / "Apache Flink" /
    // "HashiCorp Vault" never matched JDs writing the bare form,
    // because nameSearchTerms doesn't whitespace-split.
    expect(ids('We use Kafka 3.7 for messaging.')).toContain('kafka');
    expect(ids('Stream processing via Flink.')).toContain('flink');
    expect(ids('Secrets in Vault.')).toContain('vault');
    expect(ids('Batch via Airflow.')).toContain('airflow');
    expect(ids('Spark analytics jobs.')).toContain('spark');
  });

  it('F-W1: full vendor-prefixed forms still match', () => {
    expect(ids('We use Apache Kafka.')).toContain('kafka');
    expect(ids('HashiCorp Vault for secrets.')).toContain('vault');
  });

  it('AI/ML quick wins: "pgvector" and hyphenated "Pydantic-AI" match', () => {
    expect(ids('We considered pgvector before settling on Pinecone.')).toContain('vector-db');
    expect(ids('Built our agents in Pydantic-AI.')).toContain('pydantic-ai');
    expect(ids('Built our agents in Pydantic AI.')).toContain('pydantic-ai');
  });

  it('fintech: "OpenTelemetry" hits observability', () => {
    expect(ids('OpenTelemetry instrumentation across all services.')).toContain('observability');
  });

  it('GCP: bare "GCP" abbreviation matches even after paren-strip', () => {
    // Catalog name "Google Cloud Platform (GCP)" — paren-strip drops
    // "GCP" from search terms. Aliases recover.
    expect(ids('Hosted on GCP with Cloud Run.')).toContain('gcp');
  });

  it('AWS: paren-stripped "Amazon Web Services" recovered via alias', () => {
    // Catalog "AWS (Amazon Web Services)" — paren-strip drops "Amazon
    // Web Services" from search terms. Aliases recover.
    expect(ids('We run on Amazon Web Services.')).toContain('aws');
    expect(ids('AWS EKS for orchestration.')).toContain('aws');
  });

  it('F3: identifier-style tokens with `_` no longer false-positive on short language names', () => {
    // Pre-fix: "go_router" (Flutter library) extracted Go because the
    // word boundary treated `_` as non-alphanumeric. Now boundary
    // excludes `[a-z0-9_]`.
    expect(ids('Flutter app using go_router for navigation.')).not.toContain('go');
    expect(ids('Flutter app using go_router; written in Go.')).toContain('go');
  });

  it('F4: "React" inside "React Native" is suppressed when both could match', () => {
    // Pre-fix: a JD mentioning ONLY React Native still extracted React
    // because "React" matched inside "React Native". Span suppression
    // drops the contained match.
    const r = ids('We ship a React Native app to iOS and Android.');
    expect(r).toContain('react-native');
    expect(r).not.toContain('react');
  });

  it('F4: bare React + React Native in the same JD both extract', () => {
    // The suppression is per-match-instance, not per-tech. A standalone
    // "React" should still extract react even when "React Native" also
    // appears.
    const r = ids('Built with React for web and React Native for mobile.');
    expect(r).toContain('react-native');
    expect(r).toContain('react');
  });

  it('F4: hyphenated "react-native" form (npm package shape) matches', () => {
    expect(ids('Uses the react-native package directly.')).toContain('react-native');
  });

  it('user-found: bare "Azure" / "Tailwind" / "Oracle" match (vendor-prefix names)', () => {
    // Catalog names: "Microsoft Azure", "Tailwind CSS", "Oracle Database".
    // Same F-W1 shape as Apache Kafka — bare form needs an explicit alias
    // because nameSearchTerms doesn't whitespace-split.
    expect(ids('Cloud experience (Azure desirable)')).toContain('azure');
    expect(ids('Styled with Tailwind.')).toContain('tailwind');
    expect(ids('Legacy Oracle backend.')).toContain('oracle-db');
  });
});

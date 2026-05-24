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

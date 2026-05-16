import { describe, it, expect, beforeEach } from 'vitest';
import { useAssessment } from '../assessment';

/**
 * Fix C (round-3 cross-cut): named-not-in-catalog capture. Round-3 sessions
 * surfaced 4 specialists whose key techs vanished into sticky notes (Lou-
 * Oracle, Devon-Tokio/NATS/eBPF, Tomi-Vault/Burp/Semgrep, Dmitri-Ruby/
 * Solidity). The `addNamedOnly` store action captures these as a free-text
 * list on AssessmentMeta — no scoring, no PDF verdict, just probe targets
 * for the technical interviewer.
 *
 * These tests pin the input-sanitization contract: trim, dedup case-
 * insensitively, reject empty, enforce length cap. The UI integration
 * (search no-results CTA + Summary section) is covered by browser smoke.
 */
describe('addNamedOnly / removeNamedOnly — store actions (Fix C)', () => {
  beforeEach(() => {
    useAssessment.getState().reset();
  });

  it('adds a trimmed name to meta.namedNotInCatalog', () => {
    useAssessment.getState().addNamedOnly('  Vault  ');
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual(['Vault']);
  });

  it('rejects empty / whitespace-only input', () => {
    useAssessment.getState().addNamedOnly('');
    useAssessment.getState().addNamedOnly('   ');
    useAssessment.getState().addNamedOnly('\t\n');
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual([]);
  });

  it('dedupes case-insensitively (Vault === vault === VAULT)', () => {
    useAssessment.getState().addNamedOnly('Vault');
    useAssessment.getState().addNamedOnly('vault');
    useAssessment.getState().addNamedOnly('VAULT');
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual(['Vault']);
  });

  it('preserves the casing of the first add (Vault, not vault)', () => {
    useAssessment.getState().addNamedOnly('Burp Suite');
    useAssessment.getState().addNamedOnly('burp suite');
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual(['Burp Suite']);
  });

  it('caps entry length at 80 characters (prevents notes-dumping)', () => {
    const long = 'A'.repeat(150);
    useAssessment.getState().addNamedOnly(long);
    const stored = useAssessment.getState().meta.namedNotInCatalog[0];
    expect(stored.length).toBe(80);
  });

  it('accumulates multiple distinct entries in insertion order', () => {
    useAssessment.getState().addNamedOnly('Vault');
    useAssessment.getState().addNamedOnly('Burp');
    useAssessment.getState().addNamedOnly('Semgrep');
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual(['Vault', 'Burp', 'Semgrep']);
  });

  it('removeNamedOnly removes by exact match', () => {
    useAssessment.getState().addNamedOnly('Vault');
    useAssessment.getState().addNamedOnly('Burp');
    useAssessment.getState().removeNamedOnly('Vault');
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual(['Burp']);
  });

  it('removeNamedOnly is a no-op when the name is not present', () => {
    useAssessment.getState().addNamedOnly('Vault');
    useAssessment.getState().removeNamedOnly('Nonexistent');
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual(['Vault']);
  });

  it('reset clears the named-only list', () => {
    useAssessment.getState().addNamedOnly('Vault');
    useAssessment.getState().reset();
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual([]);
  });

  it('namedNotInCatalog defaults to [] on a fresh session', () => {
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual([]);
  });
});

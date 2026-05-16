import { describe, it, expect, beforeEach } from 'vitest';
import { useAssessment } from '../assessment';

/**
 * Fix C (round-3 cross-cut): named-not-in-catalog capture. Round-3 sessions
 * surfaced 4 specialists whose key techs vanished into sticky notes (Lou-
 * Oracle, Devon-Tokio/NATS/eBPF, Tomi-Vault/Burp/Semgrep, Dmitri-Ruby/
 * Solidity). The `addNamedOnly` store action captures these as probe
 * targets for the technical interviewer.
 *
 * Bug 4 (round-4 Wendy): shape evolved from `string[]` to `NamedOnlyEntry[]`
 * so depth + lastUsed can attach. Tests below pin both the input-
 * sanitization contract AND the new shape.
 */
describe('addNamedOnly / updateNamedOnly / removeNamedOnly — store actions', () => {
  beforeEach(() => {
    useAssessment.getState().reset();
  });

  it('adds a trimmed entry with just the name (Bug 4: shape is {name})', () => {
    useAssessment.getState().addNamedOnly('  Vault  ');
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual([{ name: 'Vault' }]);
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
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual([{ name: 'Vault' }]);
  });

  it('preserves the casing of the first add (Vault, not vault)', () => {
    useAssessment.getState().addNamedOnly('Burp Suite');
    useAssessment.getState().addNamedOnly('burp suite');
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual([{ name: 'Burp Suite' }]);
  });

  it('caps entry length at 80 characters (prevents notes-dumping)', () => {
    const long = 'A'.repeat(150);
    useAssessment.getState().addNamedOnly(long);
    const stored = useAssessment.getState().meta.namedNotInCatalog[0];
    expect(stored.name.length).toBe(80);
  });

  it('accumulates multiple distinct entries in insertion order', () => {
    useAssessment.getState().addNamedOnly('Vault');
    useAssessment.getState().addNamedOnly('Burp');
    useAssessment.getState().addNamedOnly('Semgrep');
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual([
      { name: 'Vault' },
      { name: 'Burp' },
      { name: 'Semgrep' },
    ]);
  });

  it('removeNamedOnly removes by exact name match', () => {
    useAssessment.getState().addNamedOnly('Vault');
    useAssessment.getState().addNamedOnly('Burp');
    useAssessment.getState().removeNamedOnly('Vault');
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual([{ name: 'Burp' }]);
  });

  it('removeNamedOnly is a no-op when the name is not present', () => {
    useAssessment.getState().addNamedOnly('Vault');
    useAssessment.getState().removeNamedOnly('Nonexistent');
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual([{ name: 'Vault' }]);
  });

  it('reset clears the named-only list', () => {
    useAssessment.getState().addNamedOnly('Vault');
    useAssessment.getState().reset();
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual([]);
  });

  it('namedNotInCatalog defaults to [] on a fresh session', () => {
    expect(useAssessment.getState().meta.namedNotInCatalog).toEqual([]);
  });

  // Bug 4 (round-4 Wendy): post-call enrichment via updateNamedOnly.
  describe('Bug 4: updateNamedOnly (post-call depth + lastUsed enrichment)', () => {
    it('updates depth on an existing entry', () => {
      useAssessment.getState().addNamedOnly('Burp');
      useAssessment.getState().updateNamedOnly('Burp', { depth: 'deep' });
      expect(useAssessment.getState().meta.namedNotInCatalog).toEqual([
        { name: 'Burp', depth: 'deep' },
      ]);
    });

    it('updates lastUsed on an existing entry', () => {
      useAssessment.getState().addNamedOnly('Vault');
      useAssessment.getState().updateNamedOnly('Vault', { lastUsed: 'current role' });
      expect(useAssessment.getState().meta.namedNotInCatalog[0]).toEqual({
        name: 'Vault',
        lastUsed: 'current role',
      });
    });

    it('merges patches (depth set first, then lastUsed)', () => {
      useAssessment.getState().addNamedOnly('Semgrep');
      useAssessment.getState().updateNamedOnly('Semgrep', { depth: 'working' });
      useAssessment.getState().updateNamedOnly('Semgrep', { lastUsed: '2022' });
      expect(useAssessment.getState().meta.namedNotInCatalog[0]).toEqual({
        name: 'Semgrep',
        depth: 'working',
        lastUsed: '2022',
      });
    });

    it('updateNamedOnly on a missing name is a no-op', () => {
      useAssessment.getState().addNamedOnly('Burp');
      useAssessment.getState().updateNamedOnly('Trivy', { depth: 'deep' });
      expect(useAssessment.getState().meta.namedNotInCatalog).toEqual([{ name: 'Burp' }]);
    });

    it('clearing depth via undefined preserves other fields', () => {
      useAssessment.getState().addNamedOnly('Falco');
      useAssessment.getState().updateNamedOnly('Falco', { depth: 'deep', lastUsed: '2024' });
      useAssessment.getState().updateNamedOnly('Falco', { depth: undefined });
      expect(useAssessment.getState().meta.namedNotInCatalog[0]).toEqual({
        name: 'Falco',
        depth: undefined,
        lastUsed: '2024',
      });
    });
  });
});

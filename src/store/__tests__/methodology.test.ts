import { describe, it, expect, beforeEach } from 'vitest';
import { useAssessment } from '../assessment';

/**
 * Fix D4 (round-1+3+4): methodology / practice capture. v1 store
 * contract — id-based dedup, display-only.
 */
describe('addMethodology / removeMethodology — store actions (Fix D4)', () => {
  beforeEach(() => {
    useAssessment.getState().reset();
  });

  it('adds an entry with id + label', () => {
    useAssessment.getState().addMethodology('ddd', 'Domain-Driven Design (DDD)');
    expect(useAssessment.getState().meta.methodologyEntries).toEqual([
      { id: 'ddd', label: 'Domain-Driven Design (DDD)' },
    ]);
  });

  it('dedupes by id (Yara typing the same catalog chip twice is a no-op)', () => {
    useAssessment.getState().addMethodology('causal-inference', 'Causal inference');
    useAssessment.getState().addMethodology('causal-inference', 'CAUSAL INFERENCE (re-add)');
    expect(useAssessment.getState().meta.methodologyEntries).toEqual([
      { id: 'causal-inference', label: 'Causal inference' },
    ]);
  });

  it('rejects empty id or label', () => {
    useAssessment.getState().addMethodology('', 'Something');
    useAssessment.getState().addMethodology('id', '');
    useAssessment.getState().addMethodology('id', '   ');
    expect(useAssessment.getState().meta.methodologyEntries).toEqual([]);
  });

  it('caps label at 120 characters (prevents notes-dumping)', () => {
    useAssessment.getState().addMethodology('long', 'A'.repeat(200));
    const stored = useAssessment.getState().meta.methodologyEntries[0];
    expect(stored.label.length).toBe(120);
  });

  it('preserves insertion order', () => {
    useAssessment.getState().addMethodology('did', 'DiD');
    useAssessment.getState().addMethodology('iv', 'IV');
    useAssessment.getState().addMethodology('rdd', 'RDD');
    expect(useAssessment.getState().meta.methodologyEntries.map(e => e.id)).toEqual(['did', 'iv', 'rdd']);
  });

  it('removeMethodology removes by exact id', () => {
    useAssessment.getState().addMethodology('did', 'DiD');
    useAssessment.getState().addMethodology('iv', 'IV');
    useAssessment.getState().removeMethodology('did');
    expect(useAssessment.getState().meta.methodologyEntries.map(e => e.id)).toEqual(['iv']);
  });

  it('removeMethodology on missing id is a no-op', () => {
    useAssessment.getState().addMethodology('did', 'DiD');
    useAssessment.getState().removeMethodology('nonexistent');
    expect(useAssessment.getState().meta.methodologyEntries.map(e => e.id)).toEqual(['did']);
  });

  it('reset clears the methodology entries', () => {
    useAssessment.getState().addMethodology('did', 'DiD');
    useAssessment.getState().reset();
    expect(useAssessment.getState().meta.methodologyEntries).toEqual([]);
  });

  it('methodologyEntries defaults to [] on a fresh session', () => {
    expect(useAssessment.getState().meta.methodologyEntries).toEqual([]);
  });

  it('free-text entries use `free:` id prefix (Assessment UI convention)', () => {
    // The MethodologySection slugs typed text into a free:slug id so the
    // store dedups based on what the recruiter actually typed.
    useAssessment.getState().addMethodology('free:event-storming', 'EventStorming');
    expect(useAssessment.getState().meta.methodologyEntries).toEqual([
      { id: 'free:event-storming', label: 'EventStorming' },
    ]);
  });
});

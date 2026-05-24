/**
 * Runs the JD extractor against each fixture and writes results to disk.
 * Invoke with: `npx tsx simulations/rounds/2026-05-24-round-13-jd-extraction-phase1/run-extraction.ts`
 */
import { extractTechsFromJD } from '../../../src/lib/jdExtractor';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(here, 'fixtures');
const resultsDir = path.join(here, 'results');
fs.mkdirSync(resultsDir, { recursive: true });

const files = fs.readdirSync(fixturesDir).filter(f => f.endsWith('.md')).sort();
for (const f of files) {
  const jdPath = path.join(fixturesDir, f);
  const jd = fs.readFileSync(jdPath, 'utf8');
  const extracted = extractTechsFromJD(jd);
  const out = {
    fixture: f,
    extractedCount: extracted.length,
    extracted,
  };
  const outPath = path.join(resultsDir, f.replace(/\.md$/, '.json'));
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`${f} → ${extracted.length} techs (${outPath})`);
}
console.log('Done.');

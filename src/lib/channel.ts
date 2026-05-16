import type { Channel } from '../types';

/**
 * Fix Q (round-3 cross-cut): per-channel framing for empty / not-touched
 * techs on the Summary report. "Blank version field" means very different
 * things on phone (ran out of time), video (didn't come up), and async
 * (CV is silent, never spoke to candidate). Same underlying data, channel-
 * specific report copy so the hiring manager reads the right thing.
 *
 * Closes Yara/Devon/Min critique (round 3): Fix G's `notDiscussed`
 * framing was phone-only ("ran out of time") and read as recruiter
 * incompetence in async, when the actual story is "CV is silent here."
 */
export function notDiscussedCopy(channel: Channel): {
  chip: string;
  chipHint: string;
  sectionTitle: string;
  sectionBody: string;
} {
  switch (channel) {
    case 'video':
      return {
        chip: 'not discussed on the panel',
        chipHint: '(template-loaded, panel pivoted)',
        sectionTitle: 'Not discussed on the panel',
        sectionBody:
          "Loaded by the role template but didn't come up in the panel. " +
          'No verdict — worth a follow-up question before the technical ' +
          'interview.',
      };
    case 'async':
      return {
        chip: 'not on the CV / JD',
        chipHint: '(no candidate call — confirm before progressing)',
        sectionTitle: 'Not on the CV / JD',
        sectionBody:
          'Loaded by the role template but absent from the CV and the JD. ' +
          'You never spoke to the candidate, so these are unverified gaps — ' +
          'confirm on the next step. Treat as evidence-light, not as ' +
          'candidate weakness.',
      };
    case 'phone':
    default:
      return {
        chip: 'not discussed on the call',
        chipHint: '(template-loaded, recruiter pivoted)',
        sectionTitle: 'Not discussed on the call',
        sectionBody:
          'Loaded by the role template but the recruiter ran out of time ' +
          "or pivoted. No verdict — these are not candidate weaknesses, " +
          "they're gaps in the screen. Worth a follow-up before passing " +
          'to the technical interviewer.',
      };
  }
}

/** Human-readable channel name for the report header chip.
 *  Round-5 5ζ (Anil): phone/video used to render lowercase ("Channel: video")
 *  which reads unfinished. Now capitalized consistently with async. */
export function channelLabel(channel: Channel): string {
  switch (channel) {
    case 'async':
      return 'Async (CV-only)';
    case 'video':
      return 'Video panel';
    case 'phone':
    default:
      return 'Phone';
  }
}

/**
 * Round-4 Bug 1 (Marisol DS-async session): the "Confirmed not in
 * candidate's stack" section was hard-coded with phone-only framing
 * ("the recruiter asked; the candidate confirmed"), which is wrong
 * in async — the recruiter never spoke to the candidate. Same per-
 * channel helper pattern as `notDiscussedCopy`.
 *
 * Returns `title` + a 3-part body (`lead` / `emphasis` / `tail`) so the
 * caller can render the emphasized middle fragment as `<strong>` /
 * `<em>` without resorting to dangerouslySetInnerHTML.
 */
export function confirmedNotInStackCopy(channel: Channel): {
  title: (n: number) => string;
  lead: string;
  emphasis: string;
  emphasisStyle: 'strong' | 'em';
  tail: string;
} {
  switch (channel) {
    case 'video':
      return {
        title: n => `Confirmed not in candidate's stack (${n})`,
        lead: 'The panel asked; the candidate confirmed they do not work with these. Excluded from the score and radar but ',
        emphasis: 'positive coverage signal',
        emphasisStyle: 'strong',
        tail: ' — for the right role this is a clean fit; for the wrong role this is the ramp-up flag.',
      };
    case 'async':
      return {
        title: n => `Marked not in candidate's stack (${n})`,
        lead: 'Marked as not in the candidate’s stack based on the CV / JD evaluation — ',
        emphasis: 'not',
        emphasisStyle: 'em',
        tail: ' directly confirmed with the candidate. Excluded from the score and radar; verify on the next step before treating as a coverage signal either way.',
      };
    case 'phone':
    default:
      return {
        title: n => `Confirmed not in candidate's stack (${n})`,
        lead: 'The recruiter asked; the candidate confirmed they do not work with these. Excluded from the score and radar but ',
        emphasis: 'positive coverage signal',
        emphasisStyle: 'strong',
        tail: ' — for the right role this is a clean fit; for the wrong role this is the ramp-up flag.',
      };
  }
}

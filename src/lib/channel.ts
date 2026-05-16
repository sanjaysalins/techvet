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

/** Human-readable channel name for the report header chip. */
export function channelLabel(channel: Channel): string {
  return channel === 'async' ? 'Async (CV-only)' : channel;
}

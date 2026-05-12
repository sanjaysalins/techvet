import type { ResolvedTier, Technology } from '../types';
import { tierCardClass } from '../lib/scoring';
import { CheckCircle2, AlertTriangle, AlertCircle, HelpCircle, MessagesSquare } from 'lucide-react';

interface Props {
  tech: Technology;
  resolved: ResolvedTier;
}

const COLOR_ICON = {
  green: <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
  yellow: <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
  red: <AlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
};

const COLOR_HEADLINE = {
  green: 'text-emerald-800 dark:text-emerald-200',
  yellow: 'text-amber-800 dark:text-amber-200',
  red: 'text-rose-800 dark:text-rose-200',
};

export default function GuidancePanel({ tech, resolved }: Props) {
  return (
    <div className="space-y-4">
      <div className={`rounded-2xl border-2 p-5 ${tierCardClass(resolved.color)}`}>
        <div className="flex items-start gap-3">
          <div>{COLOR_ICON[resolved.color]}</div>
          <div className="flex-1">
            <div className={`text-2xl font-bold ${COLOR_HEADLINE[resolved.color]}`}>
              {resolved.label}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              Tier guidance for {tech.name}
            </div>
          </div>
        </div>

        {resolved.note && (
          <p className="mt-4 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            {resolved.note}
          </p>
        )}

        {resolved.enterpriseNote && (
          <div className="mt-3 text-xs font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {resolved.enterpriseNote}
          </div>
        )}

        {resolved.depthAdjusted && (
          <div className="mt-3 text-xs italic text-slate-600 dark:text-slate-300">
            Tier improved by one step based on candidate's stated depth.
          </div>
        )}

        {resolved.unknownVersion && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-300">
            <HelpCircle className="w-3.5 h-3.5" />
            Candidate didn't know version — yellow flag triggered.
          </div>
        )}
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <MessagesSquare className="w-4 h-4 text-brand" />
          <h3 className="font-semibold text-navy-900 dark:text-white text-sm uppercase tracking-wide">
            Suggested Probe Questions
          </h3>
        </div>
        <ul className="space-y-2.5">
          {tech.suggestedProbes.map((q, i) => (
            <li
              key={i}
              className="text-sm text-slate-700 dark:text-slate-200 flex gap-2"
            >
              <span className="font-mono text-brand text-xs mt-0.5">{i + 1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="font-semibold mb-1 text-slate-700 dark:text-slate-300">Current stable: {tech.currentVersion}</div>
        Category: {tech.category}
      </div>
    </div>
  );
}

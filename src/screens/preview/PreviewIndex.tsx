import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Layers, FilePlus2, LayoutPanelLeft } from 'lucide-react';

/**
 * Temporary preview-comparison index. Lets the user open 3 candidate
 * landing layouts side-by-side. To remove: delete this file, the 3
 * sibling files in `src/screens/preview/`, and the 4 routes added to
 * App.tsx.
 */
export default function PreviewIndex() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-6">
          <Layers className="w-3.5 h-3.5" />
          Preview / not the real landing
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-navy-900 dark:text-white">
          Pick a landing layout
        </h1>
        <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Three candidate redesigns. Click into each and try the flow end-to-end. Click the TechVet logo (top-left) to return here or to the live landing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PreviewCard
          to="/preview/flow"
          icon={<FilePlus2 className="w-6 h-6" />}
          title="A — Single-flow, JD-led"
          tagline="One hero with big JD paste box. Templates collapse to a chip strip below."
          highlight
        />
        <PreviewCard
          to="/preview/tabs"
          icon={<LayoutPanelLeft className="w-6 h-6" />}
          title="B — Two tabs"
          tagline="Simple tab = JD only. Advanced tab = templates + everything else."
        />
        <PreviewCard
          to="/preview/cards"
          icon={<FileText className="w-6 h-6" />}
          title="C — Two-card hero"
          tagline="'Got a JD?' / 'No JD?' equal-weight cards side-by-side."
        />
      </div>

      <div className="mt-10 text-center">
        <Link to="/" className="text-sm text-slate-500 hover:text-brand">
          ← Current live landing
        </Link>
      </div>
    </div>
  );
}

function PreviewCard({
  to,
  icon,
  title,
  tagline,
  highlight,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  tagline: string;
  highlight?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`card p-5 text-left hover:border-brand hover:shadow-glow transition group ${
        highlight ? 'ring-2 ring-brand/30' : ''
      }`}
    >
      <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center mb-3">
        {icon}
      </div>
      <div className="font-semibold text-navy-900 dark:text-white group-hover:text-brand transition flex items-center gap-1.5">
        {title}
        {highlight && (
          <span className="text-xs font-medium text-brand/80">recommended</span>
        )}
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">{tagline}</div>
      <div className="mt-3 text-xs text-brand inline-flex items-center gap-1">
        Open preview <ArrowRight className="w-3 h-3" />
      </div>
    </Link>
  );
}

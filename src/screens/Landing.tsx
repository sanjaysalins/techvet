import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../store/assessment';
import { ROLE_TEMPLATES } from '../data/roles';
import { ArrowRight, FileText, FileSearch, Shield, Zap, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import JDExtractModal from '../components/JDExtractModal';

export default function Landing() {
  const navigate = useNavigate();
  const { reset, addTech, setMeta, loadDraft } = useAssessment();
  const [hasDraft, setHasDraft] = useState(false);
  const [jdModalOpen, setJdModalOpen] = useState(false);

  useEffect(() => {
    setHasDraft(!!localStorage.getItem('techvet-draft'));
  }, []);

  function start(roleId: string) {
    const role = ROLE_TEMPLATES.find(r => r.id === roleId);
    reset();
    setMeta({
      role: role?.name ?? 'Custom',
      startedAt: new Date().toISOString(),
      // Round-4 AWS role-aware: TechCard reads meta.templateId to look up
      // the active template's serviceTagFilters (e.g. SA → AWS shows
      // architect-shaped services only).
      templateId: roleId,
    });
    // Fix K2: pass the template's per-tech scope hint so the cap fires
    // automatically (e.g. SA template → architect on Terraform). Templates
    // without `techScopes` (or specific techs without an entry) pass
    // undefined here, falling through to catalog defaultScope (Fix K).
    role?.techIds.forEach(t => addTech(t, role.techScopes?.[t]));
    navigate('/assess');
  }

  function resumeDraft() {
    if (loadDraft()) navigate('/assess');
  }

  function applyJDExtraction(techIds: string[]) {
    reset();
    setMeta({
      role: 'Custom (from JD)',
      startedAt: new Date().toISOString(),
      templateId: 'custom',
    });
    techIds.forEach(t => addTech(t));
    setJdModalOpen(false);
    navigate('/assess');
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-6">
          <Zap className="w-3.5 h-3.5" />
          Internal recruiter tool — 100% client-side
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-navy-900 dark:text-white">
          Vet developer skills <span className="text-brand">in minutes</span>,
          not weeks.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
          Quick, structured technical screening for non-technical recruiters.
          Live color-coded guidance, version-aware tier checks, and a clean
          one-click PDF report — all running in your browser.
        </p>

        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => start('fullstack')}
            className="btn-primary text-base px-7 py-3.5"
          >
            Start New Assessment <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setJdModalOpen(true)}
            className="btn-secondary text-base px-7 py-3.5"
          >
            <FileSearch className="w-4 h-4" /> Paste a JD
          </button>
          {hasDraft && (
            <button onClick={resumeDraft} className="btn-secondary text-base px-7 py-3.5">
              <FileText className="w-4 h-4" /> Resume Saved Draft
            </button>
          )}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center mb-6">
          Or pick a role template to get started faster
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROLE_TEMPLATES.map(role => (
            <button
              key={role.id}
              onClick={() => start(role.id)}
              className="card p-5 text-left hover:border-brand hover:shadow-glow transition group"
            >
              <div className="font-semibold text-navy-900 dark:text-white group-hover:text-brand transition">
                {role.name}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                {role.description}
              </div>
              {role.techIds.length > 0 && (
                <div className="mt-3 text-xs text-slate-400">
                  {role.techIds.length} preloaded technologies
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <JDExtractModal
        isOpen={jdModalOpen}
        onClose={() => setJdModalOpen(false)}
        onApply={applyJDExtraction}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
        <Feature
          icon={<Shield className="w-5 h-5" />}
          title="Recruiter-friendly"
          body="Plain-English guidance and color badges. No technical background required."
        />
        <Feature
          icon={<Zap className="w-5 h-5" />}
          title="Live coaching"
          body="As you type each technology and version, the right sidebar tells you exactly what to ask next."
        />
        <Feature
          icon={<Lock className="w-5 h-5" />}
          title="Zero data risk"
          body="Nothing leaves your browser. No accounts, no backend, no telemetry."
        />
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="card p-5">
      <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
        {icon}
      </div>
      <div className="font-semibold mt-3 text-navy-900 dark:text-white">{title}</div>
      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">{body}</div>
    </div>
  );
}

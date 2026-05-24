import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Landing from './screens/Landing';
import Assessment from './screens/Assessment';
import Summary from './screens/Summary';
import { ShieldCheck, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('techvet-theme') === 'dark';
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('techvet-theme', dark ? 'dark' : 'light');
  }, [dark]);
  return (
    <button
      onClick={() => setDark(d => !d)}
      className="btn-ghost p-2"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="no-print sticky top-0 z-30 backdrop-blur bg-white/80 dark:bg-navy-950/80 border-b border-slate-200 dark:border-navy-700">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-navy-900 dark:bg-brand flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-brand dark:text-navy-900" />
            </div>
            <div>
              <div className="font-bold text-lg leading-none text-navy-900 dark:text-white">TechVet</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Recruiter Assessment</div>
            </div>
          </Link>
          <nav className="flex items-center gap-1">
            {location.pathname !== '/' && (
              <Link to="/" className="btn-ghost text-sm">Home</Link>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/assess" element={<Assessment />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </main>

      <footer className="no-print border-t border-slate-200 dark:border-navy-700 py-4">
        <div className="max-w-7xl mx-auto px-6 text-xs text-slate-500 dark:text-slate-400 flex justify-between flex-wrap gap-2">
          <span>TechVet v4 — 100% client-side, no data leaves your browser.</span>
          <span>Internal recruiter tool · For initial screening only</span>
        </div>
      </footer>
    </div>
  );
}

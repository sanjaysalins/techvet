# TechVet PRD v4 – Pure Client-Side Offline Tool + Ralph Wiggum Autonomous Build Mode

**Product Name:** TechVet
**Version:** 4.0 (Ralph Wiggum Edition)
**Date:** May 12, 2026
**Type:** 100% client-side, offline-first, internal-only recruiter tool
**Goal:** Zero-cost, zero-maintenance, beautiful web app for fast initial candidate tech assessments.

### 1. Executive Summary
TechVet is a modern, professional, 100% browser-based web application that helps non-technical internal recruiters quickly evaluate developer and solution architect candidates during CV reviews or short screening calls.

Everything runs in the browser. No backend, no database, no accounts, no persistent storage of candidate data. The recruiter gets live color-coded guidance, a clean summary screen, and a one-click professional PDF report.

### 2. Non-Negotiable Constraints
- 100% client-side only (Vite + React)
- Static JSON data only
- Assessments are temporary (in-memory + optional localStorage for one session)
- Hosting: completely free (GitHub Pages, Cloudflare Pages, Vercel hobby, or Netlify)
- Modern, spacious, professional UI with large color badges for non-technical users
- No external API keys or paid services ever

### 3. Ralph Wiggum Iterative Build, Test & Verify Loop (Autonomous Zero-Input Mode)
This PRD is specifically engineered for **Ralph Wiggum mode** — a fully autonomous, self-correcting, iterative build process.

**Instructions to any LLM (Claude, Cursor, GPT, etc.):**
You must build the complete TechVet application using the following persistent loop with **zero further input** from the user. Keep iterating until the app is production-ready, beautiful, bug-free, and passes every item on the verification checklist.

**The Ralph Wiggum Loop You Must Follow (repeat as many times as needed):**
1. Read the entire PRD v4.
2. Create the full project structure and all files.
3. Implement one major feature/screen at a time.
4. Immediately self-test the feature (describe what you tested and any issues found).
5. Fix every bug, improve UI/UX, and verify logic (especially version tiers, depth adjustment, "I don't remember", and PDF export).
6. Move to the next feature.
7. After all features are complete, run the full Verification Checklist below.
8. If anything fails, iterate again (improve code, fix styling, enhance UX) until 100% pass.
9. Finally, output the complete ready-to-deploy project as a set of clearly labeled code blocks (package.json, vite.config.ts, all src/ files, etc.) + exact deployment instructions.

**Verification Checklist (must pass 100% before declaring "DONE"):**
- `npm run dev` starts cleanly with no errors
- Landing page + New Assessment flow works perfectly
- Technology search/add works instantly with live right-sidebar guidance
- Version tier logic + large color badges (Green/Good, Yellow/Review-Probe, Red/Concern) are correct
- "I don't remember version" correctly triggers Yellow + probe questions
- Depth selector correctly improves tier by max 1 level (protects React 16 veterans)
- Radar chart renders correctly by category
- PDF export produces a clean, professional report with disclaimer
- UI is modern, spacious, professional, mobile-friendly, dark-mode ready
- React 16 shows "Review / Probe – Still widely used in many enterprise applications"
- All 60+ technologies from technologies.json are included and accurate for 2026
- No backend dependencies, no console errors, bundle < 2.5MB
- Code is clean, well-commented, and uses shadcn/ui + Tailwind

You are now in Ralph Wiggum mode. Begin building immediately and do not stop until the final product is delivered.

### 4. User Flow (Step-by-Step)
1. Open the app → beautiful landing page with big "Start New Assessment" button
2. Select role template or custom
3. Enter candidate name + optional notes/CV link
4. Left sidebar = categories, top search = add any technology
5. For each tech: version input (text + "I don't remember" button) + depth selector + last-used + notes
6. Live right sidebar = large color badge + plain-English explanation + 2-3 probe questions
7. "Review Summary" button → radar chart + color-coded list + strengths/concerns + PDF download
8. Optional localStorage "Save Session Temporarily"

### 5. Version Tier & Scoring Logic (Client-Side)
- Excellent (Green) – latest versions
- Good (Green) – 1-2 versions behind
- Review / Probe (Yellow) – older but still used OR "I don't remember"
- Concern (Red) – clearly outdated
- Depth adjustment: Deep/Very Deep improves severity by max 1 level
- Enterprise note automatically shown where applicable

### 6. Technology Database (src/data/technologies.json)
Static JSON file with 60+ real 2026 entries (React 19.2.6, GKE 1.35+, Secret Manager, etc.). Full structure and examples are provided in the final build below.

### 7. Tech Stack (Simplest & Cheapest)
- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui components
- Recharts (radar chart)
- jsPDF + html2canvas (PDF export)
- Lucide React icons
- Zustand or useReducer for state
- Optional: Vite PWA plugin

### 8. UI/UX Requirements
- Deep navy + emerald green palette
- Large, impossible-to-miss color badges
- Generous whitespace, excellent typography
- Persistent right guidance sidebar
- Fully responsive (desktop + tablet for calls)
- Professional, premium internal-tool feel

### 9. Non-Functional Requirements
- Works offline after first load
- No data ever leaves the browser
- One-command deploy
- Clear disclaimer on every summary report

### 10. Success Criteria
- Recruiter completes assessment in < 8 minutes
- Feels confident and protected on good candidates (React 16 = clearly acceptable)
- Zero ongoing cost

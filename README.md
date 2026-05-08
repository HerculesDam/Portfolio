# Portfolio — Hércules Dâmaso

> **"Bridging industrial automation with modern software — factory floor to cloud."**

Terminal-themed, bilingual (EN/PT) developer portfolio with interactive CLI, animated code-rain, and full GitHub Pages compatibility.

**[Live → herculesdam.github.io/Portfolio](https://herculesdam.github.io/Portfolio/)**

---

## Features

| Feature | Description |
|---|---|
| 🖥️ **Interactive Terminal** | Real command-line interface: `help`, `whoami`, `ls projects`, `cat resume`, `neofetch`, `contact`, `clear`, `lang [en\|pt]`, `theme [dark\|light]`. Full command history, tab autocomplete. |
| 🎨 **Light + Dark Themes** | Toggle via terminal (`theme dark` / `theme light`) or button. Respects `prefers-color-scheme`. Persists in `localStorage`. |
| 🌐 **Bilingual System** | Every string translated EN ⇄ PT. Toggle via `lang en` / `lang pt` in terminal, or language switch button. |
| 🧠 **Typewriter Hero** | Cycles roles: Automation Engineer, Full-Stack Developer, IoT Enthusiast, Problem Solver. |
| 🌧️ **Canvas Code-Rain** | Matrix-style animated background. Disabled with `prefers-reduced-motion`. |
| 🕰️ **Experience Timeline** | Vertical scroll-triggered timeline: education, projects, milestones. |
| 📊 **Project Screenshot Gallery** | Visual project showcase with full-window gallery navigation. |
| 🎴 **3D Tilt Cards** | Pure CSS perspective tilt on project cards (~30 lines, zero dependencies). |
| 📄 **Print-Ready CV** | `resume.html` — styled with `@media print`, professional A4 layout. CTA: "Save as PDF →". |
| 📍 **Scroll Progress Bar** | Thin bar at viewport top showing reading progress. |
| ♿ **Accessibility** | WCAG 2.1 AA target. Full keyboard nav. `prefers-reduced-motion` support. Focus indicators. Semantic HTML5 landmarks. |
| 🔍 **SEO** | Open Graph, Twitter Cards, JSON-LD Person schema, canonical URL, robots.txt, sitemap.xml. |

---

## Tech Stack

- **Frontend:** HTML5 + CSS3 + Vanilla JavaScript
- **Styling:** CSS custom properties (dark/light themes), scoped component classes
- **Fonts:** JetBrains Mono + Inter, self-hosted subsets
- **Icons:** Font Awesome 6 (loaded async with `media="print"` swap)
- **Animations:** IntersectionObserver + CSS transitions, `requestAnimationFrame` for canvas
- **Data:** GitHub REST API (client-side fetch) with static JSON fallback
- **Hosting:** GitHub Pages (zero-cost, auto-deploy on push)

---

## File Structure

```
Portfolio/
├── index.html              # Main portfolio page (all sections)
├── resume.html             # Print-ready CV page
├── favicon.png             # Site favicon
├── robots.txt              # Search engine crawl rules
├── sitemap.xml             # XML sitemap
├── github-data.json        # Static GitHub API fallback data
├── README.md               # This file
├── .github/
│   └── workflows/
│       └── deploy.yml      # (Not needed — vanilla HTML deploys directly)
├── css/
│   └── style.css           # All styles (dark + light themes, responsive)
└── js/
    ├── main.js             # Terminal, scroll, tilt, theme, canvas, API
    └── translations.js     # All EN/PT string dictionaries
```

---

## Getting Started

### Live Site

Visit **[herculesdam.github.io/Portfolio](https://herculesdam.github.io/Portfolio/)** — no setup required.

### Local Development

```bash
# Clone the repo
git clone https://github.com/HerculesDam/Portfolio.git
cd Portfolio

# Serve with any static server (pick one)
python -m http.server 8080         # Python 3
npx serve .                        # Node.js
# or just open index.html in your browser
```

Open `http://localhost:8080` in your browser.

---

## Deployment

### Auto-Deploy via GitHub Pages

1. Push to `main` branch
2. Go to repo **Settings → Pages**
3. Set **Source** to `Deploy from a branch`
4. Select branch: `main`, folder: `/ (root)`
5. Click **Save**

The site will be live at `https://herculesdam.github.io/Portfolio/` within 1–2 minutes.

**No build step. No GitHub Actions. No npm.** Push and deploy.

---

## Customization

### Adding Real Testimonials

Edit `index.html`, find the testimonials section (marked with `<!-- TODO: replace with real testimonial -->`) and swap the placeholder text, name, role, and avatar emoji.

### Updating GitHub Projects

Edit `github-data.json` with your actual repos. The live API fetch will override this when GitHub is reachable; the JSON file is the fallback.

### Changing Colors

Edit `css/style.css`. All colors use CSS custom properties at `:root` (dark theme) and `[data-theme="light"]` (light theme):

```css
:root {
  --bg-primary: #0d1117;
  --terminal-green: #3fb950;
  --text-primary: #e6edf3;
  /* ... */
}
```

### Adding New Projects

In `js/translations.js`, look for `projectsEN` / `projectsPT` arrays. Add your project objects there.

---

## Accessibility Notes

- All interactive elements are keyboard-accessible
- Focus indicators visible in both themes
- Canvas animation disabled via `prefers-reduced-motion: reduce`
- Respects `prefers-color-scheme` for initial theme
- ARIA labels on terminal, navigation, and interactive regions

---

## Roadmap

- [ ] Portuguese version of all article/blog cards
- [ ] Real testimonials from collaborators
- [ ] Web component refactor for terminal (Astro migration)
- [ ] Automated PDF generation of CV at build time

---

## License

This portfolio is personal property of Hércules Dâmaso. Feel free to use the code and design patterns as inspiration for your own portfolio.

---

Built with ☕ + 🎯 by [Hércules Dâmaso](https://github.com/HerculesDam)
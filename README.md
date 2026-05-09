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

## License

This portfolio is personal property of Hércules Dâmaso. Feel free to use the code and design patterns as inspiration for your own portfolio.

---

Built with ☕ + 🎯 by [Hércules Dâmaso](https://github.com/HerculesDam)

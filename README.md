# Naveen Kumar — Portfolio

A FigJam-inspired personal workspace for a product designer, built with **plain HTML, CSS and vanilla JavaScript**. No frameworks, no build step, no backend. It deploys anywhere static files are served (Vercel, GitHub Pages, Netlify, plain Apache/nginx).

```
naveen-portfolio/
├── index.html          Homepage (hero board, work, about, process, experience, contact)
├── case-study.html     ONE reusable case-study template (renders by ?slug=…)
├── sidequests.html     Photography / video / experiments gallery + lightbox
├── styles.css          The whole design system & all page styles
├── data.js             ★ ALL content lives here — the single source of truth
├── script.js           Rendering, navigation and interactions (no libraries)
└── assets/
    ├── favicon.svg
    ├── og-image.png            Social share card
    ├── profile/naveen.jpg      Portrait used in About
    ├── projects/
    │   ├── designos/           cover.png, overview.png
    │   ├── design-engineering/ collaboration.png, overview.png, component-lifecycle.png, claude-skill.png, workflow-before.png, workflow-after.png
    │   ├── teacher-experience/ cover.jpg, before.jpg, app-tour.gif, dashboard.jpg, dashboard-card.jpg, konnect.jpg, class-view-before.jpg, class-view.jpg, syllabus.jpg, universal-card.jpg, other-features.jpg
    │   ├── school-admissions/  hero.jpg, user-journey.jpg, user-flow.jpg, onboarding.gif, dashboard.jpg, create-form.gif, manage-applications.jpg, school-profile.jpg
    │   ├── typography-system/  cover.jpg, framework-1…4.png, stand-out.png, figma-1…3.png, css-1…3.png, implementation-1…2.png
    │   └── revenue-optimization/ cover.jpg, solution-1…3.jpg, desktop-1440.jpg, hifi-2.jpg, hifi-3.jpg
    ├── sidequests/
    │   ├── photography/        (empty — add your photos here)
    │   ├── videography/        (empty — add your videos here)
    │   └── experiments/        (empty — add experiments here)
    └── resume/
        └── README.txt          Explains how to enable the Resume links
```

---

## 1. Run the site locally

The site is plain static files, but it **must** be served over HTTP (not opened via `file://`) because the case-study template reads the `?slug=` query parameter and fetches nothing — any tiny server works:

**Option A — Python (preinstalled on macOS/Linux):**

```bash
cd naveen-portfolio
python3 -m http.server 8080
# open http://localhost:8080
```

**Option B — Node:**

```bash
npx serve naveen-portfolio
```

**Option C — VS Code:** install the *Live Server* extension → right-click `index.html` → “Open with Live Server”.

---

## 2. Which file controls what

| File | Controls |
|---|---|
| `data.js` | **Everything you can read**: profile, hero notes, about facts, process steps, experience, all 6 projects (case-study text, images, metrics), sidequests. |
| `styles.css` | The look: colour tokens (CSS custom properties at the top), typography, sticky notes, cards, responsive rules. |
| `script.js` | Behaviour: rendering data.js into the pages, hero note dragging + connector lines, reveals, case-study template, sidequest filters & lightbox. |
| `index.html` / `case-study.html` / `sidequests.html` | Page skeletons and static text that never changes (headlines, nav, footer). |

**Golden rule:** to change content, edit `data.js`. You should almost never need to touch the HTML.

---

## 3. Adding a case study

1. **Add the images** to `assets/projects/<your-slug>/` (e.g. `assets/projects/checkout/cover.png`).
2. **Add one entry** to `portfolioData.projects` in `data.js`:

```js
{
  slug: "checkout",                       // becomes case-study.html?slug=checkout
  title: "Checkout Redesign",
  category: "B2B SaaS / Commerce",
  projectType: "Shipped product",          // or "Concept" / "Internal initiative"
  featured: false,                         // true = big card on the homepage
  summary: "One sentence that sells the project.",
  more: "One extra line revealed on hover.",
  tags: ["Commerce", "Flows"],
  role: "Product Designer",
  team: "2 designers, 4 engineers",        // or omit
  timeline: "2025",                        // or null
  heroImage: "assets/projects/checkout/cover.png",
  heroAlt: "Describe the screenshot for screen readers",
  links: [],                               // optional external links
  metrics: [                               // optional — shown under the intro
    { value: "32%", label: "Fewer support tickets" }
  ],
  snapshot: {                              // optional 4-card summary
    context:      { text: "…", color: "yellow" },
    problem:      { text: "…", color: "coral"  },
    contribution: { text: "…", color: "blue"   },
    outcome:      { text: "…", color: "mint"   }
  },
  sections: [                              // only the sections you need
    {
      id: "problem",
      label: "01 / The problem",
      heading: "What was going wrong",
      blocks: [
        { type: "paragraph", text: "Plain text with **bold** spans." },
        { type: "list", items: ["First point", "Second point"] },
        { type: "quote", text: "A pull quote." },
        { type: "cards", items: [{ title: "Card", text: "Card text" }] },
        { type: "steps", items: [{ title: "Step", text: "Detail" }] },
        { type: "metrics", items: [{ value: "40%", label: "what it means" }] },
        { type: "image", src: "assets/projects/checkout/a.png", alt: "…", caption: "Figure label" },
        { type: "gallery", images: [{ src: "…", alt: "…", caption: "…" }] },
        { type: "video", src: "assets/projects/checkout/demo.mp4", caption: "Demo" },
        { type: "link", note: "Prototype", label: "Try the interactive prototype", url: "https://…" }
      ]
    }
  ]
}
```

3. Done. The homepage grid, the case-study page, the “not found” page's project list and the previous/next navigation all update automatically. Never write a new HTML file.

**Block types available:** `paragraph`, `list`, `quote`, `cards`, `steps`, `metrics`, `image`, `gallery`, `video`, `link`. Text supports `**bold**` only — never raw HTML (the renderer builds DOM safely, so data.js cannot inject markup).

**Honesty rules built into the design:** leave out any section you don't have evidence for; label concepts as `Concept`; only use `metrics` for results you can defend.

---

## 4. Adding a photography item

1. Drop the image into `assets/sidequests/photography/` (portrait or landscape both work — the gallery is masonry).
2. Replace/add an entry in `portfolioData.sidequests`:

```js
{
  slug: "marina-evening",
  title: "Marina evening",
  category: "Photography",          // Photography | Videography | Experiments
  mediaType: "image",
  src: "assets/sidequests/photography/marina-evening.jpg",
  alt: "Factual description of the photograph",
  caption: "Short caption.",
  date: "2025-07",                  // optional
  location: "Chennai",              // optional
  color: "blue"                     // used only for placeholder frames
}
```

The current five entries are **intentional placeholders** — they keep the gallery design honest until real photographs replace them. Delete or replace them freely.

---

## 5. Adding a video

Three supported forms of `src` in a sidequest entry:

```js
// a) local file (put the MP4 in assets/sidequests/videography/)
src: "assets/sidequests/videography/reel.mp4", poster: "assets/sidequests/videography/reel-poster.jpg"

// b) YouTube
src: "https://www.youtube.com/watch?v=XXXXXXXXXXX"

// c) Vimeo
src: "https://vimeo.com/123456789"
```

- Local videos render a native `<video controls preload="none">` — nothing plays until clicked, and nothing autoplays with sound.
- YouTube/Vimeo links open inside the lightbox via a privacy-friendly embed (`youtube-nocookie.com`). Set `poster` if you also have a thumbnail — it is used as the local player poster.
- The same `video` block type works inside case studies: `{ type: "video", src: "…", caption: "…" }`.

---

## 6. Replacing the profile image and resume

**Profile photo:** overwrite `assets/profile/naveen.jpg` (square, ≥800×800 recommended) and update `alt` in `data.js → profile.photoAlt` if the description changes.

**Resume:**

1. Copy the PDF to `assets/resume/Naveen-Kumar-Resume.pdf`.
2. In `data.js`, change `profile.resume` from `null` to `"assets/resume/Naveen-Kumar-Resume.pdf"`.

The Resume link then appears automatically in the desktop nav, mobile menu and contact section. While `resume` is `null`, no dead resume link is rendered anywhere.

---

## 7. Deploying

### Vercel

1. Push this folder to a Git repository (or drag-and-drop the folder at vercel.com/new).
2. Framework preset: **Other**. Build command: *(empty)*. Output directory: *(empty / `./`)*.
3. Deploy. Add the custom domain `www.mrnk.in` under *Settings → Domains* and follow the DNS instructions (usually a `CNAME` to `cname.vercel-dns.com`).

### GitHub Pages

1. Create a repository (e.g. `portfolio`), push the contents of this folder.
2. *Settings → Pages → Deploy from branch* → `main` → `/ (root)`.
3. For a custom domain: add a file named `CNAME` containing `www.mrnk.in`, and point DNS at the GitHub Pages IP / `USERNAME.github.io`.

> **GitHub Pages note:** because `case-study.html?slug=…` uses a query string (not a path), it works on GitHub Pages without any 404 hacks.

---

## 8. Updating the domain & canonical metadata

All URLs live in two places:

1. **Static head tags** in each of the three HTML files — `link[rel=canonical]`, `og:url`, `og:image`. They currently point at `https://www.mrnk.in/…` (intentionally **not** the old GitHub Pages URL). Search-and-replace `https://www.mrnk.in` if the domain ever changes.
2. **`data.js → meta.siteUrl`** — used by `script.js` to write the per-project canonical URL, OG title/description and OG image when a case study opens. One change here updates every dynamic case study.

**SEO reality check (by design):** case-study titles/descriptions are set by JavaScript after load. Google renders JS, but crawlers without JS only see the base template metadata. If that ever matters, generate static `case-studies/*.html` files from `data.js` at deploy time — the data structure was designed to make that a mechanical step.

---

## Maintenance notes

- **Design tokens** live at the top of `styles.css` (`--paper`, `--ink`, `--yellow`, `--blue`, `--lilac`, `--mint`, `--coral`…). Change once, restyle everywhere.
- **Accessibility:** keyboard focus rings, skip link, `aria-pressed` filters, `aria-modal` lightbox with Escape/arrow-key support and scroll locking, `prefers-reduced-motion` support, lazy-loaded images, descriptive alt text.
- **No-JS behaviour:** hero notes, headlines, about, contact and all copy remain readable; only the project grid, timeline, gallery and case-study bodies require JS (they are rendered from data).
- **Placeholder policy:** no stock photos are used anywhere. Missing media renders as a designed placeholder frame that states what to add where — never a fake screenshot.

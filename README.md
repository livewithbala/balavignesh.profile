# Bala Vignesh S: Product Portfolio

Personal portfolio of **Bala Vignesh S**, Senior Product Owner with 8.5+ years building SaaS, PropTech ERP, CRM and AI-powered workflows across enterprise and regulated (HealthTech) domains.

The site is built like a product: value-led storytelling, interactive "product quirks", and a fast, dependency-free static codebase that works on phone, tablet and desktop.

## What's inside

**Profile (`index.html`)**

- Value-led hero with animated impact metrics and a 30-second summary
- "Why product" story, working principles and a four-step working loop (Discover, Define, Deliver, Prove)
- Selected work: eight anonymized case studies, with in-depth deep dives for key projects
- Career timeline styled as release notes
- Toolkit, technical fluency, background and certification
- One-click resume download and "Book a chat" call to action

**Product Lab (`lab.html`)**

- **Prioritization playground:** RICE, Value vs Effort, MoSCoW and Kano, with guidance on when to use each
- **User story writer:** generates a user story, Gherkin acceptance criteria and edge-case checks
- **Metrics tree builder:** North Star to input metrics for five product types
- **One-page PRD** about me, and a changelog

**Experience details**

- Command palette (`Cmd/Ctrl + K`) to jump anywhere
- Light and dark mode, with the system preference respected
- Responsive layout, mobile menu, keyboard navigation and reduced-motion support
- Print-friendly styles, social share image and structured data

## Tech

Plain HTML, CSS and vanilla JavaScript. No build step, no framework, no dependencies. Fonts load from Google Fonts (Inter, Instrument Serif, JetBrains Mono).

## Project structure

```text
.
├── index.html                  # Profile page
├── lab.html                    # Product Lab page
├── 404.html                    # Not-found page
├── content.js                  # All editable content (start here)
├── app.js                      # Shared behaviour and interactions
├── styles.css                  # Shared styles and theme
├── Bala_Vignesh_Resume.pdf     # Downloadable resume
├── headshot.jpg                # Portrait
├── favicon.jpg                 # Favicon
├── apple-touch-icon.png        # Home-screen icon
├── logos/                      # Employer logos shown in the career timeline
├── og.jpg                      # Social share image (1200x630)
└── robots.txt
```

## Run locally

No install needed. From the project folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. You can also open `index.html` directly in a browser.

## Updating content

Most changes live in **`content.js`**:

| What | Where |
| --- | --- |
| Email, LinkedIn, resume file | `email`, `linkedin`, `resumeUrl` |
| Booking link (Calendly, Cal.com and similar) | `bookingUrl` (empty falls back to a pre-filled email) |
| Case studies and deep dives | `cases` |
| Working loop and principles | `how`, `expect`, `need`, `calls` |
| Skim summary, story, positioning | `skim`, `story`, `positioning` |
| Education and certification | `education`, `certifications` |
| Testimonials | `testimonials` (the section stays hidden until you add one) |

Optional fields such as `decisions` and `metrics` inside a case-study `deep` object only render when filled in, so nothing half-finished appears publicly.

Static text on the profile page, such as the career timeline and toolkit chips, is edited directly in `index.html`.

## Deploy

Because it is a static site, any static host works.

**GitHub Pages**

1. Go to **Settings, then Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
3. Save. The site will be live at `https://<username>.github.io/<repo>/`.

**Netlify or Vercel:** import the repository, leave the build command empty and set the publish directory to `/`.

**After you have a custom domain**

- Make the `og:image` and `twitter:image` URLs absolute (for example `https://yourdomain.com/og.jpg`) so social previews work reliably.
- Add your domain to a `sitemap.xml` if you want one.

## Cache busting

Visitors always get fresh files without a hard reload:

- **Versioned links:** every CSS, JS and image link carries `?v=<timestamp>`. A new version means a new URL, so browsers fetch the file again.
- **Freshness check:** each page compares its `site-version` meta tag with `version.json` (fetched uncached). If a newer deploy exists, the page reloads once.
- **Headers:** `_headers` (Netlify) and `vercel.json` make HTML and the version file always revalidate. GitHub Pages cannot set headers, so it relies on the first two.

**Before every deploy**, run:

```bash
bash bump-version.sh
```

then commit and push. It updates all `?v=` links, the `site-version` meta tags and `version.json` in one go.

## Notes

- Case studies are intentionally anonymized and client details are generalized.
- The downloadable resume is a static PDF. Replace `Bala_Vignesh_Resume.pdf` to update it.

## Contact

- LinkedIn: <https://www.linkedin.com/in/bala-vignesh-742b55106/>

## License

Content, copy and photography are © Bala Vignesh S. Please do not reuse them without permission. You are welcome to take inspiration from the structure and ideas.

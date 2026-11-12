# Leo's Home Experts

**Landing page for a home services company in Houston, TX** — patio construction and remodeling, motorized screens and awnings, with a quote request form, video gallery and local SEO.

**Live:** [leos-home-experts.vercel.app](https://leos-home-experts.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38b2ac?logo=tailwindcss)

## What it does

- **One-page landing** with hero, services, why choose us, photo gallery, video gallery, testimonials, service areas and contact.
- **Services:** patio build and remodeling, motorized screens and awnings, each with its own video (hosted on Cloudinary).
- **Quote request form:** validated with React Hook Form and Zod and sent by a Server Action with Resend. For motorized screens it also asks for color and number of shades, and the email subject includes them.
- **Conversion:** click-to-call in the header, hero, footer and a floating call button.
- **Local SEO:** metadata, JSON-LD (HomeAndConstructionBusiness, Service, opening hours, service areas), sitemap and robots.
- **Performance:** mobile-first layout, dynamic imports and optimized images (`scripts/optimize-images.mjs`).

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router, Server Actions), React 19, TypeScript |
| UI | Tailwind CSS 4, shadcn/ui (Radix), Framer Motion, Embla Carousel, lucide-react |
| Forms | React Hook Form, Zod |
| Email | Resend |
| Media | Cloudinary (videos), Sharp (images) |
| Hosting | Vercel |

## Project structure

```
src/
  app/              layout, home page, robots and sitemap
  actions/          contact / quote Server Action
  components/
    layout/         header and footer
    sections/       landing sections, contact and quote forms
    seo/            JSON-LD structured data
    ui/             shadcn/ui components
  lib/              site config, services, testimonials, Zod schemas
scripts/            image optimization
```

## Getting started

**Requirements:** Node.js 20.9+ and a Resend API key.

```bash
git clone https://github.com/caballerorandy6/leos-home-experts.git
cd leos-home-experts
npm install
echo "RESEND_API_KEY=your_key" > .env.local
npm run dev      # http://localhost:3000
```

### Environment variables

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends quote request emails (recipients are set in `src/lib/constants.ts`) |

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |

## Author

**Randy Caballero** — Full-Stack Developer, Houston, TX
[rcweb.dev](https://rcweb.dev) · [LinkedIn](https://linkedin.com/in/caballerorandy) · [GitHub](https://github.com/caballerorandy6)

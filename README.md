# Leo's Home Experts

Landing page for Leo's Home Experts, a home services company specializing in patio construction, motorized screens, and awnings in Houston, TX.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TailwindCSS 4, shadcn/ui
- **Forms:** React Hook Form + Zod validation
- **Email:** Resend
- **Videos:** Cloudinary
- **Fonts:** Geist (via next/font/google)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Resend API key

### Installation

```bash
# Clone the repository
git clone https://github.com/caballerorandy6/leos-home-experts.git

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your Resend API key to .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | API key from [Resend](https://resend.com/api-keys) | Yes |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Homepage
│   ├── globals.css       # Global styles and theme
│   ├── robots.ts         # SEO robots.txt
│   └── sitemap.ts        # SEO sitemap
├── actions/
│   └── contact.ts        # Server action for contact form
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/
│   │   ├── landing/      # Page sections (Hero, Services, etc.)
│   │   ├── contact-form.tsx
│   │   └── quote-form.tsx
│   ├── seo/              # JSON-LD structured data
│   ├── studio/           # Reusable UI components
│   └── ui/               # shadcn/ui components
└── lib/
    ├── constants.ts      # Site config, services, testimonials
    ├── utils.ts          # Utility functions
    └── validations.ts    # Zod schemas
```

## External Services

### Resend (Email)
- Used for contact form submissions
- Emails sent to configured recipients in `src/lib/constants.ts`

### Cloudinary (Videos)
- Service videos hosted at: `res.cloudinary.com/caballerorandy/video/upload/`
- Video IDs configured in `src/components/sections/landing/services-section.tsx`

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Or connect the GitHub repository to [Vercel](https://vercel.com) for automatic deployments.

### Environment Variables on Vercel

Add `RESEND_API_KEY` in Project Settings > Environment Variables.

## Features

- Responsive design (mobile-first)
- SEO optimized (meta tags, JSON-LD, sitemap, robots.txt)
- Contact form with validation and email notifications
- Video gallery with Cloudinary integration
- Accessibility compliant
- Performance optimized (dynamic imports, image optimization)

## Contact

- **Website:** [ac-remodelingservice.com](https://www.ac-remodelingservice.com)
- **Phone:** +1 (346) 219-9138
- **TikTok:** [@leoshomeexpert](https://tiktok.com/@leoshomeexpert)

# Specter Visual Lab — Next.js / TypeScript System Rebuild

A fresh **Next.js App Router + TypeScript** implementation of the system, navigation, service catalog, pricing interactions, project intake, and careers workflow found in `masudrana430/specter_visual_lab`.

This is intentionally **not a design clone**. The visual layer is neutral and easy to replace. The system/data/components are separated so a redesign does not require rebuilding the application logic.

## Stack

- Next.js 16.3.5 (App Router)
- React 19.2
- TypeScript
- Route Handlers for project, careers, and newsletter submissions
- No UI framework or component library dependency

## Routes / navigation

| Route | Purpose |
| --- | --- |
| `/` | Homepage system overview, services, industries, comparison demo, testimonials, stats, portfolio, about/careers calls-to-action |
| `/services` | All 13 service disciplines with scene/progress navigation |
| `/pricing` | Five studio tiers, expandable features, 13-service pricing filter, volume/scope bands, FAQ |
| `/about` | Vision, mission, process videos, values, project CTA |
| `/careers` | 13-sector multi-select and validated application flow |
| `/start-a-project` | Tier selection, custom-service builder, client/timezone data, reference files, success recap |
| `/blog` | Blog/Insights route placeholder |
| `/terms` | Terms route placeholder |
| `/privacy` | Privacy route placeholder |
| `/security` | Security route placeholder |

## 13 service disciplines

1. AI Agent Development
2. Business Sketch
3. Branding
4. Product Sketch
5. Product Design
6. Graphic Design
7. Website Design & Development
8. App Building & Development
9. Image Editing
10. Video Editing
11. Product Promo
12. SEO
13. Marketing Campaigns

Each discipline has a shared data object in `src/data/site.ts`, including its category, description, unit, and sub-services. Change content there once and the relevant service/pricing/project/careers UIs stay synchronized.

## Preserved systems and interactions

### Global
- Sticky header state
- Desktop + mobile navigation
- All main navigation items and project CTA
- Newsletter submission feedback
- Responsive layout
- Keyboard/accessibility attributes on interactive selectors

### Homepage
- Industry list
- 13-service overview
- Before/after comparison with four source categories
- Why-us system
- Testimonials
- Stats counters using `IntersectionObserver`
- Six portfolio entries
- About, careers, and project calls-to-action

### Services
- 13 dedicated service sections
- Active service tracking with `IntersectionObserver`
- Progress navigation that jumps to a service
- Sub-service/scopes display
- Deep links into project intake

### Pricing
- Starter, Basic, Growth, Premium, Enterprise tiers
- Expand/collapse extra tier features
- 13-service detailed-pricing filter
- URL hash support for direct service pricing links
- Two offering groups per discipline
- Four volume/scope bands including Popular / Best-value-style / Custom Quote patterns
- Pricing FAQ

### Start a Project
- Starter / Basic / Growth / Premium / Custom selection
- Growth is the normal default
- Query-prefill support: `?tier=...` and `?service=...`
- Custom tier exposes multi-service configuration
- Dynamic sub-service options based on selected discipline
- Quantity, target date, and target time
- Add/remove multiple service rows
- Client name/email/phone/country/timezone/preferred-connect-window fields
- Searchable country/dial-code picker
- Multi-timezone selection when applicable
- Dhaka GMT+6 coordination note
- Optional project message
- Up to 5 JPG/PNG/WEBP references, max 10MB each
- Drag/drop, validation, attachment list, removal
- Server Route Handler validation
- Success recap + reset

### Careers
- Multi-select across all 13 sectors
- Live selected-sector summary
- Selected sector removal from the application
- Required name/phone/email/location
- Required CV: PDF/DOC/DOCX up to 10MB
- Drag/drop CV validation and removal
- Optional portfolio link and message
- Server Route Handler validation
- Success state + reset

## Submission behavior

The original repository mainly simulates successful form submission on the client. This rebuild adds working Next.js Route Handlers:

- `POST /api/newsletter`
- `POST /api/careers`
- `POST /api/project-inquiries`

They validate incoming data and return request/application IDs. They intentionally **do not persist data or email anyone yet**. Integration comments are included where you can add:

- PostgreSQL / Supabase / Prisma
- S3 / R2 / Vercel Blob for file storage
- Resend or another mail provider
- Slack/Discord/CRM webhooks
- Project management integrations

## Country data

The original static script embeds a very large world-country/dial-code/timezone array. In this rebuild the same searchable country → dial-code → timezone behavior is isolated in `src/data/countries.ts`, with a practical curated country set. You can replace that single file with a complete ISO/telephony dataset without changing `ProjectWizard.tsx`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm start
```

## Where to customize the design

The logic is already separated from presentation. The main styling file is:

`src/app/globals.css`

You can replace it entirely, or progressively move components into Tailwind/shadcn/your preferred design system. Core content/data lives in `src/data/*` and application behavior lives in `src/components/*`.

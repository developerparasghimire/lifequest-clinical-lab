# Life Quest Clinical Lab

A production-ready Next.js 16 website for a clinical diagnostics lab, including:

- Public marketing site (home, about, services, blog, appointments, contact)
- Admin panel at **`/questlife-admin`** with full CRUD for appointments, services,
  blog posts, banners, testimonials, branches, contact messages, newsletter
  subscribers and site settings
- Newsletter signup (stored in DB)
- NextAuth v5 credentials auth
- Prisma ORM on **PostgreSQL** (designed for Neon)

## Tech stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- React 19 + Tailwind CSS 4 + Framer Motion
- Prisma 6 + PostgreSQL (Neon)
- NextAuth v5 (Credentials)
- Nodemailer (optional SMTP)

## Local development

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env.local
# fill DATABASE_URL (Neon), AUTH_SECRET (openssl rand -base64 32), NEXT_PUBLIC_SITE_URL

# 3. Push schema & seed
npm run db:push
npm run db:seed

# 4. Start dev server
npm run dev
```

Default admin login (after seed):

- URL: <http://localhost:3000/questlife-admin/login>
- Email: `admin@medlab.com`
- Password: `Admin@123`

> **Change the password immediately in production via `npm run db:seed` after editing `prisma/seed.ts`.**

## Deploy to Vercel + Neon

### 1. Create a Neon database

1. Sign up at <https://neon.tech>
2. Create a project → copy the **pooled** connection string
   (looks like `postgresql://USER:PASS@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require`)

### 2. Push the schema to Neon

From your local machine (one-time):

```bash
DATABASE_URL="postgres://...neon-pooled..." npm run db:push
DATABASE_URL="postgres://...neon-pooled..." npm run db:seed
```

### 3. Import the repo into Vercel

1. Push this repo to GitHub.
2. <https://vercel.com/new> → Import → select repo.
3. Framework: **Next.js** (auto-detected). No overrides needed — `npm run build` runs `prisma generate && next build`.
4. **Environment Variables** — add:

   | Name                     | Value                                                       |
   | ------------------------ | ----------------------------------------------------------- |
   | `DATABASE_URL`           | Neon pooled connection string                               |
   | `AUTH_SECRET`            | `openssl rand -base64 32`                                   |
   | `NEXT_PUBLIC_SITE_URL`   | `https://your-domain.vercel.app`                            |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `9779802302471`                                        |
   | `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` / `ADMIN_EMAIL` | optional — for booking & contact emails |

5. Click **Deploy**.

### 4. Post-deploy

- Visit `https://<your-domain>/questlife-admin/login`
- Sign in with `admin@medlab.com` / `Admin@123` and change the password / email.

## Scripts

| Script            | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Local dev server (http://localhost:3000)  |
| `npm run build`   | `prisma generate && next build`           |
| `npm run start`   | Start production server                   |
| `npm run lint`    | ESLint                                    |
| `npm run db:push` | Push Prisma schema to DB (no migrations)  |
| `npm run db:seed` | Run `prisma/seed.ts`                      |
| `npm run db:studio` | Prisma Studio (DB GUI)                  |

## Project layout

```
src/
  app/
    (site)/        public marketing pages
    questlife-admin/ admin panel (auth-gated)
    api/           REST API routes (CRUD)
  components/
  data/services.ts hard-coded test catalogue (529 tests)
  lib/             prisma, cms helpers, email, utils
  auth.ts          NextAuth config
  proxy.ts         Edge middleware (auth gate for /questlife-admin)
prisma/
  schema.prisma    Postgres models
  seed.ts          initial data
public/            static images & logo
```

## Notes

- Image uploads are stored in `public/uploads/` (local-only; for production
  use a remote object store such as Vercel Blob or Cloudflare R2).
- All admin pages and the site footer query the DB on every request
  (`export const dynamic = "force-dynamic"`) so build does not require a
  reachable database.

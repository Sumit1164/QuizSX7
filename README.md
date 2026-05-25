# QuizSX7

QuizSX7 is a Next.js placement-practice MVP for B-Tech students. It includes public SEO pages, Firebase Authentication, NeonDB + Prisma data models, admin question entry, MCQ tests, scoring, profile history, and PWA metadata.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill Firebase, Firebase Admin, NeonDB, and admin email values.

3. Prepare the database:

```bash
npm run db:push
npm run db:seed
```

4. Start development:

```bash
npm run dev
```

## Key Routes

- `/` public home
- `/practice` subject list
- `/practice/aptitude/clock` sample MCQ test
- `/login` Firebase login/signup
- `/profile` saved attempts
- `/admin` protected question entry
- `/companies/tcs` SEO company path

# SplitSync

A real-time group expense tracker built for splitting costs without the drama. Create a group, share the invite code, and watch expenses update instantly as your group adds them.

## Features

- Create expense groups and share via invite code
- Add expenses with category, amount, and payer
- Real-time updates powered by Supabase Realtime
- Spending breakdown by category with interactive pie chart
- Daily spending visualization with bar chart
- Top spender tracking per group
- Name persistence via localStorage — no account required

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL + Realtime)
- **Styling:** TailwindCSS + Shadcn UI
- **Data Fetching:** TanStack React Query + useMutation
- **Charts:** Recharts
- **Validation:** Zod

## Getting Started

1. Clone the repository
```bash
   git clone https://github.com/RomyVSoto/splitsync.git
   cd splitsync
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env.local` file with your Supabase credentials

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

4. Run the development server
```bash
   npm run dev
```

## Database Schema

```sql
CREATE TABLE groups (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name varchar NOT NULL,
  invite_code text NOT NULL,
  created_at timestamp DEFAULT now()
);

CREATE TABLE expenses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id uuid REFERENCES groups(id),
  description text,
  amount numeric(10,2),
  category varchar,
  paid_by varchar,
  created_at timestamp DEFAULT now()
);
```
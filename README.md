# GiftBound 🎁

A premium, secure, and login-free Secret Santa organizer built with **Next.js 15**, **Supabase**, and **Resend**.

![GiftBound Banner](/public/hero.png)

## ✨ New Features

### 🎨 Visual & UX Overhaul

- **Premium Design**: A fully redesigned, "lifeful" landing page with 3D-style assets and glassmorphism UI.
- **Custom Assets**: Custom gift-box favicon and high-quality feature graphics.
- **Polished UX**: Professional `Lucide` icons, smooth Framer Motion animations, and intuitive navigation (Home button).
- **Admin Dashboard**: Organizers can now **Kick** participants, **Resend** invite emails, and **Close** events completely.

### 🔒 Security Hardening

- **Authentication**: Replaced simple UUIDs with signed **JWTs** (JSON Web Tokens) for secure, stateless authentication.
- **Email Verification**: Magic links are sent via email (Resend API) to verify ownership before joining.
- **Rate Limiting**: Custom middleware to prevent spam and enumeration attacks.
- **Strict Authorization**: Role-based access control (Host vs. Participant) enforced on all server actions.

### 🛡️ Data Integrity

- **Transactional Shuffle**: Atomic shuffling using PostgreSQL RPC functions to prevent race conditions.
- **Audit Logging**: Comprehensive audit trail for critical actions (Create, Join, Shuffle, Kick).
- **Status Timeline**: Visual event lifecycle tracking (Draft -> Active -> Completed).

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL + RPC)
- **Email**: [Resend](https://resend.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Security**: `jose` (JWT), `server-only` context
- **Testing**: `vitest`

## 🚀 Setup Instructions

1. **Clone & Install**

   ```bash
   git clone https://github.com/shubhamxgupta1/giftbound.git
   cd giftbound
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # App URL (for Magic Links)
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Security
   JWT_SECRET=your_super_secret_jwt_key

   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
   ```

3. **Database Setup**
   Run the SQL scripts in `src/lib/` via Supabase SQL Editor:
   - `schema.sql`: Tables and basic policies.
   - `rpc_shuffle.sql`: Atomic shuffle function.
   - `audit_schema.sql`: Audit logging table.

4. **Run Development Server**

   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## 📄 License

MIT

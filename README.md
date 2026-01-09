# GiftBound 🎁

A modern, login-free Secret Santa organizer built with Next.js and Supabase.

![GiftBound Banner](/public/og-image.png)

## Features

- 🚀 **No Login Required**: Participants join with a code and email.
- 🎨 **Beautiful UI**: Built with Tailwind CSS, Framer Motion, and shadcn/ui.
- 🌙 **Dark Mode**: Fully supported using `next-themes`.
- 🔄 **Real-time Updates**: Event status and assignments update automatically.
- 🔒 **Secure**: UUID-based magic tokens for participant access.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Detailed Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/giftbound.git
   cd giftbound
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

   > **Note**: This app uses the Service Role Key for server-side actions to manage assignments securely.

4. **Database Schema**
   Run the SQL commands found in `src/lib/schema.sql` in your Supabase SQL Editor to set up the tables and security policies.

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## License

MIT

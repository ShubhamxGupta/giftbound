import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { JsonLd } from "@/components/json-ld";
import Link from "next/link";
import Image from "next/image";
import { Users, Building2, CalendarCheck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secret Santa for Teams & Office Parties | GiftBound",
  description:
    "The easiest way to organize an Office Secret Santa. Perfect for remote teams and workplaces. Free, private, and no accounts required.",
  keywords: [
    "Office Secret Santa",
    "Secret Santa for Teams",
    "Corporate Gift Exchange",
    "Team Building Holiday Activity",
  ],
  alternates: {
    canonical: "/teams",
  },
};

export default function TeamsPage() {
  return (
    <div className="flex min-h-screen flex-col text-foreground overflow-x-hidden">
      <JsonLd />{" "}
      {/* Re-inject schema if needed, though layout usually handles global app schema. We might add specialized Event schema here later */}
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/favicon.png"
            alt="GiftBound Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-xl font-bold tracking-tight">GiftBound</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary hidden sm:block"
          >
            Home
          </Link>
          <ThemeToggle />
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center text-center">
        {/* Abstract Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50 dark:opacity-30" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium border border-blue-500/20 mb-4">
            <Building2 className="w-4 h-4" />
            <span>Perfect for Remote & Hybrid Teams</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
            Host the Perfect
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              Office Secret Santa
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Boost team morale with a hassle-free gift exchange. No spreadsheets,
            no &quot;reply-all&quot; emails. Just festive fun for your
            department or entire company.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/create" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-7 rounded-full font-bold shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 bg-blue-600 hover:bg-blue-700"
              >
                Create Team Event
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Why Teams Love Us */}
      <section className="py-24 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Why HR & Managers Love GiftBound
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We solve the logistical headaches of organizing office events.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="w-10 h-10 text-blue-500" />}
              title="Unlimited Participants"
              description="Whether you have a team of 5 or a company of 500, we handle the shuffling instantly."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-10 h-10 text-green-500" />}
              title="HR Compliant Privacy"
              description="We don't sell employee data. No accounts or passwords required for participants."
            />
            <FeatureCard
              icon={<CalendarCheck className="w-10 h-10 text-purple-500" />}
              title="Set Deadlines & Budgets"
              description="Clearly communicate price limits and party dates to avoid awkward gifting moments."
            />
          </div>
        </div>
      </section>
      {/* Guide Content */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          How to run a successful Office Secret Santa
        </h2>
        <div className="prose dark:prose-invert max-w-none space-y-6 text-lg text-muted-foreground">
          <p>
            Organizing a holiday gift exchange for work can be tricky. You have
            to balance budgets, diverse interests, and remote logistics.
            Here&apos;s how GiftBound makes it easy:
          </p>
          <h3 className="text-2xl font-bold text-foreground">
            1. Set a Reasonable Budget
          </h3>
          <p>
            Keep it inclusive. A range of $20–$30 is usually the sweet spot for
            professional environments. It allows for thoughtful gifts without
            breaking the bank.
          </p>
          <h3 className="text-2xl font-bold text-foreground">
            2. Use Wishlists
          </h3>
          <p>
            There&apos;s nothing worse than getting a gift you can&apos;t use.
            GiftBound lets every employee add their own wishlist, so their Santa
            has clear guidance while keeping the surprise alive.
          </p>
          <h3 className="text-2xl font-bold text-foreground">3. Key Dates</h3>
          <p>
            Make sure to set the RSVP deadline at least a week before the party
            date to give people time to shop!
          </p>
        </div>
      </section>
      <section className="py-20 bg-blue-600 text-white text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to celebrate with your team?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of teams using GiftBound this holiday season.
        </p>
        <Link href="/create">
          <Button
            size="lg"
            variant="secondary"
            className="text-blue-600 font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl"
          >
            Start Team Exchange
          </Button>
        </Link>
      </section>
      <footer className="py-12 px-6 border-t border-border/50 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-muted-foreground">
              GiftBound for Teams
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            <Link href="/" className="hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow hover:border-blue-500/20 group">
      <div className="mb-4 bg-background w-16 h-16 rounded-2xl flex items-center justify-center border border-border group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

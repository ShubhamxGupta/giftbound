import { ThemeToggle } from "@/components/theme-toggle";
import { JsonLd } from "@/components/json-ld";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { GuideContent } from "./guide-content";

export const metadata: Metadata = {
  title: "How It Works | GiftBound Help Center",
  description:
    "Learn how to create events, invite friends via magic links, and organize a secure Secret Santa exchange in minutes.",
  keywords: [
    "How to use GiftBound",
    "Secret Santa Help",
    "Secret Santa Rules",
    "Gift Exchange Guide",
    "Safe Secret Santa",
  ],
  alternates: {
    canonical: "/guide",
  },
};

export default function GuidePage() {
  return (
    <div className="flex min-h-screen flex-col text-foreground overflow-x-hidden">
      <JsonLd />
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
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
            className="text-sm font-medium hover:text-primary hidden sm:block transition-colors"
          >
            Home
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block animate-in fade-in slide-in-from-bottom-2">
            Help Center
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            Everything you need for a <br className="hidden md:block" /> Perfect
            Exchange
          </h1>
          <p className="text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-6 duration-700">
            Clear steps for hosts and participants. Safe, simple, and
            surprise-guaranteed.
          </p>
        </div>

        {/* Interactive Content */}
        <GuideContent />
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50 bg-muted/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-muted-foreground">
              GiftBound Guide
            </span>
          </div>
          <div className="text-sm text-muted-foreground flex gap-6">
            <Link
              href="/create"
              className="hover:text-primary transition-colors"
            >
              Create Event
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Gift,
  Clock,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Lock,
  EyeOff,
  UserPlus,
  Send,
  Shuffle,
  Mail,
  CheckCircle2,
} from "lucide-react";

export function GuideContent() {
  const [view, setView] = useState<"host" | "participant">("host");

  return (
    <div className="space-y-24">
      {/* Quick Overview */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-card p-6 rounded-2xl border border-border/50 text-center space-y-4">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-primary">
            <Gift className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold">What is it?</h3>
          <p className="text-muted-foreground">
            A free, passwordless Secret Santa generator. No accounts needed—just
            fun.
          </p>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border/50 text-center space-y-4">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-primary">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold">Who is it for?</h3>
          <p className="text-muted-foreground">
            Friends, families, and office teams looking for a simple, private
            exchange.
          </p>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border/50 text-center space-y-4">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-primary">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold">How long?</h3>
          <p className="text-muted-foreground">
            Set up an event in under 2 minutes. Participants join in seconds.
          </p>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section id="how-it-works" className="scroll-mt-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Choose your role to see the steps
          </p>

          <div className="inline-flex bg-muted p-1 rounded-full relative">
            <button
              onClick={() => setView("host")}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-200 ${
                view === "host"
                  ? "bg-background shadow-md text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              I'm the Host
            </button>
            <button
              onClick={() => setView("participant")}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-200 ${
                view === "participant"
                  ? "bg-background shadow-md text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              I'm a Participant
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {view === "host" ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Step
                number={1}
                title="Create an Event"
                icon={<UserPlus className="w-6 h-6" />}
                description="Enter your name and event details. You'll get a unique Event Dashboard link. Keep this safe!"
              />
              <Step
                number={2}
                title="Invite Participants"
                icon={<Mail className="w-6 h-6" />}
                description="Share the magic invite link with your group via WhatsApp, Email, or Slack."
              />
              <Step
                number={3}
                title="Shuffle & Assign"
                icon={<Shuffle className="w-6 h-6" />}
                description="Once everyone joins, click 'Shuffle'. We automatically email everyone their match."
              />
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Step
                number={1}
                title="Click the Invite Link"
                icon={<Send className="w-6 h-6" />}
                description="Click the link shared by your host. No app download required."
              />
              <Step
                number={2}
                title="Join with Email"
                icon={<Mail className="w-6 h-6" />}
                description="Enter your name and email. We use this only to send your match."
              />
              <Step
                number={3}
                title="View Your Match"
                icon={<Gift className="w-6 h-6" />}
                description="After the host shuffles, check your inbox to see who you are gifting to!"
              />
            </div>
          )}
        </div>
      </section>

      {/* Safety & Trust */}
      <section className="bg-muted/30 rounded-3xl p-8 md:p-12 border border-primary/20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-green-500/10 text-green-600 rounded-2xl mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Safe, Private & Secure</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We built GiftBound to be as private as a paper slip, but smarter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <SafetyCard
            icon={<Lock className="w-5 h-5 text-primary" />}
            title="Private Assignments"
            desc="Who you drew is for your eyes only. Even the host can't see the full list of matches."
          />
          <SafetyCard
            icon={<EyeOff className="w-5 h-5 text-primary" />}
            title="No Tracking"
            desc="We don't track you across the web or sell your data. Emails are used strictly for the exchange."
          />
          <SafetyCard
            icon={<CheckCircle2 className="w-5 h-5 text-primary" />}
            title="Tamper Proof"
            desc="Once shuffled, assignments are locked. No 'reshuffling' until you get the person you want."
          />
          <SafetyCard
            icon={<Users className="w-5 h-5 text-primary" />}
            title="Magic Links"
            desc="Secure access without passwords. Unique tokens ensure only the right person can join."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Common Questions
        </h2>
        <div className="space-y-4">
          <AccordionItem
            question="Do I need to create an account?"
            answer="No! GiftBound is completely passwordless. Hosts and participants use secure magic links to access the event."
          />
          <AccordionItem
            question="Can assignments be changed after shuffling?"
            answer="No. To ensure fairness and trust, assignments are permanent once the host clicks Shuffle. If there's a critical error, you would need to create a new event."
          />
          <AccordionItem
            question="What if someone joins late?"
            answer="You should wait until everyone has joined before shuffling. Once shuffled, new participants cannot be added to the circle."
          />
          <AccordionItem
            question="Is my email visible to everyone?"
            answer="No. Your email is only visible to the Host (to manage the event). Other participants only see your Name."
          />
          <AccordionItem
            question="Can I create a wishlist?"
            answer="Yes! After joining, you can add gift preferences or a wishlist link so your Secret Santa knows what to get you."
          />
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold mb-6">Ready to start?</h3>
        <Link href="/create">
          <Button
            size="lg"
            className="rounded-full px-10 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Create Your Event
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  icon,
  description,
}: {
  number: number;
  title: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="flex gap-6 items-start p-6 bg-card rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
      <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl shadow-lg relative z-10">
        {number}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="text-muted-foreground">{icon}</div>
        </div>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function SafetyCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4 p-5 bg-background rounded-xl border border-border shadow-sm">
      <div className="mt-1 bg-primary/10 p-2 rounded-lg">{icon}</div>
      <div>
        <h4 className="font-bold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border rounded-xl bg-card overflow-hidden transition-all duration-300 ${
        isOpen ? "border-primary/50 shadow-md" : "border-border/50"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-medium transition-colors hover:bg-muted/30"
      >
        <span
          className={`text-lg transition-colors ${isOpen ? "text-primary font-bold" : "text-foreground"}`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            className={`w-5 h-5 transition-colors ${isOpen ? "text-primary" : "text-muted-foreground"}`}
          />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} // Spring-like easing
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 pt-2 text-muted-foreground leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

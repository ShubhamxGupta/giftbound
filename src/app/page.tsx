import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { Gift, Sparkles, ShieldCheck, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto md:px-8">
        <div className="flex items-center gap-2">
          <Image
            src="/favicon.png"
            alt="GiftBound Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-xl font-bold tracking-tight">GiftBound</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/guide"
            className="text-sm font-medium hover:text-primary transition-colors hidden sm:block"
          >
            How it Works
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center text-center">
        {/* Abstract Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50 dark:opacity-30" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/30 text-secondary-foreground text-sm font-medium border border-secondary/20 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>The #1 Free Secret Santa Generator</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight drop-shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            The Easiest Way to <br className="hidden md:block" />
            Play{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
              Secret Santa
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Organize your holiday gift exchange in seconds. No accounts
            required, totally private, and free. Perfect for friends, families,
            and office parties.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href="/create" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-7 rounded-full font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95"
              >
                Start an Exchange
              </Button>
            </Link>
            <Link href="/join" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 py-7 rounded-full font-bold border-2 hover:bg-muted transition-all bg-background/50 backdrop-blur-sm"
              >
                Join Event
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-20 md:mt-28 relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-border/50 animate-in fade-in zoom-in-95 duration-1000 delay-500">
          <div className="aspect-[16/9] w-full bg-muted/20 relative">
            <Image
              src="/hero.png"
              alt="Friends celebrating holiday with gifts"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40"></div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-border/50 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
              50k+
            </p>
            <p className="text-muted-foreground font-medium">Participants</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
              10k+
            </p>
            <p className="text-muted-foreground font-medium">Events Created</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
              100%
            </p>
            <p className="text-muted-foreground font-medium">Free & Private</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30 relative" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Why choose GiftBound?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;ve stripped away the complexity so you can focus on the
              giving.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShieldCheck className="w-10 h-10 text-green-500" />}
              title="Totally Private"
              description="No accounts required. We don't sell your emails. Your event details are encrypted and secure."
            />
            <FeatureCard
              icon={<Gift className="w-10 h-10 text-primary" />}
              title="Smart Shuffling"
              description="Our specialized algorithm prevents self-matches and spouse-matches (coming soon!) to ensure a fair draw."
            />
            <FeatureCard
              icon={<Mail className="w-10 h-10 text-blue-500" />}
              title="Wishlists Built-in"
              description="Participants can add wishlists directly to their profile, so their Secret Santa knows exactly what to get."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        className="py-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16"
        id="how-it-works"
      >
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Focus on the Gift,
            <br />
            Not the Spreadsheet.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Stop using hats and scraps of paper. GiftBound handles the messy
            part invitations, shuffling, and wishlists so you can enjoy the
            holiday cheer.
          </p>

          <div className="space-y-6 pt-4">
            <StepItem
              number="1"
              title="Create an event"
              description="Set a budget, date, and details in seconds."
            />
            <StepItem
              number="2"
              title="Invite friends"
              description="Share a simple link. No app download needed."
            />
            <StepItem
              number="3"
              title="We shuffle!"
              description="Everyone gets their match via email instantly."
            />
          </div>

          <div className="pt-4">
            <Link href="/create">
              <Button size="lg" className="rounded-full font-bold px-8">
                Create your Event Now
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl md:skew-y-3 md:hover:skew-y-0 transition-all duration-700 bg-black/20">
          <Image
            src="/shuffle.png"
            alt="GiftBound magic shuffling animation interface"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card/50 border-y border-border/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <FaqItem
              question="Is this really free?"
              answer="Yes! GiftBound is 100% free to use for unlimited participants and events."
            />
            <FaqItem
              question="Do participants need to create an account?"
              answer="No. Participants can join and view their match securely without creating a password or account."
            />
            <FaqItem
              question="Can I see who drew who?"
              answer="As the host, you have access to an admin dashboard, but by default, the matches are kept secret to preserve the surprise!"
            />
            <FaqItem
              question="What if someone loses their email?"
              answer="You can resend invite emails directly from your admin dashboard."
            />
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border/50 bg-muted/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/favicon.png"
              alt="GiftBound Logo"
              width={32}
              height={32}
              className="w-8 h-8 opacity-80"
            />
            <span className="font-bold text-muted-foreground">GiftBound</span>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>© {new Date().getFullYear()} GiftBound. All rights reserved.</p>
            <p className="mt-1">Built with ❤️ for the holidays.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StepItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-background border border-border/60 p-6 rounded-xl hover:border-primary/30 transition-colors">
      <h3 className="text-lg font-bold mb-2">{question}</h3>
      <p className="text-muted-foreground leading-relaxed">{answer}</p>
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
    <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow hover:border-primary/20 group">
      <div className="mb-4 bg-background w-16 h-16 rounded-2xl flex items-center justify-center border border-border group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

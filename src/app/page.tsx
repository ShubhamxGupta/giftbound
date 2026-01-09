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
            alt="Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-xl font-bold tracking-tight">GiftBound</span>
        </div>
        <ThemeToggle />
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center text-center">
        {/* Abstract Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50 dark:opacity-30" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 text-secondary-foreground text-sm font-medium border border-secondary/20 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>The Magic of Giving, Simplified</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Organize Secret Santa <br className="hidden md:block" />
            with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
              Zero Stress
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            No logins, no ads. Just create an event, invite friends, and let the
            magic happen. We handle the shuffling securely.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href="/create" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-6 rounded-full font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95"
              >
                Start an Exchange
              </Button>
            </Link>
            <Link href="/join" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 py-6 rounded-full font-bold border-2 hover:bg-muted transition-all bg-background/50 backdrop-blur-sm"
              >
                Join Event
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 md:mt-24 relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-border/50 animate-in fade-in zoom-in-95 duration-1000 delay-500">
          {/* Fallback color/skeleton if image fails, though Next/Image handles loading */}
          <div className="aspect-[16/9] w-full bg-muted/20 relative">
            <Image
              src="/hero.png"
              alt="Friends celebrating holiday"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<ShieldCheck className="w-10 h-10 text-green-500" />}
            title="Totally Private"
            description="No accounts required. We don't sell your data. Your event details are secure."
          />
          <FeatureCard
            icon={<Gift className="w-10 h-10 text-primary" />}
            title="Smart Shuffling"
            description="Our algorithm prevents self-matches and ensures everyone gets a gifter. No awkward reshuffles."
          />
          <FeatureCard
            icon={<Mail className="w-10 h-10 text-blue-500" />}
            title="Dream Wishlists"
            description="Participants can add wishlists so their Secret Santa knows exactly what to get."
          />
        </div>
      </section>

      {/* How it works / Shuffle Visual */}
      <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Focus on the Gift,
            <br />
            Not the Spreadsheet.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Stop using hats and scraps of paper. GiftBound handles the messy
            parts so you can enjoy the holiday cheer.
          </p>
          <ul className="space-y-4 pt-4">
            <li className="flex items-center gap-3 text-lg">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                1
              </div>
              Create an event & set a budget
            </li>
            <li className="flex items-center gap-3 text-lg">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                2
              </div>
              Invite friends via email
            </li>
            <li className="flex items-center gap-3 text-lg">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                3
              </div>
              We shuffle and notify everyone!
            </li>
          </ul>
        </div>
        <div className="flex-1 relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl md:skew-y-3 md:hover:skew-y-0 transition-all duration-700 bg-black/20 mt-8 md:mt-0">
          <Image
            src="/shuffle.png"
            alt="Magical shuffling"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>
          © {new Date().getFullYear()} GiftBound. Built with ❤️ by Shubham
          Gupta.
        </p>
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
    <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow hover:border-primary/20 group">
      <div className="mb-4 bg-background w-16 h-16 rounded-2xl flex items-center justify-center border border-border group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px]" />
      </div>

      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <main className="flex flex-col items-center gap-8 max-w-2xl z-10">
        <div className="relative group">
          <div className="absolute -top-12 -left-12 text-7xl animate-bounce group-hover:animate-spin transition-all duration-700 cursor-default select-none">
            🎁
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
            Gift<span className="text-primary">Bound</span>
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg mx-auto">
          The <span className="font-semibold text-foreground">easiest</span> way
          to organize your Secret Santa.
          <br className="hidden md:block" />
          No logins, no ads, just holiday magic.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <Link href="/create" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="text-lg px-8 py-6 h-auto w-full sm:w-auto font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all"
            >
              Create Event
            </Button>
          </Link>
          <Link href="/join" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 h-auto w-full sm:w-auto font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Join Event
            </Button>
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-6 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default">
        Built with ❤️ by <span className="font-semibold">Shubham Gupta</span>
      </footer>
    </div>
  );
}

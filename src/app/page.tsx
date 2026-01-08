import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <main className="flex flex-col items-center gap-6 max-w-md">
        <div className="relative">
          <div className="absolute -top-10 -left-10 text-6xl animate-bounce">🎁</div>
          <h1 className="text-5xl font-extrabold tracking-tight text-primary">
            GiftBound
          </h1>
        </div>
        
        <p className="text-lg text-muted-foreground">
          The stress-free way to organize your Secret Santa. 
          <br />
          No logins, no ads, just magic.
        </p>

        <div className="flex gap-4 mt-4">
          <Link href="/create">
            <Button size="lg" className="text-lg px-8">
              Create Event
            </Button>
          </Link>
          <Link href="/join">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Join Event
            </Button>
          </Link>
        </div>
      </main>
      
      <footer className="absolute bottom-4 text-sm text-muted-foreground opacity-60">
        Built with ❤️ for the holidays
      </footer>
    </div>
  );
}

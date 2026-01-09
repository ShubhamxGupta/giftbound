import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { JsonLd } from "@/components/json-ld";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Organize a Secret Santa: The Ultimate Guide | GiftBound",
  description:
    "Learn the rules of Secret Santa, how to set up an exchange, variations like Yankee Swap, and tips for office or family parties.",
  keywords: [
    "How to play Secret Santa",
    "Secret Santa Rules",
    "Secret Santa Variations",
    "Yankee Swap Rules",
    "Gift Exchange Guide",
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

      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
            The Ultimate Holiday Guide
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            How to Organize a <br /> Secret Santa Exchange
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know to host a flawless holiday gift
            exchange.
          </p>
        </div>

        <article className="prose dark:prose-invert prose-lg max-w-none space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-4">What is Secret Santa?</h2>
            <p>
              Secret Santa is a Christmas tradition where members of a group or
              community are randomly assigned a person to whom they give a gift.
              The identity of the gift giver is to remain a secret and should
              not be revealed.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">The Basic Rules</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Gather the group:</strong> Get everyone involved
                (friends, family, coworkers) to agree to participate.
              </li>
              <li>
                <strong>Set a budget:</strong> Agree on a price limit (e.g.,
                $25) so everyone buys gifts of similar value.
              </li>
              <li>
                <strong>Draw names:</strong> Randomly assign a "giftee" to every
                "Santa". This is where{" "}
                <Link href="/" className="text-primary underline">
                  GiftBound
                </Link>{" "}
                comes in!
              </li>
              <li>
                <strong>Exchange gifts:</strong> Meet up on a specified date to
                exchange presents and reveal who drew who.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Common Variations</h2>
            <div className="bg-card p-6 rounded-xl border border-border/50 mb-6">
              <h3 className="text-xl font-bold mb-2">
                Yankee Swap / White Elephant
              </h3>
              <p className="text-muted-foreground">
                In this version, gifts are anonymous but suitable for anyone.
                Participants take turns picking a gift from the pile or stealing
                a gift from someone who has already opened one.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <h3 className="text-xl font-bold mb-2">Conspiracy Santa</h3>
              <p className="text-muted-foreground">
                The whole group works together to get one person a truly amazing
                gift, but without them knowing who contributed what or how much.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Tips for Success</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Use Wishlists:</strong> Encourage participants to share
                what they like. It avoids disappointment.
              </li>
              <li>
                <strong>Stick to the Date:</strong> Ensure everyone brings their
                gift on the exchange day.
              </li>
              <li>
                <strong>Keep it Secret:</strong> The fun is in the mystery!
                Don't spill the beans until the gifts are opened.
              </li>
            </ul>
          </section>
        </article>

        <div className="mt-16 bg-muted/30 p-8 rounded-3xl text-center border border-primary/20">
          <h3 className="text-2xl font-bold mb-4">Ready to host your own?</h3>
          <p className="text-muted-foreground mb-8 text-lg">
            Forget the paper scraps. Use our free generator to shuffle names and
            send invites in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button
                size="lg"
                className="rounded-full font-bold px-10 py-6 text-lg"
              >
                Start Free Exchange
              </Button>
            </Link>
            <Link href="/teams">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full font-bold px-10 py-6 text-lg"
              >
                For Teams
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-border/50 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-muted-foreground">
              GiftBound Guide
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

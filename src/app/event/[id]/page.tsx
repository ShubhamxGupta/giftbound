import { getEventData } from "@/app/actions";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Calendar, DollarSign, UserCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { OrganizerControls } from "@/components/organizer-controls";
import { WishlistForm } from "@/components/wishlist-form";
import { GiftReveal } from "@/components/gift-reveal";
import { CopyButton } from "@/components/copy-button";
import { EventPoller } from "@/components/event-poller";
import { LogoutButton } from "@/components/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function EventDashboard({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { id } = await params;
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-destructive">Access Denied. Missing Magic Token.</p>
      </div>
    );
  }

  const data = await getEventData(id, token);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-destructive">Invalid Link or Event not found.</p>
      </div>
    );
  }

  const { event, participant, assignment, allParticipants } = data;

  return (
    <div className="min-h-screen bg-background/50 dark:bg-background p-4 md:p-8 transition-colors duration-300">
      <div className="mx-auto max-w-4xl space-y-8">
        <EventPoller
          token={token}
          currentAssignmentId={participant.assigned_participant_id || null}
          currentStatus={event.status}
        />

        {/* Header */}
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-card/60 backdrop-blur-md p-6 rounded-3xl border border-border/40 shadow-sm">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {event.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground text-sm font-medium">
              <div className="flex items-center gap-1.5 bg-muted/40 px-3 py-1 rounded-full">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{event.date || "Date TBD"}</span>
              </div>
              {event.budget && (
                <div className="flex items-center gap-1.5 bg-muted/40 px-3 py-1 rounded-full">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span>Budget: {event.budget}</span>
                </div>
              )}
              {event.join_code && (
                <div className="flex items-center gap-3 bg-primary/10 px-4 py-1 rounded-full border border-primary/20 group hover:bg-primary/15 transition-colors">
                  <span className="text-xs uppercase font-bold text-primary/80">
                    Code:
                  </span>
                  <code className="text-lg font-mono font-bold tracking-widest text-primary">
                    {event.join_code}
                  </code>
                  <CopyButton code={event.join_code} />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 bg-muted/30 p-2 rounded-2xl border border-border/20">
            <div className="flex flex-col items-end px-2">
              <span className="text-xs text-muted-foreground">
                Logged in as
              </span>
              <span className="font-bold text-foreground flex items-center gap-2">
                {participant.name}
                {participant.is_organizer && (
                  <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] px-2 py-0.5 rounded-full border border-amber-500/20">
                    HOST
                  </span>
                )}
              </span>
            </div>
            <div className="h-8 w-px bg-border/50 mx-1" />
            <ThemeToggle />
            <LogoutButton />
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Assignment Section */}
          <div className="md:col-span-2">
            <Card className="border-border/50 bg-gradient-to-br from-card to-muted/20 overflow-hidden shadow-xl dark:shadow-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 justify-center text-2xl font-bold tracking-tight">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  Your Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="min-h-[300px] flex items-center justify-center p-8">
                {assignment ? (
                  <GiftReveal
                    assignmentName={assignment.name}
                    wishlist={assignment.wishlist}
                  />
                ) : (
                  <div className="text-center py-12 text-muted-foreground max-w-md mx-auto">
                    {event.status === "DRAFT" ? (
                      <div className="space-y-6">
                        <div className="text-6xl animate-bounce duration-[2000ms]">
                          🎅
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            Waiting for the host
                          </h3>
                          <p>
                            The elves are still wrapping things up. Hang tight!
                          </p>
                        </div>
                      </div>
                    ) : (
                      "Assignments are ready! (Wait, why can't you see yours?)"
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Participants List */}
          <Card className="border-border/50 shadow-lg dark:shadow-sm">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Participants
              </CardTitle>
              <CardDescription>Who&apos;s joining the fun?</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/40">
                {allParticipants?.map(
                  (p: {
                    id: string;
                    name: string;
                    is_organizer: boolean;
                    status: string;
                  }) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold shadow-inner",
                            p.id === participant.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {p.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={cn(
                              "font-medium",
                              p.id === participant.id && "text-primary"
                            )}
                          >
                            {p.name} {p.id === participant.id && "(You)"}
                          </span>
                          {p.is_organizer && (
                            <span className="text-[10px] text-muted-foreground font-mono">
                              ORGANIZER
                            </span>
                          )}
                        </div>
                      </div>
                      {p.status === "JOINED" && (
                        <div className="bg-green-500/10 text-green-600 dark:text-green-400 p-1.5 rounded-full">
                          <UserCheck className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Organizer Controls - Show for Draft OR Active */}
            {participant.is_organizer && (
              <OrganizerControls
                eventId={event.id}
                eventStatus={event.status}
              />
            )}

            {/* My Wishlist */}
            <WishlistForm
              token={token}
              initialWishlist={participant.wishlist}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

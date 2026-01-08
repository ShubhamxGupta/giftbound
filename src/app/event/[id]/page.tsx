import { getEventData } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Calendar, DollarSign, UserCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { OrganizerControls } from "@/components/organizer-controls";
import { WishlistForm } from "@/components/wishlist-form";
import { GiftReveal } from "@/components/gift-reveal";
import { CopyButton } from "@/components/copy-button";
import { EventPoller } from "@/components/event-poller";
import { LogoutButton } from "@/components/logout-button";

export default async function EventDashboard({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { id } = await params;
  const { token } = (await searchParams);

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
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <EventPoller 
            token={token} 
            currentAssignmentId={participant.assigned_participant_id || null} 
            currentStatus={event.status}
        />

        {/* Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
             <h1 className="text-3xl font-bold text-primary">{event.name}</h1>
             <div className="flex flex-wrap gap-4 text-muted-foreground mt-2 text-sm">
                <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date || 'Date TBD'}</span>
                </div>
                {event.budget && (
                    <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>Budget: {event.budget}</span>
                    </div>
                )}
                {event.join_code && (
                    <div className="flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-md border border-primary/20">
                        <span className="font-semibold text-primary">Room Code:</span>
                        <code className="text-lg font-mono font-bold tracking-widest">{event.join_code}</code>
                        <CopyButton code={event.join_code} />
                    </div>
                )}
             </div>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-sm text-foreground/80">
                Hello, <strong>{participant.name}</strong>
             </span>
             {participant.is_organizer && (
                 <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Organizer</span>
             )}
             <LogoutButton />
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
           {/* Assignment Section */}
           <div className="md:col-span-2">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 justify-center text-2xl">
                        <Gift className="h-6 w-6 text-primary" />
                        Your Mission
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="min-h-[300px] flex items-center justify-center">
                    {assignment ? (
                        <GiftReveal 
                            assignmentName={assignment.name} 
                            wishlist={assignment.wishlist} 
                        />
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            {event.status === 'DRAFT' 
                              ? (
                                  <div className="space-y-4">
                                      <p className="text-lg">Waiting for the host to start the party...</p> 
                                      <div className="animate-pulse text-4xl">⏳</div>
                                  </div>
                              )
                              : "Assignments are ready! (Wait, why can't you see yours?)"
                            }
                        </div>
                    )}
                 </CardContent>
              </Card>
           </div>

           {/* Participants List */}
           <Card>
              <CardHeader>
                 <CardTitle className="text-lg">Participants</CardTitle>
                 <CardDescription>Who's in the loop?</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="space-y-3">
                    {allParticipants?.map((p: any) => (
                        <div key={p.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                                    {p.name.charAt(0)}
                                </div>
                                <span className={p.id === participant.id ? "font-bold" : ""}>
                                    {p.name} {p.id === participant.id && "(You)"}
                                </span>
                            </div>
                            {p.status === 'JOINED' && <UserCheck className="h-4 w-4 text-green-500" />}
                        </div>
                    ))}
                 </div>
              </CardContent>
           </Card>

           {/* Organizer Controls - Show for Draft OR Active */}
           {participant.is_organizer && (
              <OrganizerControls eventId={event.id} eventStatus={event.status} />
           )}

           {/* My Wishlist */}
           <WishlistForm token={token} initialWishlist={participant.wishlist} />
        </div>
      </div>
    </div>
  );
}

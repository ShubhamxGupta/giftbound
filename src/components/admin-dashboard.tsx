"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  kickParticipant,
  resendInvite,
  closeEvent,
  shuffleEvent,
} from "@/app/actions";
import { toast } from "react-toastify";
import { Trash2, Send, Lock, Shuffle } from "lucide-react";

// Define explicit types for props
interface Participant {
  id: string;
  name: string;
  status: string;
  is_organizer: boolean;
}

interface AdminDashboardProps {
  eventId: string;
  token: string;
  participants: Participant[];
  eventStatus: string;
}

export function AdminDashboard({
  eventId,
  token,
  participants,
  eventStatus,
}: AdminDashboardProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleKick = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name}?`)) return;
    setLoading(id);
    try {
      await kickParticipant(token, id);
      toast.success(`${name} kicked`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error";
      toast.error(msg);
    } finally {
      setLoading(null);
    }
  };

  const handleResend = async (id: string) => {
    setLoading(id);
    try {
      await resendInvite(token, id);
      toast.success("Invite resent");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error";
      toast.error(msg);
    } finally {
      setLoading(null);
    }
  };

  const handleClose = async () => {
    if (!confirm("Close event? This is irreversible.")) return;
    setLoading("close");
    try {
      await closeEvent(token);
      toast.success("Event closed");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error";
      toast.error(msg);
    } finally {
      setLoading(null);
    }
  };

  const handleShuffle = async () => {
    if (!confirm("Shuffle now? This will assign giftees and email everyone."))
      return;
    setLoading("shuffle");
    try {
      await shuffleEvent(eventId, token);
      toast.success("Shuffled successfully!");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error";
      toast.error(msg);
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card className="border-2 border-primary/20 mt-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              🛡️ Admin Controls
              <Badge variant="outline">{eventStatus}</Badge>
            </CardTitle>
            <CardDescription>
              Manage participants and event lifecycle
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {eventStatus === "DRAFT" && (
              <Button
                onClick={handleShuffle}
                disabled={!!loading || participants.length < 2}
                className="bg-primary text-primary-foreground"
              >
                {loading === "shuffle" ? (
                  "Shuffling..."
                ) : (
                  <>
                    <Shuffle className="w-4 h-4 mr-2" /> Shuffle & Start
                  </>
                )}
              </Button>
            )}
            {eventStatus !== "COMPLETED" && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClose}
                disabled={!!loading}
              >
                {loading === "close" ? (
                  "Closing..."
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" /> Close Event
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground">
            Participants
          </h3>
          <div className="grid gap-2">
            {participants.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 rounded-md bg-muted/40 hover:bg-muted/60 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{p.name}</span>
                  {p.is_organizer && (
                    <Badge variant="secondary" className="text-[10px]">
                      HOST
                    </Badge>
                  )}
                  <Badge
                    variant={p.status === "JOINED" ? "default" : "secondary"}
                    className="text-[10px]"
                  >
                    {p.status}
                  </Badge>
                </div>
                {!p.is_organizer && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => handleResend(p.id)}
                      disabled={!!loading}
                      title="Resend Invite"
                    >
                      <Send className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleKick(p.id, p.name)}
                      disabled={!!loading || eventStatus !== "DRAFT"}
                      title="Kick User"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

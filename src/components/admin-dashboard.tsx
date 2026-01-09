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
import { Trash2, Send, Lock, Shuffle, ShieldAlert } from "lucide-react";

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
    <Card className="w-full border shadow-sm mt-8 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-primary" />
              Admin Controls
              <Badge
                variant={eventStatus === "ACTIVE" ? "default" : "outline"}
                className="ml-2"
              >
                {eventStatus}
              </Badge>
            </CardTitle>
            <CardDescription className="text-sm">
              Manage event lifecycle and participants
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {eventStatus === "DRAFT" && (
              <Button
                onClick={handleShuffle}
                disabled={!!loading || participants.length < 2}
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 sm:flex-none"
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
                size="default" // Changed from sm for better touch target
                onClick={handleClose}
                disabled={!!loading}
                className="flex-1 sm:flex-none"
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
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-semibold text-sm text-foreground">
              Participants ({participants.length})
            </h3>
            <span className="text-xs text-muted-foreground">
              {participants.filter((p) => p.status === "JOINED").length} joined
            </span>
          </div>

          <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border">
            {participants.map((p) => (
              <div
                key={p.id}
                className="group flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${p.status === "JOINED" ? "bg-green-500" : "bg-yellow-500"}`}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm leading-none flex items-center gap-2">
                      {p.name}
                      {p.is_organizer && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] h-5 px-1.5 font-normal"
                        >
                          HOST
                        </Badge>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {p.status}
                    </span>
                  </div>
                </div>

                {!p.is_organizer && (
                  <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-muted-foreground hover:text-primary"
                      onClick={() => handleResend(p.id)}
                      disabled={!!loading}
                      title="Resend Invite"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-muted-foreground hover:text-destructive"
                      onClick={() => handleKick(p.id, p.name)}
                      disabled={!!loading || eventStatus !== "DRAFT"}
                      title="Kick User"
                    >
                      <Trash2 className="h-4 w-4" />
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

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { shuffleEvent } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function OrganizerControls({
  eventId,
  eventStatus,
}: {
  eventId: string;
  eventStatus: string;
}) {
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  const handleShuffle = async () => {
    if (!confirming) {
      setConfirming(true);
      // Auto-reset confirmation after 3 seconds if not clicked
      setTimeout(() => setConfirming(false), 3000);
      return;
    }

    setConfirming(false);
    setLoading(true);
    try {
      await shuffleEvent(eventId);
      toast.success(
        eventStatus === "ACTIVE"
          ? "Reshuffled successfully!"
          : "Shuffling complete! Updates are on the way."
      );

      // Force a hard reload to ensure all server components update (Gift Reveal, etc.)
      // This solves the issue where router.refresh() might be too soft or cached
      window.location.reload();
    } catch (e: any) {
      setLoading(false);
      console.error(e);
      if (e.message === "NEXT_REDIRECT") return;
      toast.error(e.message || "Failed to shuffle");
    }
  };

  const isReshuffle = eventStatus === "ACTIVE";

  return (
    <Card className="border-border/50 shadow-md">
      <CardHeader className="bg-muted/30 pb-4">
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <span className="text-xl">🛠️</span> Organizer Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isReshuffle
            ? "Need to mix it up again? You can reshuffle, but everyone will be notified."
            : "Ready to start the exchange? This will lock the participants list and send out emails."}
        </p>
        <Button
          className={
            isReshuffle || confirming
              ? "w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg shadow-destructive/20"
              : "w-full shadow-lg shadow-primary/20"
          }
          size="lg"
          onClick={handleShuffle}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : confirming
              ? "⚠️ Are you sure? Click again!"
              : isReshuffle
                ? "Reshuffle Assignments"
                : "Shuffle & Publish"}
        </Button>
        {confirming && (
          <p className="text-xs text-center text-destructive font-medium animate-pulse bg-destructive/5 p-2 rounded">
            Warning: This cannot be undone!
          </p>
        )}
      </CardContent>
    </Card>
  );
}

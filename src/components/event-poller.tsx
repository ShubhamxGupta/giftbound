"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkUpdates } from "@/app/actions";
import { toast } from "react-toastify";

export function EventPoller({
  token,
  currentAssignmentId,
  currentStatus,
}: {
  token: string;
  currentAssignmentId: string | null;
  currentStatus: string;
}) {
  const router = useRouter();

  useEffect(() => {
    console.log(
      `Poller started. Status: ${currentStatus}, Asg: ${currentAssignmentId}`
    );
    // Poll every 4 seconds
    const interval = setInterval(async () => {
      try {
        const result = await checkUpdates(
          token,
          currentAssignmentId,
          currentStatus
        );

        if (result.changed) {
          toast.info("Update detected! Refreshing...");
          window.location.reload();
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [token, currentAssignmentId, currentStatus, router]);

  return null; // Invisible component
}

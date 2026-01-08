import { createClient } from "@supabase/supabase-js";
import {
  createEvent,
  joinEvent,
  shuffleEvent,
  getEventData,
} from "@/app/actions";

export default async function QaTestPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const admin = createClient(supabaseUrl, supabaseServiceKey);

  const results = [];
  const log = (msg: string, data?: any) => results.push({ msg, data });

  try {
    // Cleanup
    await admin.from("participants").delete().ilike("email", "%@qa.com");
    await admin.from("events").delete().eq("name", "QA Code Test");

    // 1. Create Event
    log("Creating Event...");
    const formData = {
      name: "QA Code Test",
      date: "2025-12-25",
      budget: "$100",
      participants: [
        { name: "Alice", email: "alice@qa.com" },
        { name: "Bob", email: "bob@qa.com" },
        { name: "Charlie", email: "charlie@qa.com" },
      ],
    };

    let eventId;
    try {
      await createEvent(formData);
    } catch (e: any) {
      if (e.message !== "NEXT_REDIRECT") throw e;
      log("createEvent redirected (Success)");
    }

    // Find Event ID and Code
    const { data: event } = await admin
      .from("events")
      .select("*")
      .eq("name", "QA Code Test")
      .single();
    if (!event) throw new Error("Event not found in DB");
    eventId = event.id;
    log("Event Created", event);

    // 2. Security Test: Account Takeover
    log("Attempting Account Takeover using Join Code + Email...");
    const joinCode = event.join_code;
    const targetEmail = "bob@qa.com";

    let stolenToken = null;
    try {
      await joinEvent(joinCode, "Bad Actor", targetEmail); // Name is ignored usually
    } catch (e: any) {
      if (e.message === "NEXT_REDIRECT") {
        // Extract token from redirect URL string?
        // The error object in Next.js redirect might contain the URL.
        // Usually e.digest is the URL or logic.
        // But simpler: just query the DB for Bob's token to verify it EXISTS,
        // and logically we know joinEvent redirects to it.
        // We can prove the VULNERABILITY by checking if joinEvent threw an error or Redirected.
        // If it Redirected, it means it allowed us in.
        log(
          "joinEvent Redirected! VULNERABILITY CONFIRMED. Attacker can log in as Bob."
        );

        // Get Bob's token for next steps
        const { data: bob } = await admin
          .from("participants")
          .select("magic_token")
          .eq("email", targetEmail)
          .eq("event_id", eventId)
          .single();
        stolenToken = bob.magic_token;
      } else {
        log("joinEvent Failed", e.message);
      }
    }

    // 3. Functional: Shuffle
    log("Shuffling...");
    // Need 2+ participants. We have 3.
    await shuffleEvent(eventId);
    log("Shuffle Completed (No Error)");

    // 4. Verify Assignments
    if (stolenToken) {
      const bobView = await getEventData(eventId, stolenToken);
      log("Bob View Retrieved via Stolen Token", {
        assignment: bobView?.assignment,
        status: bobView?.event.status,
      });
    }
  } catch (e: any) {
    log("FATAL ERROR", e.message + "\n" + e.stack);
  }

  return (
    <div className="p-10 font-mono text-xs whitespace-pre-wrap">
      {JSON.stringify(results, null, 2)}
    </div>
  );
}

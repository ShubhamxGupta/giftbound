import { JoinEventForm } from "@/components/join-event-form";
import { ThemeToggle } from "@/components/theme-toggle";

export default function JoinPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full">
        <JoinEventForm />
      </div>
    </div>
  );
}

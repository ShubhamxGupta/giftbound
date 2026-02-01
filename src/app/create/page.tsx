import CreateEventForm from "@/components/create-event-form";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata = {
  title: "Create Event | GiftBound",
  description:
    "Set up your Secret Santa exchange in seconds. Set a budget, choose a date, and invite friends.",
};

export default function CreateEventPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Create Your Event
          </h1>
          <p className="text-muted-foreground">
            Setup your Secret Santa in 3 easy steps.
          </p>
        </div>
        <CreateEventForm />
      </div>
    </div>
  );
}

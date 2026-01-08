import { Button } from "@/components/ui/button";
import CreateEventForm from "@/components/create-event-form";

export default function CreateEventPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold tracking-tight text-primary">Create Your Event</h1>
             <p className="text-muted-foreground">Setup your Secret Santa in 3 easy steps.</p>
        </div>
        <CreateEventForm />
      </div>
    </div>
  );
}

import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EventTimelineProps {
  status: string;
}

export function EventTimeline({ status }: EventTimelineProps) {
  const steps = [
    { id: "DRAFT", label: "Invite Participants" },
    { id: "ACTIVE", label: "Exchange Gifts" },
    { id: "COMPLETED", label: "Party Time!" },
  ];

  const currentIndex = steps.findIndex((s) => s.id === status);
  // If status is not found (e.g. ARCHIVED), assume completed or handle distinct?
  // Let's assume ARCHIVED is after COMPLETED.
  const activeIndex =
    currentIndex === -1 ? (status === "ARCHIVED" ? 3 : 0) : currentIndex;

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex items-center justify-center w-full">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500",
                  idx <= activeIndex
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-muted/30 border-muted text-muted-foreground opacity-60"
                )}
              >
                {idx < activeIndex ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : idx === activeIndex ? (
                  <Circle className="w-4 h-4 fill-current" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
                <span className="text-xs font-bold uppercase tracking-wider">
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-8 mx-2 transition-colors duration-500",
                    idx < activeIndex ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

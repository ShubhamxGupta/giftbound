"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createEvent } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  DollarSign,
  Gift,
  Trash2,
  Plus,
  AlertCircle,
  OctagonAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

export default function CreateEventForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    budget: "",
    participants: [
      { name: "", email: "" },
      { name: "", email: "" },
    ],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const addParticipant = () => {
    setFormData((prev) => ({
      ...prev,
      participants: [...prev.participants, { name: "", email: "" }],
    }));
  };

  const removeParticipant = (index: number) => {
    if (formData.participants.length <= 2) return;
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index),
    }));
  };

  const updateParticipant = (
    index: number,
    field: "name" | "email",
    value: string
  ) => {
    const newParticipants = [...formData.participants];
    newParticipants[index][field] = value;
    setFormData((prev) => ({ ...prev, participants: newParticipants }));
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <Card className="w-full overflow-hidden border-2 border-border shadow-2xl dark:border-border/50 dark:shadow-primary/5 dark:bg-card/95 backdrop-blur-sm">
      <CardHeader className="bg-muted/50 px-6 py-6 border-b border-border/50">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Step {step} of 3
          </span>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  backgroundColor:
                    i <= step ? "var(--primary)" : "var(--muted)",
                  width: i === step ? 32 : 12, // Active step is wider
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i > step && "bg-opacity-20 bg-primary" // Subtle indicator for future steps
                )}
              />
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Event Name</Label>
                <div className="relative">
                  <Gift
                    className={cn(
                      "absolute left-3 top-2.5 h-4 w-4",
                      errors.name ? "text-destructive" : "text-muted-foreground"
                    )}
                  />
                  <Input
                    id="name"
                    placeholder="e.g. Office Holiday Party 2024"
                    className={cn(
                      "pl-9 transition-colors",
                      errors.name &&
                        "border-destructive focus-visible:ring-destructive bg-destructive/5"
                    )}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                  />
                </div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-destructive font-medium flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </motion.p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="date"
                    className={errors.date ? "text-destructive" : ""}
                  >
                    Exchange Date
                  </Label>
                  <div className="relative">
                    <Calendar
                      className={cn(
                        "absolute left-3 top-2.5 h-4 w-4",
                        errors.date
                          ? "text-destructive"
                          : "text-muted-foreground"
                      )}
                    />
                    <Input
                      id="date"
                      type="date"
                      className={cn(
                        "pl-9 transition-colors",
                        errors.date &&
                          "border-destructive focus-visible:ring-destructive bg-destructive/5"
                      )}
                      value={formData.date}
                      onChange={(e) => {
                        setFormData({ ...formData, date: e.target.value });
                        if (errors.date) setErrors({ ...errors, date: "" });
                      }}
                    />
                  </div>
                  {errors.date && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive font-medium"
                    >
                      {errors.date}
                    </motion.p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="budget"
                    className={errors.budget ? "text-destructive" : ""}
                  >
                    Budget Limit
                  </Label>
                  <div className="relative">
                    <DollarSign
                      className={cn(
                        "absolute left-3 top-2.5 h-4 w-4",
                        errors.budget
                          ? "text-destructive"
                          : "text-muted-foreground"
                      )}
                    />
                    <Input
                      id="budget"
                      placeholder="e.g. $50"
                      className={cn(
                        "pl-9 transition-colors",
                        errors.budget &&
                          "border-destructive focus-visible:ring-destructive bg-destructive/5"
                      )}
                      value={formData.budget}
                      onChange={(e) => {
                        setFormData({ ...formData, budget: e.target.value });
                        // Removed immediate error clearing to prevent flickering/lag
                        if (errors.budget) {
                          const newErrors = { ...errors };
                          delete newErrors.budget;
                          setErrors(newErrors);
                        }
                      }}
                    />
                  </div>
                  {errors.budget && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive font-medium"
                    >
                      {errors.budget}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <Label>Participants ({formData.participants.length})</Label>
                <Button variant="outline" size="sm" onClick={addParticipant}>
                  <Plus className="h-4 w-4 mr-1" /> Add Person
                </Button>
              </div>

              <div className="max-h-[350px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-muted-foreground/20">
                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20 mb-2 flex items-center gap-2"
                  >
                    <OctagonAlert className="w-4 h-4" /> {errors.general}
                  </motion.div>
                )}
                {formData.participants.map((p, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={index}
                    className="flex gap-2 items-start group"
                  >
                    <div className="flex-1 space-y-1">
                      {index === 0 && (
                        <Label className="text-xs text-muted-foreground">
                          Name
                        </Label>
                      )}
                      <Input
                        placeholder="Name"
                        value={p.name}
                        onChange={(e) => {
                          updateParticipant(index, "name", e.target.value);
                          if (errors[`participant_${index}_name`]) {
                            const newErrors = { ...errors };
                            delete newErrors[`participant_${index}_name`];
                            setErrors(newErrors);
                          }
                        }}
                        className={cn(
                          errors[`participant_${index}_name`]
                            ? "border-destructive focus-visible:ring-destructive bg-destructive/5"
                            : ""
                        )}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      {index === 0 && (
                        <Label className="text-xs text-muted-foreground">
                          Email
                        </Label>
                      )}
                      <Input
                        placeholder="email@example.com"
                        type="email"
                        value={p.email}
                        onChange={(e) =>
                          updateParticipant(index, "email", e.target.value)
                        }
                        className={cn(
                          errors[`participant_${index}_email`]
                            ? "border-destructive focus-visible:ring-destructive bg-destructive/5"
                            : ""
                        )}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeParticipant(index)}
                      className={cn(
                        "mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10",
                        index === 0 ? "mt-7" : ""
                      )}
                      disabled={formData.participants.length <= 2}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6 text-center"
            >
              <div className="bg-primary/10 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Ready to shuffle?</h3>
              <p className="text-muted-foreground">
                You are about to organize <strong>{formData.name}</strong> for{" "}
                <strong>{formData.participants.length} participants</strong>.
                <br />
                Everyone will receive an email with their secret assignment.
              </p>

              <div className="bg-muted p-4 rounded-lg text-left text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{formData.date || "TBD"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Budget:</span>
                  <span className="font-medium">
                    {formData.budget || "None"}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-between bg-muted/50 p-6">
        <Button
          variant="ghost"
          onClick={step === 1 ? () => (window.location.href = "/") : prevStep}
          disabled={isLoading}
        >
          {step === 1 ? "Cancel" : "Back"}
        </Button>

        {step < 3 ? (
          <Button
            onClick={() => {
              if (step === 1) {
                const newErrors: Record<string, string> = {};
                if (!formData.name) newErrors.name = "Required";
                if (!formData.date) newErrors.date = "Required";
                if (!formData.budget) newErrors.budget = "Please set a budget";

                if (Object.keys(newErrors).length > 0) {
                  toast.error("Please fill in all required fields");
                  setErrors(newErrors);
                  return;
                }
              }

              if (step === 2) {
                const newErrors: Record<string, string> = {};
                let hasError = false;

                // Validate participants
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const emails = formData.participants.map((p) =>
                  p.email.toLowerCase().trim()
                );
                const uniqueEmails = new Set(emails);

                if (uniqueEmails.size !== emails.length) {
                  newErrors.general =
                    "Each participant needs a unique email address.";
                  hasError = true;
                }

                formData.participants.forEach((p, i) => {
                  if (!p.name.trim()) {
                    newErrors[`participant_${i}_name`] = "Name is required";
                    hasError = true;
                  }
                  if (!p.email.trim()) {
                    newErrors[`participant_${i}_email`] = "Email is required";
                    hasError = true;
                  } else if (!emailRegex.test(p.email)) {
                    newErrors[`participant_${i}_email`] =
                      "Invalid email format";
                    hasError = true;
                  }
                });

                if (hasError) {
                  setErrors(newErrors);
                  if (!newErrors.general)
                    toast.error("Please fix the highlighted errors.");
                  return;
                }
              }
              setErrors({}); // Clear errors if valid
              nextStep();
            }}
          >
            Next Step
          </Button>
        ) : (
          <Button
            onClick={async () => {
              setIsLoading(true);
              try {
                await createEvent(formData);
              } catch (error: unknown) {
                const e = error as Error & { message?: string };
                if (e.message === "NEXT_REDIRECT") {
                  // This is expected behavior for redirect() in Server Actions
                  return;
                }
                console.error(e);
                toast.error(e.message || "Something went wrong");
              }
              setIsLoading(false);
            }}
            disabled={isLoading}
          >
            {isLoading ? "Shuffling..." : "Shuffle & Send Invites"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

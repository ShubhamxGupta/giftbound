"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { joinEvent } from "@/app/actions";
import { Users, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

export function JoinEventForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ code: "", name: "", email: "" });
  const [errors, setErrors] = useState({ code: "", name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { code: "", name: "", email: "" };

    if (formData.code.length < 6) {
      newErrors.code = "Code must be 6 characters";
      isValid = false;
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleJoin = async () => {
    if (!validate()) {
      toast.error("Please check your input");
      return;
    }

    setIsLoading(true);
    try {
      await joinEvent(formData.code, formData.name, formData.email);
      toast.success("Joined successfully!");
    } catch (e: any) {
      if (e.message === "NEXT_REDIRECT") return;
      toast.error(e.message || "Failed to join");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-border shadow-2xl dark:border-border/50 dark:shadow-primary/5 dark:bg-card/95 backdrop-blur-sm">
      <CardHeader className="text-center bg-muted/30 pb-8 pt-8 border-b border-border/40">
        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-background shadow-inner">
          <Users className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight">
          Join Party
        </CardTitle>
        <p className="text-muted-foreground font-medium">
          Enter the code shared by your organizer
        </p>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Label>Room Code</Label>
          <Input
            placeholder="e.g. SANTA1"
            className="text-center uppercase tracking-widest text-lg font-bold"
            value={formData.code}
            onChange={(e) =>
              setFormData({ ...formData, code: e.target.value.toUpperCase() })
            }
            maxLength={6}
          />
          {errors.code && (
            <p className="text-xs text-destructive">{errors.code}</p>
          )}
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Your Name</Label>
            <Input
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-6 flex gap-3">
        <Button
          variant="ghost"
          className="w-1/3"
          onClick={() => (window.location.href = "/")}
        >
          Cancel
        </Button>
        <Button
          className="w-2/3"
          size="lg"
          onClick={handleJoin}
          disabled={isLoading}
        >
          {isLoading ? "Joining..." : "Join Event"}
        </Button>
      </CardFooter>
    </Card>
  );
}

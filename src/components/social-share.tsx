"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, Share2, Send } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SocialShareProps {
  joinCode: string;
  eventName: string;
}

export function SocialShare({ joinCode, eventName }: SocialShareProps) {
  const shareText = `Join my Secret Santa event "${eventName}" on GiftBound! Use code: ${joinCode}`;
  const url = typeof window !== "undefined" ? window.location.href : "";

  const links = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="h-4 w-4" />,
      href: `https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`,
      color: "hover:text-green-500",
    },
    {
      name: "Twitter",
      icon: <Share2 className="h-4 w-4" />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      color: "hover:text-blue-400",
    },
    {
      name: "Telegram",
      icon: <Send className="h-4 w-4" />,
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`,
      color: "hover:text-blue-500",
    },
  ];

  return (
    <div className="flex items-center gap-1 border-l border-border/50 pl-3 ml-1">
      <TooltipProvider delayDuration={0}>
        {links.map((link) => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full text-muted-foreground transition-colors ${link.color} hover:bg-muted/50`}
                onClick={() => window.open(link.href, "_blank")}
              >
                {link.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              Share on {link.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}

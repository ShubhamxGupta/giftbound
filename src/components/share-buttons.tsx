"use client";

import { Button } from "@/components/ui/button";
import {
  Check,
  Copy,
  Mail,
  MessageCircle,
  Share2,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-4 h-4" />,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Twitter/X",
      icon: <Twitter className="w-4 h-4" />,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "bg-black hover:bg-gray-800",
    },
    {
      name: "Email",
      icon: <Mail className="w-4 h-4" />,
      href: `mailto:?subject=${encodedTitle}&body=Join my Secret Santa event: ${encodedUrl}`,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: "Telegram",
      icon: <Share2 className="w-4 h-4" />,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-sky-500 hover:bg-sky-600",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 w-full">
        <div className="bg-muted px-3 py-2 rounded-md text-sm font-mono truncate flex-1 border border-border/50">
          {url}
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={copyToClipboard}
          className="shrink-0"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-white font-medium text-xs transition-colors ${link.color}`}
          >
            {link.icon}
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}

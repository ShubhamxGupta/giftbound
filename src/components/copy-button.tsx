'use client'

import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        toast.success("Code copied!")
        setTimeout(() => setCopied(false), 2000)
    } catch (err) {
        toast.error("Failed to copy")
    }
  }

  return (
    <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 ml-2 hover:bg-primary/10" 
        onClick={handleCopy}
    >
        {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
    </Button>
  )
}

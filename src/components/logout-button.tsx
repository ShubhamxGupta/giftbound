'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

export function LogoutButton() {
  return (
    <Link href="/">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Leave</span>
        </Button>
    </Link>
  )
}

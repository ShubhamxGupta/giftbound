'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateWishlist } from '@/app/actions'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Save } from 'lucide-react'

export function WishlistForm({ token, initialWishlist }: { token: string, initialWishlist: string }) {
  const [wishlist, setWishlist] = useState(initialWishlist || '')
  const [loading, setLoading] = useState(false)
  
  const handleSave = async () => {
    setLoading(true)
    try {
        await updateWishlist(token, wishlist)
    } catch(e) {
        alert('Failed to save wishlist')
    } finally {
        setLoading(false)
    }
  }

  return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-secondary" />
                Your Wishlist
            </CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="flex gap-2">
                <Input 
                    placeholder="e.g. Books, Coffee, Socks..." 
                    value={wishlist}
                    onChange={(e) => setWishlist(e.target.value)}
                />
                <Button size="icon" onClick={handleSave} disabled={loading}>
                    <Save className="h-4 w-4" />
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">
                Help your Santa pick the perfect gift!
            </p>
         </CardContent>
      </Card>
  )
}

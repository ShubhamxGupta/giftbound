'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { joinEvent } from '@/app/actions'
import { Users, ArrowRight } from 'lucide-react'
import { toast } from 'react-toastify'

export function JoinEventForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ code: '', name: '', email: '' })
  const [errors, setErrors] = useState({ code: '', name: '', email: '' })
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    let isValid = true
    const newErrors = { code: '', name: '', email: '' }
    
    if (formData.code.length < 6) {
        newErrors.code = 'Code must be 6 characters'
        isValid = false
    }
    if (!formData.name.trim()) {
        newErrors.name = 'Name is required'
        isValid = false
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Valid email is required'
        isValid = false
    }
    
    setErrors(newErrors)
    return isValid
  }

  const handleJoin = async () => {
    if (!validate()) {
        toast.error("Please check your input")
        return
    }

    setIsLoading(true)
    try {
        await joinEvent(formData.code, formData.name, formData.email)
        toast.success("Joined successfully!")
    } catch(e: any) {
        if (e.message === 'NEXT_REDIRECT') return
        toast.error(e.message || 'Failed to join')
        setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-primary/10 shadow-xl">
       <CardHeader className="text-center bg-muted/50 pb-8">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Join Party</CardTitle>
            <p className="text-muted-foreground text-sm">Enter the code shared by your organizer</p>
       </CardHeader>
       <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
             <Label>Room Code</Label>
             <Input 
                 placeholder="e.g. SANTA1" 
                 className="text-center uppercase tracking-widest text-lg font-bold"
                 value={formData.code}
                 onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                 maxLength={6}
             />
             {errors.code && <p className="text-xs text-destructive">{errors.code}</p>}
          </div>

          <div className="space-y-4 pt-2">
             <div className="space-y-2">
                <Label>Your Name</Label>
                <Input 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
             </div>
             <div className="space-y-2">
                <Label>Email</Label>
                <Input 
                    placeholder="Enter your email" 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
             </div>
          </div>
       </CardContent>
       <CardFooter className="bg-muted/50 p-6">
          <Button className="w-full" size="lg" onClick={handleJoin} disabled={isLoading}>
             {isLoading ? 'Joining...' : 'Join Event'}
          </Button>
       </CardFooter>
    </Card>
  )
}

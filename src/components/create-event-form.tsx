'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createEvent } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar, DollarSign, Gift, Trash2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CreateEventForm() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    budget: '',
    participants: [{ name: '', email: '' }, { name: '', email: '' }]
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const nextStep = () => setStep(s => Math.min(s + 1, 3))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const addParticipant = () => {
    setFormData(prev => ({
      ...prev,
      participants: [...prev.participants, { name: '', email: '' }]
    }))
  }

  const removeParticipant = (index: number) => {
    if (formData.participants.length <= 2) return
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }))
  }

  const updateParticipant = (index: number, field: 'name' | 'email', value: string) => {
    const newParticipants = [...formData.participants]
    newParticipants[index][field] = value
    setFormData(prev => ({ ...prev, participants: newParticipants }))
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <Card className="w-full overflow-hidden border-2 border-primary/10 shadow-xl">
      <CardHeader className="bg-primary/5 px-6 py-4">
        <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
           <span>Step {step} of 3</span>
           <div className="flex gap-1">
             {[1, 2, 3].map(i => (
               <div key={i} className={cn("h-2 w-8 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-primary/20")} />
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
                    <Gift className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="name" 
                      placeholder="e.g. Office Holiday Party 2024" 
                      className="pl-9"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="date">Exchange Date</Label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="date" 
                          type="date" 
                          className="pl-9"
                          value={formData.date}
                          onChange={e => setFormData({...formData, date: e.target.value})}
                        />
                    </div>
                    {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="budget">Budget Limit</Label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="budget" 
                          placeholder="e.g. $50" 
                          className="pl-9"
                          value={formData.budget}
                          onChange={e => setFormData({...formData, budget: e.target.value})}
                        />
                    </div>
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
                
                <div className="max-h-[350px] overflow-y-auto space-y-3 pr-2">
                   {errors.general && (
                      <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20 mb-2">
                          {errors.general}
                      </div>
                   )}
                   {formData.participants.map((p, index) => (
                      <div key={index} className="flex gap-2 items-start group">
                         <div className="flex-1 space-y-1">
                            {index === 0 && <Label className="text-xs text-muted-foreground">Name</Label>}
                            <Input 
                                placeholder="John Doe" 
                                value={p.name}
                                onChange={e => {
                                   updateParticipant(index, 'name', e.target.value)
                                   if (errors[`participant_${index}_name`]) {
                                       const newErrors = {...errors}
                                       delete newErrors[`participant_${index}_name`]
                                       setErrors(newErrors)
                                   }
                                }}
                                className={errors[`participant_${index}_name`] ? "border-destructive" : ""}
                            />
                         </div>
                         <div className="flex-1 space-y-1">
                             {index === 0 && <Label className="text-xs text-muted-foreground">Email</Label>}
                             <Input 
                                placeholder="john@example.com" 
                                type="email"
                                value={p.email}
                                onChange={e => updateParticipant(index, 'email', e.target.value)}
                                className={errors[`participant_${index}_email`] ? "border-destructive" : ""}
                             />
                         </div>
                         <Button 
                           variant="ghost" 
                           size="icon" 
                           onClick={() => removeParticipant(index)}
                           className={cn("mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-destructive", index === 0 ? "mt-7" : "")}
                           disabled={formData.participants.length <= 2}
                         >
                            <Trash2 className="h-4 w-4" />
                         </Button>
                      </div>
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
                   You are about to organize <strong>{formData.name}</strong> for <strong>{formData.participants.length} participants</strong>. 
                   <br/>
                   Everyone will receive an email with their secret assignment.
                </p>
                
                <div className="bg-muted p-4 rounded-lg text-left text-sm space-y-2">
                   <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">{formData.date || 'TBD'}</span>
                   </div>
                   <div className="flex justify-between">
                      <span>Budget:</span>
                      <span className="font-medium">{formData.budget || 'None'}</span>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-between bg-muted/50 p-6">
        <Button 
          variant="ghost" 
          onClick={prevStep} 
          disabled={step === 1 || isLoading}
        >
          Back
        </Button>
        
        {step < 3 ? (
             <Button onClick={() => {
               if (step === 2) {
                 // Validate participants
                 const emails = formData.participants.map(p => p.email.toLowerCase())
                 const uniqueEmails = new Set(emails)
                 if (uniqueEmails.size !== emails.length) {
                   alert('Please ensure all participants have unique emails.')
                   return
                 }
                 if (formData.participants.some(p => !p.name || !p.email)) {
                   alert('Please fill in all participant fields.')
                   return
                 }
               }
               nextStep()
             }}>Next Step</Button>
        ) : (
             <Button onClick={async () => {
               setIsLoading(true)
               try {
                 await createEvent(formData)
               } catch (e: any) {
                 console.error(e)
                 alert(`Error: ${e.message || 'Something went wrong'}`)
                 setIsLoading(false)
               }
             }} disabled={isLoading}>
               {isLoading ? 'Shuffling...' : 'Shuffle & Send Invites'}
             </Button>
        )}
      </CardFooter>
    </Card>
  )
}

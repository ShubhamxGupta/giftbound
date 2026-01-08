'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import confetti from 'canvas-confetti'

export function GiftReveal({ 
  assignmentName, 
  wishlist,
  isRevealedInitially = false
}: { 
  assignmentName: string
  wishlist?: string
  isRevealedInitially?: boolean 
}) {
  const [isOpen, setIsOpen] = useState(isRevealedInitially)
  const [isShaking, setIsShaking] = useState(false)

  const handleOpen = () => {
    if (isOpen) return
    setIsShaking(true)
    setTimeout(() => {
        setIsShaking(false)
        setIsOpen(true)
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF0000', '#00FF00', '#FFFFFF', '#FFD700']
        })
    }, 1000)
  }

  return (
    <div className="w-full perspective-1000">
      <AnimatePresence mode="wait">
        {!isOpen ? (
             <motion.div
                key="box"
                onClick={handleOpen}
                className="cursor-pointer mx-auto w-64 h-64 relative flex items-center justify-center"
                animate={isShaking ? { 
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.05, 1],
                } : {
                    y: [0, -10, 0],
                }}
                transition={isShaking ? { duration: 0.5 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
             >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-xl shadow-2xl flex items-center justify-center border-4 border-yellow-400">
                     <div className="absolute inset-x-0 top-1/2 h-8 bg-yellow-400 -translate-y-1/2" />
                     <div className="absolute inset-y-0 left-1/2 w-8 bg-yellow-400 -translate-x-1/2" />
                     <Gift className="w-24 h-24 text-white z-10" />
                     <div className="absolute bottom-4 text-white font-bold text-lg animate-pulse">
                        Click to Unwrap!
                     </div>
                </div>
             </motion.div>
        ) : (
             <motion.div
                key="reveal"
                initial={{ scale: 0, opacity: 0, rotate: 180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-full"
             >
                <div className="text-center py-8 space-y-6">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-muted-foreground"
                    >
                        You are the Secret Santa for...
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="text-5xl font-black text-primary drop-shadow-md"
                    >
                        {assignmentName}
                    </motion.h2>

                    {wishlist && (
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-6 bg-card border p-6 rounded-xl shadow-sm text-left max-w-md mx-auto relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                            <div className="flex items-center gap-2 mb-2 text-primary font-bold text-sm uppercase tracking-wider">
                                <Sparkles className="h-4 w-4" />
                                Their Wishlist
                            </div>
                            <p className="text-lg leading-relaxed">{wishlist}</p>
                        </motion.div>
                    )}
                </div>
             </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gift, Home, Snowflake } from "lucide-react";
import confetti from "canvas-confetti";

export default function NotFound() {
  const [giftLocation, setGiftLocation] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [isFound, setIsFound] = useState(false);

  // 3 snow mounds
  const MOUNDS = [0, 1, 2];

  useEffect(() => {
    // Randomly hide the gift in one of the mounds on mount
    setGiftLocation(Math.floor(Math.random() * MOUNDS.length));
  }, []);

  const handleDig = (index: number) => {
    if (revealed.includes(index)) return;

    if (index === giftLocation) {
      setIsFound(true);
      // Reveal all mounds
      setRevealed(MOUNDS);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF0000", "#00FF00", "#FFFFFF", "#FFD700"],
      });
    } else {
      setRevealed((prev) => [...prev, index]);
    }
  };

  // State for snowflakes to avoid hydration mismatch
  const [snowflakes, setSnowflakes] = useState<
    {
      id: number;
      left: string;
      duration: number;
      delay: number;
      xOffset: number;
    }[]
  >([]);

  useEffect(() => {
    // Generate snowflakes on client side only
    const flakes = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      xOffset: Math.random() * 20 - 10,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-900 via-sky-800 to-blue-900 text-white p-4 relative overflow-hidden">
      {/* Background Snowflakes */}
      <div className="absolute inset-0 pointer-events-none">
        {snowflakes.map((flake) => (
          <motion.div
            key={flake.id}
            initial={{ y: -10, opacity: 0 }}
            animate={{
              y: ["0vh", "100vh"],
              x: flake.xOffset,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: flake.duration,
              repeat: Infinity,
              delay: flake.delay,
              ease: "linear",
            }}
            className="absolute"
            style={{
              left: flake.left,
              top: -20,
            }}
          >
            <Snowflake className="text-white/20 w-4 h-4" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl w-full text-center space-y-8 z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-sky-200 drop-shadow-2xl">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Oh deer! You're lost.
          </h2>
          <p className="text-sky-200 text-lg mt-4 max-w-md mx-auto">
            We can't find the page you're looking for, but maybe you can help us
            find the missing gift?
          </p>
        </motion.div>

        {/* The Game Area */}
        <div className="flex justify-center gap-4 md:gap-8 min-h-[160px] items-end">
          {MOUNDS.map((index) => (
            <div key={index} className="relative group">
              <AnimatePresence mode="wait">
                {!revealed.includes(index) ? (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: [-2, 2, -2, 2, 0] }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDig(index)}
                    className="w-24 h-20 md:w-32 md:h-24 bg-white rounded-t-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex items-end justify-center pb-2 cursor-pointer relative z-20"
                  >
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Dig!
                    </span>
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center"
                  >
                    {index === giftLocation ? (
                      <div className="relative">
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                          }}
                        >
                          <Gift className="w-16 h-16 md:w-20 md:h-20 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-yellow-300 font-bold text-sm"
                        >
                          You found it!
                        </motion.div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="text-4xl md:text-5xl grayscale opacity-70">
                          🧦
                        </div>
                        <span className="text-sky-300/60 text-xs font-medium mt-2">
                          Just an old sock
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <motion.div
          animate={isFound ? { scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: isFound ? Infinity : 0, duration: 2 }}
          className="pt-8"
        >
          <Link href="/">
            <Button
              size="lg"
              className={`rounded-full px-8 py-6 text-lg font-bold transition-all duration-300 ${
                isFound
                  ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              }`}
            >
              <Home className="mr-2 w-5 h-5" />
              Return Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

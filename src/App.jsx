import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, X, RefreshCw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * UTILS & CONSTANTS
 */
const NO_PHRASES = [
  "Would you be my Valentine?",
  "Are you sure? 🥺",
  "Think again... 🧸",
  "Don't be stubborn 😳",
  "You're making this difficult 😭",
  "Last chance... 💔",
  "Ok, I'm not taking no for an answer 💘",
];

const MESSAGE = `To my dearest Karina,

You make every single day feel like a 
celebration. I'm so lucky to have you in 
my life. Thank you for being the most 
wonderful person I know.

Will you walk through this year 
holding my hand?

Always yours, 
Me 💖`;

/**
 * COMPONENT: Floating Hearts Background
 */
const HeartsBackground = ({ count = 20, active = true }) => {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * (30 - 10) + 10,
      duration: Math.random() * (10 - 5) + 5,
      delay: Math.random() * 5,
    }));
  }, [count]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: '110vh', opacity: 0, x: `${h.x}vw` }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 0.6, 0.6, 0],
            x: [`${h.x}vw`, `${h.x + (Math.random() * 10 - 5)}vw`]
          }}
          transition={{ 
            duration: h.duration, 
            repeat: Infinity, 
            delay: h.delay, 
            ease: "linear" 
          }}
          className="absolute text-rose-300/40"
        >
          <Heart fill="currentColor" size={h.size} />
        </motion.div>
      ))}
    </div>
  );
};

/**
 * COMPONENT: Typed Text Effect
 */
const TypedText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text]);

  return (
    <div className="whitespace-pre-line font-medium text-rose-800 leading-relaxed relative">
      {displayedText}
      {index < text.length && (
        <motion.span 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1 h-5 bg-rose-500 ml-1 align-middle"
        />
      )}
    </div>
  );
};

/**
 * MAIN APP COMPONENT
 */
export default function App() {
  const [scene, setScene] = useState('ask'); // 'ask' | 'envelope' | 'takeover'
  const [noCount, setNoCount] = useState(0);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isCardOut, setIsCardOut] = useState(false);

  // Scene Transitions
  const handleYes = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fb7185', '#f43f5e', '#ec4899']
    });
    setTimeout(() => setScene('envelope'), 400);
  };

  const handleNo = () => {
    if (noCount < NO_PHRASES.length - 1) {
      setNoCount(noCount + 1);
    }
  };

  const toggleEnvelope = () => {
    if (!isEnvelopeOpen) {
      setIsEnvelopeOpen(true);
      setTimeout(() => setIsCardOut(true), 600);
    }
  };

  const closeCard = () => {
    setIsCardOut(false);
    setTimeout(() => {
      setIsEnvelopeOpen(false);
      setTimeout(() => setScene('takeover'), 800);
    }, 600);
  };

  const reset = () => {
    setScene('ask');
    setNoCount(0);
    setIsEnvelopeOpen(false);
    setIsCardOut(false);
  };

  // Dynamic values for the Ask scene
  const yesScale = 1 + noCount * 0.35;
  const noScale = Math.max(0.4, 1 - noCount * 0.15);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-pink-100 to-red-100 flex items-center justify-center overflow-hidden font-sans selection:bg-rose-200">
      <HeartsBackground active={scene !== 'takeover'} count={15} />

      <AnimatePresence mode="wait">
        {/* SCENE 1: THE BIG QUESTION */}
        {scene === 'ask' && (
          <motion.div
            key="ask-scene"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            className="z-10 flex flex-col items-center px-6 text-center max-w-md"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="mb-8 text-rose-500 drop-shadow-lg"
            >
              <Heart size={80} fill="currentColor" stroke="none" />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold text-rose-900 mb-2 h-24 flex items-center justify-center">
              {NO_PHRASES[noCount]}
            </h1>

            {/* Added joke subtext */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-rose-400 font-medium mb-6 italic"
            >
              {noCount === 0 ? "Try saying no, I dare you! 😉" : ""}
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full pt-4">
              <motion.button
                style={{ scale: yesScale }}
                whileHover={{ scale: yesScale * 1.05 }}
                whileTap={{ scale: yesScale * 0.95 }}
                onClick={handleYes}
                className="bg-rose-500 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-rose-200 hover:bg-rose-600 transition-colors z-20"
                aria-label="Yes"
              >
                YES! 💖
              </motion.button>

              <motion.button
                style={{ scale: noScale }}
                whileHover={{ scale: noScale * 1.05 }}
                whileTap={{ scale: noScale * 0.95 }}
                onClick={handleNo}
                className="bg-white text-rose-500 border-2 border-rose-200 px-8 py-3 rounded-full font-medium shadow-md hover:border-rose-300 transition-all opacity-80"
                aria-label="No"
              >
                {noCount >= 4 ? "Please? 🥺" : "No"}
              </motion.button>
            </div>

            <p className="mt-12 text-rose-400 text-sm italic font-medium min-h-[1.5rem]">
              {noCount > 0 && `Think carefully, Karina! Click #${noCount}`}
            </p>
          </motion.div>
        )}

        {/* SCENE 2: THE ENVELOPE */}
        {scene === 'envelope' && (
          <motion.div
            key="envelope-scene"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="z-10 w-full max-w-lg flex flex-col items-center px-4"
          >
            <div className="relative w-72 h-48 md:w-96 md:h-64 cursor-pointer perspective-1000" onClick={toggleEnvelope}>
              {/* Envelope Body */}
              <div className="absolute inset-0 bg-rose-200 rounded-lg shadow-2xl border-2 border-rose-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-rose-100 opacity-50" style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0)' }}></div>
                <div className="absolute bottom-0 left-0 w-full h-full bg-rose-200" style={{ clipPath: 'polygon(0 100%, 50% 40%, 100% 100%)' }}></div>
              </div>

              {/* Envelope Flap */}
              <motion.div 
                animate={{ rotateX: isEnvelopeOpen ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-rose-300 border-b border-rose-400 rounded-t-lg origin-top z-30"
                style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
              />

              {/* The Card */}
              <motion.div
                initial={{ y: 0, zIndex: 10 }}
                animate={{ 
                  y: isCardOut ? -180 : 0,
                  scale: isCardOut ? 1.1 : 1,
                  zIndex: isCardOut ? 40 : 10
                }}
                transition={{ delay: 0.1, duration: 0.7, type: "spring" }}
                className="absolute left-[5%] top-[10%] w-[90%] h-[80%] bg-white rounded shadow-lg p-6 flex flex-col items-center justify-center text-center border border-rose-50"
              >
                 <Heart className="text-rose-500 mb-2" size={24} fill="currentColor" />
                 <h2 className="text-rose-900 font-serif font-bold text-lg mb-1">To: Karina</h2>
                 <p className="text-rose-400 text-xs">Tap to read full card</p>
              </motion.div>
            </div>

            <motion.p 
              animate={{ opacity: isEnvelopeOpen ? 0 : 1 }}
              className="mt-8 text-rose-600 font-bold flex items-center gap-2"
            >
              <Sparkles size={18} /> Click the envelope to open 💌
            </motion.p>

            {/* FULL SCREEN MODAL CARD */}
            <AnimatePresence>
              {isCardOut && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 100 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 100 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-rose-900/20 backdrop-blur-sm"
                >
                  <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-2xl relative p-8 overflow-hidden border-8 border-rose-100">
                    <button 
                      onClick={closeCard}
                      className="absolute top-4 right-4 text-rose-300 hover:text-rose-500 transition-colors p-2"
                    >
                      <X size={28} />
                    </button>
                    
                    <div className="mt-4">
                      <h2 className="text-2xl font-bold text-rose-600 mb-6 flex items-center gap-2">
                        Happy Valentine's, Karina! <Heart size={20} fill="currentColor" />
                      </h2>
                      <TypedText text={MESSAGE} />
                    </div>

                    <div className="absolute bottom-[-20px] right-[-20px] text-rose-50 opacity-10 rotate-12">
                       <Heart size={200} fill="currentColor" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* SCENE 3: TAKEOVER */}
        {scene === 'takeover' && (
          <motion.div
            key="takeover-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center bg-rose-50"
          >
            <HeartsBackground count={60} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", damping: 10 }}
              className="z-10"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-rose-600 mb-6 drop-shadow-md">
                Yay! I love you 💞
              </h1>
              <p className="text-rose-400 text-xl font-medium mb-12">
                You've made me the happiest person!
              </p>
              
              <button
                onClick={reset}
                className="bg-white/80 backdrop-blur text-rose-500 px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:bg-white transition-all font-bold border border-rose-100"
              >
                <RefreshCw size={18} /> Replay Experience
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
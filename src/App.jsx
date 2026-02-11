// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Heart, Mail, X, RefreshCw, Sparkles } from 'lucide-react';
// import confetti from 'canvas-confetti';

// /**
//  * UTILS & CONSTANTS
//  */
// const NO_PHRASES = [
//   "Would you be my Valentine?",
//   "Are you sure? 🥺",
//   "Think again... 🧸",
//   "Don't be stubborn 😳",
//   "You're making this difficult 😭",
//   "Last chance... 💔",
//   "Ok, I'm not taking no for an answer 💘",
// ];

// const MESSAGE = `To my dearest Karina,

// You make every single day feel like a
// celebration. I'm so lucky to have you in
// my life. Thank you for being the most
// wonderful person I know.

// Will you walk through this year
// holding my hand?

// Always yours,
// Me 💖`;

// /**
//  * COMPONENT: Floating Hearts Background
//  */
// const HeartsBackground = ({ count = 20, active = true }) => {
//   const hearts = useMemo(() => {
//     return Array.from({ length: count }).map((_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       size: Math.random() * (30 - 10) + 10,
//       duration: Math.random() * (10 - 5) + 5,
//       delay: Math.random() * 5,
//     }));
//   }, [count]);

//   if (!active) return null;

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
//       {hearts.map((h) => (
//         <motion.div
//           key={h.id}
//           initial={{ y: '110vh', opacity: 0, x: `${h.x}vw` }}
//           animate={{
//             y: '-10vh',
//             opacity: [0, 0.6, 0.6, 0],
//             x: [`${h.x}vw`, `${h.x + (Math.random() * 10 - 5)}vw`]
//           }}
//           transition={{
//             duration: h.duration,
//             repeat: Infinity,
//             delay: h.delay,
//             ease: "linear"
//           }}
//           className="absolute text-rose-300/40"
//         >
//           <Heart fill="currentColor" size={h.size} />
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// /**
//  * COMPONENT: Typed Text Effect
//  */
// const TypedText = ({ text, onComplete }) => {
//   const [displayedText, setDisplayedText] = useState("");
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (index < text.length) {
//       const timeout = setTimeout(() => {
//         setDisplayedText((prev) => prev + text[index]);
//         setIndex((prev) => prev + 1);
//       }, 40);
//       return () => clearTimeout(timeout);
//     } else if (onComplete) {
//       onComplete();
//     }
//   }, [index, text]);

//   return (
//     <div className="whitespace-pre-line font-medium text-rose-800 leading-relaxed relative">
//       {displayedText}
//       {index < text.length && (
//         <motion.span
//           animate={{ opacity: [0, 1, 0] }}
//           transition={{ repeat: Infinity, duration: 0.8 }}
//           className="inline-block w-1 h-5 bg-rose-500 ml-1 align-middle"
//         />
//       )}
//     </div>
//   );
// };

// /**
//  * MAIN APP COMPONENT
//  */
// export default function App() {
//   const [scene, setScene] = useState('ask'); // 'ask' | 'envelope' | 'takeover'
//   const [noCount, setNoCount] = useState(0);
//   const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
//   const [isCardOut, setIsCardOut] = useState(false);

//   // Scene Transitions
//   const handleYes = () => {
//     confetti({
//       particleCount: 150,
//       spread: 70,
//       origin: { y: 0.6 },
//       colors: ['#fb7185', '#f43f5e', '#ec4899']
//     });
//     setTimeout(() => setScene('envelope'), 400);
//   };

//   const handleNo = () => {
//     if (noCount < NO_PHRASES.length - 1) {
//       setNoCount(noCount + 1);
//     }
//   };

//   const toggleEnvelope = () => {
//     if (!isEnvelopeOpen) {
//       setIsEnvelopeOpen(true);
//       setTimeout(() => setIsCardOut(true), 600);
//     }
//   };

//   const closeCard = () => {
//     setIsCardOut(false);
//     setTimeout(() => {
//       setIsEnvelopeOpen(false);
//       setTimeout(() => setScene('takeover'), 800);
//     }, 600);
//   };

//   const reset = () => {
//     setScene('ask');
//     setNoCount(0);
//     setIsEnvelopeOpen(false);
//     setIsCardOut(false);
//   };

//   // Dynamic values for the Ask scene
//   const yesScale = 1 + noCount * 0.35;
//   const noScale = Math.max(0.4, 1 - noCount * 0.15);

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-pink-100 to-red-100 flex items-center justify-center overflow-hidden font-sans selection:bg-rose-200">
//       <HeartsBackground active={scene !== 'takeover'} count={15} />

//       <AnimatePresence mode="wait">
//         {/* SCENE 1: THE BIG QUESTION */}
//         {scene === 'ask' && (
//           <motion.div
//             key="ask-scene"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
//             className="z-10 flex flex-col items-center px-6 text-center max-w-md"
//           >
//             <motion.div
//               animate={{ y: [0, -10, 0] }}
//               transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
//               className="mb-8 text-rose-500 drop-shadow-lg"
//             >
//               <Heart size={80} fill="currentColor" stroke="none" />
//             </motion.div>

//             <h1 className="text-3xl md:text-4xl font-bold text-rose-900 mb-2 h-24 flex items-center justify-center">
//               {NO_PHRASES[noCount]}
//             </h1>

//             {/* Added joke subtext */}
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-rose-400 font-medium mb-6 italic"
//             >
//               {noCount === 0 ? "Try saying no, I dare you! 😉" : ""}
//             </motion.p>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full pt-4">
//               <motion.button
//                 style={{ scale: yesScale }}
//                 whileHover={{ scale: yesScale * 1.05 }}
//                 whileTap={{ scale: yesScale * 0.95 }}
//                 onClick={handleYes}
//                 className="bg-rose-500 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-rose-200 hover:bg-rose-600 transition-colors z-20"
//                 aria-label="Yes"
//               >
//                 YES! 💖
//               </motion.button>

//               <motion.button
//                 style={{ scale: noScale }}
//                 whileHover={{ scale: noScale * 1.05 }}
//                 whileTap={{ scale: noScale * 0.95 }}
//                 onClick={handleNo}
//                 className="bg-white text-rose-500 border-2 border-rose-200 px-8 py-3 rounded-full font-medium shadow-md hover:border-rose-300 transition-all opacity-80"
//                 aria-label="No"
//               >
//                 {noCount >= 4 ? "Please? 🥺" : "No"}
//               </motion.button>
//             </div>

//             <p className="mt-12 text-rose-400 text-sm italic font-medium min-h-[1.5rem]">
//               {noCount > 0 && `Think carefully, Karina! Click #${noCount}`}
//             </p>
//           </motion.div>
//         )}

//         {/* SCENE 2: THE ENVELOPE */}
//         {scene === 'envelope' && (
//           <motion.div
//             key="envelope-scene"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             className="z-10 w-full max-w-lg flex flex-col items-center px-4"
//           >
//             <div className="relative w-72 h-48 md:w-96 md:h-64 cursor-pointer perspective-1000" onClick={toggleEnvelope}>
//               {/* Envelope Body */}
//               <div className="absolute inset-0 bg-rose-200 rounded-lg shadow-2xl border-2 border-rose-300 overflow-hidden">
//                 <div className="absolute top-0 left-0 w-full h-full bg-rose-100 opacity-50" style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0)' }}></div>
//                 <div className="absolute bottom-0 left-0 w-full h-full bg-rose-200" style={{ clipPath: 'polygon(0 100%, 50% 40%, 100% 100%)' }}></div>
//               </div>

//               {/* Envelope Flap */}
//               <motion.div
//                 animate={{ rotateX: isEnvelopeOpen ? 180 : 0 }}
//                 transition={{ duration: 0.6, ease: "easeInOut" }}
//                 className="absolute top-0 left-0 w-full h-1/2 bg-rose-300 border-b border-rose-400 rounded-t-lg origin-top z-30"
//                 style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
//               />

//               {/* The Card */}
//               <motion.div
//                 initial={{ y: 0, zIndex: 10 }}
//                 animate={{
//                   y: isCardOut ? -180 : 0,
//                   scale: isCardOut ? 1.1 : 1,
//                   zIndex: isCardOut ? 40 : 10
//                 }}
//                 transition={{ delay: 0.1, duration: 0.7, type: "spring" }}
//                 className="absolute left-[5%] top-[10%] w-[90%] h-[80%] bg-white rounded shadow-lg p-6 flex flex-col items-center justify-center text-center border border-rose-50"
//               >
//                  <Heart className="text-rose-500 mb-2" size={24} fill="currentColor" />
//                  <h2 className="text-rose-900 font-serif font-bold text-lg mb-1">To: Karina</h2>
//                  <p className="text-rose-400 text-xs">Tap to read full card</p>
//               </motion.div>
//             </div>

//             <motion.p
//               animate={{ opacity: isEnvelopeOpen ? 0 : 1 }}
//               className="mt-8 text-rose-600 font-bold flex items-center gap-2"
//             >
//               <Sparkles size={18} /> Click the envelope to open 💌
//             </motion.p>

//             {/* FULL SCREEN MODAL CARD */}
//             <AnimatePresence>
//               {isCardOut && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.5, y: 100 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.5, y: 100 }}
//                   className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-rose-900/20 backdrop-blur-sm"
//                 >
//                   <div className="bg-white w-full max-w-md h-[500px] rounded-2xl shadow-2xl relative p-8 overflow-hidden border-8 border-rose-100">
//                     <button
//                       onClick={closeCard}
//                       className="absolute top-4 right-4 text-rose-300 hover:text-rose-500 transition-colors p-2"
//                     >
//                       <X size={28} />
//                     </button>

//                     <div className="mt-4">
//                       <h2 className="text-2xl font-bold text-rose-600 mb-6 flex items-center gap-2">
//                         Happy Valentine's, Karina! <Heart size={20} fill="currentColor" />
//                       </h2>
//                       <TypedText text={MESSAGE} />
//                     </div>

//                     <div className="absolute bottom-[-20px] right-[-20px] text-rose-50 opacity-10 rotate-12">
//                        <Heart size={200} fill="currentColor" />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         )}

//         {/* SCENE 3: TAKEOVER */}
//         {scene === 'takeover' && (
//           <motion.div
//             key="takeover-scene"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center bg-rose-50"
//           >
//             <HeartsBackground count={60} />
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.5, type: "spring", damping: 10 }}
//               className="z-10"
//             >
//               <h1 className="text-5xl md:text-7xl font-bold text-rose-600 mb-6 drop-shadow-md">
//                 Yay! I love you 💞
//               </h1>
//               <p className="text-rose-400 text-xl font-medium mb-12">
//                 You've made me the happiest person!
//               </p>

//               <button
//                 onClick={reset}
//                 className="bg-white/80 backdrop-blur text-rose-500 px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:bg-white transition-all font-bold border border-rose-100"
//               >
//                 <RefreshCw size={18} /> Replay Experience
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style>{`
//         .perspective-1000 {
//           perspective: 1000px;
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  RefreshCw,
  Sparkles,
  Star,
  Camera,
  Flame,
  Palette,
  Sun,
  Moon,
  Zap,
  Smile,
  Gem,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";

/**
 * CONFIGURARE TEXTE
 */
const NO_PHRASES = [
  "Karina, ești gata?",
  "Sigur nu vrei să vezi? 🥺",
  "Apasă pe Da... promit că merită 🧸",
  "Doar un clic distanță de ceva frumos! ✨",
  "Inima mea insistă... ❤️",
  "Ultima șansă... 🌹",
  "Gata, am ascuns butonul de Nu! 😜",
];

const MESSAGE = `Draga mea Karina,

Scriu aceste rânduri pentru că uneori cuvintele pur și simplu nu pot cuprinde tot ce simt. Ești mai mult decât o prezență în viața mea; ești acea lumină care transformă orice clipă banală în ceva cu adevărat special.

Îmi ești atât de dragă încât fiecare zâmbet al tău îmi dă o stare de bine pe care nu o pot explica, iar bunătatea ta mă inspiră în fiecare zi. Te prețuiesc enorm și vreau să știi că ești un om minunat care merită tot ce e mai bun.

Mulțumesc că ești tu, exact așa cum ești.

Cu toată admirația și dragul, 
Eu 💖`;

/**
 * COMPONENTE REUTILIZABILE
 */
const GalaxyBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#050103]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(244,63,94,0.1),transparent_80%)]" />
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{
          opacity: Math.random(),
          x: Math.random() * 100 + "vw",
          y: Math.random() * 100 + "vh",
        }}
        animate={{ opacity: [0.1, 0.5, 0.1] }}
        transition={{ duration: Math.random() * 5 + 3, repeat: Infinity }}
        className="absolute w-[1px] h-[1px] bg-white rounded-full shadow-[0_0_5px_white]"
      />
    ))}
  </div>
);

const TypedText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <div className="whitespace-pre-line font-medium text-rose-950 leading-relaxed font-serif italic text-xl md:text-2xl">
      {displayedText}
      {index < text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1 h-6 bg-rose-400 ml-1"
        />
      )}
    </div>
  );
};

export default function App() {
  const [scene, setScene] = useState("ask");
  const [step, setStep] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isCardOut, setIsCardOut] = useState(false);
  const [lovePower, setLovePower] = useState(0);
  const [customHearts, setCustomHearts] = useState([]);

  const handleYes = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#fb7185", "#f43f5e", "#ffffff"],
      disableForReducedMotion: true,
    });
    nextStep("charge");
  };

  const nextStep = (nextScene) => {
    setStep((prev) => prev + 1);
    setScene(nextScene);
  };

  const addHeart = (e) => {
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 20 + 15,
    };
    setCustomHearts((prev) => [...prev, newHeart]);
    setTimeout(
      () => setCustomHearts((prev) => prev.filter((h) => h.id !== newHeart.id)),
      1000,
    );
  };

  const reset = () => {
    setScene("ask");
    setStep(0);
    setNoCount(0);
    setIsEnvelopeOpen(false);
    setIsCardOut(false);
    setLovePower(0);
  };

  return (
    <div
      onMouseDown={scene === "final" ? addHeart : undefined}
      className="min-h-screen w-full bg-[#050103] flex items-center justify-center overflow-hidden font-sans select-none"
    >
      <GalaxyBackground />

      {/* INDICATOR DE PROGRES SUBTIL */}
      <div className="fixed top-8 flex gap-1.5 z-50">
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === step ? 24 : 6,
              backgroundColor: i <= step ? "#f43f5e" : "rgba(255,255,255,0.1)",
            }}
            className="h-1 rounded-full transition-all duration-500"
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* SCENA 1: ÎNCEPUTUL */}
        {scene === "ask" && (
          <motion.div
            key="ask"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="z-10 text-center px-6 max-w-lg"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="mb-10 inline-block p-4 bg-rose-500/10 rounded-full border border-rose-500/20"
            >
              <Heart size={60} className="text-rose-500" fill="currentColor" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight">
              {NO_PHRASES[noCount]}
            </h1>
            <div className="flex flex-col items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="bg-white text-black px-12 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-rose-50 transition-colors"
              >
                Da, vreau ✨
              </motion.button>
              {noCount < 6 && (
                <button
                  onClick={() => setNoCount(noCount + 1)}
                  className="text-white/30 text-sm hover:text-white/60 transition-colors"
                >
                  Poate mai târziu
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* SCENA 2: CONECTARE */}
        {scene === "charge" && (
          <motion.div
            key="charge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-10 text-center w-full max-md px-10"
          >
            <h2 className="text-2xl font-medium text-rose-100/80 mb-12">
              Simte energia...
            </h2>
            <div className="relative flex items-center justify-center mb-16">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute w-64 h-64 bg-rose-500 rounded-full blur-[80px]"
              />
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => {
                  setLovePower((prev) => Math.min(prev + 5, 100));
                  if (lovePower >= 95)
                    setTimeout(() => nextStep("qualities"), 600);
                }}
                className="relative z-10 w-40 h-40 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 flex flex-col items-center justify-center text-rose-500"
              >
                <Heart
                  size={40 + lovePower / 2}
                  fill="currentColor"
                  className="drop-shadow-lg"
                />
                <span className="mt-4 text-white font-bold tracking-widest">
                  {lovePower}%
                </span>
              </motion.button>
            </div>
            <p className="text-white/40 text-xs uppercase tracking-[0.3em]">
              Apasă repetat pe inimă
            </p>
          </motion.div>
        )}

        {/* SCENA 3: CALITĂȚI */}
        {scene === "qualities" && (
          <motion.div
            key="qualities"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="z-10 w-full max-w-lg px-6"
          >
            <h2 className="text-3xl font-bold text-white mb-10 text-center">
              De ce ești specială...
            </h2>
            <div className="grid gap-4">
              {[
                { I: Gem, c: "text-blue-400", t: "Bunătatea ta autentică" },
                {
                  I: Palette,
                  c: "text-purple-400",
                  t: "Creativitatea care te definește",
                },
                {
                  I: Smile,
                  c: "text-yellow-400",
                  t: "Zâmbetul care luminează tot",
                },
              ].map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  key={i}
                  className="bg-white/5 border border-white/10 p-5 rounded-3xl flex items-center gap-5"
                >
                  <div className={`p-3 bg-white/5 rounded-2xl ${item.c}`}>
                    <item.I size={24} />
                  </div>
                  <span className="text-white/90 font-medium text-lg">
                    {item.t}
                  </span>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => nextStep("light")}
              className="mt-12 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-bold flex items-center justify-center gap-2 transition-all"
            >
              Continuă <ChevronRight size={18} />
            </button>
          </motion.div>
        )}

        {/* SCENA 4: ATMOSFERĂ */}
        {scene === "light" && (
          <motion.div
            key="light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-10 w-full max-w-xl px-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { I: Sun, c: "text-orange-300", l: "Căldură" },
                { I: Moon, c: "text-indigo-300", l: "Liniște" },
                { I: Zap, c: "text-yellow-300", l: "Energie" },
                { I: Star, c: "text-rose-100", l: "Magie" },
              ].map((m, i) => (
                <motion.div
                  whileHover={{ y: -5 }}
                  key={i}
                  className="bg-white/5 aspect-square rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center gap-4"
                >
                  <m.I size={32} className={m.c} />
                  <span className="text-white/60 text-sm font-bold uppercase tracking-widest">
                    {m.l}
                  </span>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => nextStep("memories")}
              className="mt-8 w-full text-rose-300/60 text-sm font-bold flex items-center justify-center gap-2"
            >
              Amintiri dragi <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

        {/* SCENA 5: AMINTIRI (FOTO-STYLE) */}
        {scene === "memories" && (
          <motion.div key="memories" className="z-10 w-full max-w-md px-6">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Momentele noastre...
            </h2>
            <div className="space-y-4">
              {[
                "Prima noastră interacțiune",
                "Conversațiile lungi de seară",
                "Fiecare zâmbet împărtășit",
              ].map((t, i) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  key={i}
                  className="bg-white p-4 pb-8 rounded-sm shadow-2xl rotate-[-2deg] odd:rotate-[2deg]"
                >
                  <div className="aspect-video bg-rose-50 rounded-sm mb-4 flex items-center justify-center text-rose-200">
                    <Camera size={40} />
                  </div>
                  <p className="text-black/80 font-serif italic text-center">
                    {t}
                  </p>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => nextStep("envelope")}
              className="mt-12 w-full bg-rose-600 py-4 rounded-full text-white font-bold shadow-lg shadow-rose-900/20"
            >
              Am un mesaj pentru tine
            </button>
          </motion.div>
        )}

        {/* SCENA 6: SCRISOAREA */}
        {scene === "envelope" && (
          <motion.div
            key="envelope"
            className="z-10 flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative w-72 h-48 bg-rose-900 rounded-xl cursor-pointer shadow-2xl border border-rose-800/50"
              onClick={() => {
                setIsEnvelopeOpen(true);
                setTimeout(() => setIsCardOut(true), 600);
              }}
            >
              <AnimatePresence>
                {!isEnvelopeOpen && (
                  <motion.div
                    exit={{ rotateX: 180, opacity: 0 }}
                    className="absolute inset-0 bg-rose-800 rounded-xl origin-top z-20 flex items-center justify-center"
                    style={{ clipPath: "polygon(0 0, 50% 60%, 100% 0)" }}
                  />
                )}
              </AnimatePresence>
              <div className="absolute inset-0 flex items-center justify-center text-rose-200/20 uppercase font-black tracking-[0.5em]">
                Karina
              </div>

              <motion.div
                animate={{
                  y: isCardOut ? -220 : 0,
                  scale: isCardOut ? 1.1 : 1,
                }}
                className="absolute inset-4 bg-white rounded-lg shadow-xl z-10 flex flex-col items-center justify-center p-4 text-rose-900"
              >
                <Heart fill="currentColor" size={24} className="mb-2" />
                <span className="font-serif italic font-bold">
                  Pentru tine...
                </span>
              </motion.div>
            </motion.div>

            {isCardOut && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[100] bg-[#050103]/90 backdrop-blur-xl flex items-center justify-center p-6"
              >
                <motion.div
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  className="bg-[#fffcf9] w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col max-h-[85vh]"
                >
                  <div className="overflow-y-auto pr-2 custom-scrollbar flex-grow">
                    <TypedText text={MESSAGE} />
                  </div>
                  <button
                    onClick={() => nextStep("final")}
                    className="mt-8 bg-black text-white py-4 rounded-full font-bold uppercase text-xs tracking-[0.3em]"
                  >
                    Închide cu dragoste
                  </button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* SCENA FINALĂ */}
        {scene === "final" && (
          <motion.div
            key="final"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 text-center px-6 w-full max-w-md"
          >
            <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 relative overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-rose-500/20 blur-[50px] rounded-full"
              />
              <Sparkles className="mx-auto mb-8 text-yellow-400" size={40} />
              <h1 className="text-3xl font-bold text-white mb-6">
                Îmi ești dragă, Karina
              </h1>
              <p className="text-rose-100/60 leading-relaxed mb-10 italic font-serif text-lg">
                "Ești acea notă de frumos care face totul să sune mai bine."
              </p>

              <div className="bg-white/5 p-6 rounded-2xl mb-8 border border-white/5 text-sm text-rose-200/80">
                Să nu uiți niciodată cât de mult contezi.
              </div>

              <button
                onClick={reset}
                className="flex items-center gap-2 mx-auto text-white/20 hover:text-white/50 transition-colors text-xs uppercase tracking-widest font-bold"
              >
                <RefreshCw size={12} /> Reia povestea!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EFECT INIMIOARE */}
      {customHearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ opacity: 1, scale: 0, x: h.x - 10, y: h.y - 10 }}
          animate={{ opacity: 0, scale: 1.5, y: h.y - 120 }}
          className="fixed pointer-events-none z-[200] text-rose-500"
        >
          <Heart fill="currentColor" size={h.size} />
        </motion.div>
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #050103; color: white; }
        .font-serif { font-family: 'Dancing Script', cursive; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}

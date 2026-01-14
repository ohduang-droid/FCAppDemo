'use client';

import { motion } from 'framer-motion';
import { Play, Pause, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MagnetTheaterProps {
    title: string;
    isPlaying: boolean;
    onTogglePlay: () => void;
    onScrollDown: () => void;
    benefits?: string[];
    onFindAdvisor?: () => void;
}

export function MagnetTheater({ title, isPlaying, onTogglePlay, onScrollDown, benefits, onFindAdvisor }: MagnetTheaterProps) {
    // Sonar Ring Animation
    const sonarTransition = {
        duration: 4,
        repeat: Infinity,
        ease: "linear" as const
    };

    return (
        <div className="relative w-full h-screen bg-[#002349] overflow-hidden flex flex-col items-center justify-start text-white">
            {/* Background Texture (Noise) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                }}
            />

            {/* Central Resonance (Sonar Rings) */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                {/* Outer Ring */}
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full border border-white/10"
                    animate={{ rotate: 360 }}
                    transition={sonarTransition}
                    style={{ borderStyle: 'dashed' }}
                />
                {/* Mid Ring */}
                <motion.div
                    className="absolute w-[400px] h-[400px] rounded-full border border-[#B89B5E]/30"
                    animate={{ rotate: -360 }}
                    transition={{ ...sonarTransition, duration: 8 }}
                    style={{ borderStyle: 'dashed' }}
                />
                {/* Inner Ring */}
                <motion.div
                    className="absolute w-[250px] h-[250px] rounded-full border border-white/20"
                    animate={{ rotate: 180 }}
                    transition={{ ...sonarTransition, duration: 6 }}
                    style={{ borderStyle: 'dotted' }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-8 px-6 max-w-lg pt-16 sm:pt-24">

                {/* Dynamic Title */}
                <motion.h1
                    className="font-serif-luxury text-4xl sm:text-5xl leading-tight tracking-wide text-[#F9F9F9]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                >
                    {title.split('\n').map((line, i) => (
                        <span key={i} className="block">
                            {line}
                        </span>
                    ))}
                </motion.h1>

                {/* Audio Control (Play/Pause) */}
                <motion.button
                    onClick={onTogglePlay}
                    className="group relative flex items-center justify-center w-16 h-16 rounded-full border border-[#B89B5E] bg-[#002349]/50 backdrop-blur-sm hover:bg-[#B89B5E] transition-all duration-500"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isPlaying ? (
                        <Pause className="w-6 h-6 text-[#F9F9F9] fill-current" />
                    ) : (
                        <Play className="w-6 h-6 text-[#F9F9F9] fill-current ml-1" />
                    )}

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full border border-[#B89B5E] opacity-50 blur-[2px] animate-pulse group-hover:blur-[4px] transition-all" />
                </motion.button>

                {/* Benefits Section ("You'll get") */}
                {benefits && benefits.length > 0 && (
                    <motion.div
                        className="mt-12 bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-lg p-6 max-w-md w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        <h2 className="font-serif-luxury text-xl text-center mb-6 text-white">
                            You&apos;ll get:
                        </h2>
                        <ul className="space-y-3">
                            {benefits.map((benefit, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 + i * 0.1 }}
                                    className="flex items-start space-x-3 text-sm font-light leading-relaxed text-white/90"
                                >
                                    <span className="text-[#B89B5E] mt-1.5 text-xs">◆</span>
                                    <span>{benefit}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {/* CTA: Find an Advisor */}
                {onFindAdvisor && (
                    <motion.div
                        className="mt-8 w-full max-w-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        <button
                            onClick={onFindAdvisor}
                            className="w-full py-4 px-8 bg-[#B89B5E] text-black font-medium text-sm tracking-[0.2em] uppercase hover:bg-[#a38850] transition-colors shadow-lg active:scale-[0.98] duration-200"
                        >
                            Find an Advisor
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 z-10 cursor-pointer"
                onClick={onScrollDown}
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                    <span className="text-[10px] tracking-widest uppercase text-white">Discover</span>
                    <ChevronDown className="w-5 h-5 text-[#B89B5E]" />
                </div>
            </motion.div>
        </div>
    );
}

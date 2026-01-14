'use client';

import { motion } from 'framer-motion';
import { Play, Pause, X, Bookmark, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export interface AudioTheaterProps {
    isVisible: boolean;
    onScrollToRead: () => void;
    audioProgress: number;
    isPlaying: boolean;
    onTogglePlay: () => void;
}

export function AudioTheater({ isVisible, onScrollToRead, audioProgress, isPlaying, onTogglePlay }: AudioTheaterProps) {
    if (!isVisible) return null;

    // Show shimmer if near end (e.g., > 90%)
    const showShimmer = audioProgress > 0.9;
    
    // Category menu state
    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showContactModal, setShowContactModal] = useState(false);

    const categories = ['Tech News', 'Sport', 'Lifestyle', 'Business', 'Entertainment', 'Science', 'Travel', 'Food'];

    // Category to title mapping
    const categoryTitles: Record<string, string> = {
        'Tech News': 'Innovation Frontier: The Latest in Technology and Digital Transformation',
        'Sport': 'Athletic Excellence: Champions, Records, and Sporting Legends',
        'Lifestyle': 'Château Excellence: A Legacy of Terroir and Tradition',
        'Business': 'Market Insights: Strategic Leadership and Global Commerce',
        'Entertainment': 'Cultural Spotlight: Arts, Media, and Creative Expression',
        'Science': 'Discovery Channel: Breakthroughs in Research and Innovation',
        'Travel': 'Wanderlust Chronicles: Destinations, Cultures, and Adventures',
        'Food': 'Culinary Arts: Fine Dining, Recipes, and Gastronomic Journeys'
    };

    // Get current title based on selected category
    const currentTitle = selectedCategory 
        ? categoryTitles[selectedCategory] 
        : 'Château Excellence: A Legacy of Terroir and Tradition';

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setShowCategories(false);
    };

    const handleContactClick = () => {
        setShowContactModal(true);
        // Auto close after 3 seconds
        setTimeout(() => {
            setShowContactModal(false);
        }, 3000);
    };

    return (
        <>
        <motion.div
            className="relative w-full h-screen flex flex-col items-center justify-between py-12 px-6 z-40 overflow-hidden"
            style={{ top: '-16px', backgroundColor: '#002349' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1.0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Luxury Noise Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                }}
            />

            {/* Top Navigation Buttons */}
            <div className="w-full flex justify-between items-center z-10 gap-4 border border-white/20 rounded-lg p-4 backdrop-blur-[20px] bg-white/5">
                {/* Wine Image */}
                <div className="w-20 h-20 rounded-xl bg-[#F5E6E6] flex-shrink-0 overflow-hidden shadow-lg">
                    <img 
                        src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=200&h=200&fit=crop&crop=center" 
                        alt="Wine"
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Title */}
                <div className="flex-1 min-w-0">
                    <motion.h3 
                        className="text-white text-base font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis"
                        key={selectedCategory || 'default'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentTitle}
                    </motion.h3>
                </div>
                
                <button 
                    onClick={toggleCategories}
                    className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-[20px] border border-white/10 flex items-center justify-center flex-shrink-0"
                >
                    <Menu size={20} className="text-white" strokeWidth={2} />
                </button>
            </div>

            {/* Category Menu - Slide in from right */}
            {showCategories && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCategories}
                    />
                    
                    {/* Category Panel */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-80 z-50 backdrop-blur-[20px] bg-[rgba(60,50,80,0.95)] border-l border-white/10 shadow-2xl"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="flex flex-col h-full pt-6">
                            {/* Header */}
                            <div className="flex justify-between items-center px-6 pb-6 border-b border-white/10">
                                <h2 className="text-white text-lg font-medium">Categories</h2>
                                <button
                                    onClick={toggleCategories}
                                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                                >
                                    <X size={16} className="text-white" />
                                </button>
                            </div>

                            {/* Category List */}
                            <div className="flex-1 overflow-y-auto px-6 py-6">
                                <div className="space-y-2">
                                    {categories.map((category, index) => (
                                        <motion.button
                                            key={category}
                                            className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => handleCategorySelect(category)}
                                        >
                                            <span className="text-white text-sm font-medium">{category}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}


            {/* Top Bar - Identity */}
            <motion.div
                className="w-full flex justify-center z-10"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
            >
                <h2 className="text-white text-[10px] tracking-[0.3em] font-serif-luxury font-light uppercase px-4 py-2 rounded-none" style={{ backgroundColor: '#002349' }}>SOTHEBY&apos;S INTERNATIONAL REALTY</h2>
            </motion.div>

            {/* The Stage - Breathing Sonar Halo */}
            <div className="flex-1 flex flex-col items-center justify-center relative w-full z-10">

                {/* Ring 1 - Outer Slow */}
                <motion.svg
                    className="absolute w-[400px] h-[400px]"
                    viewBox="0 0 400 400"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    <circle cx="200" cy="200" r="198" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 8" />
                </motion.svg>

                {/* Ring 2 - Mid Breathing */}
                <motion.svg
                    className="absolute w-[320px] h-[320px]"
                    viewBox="0 0 320 320"
                    animate={{ rotate: -360, scale: [0.95, 1.05, 0.95] }}
                    transition={{
                        rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                        scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <circle cx="160" cy="160" r="158" fill="none" stroke="rgba(184, 155, 94, 0.4)" strokeWidth="1" strokeDasharray="2 10" />
                </motion.svg>

                {/* Ring 3 - Inner Pulse */}
                <motion.svg
                    className="absolute w-[240px] h-[240px]"
                    viewBox="0 0 240 240"
                    animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{
                        duration: 4, repeat: Infinity, ease: "easeInOut"
                    }}
                >
                    <circle cx="120" cy="120" r="118" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="1 4" />
                </motion.svg>

                {/* Core Focus - Inner Glow & Frosted */}
                <div
                    className="w-48 h-48 rounded-full bg-[#0A0A0A] shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer pointer-events-auto relative overflow-hidden group border border-white/5"
                    onClick={onTogglePlay}
                >
                    {/* Subtle Inner Glow */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />

                    {/* Status */}
                    <div className="text-white/80 p-6 relative z-10 transition-transform duration-500 group-hover:scale-110">
                        {isPlaying ? <Pause size={20} strokeWidth={0.5} /> : <Play size={20} strokeWidth={0.5} className="ml-1" />}
                    </div>
                </div>
            </div>

            {/* Bottom Controls - Identity Bar (Heavy Glass) */}
            <motion.div
                className="w-full h-16 rounded-full flex items-center justify-between px-2 backdrop-blur-[20px] bg-white/5 border border-white/10 z-20 cursor-pointer overflow-hidden relative group"
                style={{
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    marginTop: '20px'
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={onScrollToRead}
            >
                <div className="flex items-center space-x-4 pl-2">
                    <div className="w-10 h-10 rounded-full bg-stone-800 border border-white/10 overflow-hidden relative">
                        {/* User Avatar Image */}
                        <img
                            src="https://dl6bglhcfn2kh.cloudfront.net/James-Falconer-c9710917869cf8554ca5bc49f6595242.jpg?version=1749563435"
                            alt="James"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white text-xs font-medium tracking-wide">James Edition</span>
                        <div className="flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-white/60 text-[10px] uppercase tracking-wider">Online Now</span>
                        </div>
                    </div>
                </div>

                {/* Contact me Button with Golden Shimmer */}
                <div className="relative overflow-hidden rounded-full cursor-pointer" onClick={handleContactClick}>
                    <div className="w-80 h-10 rounded-full flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: '#C29B40' }}>
                        <span className="text-white text-sm font-bold font-serif italic pr-0.5">Contact me</span>
                    </div>

                    {/* Golden Shimmer Overlay */}
                    {showShimmer && (
                        <motion.div
                            className="absolute inset-0 z-20 pointer-events-none"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.0 }}
                        >
                            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#B89B5E]/60 to-transparent skew-x-12 blur-[2px]" />
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>

        {/* Contact Modal */}
        {showContactModal && (
            <>
                {/* Backdrop */}
                <motion.div
                    className="fixed inset-0 z-[60] bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowContactModal(false)}
                />
                
                {/* Modal */}
                <motion.div
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[70] bg-[#002349] rounded-2xl p-8 max-w-md w-[90%] shadow-2xl border border-white/10"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                    <div className="flex flex-col items-center text-center space-y-4">
                        {/* Success Icon */}
                        <div className="w-16 h-16 rounded-full bg-[#C29B40]/20 flex items-center justify-center mb-2">
                            <svg className="w-8 h-8 text-[#C29B40]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        
                        {/* Message */}
                        <p className="text-white text-lg font-semibold leading-relaxed">
                            Thanks for your email. We&apos;ve received it and will reach out shortly.
                        </p>
                        
                        {/* Close Button */}
                        <button
                            onClick={() => setShowContactModal(false)}
                            className="mt-4 px-6 py-2 rounded-full bg-[#C29B40] text-white text-sm font-medium hover:bg-[#C29B40]/90 transition-colors"
                        >
                            OK
                        </button>
                    </div>
                </motion.div>
            </>
        )}
        </>
    );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnetTheater } from '../components/flow/MagnetTheater';
import { motion } from 'framer-motion';

export default function MagnetPage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const handleFindAdvisor = () => {
    router.push('/advisors');
  };

  // Sample data
  const title = 'The Luxury Market Lowdown\nNorth Texas 2025';
  const benefits = [
    "D-FW accounts for 39% of Texas luxury sales ($8.5B)",
    "Resilient pricing in Park Cities & Preston Hollow",
    "Strategic opportunities for buyers in 2026"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Magnet Theater Section */}
      <MagnetTheater
        title={title}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onScrollDown={handleScrollDown}
      />

      {/* Content Section */}
      <div className="relative z-20 bg-[#F9F9F9] text-[#000000] pb-24">
        <div className="max-w-xl mx-auto px-6 pt-16 sm:pt-24">
          {/* Benefits Section ("You'll get") */}
          <div className="mb-16 bg-white p-8 shadow-sm border border-gray-100">
            <h2 className="font-serif-luxury text-2xl text-center mb-8 text-[#002349]">
              You&apos;ll get:
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start space-x-3 text-lg font-light leading-relaxed text-gray-800"
                >
                  <span className="text-[#B89B5E] mt-1.5 text-xs">◆</span>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA: Find an Advisor */}
          <div className="mt-16 sm:mt-24 space-y-6 text-center">
            <p className="text-gray-500 text-sm font-light italic">
              Unlock the full collection through a dedicated advisor.
            </p>
            <button
              onClick={handleFindAdvisor}
              className="w-full py-4 px-8 bg-[#B89B5E] text-black font-medium text-sm tracking-[0.2em] uppercase hover:bg-[#a38850] transition-colors shadow-lg active:scale-[0.98] duration-200"
            >
              Find an Advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

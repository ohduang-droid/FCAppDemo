'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface MagnetContentProps {
    author: string;
    time: string;
    contentHtml: string;
    benefits: string[];
    onFindAdvisor: () => void;
}

export function MagnetContent({ author, time, contentHtml, benefits, onFindAdvisor }: MagnetContentProps) {
    return (
        <div className="relative z-20 bg-[#F9F9F9] text-[#000000] pb-24">
            <div className="max-w-xl mx-auto px-6 pt-16 sm:pt-24">

                {/* Benefits Section ("You'll get") - Preserved List */}
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
                <div className="mt-16 sm:mt-24 text-center">
                    <button
                        onClick={onFindAdvisor}
                        className="w-full py-4 px-8 bg-[#B89B5E] text-black font-medium text-sm tracking-[0.2em] uppercase hover:bg-[#a38850] transition-colors shadow-lg active:scale-[0.98] duration-200"
                    >
                        Find an Advisor
                    </button>
                </div>

            </div>
        </div>
    );
}

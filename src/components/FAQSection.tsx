/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

const faqItems: FAQItem[] = [
  {
    id: 'specialize',
    question: 'What do you specialize in?',
    answer: 'Logos-native engineering: confidential compute, zkVM execution, and on-chain verification. We are deeply specialized in sBPF, RISC Zero, and elliptic curve operations like BN254 G1/G2 computations.'
  },
  {
    id: 'rfps',
    question: 'Do you work on RFPs and the λPrize?',
    answer: 'Yes — we author and deliver proposals end-to-end, and we have shipped multiple competitive submissions, including winner-podium submissions covering confidential compute frameworks.'
  },
  {
    id: 'retainer',
    question: 'Can we hire you on retainer?',
    answer: 'Yes. We embed as senior engineers for protocol teams. By removing account managers and agency overhead, you get builder-to-builder access to ship features under a predictable subscription model.'
  },
  {
    id: 'security',
    question: 'How do you handle correctness and security?',
    answer: 'Tests stay green at every commit; we review every line for correctness before shipping. All code includes full benchmark specs, strict integration coverage testing, and complete documentation of verification bounds.'
  },
  {
    id: 'outside-logos',
    question: 'Do you work outside Logos?',
    answer: 'Our core focus is Logos and the LEZ (Logos Execution Zone) stack. However, we deliver secure verifiers and program routers on wider sBPF substrates (like Solana or custom side-chains) if they integrate or bridge into the wider Logos network.'
  },
  {
    id: 'start',
    question: 'How do we start?',
    answer: 'Select "Book a call" or "Start a project" to configure a consultation loop. We will analyze your specifications and layout a code-rationalized implementation plan within 48 hours.'
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3 font-sans">
      {faqItems.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-xl border border-dark-border bg-dark-card overflow-hidden transition-all duration-300 hover:border-dark-border"
          >
            {/* Question Header */}
            <button
              onClick={() => toggleFAQ(item.id)}
              className="w-full flex items-center justify-between p-5 text-left select-none outline-hidden"
              aria-expanded={isOpen}
            >
              <div className="flex items-center space-x-3.5 pr-4">
                <HelpCircle className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  isOpen ? 'text-brand' : 'text-gray-500'
                }`} />
                <span className="text-sm font-semibold text-white tracking-tight">
                  {item.question}
                </span>
              </div>
              <div className="flex-shrink-0 p-1 bg-[#0e0e11] border border-dark-border/80 text-gray-400 rounded-lg group hover:text-white transition-colors duration-200">
                {isOpen ? (
                  <Minus className="w-3.5 h-3.5 text-brand" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
              </div>
            </button>

            {/* Answer body (Smooth Collapse) */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-5 pb-5 pt-0.5 border-t border-dark-border/40 text-sm text-gray-400 leading-relaxed font-sans">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

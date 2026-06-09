/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, KeyRound, Notebook, Code, LayoutGrid, CheckCircle2 } from 'lucide-react';

interface ServiceProp {
  id: string;
  title: string;
  description: string;
  index: number;
  key?: React.Key;
}

export default function ServiceCard({ id, title, description, index }: ServiceProp) {
  const [isHovered, setIsHovered] = useState(false);
  const [step, setStep] = useState(0);

  // Simple micro-simulation scheduler for interactive elements
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 6);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const getIcon = () => {
    switch (id) {
      case 'confidential': return <KeyRound className="w-5 h-5 text-brand" />;
      case 'zkvm': return <Cpu className="w-5 h-5 text-brand" />;
      case 'onchain': return <ShieldCheck className="w-5 h-5 text-brand" />;
      case 'rfp': return <Notebook className="w-5 h-5 text-brand" />;
      case 'retainer': return <Code className="w-5 h-5 text-brand" />;
      default: return <LayoutGrid className="w-5 h-5 text-brand" />;
    }
  };

  // Render a specific premium visual simulator based on service category
  const renderVisualMock = () => {
    switch (id) {
      case 'confidential':
        return (
          <div className="mt-4 p-3 bg-[#08080A] rounded border border-dark-border/40 font-mono text-[10px] space-y-1.5 h-22 overflow-hidden select-none">
            <div className="flex justify-between text-gray-500 leading-none">
              <span>LEZ_STATE_CIPHER</span>
              <span className="text-brand-green">ACTIVE</span>
            </div>
            <div className="flex items-center space-x-1.5 pt-1">
              <span className="text-gray-400">PUBLIC:</span>
              <span className="bg-dark-border px-1 text-gray-400 text-[8px] rounded">Program_ID::0xffe</span>
            </div>
            <div className="flex justify-between items-center bg-brand/5 border border-brand/10 p-1 rounded animate-pulse">
              <span className="text-[9px] text-brand uppercase tracking-wider">PRIVATE PDA</span>
              <span className="text-brand font-semibold font-mono">0x2a9e...f7b3</span>
            </div>
            <div className="text-[8px] text-gray-600 truncate">
              {`>> decrypt(0x2a9e...f7b3, sig_b254) -> OK`}
            </div>
          </div>
        );

      case 'zkvm':
        return (
          <div className="mt-4 p-3 bg-[#08080A] rounded border border-dark-border/40 font-mono text-[10px] space-y-1 h-22 overflow-hidden select-none">
            <div className="flex justify-between text-gray-500">
              <span className="text-[9px]">RISC0_PROVER</span>
              <span className="text-brand">RUNNING</span>
            </div>
            <div className="w-full bg-dark-border h-1 rounded-xs overflow-hidden mt-1 bg-gray-800">
              <div 
                className="bg-brand h-full transition-all duration-1000 ease-in-out" 
                style={{ width: `${(step + 1) * 16.6}%` }} 
              />
            </div>
            <div className="flex items-center space-x-2 pt-1 text-[8px]">
              <span className="text-gray-500">CYCLE_COUNT:</span>
              <span className="text-brand-green">141,852</span>
            </div>
            <div className="flex justify-between items-center text-[9px] text-gray-400">
              <span>ESTIMATING GROTH16...</span>
              <span className={step === 5 ? "text-brand-green font-bold" : "text-gray-500"}>
                {step === 5 ? "[VERIFIED]" : "[PROOFING]"}
              </span>
            </div>
          </div>
        );

      case 'onchain':
        return (
          <div className="mt-4 p-3 bg-[#08080A] rounded border border-dark-border/40 font-mono text-[10px] space-y-1 h-22 overflow-hidden select-none">
            <div className="flex justify-between border-b border-dark-border/60 pb-1 text-gray-500">
              <span>SOLANA_VERIFIER_ROUTER</span>
              <span className="text-[8px] px-1 bg-brand-green/10 text-brand-green rounded">SECURE</span>
            </div>
            <div className="space-y-0.5 pt-1 text-[8px] text-gray-400">
              <div className="flex justify-between">
                <span>Curve:</span>
                <span>BN254 (Alt_bn128)</span>
              </div>
              <div className="flex justify-between">
                <span>Proof Inputs:</span>
                <span className="text-brand-green">Checked & Validated</span>
              </div>
              <div className="flex justify-between text-gray-300 font-semibold bg-dark-border/40 px-1 rounded">
                <span>Result:</span>
                <span>ProgramExecutionOK()</span>
              </div>
            </div>
          </div>
        );

      case 'rfp':
        return (
          <div className="mt-4 p-3 bg-[#08080A] rounded border border-dark-border/40 font-mono text-[10px] space-y-1 h-22 overflow-hidden select-none">
            <div className="text-gray-500 text-[9px] uppercase tracking-wider">Milestone Progress</div>
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { name: 'SPEC', active: true },
                { name: 'CODE', active: step >= 1 },
                { name: 'TEST', active: step >= 3 },
                { name: 'MERGE', active: step >= 5 }
              ].map((m, i) => (
                <div 
                  key={i} 
                  className={`text-center py-1 rounded-sm text-[8px] border transition-all duration-300 ${
                    m.active 
                      ? 'bg-brand/10 text-brand border-brand/35 font-semibold' 
                      : 'bg-dark-bg text-gray-600 border-dark-border'
                  }`}
                >
                  {m.name}
                </div>
              ))}
            </div>
            <div className="text-[8px] text-gray-500 pt-1 leading-normal">
              {step >= 5 ? '>> Delivery validated by Grant Committee' : '>> Executing Milestone benchmarks...'}
            </div>
          </div>
        );

      case 'retainer':
        return (
          <div className="mt-4 p-3 bg-[#08080A] rounded border border-dark-border/40 font-mono text-[10px] space-y-1.5 h-22 overflow-hidden select-none">
            <div className="flex space-x-1.5 text-gray-500 text-[8px] border-b border-dark-border pb-1">
              <span className="text-brand-green">●</span>
              <span>BRANCH: main</span>
              <span className="text-gray-600">/ commit: 8fb2e7</span>
            </div>
            <div className="space-y-0.5 text-[8px] leading-tight text-brand-green">
              <div><span className="text-gray-600">[+]</span> src/lib.rs - private keys generated</div>
              <div><span className="text-gray-600">[+]</span> tests/sbpf_tests.rs - coverage 100%</div>
              <div className="text-brand animate-pulse"><span className="text-gray-500">[*]</span> cargo clippy --all-targets - [Passed]</div>
            </div>
          </div>
        );

      default:
        return (
          <div className="mt-4 p-3 bg-[#08080A] rounded border border-dark-border/40 font-mono text-[10px] space-y-1 h-22 overflow-hidden select-none">
            <div className="text-gray-500 border-b border-dark-border pb-1 mb-1">AUDIT_VERIFIED();</div>
            <div className="flex items-center space-x-1 text-xs justify-center pt-1.5 text-brand-green">
              <CheckCircle2 className="w-5 h-5 text-brand" />
              <span className="font-display font-semibold tracking-tight">STRICT CORRECTNESS</span>
            </div>
            <div className="text-[8px] text-center text-gray-500 pt-1">
              Zero safety omissions. Formal rationale documented.
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-xl border border-dark-border bg-dark-card p-6 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-md"
      style={{
        boxShadow: isHovered 
          ? '0 14px 40px -20px rgba(61, 220, 151, 0.12), inset 0 0 0 1px rgba(61, 220, 151, 0.15)' 
          : 'none',
        borderColor: isHovered ? '#3DDC97' : '#26262A'
      }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand/5 to-transparent rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-brand/5 rounded-lg border border-brand/10 group-hover:border-brand/30 group-hover:bg-brand/10 transition-colors duration-300">
            {getIcon()}
          </div>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            0{index + 1} // CAPABILITY
          </span>
        </div>

        <h3 className="text-lg font-display font-bold text-white group-hover:text-brand transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-sm text-gray-400 mt-2.5 leading-relaxed font-sans">
          {description}
        </p>
      </div>

      <div>
        {renderVisualMock()}
      </div>
    </motion.div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sparkles, ArrowUp, X, Check, BrainCircuit } from "lucide-react";
import { LAYERS, ROLES } from "../data";
import { LayerId } from "../types";

export default function WhereYouFit() {
  const [selectedLayer, setSelectedLayer] = useState<LayerId | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeLayerData = selectedLayer ? LAYERS.find(l => l.id === selectedLayer) : null;

  const handleLayerClick = (layerId: LayerId) => {
    setSelectedLayer(layerId);
    setIsModalOpen(true);
  };

  return (
    <section 
      className="py-16 md:py-24 bg-white border-b border-brand-line/45 relative" 
      id="where-you-fit"
      aria-labelledby="where-you-fit-h2"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-bold px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">
            System Infrastructure
          </span>
          <h2 id="where-you-fit-h2" className="text-2xl md:text-4xl font-extrabold font-display tracking-tight text-brand-ink mt-4 leading-tight">
            The Three-Layer Architecture
          </h2>
          <p className="mt-4 text-base text-gray-500 font-sans leading-relaxed">
            Our marketing is becoming an automated ecosystem. Today, you start building the core middle layer. Click any layer to open its detailed mapping frame.
          </p>
        </div>

        {/* Stack Grid */}
        <div className="max-w-3xl mx-auto space-y-6" id="three-layer-stack-grid">
          
          {LAYERS.map((layer) => {
            const isAgentic = layer.id === "agent";

            return (
              <button
                key={layer.id}
                onClick={() => handleLayerClick(layer.id)}
                className={`w-full text-left rounded-3xl p-6 md:p-8 border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isAgentic
                    ? "bg-gradient-to-br from-[#EFF4FF] to-white border-brand-primary shadow-xl ring-2 ring-brand-primary/10 scale-102 hover:scale-[1.025]"
                    : "bg-white border-brand-line/60 hover:border-brand-primary/30 hover:shadow-md hover:scale-[1.01]"
                }`}
                aria-label={`Open detailed mapping frame for ${layer.title}`}
              >
                {/* Special Workshop Central Highlight elements on Agentic Layer */}
                {isAgentic && (
                  <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary" />
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        layer.id === "lake" ? "bg-cyan-500" : layer.id === "agent" ? "bg-brand-primary animate-pulse" : "bg-emerald-500"
                      }`} />
                      <span className="text-[10px] font-mono text-gray-400 capitalize uppercase tracking-widest font-bold">
                        {layer.subtitle} Layer
                      </span>
                      
                      {isAgentic && (
                        <span className="text-[9px] font-mono font-bold bg-brand-primary text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          <BrainCircuit className="w-2.5 h-2.5" />
                          <span>⚡ WORKSHOP CENTRAL FOCUS</span>
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold font-display text-brand-ink">
                      {layer.title}
                    </h3>
                  </div>

                  <span className={`text-[10px] px-3 py-1.5 border rounded-xl font-mono shrink-0 transition-colors ${
                    isAgentic 
                      ? "bg-brand-primary text-white border-brand-primary" 
                      : "bg-gray-5 w-auto text-gray-500 border-gray-200 group-hover:bg-brand-primary/5 group-hover:border-brand-primary/25"
                  }`}>
                    OPEN MAP FRAME
                  </span>
                </div>

                <p className="text-sm text-gray-500 font-sans mt-4 leading-relaxed max-w-2xl relative z-10">
                  {layer.description}
                </p>

                {isAgentic && (
                  <div className="mt-4 px-4 py-3.5 bg-brand-primary text-white rounded-2xl text-sm font-extrabold flex items-center gap-2 relative z-10 shadow-md">
                    <span className="flex h-2 w-4 shrink-0 items-center justify-center">
                      <span className="absolute h-2.5 w-2.5 rounded-full bg-white animate-ping" />
                      <span className="relative h-2 w-2 rounded-full bg-white" />
                    </span>
                    <span>This entire workshop centers on this layer.</span>
                  </div>
                )}
              </button>
            );
          })}

        </div>

        {/* Modal Overlay Mapping Frame */}
        {isModalOpen && activeLayerData && (
          <div className="fixed inset-0 bg-brand-ink/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 shadow-2xl" id="layer-modal-overlay">
            <div className="bg-white w-full max-w-3xl rounded-3xl border border-brand-line shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
              
              {/* Modal header */}
              <div className="p-6 border-b border-brand-line flex items-center justify-between bg-gray-50/50">
                <div className="text-left">
                  <span className="text-[10px] font-mono text-brand-primary uppercase tracking-widest font-bold bg-brand-primary/10 px-2 py-0.5 rounded border border-brand-primary/15">
                    Layer Specifications
                  </span>
                  <h3 className="text-lg md:text-xl font-bold font-display tracking-tight text-brand-ink mt-1.5">
                    {activeLayerData.title} Mapping Frame
                  </h3>
                </div>
                
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-full border border-gray-250 bg-white hover:bg-gray-100 text-gray-400 hover:text-brand-ink flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close layout mapping details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 md:p-8 overflow-y-auto text-left space-y-6 flex-1">
                
                {/* Showcase Central Topic Box */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-400 block font-bold">
                    CORE STRATEGY
                  </span>
                  <p className="text-sm sm:text-base text-gray-500 font-sans leading-relaxed">
                    {activeLayerData.description}
                  </p>
                </div>

                {/* Focus specific explanation block */}
                {activeLayerData.id === "agent" && (
                  <div className="p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-primary flex items-center gap-1">
                      <BrainCircuit className="w-3.5 h-3.5" />
                      <span>THE EXCLUSIVE WORKSHOP CENTRAL FOCUS</span>
                    </span>
                    <p className="text-xs text-brand-ink font-sans leading-relaxed">
                      At the 30th, you will dive directly into our agentic blueprint. By authorship of standardized custom prompts, structured pipeline steps, and custom brand parameters, you will build microfunctional agent systems. These are the tools that run your repetitive campaign workflows for you automatically!
                    </p>
                  </div>
                )}

                {/* Role Specific Actions Checklist */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-450 block font-bold">
                    HOW YOUR SPECIFIC ROLE INTERACTS WITH THE {activeLayerData.subtitle.toUpperCase()} LAYER
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ROLES.map((role) => {
                      const interactionText = activeLayerData.whatYouDo[role.id];
                      return (
                        <div key={role.id} className="bg-[#FCFCFD] border border-brand-line/60 rounded-xl p-3.5 flex items-start gap-2.5 shadow-xs">
                          <div className="w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary shrink-0 flex items-center justify-center mt-0.5">
                            <Check className="w-3.5 h-3.5 font-extrabold" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-brand-ink font-sans block mb-0.5">
                              {role.label}
                            </span>
                            <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                              {interactionText}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 border-t border-brand-line/50 flex items-center justify-end bg-gray-50/40">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-brand-ink text-white hover:bg-gray-800 text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  Close Specification
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

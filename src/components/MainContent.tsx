import React from 'react';
import { Search, BookOpen, Rocket, Router, Code } from 'lucide-react';

export function MainContent() {
  return (
    <main className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden relative">
      <header className="h-xl px-margin flex justify-between items-center bg-surface-container-lowest border-b border-outline-variant shrink-0 z-10">
        <div className="flex items-center gap-md">
          <span className="text-headline-sm font-headline-sm font-bold text-on-surface uppercase">Platform Documentation</span>
        </div>
        <div className="flex items-center gap-sm">
          <div className="relative">
            <Search className="absolute left-xs top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search documentation..."
              className="bg-surface border border-outline-variant text-on-surface text-[14px] rounded-lg pl-8 pr-xs py-[6px] w-64 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-on-surface-variant/50"
            />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-margin lg:px-xl relative scrollbar-hide flex flex-col items-center justify-center min-h-full">
        <div className="max-w-3xl w-full mx-auto text-center flex flex-col items-center">
          <div className="w-64 h-64 mb-lg relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative w-full h-full flex items-center justify-center bg-surface-container border border-outline-variant rounded-3xl shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <BookOpen className="w-[100px] h-[100px] text-primary" />
            </div>
          </div>
          
          <h1 className="text-display-lg font-display-lg text-on-surface mb-sm">Welcome To The Learning Platform</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant mb-xl max-w-xl mx-auto">
            Your central hub for engineering documentation, onboarding guides, and interactive learning tools.
          </p>

          <div className="w-full max-w-2xl py-md border-t border-outline-variant/30 mt-md"></div>

          <div className="flex gap-md mt-xl">
            <a href="#" className="flex flex-col items-center gap-sm p-md bg-surface-container hover:bg-surface-variant border border-outline-variant rounded-xl transition-colors w-40">
              <Rocket className="w-8 h-8 text-secondary" />
              <span className="text-[14px] font-semibold text-on-surface">Getting Started</span>
            </a>
            <a href="#" className="flex flex-col items-center gap-sm p-md bg-surface-container hover:bg-surface-variant border border-outline-variant rounded-xl transition-colors w-40">
              <Router className="w-8 h-8 text-primary" />
              <span className="text-[14px] font-semibold text-on-surface">Edge Gateway</span>
            </a>
            <a href="#" className="flex flex-col items-center gap-sm p-md bg-surface-container hover:bg-surface-variant border border-outline-variant rounded-xl transition-colors w-40">
              <Code className="w-8 h-8 text-tertiary" />
              <span className="text-[14px] font-semibold text-on-surface">API Reference</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

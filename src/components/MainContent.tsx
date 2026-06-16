import React from 'react';
import { Search, BookOpen } from 'lucide-react';
import { DocSection } from '../parseMarkdown';
import ReactMarkdown from 'react-markdown';

interface MainContentProps {
  activeSection: DocSection | null;
}

export function MainContent({ activeSection }: MainContentProps) {
  return (
    <main className="flex-1 flex flex-col min-w-[400px] bg-background overflow-hidden relative">
      <header className="h-xl px-margin flex justify-between items-center bg-surface-container-lowest border-b border-outline-variant shrink-0 z-10">
        <div className="flex items-center gap-md">
          <span className="text-headline-sm font-headline-sm font-bold text-on-surface uppercase">
            {activeSection ? activeSection.title : 'Platform Documentation'}
          </span>
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

      <div className="flex-1 overflow-y-auto p-margin lg:px-xl relative scrollbar-hide flex flex-col">
        {activeSection ? (
          <article className="max-w-3xl w-full mx-auto markdown-body text-on-surface">
            {/* Section intro content */}
            {activeSection.content && (
              <div className="mb-lg text-body-md text-on-surface-variant">
                <ReactMarkdown>{activeSection.content}</ReactMarkdown>
              </div>
            )}

            {/* Subsections */}
            {activeSection.subsections.map(sub => (
              <section key={sub.id} className="mb-lg">
                <h3 className="text-headline-sm font-headline-sm font-semibold text-on-surface mb-sm border-b border-outline-variant pb-xs">
                  {sub.title}
                </h3>
                <div className="text-body-md text-on-surface-variant leading-relaxed">
                  <ReactMarkdown>{sub.content}</ReactMarkdown>
                </div>
              </section>
            ))}
          </article>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full text-center flex flex-col items-center px-md">
              <div className="w-64 h-64 mb-lg relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="relative w-full h-full flex items-center justify-center bg-surface-container border border-outline-variant rounded-3xl shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <BookOpen className="w-[100px] h-[100px] text-primary" />
                </div>
              </div>

              <h1 className="text-display-lg font-display-lg text-on-surface mb-sm">Welcome To The Learning Platform</h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant mb-xl">
                Your central hub for engineering documentation, onboarding guides, and interactive learning tools.
              </p>
              <p className="text-body-md text-on-surface-variant/60">
                Select a section from the sidebar to get started.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

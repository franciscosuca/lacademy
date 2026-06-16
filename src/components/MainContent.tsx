import React, { useMemo } from 'react';
import { Search, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { DocSection } from '../parseMarkdown';
import ReactMarkdown from 'react-markdown';

interface MainContentProps {
  activeSection: DocSection | null;
  sections: DocSection[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectSection: (id: string) => void;
}

interface SearchResult {
  section: DocSection;
  matches: { title: string; snippet: string }[];
}

function getSnippet(content: string, query: string, radius = 80): string {
  const lower = content.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return content.slice(0, 160) + (content.length > 160 ? '...' : '');
  const start = Math.max(0, idx - radius);
  const end = Math.min(content.length, idx + query.length + radius);
  let snippet = '';
  if (start > 0) snippet += '...';
  snippet += content.slice(start, end);
  if (end < content.length) snippet += '...';
  return snippet;
}

export function MainContent({ activeSection, sections, searchQuery, setSearchQuery, onSelectSection }: MainContentProps) {
  const searchResults = useMemo<SearchResult[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];

    const results: SearchResult[] = [];
    for (const section of sections) {
      const matches: { title: string; snippet: string }[] = [];

      // Check section title
      if (section.title.toLowerCase().includes(q)) {
        matches.push({ title: section.title, snippet: getSnippet(section.content || section.title, q) });
      }

      // Check section intro content
      if (section.content.toLowerCase().includes(q)) {
        if (!matches.length) {
          matches.push({ title: section.title, snippet: getSnippet(section.content, q) });
        }
      }

      // Check subsections
      for (const sub of section.subsections) {
        const inTitle = sub.title.toLowerCase().includes(q);
        const inContent = sub.content.toLowerCase().includes(q);
        if (inTitle || inContent) {
          matches.push({
            title: sub.title,
            snippet: getSnippet(inContent ? sub.content : sub.title, q),
          });
        }
      }

      if (matches.length > 0) {
        results.push({ section, matches });
      }
    }
    return results;
  }, [searchQuery, sections]);

  const isSearching = searchQuery.trim().length >= 2;

  return (
    <main className="flex-1 flex flex-col min-w-[400px] bg-background overflow-hidden relative">
      <header className="h-xl px-margin flex justify-between items-center bg-surface-container-lowest border-b border-outline-variant shrink-0 z-10">
        <div className="flex items-center gap-md">
          <span className="text-headline-sm font-headline-sm font-bold text-on-surface uppercase">
            {activeSection && !isSearching ? activeSection.title : 'Platform Documentation'}
          </span>
        </div>
        <div className="flex items-center gap-sm">
          <div className="relative">
            <Search className="absolute left-xs top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-surface border border-outline-variant text-on-surface text-[14px] rounded-lg pl-8 pr-xs py-[6px] w-64 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-on-surface-variant/50"
            />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-margin lg:px-xl relative scrollbar-hide flex flex-col">
        {isSearching ? (
          <div className="max-w-3xl w-full mx-auto">
            <p className="text-on-surface-variant text-[14px] mb-md">
              {searchResults.length === 0
                ? `No results for "${searchQuery}"`
                : `${searchResults.reduce((a, r) => a + r.matches.length, 0)} result${searchResults.reduce((a, r) => a + r.matches.length, 0) !== 1 ? 's' : ''} for "${searchQuery}"`}
            </p>
            <div className="flex flex-col gap-sm">
              {searchResults.map(({ section, matches }) => (
                <button
                  key={section.id}
                  onClick={() => onSelectSection(section.id)}
                  className="w-full text-left bg-surface-container hover:bg-surface-variant border border-outline-variant rounded-xl p-md transition-colors group"
                >
                  <div className="flex items-center justify-between mb-xs">
                    <div className="flex items-center gap-xs text-primary">
                      <FileText className="w-4 h-4" />
                      <span className="font-semibold text-[15px]">{section.title}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {matches.slice(0, 3).map((m, i) => (
                    <div key={i} className="mt-xs">
                      {m.title !== section.title && (
                        <p className="text-[13px] font-semibold text-on-surface-variant mb-[2px]">{m.title}</p>
                      )}
                      <p className="text-[13px] text-on-surface-variant/70 leading-relaxed">{m.snippet}</p>
                    </div>
                  ))}
                  {matches.length > 3 && (
                    <p className="text-[12px] text-on-surface-variant/50 mt-xs">+{matches.length - 3} more matches</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : activeSection ? (
          <article className="max-w-3xl w-full mx-auto markdown-body text-on-surface">
            {activeSection.content && (
              <div className="mb-lg text-body-md text-on-surface-variant">
                <ReactMarkdown>{activeSection.content}</ReactMarkdown>
              </div>
            )}
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

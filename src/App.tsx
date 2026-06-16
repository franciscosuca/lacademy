import React, { useState, useEffect, useMemo } from 'react';
import { SidebarLeft } from './components/SidebarLeft';
import { MainContent } from './components/MainContent';
import { SidebarRight } from './components/SidebarRight';
import { parseMarkdown, DocSection } from './parseMarkdown';
import rawDoc from '../hackathon_boring_dense_valves_doc.md?raw';

export type ToolType = 'quiz' | 'cards' | 'notes';
export type Note = {
  id: string;
  title: string;
  content: string;
  summary?: string;
};

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolType>('notes');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('academy-notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse notes', e);
      }
    }
    return [];
  });
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sections = useMemo(() => parseMarkdown(rawDoc), []);

  const activeSection = useMemo(
    () => sections.find(s => s.id === activeSectionId) ?? null,
    [sections, activeSectionId]
  );

  useEffect(() => {
    localStorage.setItem('academy-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex h-screen overflow-hidden font-body-md text-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      <SidebarLeft
        theme={theme}
        toggleTheme={toggleTheme}
        sections={sections}
        activeSectionId={activeSectionId}
        onSelectSection={setActiveSectionId}
      />
      <MainContent
        activeSection={activeSection}
        sections={sections}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectSection={(id) => { setActiveSectionId(id); setSearchQuery(''); }}
      />
      <SidebarRight
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        notes={notes}
        setNotes={setNotes}
        activeNoteId={activeNoteId}
        setActiveNoteId={setActiveNoteId}
      />
    </div>
  );
}


import React, { useState } from 'react';
import { GraduationCap, BrainCircuit, Layers, FileEdit, Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { ToolType, Note } from '../App';
import ReactMarkdown from 'react-markdown';
import { QuizPanel } from './QuizPanel';

interface SidebarRightProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  activeNoteId: string | null;
  setActiveNoteId: (id: string | null) => void;
}

export function SidebarRight({
  activeTool,
  setActiveTool,
  notes,
  setNotes,
  activeNoteId,
  setActiveNoteId
}: SidebarRightProps) {
  
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleCreateNote = async () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent,
    };

    setNotes([...notes, newNote]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setActiveNoteId(newNote.id);
  };

  const handleSummarize = async (noteId: string, content: string) => {
    if (content.trim().length < 30 || content.trim().split(/\s+/).length < 5) {
      alert("Not enough content to generate a meaningful summary. Please add more details to your note.");
      return;
    }

    setIsSummarizing(true);
    try {
      const res = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setNotes(prev => prev.map(n => n.id === noteId ? { ...n, summary: data.summary } : n));
    } catch (e: any) {
      alert("Error summarizing: " + e.message);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <aside className="flex flex-col h-full border-l border-outline-variant bg-surface-container-low w-80 shrink-0 z-20 shadow-[-4px_0_24px_rgba(0,0,0,0.05)]">
      <div className="p-md border-b border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center gap-xs mb-md">
          <GraduationCap className="text-tertiary-fixed w-6 h-6" />
          <span className="text-label-caps font-label-caps font-bold text-tertiary-fixed uppercase tracking-wider">Learning Tools Hub</span>
        </div>
      </div>

      <div className="flex justify-around border-b border-outline-variant bg-surface-container px-xs">
        {(['quiz', 'cards', 'notes'] as ToolType[]).map((tool) => (
          <button 
            key={tool}
            onClick={() => setActiveTool(tool)}
            className={`flex flex-col flex-1 items-center gap-[2px] py-sm px-xs transition-colors group ${
              activeTool === tool 
                ? 'text-tertiary border-b-2 border-tertiary bg-tertiary/5' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tool === 'quiz' && <BrainCircuit className="w-5 h-5" />}
            {tool === 'cards' && <Layers className="w-5 h-5" />}
            {tool === 'notes' && <FileEdit className="w-5 h-5" />}
            <span className={`text-[11px] ${activeTool === tool ? 'font-semibold' : ''}`}>
              {tool.charAt(0).toUpperCase() + tool.slice(1)}
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col scrollbar-hide bg-surface-container-low relative">
        {activeTool === 'quiz' ? (
          <QuizPanel />
        ) : activeTool === 'cards' ? (
          <div className="p-md flex flex-col items-center justify-center text-center gap-md h-full">
            <h4 className="text-[16px] font-headline-sm font-semibold text-on-surface">Feature Locked</h4>
            <p className="text-[14px] text-on-surface-variant leading-relaxed max-w-[240px]">
              The cards feature is currently blocked. Please check back later for updates.
            </p>
          </div>
        ) : (
          <div className="p-sm flex flex-col h-full">
            
            {/* Create Note Section */}
            <div className="mb-md bg-surface-container rounded-lg p-sm border border-outline-variant shrink-0">
              <input 
                type="text" 
                placeholder="Note Title" 
                value={newNoteTitle}
                onChange={e => setNewNoteTitle(e.target.value)}
                className="w-full bg-surface border-none text-on-surface font-semibold text-[14px] rounded px-2 py-1 mb-2 focus:ring-1 focus:ring-tertiary outline-none"
              />
              <textarea 
                placeholder="What are your thoughts?" 
                value={newNoteContent}
                onChange={e => setNewNoteContent(e.target.value)}
                rows={3}
                className="w-full bg-surface border-none text-on-surface text-[14px] rounded px-2 py-1 mb-2 focus:ring-1 focus:ring-tertiary outline-none resize-none"
              />
              <button 
                onClick={handleCreateNote}
                className="w-full bg-tertiary-container hover:bg-tertiary-container/80 text-on-tertiary-container text-[12px] font-semibold py-1 rounded flex items-center justify-center gap-1 transition-colors"
                disabled={!newNoteTitle.trim() || !newNoteContent.trim()}
              >
                <Plus className="w-4 h-4" /> Add Note
              </button>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-sm">
              {notes.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 p-sm">
                  <FileEdit className="w-10 h-10 mb-2"/>
                  <p className="text-sm">No notes yet. Create one to begin.</p>
                </div>
              ) : (
                notes.map(note => (
                  <div key={note.id} className="bg-surface-container-highest border border-outline-variant rounded-lg p-sm flex flex-col gap-xs relative">
                    <button 
                      onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
                      className="absolute top-2 right-2 text-on-surface-variant hover:text-error transition-colors"
                    >
                      <Trash2 className="w-4 h-4"/>
                    </button>
                    <h5 className="font-semibold text-[15px] pr-6">{note.title}</h5>
                    <p className="text-[13px] text-on-surface-variant whitespace-pre-wrap">{note.content}</p>
                    
                    {note.summary ? (
                      <div className="mt-2 pt-2 border-t border-outline-variant/50">
                        <div className="flex items-center gap-1 text-[11px] text-primary mb-1 font-semibold uppercase tracking-wider">
                          <Sparkles className="w-3 h-3"/> Summary
                        </div>
                        <div className="text-[13px] text-on-surface markdown-body">
                          <ReactMarkdown>{note.summary}</ReactMarkdown>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleSummarize(note.id, note.content)}
                        disabled={isSummarizing}
                        className="mt-2 flex items-center justify-center gap-1 bg-surface-variant hover:bg-outline-variant/30 text-primary text-[12px] py-1 rounded border border-primary/20 transition-colors"
                      >
                        {isSummarizing ? <Loader2 className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4"/>}
                        {isSummarizing ? 'Summarizing...' : 'Summarize Note'}
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

          </div>
        )}
      </div>
    </aside>
  );
}

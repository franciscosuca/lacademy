import React, { useState } from 'react';
import {
  LineChart,
  ChevronDown,
  ChevronRight,
  Bell,
  Settings,
  Moon,
  Sun,
  HelpCircle,
  Upload,
  Loader2,
} from 'lucide-react';
import { DocSection } from '../parseMarkdown';

interface SidebarLeftProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  sections: DocSection[];
  activeSectionId: string | null;
  onSelectSection: (id: string) => void;
  onUploadFile: (file: File) => void;
  isUploadingDocument: boolean;
  uploadError: string | null;
  documentName: string;
}

export function SidebarLeft({
  theme,
  toggleTheme,
  sections,
  activeSectionId,
  onSelectSection,
  onUploadFile,
  isUploadingDocument,
  uploadError,
  documentName,
}: SidebarLeftProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <nav className="flex flex-col h-full border-r border-outline-variant py-md bg-surface-container-low w-64 shrink-0 overflow-y-auto scrollbar-hide z-20 relative">
      <div className="px-md mb-lg flex items-center gap-sm">
        <LineChart className="text-primary w-8 h-8" />
        <div>
          <h1 className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight">L'ACADEMY</h1>
          <p className="text-label-caps font-label-caps text-on-surface-variant uppercase">Engineering Hub</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-xs px-sm overflow-y-auto scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-transparent">
        <label className="mb-sm">
          <input
            type="file"
            accept=".md,.pdf"
            className="hidden"
            onChange={event => {
              const file = event.target.files?.[0];
              if (file) {
                onUploadFile(file);
                event.target.value = '';
              }
            }}
          />
          <span className="w-full flex items-center justify-center gap-2 px-xs py-xs rounded-lg bg-tertiary text-on-tertiary text-[13px] font-semibold hover:bg-tertiary/90 transition-colors cursor-pointer">
            {isUploadingDocument ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {isUploadingDocument ? 'Uploading...' : 'Upload .md or .pdf'}
          </span>
        </label>
        <p className="text-[11px] text-on-surface-variant mb-xs truncate" title={documentName}>
          Source: {documentName}
        </p>
        {uploadError && (
          <p className="text-[11px] text-error mb-xs">{uploadError}</p>
        )}
        {sections.map(section => {
          const isActive = activeSectionId === section.id;
          const isExpanded = expandedId === section.id;
          const hasSubs = section.subsections.length > 0;

          return (
            <div key={section.id} className="mb-xs">
              <button
                onClick={() => {
                  onSelectSection(section.id);
                  if (hasSubs) toggleExpanded(section.id);
                }}
                className={`w-full flex items-center justify-between px-xs py-xs rounded-lg transition-colors group text-left ${
                  isActive
                    ? 'bg-primary/10 text-on-surface font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20'
                }`}
              >
                <span className="font-body-md text-[14px] leading-tight pr-2">{section.title}</span>
                {hasSubs && (
                  isExpanded
                    ? <ChevronDown className="w-4 h-4 shrink-0" />
                    : <ChevronRight className="w-4 h-4 shrink-0" />
                )}
              </button>

              {hasSubs && isExpanded && (
                <div className="ml-sm mt-xs flex flex-col gap-base border-l border-outline-variant pl-xs">
                  {section.subsections.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => onSelectSection(section.id)}
                      className="px-xs py-[4px] text-on-surface-variant hover:text-on-surface rounded transition-colors text-[13px] text-left"
                    >
                      {sub.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-auto px-sm pt-md border-t border-outline-variant flex flex-col gap-xs shrink-0">
        <button className="w-full flex items-center gap-sm px-xs py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="font-body-md">Notifications</span>
        </button>
        <button className="w-full flex items-center gap-sm px-xs py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-body-md">Settings</span>
        </button>
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-sm px-xs py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 rounded-lg transition-colors"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          <span className="font-body-md">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
        <button className="w-full flex items-center gap-sm px-xs py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="font-body-md">Help</span>
        </button>
      </div>
    </nav>
  );
}

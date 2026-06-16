import React, { useState } from 'react';
import { 
  LineChart, 
  Rocket, 
  Router, 
  ChevronDown, 
  ChevronRight, 
  Wand2, 
  CircuitBoard, 
  Bell, 
  Settings, 
  Moon, 
  Sun,
  HelpCircle 
} from 'lucide-react';

interface SidebarLeftProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function SidebarLeft({ theme, toggleTheme }: SidebarLeftProps) {
  const [edgeExpanded, setEdgeExpanded] = useState(true);

  return (
    <nav className="flex flex-col h-full border-r border-outline-variant py-md bg-surface-container-low w-64 shrink-0 overflow-y-auto scrollbar-hide z-20 relative">
      <div className="px-md mb-lg flex items-center gap-sm">
        <LineChart className="text-primary w-8 h-8" />
        <div>
          <h1 className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight">L'ACADEMY</h1>
          <p className="text-label-caps font-label-caps text-on-surface-variant uppercase">Engineering Hub</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-xs px-sm">
        <div className="mb-xs">
          <button className="w-full flex items-center justify-between px-xs py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 rounded-lg transition-colors group">
            <div className="flex items-center gap-sm">
              <Rocket className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="font-body-md">Getting Started</span>
            </div>
          </button>
        </div>

        <div className="mb-xs">
          <button 
            onClick={() => setEdgeExpanded(!edgeExpanded)}
            className="w-full flex items-center justify-between px-xs py-xs text-on-surface hover:bg-surface-variant/20 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-sm">
              <Router className="w-5 h-5 text-primary" />
              <span className="font-body-md font-semibold">Edge Gateway</span>
            </div>
            {edgeExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          
          {edgeExpanded && (
            <div className="ml-lg mt-xs flex flex-col gap-base border-l border-outline-variant pl-xs">
              <a href="#" className="px-xs py-[6px] text-on-surface-variant hover:text-on-surface rounded transition-colors text-[14px]">Connect directly</a>
              <a href="#" className="px-xs py-[6px] text-on-surface-variant hover:text-on-surface rounded transition-colors text-[14px]">Configure LAN2</a>
              <a href="#" className="px-xs py-[6px] text-on-surface-variant hover:text-on-surface rounded transition-colors text-[14px]">Firewall configuration</a>
              <a href="#" className="px-xs py-[6px] text-on-surface-variant hover:text-on-surface rounded transition-colors text-[14px]">Debug remote access</a>
              <a href="#" className="px-xs py-[6px] text-on-surface-variant hover:text-on-surface rounded transition-colors text-[14px]">Troubleshoot network</a>
            </div>
          )}
        </div>

        <div className="mb-xs">
          <button className="w-full flex items-center justify-between px-xs py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 rounded-lg transition-colors group">
            <div className="flex items-center gap-sm">
              <Wand2 className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="font-body-md">Onboarding Wizard</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-xs">
          <button className="w-full flex items-center justify-between px-xs py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 rounded-lg transition-colors group">
            <div className="flex items-center gap-sm">
              <CircuitBoard className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="font-body-md">EdgeConfig App</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-auto px-sm pt-md border-t border-outline-variant flex flex-col gap-xs">
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

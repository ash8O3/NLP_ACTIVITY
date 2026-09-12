import React from 'react';
import { 
  Menu, 
  Search, 
  BookOpen, 
  Printer, 
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Download
} from 'lucide-react';
import { Category, StudentProfile } from '../types';
import { CATEGORY_METADATA } from '../data/knowledgeBase';

interface HeaderProps {
  activeCategory: Category | 'all';
  onSelectCategory: (category: Category | 'all') => void;
  studentProfile: StudentProfile;
  onOpenProfileModal: () => void;
  onOpenKnowledgeHub: (tab?: Category) => void;
  onOpenSearch: () => void;
  onClearHistory: () => void;
  onToggleMobileSidebar: () => void;
  onExportTranscript: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  studentProfile,
  onOpenProfileModal,
  onOpenKnowledgeHub,
  onOpenSearch,
  onClearHistory,
  onToggleMobileSidebar,
  onExportTranscript,
}) => {
  const currentCategoryLabel = activeCategory === 'all' 
    ? 'All Advisory Topics' 
    : CATEGORY_METADATA[activeCategory]?.label || activeCategory;

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shrink-0">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu + Active Context */}
        <div className="flex items-center space-x-3">
          {/* Mobile Hamburger */}
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors cursor-pointer"
            id="btn-mobile-menu"
            title="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-[11px] font-semibold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Verified Knowledge
            </span>
            <div className="flex items-center text-xs text-slate-500">
              <span className="hidden md:inline font-medium text-slate-400">Domain:</span>
              <span className="ml-1 font-semibold text-slate-800">{currentCategoryLabel}</span>
            </div>
          </div>
        </div>

        {/* Center / Search bar trigger */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-600 text-xs transition-colors cursor-pointer"
            id="btn-header-search"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search admission requirements, fees, exams, faculty...</span>
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Search button on small screens */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 md:hidden transition-colors cursor-pointer"
            id="btn-header-search-mobile"
            title="Search directory"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Export Transcript */}
          <button
            onClick={onExportTranscript}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 text-xs font-medium transition-colors cursor-pointer"
            id="btn-export-transcript"
            title="Export conversation as document"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>

          {/* Reset Conversation */}
          <button
            onClick={onClearHistory}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Reset conversation"
            id="btn-reset-chat-header"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Full Campus Directory */}
          <button
            onClick={() => onOpenKnowledgeHub()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            id="btn-open-directory-header"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Campus Directory</span>
          </button>
        </div>
      </div>
    </header>
  );
};

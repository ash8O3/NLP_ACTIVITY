import React from 'react';
import { 
  Bot, 
  GraduationCap, 
  CreditCard, 
  Calendar, 
  FileText, 
  Building2, 
  Landmark, 
  Calculator, 
  CheckCircle2, 
  UserCircle2, 
  SlidersHorizontal,
  ChevronRight,
  Shield,
  PhoneCall,
  Search
} from 'lucide-react';
import { Category, StudentProfile } from '../types';
import { UNIVERSITY_NAME } from '../data/knowledgeBase';

interface SidebarProps {
  activeCategory: Category | 'all';
  onSelectCategory: (category: Category | 'all') => void;
  onOpenKnowledgeHub: (tab?: Category) => void;
  onOpenFeeCalculator: () => void;
  onOpenProfileModal: () => void;
  onOpenSearch: () => void;
  studentProfile: StudentProfile;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenKnowledgeHub,
  onOpenFeeCalculator,
  onOpenProfileModal,
  onOpenSearch,
  studentProfile,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems: { id: Category | 'all'; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'all', label: 'Advisory Assistant', icon: <Bot className="w-4 h-4" /> },
    { id: 'admissions', label: 'Admissions & Entry', icon: <GraduationCap className="w-4 h-4" />, badge: '2026-27' },
    { id: 'fees', label: 'Tuition & Aid', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'timetable', label: 'Class Timetables', icon: <Calendar className="w-4 h-4" /> },
    { id: 'examinations', label: 'Examinations', icon: <FileText className="w-4 h-4" />, badge: 'Spring 26' },
    { id: 'departments', label: 'Faculty & HODs', icon: <Building2 className="w-4 h-4" /> },
    { id: 'facilities', label: 'Campus Services', icon: <Landmark className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-200 flex flex-col border-r border-slate-800 transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Institutional Branding Header */}
        <div className="p-5 border-b border-slate-800/90 flex flex-col space-y-3 bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                AIST Portal
              </div>
              <h2 className="text-sm font-semibold text-white truncate tracking-tight">
                Academic Advisory
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Spring Term 2026
            </span>
            <span className="text-slate-400 font-mono text-[10px]">v2.4 Live</span>
          </div>
        </div>

        {/* Global Search Shortcut Button */}
        <div className="px-4 pt-4 pb-2">
          <button
            onClick={() => {
              onOpenSearch();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
            id="btn-sidebar-search"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search directory...</span>
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 border border-slate-700 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 text-xs scrollbar-none">
          <div className="px-3 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Academic Domains
          </div>

          {navItems.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectCategory(item.id);
                  if (item.id !== 'all') {
                    onOpenKnowledgeHub(item.id);
                  }
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all text-left cursor-pointer group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
                id={`sidebar-nav-${item.id}`}
              >
                <div className="flex items-center space-x-3">
                  <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge ? (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive
                        ? 'bg-blue-500/40 text-blue-100'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight
                    className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                      isActive ? 'opacity-100 text-white' : 'text-slate-500'
                    }`}
                  />
                )}
              </button>
            );
          })}

          {/* Quick Utility Tools */}
          <div className="pt-5 px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Academic Calculators
          </div>

          <button
            onClick={() => {
              onOpenFeeCalculator();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/80 hover:text-white font-medium transition-colors text-left cursor-pointer group"
            id="sidebar-btn-fee-calculator"
          >
            <div className="flex items-center space-x-3">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Tuition & Installments</span>
            </div>
            <span className="text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 px-1.5 py-0.5 rounded font-mono">
              Tool
            </span>
          </button>

          <button
            onClick={() => {
              onOpenKnowledgeHub('examinations');
              onCloseMobile();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/80 hover:text-white font-medium transition-colors text-left cursor-pointer group"
            id="sidebar-btn-attendance-check"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>75% Attendance Check</span>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
              Audit
            </span>
          </button>
        </div>

        {/* Campus Emergency Quick Access */}
        <div className="p-3 mx-3 mb-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
          <div className="flex items-center justify-between text-slate-300 mb-1">
            <span className="flex items-center gap-1.5 font-semibold text-[11px] text-white">
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              Emergency 24/7
            </span>
            <span className="font-mono text-rose-400 font-bold text-[11px]">ext. 5555</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Health Clinic & Security Control Room
          </p>
        </div>

        {/* Authenticated Student Identity Profile Card */}
        <div className="p-4 border-t border-slate-800/90 bg-slate-950/50">
          <button
            onClick={() => {
              onOpenProfileModal();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-between text-left rounded-xl p-2 hover:bg-slate-800/60 transition-colors group cursor-pointer"
            id="sidebar-btn-profile"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0">
                <UserCircle2 className="w-5 h-5 text-blue-400" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-white text-xs truncate">
                  {studentProfile.name}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  Sem {studentProfile.semester} · {studentProfile.major.split(' ')[0]}
                </div>
              </div>
            </div>
            <SlidersHorizontal className="w-4 h-4 text-slate-400 group-hover:text-slate-200 shrink-0" />
          </button>
        </div>
      </aside>
    </>
  );
};

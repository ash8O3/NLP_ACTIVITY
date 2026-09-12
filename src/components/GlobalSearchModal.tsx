import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  GraduationCap, 
  CreditCard, 
  Calendar, 
  FileText, 
  Building2, 
  Landmark, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Category } from '../types';
import { COMMON_FAQS, DEPARTMENTS, CAMPUS_FACILITIES, UPCOMING_EXAMS } from '../data/knowledgeBase';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (query: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const term = searchTerm.toLowerCase().trim();

  // Search FAQs
  const matchedFaqs = COMMON_FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(term) ||
      faq.shortAnswer.toLowerCase().includes(term) ||
      faq.tags.some((t) => t.toLowerCase().includes(term))
  ).slice(0, 5);

  // Search Departments
  const matchedDepts = DEPARTMENTS.filter(
    (d) =>
      d.name.toLowerCase().includes(term) ||
      d.code.toLowerCase().includes(term) ||
      d.hod.toLowerCase().includes(term)
  ).slice(0, 3);

  // Search Facilities
  const matchedFacilities = CAMPUS_FACILITIES.filter(
    (f) =>
      f.name.toLowerCase().includes(term) ||
      f.category.toLowerCase().includes(term) ||
      f.highlights.some((h) => h.toLowerCase().includes(term))
  ).slice(0, 3);

  // Search Exams
  const matchedExams = UPCOMING_EXAMS.filter(
    (e) =>
      e.subject.toLowerCase().includes(term) ||
      e.code.toLowerCase().includes(term) ||
      e.venue.toLowerCase().includes(term)
  ).slice(0, 3);

  const getCategoryIcon = (category: Category | string) => {
    switch (category) {
      case 'admissions': return <GraduationCap className="w-4 h-4 text-slate-600" />;
      case 'fees': return <CreditCard className="w-4 h-4 text-slate-600" />;
      case 'timetable': return <Calendar className="w-4 h-4 text-slate-600" />;
      case 'examinations': return <FileText className="w-4 h-4 text-slate-600" />;
      case 'departments': return <Building2 className="w-4 h-4 text-slate-600" />;
      case 'facilities': return <Landmark className="w-4 h-4 text-slate-600" />;
      default: return <Sparkles className="w-4 h-4 text-slate-600" />;
    }
  };

  const handleSelect = (query: string) => {
    onSelectResult(query);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-20 p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-200/90 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search admissions, tuition fees, faculty, exams, library hours..."
            className="flex-1 bg-transparent border-0 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden"
            id="input-global-search"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs">
          {/* Default quick prompts if empty */}
          {!term && (
            <div className="space-y-3 py-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-2">
                Frequently Searched
              </span>
              <div className="space-y-1">
                {[
                  'What are the B.Tech admission requirements for 2026?',
                  'How much is the tuition fee per semester for Computer Science?',
                  'Show me the CS Semester 4 class timetable',
                  'When do the Spring 2026 final exams start?',
                  'What are the Central Library hours and borrowing rules?',
                  'Who is the Head of Computer Science Department?'
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100/80 text-slate-700 flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <span className="font-medium">{item}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched FAQs */}
          {term && matchedFaqs.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-2">
                Knowledge Base Articles
              </span>
              {matchedFaqs.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => handleSelect(faq.question)}
                  className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-start gap-3 cursor-pointer group"
                >
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 mt-0.5">
                    {getCategoryIcon(faq.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 group-hover:text-slate-950">
                      {faq.question}
                    </div>
                    <p className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">
                      {faq.shortAnswer}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}

          {/* Matched Departments */}
          {term && matchedDepts.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-2">
                Academic Departments
              </span>
              {matchedDepts.map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleSelect(`Tell me about the ${d.name} department and faculty contacts`)}
                  className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-start gap-3 cursor-pointer group"
                >
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900">{d.name} ({d.code})</div>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      HOD: {d.hod} · {d.location}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}

          {/* Matched Facilities */}
          {term && matchedFacilities.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-2">
                Facilities & Campus Services
              </span>
              {matchedFacilities.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleSelect(`What are the operating hours and rules for ${f.name}?`)}
                  className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-start gap-3 cursor-pointer group"
                >
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 mt-0.5">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900">{f.name}</div>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Hours: {f.hours} · {f.location}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}

          {/* Matched Exams */}
          {term && matchedExams.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-2">
                Examinations
              </span>
              {matchedExams.map((e, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(`When is the examination for ${e.subject} (${e.code})?`)}
                  className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-start gap-3 cursor-pointer group"
                >
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900">{e.subject} ({e.code})</div>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      {e.date} · {e.time} · {e.venue}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {term && matchedFaqs.length === 0 && matchedDepts.length === 0 && matchedFacilities.length === 0 && matchedExams.length === 0 && (
            <div className="py-8 text-center text-slate-500 text-xs">
              <p>No exact directory match found for "{searchTerm}".</p>
              <button
                onClick={() => handleSelect(searchTerm)}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
              >
                <span>Ask CampusBot AI directly</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-500">
          <span>Search verified university knowledge base</span>
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[10px]">↵</kbd> to select</span>
          </div>
        </div>
      </div>
    </div>
  );
};

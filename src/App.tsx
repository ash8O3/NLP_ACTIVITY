/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { MessageInput } from './components/MessageInput';
import { AcademicGlancePanel } from './components/AcademicGlancePanel';
import { KnowledgeDrawer } from './components/KnowledgeDrawer';
import { FeeCalculatorModal } from './components/FeeCalculatorModal';
import { ProfileModal } from './components/ProfileModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ChatMessage, Category, StudentProfile } from './types';
import { UNIVERSITY_NAME } from './data/knowledgeBase';

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Alex Johnson',
  studentType: 'undergraduate',
  major: 'Computer Science & Engineering',
  semester: 4,
};

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-1',
  sender: 'assistant',
  text: `### Welcome to ${UNIVERSITY_NAME} Academic Advisory Portal

I am your official institutional assistant. I can provide real-time details and policy guidance across all campus operations:

- **Admissions & Entry**: Eligibility criteria, application stages, cutoffs, and required documents
- **Tuition & Financial Aid**: Semester fee schedules, hostel options, installment breakdowns, and scholarships
- **Class Timetables**: Weekly routines, course slot matrices, room assignments, and lab schedules
- **Examinations**: Spring 2026 examination timetables, 75% attendance compliance, and grading rules
- **Faculty & Departments**: HOD directories, department offices, phone extensions, and research labs
- **Campus Facilities**: Central Library operating hours, 24/7 health center, sports complex, and campus transit

*How may I assist your academic planning today?*`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  category: 'general',
  confidence: 1.0,
  quickReplies: [
    'What are the B.Tech admission requirements & deadlines?',
    'What is the tuition fee per semester for Computer Science?',
    'Show me the CS Semester 4 class timetable',
    'When do the Spring 2026 final exams start?'
  ],
  links: [
    { label: 'Campus Directory', action: 'modal', target: 'knowledge' },
    { label: 'Fee Estimator', action: 'modal', target: 'fee_calc' }
  ]
};

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('campusbot_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [INITIAL_MESSAGE];
      }
    }
    return [INITIAL_MESSAGE];
  });

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('campusbot_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [isThinking, setIsThinking] = useState(false);

  // Modals & UI Navigation State
  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false);
  const [knowledgeTab, setKnowledgeTab] = useState<Category>('admissions');
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('campusbot_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('campusbot_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSendMessage = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    try {
      const historyPayload = messages.slice(-8).map((msg) => ({
        role: msg.sender === 'assistant' ? 'model' : 'user',
        text: msg.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          history: historyPayload,
          studentProfile,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.text || 'I could not retrieve the records. Please consult the Campus Directory.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: data.category || 'general',
        confidence: data.confidence || 0.9,
        entities: data.entities || [],
        quickReplies: data.quickReplies || [],
        links: data.links || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Failed to communicate with chat API:', err);
      const fallbackBotMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `### Academic Information Desk\n\nI encountered a transient network connection error. You can explore the verified **Campus Directory** directly for Admissions, Tuition Fees, Timetables, Exam Dates, Departments, and Facilities.\n\n*Would you like to open the official archives?*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'general',
        confidence: 0.85,
        quickReplies: [
          'What are the B.Tech admission requirements?',
          'What are the fee payment dates?',
          'Where is the Central Library located?'
        ],
        links: [
          { label: 'Open Campus Directory', action: 'modal', target: 'knowledge' },
          { label: 'Fee Estimator', action: 'modal', target: 'fee_calc' }
        ]
      };
      setMessages((prev) => [...prev, fallbackBotMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleActionClick = (action: string, target: string) => {
    if (action === 'modal') {
      if (target === 'fee_calc') {
        setIsFeeModalOpen(true);
      } else if (target === 'knowledge' || target === 'departments' || target === 'facilities' || target === 'admissions' || target === 'fees' || target === 'timetable' || target === 'exams') {
        const mappedTab: Category = (target === 'knowledge' || target === 'exams') ? (target === 'exams' ? 'examinations' : 'admissions') : (target as Category);
        setKnowledgeTab(mappedTab);
        setIsKnowledgeOpen(true);
      }
    } else if (action === 'query') {
      handleSendMessage(target);
    }
  };

  const handleFeedback = async (messageId: string, feedback: 'like' | 'dislike') => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg))
    );
    try {
      const msg = messages.find((m) => m.id === messageId);
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId,
          feedback,
          query: msg?.text?.slice(0, 100) || '',
        }),
      });
    } catch (e) {
      console.warn('Feedback submission error:', e);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Reset this conversation session and start fresh?')) {
      setMessages([INITIAL_MESSAGE]);
      localStorage.removeItem('campusbot_messages');
    }
  };

  const handleOpenKnowledgeHub = (tab?: Category) => {
    if (tab && tab !== 'general') {
      setKnowledgeTab(tab);
    }
    setIsKnowledgeOpen(true);
  };

  const handleExportTranscript = () => {
    const transcriptText = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.sender.toUpperCase()}:\n${m.text}\n-----------------------------------\n`
      )
      .join('\n');

    const blob = new Blob([transcriptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AIST_Advisory_Transcript_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-800 antialiased selection:bg-slate-900 selection:text-white">
      {/* Left Institutional Navigation Sidebar */}
      <Sidebar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenKnowledgeHub={handleOpenKnowledgeHub}
        onOpenFeeCalculator={() => setIsFeeModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        studentProfile={studentProfile}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Center Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 bg-white h-full overflow-hidden">
        {/* Top Header */}
        <Header
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          studentProfile={studentProfile}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onOpenKnowledgeHub={handleOpenKnowledgeHub}
          onOpenSearch={() => setIsSearchModalOpen(true)}
          onClearHistory={handleClearHistory}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
          onExportTranscript={handleExportTranscript}
        />

        {/* Workspace Body: Chat Stream + Message Input */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          <ChatWindow
            messages={messages}
            isThinking={isThinking}
            onSendQuery={handleSendMessage}
            onActionClick={handleActionClick}
            onFeedback={handleFeedback}
          />

          <MessageInput
            onSendMessage={handleSendMessage}
            onClearHistory={handleClearHistory}
            disabled={isThinking}
          />
        </main>
      </div>

      {/* Right Academic Operations & Live Schedule Glance Panel */}
      <AcademicGlancePanel
        studentProfile={studentProfile}
        onSendQuery={handleSendMessage}
        onOpenKnowledgeHub={handleOpenKnowledgeHub}
        onOpenFeeCalculator={() => setIsFeeModalOpen(true)}
      />

      {/* Global Instant Search Modal (Cmd+K) */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectResult={(query) => handleSendMessage(query)}
      />

      {/* Comprehensive Academic Archives & Directory Drawer */}
      <KnowledgeDrawer
        isOpen={isKnowledgeOpen}
        onClose={() => setIsKnowledgeOpen(false)}
        initialTab={knowledgeTab}
        onQuerySelect={(query) => {
          setIsKnowledgeOpen(false);
          handleSendMessage(query);
        }}
      />

      {/* Interactive Tuition & Installment Estimator Modal */}
      <FeeCalculatorModal
        isOpen={isFeeModalOpen}
        onClose={() => setIsFeeModalOpen(false)}
        onAskAboutCalculation={(query) => handleSendMessage(query)}
      />

      {/* Student Profile Settings Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={studentProfile}
        onSaveProfile={(updated) => setStudentProfile(updated)}
      />
    </div>
  );
}

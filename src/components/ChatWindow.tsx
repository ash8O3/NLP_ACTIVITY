import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck,
  User, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  ThumbsUp, 
  ThumbsDown, 
  ExternalLink,
  ChevronRight,
  GraduationCap,
  CreditCard,
  Calendar,
  FileText,
  Building2,
  Landmark,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { ChatMessage, Category } from '../types';
import { CATEGORY_METADATA } from '../data/knowledgeBase';

interface ChatWindowProps {
  messages: ChatMessage[];
  isThinking: boolean;
  onSendQuery: (query: string) => void;
  onActionClick: (action: string, target: string) => void;
  onFeedback: (messageId: string, feedback: 'like' | 'dislike') => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isThinking,
  onSendQuery,
  onActionClick,
  onFeedback,
}) => {
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const scrollToBottom = () => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Handle Text-to-Speech
  const handleToggleSpeech = (messageId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (speakingId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/[*#_`>]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  // Handle Copying message text
  const handleCopy = (messageId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category?: Category) => {
    switch (category) {
      case 'admissions': return <GraduationCap className="w-3.5 h-3.5" />;
      case 'fees': return <CreditCard className="w-3.5 h-3.5" />;
      case 'timetable': return <Calendar className="w-3.5 h-3.5" />;
      case 'examinations': return <FileText className="w-3.5 h-3.5" />;
      case 'departments': return <Building2 className="w-3.5 h-3.5" />;
      case 'facilities': return <Landmark className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const getSourceDepartment = (category?: Category) => {
    switch (category) {
      case 'admissions': return 'Admissions & Enrollment Office';
      case 'fees': return "Office of the Bursar & Student Accounts";
      case 'timetable': return 'Academic Operations & Scheduling';
      case 'examinations': return 'Controller of Examinations';
      case 'departments': return 'Faculty Academic Council';
      case 'facilities': return 'Campus Infrastructure & Student Welfare';
      default: return 'Institutional Information Desk';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 bg-slate-50/70">
      <div className="max-w-3xl mx-auto space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((message) => {
            const isBot = message.sender === 'assistant';
            const catMeta = message.category ? CATEGORY_METADATA[message.category] : null;

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={`flex items-start space-x-3 sm:space-x-4 ${
                  isBot ? 'justify-start' : 'justify-end flex-row-reverse space-x-reverse'
                }`}
                id={`chat-msg-${message.id}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                    isBot
                      ? 'bg-slate-900 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {isBot ? <ShieldCheck className="w-4 h-4 text-blue-400" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble Container */}
                <div
                  className={`flex flex-col max-w-[90%] sm:max-w-[85%] ${
                    isBot ? 'items-start' : 'items-end'
                  }`}
                >
                  {/* Verified Source Header for Assistant */}
                  {isBot && (
                    <div className="flex items-center gap-2 mb-1.5 px-1 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">AIST Advisory</span>
                      <span className="text-slate-300">·</span>
                      <span className="inline-flex items-center gap-1 font-medium text-slate-500">
                        {getCategoryIcon(message.category)}
                        {getSourceDepartment(message.category)}
                      </span>
                    </div>
                  )}

                  {/* Bubble Content Card */}
                  <div
                    className={`rounded-2xl p-5 sm:p-6 shadow-xs border transition-all ${
                      isBot
                        ? 'bg-white text-slate-800 border-slate-200/90 rounded-tl-xs'
                        : 'bg-slate-900 text-white border-slate-900 rounded-tr-xs'
                    }`}
                  >
                    {isBot ? (
                      <div className="prose prose-sm prose-slate max-w-none space-y-3 leading-relaxed break-words">
                        <ReactMarkdown
                          components={{
                            h1: ({ children }) => <h1 className="text-base font-bold text-slate-900 mt-2 mb-1.5 tracking-tight">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-sm font-bold text-slate-900 mt-2 mb-1.5 tracking-tight">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-semibold text-slate-900 mt-2 mb-1">{children}</h3>,
                            h4: ({ children }) => <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mt-2 mb-1">{children}</h4>,
                            p: ({ children }) => <p className="text-xs sm:text-sm text-slate-700 my-1.5 leading-relaxed">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 my-2 text-xs sm:text-sm text-slate-700">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 my-2 text-xs sm:text-sm text-slate-700">{children}</ol>,
                            li: ({ children }) => <li className="my-0.5 leading-normal">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
                            code: ({ children }) => (
                              <code className="bg-slate-100 text-slate-800 font-mono text-xs px-1.5 py-0.5 rounded border border-slate-200/80">
                                {children}
                              </code>
                            ),
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    )}

                    {/* Identified University Entities */}
                    {isBot && message.entities && message.entities.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Parameters:
                        </span>
                        {message.entities.map((ent, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center text-[11px] font-medium bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/70"
                          >
                            <span className="text-slate-400 mr-1">{ent.name}:</span>
                            <span className="font-semibold text-slate-800">{ent.value}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Institutional Actions / Direct Modal Triggers */}
                    {isBot && message.links && message.links.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                        {message.links.map((link, idx) => (
                          <button
                            key={idx}
                            onClick={() => onActionClick(link.action, link.target)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                            id={`btn-msg-action-${message.id}-${idx}`}
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Message Action Footer (Timestamp, Audio, Copy, Feedback) */}
                  {isBot && (
                    <div className="flex items-center justify-between w-full mt-2 px-1 text-slate-400 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center text-[11px] text-slate-400 gap-1">
                          <Clock className="w-3 h-3" />
                          {message.timestamp}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        {/* Audio Dictation Play */}
                        <button
                          onClick={() => handleToggleSpeech(message.id, message.text)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            speakingId === message.id
                              ? 'bg-blue-100 text-blue-700'
                              : 'hover:bg-slate-200/60 text-slate-400 hover:text-slate-700'
                          }`}
                          title={speakingId === message.id ? 'Stop reading' : 'Read answer aloud'}
                          id={`btn-tts-${message.id}`}
                        >
                          {speakingId === message.id ? (
                            <VolumeX className="w-3.5 h-3.5" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Copy Response */}
                        <button
                          onClick={() => handleCopy(message.id, message.text)}
                          className="p-1.5 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors"
                          title="Copy response text"
                          id={`btn-copy-${message.id}`}
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Thumbs Up Rating */}
                        <button
                          onClick={() => onFeedback(message.id, 'like')}
                          className={`p-1.5 rounded-lg transition-colors ${
                            message.feedback === 'like'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'hover:bg-slate-200/60 text-slate-400 hover:text-slate-700'
                          }`}
                          title="Mark answer as helpful"
                          id={`btn-like-${message.id}`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Thumbs Down Rating */}
                        <button
                          onClick={() => onFeedback(message.id, 'dislike')}
                          className={`p-1.5 rounded-lg transition-colors ${
                            message.feedback === 'dislike'
                              ? 'bg-rose-100 text-rose-700'
                              : 'hover:bg-slate-200/60 text-slate-400 hover:text-slate-700'
                          }`}
                          title="Mark as inaccurate"
                          id={`btn-dislike-${message.id}`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Contextual Suggested Questions Chips */}
                  {isBot && message.quickReplies && message.quickReplies.length > 0 && (
                    <div className="mt-3 w-full flex flex-wrap gap-2">
                      {message.quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => onSendQuery(reply)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs transition-colors hover:border-slate-300 cursor-pointer text-left"
                          id={`btn-quick-reply-${message.id}-${idx}`}
                        >
                          <span>{reply}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* NLP Processing Loading Card */}
        {isThinking && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start space-x-3.5"
            id="chat-thinking-indicator"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
            </div>

            <div className="bg-white rounded-2xl rounded-tl-xs p-4 sm:p-5 border border-slate-200/90 shadow-xs max-w-sm">
              <p className="text-xs font-semibold text-slate-800">
                Querying University Records & Policies
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Verifying academic regulations and schedule archives...
              </p>
              <div className="flex items-center space-x-1.5 mt-3">
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.15s]" />
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={scrollEndRef} />
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  RotateCcw,
  Sparkles,
  Command
} from 'lucide-react';
import { PROMPT_CAROUSEL_ITEMS } from '../data/knowledgeBase';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  onClearHistory: () => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onClearHistory,
  disabled = false,
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleToggleVoice = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || disabled) return;

    onSendMessage(inputText);
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="bg-white border-t border-slate-200/90 p-4 sm:p-5 shrink-0">
      <div className="max-w-3xl mx-auto space-y-3">
        {/* Suggested Queries Pill Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-slate-400" />
            Inquiries:
          </span>
          {PROMPT_CAROUSEL_ITEMS.slice(0, 4).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(prompt)}
              className="shrink-0 px-3 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs border border-slate-200 transition-colors whitespace-nowrap cursor-pointer"
              id={`btn-suggest-prompt-${idx}`}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form Box */}
        <form onSubmit={handleFormSubmit} className="relative flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-slate-400 focus-within:bg-white transition-all shadow-2xs">
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputText}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Ask a question about admissions, fees, timetables, exams, departments, or facilities..."
            className="flex-1 bg-transparent border-0 resize-none px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden max-h-32 min-h-[44px] leading-relaxed"
            id="chat-input-textarea"
          />

          <div className="flex items-center space-x-1 shrink-0 pb-1 pr-1">
            {/* Voice Dictation Button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Voice input (Dictate)'}
              id="btn-voice-dictation"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Clear Chat */}
            <button
              type="button"
              onClick={onClearHistory}
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Reset conversation"
              id="btn-clear-chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Submit Query */}
            <button
              type="submit"
              disabled={disabled || !inputText.trim()}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white disabled:text-slate-400 transition-colors shadow-2xs disabled:cursor-not-allowed cursor-pointer"
              title="Send query"
              id="btn-send-chat"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>
            Press <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-600">Enter ↵</kbd> to submit · <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-600">Shift+Enter</kbd> for new line
          </span>
          <span className="hidden sm:inline font-mono text-[10px]">
            Apex Institute of Science & Technology
          </span>
        </div>
      </div>
    </div>
  );
};

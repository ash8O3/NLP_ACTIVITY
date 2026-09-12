import React from 'react';
import { 
  Clock, 
  Calendar, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink,
  BookOpen,
  FileText
} from 'lucide-react';
import { StudentProfile } from '../types';
import { TIMETABLE_DATA, UPCOMING_EXAMS } from '../data/knowledgeBase';

interface AcademicGlancePanelProps {
  studentProfile: StudentProfile;
  onSendQuery: (query: string) => void;
  onOpenKnowledgeHub: (tab: any) => void;
  onOpenFeeCalculator: () => void;
}

export const AcademicGlancePanel: React.FC<AcademicGlancePanelProps> = ({
  studentProfile,
  onSendQuery,
  onOpenKnowledgeHub,
  onOpenFeeCalculator,
}) => {
  const currentDay = 'Monday';
  const departmentKey = 'CS-Semester-4';
  const todaySlots = (TIMETABLE_DATA[departmentKey] || []).filter(
    (slot) => slot.day === currentDay
  );

  return (
    <aside className="w-80 border-l border-slate-200/90 bg-white flex flex-col h-full overflow-y-auto shrink-0 hidden xl:flex text-xs scrollbar-none">
      {/* Header */}
      <div className="p-5 border-b border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Academic Operations</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Live student status & bulletins</p>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
          Week 8
        </span>
      </div>

      <div className="p-5 space-y-6">
        {/* Today's Schedule Card */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Today's Schedule ({currentDay})
            </span>
            <button
              onClick={() => onOpenKnowledgeHub('timetable')}
              className="text-[11px] text-blue-600 hover:text-blue-800 font-medium hover:underline cursor-pointer"
            >
              Full Routine
            </button>
          </div>

          <div className="space-y-2">
            {todaySlots.slice(0, 3).map((slot) => (
              <div
                key={slot.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between gap-1 text-[11px] text-slate-500 mb-1">
                  <span className="font-mono font-medium text-slate-700">{slot.time}</span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-semibold text-[10px] text-slate-600">
                    {slot.type}
                  </span>
                </div>
                <div className="font-semibold text-slate-900 line-clamp-1">{slot.subject}</div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{slot.room}</span>
                  <span className="text-slate-300">·</span>
                  <span className="truncate">{slot.instructor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Compliance & Exam Readiness */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
              Exam Compliance Audit
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Eligible (80%)
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Attendance requirement for Spring 2026 Hall Ticket release is 75%. You currently meet institutional thresholds.
          </p>
          <button
            onClick={() => onOpenKnowledgeHub('examinations')}
            className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-800 transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>Run 75% Simulator</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Upcoming Exam Milestone */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            Next Final Exam
          </span>

          {UPCOMING_EXAMS[0] && (
            <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-slate-400">{UPCOMING_EXAMS[0].code}</span>
                <span className="font-bold text-amber-400">{UPCOMING_EXAMS[0].date}</span>
              </div>
              <div className="font-semibold text-white text-xs">{UPCOMING_EXAMS[0].subject}</div>
              <div className="text-[11px] text-slate-300 flex justify-between pt-1 border-t border-slate-800">
                <span>{UPCOMING_EXAMS[0].venue}</span>
                <span>{UPCOMING_EXAMS[0].time}</span>
              </div>
            </div>
          )}
        </div>

        {/* Official Bulletins */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
            Registrar Notices
          </span>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-700 space-y-1">
              <div className="font-semibold text-slate-900">Phase 1 Admissions Closing</div>
              <p className="text-slate-500">
                Undergraduate applications close on May 15, 2026. Submit scorecards.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-700 space-y-1">
              <div className="font-semibold text-slate-900">Library 24/7 Schedule</div>
              <p className="text-slate-500">
                24/7 overnight study pods open starting April 10 for exam prep.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            onClick={onOpenFeeCalculator}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>Estimate Tuition & Aid</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </button>
          <button
            onClick={() => onOpenKnowledgeHub('facilities')}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>Central Library & Clinic</span>
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
    </aside>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  CreditCard, 
  Calendar, 
  FileText, 
  Building2, 
  Landmark, 
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Search,
  Printer
} from 'lucide-react';
import { Category } from '../types';
import { 
  DEPARTMENTS, 
  CAMPUS_FACILITIES, 
  TIMETABLE_DATA, 
  UPCOMING_EXAMS, 
  FEE_STRUCTURES, 
  UNIVERSITY_NAME 
} from '../data/knowledgeBase';

interface KnowledgeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: Category;
  onQuerySelect: (query: string) => void;
}

export const KnowledgeDrawer: React.FC<KnowledgeDrawerProps> = ({
  isOpen,
  onClose,
  initialTab = 'admissions',
  onQuerySelect,
}) => {
  const [activeTab, setActiveTab] = useState<Category>(initialTab);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('CS-Semester-4');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  // Attendance simulator state
  const [classesHeld, setClassesHeld] = useState<number>(40);
  const [classesAttended, setClassesAttended] = useState<number>(32);

  if (!isOpen) return null;

  const attendancePercentage = classesHeld > 0 ? Math.round((classesAttended / classesHeld) * 100) : 0;
  const isEligibleForExams = attendancePercentage >= 75;

  const tabs: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: 'admissions', label: 'Admissions & Entry', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'fees', label: 'Fees & Aid', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'timetable', label: 'Timetable', icon: <Calendar className="w-4 h-4" /> },
    { id: 'examinations', label: 'Examinations', icon: <FileText className="w-4 h-4" /> },
    { id: 'departments', label: 'Departments', icon: <Building2 className="w-4 h-4" /> },
    { id: 'facilities', label: 'Facilities', icon: <Landmark className="w-4 h-4" /> },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-950/50 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-3xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-slate-200/90 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                Official Directory
              </span>
              <span className="text-xs text-slate-400">· {UNIVERSITY_NAME}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Campus Academic & Policy Archives
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Print page"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              id="btn-close-drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-4 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-slate-900 text-slate-900 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
              id={`tab-drawer-${tab.id}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-slate-50/40">
          
          {/* TAB 1: ADMISSIONS */}
          {activeTab === 'admissions' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xs">
                <span className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 mb-3">
                  Academic Year 2026 - 2027
                </span>
                <h3 className="text-base font-bold text-white">Undergraduate & Postgraduate Admissions</h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Applications are currently open for Engineering, Computer Science, Biotechnology, and Business Administration programs.
                </p>
                <div className="mt-5">
                  <button
                    onClick={() => {
                      onClose();
                      onQuerySelect('What is the step-by-step application procedure for B.Tech 2026?');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    <span>Ask CampusBot to Guide Application</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Key Milestones */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Key Dates & Deadlines
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[11px]">Phase 1 Deadline</span>
                    <strong className="text-slate-900 text-sm mt-0.5 block">May 15, 2026</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[11px]">Phase 2 Deadline</span>
                    <strong className="text-slate-900 text-sm mt-0.5 block">June 30, 2026</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[11px]">Merit List Announcement</span>
                    <strong className="text-slate-900 text-sm mt-0.5 block">July 10, 2026</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="text-slate-500 block text-[11px]">Orientation & Start</span>
                    <strong className="text-slate-900 text-sm mt-0.5 block">August 20, 2026</strong>
                  </div>
                </div>
              </div>

              {/* Eligibility Matrix */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Eligibility Requirements
                </h4>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="pb-3">
                    <strong className="text-slate-900 block font-semibold">B.Tech in Computer Science / AI / Electronics:</strong>
                    <p className="text-slate-600 mt-1 leading-relaxed">10+2 with minimum 60% aggregate in Physics, Math & Chemistry/CS. Valid score in JEE Main, State CET, or AIST-ET.</p>
                  </div>
                  <div className="py-3">
                    <strong className="text-slate-900 block font-semibold">BBA (Technology & Analytics):</strong>
                    <p className="text-slate-600 mt-1 leading-relaxed">10+2 in any discipline with minimum 55% aggregate and Mathematics/Economics background.</p>
                  </div>
                  <div className="pt-3">
                    <strong className="text-slate-900 block font-semibold">M.Tech Software Systems / VLSI:</strong>
                    <p className="text-slate-600 mt-1 leading-relaxed">B.Tech/BE in relevant discipline with 55%+ or CGPA 6.5. Valid GATE score or PG-CET.</p>
                  </div>
                </div>
              </div>

              {/* Documents Checklist */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Required Documents Checklist
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> 10th & 12th Official Mark Sheets</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> Entrance Exam Scorecard</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> Transfer / Migration Certificate</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> Government ID (Passport / ID Card)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> 4 Recent Passport Size Photos</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" /> Category Certificate (if applicable)</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: FEES & AID */}
          {activeTab === 'fees' && (
            <div className="space-y-6">
              {/* Fee Tables */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Academic Tuition Fee Structure (Per Semester)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                    <span className="font-bold text-slate-900 text-sm block">Undergraduate (B.Tech / BBA)</span>
                    <div className="mt-3 space-y-1.5 text-slate-600">
                      <div className="flex justify-between"><span>Tuition:</span><span className="font-semibold text-slate-800">$4,200</span></div>
                      <div className="flex justify-between"><span>Lab & Library:</span><span>$450</span></div>
                      <div className="flex justify-between"><span>Student Activity:</span><span>$250</span></div>
                      <div className="flex justify-between"><span>Development Fee:</span><span>$300</span></div>
                      <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                        <span>Semester Total:</span>
                        <span>$5,200</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                    <span className="font-bold text-slate-900 text-sm block">Postgraduate (M.Tech / MBA)</span>
                    <div className="mt-3 space-y-1.5 text-slate-600">
                      <div className="flex justify-between"><span>Tuition:</span><span className="font-semibold text-slate-800">$5,400</span></div>
                      <div className="flex justify-between"><span>Lab & Library:</span><span>$600</span></div>
                      <div className="flex justify-between"><span>Student Activity:</span><span>$250</span></div>
                      <div className="flex justify-between"><span>Development Fee:</span><span>$350</span></div>
                      <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                        <span>Semester Total:</span>
                        <span>$6,600</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hostel Options */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Residential Housing & Dining (Per Semester)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {FEE_STRUCTURES.hostelOptions.map((h, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-slate-900">{h.type}</div>
                        <div className="text-[11px] text-slate-500">Meal plan included</div>
                      </div>
                      <div className="font-bold text-slate-900 text-sm">${h.feePerSemester}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scholarships */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Scholarships & Financial Aid
                </h4>
                <div className="space-y-2.5 text-xs">
                  {FEE_STRUCTURES.scholarships.map((s, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex flex-col sm:flex-row justify-between sm:items-center gap-1.5">
                      <div>
                        <span className="font-semibold text-slate-900">{s.name}</span>
                        <p className="text-slate-500 text-[11px] mt-0.5">{s.eligibility}</p>
                      </div>
                      <span className="inline-block px-2.5 py-1 rounded-md bg-slate-200 text-slate-800 font-bold text-[11px] shrink-0">
                        {s.waiver}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TIMETABLE */}
          {activeTab === 'timetable' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-slate-500">Program:</span>
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-hidden"
                    id="select-dept-timetable"
                  >
                    <option value="CS-Semester-4">Computer Science (Sem 4)</option>
                    <option value="EE-Semester-4">Electrical Engineering (Sem 4)</option>
                    <option value="ME-Semester-4">Mechanical Engineering (Sem 4)</option>
                  </select>
                </div>

                <div className="flex items-center space-x-1 overflow-x-auto">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedDay === day
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                      id={`btn-day-${day}`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot Cards */}
              <div className="space-y-3">
                {TIMETABLE_DATA[selectedDept]
                  ?.filter((slot) => slot.day === selectedDay)
                  .map((slot) => (
                    <div
                      key={slot.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                            {slot.type}
                          </span>
                          <span className="font-mono text-xs text-slate-500">{slot.code}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{slot.subject}</h4>
                        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>Instructor: <strong className="text-slate-700">{slot.instructor}</strong></span>
                          <span>Venue: <strong className="text-slate-700">{slot.room}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center text-xs font-semibold text-slate-700 shrink-0 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60">
                        <Clock className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
                        <span>{slot.time}</span>
                      </div>
                    </div>
                  ))}

                {(!TIMETABLE_DATA[selectedDept] ||
                  TIMETABLE_DATA[selectedDept].filter((s) => s.day === selectedDay).length === 0) && (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200/90 text-slate-500 text-xs">
                    No scheduled lectures or labs for {selectedDay}.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: EXAMINATIONS */}
          {activeTab === 'examinations' && (
            <div className="space-y-6">
              {/* Exam Schedule */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Spring 2026 Examination Schedule
                </h3>
                <div className="divide-y divide-slate-100 text-xs">
                  {UPCOMING_EXAMS.map((exam, idx) => (
                    <div key={idx} className="py-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                            {exam.code}
                          </span>
                          <strong className="text-slate-900 text-sm">{exam.subject}</strong>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 flex gap-3">
                          <span>Venue: <strong className="text-slate-700">{exam.venue}</strong></span>
                          <span>Duration: <strong className="text-slate-700">{exam.duration}</strong></span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="font-bold text-slate-900">{exam.date}</div>
                        <div className="text-[11px] text-slate-500">{exam.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attendance Simulator */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      75% Attendance Simulator
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Verify your exam hall ticket eligibility</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    isEligibleForExams ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {attendancePercentage}% ({isEligibleForExams ? 'Eligible' : 'Barred'})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1.5">Total Classes Held: {classesHeld}</label>
                    <input
                      type="range"
                      min="20"
                      max="60"
                      value={classesHeld}
                      onChange={(e) => setClassesHeld(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1.5">Classes Attended: {classesAttended}</label>
                    <input
                      type="range"
                      min="0"
                      max={classesHeld}
                      value={classesAttended}
                      onChange={(e) => setClassesAttended(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {!isEligibleForExams && (
                  <div className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl text-xs text-rose-800">
                    <strong>Notice:</strong> Your attendance is below 75%. Submit medical certificates to the Dean office if applicable.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: DEPARTMENTS */}
          {activeTab === 'departments' && (
            <div className="space-y-4">
              {DEPARTMENTS.map((dept) => (
                <div
                  key={dept.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {dept.code}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{dept.name}</h4>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onQuerySelect(`Tell me more about the ${dept.name} department and faculty.`);
                      }}
                      className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ask Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{dept.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="text-slate-700">
                      <strong className="text-slate-900">HOD:</strong> {dept.hod}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${dept.email}`} className="text-slate-800 hover:underline">{dept.email}</a>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {dept.location}
                    </div>
                    <div className="text-slate-700">
                      <strong className="text-slate-900">Phone:</strong> {dept.phone}
                    </div>
                  </div>

                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">Specialized Labs: </span>
                    <span>{dept.labs.join(" · ")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: FACILITIES */}
          {activeTab === 'facilities' && (
            <div className="space-y-4">
              {CAMPUS_FACILITIES.map((fac) => (
                <div
                  key={fac.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {fac.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{fac.name}</h4>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onQuerySelect(`What are the operating hours and rules for ${fac.name}?`);
                      }}
                      className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ask CampusBot</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl text-xs space-y-1.5 border border-slate-100">
                    <div className="flex items-start gap-2 text-slate-800">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div><strong>Hours:</strong> {fac.hours}</div>
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div><strong>Location:</strong> {fac.location}</div>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <strong className="text-slate-800 block font-semibold">Highlights:</strong>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                      {fac.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <strong>Policy:</strong> {fac.rules}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-5 bg-white border-t border-slate-200/90 flex justify-end items-center">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            id="btn-close-drawer-footer"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};

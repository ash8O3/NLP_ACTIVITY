import React, { useState } from 'react';
import { X, User, Check } from 'lucide-react';
import { StudentProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [studentType, setStudentType] = useState(profile.studentType);
  const [major, setMajor] = useState(profile.major);
  const [semester, setSemester] = useState(profile.semester);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name,
      studentType,
      major,
      semester,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/80 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Student Profile</h3>
              <p className="text-xs text-slate-500 mt-0.5">Customize your answers to your major and semester</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-900 block mb-1.5">Student Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Johnson"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-900 block mb-1.5">Academic Status</label>
            <select
              value={studentType}
              onChange={(e: any) => setStudentType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden"
            >
              <option value="undergraduate">Undergraduate Student (B.Tech / BBA)</option>
              <option value="postgraduate">Postgraduate Student (M.Tech / MBA / PhD)</option>
              <option value="prospective">Prospective Student / Applicant</option>
              <option value="international">International Student</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-900 block mb-1.5">Major / Department</label>
            <select
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden"
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Electrical & Electronics">Electrical & Electronics</option>
              <option value="Mechanical & Aerospace">Mechanical & Aerospace</option>
              <option value="Biotechnology">Biotechnology & Life Sciences</option>
              <option value="Business Administration">School of Business & Management</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-900 block mb-1.5">Current Semester: {semester}</label>
            <input
              type="range"
              min="1"
              max="8"
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>Sem 1 (Freshman)</span>
              <span>Sem 4 (Sophomore)</span>
              <span>Sem 8 (Senior)</span>
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold flex items-center gap-1.5 transition-colors text-xs cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

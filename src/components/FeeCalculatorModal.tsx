import React, { useState } from 'react';
import { X, Calculator, ArrowRight } from 'lucide-react';
import { FEE_STRUCTURES } from '../data/knowledgeBase';

interface FeeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAboutCalculation: (summary: string) => void;
}

export const FeeCalculatorModal: React.FC<FeeCalculatorModalProps> = ({
  isOpen,
  onClose,
  onAskAboutCalculation,
}) => {
  const [level, setLevel] = useState<'undergraduate' | 'postgraduate'>('undergraduate');
  const [hostelTypeIndex, setHostelTypeIndex] = useState<number>(1);
  const [scholarshipPercent, setScholarshipPercent] = useState<number>(0);
  const [includeHostel, setIncludeHostel] = useState<boolean>(true);

  if (!isOpen) return null;

  const baseAcademic = FEE_STRUCTURES[level];
  const rawTuition = baseAcademic.tuitionPerSemester;
  const auxiliaryFees = baseAcademic.labAndLibraryFee + baseAcademic.studentActivityAndGym + baseAcademic.developmentFee;
  
  const discountAmount = Math.round((rawTuition * scholarshipPercent) / 100);
  const netTuition = rawTuition - discountAmount;

  const hostelCost = includeHostel ? FEE_STRUCTURES.hostelOptions[hostelTypeIndex].feePerSemester : 0;
  const totalPerSemester = netTuition + auxiliaryFees + hostelCost;
  const annualTotal = totalPerSemester * 2;

  // 3-part installment calculation
  const installment1 = Math.round(totalPerSemester * 0.40);
  const installment2 = Math.round(totalPerSemester * 0.30);
  const installment3 = totalPerSemester - installment1 - installment2;

  const handleCelebrateAndAsk = () => {
    const summary = `I calculated my estimated semester fee as $${totalPerSemester} for ${level === 'undergraduate' ? 'Undergraduate B.Tech' : 'Postgraduate M.Tech/MBA'} with ${scholarshipPercent}% scholarship and ${includeHostel ? FEE_STRUCTURES.hostelOptions[hostelTypeIndex].type : 'no hostel'}. Can you explain how to pay in installments?`;
    onAskAboutCalculation(summary);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/80 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Tuition & Fee Estimator</h3>
              <p className="text-xs text-slate-500 mt-0.5">Calculate personalized semester costs and installment plans</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Degree Level */}
          <div>
            <label className="font-semibold text-slate-900 block mb-2">Academic Level</label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setLevel('undergraduate')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                  level === 'undergraduate'
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Undergraduate
              </button>
              <button
                type="button"
                onClick={() => setLevel('postgraduate')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                  level === 'postgraduate'
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Postgraduate
              </button>
            </div>
          </div>

          {/* Scholarship Tier */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-semibold text-slate-900">Scholarship / Merit Waiver</label>
              <span className="font-semibold text-slate-600">{scholarshipPercent}% Waiver</span>
            </div>
            <select
              value={scholarshipPercent}
              onChange={(e) => setScholarshipPercent(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden"
            >
              <option value="0">Standard Tuition (0%)</option>
              <option value="25">Sports / Regional Fellowship (25%)</option>
              <option value="50">Dean's Academic Excellence (50%)</option>
              <option value="100">Chancellor's Top Merit Waiver (100%)</option>
            </select>
          </div>

          {/* Hostel Accommodation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-900">Campus Residence & Dining</label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={includeHostel}
                  onChange={(e) => setIncludeHostel(e.target.checked)}
                  className="rounded text-slate-900 focus:ring-0"
                />
                <span>Include Residence</span>
              </label>
            </div>

            {includeHostel && (
              <select
                value={hostelTypeIndex}
                onChange={(e) => setHostelTypeIndex(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden"
              >
                {FEE_STRUCTURES.hostelOptions.map((h, i) => (
                  <option key={i} value={i}>
                    {h.type} — ${h.feePerSemester}/sem (Meals Included)
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Summary Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-baseline border-b border-slate-800 pb-3">
              <div>
                <span className="text-slate-400 block text-[11px]">Net Semester Estimated Total</span>
                <span className="text-2xl font-bold text-white">${totalPerSemester.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[11px]">Annual (2 Semesters)</span>
                <span className="text-sm font-semibold text-slate-300">${annualTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Installment Plan Breakdown */}
            <div>
              <span className="text-slate-400 font-medium block text-[11px] mb-2">
                Flexible 3-Part Installment Breakdown:
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="bg-slate-800/80 p-2.5 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">1st (40% Reg)</span>
                  <strong className="text-white font-semibold mt-0.5 block">${installment1}</strong>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">2nd (+45 Days)</span>
                  <strong className="text-white font-semibold mt-0.5 block">${installment2}</strong>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">3rd (Midterms)</span>
                  <strong className="text-white font-semibold mt-0.5 block">${installment3}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-200/80 flex justify-between items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleCelebrateAndAsk}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
            id="btn-ask-fee-calc"
          >
            <span>Ask CampusBot About This Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  ChevronLeft,
  Calendar,
  Sparkles,
  Heart,
  Settings,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { StudentProfile, ParentAnalytics } from '../../types';
import { playGentleTapSound, playSuccessChime } from '../../utils/audio';

interface ParentDashboardProps {
  student: StudentProfile;
  analytics: ParentAnalytics;
  onBackToStudentApp: () => void;
}

export const ParentTeacherDashboard: React.FC<ParentDashboardProps> = ({
  student,
  analytics,
  onBackToStudentApp,
}) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'skills' | 'iep_notes'>('overview');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-100 select-none pb-12 overflow-y-auto">
      {/* Top Educator Header */}
      <div className="sticky top-0 z-30 bg-purple-900 text-white px-5 py-3.5 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToStudentApp}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-800 hover:bg-purple-700 text-purple-100 font-bold text-xs cursor-pointer active:scale-95 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Student Mode
          </button>
          <div className="hidden sm:block">
            <h1 className="text-base font-extrabold font-fun">Educator & Parent Hub</h1>
          </div>
        </div>

        <button
          onClick={() => {
            playGentleTapSound();
            setShowReportModal(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs shadow-xs cursor-pointer transition-all"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Export IEP Report</span>
        </button>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Student Profile Overview Card */}
        <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-purple-100 border-3 border-purple-300 flex items-center justify-center text-3xl">
              {student.avatar || '🦊'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 font-fun">
                  {student.name}'s Music Learning Profile
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase">
                  Active
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Age: {student.ageGroup} • Sensory Mode: {student.sensoryMode} • Primary Instrument: {student.preferredInstrument}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Quantitative Educator KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Weekly Time</span>
            <p className="text-2xl font-black text-purple-900 font-fun mt-1">
              {analytics.totalPracticeMinutesThisWeek}m
            </p>
            <span className="text-[10px] font-extrabold text-emerald-600">+15% vs last wk</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Accuracy Rate</span>
            <p className="text-2xl font-black text-emerald-600 font-fun mt-1">
              {analytics.accuracyRatePercent}%
            </p>
            <span className="text-[10px] font-extrabold text-slate-500">First-attempt</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Completed</span>
            <p className="text-2xl font-black text-amber-600 font-fun mt-1">
              {analytics.lessonsCompletedTotal}
            </p>
            <span className="text-[10px] font-extrabold text-slate-500">Curriculum units</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Calm Index</span>
            <p className="text-2xl font-black text-sky-600 font-fun mt-1">
              {analytics.calmEngagementScore}/10
            </p>
            <span className="text-[10px] font-extrabold text-slate-500">Regulated focus</span>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
              activeSubTab === 'overview'
                ? 'bg-purple-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            Weekly Practice & Routine
          </button>
          <button
            onClick={() => setActiveSubTab('skills')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
              activeSubTab === 'skills'
                ? 'bg-purple-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            Skills & Development
          </button>
          <button
            onClick={() => setActiveSubTab('iep_notes')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
              activeSubTab === 'iep_notes'
                ? 'bg-purple-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            IEP / Teacher Observations
          </button>
        </div>

        {/* Tab 1: Practice Routine */}
        {activeSubTab === 'overview' && (
          <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-base font-fun mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Daily Music Session Duration
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Short 6-10 minute daily intervals foster neuro-developmental regulation without sensory overload.
              </p>

              <div className="space-y-2.5">
                {analytics.dailyEngagement.map((d) => (
                  <div key={d.day} className="flex items-center justify-between text-xs">
                    <span className="w-10 font-bold text-slate-700">{d.day}</span>
                    <div className="flex-1 mx-3 bg-slate-100 rounded-full h-3.5 overflow-hidden">
                      <div
                        className="bg-purple-600 h-full rounded-full transition-all"
                        style={{ width: `${(d.minutes / 15) * 100}%` }}
                      />
                    </div>
                    <span className="w-16 text-right font-black text-slate-800">
                      {d.minutes > 0 ? `${d.minutes} mins` : 'Rest Day'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended next steps */}
            <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-200 shadow-xs">
              <h3 className="font-extrabold text-amber-950 text-base font-fun mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Educator Recommendations
              </h3>
              <ul className="space-y-2 text-xs text-amber-900 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Introduce Note E (Mi) to begin simple 2-note step intervals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Continue utilizing the Xylophone sound profile during evening sessions for soothing sensory regulation.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Skills & Areas in Development */}
        {activeSubTab === 'skills' && (
          <div className="space-y-4">
            {/* Mastered Skills */}
            <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-base font-fun mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Mastered Musical Competencies
              </h3>
              <div className="space-y-2.5">
                {analytics.masteredSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold text-emerald-950">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* In Development */}
            <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-base font-fun mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Skills Currently in Development
              </h3>
              <div className="space-y-2.5">
                {analytics.skillsInDevelopment.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-xs font-bold text-amber-950">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: IEP Notes & Accommodations */}
        {activeSubTab === 'iep_notes' && (
          <div className="p-5 rounded-3xl bg-white border-2 border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base font-fun flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Special Education & Sensory Observations
            </h3>

            <div className="space-y-3">
              {analytics.notesAndObservations.map((note, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 leading-relaxed">
                  "{note}"
                </div>
              ))}
            </div>

            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">
                Accommodations Enforced
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-purple-900">
                <span className="px-3 py-1 rounded-xl bg-purple-100 border border-purple-200">
                  ✓ High Visual Salience
                </span>
                <span className="px-3 py-1 rounded-xl bg-purple-100 border border-purple-200">
                  ✓ Replayable Speech Audio
                </span>
                <span className="px-3 py-1 rounded-xl bg-purple-100 border border-purple-200">
                  ✓ Sensory Soft Synth Envelope
                </span>
                <span className="px-3 py-1 rounded-xl bg-purple-100 border border-purple-200">
                  ✓ 0 Time Constraints
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Printable IEP Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl border-2 border-slate-300 shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 font-fun">
                  Special Education Music Progress Report
                </h3>
                <p className="text-xs text-slate-500">MelodyCare Individualized Progress Record</p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs text-slate-700">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <p><strong>Student:</strong> {student.name}</p>
                <p><strong>Age Category:</strong> {student.ageGroup}</p>
                <p><strong>Weekly Practice:</strong> {analytics.totalPracticeMinutesThisWeek} minutes</p>
                <p><strong>Overall Accuracy:</strong> {analytics.accuracyRatePercent}%</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Mastered Skills:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {analytics.masteredSkills.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Teacher & Sensory Notes:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {analytics.notesAndObservations.map((n, idx) => (
                    <li key={idx}>{n}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-200">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 bg-purple-900 hover:bg-purple-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="px-5 py-3 bg-slate-100 text-slate-700 font-bold rounded-2xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

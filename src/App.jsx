import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ExamSimulator from './components/ExamSimulator';
import TopicPractice from './components/TopicPractice';
import PairDiscussionRoom from './components/PairDiscussionRoom';
import GraphPresentationTool from './components/GraphPresentationTool';
import VocabularyBank from './components/VocabularyBank';
import RubricGuideModal from './components/RubricGuideModal';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [activeTab, setActiveTab] = useState('exam');
  const [isRubricOpen, setIsRubricOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col font-sans selection:bg-[#0071e3]/20 selection:text-[#0071e3] relative overflow-x-hidden">
      {/* Apple-style subtle ambient background gradients */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl opacity-70" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-indigo-300/10 blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl opacity-40" />
      </div>

      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onOpenRubric={() => setIsRubricOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <ErrorBoundary>
          {activeTab === 'exam' && <ExamSimulator />}
          {activeTab === 'practice' && <TopicPractice />}
          {activeTab === 'pair' && <PairDiscussionRoom />}
          {activeTab === 'graph' && <GraphPresentationTool />}
          {activeTab === 'vocab' && <VocabularyBank />}
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-black/[0.06] bg-white/70 backdrop-blur-xl py-10 text-center text-xs text-[#86868b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-[#1d1d1f]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.04]">
              ✓ 5 Unit Trọng Tâm: Price, Service, Insurance, Productivity, Motivation
            </span>
            <span className="hidden sm:inline text-black/20">•</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.04]">
              ✓ Khung Trả Lời Chuẩn P-E-E-L
            </span>
            <span className="hidden sm:inline text-black/20">•</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.04]">
              ✓ Chuẩn Tiêu Chí Chấm Của Giáo Viên
            </span>
          </div>
          <p className="text-[#86868b] text-[11px] sm:text-xs max-w-2xl mx-auto leading-relaxed">
            FinSpeak Pro — Hệ Thống Luyện Thi Nói Tiếng Anh Chuyên Ngành Tài Chính &amp; Kế Toán. Chúc bạn thi đạt điểm tuyệt đối!
          </p>
        </div>
      </footer>

      {/* Rubric Matrix Modal */}
      <RubricGuideModal 
        isOpen={isRubricOpen} 
        onClose={() => setIsRubricOpen(false)} 
      />
    </div>
  );
}

export default App;

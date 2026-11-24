import React, { useState } from 'react';
import { UNITS, SPEAKING_DATA } from '../data/speakingData';
import { evaluateTranscript } from '../data/rubricCriteria';
import { 
  BookOpen, 
  Volume2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Users, 
  BarChart3, 
  Layers, 
  HelpCircle, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import AudioRecorder from './AudioRecorder';
import { SpeechService } from '../services/speechService';

export default function TopicPractice() {
  const [activeUnitId, setActiveUnitId] = useState('price');
  const [filterType, setFilterType] = useState('all'); // 'all', 'individual_short', 'pair_situation', 'presentation'
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [showModelAnswer, setShowModelAnswer] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [activePlayingId, setActivePlayingId] = useState(null);

  const currentUnit = UNITS.find(u => u.id === activeUnitId) || UNITS[0];
  const unitQuestions = SPEAKING_DATA.filter(q => q.unitId === activeUnitId);

  const filteredQuestions = unitQuestions.filter(q => {
    if (filterType === 'all') return true;
    return q.type === filterType;
  });

  const toggleExpand = (id) => {
    setExpandedQuestionId(prev => prev === id ? null : id);
  };

  const toggleModelAnswer = (id) => {
    setShowModelAnswer(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePlayModelAudio = (id, text) => {
    if (activePlayingId === id) {
      SpeechService.stopSpeaking();
      setActivePlayingId(null);
    } else {
      setActivePlayingId(id);
      SpeechService.speak(text, {
        onEnd: () => setActivePlayingId(null),
        onError: () => setActivePlayingId(null)
      });
    }
  };

  const handleEvaluate = (id, transcript, questionObj) => {
    const result = evaluateTranscript(transcript, activeUnitId, questionObj);
    setEvaluations(prev => ({
      ...prev,
      [id]: result
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Unit Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {UNITS.map(unit => {
          const isActive = unit.id === activeUnitId;
          return (
            <button
              key={unit.id}
              onClick={() => {
                setActiveUnitId(unit.id);
                setExpandedQuestionId(null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 apple-press ${
                isActive
                  ? 'border-[#0071e3] bg-white shadow-[0_4px_16px_-4px_rgba(0,113,227,0.2)] ring-2 ring-[#0071e3]/20'
                  : 'border-black/[0.06] bg-white hover:border-black/[0.12] shadow-xs'
              }`}
            >
              <div className="text-[11px] font-bold text-[#0071e3] uppercase tracking-wider mb-1">
                {unit.title.split(':')[0]}
              </div>
              <div className="font-bold text-[#1d1d1f] text-sm leading-tight">
                {unit.title.split(':')[1]}
              </div>
              <div className="text-[11px] text-[#86868b] mt-1 line-clamp-1 font-medium">
                {unit.vietnameseTitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Unit Banner */}
      <div className="bg-gradient-to-br from-[#161617] via-[#1d1d1f] to-[#2c2c2e] rounded-3xl p-6 sm:p-8 text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden border border-white/10">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/90 border border-white/15 mb-3 backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5 text-[#42a5f5]" /> {currentUnit.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{currentUnit.title}</h2>
          <p className="text-sm text-[#42a5f5] mt-1 font-medium">{currentUnit.vietnameseTitle}</p>
          <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
            {currentUnit.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {currentUnit.keyThemes.map((th, i) => (
              <span key={i} className="text-[11px] px-3 py-1 bg-white/10 rounded-full text-white/80 border border-white/10 backdrop-blur-md">
                • {th}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Chips (Apple Segmented Bar Style) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex flex-wrap items-center bg-black/[0.04] p-1 rounded-2xl border border-black/[0.04] gap-1">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 apple-press ${
              filterType === 'all'
                ? 'bg-white text-[#1d1d1f] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]'
                : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            Tất cả câu hỏi ({unitQuestions.length})
          </button>
          <button
            onClick={() => setFilterType('individual_short')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 apple-press ${
              filterType === 'individual_short'
                ? 'bg-white text-[#0071e3] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]'
                : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Nói cá nhân ({unitQuestions.filter(q => q.type === 'individual_short').length})
          </button>
          <button
            onClick={() => setFilterType('pair_situation')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 apple-press ${
              filterType === 'pair_situation'
                ? 'bg-white text-[#0284c7] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]'
                : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Tình huống cặp ({unitQuestions.filter(q => q.type === 'pair_situation').length})
          </button>
          <button
            onClick={() => setFilterType('presentation')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 apple-press ${
              filterType === 'presentation'
                ? 'bg-white text-[#d97706] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]'
                : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Thuyết trình 2-3 phút ({unitQuestions.filter(q => q.type === 'presentation').length})
          </button>
        </div>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isExpanded = expandedQuestionId === q.id;
          const isShowingModel = showModelAnswer[q.id];
          const isPlayingAudio = activePlayingId === q.id;
          const currentEval = evaluations[q.id];

          return (
            <div
              key={q.id}
              className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden ${
                isExpanded 
                  ? 'border-[#0071e3]/40 shadow-[0_8px_30px_-6px_rgba(0,113,227,0.12)] ring-1 ring-[#0071e3]/20' 
                  : 'border-black/[0.06] shadow-xs hover:border-black/[0.12]'
              }`}
            >
              {/* Question Header Card */}
              <div
                onClick={() => toggleExpand(q.id)}
                className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 apple-press select-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-black/[0.04] text-[#1d1d1f] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      q.type === 'individual_short' 
                        ? 'bg-[#0071e3]/10 text-[#0071e3]'
                        : q.type === 'pair_situation'
                        ? 'bg-[#0284c7]/10 text-[#0284c7]'
                        : 'bg-amber-500/10 text-amber-800'
                    }`}>
                      {q.type === 'individual_short' ? 'Nói cá nhân' : q.type === 'pair_situation' ? 'Nói cặp & Giải quyết tình huống' : 'Thuyết trình 2-3 phút'}
                    </span>
                    <span className="text-xs font-medium text-[#86868b]">{q.title}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1d1d1f] leading-snug pt-1">
                    {q.question}
                  </h3>
                  <div className="text-xs text-[#86868b] italic">
                    Dịch nghĩa: {q.vietnameseTranslation}
                  </div>
                </div>

                <div className="p-2 text-[#86868b] hover:text-[#1d1d1f] rounded-full hover:bg-black/[0.04] transition">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Expanded Detail Body */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-black/[0.04] space-y-6">
                  {/* PEEL Structure Framework (if individual) */}
                  {q.peelStructure && (
                    <div className="bg-[#f5f5f7] border border-black/[0.05] rounded-2xl p-5 space-y-3">
                      <div className="font-bold text-[#1d1d1f] text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <Layers className="w-4 h-4 text-[#0071e3]" /> Cấu Trúc Trả Lời Chuẩn (P - E - E - L Framework)
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-white rounded-xl border border-black/[0.06] shadow-xs">
                          <span className="font-bold text-[#0071e3]">P - Point (Ý chính):</span> {q.peelStructure.point}
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-black/[0.06] shadow-xs">
                          <span className="font-bold text-[#0284c7]">E - Explain (Giải thích):</span> {q.peelStructure.explanation}
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-black/[0.06] shadow-xs">
                          <span className="font-bold text-[#248a3d]">E - Example (Ví dụ thực tế):</span> {q.peelStructure.example}
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-black/[0.06] shadow-xs">
                          <span className="font-bold text-amber-800">L - Link (Chốt lại/Kết luận):</span> {q.peelStructure.link}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pair Speaking Breakdown (if pair situation) */}
                  {q.pairRoleplay && (
                    <div className="space-y-3">
                      <div className="font-bold text-[#1d1d1f] text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <Users className="w-4 h-4 text-[#0284c7]" /> Kịch Bản Phân Vai Thảo Luận Theo Cặp (Student A vs Student B)
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                          <div className="font-bold text-[#0071e3] mb-1">Student A: {q.pairRoleplay.partnerA.role}</div>
                          <div className="text-[#6e6e73] mb-2">{q.pairRoleplay.partnerA.stance}</div>
                          <ul className="list-disc list-inside space-y-1 text-[#1d1d1f]">
                            {q.pairRoleplay.partnerA.points.map((pt, i) => (
                              <li key={i}>{pt}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-cyan-50/50 border border-cyan-100 rounded-2xl">
                          <div className="font-bold text-cyan-800 mb-1">Student B: {q.pairRoleplay.partnerB.role}</div>
                          <div className="text-[#6e6e73] mb-2">{q.pairRoleplay.partnerB.stance}</div>
                          <ul className="list-disc list-inside space-y-1 text-[#1d1d1f]">
                            {q.pairRoleplay.partnerB.points.map((pt, i) => (
                              <li key={i}>{pt}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-3.5 bg-[#34c759]/10 border border-[#34c759]/20 rounded-2xl text-xs">
                        <span className="font-bold text-[#248a3d]">Quyết định chung cần thống nhất (Consensus): </span>
                        <span className="text-[#248a3d]">{q.pairRoleplay.consensusConclusion}</span>
                      </div>
                    </div>
                  )}

                  {/* Vocabulary Chips */}
                  {q.keyVocabulary && (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-[#1d1d1f] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Thuật ngữ tài chính kế toán cần đưa vào bài nói:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {q.keyVocabulary.map((v, i) => (
                          <div 
                            key={i} 
                            className="group relative px-3 py-1 bg-amber-500/10 hover:bg-amber-500/15 text-amber-900 text-xs font-semibold rounded-xl border border-amber-500/20 cursor-help transition-all duration-200"
                          >
                            <span>{v.term}</span>
                            <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full left-0 mb-2 z-30 w-64 p-3 bg-[#1d1d1f] text-white text-[11px] rounded-2xl shadow-xl transition-all duration-200 border border-white/10">
                              <div className="font-bold text-amber-300">{v.meaning}</div>
                              <div className="text-white/80 mt-0.5 leading-relaxed">{v.usage}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Model Answer Toggle & Content */}
                  <div className="border border-black/[0.06] rounded-2xl overflow-hidden bg-white shadow-xs">
                    <div className="bg-[#f5f5f7] p-4 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => toggleModelAnswer(q.id)}
                        className="flex items-center gap-2 text-xs font-semibold text-[#0071e3] hover:text-[#0077ed] transition apple-press"
                      >
                        {isShowingModel ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {isShowingModel ? 'Ẩn câu trả lời mẫu C1' : 'Xem câu trả lời mẫu C1 (Band 9.0)'}
                      </button>

                      {isShowingModel && (
                        <button
                          onClick={() => handlePlayModelAudio(q.id, q.sampleAnswer)}
                          className="flex items-center gap-1.5 px-3 py-1 bg-white border border-black/[0.08] hover:bg-black/[0.02] text-[#1d1d1f] text-xs font-semibold rounded-xl transition apple-press shadow-xs"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-[#0071e3]" />
                          {isPlayingAudio ? 'Dừng đọc' : 'Nghe giọng mẫu'}
                        </button>
                      )}
                    </div>

                    {isShowingModel && (
                      <div className="p-5 text-xs sm:text-sm text-[#1d1d1f] leading-relaxed bg-white border-t border-black/[0.04] whitespace-pre-wrap">
                        {q.sampleAnswer}
                      </div>
                    )}
                  </div>

                  {/* Teacher Follow-Up Preview */}
                  {q.teacherFollowUps && q.teacherFollowUps.length > 0 && (
                    <div className="p-4 bg-purple-50/70 border border-purple-200/60 rounded-2xl space-y-2 text-xs">
                      <div className="font-bold text-purple-900 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-purple-600" />
                        Câu hỏi đào sâu giáo viên có thể hỏi thêm (Part 3):
                      </div>
                      <div className="font-semibold text-purple-950">
                        "{q.teacherFollowUps[0].question}"
                      </div>
                      <div className="text-[#6e6e73] pt-1 border-t border-purple-200/40">
                        <span className="font-semibold text-purple-900">Gợi ý trả lời:</span> {q.teacherFollowUps[0].sampleResponse}
                      </div>
                    </div>
                  )}

                  {/* Real-time Audio Recorder & Rubric Evaluator */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold text-[#1d1d1f]">
                      Thực hành nói &amp; Tự kiểm tra chấm điểm:
                    </div>
                    <AudioRecorder
                      placeholder="Bấm micro để thực hành nói bài này bằng tiếng Anh..."
                      onEvaluate={(text) => handleEvaluate(q.id, text, q)}
                    />

                    {/* Rubric Evaluation Result */}
                    {currentEval && (
                      <div className="bg-white border border-[#0071e3]/20 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1d1d1f] text-sm">
                            Đánh Giá Theo 5 Tiêu Chí Giáo Viên
                          </span>
                          <span className="text-2xl font-black text-[#0071e3]">
                            {currentEval.totalScore} <span className="text-xs font-normal text-[#86868b]">/ 10</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                          <div className="bg-[#f5f5f7] p-3 rounded-xl border border-black/[0.04]">
                            <div className="text-[10px] text-[#86868b] font-medium">Ý chính rõ ràng</div>
                            <div className="font-bold text-[#1d1d1f] mt-0.5">{currentEval.criteriaScores.c1_main_idea}</div>
                          </div>
                          <div className="bg-[#f5f5f7] p-3 rounded-xl border border-black/[0.04]">
                            <div className="text-[10px] text-[#86868b] font-medium">Dẫn chứng/Lý do</div>
                            <div className="font-bold text-[#1d1d1f] mt-0.5">{currentEval.criteriaScores.c2_supported_reasons}</div>
                          </div>
                          <div className="bg-[#f5f5f7] p-3 rounded-xl border border-black/[0.04]">
                            <div className="text-[10px] text-[#86868b] font-medium">Từ vựng Unit</div>
                            <div className="font-bold text-[#1d1d1f] mt-0.5">{currentEval.criteriaScores.c3_unit_vocabulary}</div>
                          </div>
                          <div className="bg-[#f5f5f7] p-3 rounded-xl border border-black/[0.04]">
                            <div className="text-[10px] text-[#86868b] font-medium">Bố cục logic</div>
                            <div className="font-bold text-[#1d1d1f] mt-0.5">{currentEval.criteriaScores.c4_logical_organization}</div>
                          </div>
                          <div className="bg-[#f5f5f7] p-3 rounded-xl border border-black/[0.04]">
                            <div className="text-[10px] text-[#86868b] font-medium">Lưu loát/Phản xạ</div>
                            <div className="font-bold text-[#1d1d1f] mt-0.5">{currentEval.criteriaScores.c5_clarity_and_followup}</div>
                          </div>
                        </div>

                        <div className="space-y-1.5 text-xs">
                          {currentEval.strengths.map((s, i) => (
                            <div key={i} className="text-[#248a3d] font-medium">✓ {s}</div>
                          ))}
                          {currentEval.improvements.map((imp, i) => (
                            <div key={i} className="text-amber-800 font-medium">💡 {imp}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

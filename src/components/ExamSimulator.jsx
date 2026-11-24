import React, { useState, useEffect } from 'react';
import { UNITS, SPEAKING_DATA } from '../data/speakingData';
import { TEACHER_RUBRIC, evaluateTranscript } from '../data/rubricCriteria';
import {
  Award, Clock, ArrowRight, Volume2, Sparkles,
  CheckCircle2, RotateCcw, ChevronRight,
  Bot, Settings, BrainCircuit, BookOpen, Layers, Lightbulb,
  Check, Copy, RefreshCw,
  ShieldCheck, ExternalLink, X
} from 'lucide-react';
import AudioRecorder from './AudioRecorder';
import { SpeechService } from '../services/speechService';
import {
  evaluateExamWithAI,
  getStoredApiKey,
  setStoredApiKey
} from '../services/aiScoringService';
import confetti from 'canvas-confetti';

export default function ExamSimulator() {
  const [examStep, setExamStep] = useState('welcome'); // 'welcome', 'prep', 'part1', 'part2', 'part3', 'result'
  const [selectedUnitId, setSelectedUnitId] = useState('price');
  
  // Dữ liệu đề thi bốc được
  const [examTicket, setExamTicket] = useState(null);
  
  // Thời gian đếm ngược chuẩn bị
  const [prepSeconds, setPrepSeconds] = useState(60);
  const [isPrepRunning, setIsPrepRunning] = useState(false);

  // Bài nói của thí sinh theo từng phần
  const [part1Transcript, setPart1Transcript] = useState('');
  const [part2Transcript, setPart2Transcript] = useState('');
  const [part3Transcript, setPart3Transcript] = useState('');
  
  // Điểm & Nhận xét tổng hợp từ AI
  const [finalReport, setFinalReport] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiProgressMessage, setAiProgressMessage] = useState('');
  const [aiProgressStep, setAiProgressStep] = useState('analyzing');
  
  // Tab hiển thị trong phiếu điểm
  const [resultTab, setResultTab] = useState('rubric'); // 'rubric', 'parts', 'upgrades', 'vocab'
  const [isCopied, setIsCopied] = useState(false);
  const [isSpeakingFeedback, setIsSpeakingFeedback] = useState(false);

  // Quản lý API Key cho Gemini
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');

  useEffect(() => {
    setApiKeyInput(getStoredApiKey());
  }, []);

  // Khởi tạo đề thi ngẫu nhiên theo Unit được chọn
  const handleGenerateExam = (unitId) => {
    setSelectedUnitId(unitId);
    const unitQuestions = SPEAKING_DATA.filter(q => q.unitId === unitId);
    
    const part1Items = unitQuestions.filter(q => q.part === 'part1');
    const part2Items = unitQuestions.filter(q => q.part === 'part2' || q.type === 'pair_situation');
    
    const part1Chosen = part1Items[Math.floor(Math.random() * part1Items.length)] || part1Items[0] || unitQuestions[0];
    const part2Chosen = part2Items[Math.floor(Math.random() * part2Items.length)] || part2Items[0] || unitQuestions[1] || unitQuestions[0];
    
    // Câu hỏi hỏi sâu của giáo viên lấy từ Part 3 của question đã chọn
    const teacherFollowUp = part1Chosen?.teacherFollowUps?.[0] || {
      question: 'From a financial and accounting perspective, what are the primary risks associated with this decision?',
      sampleResponse: 'The primary risks include unexpected liquidity shortages, margin compression, and customer churn.'
    };

    setExamTicket({
      unit: UNITS.find(u => u.id === unitId) || UNITS[0],
      part1: part1Chosen,
      part2: part2Chosen,
      part3Question: teacherFollowUp.question,
      part3Sample: teacherFollowUp.sampleResponse
    });

    setPart1Transcript('');
    setPart2Transcript('');
    setPart3Transcript('');
    setPrepSeconds(60);
    setExamStep('prep');
    setFinalReport(null);
  };

  // Timer chuẩn bị
  useEffect(() => {
    let interval = null;
    if (isPrepRunning && prepSeconds > 0) {
      interval = setInterval(() => {
        setPrepSeconds(prev => prev - 1);
      }, 1000);
    } else if (prepSeconds === 0 && isPrepRunning) {
      setIsPrepRunning(false);
      setExamStep('part1');
    }
    return () => clearInterval(interval);
  }, [isPrepRunning, prepSeconds]);

  // Đọc câu hỏi bằng giọng giám khảo
  const handleSpeakQuestion = (text) => {
    SpeechService.speak(text, { rate: 0.95 });
  };

  // Tính toán kết quả thi toàn diện bằng AI
  const handleFinishExam = async (forceLocal = false) => {
    setIsEvaluating(true);
    setAiProgressMessage('Đang khởi động AI Giám khảo và nạp bài thi...');
    try {
      const report = await evaluateExamWithAI({
        examTicket,
        part1Transcript,
        part2Transcript,
        part3Transcript,
        forceLocal,
        onProgress: (step, msg) => {
          setAiProgressStep(step);
          setAiProgressMessage(msg);
        }
      });

      setFinalReport(report);
      setExamStep('result');
      setResultTab('rubric');

      // Bắn pháo hoa chúc mừng nếu đạt điểm khá giỏi
      if (report && report.totalScore >= 7.0) {
        try {
          confetti({
            particleCount: 110,
            spread: 75,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }
    } catch (err) {
      console.error('Lỗi khi chấm điểm với AI:', err);
      // Fallback an toàn tuyệt đối với evaluateTranscript
      const combinedAllText = `${part1Transcript} ${part2Transcript} ${part3Transcript}`;
      const fallbackReport = evaluateTranscript(combinedAllText, examTicket?.unit?.id, examTicket?.part1);
      setFinalReport({
        ...fallbackReport,
        cefrLevel: fallbackReport.totalScore >= 8.0 ? 'C1 Advanced' : 'B2 Upper-Intermediate',
        examinerSummary: fallbackReport.feedback || 'Hoàn tất chấm điểm theo 5 tiêu chí Rubric chuẩn của giáo viên.',
        providerName: 'FinSpeak Standard Evaluator'
      });
      setExamStep('result');
      setResultTab('rubric');
    } finally {
      setIsEvaluating(false);
    }
  };

  // Đọc to nhận xét của giám khảo AI
  const handleToggleSpeakFeedback = () => {
    if (isSpeakingFeedback) {
      SpeechService.stopSpeaking();
      setIsSpeakingFeedback(false);
    } else {
      const textToSpeak = finalReport?.examinerSummary || 'You have successfully completed the examination.';
      setIsSpeakingFeedback(true);
      SpeechService.speak(textToSpeak, {
        rate: 0.95,
        onEnd: () => setIsSpeakingFeedback(false),
        onError: () => setIsSpeakingFeedback(false)
      });
    }
  };

  // Sao chép kết quả thi vào clipboard
  const handleCopyFeedback = () => {
    if (!finalReport) return;
    const text = `=== FINSPEAK PRO — PHIẾU ĐIỂM THI VẤN ĐÁP TIẾNG ANH TÀI CHÍNH KẾ TOÁN ===
Chủ đề bốc: ${examTicket?.unit?.title || ''} (${examTicket?.unit?.vietnameseTitle || ''})
Điểm tổng kết: ${finalReport.totalScore} / 10 | Bậc năng lực: ${finalReport.cefrLevel || 'B2'}
Hệ thống chấm: ${finalReport.providerName || 'AI Examiner'}

Nhận xét của Giám khảo:
${finalReport.examinerSummary || ''}

Điểm chi tiết theo 5 tiêu chí:
1. Ý chính rõ ràng (20%): ${finalReport.criteriaScores?.c1_main_idea ?? 0} / 10
2. Luận cứ & Dẫn chứng (25%): ${finalReport.criteriaScores?.c2_supported_reasons ?? 0} / 10
3. Từ vựng chuyên ngành (20%): ${finalReport.criteriaScores?.c3_unit_vocabulary ?? 0} / 10
4. Bố cục logic (20%): ${finalReport.criteriaScores?.c4_logical_organization ?? 0} / 10
5. Lưu loát & Phản xạ (15%): ${finalReport.criteriaScores?.c5_clarity_and_followup ?? 0} / 10

Thuật ngữ chuyên ngành ghi nhận: ${(finalReport.matchedVocab || []).join(', ') || 'Chưa ghi nhận'}
`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSaveApiKey = () => {
    setStoredApiKey(apiKeyInput);
    setShowApiKeyModal(false);
  };

  const handleClearApiKey = () => {
    setStoredApiKey('');
    setApiKeyInput('');
    setShowApiKeyModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Step 1: Welcome & Unit Selection */}
      {examStep === 'welcome' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#161617] via-[#1d1d1f] to-[#2c2c2e] rounded-3xl p-6 sm:p-10 text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden border border-white/10">
            <div className="relative z-10 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-md border border-white/15">
                  <Award className="w-3.5 h-3.5 text-amber-300" /> Mô Phỏng Phòng Thi Thật (Exam Simulation)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#34c759]/20 text-[#34c759] border border-[#34c759]/30 backdrop-blur-md">
                  <Bot className="w-3.5 h-3.5" /> Tích Hợp AI Giám Khảo Chấm Bài
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Phòng Thi Vấn Đáp Tiếng Anh Tài Chính Kế Toán
              </h1>
              <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
                Kỳ thi mô phỏng chính xác cấu trúc bài thi của bạn gồm 3 phần thi chính kèm hệ thống AI chấm điểm tự động theo 5 tiêu chí Rubric:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 text-xs">
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-md">
                  <div className="font-bold text-amber-300 text-sm">Phần 1: Nói cá nhân</div>
                  <div className="text-white/80 mt-1 leading-relaxed">Trả lời câu hỏi đơn giản hoặc thuyết trình biểu đồ/chủ đề 2-3 phút</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-md">
                  <div className="font-bold text-cyan-300 text-sm">Phần 2: Nói cặp</div>
                  <div className="text-white/80 mt-1 leading-relaxed">Thảo luận tình huống giải quyết vấn đề và thống nhất quyết định</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-md">
                  <div className="font-bold text-emerald-300 text-sm">Phần 3: Giáo viên hỏi sâu</div>
                  <div className="text-white/80 mt-1 leading-relaxed">Giám khảo hỏi đào sâu kiểm tra độ nhạy bén tài chính &amp; từ vựng</div>
                </div>
              </div>
            </div>
          </div>

          {/* Draw Ticket Card */}
          <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#1d1d1f]">
                  Bước 1: Bốc thăm chủ đề bài thi (Chọn hoặc Bốc ngẫu nhiên 1 trong 5 Unit)
                </h2>
                <p className="text-xs text-[#86868b] mt-0.5 font-medium">
                  Chọn một chủ đề yêu thích hoặc thử vận may với đề ngẫu nhiên như trong phòng thi thực tế
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowApiKeyModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] text-xs font-semibold rounded-2xl transition apple-press"
                  title="Cài đặt AI Giám khảo"
                >
                  <Settings className="w-3.5 h-3.5 text-[#86868b]" />
                  <span>{getStoredApiKey() ? 'AI: Gemini Key' : 'AI: Cục Bộ (Zero-config)'}</span>
                </button>
                <button
                  onClick={() => {
                    const randomUnit = UNITS[Math.floor(Math.random() * UNITS.length)];
                    handleGenerateExam(randomUnit.id);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#ff9500] hover:bg-[#e08500] text-white text-xs font-semibold rounded-2xl shadow-sm shadow-[#ff9500]/20 transition apple-press"
                >
                  <Sparkles className="w-4 h-4 text-white" /> Bốc đề thi ngẫu nhiên (May rủi)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {UNITS.map(unit => (
                <div
                  key={unit.id}
                  onClick={() => handleGenerateExam(unit.id)}
                  className="cursor-pointer border border-black/[0.06] rounded-3xl p-6 hover:border-black/[0.14] transition-all duration-200 bg-[#f5f5f7]/60 hover:bg-white apple-hover-lift apple-press group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0071e3]/10 text-[#0071e3]">
                      {unit.badge}
                    </span>
                    <span className="text-xs text-[#86868b] font-medium group-hover:text-[#0071e3] transition flex items-center gap-1">
                      Bấm để thi <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="font-bold text-[#1d1d1f] text-base group-hover:text-[#0071e3] transition">
                    {unit.title}
                  </h3>
                  <div className="text-xs text-[#0071e3] font-semibold mt-0.5">{unit.vietnameseTitle}</div>
                  <p className="text-xs text-[#6e6e73] mt-2 line-clamp-2 leading-relaxed">{unit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Preparation Stage */}
      {examStep === 'prep' && examTicket && (
        <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.04] pb-5">
            <div>
              <span className="text-xs font-semibold text-[#0071e3] uppercase tracking-wider">
                Đề thi đã bốc: {examTicket.unit?.title}
              </span>
              <h2 className="text-2xl font-bold text-[#1d1d1f] mt-1">
                Thời Gian Chuẩn Bị Bài Nói (Preparation Time)
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#0071e3]/10 border border-[#0071e3]/20 px-4 py-2 rounded-2xl text-[#0071e3] font-mono tabular-nums font-bold text-lg">
                <Clock className="w-5 h-5 text-[#0071e3]" />
                <span>{prepSeconds}s còn lại</span>
              </div>
              {!isPrepRunning ? (
                <button
                  onClick={() => setIsPrepRunning(true)}
                  className="px-4 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs sm:text-sm rounded-2xl transition apple-press"
                >
                  Bắt đầu đếm giờ
                </button>
              ) : (
                <button
                  onClick={() => setIsPrepRunning(false)}
                  className="px-4 py-2 bg-black/[0.06] hover:bg-black/[0.1] text-[#1d1d1f] font-semibold text-xs sm:text-sm rounded-2xl transition apple-press"
                >
                  Tạm dừng
                </button>
              )}
            </div>
          </div>

          {/* Ticket Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[#f5f5f7] rounded-3xl border border-black/[0.04] space-y-2">
              <span className="text-xs font-semibold text-[#0071e3]">Phần 1: Câu hỏi nói cá nhân</span>
              <div className="font-bold text-[#1d1d1f] text-sm sm:text-base">{examTicket.part1?.question}</div>
              <div className="text-xs text-[#86868b] italic">Dịch: {examTicket.part1?.vietnameseTranslation}</div>
            </div>

            <div className="p-5 bg-[#f5f5f7] rounded-3xl border border-black/[0.04] space-y-2">
              <span className="text-xs font-semibold text-[#0284c7]">Phần 2: Tình huống nói cặp</span>
              <div className="font-bold text-[#1d1d1f] text-sm sm:text-base">{examTicket.part2?.question}</div>
              <div className="text-xs text-[#86868b] italic">Dịch: {examTicket.part2?.vietnameseTranslation}</div>
            </div>
          </div>

          {/* Quick Note Taking area */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1d1d1f]">
              Ghi chú nhanh dàn ý 3 gạch đầu dòng (Scratchpad for notes):
            </label>
            <textarea
              placeholder="1. Main idea (Luận điểm)...&#10;2. Key vocabulary (Từ vựng chuyên ngành)...&#10;3. Concrete example (Dẫn chứng thực tế)..."
              rows={4}
              className="w-full p-4 rounded-2xl border border-black/[0.06] bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] text-sm text-[#1d1d1f] transition-all leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-3">
            <button
              onClick={() => {
                setIsPrepRunning(false);
                setExamStep('part1');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold rounded-2xl text-sm transition shadow-sm shadow-[#0071e3]/20 apple-press"
            >
              Hết giờ chuẩn bị, Vào Phần 1 ngay <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Part 1 - Individual Speaking */}
      {examStep === 'part1' && examTicket && (
        <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-black/[0.04] pb-4">
            <div>
              <span className="text-xs font-semibold text-[#0071e3] uppercase tracking-wider">
                Phần 1 / 3: Nói Cá Nhân (Individual Speaking)
              </span>
              <h2 className="text-xl font-bold text-[#1d1d1f] mt-1">
                {examTicket.part1?.title}
              </h2>
            </div>
            <button
              onClick={() => handleSpeakQuestion(examTicket.part1?.question)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0071e3]/10 hover:bg-[#0071e3]/15 text-[#0071e3] text-xs font-semibold rounded-xl transition apple-press"
            >
              <Volume2 className="w-4 h-4" /> Giám khảo đọc đề
            </button>
          </div>

          <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-2">
            <div className="text-base font-bold text-[#1d1d1f]">
              {examTicket.part1?.question}
            </div>
            <div className="text-xs text-[#6e6e73] italic">
              {examTicket.part1?.vietnameseTranslation}
            </div>
          </div>

          {/* Micro Recording for Part 1 */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#1d1d1f]">
              Ghi âm câu trả lời Phần 1 của bạn:
            </div>
            <AudioRecorder
              initialText={part1Transcript}
              onTranscriptChange={setPart1Transcript}
              placeholder="Bấm micro và trả lời rõ ràng luận điểm của bạn theo mô hình PEEL..."
            />
          </div>

          {/* Navigation to Part 2 */}
          <div className="flex justify-between items-center pt-4 border-t border-black/[0.04]">
            <button
              onClick={() => setExamStep('prep')}
              className="text-xs text-[#86868b] hover:text-[#1d1d1f] transition font-medium apple-press"
            >
              ← Quay lại xem lại dàn ý
            </button>
            <button
              onClick={() => setExamStep('part2')}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold rounded-2xl text-sm transition shadow-sm shadow-[#0071e3]/20 apple-press"
            >
              Chuyển sang Phần 2: Nói cặp <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Part 2 - Pair Speaking */}
      {examStep === 'part2' && examTicket && (
        <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-black/[0.04] pb-4">
            <div>
              <span className="text-xs font-semibold text-[#0284c7] uppercase tracking-wider">
                Phần 2 / 3: Nói Cặp &amp; Giải Quyết Tình Huống (Pair Speaking)
              </span>
              <h2 className="text-xl font-bold text-[#1d1d1f] mt-1">
                {examTicket.part2?.title}
              </h2>
            </div>
            <button
              onClick={() => handleSpeakQuestion(examTicket.part2?.question)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0284c7]/10 hover:bg-[#0284c7]/15 text-[#0284c7] text-xs font-semibold rounded-xl transition apple-press"
            >
              <Volume2 className="w-4 h-4" /> Giám khảo đọc tình huống
            </button>
          </div>

          <div className="p-5 bg-cyan-50/50 rounded-2xl border border-cyan-100 space-y-2">
            <div className="text-base font-bold text-[#1d1d1f]">
              {examTicket.part2?.question}
            </div>
            <div className="text-xs text-[#6e6e73] italic">
              {examTicket.part2?.vietnameseTranslation}
            </div>
          </div>

          {/* Quick Partner Bot Prompt */}
          <div className="p-4 bg-[#f5f5f7] rounded-2xl border border-black/[0.04] flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-[#6e6e73] leading-relaxed">
              <span className="font-bold text-[#0071e3]">Gợi ý phân vai:</span> Bạn A ủng hộ phương án tối ưu hóa chi phí; Bạn B đề cao an toàn thương hiệu. Hãy thảo luận để thống nhất giải pháp chung!
            </div>
            <button
              onClick={() => {
                const partnerPrompt = `Hello, regarding this situation, from my view: ${examTicket.part2?.pairRoleplay?.partnerB?.points?.[0] || 'We must be careful about financial risk.'} What is your perspective?`;
                SpeechService.speak(partnerPrompt);
              }}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-black/[0.08] hover:bg-black/[0.02] text-[#1d1d1f] text-xs font-semibold rounded-xl transition apple-press shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-[#0071e3]" /> Nghe bạn cặp mở lời
            </button>
          </div>

          {/* Micro Recording for Part 2 */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#1d1d1f]">
              Ghi âm phần trình bày/thảo luận nói cặp của bạn:
            </div>
            <AudioRecorder
              initialText={part2Transcript}
              onTranscriptChange={setPart2Transcript}
              placeholder="Nêu luận điểm của bạn, phản biện lại ý kiến bạn cặp và chốt quyết định cuối cùng..."
            />
          </div>

          {/* Navigation to Part 3 */}
          <div className="flex justify-between items-center pt-4 border-t border-black/[0.04]">
            <button
              onClick={() => setExamStep('part1')}
              className="text-xs text-[#86868b] hover:text-[#1d1d1f] transition font-medium apple-press"
            >
              ← Quay lại Phần 1
            </button>
            <button
              onClick={() => setExamStep('part3')}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold rounded-2xl text-sm transition shadow-sm shadow-[#0071e3]/20 apple-press"
            >
              Chuyển sang Phần 3: Giáo viên hỏi sâu <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Part 3 - Teacher's Deep-Dive Q&A */}
      {examStep === 'part3' && examTicket && (
        <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-black/[0.04] pb-4">
            <div>
              <span className="text-xs font-semibold text-[#248a3d] uppercase tracking-wider">
                Phần 3 / 3: Giáo Viên Hỏi Sâu (Teacher's Follow-up Q&A)
              </span>
              <h2 className="text-xl font-bold text-[#1d1d1f] mt-1">
                Câu Hỏi Đào Sâu Của Giám Khảo Vấn Đáp
              </h2>
            </div>
            <button
              onClick={() => handleSpeakQuestion(examTicket.part3Question)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#34c759]/10 hover:bg-[#34c759]/15 text-[#248a3d] text-xs font-semibold rounded-xl transition apple-press"
            >
              <Volume2 className="w-4 h-4" /> Giáo viên đặt câu hỏi
            </button>
          </div>

          <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-2">
            <div className="text-xs font-bold text-[#248a3d] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Examiner's In-Depth Question:
            </div>
            <div className="text-base font-bold text-[#1d1d1f]">
              "{examTicket.part3Question}"
            </div>
          </div>

          {/* Micro Recording for Part 3 */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#1d1d1f]">
              Ghi âm câu trả lời phản xạ của bạn:
            </div>
            <AudioRecorder
              initialText={part3Transcript}
              onTranscriptChange={setPart3Transcript}
              placeholder="Sử dụng từ vựng chuyên ngành để trả lời trực diện câu hỏi đào sâu của giáo viên..."
            />
          </div>

          {/* AI Settings info bar */}
          <div className="p-3.5 bg-[#f5f5f7] rounded-2xl border border-black/[0.04] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#1d1d1f]">
              <Bot className="w-4 h-4 text-[#0071e3] shrink-0" />
              <span>
                Chế độ chấm điểm: <strong className="font-bold">{getStoredApiKey() ? 'AI Giám khảo Gemini (Cloud)' : 'Bộ Chấm AI Cục Bộ FinSpeak (Zero-latency)'}</strong>
              </span>
            </div>
            <button
              onClick={() => setShowApiKeyModal(true)}
              className="text-[#0071e3] hover:text-[#0077ed] font-semibold underline underline-offset-2 flex items-center gap-1 apple-press"
            >
              <Settings className="w-3.5 h-3.5" /> Tùy chỉnh AI / Nhập Gemini Key
            </button>
          </div>

          {/* Finish & View Scorecard */}
          <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-black/[0.04]">
            <button
              onClick={() => setExamStep('part2')}
              className="text-xs text-[#86868b] hover:text-[#1d1d1f] transition font-medium apple-press"
            >
              ← Quay lại Phần 2
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleFinishExam(false)}
                disabled={isEvaluating}
                className="flex items-center gap-2 px-8 py-3.5 bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold rounded-2xl text-sm transition-all duration-200 shadow-sm shadow-[#0071e3]/20 apple-press disabled:opacity-60 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>{isEvaluating ? 'AI đang phân tích và chấm bài...' : 'Nộp bài & Chấm điểm toàn diện bằng AI'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Evaluating Loading Overlay */}
      {isEvaluating && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-[0_24px_60px_-15px_rgba(0,0,0,0.3)] border border-black/[0.08] text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 bg-[#0071e3]/20 rounded-full animate-ping" />
              <div className="relative w-20 h-20 bg-gradient-to-tr from-[#0071e3] to-[#5e5ce6] rounded-full flex items-center justify-center text-white shadow-lg">
                <BrainCircuit className="w-10 h-10 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#1d1d1f]">
                AI Giám Khảo Đang Chấm Bài
              </h3>
              <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed font-medium">
                {aiProgressMessage || 'Đang phân tích 3 phần thi theo 5 tiêu chí Rubric chuẩn...'}
              </p>
            </div>

            <div className="space-y-2 text-left bg-[#f5f5f7] p-4 rounded-2xl border border-black/[0.04] text-xs">
              <div className="flex items-center gap-2 text-[#1d1d1f]">
                <CheckCircle2 className="w-4 h-4 text-[#248a3d] shrink-0" />
                <span>Trích xuất độ mạch lạc PEEL &amp; liên từ</span>
              </div>
              <div className="flex items-center gap-2 text-[#1d1d1f]">
                <CheckCircle2 className="w-4 h-4 text-[#248a3d] shrink-0" />
                <span>Đối chiếu từ vựng C1 tài chính &amp; kế toán</span>
              </div>
              <div className="flex items-center gap-2 text-[#1d1d1f]">
                <CheckCircle2 className="w-4 h-4 text-[#248a3d] shrink-0" />
                <span>Đề xuất câu nói thay thế chuẩn Cambridge</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 6: Comprehensive Final Scorecard */}
      {examStep === 'result' && finalReport && (
        <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-10 shadow-xs space-y-8 animate-in fade-in">
          {/* Header Banner */}
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-black/[0.04] pb-6">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#0071e3] uppercase tracking-wider">
                  Phiếu Điểm &amp; Nhận Xét Của Giám Khảo
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#34c759]/10 text-[#248a3d] border border-[#34c759]/20 flex items-center gap-1">
                  <Bot className="w-3 h-3" /> {finalReport.providerName || 'AI Examiner'}
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">
                Kết Quả Kỳ Thi Vấn Đáp Chính Thức
              </h2>
              <p className="text-[#86868b] text-xs sm:text-sm">
                Chủ đề: <span className="font-semibold text-[#1d1d1f]">{examTicket?.unit?.title}</span> • Phát ngôn: <span className="font-semibold text-[#1d1d1f]">{finalReport.wordCount ?? 0} từ</span> • Trình độ ước lượng: <span className="font-bold text-[#0071e3]">{finalReport.cefrLevel || 'B2'}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 bg-[#f5f5f7] p-5 rounded-3xl border border-black/[0.04]">
              <div className="text-right">
                <div className="text-xs text-[#86868b] font-semibold uppercase">Điểm Tổng Kết</div>
                <div className="text-4xl sm:text-5xl font-black text-[#0071e3]">
                  {finalReport.totalScore ?? 0}
                  <span className="text-lg font-normal text-[#86868b]"> / 10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Examiner's General Verdict */}
          <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.05] p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[#1d1d1f] font-bold text-sm">
                <Bot className="w-5 h-5 text-[#0071e3]" />
                <span>Nhận Xét Tổng Quan Của Giám Khảo (Examiner's General Verdict):</span>
              </div>
              <button
                onClick={handleToggleSpeakFeedback}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-black/[0.08] hover:bg-black/[0.02] text-[#0071e3] text-xs font-semibold rounded-xl transition apple-press shadow-xs"
              >
                <Volume2 className="w-4 h-4 text-[#0071e3]" />
                <span>{isSpeakingFeedback ? 'Dừng đọc' : 'Nghe giám khảo đọc nhận xét'}</span>
              </button>
            </div>
            <p className="text-sm text-[#1d1d1f] leading-relaxed italic bg-white p-4 rounded-2xl border border-black/[0.04]">
              "{finalReport.examinerSummary || 'Thí sinh đã hoàn thành kỳ thi vấn đáp 3 phần theo đúng yêu cầu đề tài.'}"
            </p>
          </div>

          {/* Tabs Navigation (Apple Segmented Bar Style) */}
          <div className="inline-flex flex-wrap bg-black/[0.04] p-1 rounded-2xl border border-black/[0.04] gap-1">
            <button
              onClick={() => setResultTab('rubric')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 apple-press ${
                resultTab === 'rubric'
                  ? 'bg-white text-[#1d1d1f] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <Award className="w-4 h-4 text-[#0071e3]" /> 5 Tiêu Chí Rubric
            </button>
            <button
              onClick={() => setResultTab('parts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 apple-press ${
                resultTab === 'parts'
                  ? 'bg-white text-[#1d1d1f] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#0071e3]" /> Đánh Giá 3 Phần Thi
            </button>
            <button
              onClick={() => setResultTab('upgrades')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 apple-press ${
                resultTab === 'upgrades'
                  ? 'bg-white text-[#1d1d1f] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <Lightbulb className="w-4 h-4 text-amber-500" /> Nâng Cấp Câu Nói C1
            </button>
            <button
              onClick={() => setResultTab('vocab')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 apple-press ${
                resultTab === 'vocab'
                  ? 'bg-white text-[#1d1d1f] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#0071e3]" /> Từ Vựng &amp; Lời Khuyên
            </button>
          </div>

          {/* TAB 1: 5 Criteria Matrix */}
          {resultTab === 'rubric' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-bold text-[#1d1d1f] text-base">
                Bảng Đánh Giá Chi Tiết Theo 5 Tiêu Chí Chấm Của Giáo Viên
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                {TEACHER_RUBRIC.map(item => {
                  const score = finalReport.criteriaScores?.[item.id] ?? 7.0;
                  const feedback = finalReport.criteriaFeedback?.[item.id] || '';
                  
                  return (
                    <div key={item.id} className="p-4 bg-[#f5f5f7] border border-black/[0.04] rounded-2xl flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#0071e3] mb-1">
                          <span>{item.weight}% Trọng số</span>
                        </div>
                        <div className="font-bold text-[#1d1d1f] text-xs leading-tight">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-[#86868b] mt-0.5">
                          {item.vietnameseTitle}
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-black/[0.06] h-1.5 rounded-full mt-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              score >= 8.5 ? 'bg-[#34c759]' : score >= 7.0 ? 'bg-[#0071e3]' : 'bg-[#ff9500]'
                            }`}
                            style={{ width: `${Math.min(100, (score / 10) * 100)}%` }}
                          />
                        </div>
                      </div>

                      {feedback && (
                        <div className="text-[11px] text-[#6e6e73] bg-white p-2.5 rounded-xl border border-black/[0.04] leading-relaxed">
                          {feedback}
                        </div>
                      )}

                      <div className="pt-2 border-t border-black/[0.04] flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#86868b]">Điểm:</span>
                        <span className="text-base font-bold text-[#0071e3]">{score} / 10</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Part-by-Part Evaluation */}
          {resultTab === 'parts' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-bold text-[#1d1d1f] text-base">
                Đánh Giá Chi Tiết Theo Từng Phần Thi (Parts 1, 2, 3)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Part 1 */}
                <div className="p-5 bg-[#f5f5f7] border border-black/[0.04] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0071e3] uppercase">Phần 1: Nói cá nhân</span>
                    <span className="text-xs text-[#86868b] font-mono tabular-nums">
                      {(part1Transcript || '').split(/\s+/).filter(Boolean).length} từ
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#1d1d1f] line-clamp-2">
                    {examTicket?.part1?.question}
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-black/[0.04] text-xs text-[#6e6e73] leading-relaxed">
                    <div className="font-bold text-[#1d1d1f] mb-1 flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-[#0071e3]" /> Nhận xét của AI:
                    </div>
                    {finalReport.partFeedback?.part1 || 'Đã hoàn thành phần trả lời cá nhân.'}
                  </div>
                </div>

                {/* Part 2 */}
                <div className="p-5 bg-[#f5f5f7] border border-black/[0.04] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0284c7] uppercase">Phần 2: Thảo luận cặp</span>
                    <span className="text-xs text-[#86868b] font-mono tabular-nums">
                      {(part2Transcript || '').split(/\s+/).filter(Boolean).length} từ
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#1d1d1f] line-clamp-2">
                    {examTicket?.part2?.question}
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-black/[0.04] text-xs text-[#6e6e73] leading-relaxed">
                    <div className="font-bold text-[#1d1d1f] mb-1 flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-[#0284c7]" /> Nhận xét của AI:
                    </div>
                    {finalReport.partFeedback?.part2 || 'Đã hoàn thành phần thảo luận tình huống theo cặp.'}
                  </div>
                </div>

                {/* Part 3 */}
                <div className="p-5 bg-[#f5f5f7] border border-black/[0.04] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#248a3d] uppercase">Phần 3: Giáo viên hỏi sâu</span>
                    <span className="text-xs text-[#86868b] font-mono tabular-nums">
                      {(part3Transcript || '').split(/\s+/).filter(Boolean).length} từ
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#1d1d1f] line-clamp-2">
                    {examTicket?.part3Question}
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-black/[0.04] text-xs text-[#6e6e73] leading-relaxed">
                    <div className="font-bold text-[#1d1d1f] mb-1 flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-[#248a3d]" /> Nhận xét của AI:
                    </div>
                    {finalReport.partFeedback?.part3 || 'Đã hoàn thành phần phản xạ trả lời câu hỏi sâu của giáo viên.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Sentence Upgrades */}
          {resultTab === 'upgrades' && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h3 className="font-bold text-[#1d1d1f] text-base">
                  Gợi Ý Nâng Cấp Câu Nói Lên Chuẩn C1 Tiếng Anh Tài Chính
                </h3>
                <p className="text-xs text-[#86868b] mt-0.5">
                  Thay thế các mẫu câu giao tiếp thông thường bằng các cấu trúc học thuật chuyên ngành để gây ấn tượng với giám khảo
                </p>
              </div>

              <div className="space-y-3">
                {(finalReport.sentenceUpgrades || []).map((item, idx) => (
                  <div key={idx} className="p-5 bg-[#f5f5f7] border border-black/[0.04] rounded-2xl space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3.5 bg-white border border-[#ff3b30]/20 rounded-xl">
                        <div className="text-[11px] font-bold text-[#ff3b30] uppercase mb-1">
                          Cách diễn đạt đơn giản / thường gặp:
                        </div>
                        <div className="text-xs text-[#1d1d1f] italic">"{item.original}"</div>
                      </div>

                      <div className="p-3.5 bg-white border border-[#34c759]/30 rounded-xl">
                        <div className="text-[11px] font-bold text-[#248a3d] uppercase mb-1 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#34c759]" /> Nâng cấp C1 Business English:
                        </div>
                        <div className="text-xs font-bold text-[#1d1d1f]">"{item.improved}"</div>
                      </div>
                    </div>
                    {item.reason && (
                      <div className="text-xs text-[#6e6e73] bg-white p-3 rounded-xl border border-black/[0.04]">
                        <strong className="text-[#0071e3]">Lý do:</strong> {item.reason}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Vocabulary & Action Plan */}
          {resultTab === 'vocab' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#34c759]/10 border border-[#34c759]/20 rounded-2xl p-5 space-y-3">
                  <div className="font-bold text-[#248a3d] flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#248a3d]" />
                    Các Điểm Mạnh Đạt Chuẩn Cao:
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#248a3d]">
                    {(finalReport.strengths || []).map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 space-y-3">
                  <div className="font-bold text-amber-900 flex items-center gap-2 text-sm">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    Lời Khuyên Cải Thiện Để Đạt Điểm Tuyệt Đối:
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-amber-900">
                    {(finalReport.improvements || []).map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Unit Vocabulary Identified in Speech */}
              <div className="bg-[#f5f5f7] border border-black/[0.04] rounded-2xl p-5 sm:p-6 space-y-4">
                <div>
                  <div className="text-xs font-bold text-[#1d1d1f] mb-2">
                    Thuật ngữ chuyên ngành tài chính kế toán phát hiện trong bài nói của bạn:
                  </div>
                  {(finalReport.matchedVocab || []).length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {finalReport.matchedVocab.map((v, i) => (
                        <span key={i} className="px-3 py-1 bg-[#0071e3]/10 text-[#0071e3] rounded-xl text-xs font-semibold border border-[#0071e3]/20">
                          ✓ {v}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-[#86868b] italic">
                      Chưa phát hiện được nhiều thuật ngữ chuyên môn. Hãy tham khảo mục "Sổ tay từ vựng" để bổ sung vào câu trả lời!
                    </div>
                  )}
                </div>

                {/* Recommended terms */}
                {(finalReport.recommendedVocab || []).length > 0 && (
                  <div className="pt-3 border-t border-black/[0.04]">
                    <div className="text-xs font-bold text-[#1d1d1f] mb-2">
                      Thuật ngữ C1 khuyến nghị đưa vào bài thi chủ đề {examTicket?.unit?.title}:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {finalReport.recommendedVocab.map((v, i) => (
                        <span key={i} className="px-3 py-1 bg-amber-500/10 text-amber-900 rounded-xl text-xs font-semibold border border-amber-500/20">
                          ★ {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/[0.04]">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyFeedback}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] font-semibold rounded-2xl text-xs transition apple-press"
              >
                {isCopied ? <Check className="w-4 h-4 text-[#248a3d]" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'Đã sao chép vào bộ nhớ tạm!' : 'Sao chép kết quả thi'}</span>
              </button>
              <button
                onClick={() => handleFinishExam(false)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] font-semibold rounded-2xl text-xs transition apple-press"
                title="Yêu cầu AI phân tích lại bài thi"
              >
                <RefreshCw className="w-4 h-4 text-[#86868b]" />
                <span>Chấm lại với AI</span>
              </button>
            </div>

            <button
              onClick={() => {
                setExamStep('welcome');
                setFinalReport(null);
              }}
              className="flex items-center gap-2 px-8 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold rounded-2xl text-sm transition shadow-sm shadow-[#0071e3]/20 apple-press cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Bốc đề khác &amp; Thi lại lần mới
            </button>
          </div>
        </div>
      )}

      {/* Modal Cài Đặt AI Giám Khảo (Gemini API Key) */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_24px_60px_-15px_rgba(0,0,0,0.3)] border border-black/[0.08] space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-black/[0.04] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#1d1d1f] text-base">Cấu Hình AI Giám Khảo</h3>
              </div>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="text-[#86868b] hover:text-[#1d1d1f] p-1 rounded-full hover:bg-black/[0.04] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#6e6e73] leading-relaxed">
              <p>
                FinSpeak Pro hỗ trợ 2 chế độ chấm thi AI:
              </p>
              
              <div className="p-4 bg-[#34c759]/10 rounded-2xl border border-[#34c759]/20 space-y-1">
                <div className="font-bold text-[#248a3d] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#248a3d]" /> 1. Bộ Chấm AI Cục Bộ FinSpeak (Mặc định - Khuyên dùng)
                </div>
                <div className="text-[#248a3d]">
                  Hoàn toàn miễn phí, không cần internet, phản hồi tức thì (zero-latency), phân tích sâu 5 tiêu chí Rubric và nâng cấp câu C1.
                </div>
              </div>

              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
                <div className="font-bold text-[#0071e3] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#0071e3]" /> 2. Google Gemini API (Tùy chọn)
                </div>
                <div className="text-[#6e6e73]">
                  Nếu muốn AI nhận xét tự do như người bản ngữ, bạn có thể nhập Gemini API Key miễn phí từ Google AI Studio:
                </div>
                <div className="pt-1">
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    className="w-full p-3 bg-white rounded-xl border border-black/[0.08] text-[#1d1d1f] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0071e3] hover:underline flex items-center gap-1 font-semibold"
                  >
                    Lấy API Key miễn phí tại Google AI Studio <ExternalLink className="w-3 h-3" />
                  </a>
                  {apiKeyInput && (
                    <button
                      type="button"
                      onClick={handleClearApiKey}
                      className="text-[#ff3b30] hover:underline font-semibold"
                    >
                      Xóa key đã lưu
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="px-4 py-2 bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] font-semibold rounded-2xl text-xs transition apple-press"
              >
                Đóng
              </button>
              <button
                onClick={handleSaveApiKey}
                className="px-5 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold rounded-2xl text-xs transition apple-press shadow-sm shadow-[#0071e3]/20"
              >
                Lưu cấu hình
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { SPEAKING_DATA, PAIR_SPEAKING_PHRASES, UNITS } from '../data/speakingData';
import { Users, Bot, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import AudioRecorder from './AudioRecorder';
import { SpeechService } from '../services/speechService';
import { evaluateTranscript } from '../data/rubricCriteria';

export default function PairDiscussionRoom() {
  const pairSituations = SPEAKING_DATA.filter(item => item.part === 'part2' || item.type === 'pair_situation');
  const [selectedSituationId, setSelectedSituationId] = useState(pairSituations[0]?.id || '');
  const [userRole, setUserRole] = useState('partnerA'); // 'partnerA' or 'partnerB'
  const [conversationHistory, setConversationHistory] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [currentUserTranscript, setCurrentUserTranscript] = useState('');

  const currentItem = pairSituations.find(s => s.id === selectedSituationId) || pairSituations[0];
  const unitInfo = UNITS.find(u => u.id === currentItem.unitId);

  const partnerRole = userRole === 'partnerA' ? 'partnerB' : 'partnerA';
  const myRoleInfo = currentItem.pairRoleplay?.[userRole];
  const aiRoleInfo = currentItem.pairRoleplay?.[partnerRole];

  const handleSelectSituation = (id) => {
    setSelectedSituationId(id);
    setConversationHistory([]);
    setCurrentTurn(1);
    setEvaluationResult(null);
    SpeechService.stopSpeaking();
  };

  // Bot AI phản hồi lượt của bạn cặp
  const handleBotResponse = () => {
    let botScript = '';
    if (userRole === 'partnerA') {
      // User là Partner A -> Bot là Partner B
      if (currentTurn === 1) {
        botScript = `I hear what you are saying, but let's look at the other perspective. ${aiRoleInfo.points[0]} Furthermore, ${aiRoleInfo.points[1]} What do you say to that?`;
      } else {
        botScript = `You make a fair point. To move forward and reach an agreement, how about this compromise: ${currentItem.pairRoleplay.consensusConclusion}`;
      }
    } else {
      // User là Partner B -> Bot là Partner A
      if (currentTurn === 1) {
        botScript = `Hello! To start our discussion, from my viewpoint: ${aiRoleInfo.points[0]} In addition, ${aiRoleInfo.points[1]} What is your stance on this?`;
      } else {
        botScript = `I see the merit in your financial reasoning. Should we agree on the final consensus: ${currentItem.pairRoleplay.consensusConclusion}`;
      }
    }

    setIsBotSpeaking(true);
    setConversationHistory(prev => [
      ...prev,
      { speaker: 'AI Partner (' + aiRoleInfo.role + ')', text: botScript, isBot: true }
    ]);

    SpeechService.speak(botScript, {
      onEnd: () => setIsBotSpeaking(false),
      onError: () => setIsBotSpeaking(false)
    });

    setCurrentTurn(prev => prev + 1);
  };

  const handleUserSpoke = (transcript) => {
    if (!transcript.trim()) return;
    setConversationHistory(prev => [
      ...prev,
      { speaker: 'You (' + myRoleInfo.role + ')', text: transcript, isBot: false }
    ]);
  };

  const handleEvaluateDiscussion = () => {
    const combinedUserText = conversationHistory
      .filter(m => !m.isBot)
      .map(m => m.text)
      .join(' ');

    const result = evaluateTranscript(combinedUserText, currentItem.unitId, currentItem);
    setEvaluationResult(result);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#161617] via-[#1d1d1f] to-[#2c2c2e] rounded-3xl p-6 sm:p-8 text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden border border-white/10">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white mb-3 backdrop-blur-md border border-white/15">
            <Users className="w-3.5 h-3.5 text-[#42a5f5]" /> Part 2: Nói Cặp &amp; Giải Quyết Vấn Đề
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Phòng Thảo Luận Nói Cặp (Pair Speaking Studio)
          </h1>
          <p className="mt-2 text-white/70 text-sm sm:text-base leading-relaxed">
            Trong bài thi thật, các tình huống giải quyết vấn đề (Problem solving &amp; decision making) được thực hiện theo cặp. Hãy chọn vai, thảo luận đưa ra lập luận và thống nhất quyết định chung với Bạn cặp AI!
          </p>
        </div>
      </div>

      {/* Situation Selector Carousel / Dropdown */}
      <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <label className="text-sm font-bold text-[#1d1d1f]">
            Chọn tình huống giải quyết theo cặp ({pairSituations.length} tình huống có trong 5 Unit):
          </label>
          <span className="text-xs text-[#0071e3] font-semibold bg-[#0071e3]/10 px-3 py-1 rounded-full border border-[#0071e3]/15">
            {unitInfo?.title}
          </span>
        </div>

        <select
          value={selectedSituationId}
          onChange={(e) => handleSelectSituation(e.target.value)}
          className="w-full p-4 bg-[#f5f5f7] border border-black/[0.06] rounded-2xl text-sm font-medium text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all"
        >
          {pairSituations.map(s => {
            const u = UNITS.find(item => item.id === s.unitId);
            return (
              <option key={s.id} value={s.id}>
                [{u?.title}] {s.title}
              </option>
            );
          })}
        </select>

        {/* Current Situation Overview */}
        <div className="mt-5 p-5 bg-[#f5f5f7] rounded-2xl border border-black/[0.04] space-y-2">
          <div className="text-base font-bold text-[#1d1d1f] leading-snug">
            {currentItem.question}
          </div>
          <div className="text-xs text-[#86868b] italic">
            Dịch nghĩa: {currentItem.vietnameseTranslation}
          </div>
        </div>
      </div>

      {/* Role Cards & Consensus Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Partner A Card */}
        <div 
          onClick={() => setUserRole('partnerA')}
          className={`cursor-pointer rounded-3xl p-6 border transition-all duration-200 apple-press ${
            userRole === 'partnerA' 
              ? 'border-[#0071e3] bg-white shadow-[0_8px_30px_-6px_rgba(0,113,227,0.18)] ring-2 ring-[#0071e3]/20' 
              : 'border-black/[0.06] bg-white hover:border-black/[0.12] shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0071e3]/10 text-[#0071e3]">
              Student A (Bạn A) {userRole === 'partnerA' && '★ Vai của bạn'}
            </span>
            <span className="text-xs font-medium text-[#86868b]">
              {userRole === 'partnerA' ? 'Đang chọn' : 'Nhấp để chọn vai này'}
            </span>
          </div>
          <h4 className="font-bold text-[#1d1d1f] text-base mb-1">{currentItem.pairRoleplay?.partnerA?.role}</h4>
          <p className="text-xs text-[#6e6e73] mb-3 leading-relaxed">{currentItem.pairRoleplay?.partnerA?.stance}</p>
          <div className="space-y-1.5 text-xs text-[#1d1d1f] bg-[#f5f5f7] p-3.5 rounded-2xl border border-black/[0.04]">
            <div className="font-semibold text-[#0071e3]">Luận điểm then chốt:</div>
            <ul className="list-disc list-inside space-y-1 text-[#6e6e73]">
              {currentItem.pairRoleplay?.partnerA?.points.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partner B Card */}
        <div 
          onClick={() => setUserRole('partnerB')}
          className={`cursor-pointer rounded-3xl p-6 border transition-all duration-200 apple-press ${
            userRole === 'partnerB' 
              ? 'border-[#0284c7] bg-white shadow-[0_8px_30px_-6px_rgba(2,132,199,0.18)] ring-2 ring-[#0284c7]/20' 
              : 'border-black/[0.06] bg-white hover:border-black/[0.12] shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0284c7]/10 text-[#0284c7]">
              Student B (Bạn B) {userRole === 'partnerB' && '★ Vai của bạn'}
            </span>
            <span className="text-xs font-medium text-[#86868b]">
              {userRole === 'partnerB' ? 'Đang chọn' : 'Nhấp để chọn vai này'}
            </span>
          </div>
          <h4 className="font-bold text-[#1d1d1f] text-base mb-1">{currentItem.pairRoleplay?.partnerB?.role}</h4>
          <p className="text-xs text-[#6e6e73] mb-3 leading-relaxed">{currentItem.pairRoleplay?.partnerB?.stance}</p>
          <div className="space-y-1.5 text-xs text-[#1d1d1f] bg-[#f5f5f7] p-3.5 rounded-2xl border border-black/[0.04]">
            <div className="font-semibold text-[#0284c7]">Luận điểm then chốt:</div>
            <ul className="list-disc list-inside space-y-1 text-[#6e6e73]">
              {currentItem.pairRoleplay?.partnerB?.points.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Target Consensus Box (Quyết định chung cần đạt được) */}
      <div className="bg-[#34c759]/10 border border-[#34c759]/20 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center gap-2 text-[#248a3d] font-bold text-sm mb-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#248a3d]" />
          Mục tiêu cuối bài nói cặp: Thống nhất quyết định (Agreed Consensus)
        </div>
        <p className="text-xs sm:text-sm text-[#248a3d]/90 leading-relaxed font-medium">
          {currentItem.pairRoleplay?.consensusConclusion}
        </p>
      </div>

      {/* Interactive Turn-Taking Conversation Board (Apple iMessage Style) */}
      <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.04] pb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#0071e3]" />
            <h3 className="font-bold text-[#1d1d1f] text-base">
              Hội Thoại Thảo Luận Đối Đáp Theo Lượt (Turn-Taking)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBotResponse}
              disabled={isBotSpeaking}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold rounded-2xl shadow-sm shadow-[#0071e3]/20 transition-all duration-200 apple-press disabled:opacity-50"
            >
              <Bot className="w-4 h-4" />
              {isBotSpeaking ? 'Bot đang nói...' : 'Lượt của Bạn cặp AI (Partner Bot)'}
            </button>
          </div>
        </div>

        {/* Chat Stream (iMessage UI) */}
        <div className="space-y-4 max-h-[380px] overflow-y-auto p-5 bg-[#f5f5f7]/70 rounded-2xl border border-black/[0.04]">
          {conversationHistory.length === 0 ? (
            <div className="text-center py-10 text-[#86868b] text-xs sm:text-sm italic">
              Chưa có lượt nói nào. Hãy bấm Micro bên dưới để nêu quan điểm mở đầu của bạn, hoặc bấm "Lượt của Bạn cặp AI" để bạn cặp phát biểu trước!
            </div>
          ) : (
            conversationHistory.map((item, idx) => (
              <div 
                key={idx}
                className={`flex flex-col ${item.isBot ? 'items-start' : 'items-end'}`}
              >
                <div className="text-[11px] font-semibold text-[#86868b] mb-1 px-2">
                  {item.speaker}
                </div>
                <div 
                  className={`p-4 rounded-3xl max-w-[85%] text-xs sm:text-sm leading-relaxed shadow-xs ${
                    item.isBot 
                      ? 'bg-white text-[#1d1d1f] border border-black/[0.06] rounded-bl-sm' 
                      : 'bg-[#0071e3] text-white rounded-br-sm'
                  }`}
                >
                  {item.text}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Your Turn Speaking Recorder */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#1d1d1f] flex items-center justify-between">
            <span>Lượt của bạn ({myRoleInfo?.role}):</span>
            <span className="text-[#86868b] font-normal">Dùng Mic hoặc gõ tay bên dưới</span>
          </div>

          <AudioRecorder
            placeholder="Nêu luận điểm, phản bác lại ý kiến bạn cặp hoặc đề xuất phương án đồng thuận..."
            onTranscriptChange={(val) => setCurrentUserTranscript(val)}
            onEvaluate={() => {}}
          />

          {/* Quick Type Box */}
          <div className="relative">
            <textarea
              value={currentUserTranscript}
              onChange={(e) => setCurrentUserTranscript(e.target.value)}
              placeholder="Hoặc gõ tay câu trả lời tiếng Anh của bạn ở đây..."
              rows={2}
              className="w-full p-4 pr-32 rounded-2xl border border-black/[0.06] bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] text-sm text-[#1d1d1f] resize-none transition-all"
            />
            <button
              onClick={() => {
                if (currentUserTranscript.trim()) {
                  handleUserSpoke(currentUserTranscript);
                  setCurrentUserTranscript('');
                }
              }}
              disabled={!currentUserTranscript.trim()}
              className="absolute right-3 bottom-3 px-4 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-all duration-200 apple-press"
            >
              Gửi lượt nói
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
            <span className="text-xs text-[#86868b] mr-auto">Sau khi gửi, nhấn nút Bot để bạn cặp AI phản hồi lại.</span>

            {conversationHistory.length >= 2 && (
              <button
                onClick={handleEvaluateDiscussion}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#34c759] hover:bg-[#2fb34f] text-white text-xs font-semibold rounded-2xl shadow-sm shadow-[#34c759]/20 transition-all duration-200 apple-press"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                Chấm điểm bài nói cặp của bạn
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Useful Negotiation Phrases Cheat Sheet */}
      <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs">
        <h3 className="font-bold text-[#1d1d1f] text-base mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Mẫu Câu Đàm Phán &amp; Ra Quyết Định Ăn Điểm Cao Trong Bài Nói Cặp
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
            <div className="font-bold text-[#0071e3] mb-2">Đề xuất quan điểm (Proposing)</div>
            <ul className="space-y-1.5 text-[#1d1d1f] leading-relaxed">
              {PAIR_SPEAKING_PHRASES.proposing.map((p, i) => (
                <li key={i}>"{p}"</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-[#34c759]/10 border border-[#34c759]/20 rounded-2xl">
            <div className="font-bold text-[#248a3d] mb-2">Đồng thuận tài chính (Agreeing)</div>
            <ul className="space-y-1.5 text-[#248a3d] leading-relaxed">
              {PAIR_SPEAKING_PHRASES.agreeing.map((p, i) => (
                <li key={i}>"{p}"</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
            <div className="font-bold text-amber-900 mb-2">Phản biện lịch sự (Disagreeing)</div>
            <ul className="space-y-1.5 text-amber-900 leading-relaxed">
              {PAIR_SPEAKING_PHRASES.politelyDisagreeing.map((p, i) => (
                <li key={i}>"{p}"</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-purple-50/60 border border-purple-100 rounded-2xl">
            <div className="font-bold text-purple-900 mb-2">Chốt quyết định (Consensus)</div>
            <ul className="space-y-1.5 text-purple-900 leading-relaxed">
              {PAIR_SPEAKING_PHRASES.reachingConsensus.map((p, i) => (
                <li key={i}>"{p}"</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Rubric Evaluation Output */}
      {evaluationResult && (
        <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-sm space-y-5 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.04] pb-4">
            <div>
              <span className="text-xs font-semibold text-[#0071e3] uppercase tracking-wider">
                Kết quả bài nói cặp (Part 2 Assessment)
              </span>
              <h4 className="text-2xl font-bold text-[#1d1d1f]">
                Phiếu Điểm Tương Tác Cặp Đôi
              </h4>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#86868b] font-medium">Điểm đánh giá</div>
              <div className="text-4xl font-black text-[#0071e3]">
                {evaluationResult.totalScore} <span className="text-base font-normal text-[#86868b]">/ 10</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(evaluationResult.criteriaScores).map(([key, score]) => (
              <div key={key} className="p-3 bg-[#f5f5f7] rounded-2xl text-center border border-black/[0.04]">
                <div className="text-[11px] text-[#86868b] capitalize font-medium">{key.replace('c_', '').replace(/_/g, ' ')}</div>
                <div className="text-base font-bold text-[#1d1d1f] mt-1">{score} / 10</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-[#34c759]/10 border border-[#34c759]/20 rounded-2xl p-4 sm:p-5">
              <div className="font-bold text-[#248a3d] flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#248a3d]" /> Điểm mạnh tương tác cặp:
              </div>
              <ul className="list-disc list-inside space-y-1 text-[#248a3d]">
                {evaluationResult.strengths.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 sm:p-5">
              <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-amber-600" /> Bí quyết cải thiện điểm số:
              </div>
              <ul className="list-disc list-inside space-y-1 text-amber-900">
                {evaluationResult.improvements.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

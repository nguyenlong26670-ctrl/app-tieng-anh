import React, { useState } from 'react';
import { VOCABULARY_LIST } from '../data/vocabularyData';
import { UNITS } from '../data/speakingData';
import { BookOpen, Volume2, Search, RotateCw, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { SpeechService } from '../services/speechService';

export default function VocabularyBank() {
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'flashcard'
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [memorizedIds, setMemorizedIds] = useState(new Set());

  const filteredVocab = VOCABULARY_LIST.filter(item => {
    const matchUnit = selectedUnit === 'all' || item.unitId === selectedUnit;
    const matchQuery = 
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vietnameseDefinition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchUnit && matchQuery;
  });

  const handleSpeak = (text) => {
    SpeechService.speak(text, { rate: 0.9 });
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex(prev => (prev + 1) % filteredVocab.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex(prev => (prev - 1 + filteredVocab.length) % filteredVocab.length);
  };

  const toggleMemorized = (id) => {
    setMemorizedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const currentCard = filteredVocab[cardIndex] || filteredVocab[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#161617] via-[#1d1d1f] to-[#2c2c2e] rounded-3xl p-6 sm:p-8 text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden border border-white/10">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white mb-3 backdrop-blur-md border border-white/15">
            <BookOpen className="w-3.5 h-3.5 text-[#34c759]" /> Tiêu chí 3: Used unit vocabulary appropriately
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Sổ Tay Từ Vựng &amp; Thuật Ngữ Tài Chính - Kế Toán
          </h1>
          <p className="mt-2 text-white/70 text-sm sm:text-base leading-relaxed">
            Nắm vững các thuật ngữ cốt lõi của 5 Unit (Price, Service, Insurance, Productivity, Motivation) để ghi điểm 9-10 ở tiêu chí từ vựng của giáo viên!
          </p>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Unit Filter (Apple Segmented Bar Style) */}
          <div className="inline-flex flex-wrap items-center bg-black/[0.04] p-1 rounded-2xl border border-black/[0.04] gap-1">
            <button
              onClick={() => { setSelectedUnit('all'); setCardIndex(0); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 apple-press ${
                selectedUnit === 'all'
                  ? 'bg-white text-[#1d1d1f] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              Tất cả ({VOCABULARY_LIST.length})
            </button>
            {UNITS.map(u => (
              <button
                key={u.id}
                onClick={() => { setSelectedUnit(u.id); setCardIndex(0); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 apple-press ${
                  selectedUnit === u.id
                    ? 'bg-white text-[#0071e3] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {u.title.split(':')[1]}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="inline-flex items-center bg-black/[0.04] p-1 rounded-2xl border border-black/[0.04]">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 apple-press ${
                viewMode === 'list' 
                  ? 'bg-white text-[#1d1d1f] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]' 
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              Danh sách chi tiết
            </button>
            <button
              onClick={() => setViewMode('flashcard')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 apple-press ${
                viewMode === 'flashcard' 
                  ? 'bg-white text-[#1d1d1f] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]' 
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              Lật thẻ Flashcard
            </button>
          </div>
        </div>

        {/* Search input (Apple Search Bar) */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#86868b] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm thuật ngữ, phiên âm, định nghĩa tiếng Việt..."
            className="w-full pl-11 pr-4 py-3.5 bg-[#f5f5f7] border border-black/[0.04] rounded-2xl text-sm text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all"
          />
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {viewMode === 'flashcard' && filteredVocab.length > 0 && currentCard && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs font-semibold text-[#86868b] px-2 font-mono tabular-nums">
            <span>Thẻ {cardIndex + 1} / {filteredVocab.length}</span>
            <span>Đã ghi nhớ: {memorizedIds.size} / {VOCABULARY_LIST.length} từ</span>
          </div>

          {/* Flashcard Body */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer bg-white rounded-3xl border border-black/[0.08] min-h-[320px] p-8 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] group relative select-none apple-press"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#34c759]/10 text-[#248a3d] uppercase tracking-wider">
                {currentCard.unitId}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeak(currentCard.term);
                }}
                className="p-2.5 bg-[#f5f5f7] hover:bg-[#34c759]/15 text-[#248a3d] rounded-full transition-all apple-press"
                title="Phát âm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Front & Back */}
            {!isFlipped ? (
              <div className="text-center py-8 space-y-2.5">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors duration-200">
                  {currentCard.term}
                </h3>
                <div className="text-xs text-[#86868b] font-mono">{currentCard.phonetic}</div>
                <div className="text-xs text-[#86868b] italic">({currentCard.partOfSpeech})</div>
                <div className="text-xs text-[#0071e3] font-medium pt-4">
                  (Nhấp chuột vào thẻ để xem định nghĩa tiếng Việt &amp; ví dụ)
                </div>
              </div>
            ) : (
              <div className="py-6 space-y-3.5 animate-in fade-in duration-200">
                <div className="text-xl font-bold text-[#1d1d1f]">
                  {currentCard.meaning}
                </div>
                <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                  {currentCard.vietnameseDefinition}
                </p>
                <div className="pt-3 border-t border-black/[0.04]">
                  <div className="text-xs font-semibold text-[#1d1d1f]">Ví dụ câu trong tài chính:</div>
                  <div className="text-xs text-[#6e6e73] italic mt-1 leading-relaxed">"{currentCard.example}"</div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-[#86868b] pt-4 border-t border-black/[0.04]">
              <span className="flex items-center gap-1.5 font-medium">
                <RotateCw className="w-3.5 h-3.5 text-[#0071e3]" /> Lật thẻ
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMemorized(currentCard.id);
                }}
                className={`flex items-center gap-1.5 font-semibold transition-colors apple-press ${
                  memorizedIds.has(currentCard.id) ? 'text-[#248a3d]' : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                {memorizedIds.has(currentCard.id) ? 'Đã thuộc từ này' : 'Đánh dấu đã thuộc'}
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevCard}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-black/[0.08] hover:bg-black/[0.02] text-[#1d1d1f] font-semibold rounded-2xl text-xs sm:text-sm transition-all duration-200 apple-press shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" /> Từ trước
            </button>
            <button
              onClick={handleNextCard}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold rounded-2xl text-xs sm:text-sm transition-all duration-200 apple-press shadow-sm shadow-[#0071e3]/20"
            >
              Từ tiếp theo <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* LIST VIEW MODE */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVocab.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-black/[0.06] p-6 shadow-xs hover:border-black/[0.12] transition-all duration-200 apple-hover-lift space-y-3.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#1d1d1f] text-base">{item.term}</h3>
                    <button
                      onClick={() => handleSpeak(item.term)}
                      className="p-1 text-[#86868b] hover:text-[#0071e3] rounded-lg transition"
                      title="Phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-[11px] text-[#86868b] font-mono mt-0.5">
                    {item.phonetic} <span className="italic font-sans text-[#86868b]">({item.partOfSpeech})</span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold px-2.5 py-0.5 bg-black/[0.04] text-[#1d1d1f] rounded-full uppercase tracking-wider border border-black/[0.04]">
                  {item.unitId}
                </span>
              </div>

              <div className="p-3 bg-[#f5f5f7] rounded-2xl border border-black/[0.04] text-xs">
                <div className="font-bold text-[#1d1d1f] mb-0.5">{item.meaning}</div>
                <div className="text-[#6e6e73] leading-relaxed">{item.vietnameseDefinition}</div>
              </div>

              <div className="space-y-1.5 text-xs text-[#6e6e73]">
                <div>
                  <span className="font-semibold text-[#1d1d1f]">Cụm từ thường gặp: </span>
                  <span className="italic">{item.collocations?.join(' • ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#1d1d1f]">Câu thực tế: </span>
                  <span className="text-[#1d1d1f]">"{item.example}"</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

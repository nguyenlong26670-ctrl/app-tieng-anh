import React, { useState } from 'react';
import { TrendingUp, BarChart3, Volume2, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import AudioRecorder from './AudioRecorder';
import { SpeechService } from '../services/speechService';
import { evaluateTranscript } from '../data/rubricCriteria';

export default function GraphPresentationTool() {
  const [selectedPoint, setSelectedPoint] = useState('overall');
  const [isPlayingModel, setIsPlayingModel] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  // Dữ liệu biểu đồ biến động giá
  const graphData = [
    { period: 'Q1 2022', rawCost: 100, retailPrice: 100, note: 'Khởi điểm cơ sở (Base 100)' },
    { period: 'Q2 2022', rawCost: 118, retailPrice: 105, note: 'Chi phí nguyên liệu bắt đầu leo dốc' },
    { period: 'Q3 2022', rawCost: 135, retailPrice: 115, note: 'Khủng hoảng logistics toàn cầu' },
    { period: 'Q4 2022', rawCost: 150, retailPrice: 125, note: 'Hạn hán tại Brazil & Việt Nam' },
    { period: 'Q1 2023', rawCost: 165, retailPrice: 135, note: 'Lạm phát chi phí đẩy đạt đỉnh điểm' },
    { period: 'Q2 2023', rawCost: 174, retailPrice: 145, note: 'Đỉnh kỷ lục nguyên liệu thô' },
    { period: 'Q3 2023', rawCost: 168, retailPrice: 148, note: 'Bắt đầu có dấu hiệu hạ nhiệt nhẹ' },
    { period: 'Q4 2023', rawCost: 155, retailPrice: 150, note: 'Giá bán lẻ tiếp tục nhích lên' },
    { period: 'Q1 2024', rawCost: 142, retailPrice: 150, note: 'Hiện tượng giá cả kết dính (Sticky prices)' },
    { period: 'Q2 2024', rawCost: 138, retailPrice: 150, note: 'Nguyên liệu giảm nhưng giá menu đứng yên' },
    { period: 'Q3 2024', rawCost: 135, retailPrice: 150, note: 'Thu hồi biên lợi nhuận (Margin recovery)' },
    { period: 'Q4 2024', rawCost: 130, retailPrice: 150, note: 'Mức chênh lệch lợi nhuận mới ổn định' }
  ];

  const modelPresentationText = `Good morning, teacher. Today, I would like to present an analysis of the quarterly price movement graph for raw agricultural commodities and retail beverage prices over the past three years.

Looking at the overall trajectory, the chart reveals a volatile upward cycle, with raw ingredient costs fluctuating wildly while retail consumer prices exhibit strong upward rigidity, or what economists term "sticky prices."

I would like to highlight two critical trends from the data. First, between Q1 2022 and Q3 2023, there was a dramatic surge where raw commodity index jumped by almost 45%, climbing sharply from 120 points to a peak of 174 points. This upward spike was primarily caused by severe climate disruptions in major exporting nations like Brazil and Vietnam, alongside soaring shipping freight rates.

The second noteworthy trend occurred in late 2024: while wholesale commodity prices experienced a noticeable downturn of roughly 20%, retail beverage prices on store menus did not decrease at all; instead, they plateaued at their historic high.

From a financial and accounting standpoint, the business explanation behind this divergence lies in two factors: operational lag and fixed overhead cost inflation. Food and beverage operators typically lock in raw materials through six-month forward contracts, meaning past high costs take time to unwind. Furthermore, while ingredient costs softened, secondary costs such as commercial store rent, employee minimum wages, and energy bills remained persistently elevated. Consequently, companies chose to hold retail prices firm in order to recover lost profit margins from previous quarters.

In conclusion, this graph underscores that retail pricing strategies are heavily influenced not merely by spot commodity prices, but by comprehensive cost structures and long-term margin recovery targets. Thank you for listening.`;

  const handlePlayModelAudio = () => {
    if (isPlayingModel) {
      SpeechService.stopSpeaking();
      setIsPlayingModel(false);
    } else {
      setIsPlayingModel(true);
      SpeechService.speak(modelPresentationText, {
        onEnd: () => setIsPlayingModel(false),
        onError: () => setIsPlayingModel(false)
      });
    }
  };

  const handleEvaluate = (text) => {
    const res = evaluateTranscript(text, 'price', {
      keyVocabulary: [
        { term: 'Sticky prices' },
        { term: 'Upward trajectory' },
        { term: 'Forward contracts' },
        { term: 'Profit margin' },
        { term: 'Commodity index' },
        { term: 'Overhead costs' }
      ]
    });
    setEvaluationResult(res);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#161617] via-[#1d1d1f] to-[#2c2c2e] rounded-3xl p-6 sm:p-8 text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden border border-white/10">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white mb-3 backdrop-blur-md border border-white/15">
            <TrendingUp className="w-3.5 h-3.5 text-amber-300" /> Unit 1 Presentation Tool
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Thuyết Trình Biểu Đồ Giá Cả (Price Graph Presentation)
          </h1>
          <p className="mt-2 text-white/70 text-sm sm:text-base leading-relaxed">
            Nhiệm vụ: Trình bày bài thuyết trình 2-3 phút phân tích một biểu đồ giá trong sách. Nêu xu hướng chung (overall trend), 2 xu hướng quan trọng và 1 lời giải thích tài chính kinh doanh.
          </p>
        </div>
      </div>

      {/* Interactive Chart Container */}
      <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-600" />
              Biểu Đồ So Sánh: Chỉ Số Nguyên Liệu Thô vs. Giá Bán Lẻ Đồ Uống (2022 - 2024)
            </h2>
            <p className="text-xs text-[#86868b] mt-1 font-medium">
              Dữ liệu mô phỏng biến động giá cà phê nguyên liệu và giá menu tại các chuỗi cửa hàng
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff3b30]" />
              <span className="text-[#1d1d1f]">Raw Commodity Index (Nguyên liệu thô)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#0071e3]" />
              <span className="text-[#1d1d1f]">Retail Consumer Price (Giá bán lẻ)</span>
            </div>
          </div>
        </div>

        {/* CSS-based SVG Line / Bar Visualization */}
        <div className="h-64 sm:h-72 w-full bg-[#f5f5f7] rounded-2xl p-4 border border-black/[0.04] relative flex items-end justify-between gap-1 sm:gap-2">
          {graphData.map((d) => {
            const rawHeightPercent = ((d.rawCost - 90) / (180 - 90)) * 100;
            const retailHeightPercent = ((d.retailPrice - 90) / (180 - 90)) * 100;
            const isSelected = selectedPoint === d.period;

            return (
              <div 
                key={d.period} 
                className={`flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer p-1 rounded-xl transition-all duration-200 ${
                  isSelected ? 'bg-black/[0.04]' : 'hover:bg-black/[0.02]'
                }`}
                onClick={() => setSelectedPoint(d.period)}
              >
                {/* Tooltip on hover or when selected */}
                <div className={`transition-opacity duration-200 absolute -top-16 z-20 bg-[#1d1d1f] text-white text-[11px] p-2.5 rounded-2xl pointer-events-none whitespace-nowrap shadow-xl border border-white/10 ${
                  isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <div className="font-bold">{d.period}</div>
                  <div className="text-white/80">Raw Cost: {d.rawCost} | Retail: {d.retailPrice}</div>
                  <div className="text-amber-300 text-[10px] font-medium">{d.note}</div>
                </div>

                <div className="w-full flex items-end justify-center gap-1 h-[80%]">
                  {/* Bar 1: Raw Cost */}
                  <div 
                    style={{ height: `${rawHeightPercent}%` }}
                    className={`w-2.5 sm:w-3.5 rounded-t-md transition-all duration-300 ${
                      isSelected ? 'bg-[#ff3b30] shadow-sm shadow-[#ff3b30]/30' : 'bg-[#ff3b30]/80 group-hover:bg-[#ff3b30]'
                    }`}
                  />
                  {/* Bar 2: Retail Price */}
                  <div 
                    style={{ height: `${retailHeightPercent}%` }}
                    className={`w-2.5 sm:w-3.5 rounded-t-md transition-all duration-300 ${
                      isSelected ? 'bg-[#0071e3] shadow-sm shadow-[#0071e3]/30' : 'bg-[#0071e3]/80 group-hover:bg-[#0071e3]'
                    }`}
                  />
                </div>

                <div className={`text-[10px] mt-2 font-mono tabular-nums truncate w-full text-center transition-colors ${
                  isSelected ? 'text-[#1d1d1f] font-bold' : 'text-[#86868b]'
                }`}>
                  {d.period}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Giai đoạn 1: Q1/22 - Q2/23</span>
            <div className="text-sm font-bold text-amber-950 mt-1">Tăng vọt 45% (Dramatic Surge)</div>
            <p className="text-xs text-amber-900 mt-1 leading-relaxed">
              Nguyên nhân: Gián đoạn chuỗi cung ứng toàn cầu, hạn hán tại Brazil/Việt Nam và giá cước vận tải tăng vọt.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0071e3]/10 border border-[#0071e3]/20">
            <span className="text-xs font-bold text-[#0071e3] uppercase tracking-wider">Giai đoạn 2: Q3/23 - Q4/24</span>
            <div className="text-sm font-bold text-[#0071e3] mt-1">Nguyên liệu giảm sâu (Downturn)</div>
            <p className="text-xs text-[#0071e3] mt-1 leading-relaxed">
              Chi phí nguyên liệu thô giảm hơn 20% khi mùa vụ phục hồi và nguồn cung dần ổn định.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">Hiện tượng kinh tế học</span>
            <div className="text-sm font-bold text-purple-950 mt-1">Giá kết dính (Sticky Prices)</div>
            <p className="text-xs text-purple-900 mt-1 leading-relaxed">
              Giá bán lẻ đứng yên ở mức đỉnh do hợp đồng kỳ hạn (forward contracts) và doanh nghiệp bù đắp chi phí mặt bằng/nhân công.
            </p>
          </div>
        </div>
      </div>

      {/* Model Answer & PEEL Presentation Framework */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Presentation Framework Checklist */}
        <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-black/[0.04] pb-3">
            <h3 className="font-bold text-[#1d1d1f] text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#248a3d]" />
              Khung Bài Thuyết Trình Chuẩn (PEEL Template)
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-[#34c759]/10 text-[#248a3d] rounded-full border border-[#34c759]/20">
              Mục tiêu: 2 - 3 phút
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04]">
              <div className="font-bold text-[#1d1d1f] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1d1d1f] text-white text-[11px] flex items-center justify-center font-mono">1</span>
                Introduction (Mở đầu bài thuyết trình)
              </div>
              <p className="text-[#6e6e73] mt-1 text-xs leading-relaxed">
                "Good morning teacher. Today I would like to describe and interpret the quarterly price graph illustrating..."
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04]">
              <div className="font-bold text-[#1d1d1f] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1d1d1f] text-white text-[11px] flex items-center justify-center font-mono">2</span>
                Overall Trend (Xu hướng chung toàn biểu đồ)
              </div>
              <p className="text-[#6e6e73] mt-1 text-xs leading-relaxed">
                "Looking at the overall trajectory, the chart reveals a volatile upward cycle, followed by strong upward price rigidity..."
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04]">
              <div className="font-bold text-[#1d1d1f] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1d1d1f] text-white text-[11px] flex items-center justify-center font-mono">3</span>
                Two Important Trends (2 xu hướng then chốt)
              </div>
              <p className="text-[#6e6e73] mt-1 text-xs leading-relaxed">
                - Trend 1: "Between Q1 2022 and Q2 2023, raw commodity prices surged by nearly 45%..."<br/>
                - Trend 2: "In sharp contrast, when raw prices dropped in 2024, retail menu prices plateaued..."
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04]">
              <div className="font-bold text-[#1d1d1f] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1d1d1f] text-white text-[11px] flex items-center justify-center font-mono">4</span>
                Business &amp; Accounting Explanation (Giải thích kinh doanh)
              </div>
              <p className="text-[#6e6e73] mt-1 text-xs leading-relaxed">
                "From a financial standpoint, this divergence is explained by forward hedging contracts and the need to recover profit margins squeezed by fixed overhead inflation."
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04]">
              <div className="font-bold text-[#1d1d1f] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1d1d1f] text-white text-[11px] flex items-center justify-center font-mono">5</span>
                Conclusion (Kết luận đúc rút)
              </div>
              <p className="text-[#6e6e73] mt-1 text-xs leading-relaxed">
                "In conclusion, retail pricing is driven not merely by spot commodity prices, but by comprehensive cost structures and long-term margin recovery."
              </p>
            </div>
          </div>
        </div>

        {/* Right: Audio Model & Speech Reader */}
        <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-black/[0.04] pb-3 mb-4">
              <h3 className="font-bold text-[#1d1d1f] text-base flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-[#0071e3]" />
                Bài Thuyết Trình Mẫu C1 (Band 9.0)
              </h3>
              <button
                onClick={handlePlayModelAudio}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0071e3]/10 hover:bg-[#0071e3]/15 text-[#0071e3] text-xs font-semibold rounded-xl transition apple-press"
              >
                {isPlayingModel ? 'Dừng đọc' : 'Nghe giọng mẫu'}
              </button>
            </div>

            <div className="bg-[#f5f5f7] p-4 sm:p-5 rounded-2xl max-h-[340px] overflow-y-auto text-xs sm:text-sm text-[#1d1d1f] leading-relaxed space-y-3 border border-black/[0.04]">
              {modelPresentationText.split('\n\n').map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-black/[0.04]">
            <div className="text-xs font-bold text-[#1d1d1f] mb-2">Thuật ngữ ăn điểm trong bài:</div>
            <div className="flex flex-wrap gap-1.5">
              {['Sticky prices', 'Upward trajectory', 'Forward contracts', 'Profit margin recovery', 'Overhead cost inflation'].map(t => (
                <span key={t} className="px-3 py-1 bg-amber-500/10 text-amber-900 border border-amber-500/20 rounded-xl text-xs font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Speaking Practice & Instant Evaluation */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#1d1d1f] flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#ff3b30]" />
          Phòng Thu Âm Thực Hành Thuyết Trình Biểu Đồ
        </h3>
        <AudioRecorder
          placeholder="Hãy bật micro và thực hành thuyết trình bài nói 2-3 phút của bạn theo khung PEEL ở trên..."
          onEvaluate={handleEvaluate}
        />

        {/* Evaluation Output */}
        {evaluationResult && (
          <div className="bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs space-y-5 animate-in fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.04] pb-4">
              <div>
                <span className="text-xs font-semibold text-[#0071e3] uppercase tracking-wider">
                  Kết quả phân tích tự động
                </span>
                <h4 className="text-xl font-bold text-[#1d1d1f]">
                  Đánh giá bài thuyết trình theo Rubric giáo viên
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-[#86868b] font-medium">Điểm tổng kết</div>
                  <div className="text-3xl font-black text-[#0071e3]">
                    {evaluationResult.totalScore} <span className="text-sm font-normal text-[#86868b]">/ 10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Criteria breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3 bg-[#f5f5f7] rounded-2xl text-center border border-black/[0.04]">
                <div className="text-[11px] text-[#86868b] font-medium">Ý chính rõ ràng</div>
                <div className="text-base font-bold text-[#1d1d1f] mt-1">{evaluationResult.criteriaScores.c1_main_idea} / 10</div>
              </div>
              <div className="p-3 bg-[#f5f5f7] rounded-2xl text-center border border-black/[0.04]">
                <div className="text-[11px] text-[#86868b] font-medium">Dẫn chứng / Lý do</div>
                <div className="text-base font-bold text-[#1d1d1f] mt-1">{evaluationResult.criteriaScores.c2_supported_reasons} / 10</div>
              </div>
              <div className="p-3 bg-[#f5f5f7] rounded-2xl text-center border border-black/[0.04]">
                <div className="text-[11px] text-[#86868b] font-medium">Từ vựng chuyên ngành</div>
                <div className="text-base font-bold text-[#1d1d1f] mt-1">{evaluationResult.criteriaScores.c3_unit_vocabulary} / 10</div>
              </div>
              <div className="p-3 bg-[#f5f5f7] rounded-2xl text-center border border-black/[0.04]">
                <div className="text-[11px] text-[#86868b] font-medium">Bố cục logic</div>
                <div className="text-base font-bold text-[#1d1d1f] mt-1">{evaluationResult.criteriaScores.c4_logical_organization} / 10</div>
              </div>
              <div className="p-3 bg-[#f5f5f7] rounded-2xl text-center border border-black/[0.04]">
                <div className="text-[11px] text-[#86868b] font-medium">Lưu loát &amp; Phản xạ</div>
                <div className="text-base font-bold text-[#1d1d1f] mt-1">{evaluationResult.criteriaScores.c5_clarity_and_followup} / 10</div>
              </div>
            </div>

            {/* Detailed feedback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-[#34c759]/10 border border-[#34c759]/20 rounded-2xl p-4 sm:p-5">
                <div className="font-bold text-[#248a3d] flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#248a3d]" /> Điểm mạnh đã phát huy:
                </div>
                <ul className="list-disc list-inside space-y-1 text-[#248a3d]">
                  {evaluationResult.strengths.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 sm:p-5">
                <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-600" /> Lời khuyên nâng điểm:
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
    </div>
  );
}

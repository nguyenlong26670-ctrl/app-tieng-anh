import React from 'react';
import { TEACHER_RUBRIC } from '../data/rubricCriteria';
import { Award, Lightbulb, X } from 'lucide-react';

export default function RubricGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-black/[0.08] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#161617] via-[#1d1d1f] to-[#2c2c2e] text-white p-6 sm:p-8 relative border-b border-white/10">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all apple-press"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
              <Award className="w-5 h-5 text-amber-300" />
            </span>
            <span className="text-[11px] font-semibold tracking-wider uppercase bg-amber-400/15 text-amber-200 px-3 py-1 rounded-full border border-amber-300/20">
              Official Assessment Matrix
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">5 Tiêu Chí Chấm Điểm Speaking Của Giáo Viên</h2>
          <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Bộ tiêu chí chính thức cho kỳ thi Vấn đáp Tiếng Anh Tài chính - Kế toán. Nắm vững để đạt điểm 9.0 - 10.0!
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-[#f5f5f7]/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            <div className="bg-white border border-black/[0.06] rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="text-[#86868b] font-semibold text-xs mb-1">Mô hình Trả lời</div>
              <div className="text-xl font-bold text-[#1d1d1f]">P - E - E - L</div>
              <div className="text-xs text-[#6e6e73] mt-1 leading-relaxed">Point (Ý chính) ➔ Explain (Giải thích) ➔ Example (Dẫn chứng) ➔ Link (Chốt luận điểm)</div>
            </div>
            <div className="bg-white border border-black/[0.06] rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="text-[#86868b] font-semibold text-xs mb-1">Thời gian chuẩn bị</div>
              <div className="text-xl font-bold text-[#0071e3]">1:00 - 1:30 phút</div>
              <div className="text-xs text-[#6e6e73] mt-1 leading-relaxed">Ghi chú 3 gạch đầu dòng: Luận điểm + Từ vựng chuyên ngành + Dẫn chứng</div>
            </div>
            <div className="bg-white border border-black/[0.06] rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="text-[#86868b] font-semibold text-xs mb-1">Tốc độ & Phản xạ</div>
              <div className="text-xl font-bold text-[#34c759]">110 - 130 WPM</div>
              <div className="text-xs text-[#6e6e73] mt-1 leading-relaxed">Nói rõ ràng, tốc độ vừa phải, dùng câu đệm khi trả lời câu hỏi sâu của giáo viên</div>
            </div>
          </div>

          <div className="space-y-4">
            {TEACHER_RUBRIC.map((item, idx) => (
              <div key={item.id} className="border border-black/[0.06] rounded-2xl p-5 sm:p-6 bg-white shadow-xs hover:border-black/[0.12] transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#0071e3] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-[#1d1d1f] text-base">{item.title}</h3>
                      <div className="text-xs font-semibold text-[#0071e3]">{item.vietnameseTitle}</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-black/[0.04] text-[#1d1d1f] rounded-full border border-black/[0.05]">
                    Trọng số: {item.weight}%
                  </span>
                </div>

                <p className="text-[#6e6e73] text-sm mb-4 sm:pl-11 leading-relaxed">{item.description}</p>

                {/* Score levels */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:pl-11 text-xs">
                  <div className="bg-[#34c759]/10 border border-[#34c759]/20 p-3 rounded-xl">
                    <div className="font-bold text-[#248a3d]">Xuất sắc (9-10)</div>
                    <div className="text-[#248a3d]/90 mt-1 leading-snug">{item.levels.excellent.desc}</div>
                  </div>
                  <div className="bg-[#0071e3]/10 border border-[#0071e3]/20 p-3 rounded-xl">
                    <div className="font-bold text-[#0071e3]">Khá giỏi (7-8)</div>
                    <div className="text-[#0071e3]/90 mt-1 leading-snug">{item.levels.good.desc}</div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                    <div className="font-bold text-amber-800">Trung bình (5-6)</div>
                    <div className="text-amber-800/90 mt-1 leading-snug">{item.levels.fair.desc}</div>
                  </div>
                  <div className="bg-[#ff3b30]/10 border border-[#ff3b30]/20 p-3 rounded-xl">
                    <div className="font-bold text-[#ff3b30]">Cần cải thiện (&lt;5)</div>
                    <div className="text-[#ff3b30]/90 mt-1 leading-snug">{item.levels.poor.desc}</div>
                  </div>
                </div>

                {/* Tips */}
                {item.tips && (
                  <div className="mt-4 sm:pl-11">
                    <div className="bg-[#f5f5f7] border border-black/[0.05] rounded-xl p-3.5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 mb-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500" /> Mẹo ghi điểm tối đa:
                      </div>
                      <ul className="list-disc list-inside text-xs text-[#6e6e73] space-y-1 leading-relaxed">
                        {item.tips.map((tip, tIdx) => (
                          <li key={tIdx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-black/[0.06] p-4 sm:p-5 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold rounded-2xl text-xs sm:text-sm transition-all duration-200 apple-press shadow-sm shadow-[#0071e3]/20"
          >
            Đã hiểu, Bắt đầu luyện tập
          </button>
        </div>
      </div>
    </div>
  );
}

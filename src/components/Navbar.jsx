import React from 'react';
import { 
  Award, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Bookmark, 
  GraduationCap 
} from 'lucide-react';

export default function Navbar({ activeTab, onTabChange, onOpenRubric }) {
  const navItems = [
    { id: 'exam', label: 'Phòng Thi Ảo', icon: Award, badge: 'Official 3-Part' },
    { id: 'practice', label: 'Luyện 5 Chủ Đề', icon: BookOpen },
    { id: 'pair', label: 'Phòng Nói Cặp', icon: Users, badge: 'Situations' },
    { id: 'graph', label: 'Thuyết Trình Biểu Đồ', icon: TrendingUp },
    { id: 'vocab', label: 'Sổ Tay Từ Vựng', icon: Bookmark },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-black/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div 
            onClick={() => onTabChange('exam')}
            className="flex items-center gap-3 cursor-pointer select-none apple-press group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0071e3] to-[#42a5f5] flex items-center justify-center text-white shadow-sm shadow-[#0071e3]/25 transition-transform duration-200 group-hover:scale-[1.03]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-[#1d1d1f]">
                  FinSpeak<span className="text-[#0071e3]">Pro</span>
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] border border-[#0071e3]/20">
                  Exam Prep
                </span>
              </div>
              <div className="text-[11px] font-medium text-[#86868b] tracking-normal">
                Tiếng Anh Vấn Đáp Tài Chính - Kế Toán
              </div>
            </div>
          </div>

          {/* Desktop Nav Items (Apple Segmented Control Style) */}
          <nav className="hidden lg:flex items-center bg-black/[0.04] p-1 rounded-2xl border border-black/[0.03]">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 apple-press relative ${
                    isActive
                      ? 'bg-white text-[#1d1d1f] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]'
                      : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.02]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0071e3]' : 'text-[#86868b]'}`} />
                  <span>{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#0071e3]/10 text-[#0071e3] font-semibold border border-[#0071e3]/15">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Teacher Rubric Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenRubric}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/15 text-amber-900 border border-amber-500/20 transition-all duration-200 apple-press shadow-xs"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">5 Tiêu Chí Chấm Của Giáo Viên</span>
              <span className="sm:hidden">Tiêu Chí Chấm</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Nav Row */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-1.5 border-t border-black/[0.04] scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 apple-press ${
                  isActive
                    ? 'bg-[#0071e3] text-white shadow-sm shadow-[#0071e3]/20'
                    : 'text-[#6e6e73] bg-black/[0.03] hover:bg-black/[0.06]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

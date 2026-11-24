import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="bg-white border border-[#ff3b30]/20 rounded-3xl p-8 max-w-lg w-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] text-center space-y-4">
            <div className="w-14 h-14 bg-[#ff3b30]/10 text-[#ff3b30] rounded-2xl flex items-center justify-center mx-auto border border-[#ff3b30]/20">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-[#1d1d1f]">
              Đã xảy ra sự cố hiển thị
            </h2>
            <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
              Hệ thống đã tự động ghi nhận lỗi và bảo vệ phiên làm việc của bạn. Bạn có thể nhấn nút bên dưới để khôi phục trạng thái.
            </p>
            <div className="pt-2">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold rounded-2xl transition-all duration-200 apple-press shadow-sm shadow-[#0071e3]/20"
              >
                <RotateCcw className="w-4 h-4" /> Khôi phục và tải lại trang
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

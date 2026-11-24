import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, Square, RotateCcw, Volume2, Sparkles, Edit3, Clock, AlertCircle } from 'lucide-react';
import { SpeechService, AudioRecorderService } from '../services/speechService';

export default function AudioRecorder({ 
  onTranscriptChange, 
  initialText = '', 
  onEvaluate,
  placeholder = 'Nói vào micro hoặc nhập câu trả lời của bạn tại đây...'
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(initialText);
  const [interimText, setInterimText] = useState('');
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isManualEdit, setIsManualEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAutoEvaluating, setIsAutoEvaluating] = useState(false);

  const recognitionRef = useRef(null);
  const audioRecorderRef = useRef(new AudioRecorderService());
  const timerRef = useRef(null);
  const autoEvalTimerRef = useRef(null);

  useEffect(() => {
    setTranscript(initialText);
  }, [initialText]);

  // Đếm thời gian ghi âm
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Tự động chấm điểm khi nhập tay (debounce 2 giây)
  const triggerAutoEval = useCallback((text) => {
    if (!onEvaluate || !text || text.trim().length < 10) return;
    if (autoEvalTimerRef.current) clearTimeout(autoEvalTimerRef.current);
    setIsAutoEvaluating(true);
    autoEvalTimerRef.current = setTimeout(() => {
      onEvaluate(text);
      setIsAutoEvaluating(false);
    }, 2000);
  }, [onEvaluate]);

  useEffect(() => {
    return () => {
      if (autoEvalTimerRef.current) clearTimeout(autoEvalTimerRef.current);
    };
  }, []);

  const startRecording = async () => {
    setErrorMessage('');
    setInterimText('');

    // Bắt đầu ghi âm Audio thực tế
    try {
      await audioRecorderRef.current.start();
    } catch (err) {
      console.warn('Microphone audio recording not available:', err);
      setErrorMessage('Không thể truy cập microphone. Vui lòng cấp quyền micro cho trình duyệt.');
      return;
    }

    // Bắt đầu nhận diện giọng nói Speech-to-text
    recognitionRef.current = SpeechService.startRecognition({
      continuous: true,
      onResult: ({ final, interim }) => {
        if (final) {
          setTranscript(prev => {
            const updated = (prev ? prev + ' ' : '') + final;
            if (onTranscriptChange) onTranscriptChange(updated);
            return updated;
          });
        }
        setInterimText(interim);
      },
      onError: (err) => {
        console.warn('Speech recognition error:', err);
        if (err.error === 'not-allowed') {
          setErrorMessage('Quyền microphone bị từ chối.');
        }
      },
      onEnd: () => {
        // Tự động kết thúc
      }
    });

    setIsRecording(true);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setInterimText('');

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn(e);
      }
      recognitionRef.current = null;
    }

    try {
      const result = await audioRecorderRef.current.stop();
      if (result && result.audioUrl) {
        setRecordedAudioUrl(result.audioUrl);
      }
    } catch (err) {
      console.warn('Error stopping audio recorder:', err);
    }

    // Tự động chấm điểm sau khi dừng ghi âm (delay 500ms để transcript cập nhật xong)
    setTimeout(() => {
      setTranscript(prev => {
        if (onEvaluate && prev && prev.trim().length >= 10) {
          onEvaluate(prev);
        }
        return prev;
      });
    }, 500);
  };

  const handleReset = () => {
    if (isRecording) {
      stopRecording();
    }
    setTranscript('');
    setInterimText('');
    setRecordedAudioUrl(null);
    setRecordingSeconds(0);
    setErrorMessage('');
    if (onTranscriptChange) onTranscriptChange('');
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
  const estimatedWpm = recordingSeconds > 5 ? Math.round((wordCount / recordingSeconds) * 60) : 0;

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-black/[0.06] p-5 sm:p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] space-y-4">
      {/* Recording status & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-black/[0.04]">
        <div className="flex flex-wrap items-center gap-3">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#ff3b30] hover:bg-[#e03126] text-white font-semibold rounded-2xl text-xs sm:text-sm transition-all duration-200 shadow-sm shadow-[#ff3b30]/25 apple-press group"
            >
              <Mic className="w-4 h-4 transition-transform group-hover:scale-110" />
              Bắt đầu nói (Ghi âm)
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1d1d1f] hover:bg-black text-white font-semibold rounded-2xl text-xs sm:text-sm transition-all duration-200 shadow-sm apple-press animate-pulse"
            >
              <Square className="w-4 h-4 fill-white" />
              Dừng ghi âm
            </button>
          )}

          {isRecording && (
            <div className="flex items-center gap-2 bg-[#ff3b30]/10 border border-[#ff3b30]/20 px-3 py-1.5 rounded-xl text-[#ff3b30] text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b30] animate-ping" />
              Đang nghe &amp; ghi âm: {formatTime(recordingSeconds)}
            </div>
          )}

          {!isRecording && recordingSeconds > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-[#86868b] font-medium font-mono tabular-nums">
              <Clock className="w-3.5 h-3.5 text-[#86868b]" />
              Thời lượng: {formatTime(recordingSeconds)} | Tốc độ: ~{estimatedWpm} WPM
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsManualEdit(!isManualEdit)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 apple-press ${
              isManualEdit 
                ? 'bg-[#0071e3]/10 text-[#0071e3] border border-[#0071e3]/20' 
                : 'bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f]'
            }`}
            title="Chỉnh sửa văn bản thủ công"
          >
            <Edit3 className="w-3.5 h-3.5" />
            {isManualEdit ? 'Khóa chỉnh sửa' : 'Sửa chữ'}
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] transition-all duration-200 apple-press"
            title="Xóa làm lại từ đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Làm lại
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2.5 bg-amber-500/10 text-amber-900 text-xs p-3.5 rounded-2xl border border-amber-500/20">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{errorMessage} (Bạn vẫn có thể gõ câu trả lời bằng tay ở ô bên dưới)</span>
        </div>
      )}

      {/* Transcript Box */}
      <div className="relative">
        {isManualEdit ? (
          <textarea
            value={transcript}
            onChange={(e) => {
              setTranscript(e.target.value);
              if (onTranscriptChange) onTranscriptChange(e.target.value);
            }}
            placeholder={placeholder}
            rows={5}
            className="w-full p-4 rounded-2xl border border-[#0071e3]/30 bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] text-[#1d1d1f] text-sm leading-relaxed transition-all"
          />
        ) : (
          <div className="min-h-[120px] max-h-[220px] overflow-y-auto p-4 rounded-2xl bg-[#f5f5f7]/80 border border-black/[0.04] text-[#1d1d1f] text-sm leading-relaxed whitespace-pre-wrap">
            {transcript ? (
              <span>{transcript}</span>
            ) : (
              <span className="text-[#86868b] italic">
                {isRecording ? 'Đang lắng nghe giọng nói của bạn, hãy nói bằng tiếng Anh...' : placeholder}
              </span>
            )}
            {interimText && (
              <span className="text-[#0071e3] font-medium italic"> {interimText}...</span>
            )}
          </div>
        )}

        <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 text-[11px] font-medium text-[#86868b] bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-black/[0.06] shadow-xs">
          <span>{wordCount} từ</span>
        </div>
      </div>

      {/* Audio Playback & Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {recordedAudioUrl ? (
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-[#0071e3]" /> Nghe lại giọng bạn:
            </span>
            <audio controls src={recordedAudioUrl} className="h-8 max-w-[260px]" />
          </div>
        ) : (
          <div className="text-xs text-[#86868b] italic">
            * Nhấn Micro để ghi âm và hệ thống sẽ tự động chuyển giọng nói thành văn bản tiếng Anh.
          </div>
        )}

        {onEvaluate && transcript.trim().length > 0 && (
          <button
            onClick={() => onEvaluate(transcript)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0071e3] to-[#5e5ce6] hover:from-[#0077ed] hover:to-[#6b69ea] text-white font-semibold rounded-2xl text-xs sm:text-sm transition-all duration-200 shadow-sm shadow-[#0071e3]/20 apple-press"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Chấm điểm theo 5 tiêu chí giáo viên
          </button>
        )}
      </div>
    </div>
  );
}

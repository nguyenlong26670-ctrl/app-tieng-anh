// Service điều khiển Text-To-Speech (TTS), Speech-to-Text (STT) và Audio Recording

export class SpeechService {
  static isSpeechSynthesisSupported() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  static isSpeechRecognitionSupported() {
    return typeof window !== 'undefined' && (
      'SpeechRecognition' in window ||
      'webkitSpeechRecognition' in window
    );
  }

  static getEnglishVoices() {
    if (!this.isSpeechSynthesisSupported()) return [];
    const voices = window.speechSynthesis.getVoices();
    return voices.filter(v => v.lang.startsWith('en'));
  }

  static speak(text, { voiceName = null, rate = 0.95, pitch = 1.0, onStart, onEnd, onError } = {}) {
    if (!this.isSpeechSynthesisSupported()) {
      if (onError) onError(new Error('Speech Synthesis not supported in this browser.'));
      return;
    }

    // Cancel current speech if any
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = 'en-US';

    const voices = this.getEnglishVoices();
    if (voices.length > 0) {
      if (voiceName) {
        const found = voices.find(v => v.name.includes(voiceName));
        if (found) utterance.voice = found;
        else utterance.voice = voices[0];
      } else {
        // Ưu tiên giọng tự nhiên (Google US English, Samantha, Microsoft Natural)
        const naturalVoice = voices.find(v => 
          v.name.includes('Google') || 
          v.name.includes('Natural') || 
          v.name.includes('Samantha') || 
          v.name.includes('Jenny')
        ) || voices[0];
        utterance.voice = naturalVoice;
      }
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    if (onError) utterance.onerror = onError;

    window.speechSynthesis.speak(utterance);
  }

  static stopSpeaking() {
    if (this.isSpeechSynthesisSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  // Khởi tạo Speech Recognition (Nhận diện giọng nói tiếng Anh thời gian thực)
  static startRecognition({ onResult, onError, onEnd, continuous = true }) {
    if (!this.isSpeechRecognitionSupported()) {
      if (onError) onError(new Error('Trình duyệt không hỗ trợ Web Speech API. Hãy dùng Chrome, Edge hoặc Safari.'));
      return null;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (onResult) {
        onResult({
          final: finalTranscript.trim(),
          interim: interimTranscript.trim()
        });
      }
    };

    recognition.onerror = (event) => {
      if (onError) onError(event);
    };

    recognition.onend = () => {
      if (onEnd) onEnd();
    };

    try {
      recognition.start();
      return recognition;
    } catch (err) {
      if (onError) onError(err);
      return null;
    }
  }
}

// Lớp ghi âm Audio Recorder dùng MediaRecorder API
export class AudioRecorderService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.stream = null;
  }

  async start() {
    this.audioChunks = [];
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Microphone access is not supported by your browser.');
    }

    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(this.stream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.start(200); // 200ms chunk interval
  }

  stop() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Dọn dẹp tracks microphone
        if (this.stream) {
          this.stream.getTracks().forEach(track => track.stop());
          this.stream = null;
        }

        resolve({ audioBlob, audioUrl });
      };

      this.mediaRecorder.stop();
    });
  }

  isRecording() {
    return this.mediaRecorder && this.mediaRecorder.state === 'recording';
  }
}

// Tiêu chí chấm điểm của giáo viên (Teacher's Assessment Rubric)
// Dành cho bài thi Speaking Tiếng Anh Tài chính - Kế toán

export const TEACHER_RUBRIC = [
  {
    id: 'c1_main_idea',
    title: 'Stated my main idea clearly',
    vietnameseTitle: 'Ý chính rõ ràng, trực diện',
    weight: 20,
    description: 'Nêu bật luận điểm trung tâm ngay trong câu đầu tiên, trả lời trực diện trọng tâm câu hỏi hoặc tình huống kinh doanh, không vòng vo.',
    levels: {
      excellent: {
        score: '9 - 10',
        label: 'Excellent',
        desc: 'Luận điểm cực kỳ sắc bén, nêu lập trường kinh doanh / tài chính dứt khoát ngay từ đầu.'
      },
      good: {
        score: '7 - 8',
        label: 'Good',
        desc: 'Nêu rõ ý chính nhưng đôi chỗ chuyển tiếp chưa thật sự dứt khoát.'
      },
      fair: {
        score: '5 - 6',
        label: 'Fair',
        desc: 'Có nêu ý chính nhưng còn mơ hồ hoặc phải mất một thời gian giải thích dài dòng mới vào trọng tâm.'
      },
      poor: {
        score: '< 5',
        label: 'Needs Work',
        desc: 'Không nêu rõ ý chính hoặc trả lời lạc đề so với câu hỏi của giáo viên.'
      }
    },
    tips: [
      'Bắt đầu bằng câu chủ đề (Topic sentence) trực diện: "From a financial perspective, I firmly believe that..." hoặc "In my view, the most viable strategy is..."',
      'Định hình rõ ràng lập trường: Ủng hộ phương án nào, tại sao.'
    ]
  },
  {
    id: 'c2_supported_reasons',
    title: 'Supported ideas with reasons or examples',
    vietnameseTitle: 'Luận cứ & Dẫn chứng thực tế thuyết phục',
    weight: 25,
    description: 'Phát triển luận điểm bằng các lập luận logic, dữ liệu kinh tế tài chính, và các ví dụ thực tiễn trong ngành (case studies, tình huống thực tế).',
    levels: {
      excellent: {
        score: '9 - 10',
        label: 'Excellent',
        desc: 'Luận cứ sâu sắc, liên hệ chặt chẽ giữa chi phí, lợi ích, rủi ro, kèm ví dụ doanh nghiệp thực tế rõ ràng.'
      },
      good: {
        score: '7 - 8',
        label: 'Good',
        desc: 'Có lý do và ví dụ minh họa tốt, lập luận tương đối vững chắc.'
      },
      fair: {
        score: '5 - 6',
        label: 'Fair',
        desc: 'Lý do còn chung chung, ví dụ chưa cụ thể hoặc thiếu tính thực tiễn kinh doanh.'
      },
      poor: {
        score: '< 5',
        label: 'Needs Work',
        desc: 'Thiếu lý do hỗ trợ, chỉ đưa ra ý kiến suông mà không có chứng cứ hay ví dụ.'
      }
    },
    tips: [
      'Áp dụng quy tắc "Why & For Example": Sau khi đưa ra quan điểm, luôn giải thích "This is because..." và chứng minh bằng "For instance / A concrete example is..."',
      'Đưa ra các góc nhìn phân tích chi phí - lợi ích (Cost-Benefit Analysis).'
    ]
  },
  {
    id: 'c3_unit_vocabulary',
    title: 'Used unit vocabulary appropriately',
    vietnameseTitle: 'Sử dụng từ vựng chuyên ngành Unit chuẩn xác',
    weight: 20,
    description: 'Vận dụng chuẩn xác các thuật ngữ kinh tế, kế toán, tài chính đặc thù của từng bài học (Price, Service, Insurance, Productivity, Motivation).',
    levels: {
      excellent: {
        score: '9 - 10',
        label: 'Excellent',
        desc: 'Sử dụng thành thạo từ 4-6 thuật ngữ chuyên ngành tài chính cao cấp (C1 level) đúng ngữ cảnh.'
      },
      good: {
        score: '7 - 8',
        label: 'Good',
        desc: 'Sử dụng được 2-3 thuật ngữ chuyên ngành chính xác, từ vựng đa dạng.'
      },
      fair: {
        score: '5 - 6',
        label: 'Fair',
        desc: 'Chủ yếu dùng từ vựng giao tiếp thông thường, ít thuật ngữ chuyên môn kinh tế.'
      },
      poor: {
        score: '< 5',
        label: 'Needs Work',
        desc: 'Dùng sai nghĩa thuật ngữ hoặc vốn từ quá hạn hẹp, lặp từ nhiều lần.'
      }
    },
    tips: [
      'Ví dụ Unit Price: Dùng "Price elasticity", "Cost-push inflation", "Profit margin", "Penetration pricing", "Shrinkflation".',
      'Ví dụ Unit Insurance: Dùng "Indemnity", "Policy excess", "Moral hazard", "Duty of care", "Actuarial fairness".',
      'Ví dụ Unit Productivity: Dùng "Just-in-time", "Safety stock", "Capital expenditure (CapEx)", "Takt time", "ROI".'
    ]
  },
  {
    id: 'c4_logical_organization',
    title: 'Organised my ideas logically',
    vietnameseTitle: 'Cấu trúc mạch lạc, liên kết logic',
    weight: 20,
    description: 'Bố cục bài nói theo mô hình chuẩn PEEL (Point - Explanation - Example - Link) hoặc PREP, sử dụng linh hoạt các liên từ chuyển ý (Signposting).',
    levels: {
      excellent: {
        score: '9 - 10',
        label: 'Excellent',
        desc: 'Bố cục chuẩn mực, chuyển ý mượt mà bằng các từ nối học thuật: "First and foremost", "Conversely", "Consequently".'
      },
      good: {
        score: '7 - 8',
        label: 'Good',
        desc: 'Cấu trúc rõ ràng, có phân đoạn ý, liên từ sử dụng tương đối hợp lý.'
      },
      fair: {
        score: '5 - 6',
        label: 'Fair',
        desc: 'Ý tưởng nhảy cóc, thiếu liên từ kết nối giữa các câu hoặc lặp lại "and", "so".'
      },
      poor: {
        score: '< 5',
        label: 'Needs Work',
        desc: 'Rời rạc, không có cấu trúc mở - thân - kết rõ ràng.'
      }
    },
    tips: [
      'Bắt đầu: "There are three primary reasons why..."',
      'Chuyển đoạn: "Turning to the financial perspective...", "On the other hand...", "In sharp contrast..."',
      'Kết luận: "In a nutshell...", "Therefore, the optimal compromise is..."'
    ]
  },
  {
    id: 'c5_clarity_and_followup',
    title: 'Spoke clearly and responded to a follow-up question',
    vietnameseTitle: 'Phát âm rõ ràng & Phản xạ câu hỏi phụ của giáo viên',
    weight: 15,
    description: 'Phát âm rõ ràng, tốc độ vừa phải, ngữ điệu tự tin; có khả năng lắng nghe và đối đáp linh hoạt khi giáo viên hỏi xoáy đào sâu ở Phần 3.',
    levels: {
      excellent: {
        score: '9 - 10',
        label: 'Excellent',
        desc: 'Phát âm chuẩn xác, độ trôi chảy cao, phản xạ trả lời câu hỏi phụ của giáo viên tự tin và thuyết phục.'
      },
      good: {
        score: '7 - 8',
        label: 'Good',
        desc: 'Phát âm dễ hiểu, tốc độ nói ổn định, trả lời được câu hỏi phụ dù có thể hơi ngập ngừng ngắn.'
      },
      fair: {
        score: '5 - 6',
        label: 'Fair',
        desc: 'Nói ngập ngừng, còn vấp nhiều hoặc cần giáo viên nhắc lại câu hỏi mới trả lời được.'
      },
      poor: {
        score: '< 5',
        label: 'Needs Work',
        desc: 'Phát âm khó nghe, không hiểu hoặc không trả lời được câu hỏi phụ.'
      }
    },
    tips: [
      'Khi giáo viên hỏi sâu, hãy dùng câu đệm để có 2-3 giây tư duy: "That is an intriguing question, teacher. In terms of...", "Looking closely at the underlying financial mechanism..."',
      'Duy trì tốc độ 110 - 130 từ/phút (không nói quá nhanh, không ngắc ngứ quá lâu).'
    ]
  }
];

// Hàm chấm điểm thông minh phân tích bài nói của thí sinh
export function evaluateTranscript(transcript, unitId, questionObj) {
  if (!transcript || transcript.trim().length === 0) {
    return {
      totalScore: 0,
      wordCount: 0,
      matchedVocab: [],
      criteriaScores: {
        c1_main_idea: 0,
        c2_supported_reasons: 0,
        c3_unit_vocabulary: 0,
        c4_logical_organization: 0,
        c5_clarity_and_followup: 0
      },
      strengths: [],
      improvements: [
        'Chưa phát hiện nội dung bài nói. Hãy ghi âm hoặc nhập câu trả lời cho các phần thi.',
        'Mở đầu trực diện bằng cấu trúc: "From a financial perspective, I believe..."',
        'Bổ sung thuật ngữ chuyên môn và ví dụ thực tế theo mô hình PEEL.'
      ],
      feedback: 'Chưa có nội dung bài nói để đánh giá. Hãy ghi âm hoặc nhập câu trả lời của bạn.'
    };
  }

  const cleanText = transcript.toLowerCase();
  const words = cleanText.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // 1. Phân tích Tiêu chí 1: Main Idea Stated Clearly
  let c1Score = 6;
  const directStarters = [
    'i believe', 'in my opinion', 'in my view', 'i think', 'from my perspective',
    'my recommendation', 'i would propose', 'first and foremost', 'the most effective',
    'as a student', 'from a financial perspective', 'without hesitation', 'we should'
  ];
  const hasDirectStarter = directStarters.some(starter => cleanText.includes(starter));
  if (hasDirectStarter && wordCount >= 30) c1Score = 8.5;
  if (hasDirectStarter && wordCount >= 70) c1Score = 9.5;
  else if (wordCount < 20) c1Score = 5.0;

  // 2. Phân tích Tiêu chí 2: Supported with reasons or examples
  let c2Score = 6;
  const reasonKeywords = ['because', 'since', 'due to', 'as a result', 'reason', 'driven by', 'catalyst', 'leads to', 'stems from'];
  const exampleKeywords = ['for example', 'for instance', 'case in point', 'such as', 'to illustrate', 'like', 'in vietnam', 'specifically'];
  
  const foundReasons = reasonKeywords.filter(k => cleanText.includes(k));
  const foundExamples = exampleKeywords.filter(k => cleanText.includes(k));

  if (foundReasons.length >= 2 && foundExamples.length >= 1) c2Score = 9.5;
  else if (foundReasons.length >= 1 || foundExamples.length >= 1) c2Score = 8.0;
  else if (wordCount > 60) c2Score = 7.0;

  // 3. Phân tích Tiêu chí 3: Used unit vocabulary appropriately
  let c3Score = 5.5;
  const matchedVocab = [];
  if (questionObj && questionObj.keyVocabulary) {
    questionObj.keyVocabulary.forEach(item => {
      const termLower = item.term.toLowerCase();
      // tách các từ đơn trong cụm
      const parts = termLower.split(/[\s/()]+/).filter(p => p.length > 3);
      if (cleanText.includes(termLower) || parts.some(p => cleanText.includes(p))) {
        matchedVocab.push(item.term);
      }
    });
  }
  // Thêm một số từ vựng tài chính chung
  const generalFinanceTerms = [
    'cost', 'profit', 'margin', 'price', 'revenue', 'inflation', 'customer',
    'risk', 'insurance', 'claim', 'policy', 'productivity', 'efficiency', 'overhead',
    'working capital', 'investment', 'roi', 'discount', 'retention', 'budget', 'incentive'
  ];
  generalFinanceTerms.forEach(term => {
    if (cleanText.includes(term) && !matchedVocab.includes(term)) {
      matchedVocab.push(term);
    }
  });

  if (matchedVocab.length >= 5) c3Score = 9.5;
  else if (matchedVocab.length >= 3) c3Score = 8.5;
  else if (matchedVocab.length >= 1) c3Score = 7.0;

  // 4. Phân tích Tiêu chí 4: Organised logically
  let c4Score = 6;
  const signpostingMarkers = [
    'first', 'second', 'third', 'finally', 'moreover', 'furthermore',
    'however', 'on the other hand', 'in contrast', 'consequently',
    'in conclusion', 'to summarize', 'turning to', 'on the flip side'
  ];
  const foundSignposts = signpostingMarkers.filter(m => cleanText.includes(m));
  if (foundSignposts.length >= 3) c4Score = 9.5;
  else if (foundSignposts.length >= 1) c4Score = 8.0;
  else if (wordCount > 50) c4Score = 7.0;

  // 5. Phân tích Tiêu chí 5: Spoke clearly and word velocity
  let c5Score = 7.0;
  if (wordCount >= 100) c5Score = 9.0;
  else if (wordCount >= 50) c5Score = 8.0;
  else if (wordCount >= 25) c5Score = 7.0;
  else c5Score = 5.5;

  // Tính điểm tổng theo trọng số
  const totalScore = (
    c1Score * 0.20 +
    c2Score * 0.25 +
    c3Score * 0.20 +
    c4Score * 0.20 +
    c5Score * 0.15
  ).toFixed(1);

  // Sinh nhận xét chi tiết
  const strengths = [];
  const improvements = [];

  if (hasDirectStarter) strengths.push('Nêu lập trường và ý chính rất rõ ràng, tự tin ngay từ phần mở đầu.');
  else improvements.push('Nên mở đầu trực diện bằng các cụm từ: "From a financial perspective, I believe..." để giáo viên nắm ngay luận điểm.');

  if (foundReasons.length >= 1 && foundExamples.length >= 1) strengths.push('Lập luận chặt chẽ, có giải thích nguyên nhân và đưa ra dẫn chứng/ví dụ minh họa.');
  else improvements.push('Hãy bổ sung thêm ví dụ thực tiễn bằng cụm "For example,..." hoặc "A case in point is..." để đạt điểm tối đa ở tiêu chí Luận cứ.');

  if (matchedVocab.length >= 3) strengths.push(`Vận dụng tốt các thuật ngữ chuyên ngành: ${matchedVocab.slice(0, 4).join(', ')}.`);
  else improvements.push('Hãy tích hợp thêm các thuật ngữ tài chính chuyên ngành của bài học để bài nói có tính học thuật cao.');

  if (foundSignposts.length >= 2) strengths.push('Sử dụng liên từ chuyển ý (Signposting) logic, giúp bài nói mạch lạc chuẩn PEEL.');
  else improvements.push('Nên bổ sung liên từ phân đoạn như "First and foremost", "On the other hand", "Consequently".');

  return {
    totalScore: Number(totalScore),
    wordCount,
    matchedVocab,
    criteriaScores: {
      c1_main_idea: c1Score,
      c2_supported_reasons: c2Score,
      c3_unit_vocabulary: c3Score,
      c4_logical_organization: c4Score,
      c5_clarity_and_followup: c5Score
    },
    strengths,
    improvements
  };
}

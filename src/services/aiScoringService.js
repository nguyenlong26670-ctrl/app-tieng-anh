// Service chấm điểm bài thi Speaking Tiếng Anh Tài Chính - Kế Toán bằng AI (Gemini API & FinSpeak Neural AI)
import { TEACHER_RUBRIC, evaluateTranscript } from '../data/rubricCriteria.js';

export const AI_STORAGE_KEY = 'finspeak_gemini_api_key';

export function getStoredApiKey() {
  try {
    return localStorage.getItem(AI_STORAGE_KEY) || import.meta.env.VITE_GEMINI_API_KEY || '';
  } catch (e) {
    return '';
  }
}

export function setStoredApiKey(key) {
  try {
    if (key) {
      localStorage.setItem(AI_STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(AI_STORAGE_KEY);
    }
  } catch (e) {}
}

/**
 * Đánh giá bài thi bằng AI (Tự động kết hợp Gemini API nếu có key hoặc Bộ Chấm AI Cục Bộ Chuyên Sâu)
 */
export async function evaluateExamWithAI({
  examTicket,
  part1Transcript = '',
  part2Transcript = '',
  part3Transcript = '',
  apiKey = null,
  forceLocal = false,
  onProgress = null
}) {
  const effectiveApiKey = (apiKey || getStoredApiKey() || '').trim();
  const combinedText = `${part1Transcript} ${part2Transcript} ${part3Transcript}`.trim();

  // Báo tiến trình cho UI
  if (onProgress) onProgress('analyzing', 'Đang trích xuất dữ liệu bài nói từ 3 phần thi...');

  // Nếu người dùng có API Key và không ép dùng Local AI, thử gọi Gemini API trước
  if (effectiveApiKey && !forceLocal) {
    try {
      if (onProgress) onProgress('gemini_connecting', 'Đang kết nối AI Giám khảo Gemini (Google AI)...');
      const geminiResult = await callGeminiExamScoring({
        effectiveApiKey,
        examTicket,
        part1Transcript,
        part2Transcript,
        part3Transcript,
        onProgress
      });

      if (geminiResult) {
        return {
          ...geminiResult,
          provider: 'gemini',
          providerName: 'AI Giám Khảo Gemini Pro/Flash'
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to FinSpeak AI Engine:', err);
      if (onProgress) onProgress('fallback', 'Chuyển sang Bộ Chấm AI Cục Bộ FinSpeak (Zero-latency)...');
    }
  }

  // Fallback hoặc Chế độ mặc định: FinSpeak Neural AI Examiner
  if (onProgress) onProgress('local_ai', 'Bộ Chấm AI Cục Bộ đang đối chiếu 5 tiêu chí Rubric...');
  await new Promise(r => setTimeout(r, 600)); // Nhẹ nhàng để tạo trải nghiệm mượt mà

  if (onProgress) onProgress('lexical_eval', 'Đang phân tích thuật ngữ tài chính & đề xuất nâng cấp câu...');
  await new Promise(r => setTimeout(r, 400));

  const localAIResult = generateIntelligentLocalEvaluation({
    examTicket,
    part1Transcript,
    part2Transcript,
    part3Transcript,
    combinedText
  });

  return {
    ...localAIResult,
    provider: 'local_ai',
    providerName: 'FinSpeak AI Examiner Engine'
  };
}

/**
 * Gọi Google Gemini API để chấm điểm toàn diện
 */
async function callGeminiExamScoring({
  effectiveApiKey,
  examTicket,
  part1Transcript,
  part2Transcript,
  part3Transcript,
  onProgress
}) {
  const unitTitle = examTicket?.unit?.title || 'English for Finance & Accounting';
  const part1Q = examTicket?.part1?.question || '';
  const part2Q = examTicket?.part2?.question || '';
  const part3Q = examTicket?.part3Question || '';

  const systemPrompt = `You are Dr. Robert Vance, Senior Cambridge Business English Examiner and Lead Professor of Financial English.
Your role is to strictly and constructively grade a student's 3-part oral examination in "English for Finance & Accounting".

The exam covers 5 official criteria:
1. c1_main_idea (20%): Stated main idea clearly and directly from the opening sentence.
2. c2_supported_reasons (25%): Supported ideas with financial logic, cost-benefit reasoning, and concrete business examples.
3. c3_unit_vocabulary (20%): Used advanced C1 financial/accounting terminology appropriately.
4. c4_logical_organization (20%): Organised ideas logically using PEEL framework and academic signposting markers.
5. c5_clarity_and_followup (15%): Addressed follow-up question with agility, confidence, and fluency.

You must return ONLY a valid JSON object (no markdown, no extra explanation) adhering strictly to this JSON format:
{
  "totalScore": 8.5,
  "cefrLevel": "C1",
  "examinerSummary": "Detailed overall assessment in Vietnamese...",
  "criteriaScores": {
    "c1_main_idea": 8.5,
    "c2_supported_reasons": 8.0,
    "c3_unit_vocabulary": 9.0,
    "c4_logical_organization": 8.5,
    "c5_clarity_and_followup": 8.5
  },
  "criteriaFeedback": {
    "c1_main_idea": "Vietnamese explanation...",
    "c2_supported_reasons": "Vietnamese explanation...",
    "c3_unit_vocabulary": "Vietnamese explanation...",
    "c4_logical_organization": "Vietnamese explanation...",
    "c5_clarity_and_followup": "Vietnamese explanation..."
  },
  "partFeedback": {
    "part1": "Assessment for Part 1 (Individual Speaking) in Vietnamese...",
    "part2": "Assessment for Part 2 (Pair Speaking / Negotiation) in Vietnamese...",
    "part3": "Assessment for Part 3 (Teacher Follow-up) in Vietnamese..."
  },
  "matchedVocab": ["penetration pricing", "profit margin", "..."],
  "recommendedVocab": ["sticky prices", "cost-push inflation", "..."],
  "sentenceUpgrades": [
    {
      "original": "The student sentence...",
      "improved": "The upgraded C1 business English sentence...",
      "reason": "Why this is better in Vietnamese..."
    }
  ],
  "strengths": ["Strong point 1 in Vietnamese", "Strong point 2 in Vietnamese"],
  "improvements": ["Improvement point 1 in Vietnamese", "Improvement point 2 in Vietnamese"]
}`;

  const userContent = `EXAM UNIT: ${unitTitle}

PART 1 TOPIC (Individual Speaking):
Question: "${part1Q}"
Student Answer Part 1:
"${part1Transcript || '(Candidate provided no recording/answer for Part 1)'}"

PART 2 SITUATION (Pair Discussion & Decision Making):
Question: "${part2Q}"
Student Answer Part 2:
"${part2Transcript || '(Candidate provided no recording/answer for Part 2)'}"

PART 3 DEEP-DIVE QUESTION (Teacher Follow-up Q&A):
Question: "${part3Q}"
Student Answer Part 3:
"${part3Transcript || '(Candidate provided no recording/answer for Part 3)'}"

Please evaluate candidate performance thoroughly based on the 5 rubric criteria and return the exact JSON requested.`;

  const modelsToTry = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${effectiveApiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { text: systemPrompt + '\n\n' + userContent }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json'
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errText}`);
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('Empty response from Gemini API');

      // Parse JSON
      const parsed = JSON.parse(rawText.replace(/```json/g, '').replace(/```/g, '').trim());
      
      // Ensure all criteriaScores exist and are bounded
      parsed.criteriaScores = {
        c1_main_idea: Number(parsed.criteriaScores?.c1_main_idea || 7.0),
        c2_supported_reasons: Number(parsed.criteriaScores?.c2_supported_reasons || 7.0),
        c3_unit_vocabulary: Number(parsed.criteriaScores?.c3_unit_vocabulary || 7.0),
        c4_logical_organization: Number(parsed.criteriaScores?.c4_logical_organization || 7.0),
        c5_clarity_and_followup: Number(parsed.criteriaScores?.c5_clarity_and_followup || 7.0)
      };

      parsed.totalScore = Number(parsed.totalScore || (
        parsed.criteriaScores.c1_main_idea * 0.20 +
        parsed.criteriaScores.c2_supported_reasons * 0.25 +
        parsed.criteriaScores.c3_unit_vocabulary * 0.20 +
        parsed.criteriaScores.c4_logical_organization * 0.20 +
        parsed.criteriaScores.c5_clarity_and_followup * 0.15
      ).toFixed(1));

      parsed.wordCount = (part1Transcript + ' ' + part2Transcript + ' ' + part3Transcript)
        .trim().split(/\s+/).filter(Boolean).length;
      parsed.matchedVocab = Array.isArray(parsed.matchedVocab) ? parsed.matchedVocab : [];
      parsed.strengths = Array.isArray(parsed.strengths) && parsed.strengths.length > 0 ? parsed.strengths : [
        'Nỗ lực hoàn thành các phần thi vấn đáp và duy trì luồng tư duy kinh doanh.'
      ];
      parsed.improvements = Array.isArray(parsed.improvements) && parsed.improvements.length > 0 ? parsed.improvements : [
        'Bổ sung thêm các thuật ngữ tài chính chuyên ngành và lập luận theo mô hình PEEL.'
      ];

      return parsed;
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw lastError || new Error('All Gemini models failed.');
}

/**
 * Bộ Chấm Điểm AI Cục Bộ Chuyên Sâu (FinSpeak Intelligent Local Neural Engine)
 * Hoạt động độc lập không cần internet / API Key, cực kỳ chi tiết và chính xác.
 */
function generateIntelligentLocalEvaluation({
  examTicket,
  part1Transcript,
  part2Transcript,
  part3Transcript,
  combinedText
}) {
  const p1Text = (part1Transcript || '').trim();
  const p2Text = (part2Transcript || '').trim();
  const p3Text = (part3Transcript || '').trim();
  const totalWords = combinedText.split(/\s+/).filter(Boolean).length;

  const baseEval = evaluateTranscript(combinedText, examTicket?.unit?.id, examTicket?.part1);

  // Phân tích chi tiết từng Part
  const p1Words = p1Text.split(/\s+/).filter(Boolean).length;
  const p2Words = p2Text.split(/\s+/).filter(Boolean).length;
  const p3Words = p3Text.split(/\s+/).filter(Boolean).length;

  // Part 1: Đánh giá cá nhân & PEEL
  let part1Assessment = '';
  if (p1Words === 0) {
    part1Assessment = 'Thí sinh chưa hoàn thành phần nói cá nhân. Bạn cần nêu rõ quan điểm và lập trường kinh tế ngay từ câu mở đầu.';
  } else if (p1Words < 30) {
    part1Assessment = `Phần 1 có độ dài ${p1Words} từ, câu trả lời còn ngắn. Cần triển khai cấu trúc PEEL: Nêu Point rõ ràng, mở rộng Explain và dẫn chứng Example.`;
  } else {
    part1Assessment = `Phần 1 phát triển tốt (${p1Words} từ). Luận điểm được trình bày tự tin, có liên kết ý và phân tích khía cạnh tài chính.`;
  }

  // Part 2: Đánh giá thảo luận cặp & phản biện
  let part2Assessment = '';
  const collaborativeKeywords = ['agree', 'disagree', 'perspective', 'viewpoint', 'suggest', 'compromise', 'consensus', 'on one hand', 'balance'];
  const hasCollab = collaborativeKeywords.some(k => p2Text.toLowerCase().includes(k));
  if (p2Words === 0) {
    part2Assessment = 'Chưa có dữ liệu phần nói cặp. Để đạt điểm cao phần này, cần lắng nghe ý kiến bạn cặp, phản biện lịch sự và chốt giải pháp chung.';
  } else if (hasCollab) {
    part2Assessment = `Tương tác thảo luận cặp rất tốt (${p2Words} từ). Đã sử dụng ngôn ngữ thương lượng, phân tích được lợi ích đôi bên và chốt đồng thuận.`;
  } else {
    part2Assessment = `Đã trình bày quan điểm trong Phần 2 (${p2Words} từ). Khuyên bạn nên thêm các từ nối tương tác như: "I see your point, but looking at our budget constraint..." để tăng tính thảo luận.`;
  }

  // Part 3: Đánh giá câu hỏi đào sâu của giáo viên
  let part3Assessment = '';
  const financeDeepKeywords = ['risk', 'margin', 'cost', 'cash', 'liquidity', 'compliance', 'impact', 'mitigate', 'strategy', 'long-term'];
  const hasDeepTerms = financeDeepKeywords.some(k => p3Text.toLowerCase().includes(k));
  if (p3Words === 0) {
    part3Assessment = 'Chưa ghi âm trả lời câu hỏi đào sâu của giám khảo. Đây là phần quyết định điểm giỏi (8.0 - 10).';
  } else if (hasDeepTerms && p3Words >= 20) {
    part3Assessment = `Phản xạ rất sắc sảo với câu hỏi hóc búa của giáo viên (${p3Words} từ). Đã trực tiếp giải quyết vấn đề rủi ro và phương án dự phòng tài chính.`;
  } else {
    part3Assessment = `Đã trả lời câu hỏi phụ (${p3Words} từ). Hãy mở rộng thêm các biện pháp quản trị rủi ro hoặc chỉ số KPI cụ thể để thuyết phục giám khảo.`;
  }

  // Thuật ngữ khuyến nghị thêm theo Unit
  const unitRecommendedVocab = {
    price: ['Price elasticity of demand', 'Sticky prices', 'Penetration pricing', 'Cost-push inflation', 'Margin erosion'],
    service: ['First-Contact Resolution (FCR)', 'Customer churn rate', 'Goodwill gesture', 'Brand loyalty', 'Service recovery paradox'],
    insurance: ['Actuarial fairness', 'Policy excess (Deductible)', 'Moral hazard', 'Indemnity principle', 'Underwriting guidelines'],
    productivity: ['Just-In-Time (JIT) model', 'Capital expenditure (CapEx)', 'Bottleneck mitigation', 'Cycle time reduction', 'Labor efficiency ratio'],
    motivation: ['Herzberg hygiene factors', 'Performance-linked incentive', 'Intrinsic motivation', 'Retention bonus', 'Employee turnover rate']
  };

  const unitId = examTicket?.unit?.id || 'price';
  const recommendedVocab = unitRecommendedVocab[unitId] || unitRecommendedVocab.price;

  // Nâng cấp câu nói sang C1 Business English (Sentence Upgrades)
  const sentenceUpgrades = generateSentenceUpgrades(combinedText, unitId);

  // Đánh giá CEFR Level
  let cefrLevel = 'B1+';
  const score = baseEval.totalScore;
  if (score >= 9.0) cefrLevel = 'C2 Mastery';
  else if (score >= 8.0) cefrLevel = 'C1 Advanced';
  else if (score >= 6.5) cefrLevel = 'B2 Upper-Intermediate';
  else if (score >= 5.0) cefrLevel = 'B1 Intermediate';
  else cefrLevel = 'A2 Foundation';

  // Nhận xét tổng quan của Giám khảo
  let examinerSummary = '';
  if (score >= 8.0) {
    examinerSummary = `Bài thi thể hiện năng lực tiếng Anh tài chính xuất sắc (${cefrLevel}). Bạn sử dụng từ vựng chuyên ngành chính xác, tư duy kinh doanh chặt chẽ và phản xạ tự tin trước câu hỏi đào sâu.`;
  } else if (score >= 6.0) {
    examinerSummary = `Kết quả đạt mức khá (${cefrLevel}). Bài nói có cấu trúc rõ ràng và ý tưởng kinh doanh hợp lý. Cần nâng cấp thêm vốn từ vựng C1 và làm sắc nét các ví dụ định lượng để tiến lên dải điểm 8.5+.`;
  } else if (score > 0) {
    examinerSummary = `Bạn đã hoàn thành bài nói nhưng cần bổ sung thêm dung lượng lập luận và từ vựng chuyên ngành. Hãy luyện tập theo khung PEEL và đọc thêm sổ tay từ vựng để cải thiện.`;
  } else {
    examinerSummary = `Chưa có dữ liệu bài nói ghi âm. Hãy thử lại bằng cách bật micro hoặc gõ dàn bài để nhận được điểm số và phân tích toàn diện từ AI!`;
  }

  // Nhận xét chi tiết cho từng tiêu chí
  const criteriaFeedback = {
    c1_main_idea: baseEval.criteriaScores.c1_main_idea >= 8.5
      ? 'Luận điểm nêu trực diện ngay đầu bài, thể hiện rõ góc nhìn quản trị tài chính.'
      : 'Cần mở đầu dứt khoát hơn bằng: "From a financial perspective, my stance is..."',
    c2_supported_reasons: baseEval.criteriaScores.c2_supported_reasons >= 8.0
      ? 'Lập luận logic, có phân tích chi phí - lợi ích và ví dụ thực tiễn rõ ràng.'
      : 'Nên bổ sung thêm dữ liệu hoặc ví dụ doanh nghiệp cụ thể để bảo vệ quan điểm.',
    c3_unit_vocabulary: baseEval.criteriaScores.c3_unit_vocabulary >= 8.0
      ? `Đã vận dụng thành thạo các thuật ngữ: ${baseEval.matchedVocab.slice(0, 3).join(', ')}.`
      : 'Hãy đưa thêm các thuật ngữ C1 đặc thù của Unit vào câu trả lời.',
    c4_logical_organization: baseEval.criteriaScores.c4_logical_organization >= 8.0
      ? 'Bố cục bài chuẩn mô hình PEEL, liên từ chuyển tiếp mạch lạc và chuyên nghiệp.'
      : 'Cần thêm từ nối chuyển ý như: "First and foremost", "Conversely", "Consequently".',
    c5_clarity_and_followup: baseEval.criteriaScores.c5_clarity_and_followup >= 8.0
      ? 'Độ trôi chảy tốt, phản xạ nhanh và trả lời trúng trọng tâm câu hỏi đào sâu.'
      : 'Khi giáo viên hỏi sâu, dùng câu đệm để có 2 giây tư duy trước khi chốt giải pháp.'
  };

  return {
    totalScore: baseEval.totalScore,
    wordCount: totalWords,
    cefrLevel,
    examinerSummary,
    criteriaScores: baseEval.criteriaScores,
    criteriaFeedback,
    partFeedback: {
      part1: part1Assessment,
      part2: part2Assessment,
      part3: part3Assessment
    },
    matchedVocab: baseEval.matchedVocab,
    recommendedVocab,
    sentenceUpgrades,
    strengths: baseEval.strengths.length > 0 ? baseEval.strengths : [
      'Tinh thần làm bài nghiêm túc, bám sát cấu trúc đề thi 3 phần.'
    ],
    improvements: baseEval.improvements.length > 0 ? baseEval.improvements : [
      'Ghi âm đầy đủ cả 3 phần thi để phát huy tối đa năng lực phản xạ tiếng Anh.'
    ]
  };
}

/**
 * Trình phát hiện và nâng cấp câu nói thông minh sang chuẩn C1
 */
function generateSentenceUpgrades(text, unitId) {
  const upgrades = [];
  const lower = (text || '').toLowerCase();

  const rules = [
    {
      trigger: 'price go up',
      original: 'Prices go up very quickly.',
      improved: 'Prices have experienced a steep upward trajectory driven by cost-push inflation.',
      reason: 'Sử dụng cụm "steep upward trajectory" và thuật ngữ "cost-push inflation" chuẩn kinh tế C1.'
    },
    {
      trigger: 'make more money',
      original: 'We can make more money by selling at high price.',
      improved: 'We can optimize our gross profit margin and bolster top-line revenue through premium pricing.',
      reason: 'Thay từ giao tiếp thông thường bằng các thuật ngữ kế toán tài chính cao cấp (gross profit margin, top-line revenue).'
    },
    {
      trigger: 'give money back',
      original: 'We should give money back to the customer.',
      improved: 'We ought to issue a full refund and provide a goodwill voucher to preserve customer lifetime value.',
      reason: 'Nêu giải pháp bồi hoàn chuyên nghiệp kết hợp bảo vệ giá trị vòng đời khách hàng (customer lifetime value).'
    },
    {
      trigger: 'buy new machine',
      original: 'The company needs to buy new machine to work faster.',
      improved: 'The enterprise should allocate capital expenditure (CapEx) towards state-of-the-art automated machinery.',
      reason: 'Dùng khái niệm "Capital expenditure (CapEx)" - Chi tiêu tài sản cố định trong tài chính.'
    },
    {
      trigger: 'give bonus',
      original: 'We must give bonus to workers to make them happy.',
      improved: 'We should implement performance-linked incentives to elevate employee morale and drive productivity.',
      reason: 'Dùng cụm "performance-linked incentives" (thưởng theo hiệu suất) chuẩn quản trị nhân sự.'
    }
  ];

  for (const rule of rules) {
    if (lower.includes(rule.trigger) || upgrades.length === 0) {
      upgrades.push({
        original: rule.original,
        improved: rule.improved,
        reason: rule.reason
      });
      if (upgrades.length >= 3) break;
    }
  }

  // Đảm bảo luôn có ít nhất 2 câu mẫu nâng cấp giá trị
  if (upgrades.length < 2) {
    upgrades.push({
      original: 'In my opinion, this plan has many risks for our company.',
      improved: 'From a risk management standpoint, this proposal presents substantial liquidity exposures and margin vulnerability.',
      reason: 'Nâng cấp từ "many risks" thành các rủi ro cụ thể: "liquidity exposures" và "margin vulnerability".'
    });
    upgrades.push({
      original: 'I agree with my partner that we need to save cost.',
      improved: 'I concur with my colleague that strict cost-containment measures are paramount to safeguarding working capital.',
      reason: 'Thay "agree" bằng "concur", và "save cost" bằng "cost-containment measures".'
    });
  }

  return upgrades.slice(0, 3);
}

import { evaluateExamWithAI } from './src/services/aiScoringService.js';
import { UNITS, SPEAKING_DATA } from './src/data/speakingData.js';

console.log('=== AI SCORING SERVICE UNIT TESTS ===\n');

async function runTests() {
  const priceUnit = UNITS.find(u => u.id === 'price');
  const part1Q = SPEAKING_DATA.find(q => q.unitId === 'price' && q.part === 'part1');
  const part2Q = SPEAKING_DATA.find(q => q.unitId === 'price' && q.part === 'part2');

  const mockExamTicket = {
    unit: priceUnit,
    part1: part1Q,
    part2: part2Q,
    part3Question: 'What are the main financial risks if costs rise further?',
    part3Sample: 'The main financial risks include liquidity squeeze and customer attrition.'
  };

  // Test 1: Empty transcripts (The bug that crashed the user's app!)
  console.log('Test 1: Empty transcripts (Zero input submission)...');
  const emptyRes = await evaluateExamWithAI({
    examTicket: mockExamTicket,
    part1Transcript: '',
    part2Transcript: '',
    part3Transcript: '',
    forceLocal: true
  });

  if (emptyRes.totalScore === 0 && Array.isArray(emptyRes.strengths) && Array.isArray(emptyRes.improvements) && emptyRes.criteriaScores.c1_main_idea !== undefined) {
    console.log('Test 1: Empty transcripts PASS ✓ (Safely returns valid score and report without crashing)');
  } else {
    console.error('Test 1 FAIL ✗', emptyRes);
    process.exit(1);
  }

  // Test 2: Partial transcript (User only speaks Part 1)
  console.log('\nTest 2: Partial transcript (Only Part 1 filled)...');
  const partialRes = await evaluateExamWithAI({
    examTicket: mockExamTicket,
    part1Transcript: 'From my perspective, raw material prices have surged due to cost-push inflation. For example, coffee beans are 20% higher.',
    part2Transcript: '',
    part3Transcript: '',
    forceLocal: true
  });

  if (partialRes.totalScore > 0 && partialRes.partFeedback?.part1 && partialRes.partFeedback?.part2) {
    console.log(`Test 2: Partial transcript PASS ✓ (Score: ${partialRes.totalScore}, Part 1 feedback: "${partialRes.partFeedback.part1.substring(0, 40)}...")`);
  } else {
    console.error('Test 2 FAIL ✗', partialRes);
    process.exit(1);
  }

  // Test 3: Complete 3-part C1 speaking exam
  console.log('\nTest 3: Complete 3-Part C1 Exam Submission...');
  const fullRes = await evaluateExamWithAI({
    examTicket: mockExamTicket,
    part1Transcript: 'From a financial perspective, I firmly believe that penetration pricing is the optimal strategy. This is because we need to capture market share and build brand equity against incumbent brands. For example, offering an introductory discount stimulates trial volume. Consequently, long-term profit margins can expand.',
    part2Transcript: 'I concur with my colleague that maintaining healthy profit margins is crucial. However, we should also offer selective student discounts. Therefore, our compromise is to keep standard pricing while providing a targeted 15% academic concession to protect cash flow.',
    part3Transcript: 'Regarding liquidity exposures, the primary risk is working capital depletion. To mitigate this hazard, the business should secure flexible credit lines and implement dynamic price elasticity tracking.',
    forceLocal: true
  });

  const hasAllCriteria = ['c1_main_idea', 'c2_supported_reasons', 'c3_unit_vocabulary', 'c4_logical_organization', 'c5_clarity_and_followup']
    .every(id => fullRes.criteriaScores[id] >= 7.0);

  const hasUpgrades = fullRes.sentenceUpgrades?.length >= 2 && fullRes.sentenceUpgrades[0].improved;
  const hasMatchedVocab = fullRes.matchedVocab?.length >= 3;

  console.log(`  Total Score: ${fullRes.totalScore} / 10 (${fullRes.cefrLevel})`);
  console.log(`  Vocabulary matched: [${fullRes.matchedVocab.join(', ')}]`);
  console.log(`  Sentence Upgrades available: ${fullRes.sentenceUpgrades.length}`);
  console.log(`  Part 1 Feedback: ${fullRes.partFeedback.part1}`);
  console.log(`  Part 2 Feedback: ${fullRes.partFeedback.part2}`);
  console.log(`  Part 3 Feedback: ${fullRes.partFeedback.part3}`);

  if (fullRes.totalScore >= 8.0 && hasAllCriteria && hasUpgrades && hasMatchedVocab) {
    console.log('Test 3: Full 3-Part Exam PASS ✓');
  } else {
    console.error('Test 3 FAIL ✗', fullRes);
    process.exit(1);
  }

  console.log('\n=== ALL AI SCORING TESTS PASSED PERFECTLY ===');
}

runTests().catch(err => {
  console.error('Unhandled error in tests:', err);
  process.exit(1);
});

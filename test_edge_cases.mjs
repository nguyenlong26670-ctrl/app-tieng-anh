// Test edge cases: Exam Simulator logic
import { UNITS, SPEAKING_DATA } from './src/data/speakingData.js';
import { TEACHER_RUBRIC, evaluateTranscript } from './src/data/rubricCriteria.js';

console.log('=== EXAM SIMULATOR EDGE CASE TESTS ===\n');

// Test 1: Random exam ticket generation for all 5 units
let allTicketsValid = true;
for (const unit of UNITS) {
  const unitQuestions = SPEAKING_DATA.filter(q => q.unitId === unit.id);
  const part1Items = unitQuestions.filter(q => q.part === 'part1');
  const part2Items = unitQuestions.filter(q => q.part === 'part2' || q.type === 'pair_situation');
  
  const p1 = part1Items[Math.floor(Math.random() * part1Items.length)];
  const p2 = part2Items[Math.floor(Math.random() * part2Items.length)];
  const followUp = p1?.teacherFollowUps?.[0];
  
  const valid = p1 && p2 && followUp && followUp.question;
  if (!valid) {
    console.log(`  FAIL: ${unit.id} - p1=${!!p1} p2=${!!p2} followUp=${!!followUp}`);
    allTicketsValid = false;
  }
}
console.log(`Test 1 - All 5 units generate valid exam tickets: ${allTicketsValid ? 'PASS ✓' : 'FAIL ✗'}`);

// Test 2: Teacher rubric has correct weights summing to 100%
const totalWeight = TEACHER_RUBRIC.reduce((acc, item) => acc + item.weight, 0);
console.log(`Test 2 - Rubric weights sum to 100%: ${totalWeight}% → ${totalWeight === 100 ? 'PASS ✓' : 'FAIL ✗'}`);

// Test 3: Rubric criterion IDs match evaluateTranscript output keys
const mockEval = evaluateTranscript('I believe this is because for example furthermore in conclusion', 'price', {});
const evalKeys = Object.keys(mockEval.criteriaScores);
const rubricIds = TEACHER_RUBRIC.map(r => r.id);
const allMatch = rubricIds.every(id => evalKeys.includes(id));
console.log(`Test 3 - Rubric IDs match criteria score keys: rubric=[${rubricIds.join(',')}] eval=[${evalKeys.join(',')}] → ${allMatch ? 'PASS ✓' : 'FAIL ✗'}`);

// Test 4: Score is always between 0 and 10
const randomTexts = [
  '',
  'hello world',
  'From a financial perspective I believe that penetration pricing and brand equity should be considered. For example in Vietnam customer retention matters. Consequently profit margins are squeezed. First furthermore in conclusion.',
  'x'.repeat(1000)
];
let scoresInRange = true;
for (const text of randomTexts) {
  const r = evaluateTranscript(text, 'price', { keyVocabulary: [{ term: 'brand equity' }] });
  if (r.totalScore < 0 || r.totalScore > 10) {
    console.log(`  Out of range score: ${r.totalScore} for text: "${text.substring(0, 30)}"`);
    scoresInRange = false;
  }
}
console.log(`Test 4 - All scores in [0, 10] range: ${scoresInRange ? 'PASS ✓' : 'FAIL ✗'}`);

// Test 5: Individual vs Pair type distribution per unit (should have both types)
let allUnitsHaveBothTypes = true;
for (const unit of UNITS) {
  const individual = SPEAKING_DATA.filter(q => q.unitId === unit.id && q.type === 'individual_short').length;
  const pair = SPEAKING_DATA.filter(q => q.unitId === unit.id && q.type === 'pair_situation').length;
  if (individual === 0 || pair === 0) {
    console.log(`  ${unit.id}: individual=${individual} pair=${pair}`);
    allUnitsHaveBothTypes = false;
  }
}
console.log(`Test 5 - Each unit has both individual and pair questions: ${allUnitsHaveBothTypes ? 'PASS ✓' : 'FAIL ✗'}`);

// Test 6: PEEL structure exists for individual questions
const individualQs = SPEAKING_DATA.filter(q => q.type === 'individual_short');
const missingPeel = individualQs.filter(q => !q.peelStructure);
console.log(`Test 6 - PEEL structure on individual questions: ${individualQs.length - missingPeel.length}/${individualQs.length} have PEEL → ${missingPeel.length === 0 ? 'PASS ✓' : 'FAIL ✗ (missing: ' + missingPeel.map(q=>q.id).join(',') + ')'}`);

// Test 7: Sample answers are non-empty and have minimum length
const shortAnswers = SPEAKING_DATA.filter(q => q.sampleAnswer && q.sampleAnswer.length < 100);
console.log(`Test 7 - Sample answers have substance (>100 chars): ${SPEAKING_DATA.length - shortAnswers.length}/${SPEAKING_DATA.length} OK → ${shortAnswers.length === 0 ? 'PASS ✓' : 'FAIL ✗ (short: ' + shortAnswers.map(q=>q.id).join(',') + ')'}`);

// Test 8: Signposting phrases exist on all questions
const noSignpost = SPEAKING_DATA.filter(q => !q.signpostingPhrases || q.signpostingPhrases.length === 0);
console.log(`Test 8 - Signposting phrases on all questions: ${SPEAKING_DATA.length - noSignpost.length}/${SPEAKING_DATA.length} OK → ${noSignpost.length === 0 ? 'PASS ✓' : 'FAIL ✗'}`);

console.log('\n=== ALL EDGE CASE TESTS COMPLETE ===');

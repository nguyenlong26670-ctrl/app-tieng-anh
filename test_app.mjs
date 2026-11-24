// Test script for scoring algorithm
import { evaluateTranscript } from './src/data/rubricCriteria.js';

console.log('=== SCORING ALGORITHM TESTS ===\n');

// Test 1: Empty transcript
const r0 = evaluateTranscript('', 'price', {});
const test1 = r0.totalScore === 0;
console.log(`Test 1 - Empty transcript: score=${r0.totalScore} → ${test1 ? 'PASS ✓' : 'FAIL ✗'}`);

// Test 2: Strong C1 answer 
const strongAnswer = `From a financial perspective, I firmly believe that penetration pricing is the most viable strategy. 
This is because the new Vietnamese coffee brand lacks established brand equity and customer trust.
For example, entering with a 15% lower price than international chains allows the brand to gain initial market share quickly.
Consequently, once the customer base is built, the company can gradually increase profit margins.
First and foremost, the low price drives trial volume. Furthermore, strong branding investment follows.
In conclusion, this balanced approach minimizes financial risk while building consumer loyalty.`;

const r1 = evaluateTranscript(strongAnswer, 'price', {
  keyVocabulary: [
    { term: 'brand equity' }, { term: 'penetration pricing' }, { term: 'profit margins' }, { term: 'market share' }
  ]
});
const test2 = r1.totalScore >= 8.0;
console.log(`\nTest 2 - Strong C1 answer: score=${r1.totalScore} → ${test2 ? 'PASS ✓' : 'FAIL ✗'}`);
console.log(`  c1_main_idea: ${r1.criteriaScores.c1_main_idea}`);
console.log(`  c2_reasons: ${r1.criteriaScores.c2_supported_reasons}`);
console.log(`  c3_vocab: ${r1.criteriaScores.c3_unit_vocabulary}`);
console.log(`  c4_organization: ${r1.criteriaScores.c4_logical_organization}`);
console.log(`  c5_fluency: ${r1.criteriaScores.c5_clarity_and_followup}`);
console.log(`  Matched vocab: [${r1.matchedVocab.join(', ')}]`);
console.log(`  Strengths: ${r1.strengths.length} | Improvements: ${r1.improvements.length}`);

// Test 3: Weak answer
const weakAnswer = 'I think prices go up. It is bad for people.';
const r2 = evaluateTranscript(weakAnswer, 'price', {});
const test3 = r2.totalScore < 7.5;
console.log(`\nTest 3 - Weak short answer: score=${r2.totalScore} → ${test3 ? 'PASS ✓' : 'FAIL ✗'}`);

// Test 4: Vocabulary bank check
import { VOCABULARY_LIST } from './src/data/vocabularyData.js';
const unitIds = [...new Set(VOCABULARY_LIST.map(v => v.unitId))];
console.log(`\nTest 4 - Vocabulary bank: ${VOCABULARY_LIST.length} terms across units [${unitIds.join(', ')}] → ${VOCABULARY_LIST.length >= 25 ? 'PASS ✓' : 'FAIL ✗'}`);

// Test 5: All vocab have required fields
const missingFields = VOCABULARY_LIST.filter(v => !v.term || !v.meaning || !v.example);
console.log(`Test 5 - Vocab completeness: ${missingFields.length} missing → ${missingFields.length === 0 ? 'PASS ✓' : 'FAIL ✗'}`);

// Test 6: SPEAKING_DATA pair situations have pairRoleplay
import { SPEAKING_DATA } from './src/data/speakingData.js';
const pairQ = SPEAKING_DATA.filter(q => q.type === 'pair_situation');
const missingRoleplay = pairQ.filter(q => !q.pairRoleplay?.partnerA || !q.pairRoleplay?.partnerB || !q.pairRoleplay?.consensusConclusion);
console.log(`\nTest 6 - Pair situations roleplay data: ${pairQ.length} total, ${missingRoleplay.length} missing → ${missingRoleplay.length === 0 ? 'PASS ✓' : 'FAIL ✗'}`);

// Test 7: Teacher follow-up questions
const withFollowUps = SPEAKING_DATA.filter(q => q.teacherFollowUps && q.teacherFollowUps.length > 0);
console.log(`Test 7 - Questions with follow-ups: ${withFollowUps.length}/${SPEAKING_DATA.length} → ${withFollowUps.length >= 15 ? 'PASS ✓' : 'FAIL ✗'}`);

// Test 8: Presentation type questions exist for all units  
import { UNITS } from './src/data/speakingData.js';
const presPerUnit = UNITS.map(u => ({
  unit: u.id,
  count: SPEAKING_DATA.filter(q => q.unitId === u.id && q.type === 'presentation').length
}));
const allHavePresentation = presPerUnit.every(p => p.count >= 1);
console.log(`\nTest 8 - Presentations per unit: ${JSON.stringify(presPerUnit.map(p => p.unit + ':' + p.count))} → ${allHavePresentation ? 'PASS ✓' : 'FAIL ✗'}`);

console.log('\n=== ALL TESTS COMPLETE ===');

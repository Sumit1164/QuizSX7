export type AnswerInput = {
  questionId: string;
  selectedOptionId?: string | null;
  correctOptionId: string;
};

export type ScoreSummary = {
  attempted: number;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  total: number;
};

export function calculateScore(answers: AnswerInput[]): ScoreSummary {
  const attempted = answers.filter((answer) => Boolean(answer.selectedOptionId)).length;
  const correct = answers.filter((answer) => answer.selectedOptionId === answer.correctOptionId).length;
  const skipped = answers.length - attempted;

  return {
    attempted,
    correct,
    wrong: attempted - correct,
    skipped,
    score: correct,
    total: answers.length
  };
}

import { describe, expect, it } from "vitest";
import { calculateScore } from "../lib/scoring";

describe("calculateScore", () => {
  it("counts attempted, correct, wrong, skipped, and score", () => {
    expect(
      calculateScore([
        { questionId: "1", selectedOptionId: "a", correctOptionId: "a" },
        { questionId: "2", selectedOptionId: "b", correctOptionId: "c" },
        { questionId: "3", selectedOptionId: null, correctOptionId: "d" }
      ])
    ).toEqual({
      attempted: 2,
      correct: 1,
      wrong: 1,
      skipped: 1,
      score: 1,
      total: 3
    });
  });
});

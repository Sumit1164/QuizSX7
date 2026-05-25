"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Send, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth-provider";
import type { Question } from "@/lib/seed-data";
import { calculateScore } from "@/lib/scoring";

export function QuizPlayer({
  subjectSlug,
  topicSlug,
  questions
}: {
  subjectSlug: string;
  topicSlug: string;
  questions: Question[];
}) {
  const { user } = useAuth();
  const [selected, setSelected] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const answers = questions.map((question) => ({
    questionId: question.id,
    selectedOptionId: selected[question.id] ?? null,
    correctOptionId: question.correctOptionId
  }));
  const summary = calculateScore(answers);

  async function submit() {
    setSubmitted(true);
    setSaving(true);
    setMessage("");
    try {
      const token = await user?.getIdToken();
      const response = await fetch("/api/attempts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          topicSlug,
          firebaseUid: user?.uid ?? "demo-user",
          email: user?.email ?? undefined,
          displayName: user?.displayName ?? undefined,
          answers: answers.map(({ questionId, selectedOptionId }) => ({ questionId, selectedOptionId }))
        })
      });

      if (!response.ok) throw new Error("Score was calculated, but it could not be saved yet.");
      setMessage("Score saved to your profile.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Score saved locally for this session.");
    } finally {
      setSaving(false);
    }
  }

  if (!questions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Questions are coming soon</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          This topic is ready for content. Add MCQs from the admin dashboard when your question bank is prepared.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        {questions.map((question, index) => (
          <motion.article
            key={question.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-lg border bg-card p-5 shadow-soft"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge>Question {index + 1}</Badge>
              <Badge>{question.difficulty}</Badge>
              {question.companyTags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <h2 className="text-lg font-bold leading-7">{question.prompt}</h2>
            <div className="mt-4 grid gap-3">
              {question.options.map((option) => {
                const isSelected = selected[question.id] === option.id;
                const isCorrect = submitted && option.id === question.correctOptionId;
                const isWrong = submitted && isSelected && !isCorrect;

                return (
                  <button
                    key={option.id}
                    className={`flex min-h-12 items-center gap-3 rounded-md border p-3 text-left text-sm font-semibold transition ${
                      isCorrect
                        ? "border-primary bg-primary/10"
                        : isWrong
                          ? "border-destructive bg-destructive/10"
                          : isSelected
                            ? "border-accent bg-accent/10"
                            : "hover:border-primary hover:bg-muted"
                    }`}
                    disabled={submitted}
                    onClick={() => setSelected((current) => ({ ...current, [question.id]: option.id }))}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : isWrong ? (
                      <XCircle className="h-5 w-5 text-destructive" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                    {option.text}
                  </button>
                );
              })}
            </div>
            {submitted && <p className="mt-4 text-sm leading-6 text-muted-foreground">{question.explanation}</p>}
          </motion.article>
        ))}
      </div>
      <aside className="h-fit rounded-lg border bg-card p-5 shadow-soft lg:sticky lg:top-24">
        <h2 className="text-xl font-black">Test Summary</h2>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat label="Attempted" value={summary.attempted} />
          <Stat label="Correct" value={summary.correct} />
          <Stat label="Wrong" value={summary.wrong} />
          <Stat label="Skipped" value={summary.skipped} />
        </dl>
        <div className="mt-5 rounded-md bg-primary p-4 text-primary-foreground">
          <p className="text-sm">Score</p>
          <p className="text-3xl font-black">
            {summary.score}/{summary.total}
          </p>
        </div>
        <Button className="mt-4 w-full" disabled={submitted || saving} onClick={submit}>
          <Send className="h-4 w-4" />
          Submit Test
        </Button>
        {message && <p className="mt-3 text-sm text-muted-foreground">{message}</p>}
      </aside>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-muted p-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-xl font-black">{value}</dd>
    </div>
  );
}

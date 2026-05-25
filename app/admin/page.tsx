import type { Metadata } from "next";
import { AdminQuestionForm } from "@/components/admin-question-form";

export const metadata: Metadata = {
  title: "Admin",
  description: "QuizSX7 admin dashboard for adding placement MCQ questions."
};

export default function AdminPage() {
  return (
    <main className="container py-10">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase text-primary">Protected admin</p>
        <h1 className="mt-2 text-4xl font-black">Question dashboard</h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          Add MCQs, correct answers, explanations, difficulty, and company tags. Only admin emails can write to the
          database.
        </p>
      </div>
      <AdminQuestionForm />
    </main>
  );
}

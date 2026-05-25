"use client";

import * as React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/auth-provider";

type TopicOption = {
  id: string;
  title: string;
  subject: {
    title: string;
  };
};

export function AdminQuestionForm() {
  const { user, configured } = useAuth();
  const [topics, setTopics] = React.useState<TopicOption[]>([]);
  const [message, setMessage] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    async function loadTopics() {
      if (!user) return;
      const token = await user.getIdToken();
      const response = await fetch("/api/admin/topics", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = (await response.json()) as { topics?: TopicOption[] };
      setTopics(data.topics ?? []);
    }

    void loadTopics();
  }, [user]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    setBusy(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const token = await user.getIdToken();
    const options = [0, 1, 2, 3].map((index) => ({ text: String(form.get(`option-${index}`) ?? "") }));

    const response = await fetch("/api/admin/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        topicId: String(form.get("topicId")),
        prompt: String(form.get("prompt")),
        explanation: String(form.get("explanation")),
        difficulty: String(form.get("difficulty")),
        companyTags: String(form.get("companyTags")),
        published: true,
        options,
        correctOptionIndex: Number(form.get("correctOptionIndex"))
      })
    });

    setMessage(response.ok ? "Question added successfully." : "Question could not be added. Check admin access and database setup.");
    setBusy(false);
    if (response.ok) event.currentTarget.reset();
  }

  if (!configured) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Firebase setup required</CardTitle>
          <CardDescription>Add Firebase admin and client environment variables before using admin tools.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Admin login required</CardTitle>
          <CardDescription>Login with an email listed in ADMIN_EMAILS.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add MCQ question</CardTitle>
        <CardDescription>Admin writes are protected by Firebase token verification and admin email allowlist.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={submit}>
          <div className="grid gap-2">
            <Label htmlFor="topicId">Topic</Label>
            <select id="topicId" name="topicId" required className="h-10 rounded-md border bg-background px-3 text-sm">
              <option value="">Select a topic</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.subject.title} / {topic.title}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="prompt">Question</Label>
            <Textarea id="prompt" name="prompt" required />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="grid gap-2">
                <Label htmlFor={`option-${index}`}>Option {index + 1}</Label>
                <Input id={`option-${index}`} name={`option-${index}`} required />
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="correctOptionIndex">Correct option</Label>
              <select id="correctOptionIndex" name="correctOptionIndex" className="h-10 rounded-md border bg-background px-3 text-sm">
                <option value="0">Option 1</option>
                <option value="1">Option 2</option>
                <option value="2">Option 3</option>
                <option value="3">Option 4</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <select id="difficulty" name="difficulty" className="h-10 rounded-md border bg-background px-3 text-sm">
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="companyTags">Company tags</Label>
              <Input id="companyTags" name="companyTags" placeholder="TCS, Infosys" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="explanation">Explanation</Label>
            <Textarea id="explanation" name="explanation" required />
          </div>
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
          <Button disabled={busy}>
            <PlusCircle className="h-4 w-4" />
            Add question
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import * as React from "react";
import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";

type Attempt = {
  id: string;
  attempted: number;
  correct: number;
  wrong: number;
  skipped: number;
  score: number;
  total: number;
  createdAt: string;
  topic: {
    title: string;
    subject: {
      title: string;
    };
  };
};

export function ProfileHistory() {
  const { user, configured } = useAuth();
  const [attempts, setAttempts] = React.useState<Attempt[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function load() {
      if (!user) return;
      setLoading(true);
      const token = await user.getIdToken();
      const response = await fetch("/api/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = (await response.json()) as { attempts: Attempt[] };
      setAttempts(data.attempts);
      setLoading(false);
    }

    void load();
  }, [user]);

  if (!configured) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connect Firebase</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Add Firebase and NeonDB environment variables to enable persistent profile history.
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Login required</CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <a href="/login">Login to view profile</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Test History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p className="text-muted-foreground">Loading attempts...</p>}
        {!loading && !attempts.length && <p className="text-muted-foreground">No saved attempts yet.</p>}
        <div className="space-y-3">
          {attempts.map((attempt) => (
            <div key={attempt.id} className="grid gap-3 rounded-md border p-4 md:grid-cols-[1fr_auto]">
              <div>
                <p className="font-black">
                  {attempt.topic.subject.title} / {attempt.topic.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(attempt.createdAt).toLocaleString()} · Attempted {attempt.attempted}, Correct{" "}
                  {attempt.correct}, Wrong {attempt.wrong}, Skipped {attempt.skipped}
                </p>
              </div>
              <div className="rounded-md bg-primary px-4 py-2 text-center text-primary-foreground">
                <p className="text-xs">Score</p>
                <p className="text-xl font-black">
                  {attempt.score}/{attempt.total}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

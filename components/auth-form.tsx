"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Chrome, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginWithEmail, loginWithGoogle, signupWithEmail } from "@/lib/firebase-client";
import { useAuth } from "@/components/auth-provider";

export function AuthForm() {
  const router = useRouter();
  const { configured } = useAuth();
  const [mode, setMode] = React.useState<"login" | "signup">("login");
  const [message, setMessage] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const name = String(form.get("name") ?? "QuizSX7 Student");

    try {
      if (mode === "signup") {
        await signupWithEmail(name, email, password);
      } else {
        await loginWithEmail(email, password);
      }
      router.push("/dashboard");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setBusy(true);
    setMessage("");
    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Google login failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>{mode === "login" ? "Welcome back" : "Create your QuizSX7 account"}</CardTitle>
        <CardDescription>Practice placement questions and save every score to your profile.</CardDescription>
      </CardHeader>
      <CardContent>
        {!configured && (
          <div className="mb-4 rounded-md border border-secondary/60 bg-secondary/20 p-3 text-sm">
            Firebase keys are not configured yet. Add them in `.env.local` before using real login.
          </div>
        )}
        <form className="space-y-4" onSubmit={onSubmit}>
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your name" required />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="student@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" minLength={6} required />
          </div>
          {message && <p className="text-sm text-destructive">{message}</p>}
          <Button className="w-full" disabled={busy || !configured}>
            <Mail className="h-4 w-4" />
            {mode === "login" ? "Login" : "Sign up"}
          </Button>
        </form>
        <Button className="mt-3 w-full" variant="outline" disabled={busy || !configured} onClick={onGoogle}>
          <Chrome className="h-4 w-4" />
          Continue with Google
        </Button>
        <button
          className="mt-4 text-sm font-semibold text-primary"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Need an account? Sign up" : "Already have an account? Login"}
        </button>
      </CardContent>
    </Card>
  );
}

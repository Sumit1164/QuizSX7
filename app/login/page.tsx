import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login or sign up for QuizSX7 placement practice."
};

export default function LoginPage() {
  return (
    <main className="container py-12">
      <AuthForm />
    </main>
  );
}

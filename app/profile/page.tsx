import type { Metadata } from "next";
import { ProfileHistory } from "@/components/profile-history";

export const metadata: Metadata = {
  title: "Profile",
  description: "View QuizSX7 test attempts and placement practice progress."
};

export default function ProfilePage() {
  return (
    <main className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Profile</h1>
        <p className="mt-3 text-muted-foreground">Your saved QuizSX7 test attempts appear here.</p>
      </div>
      <ProfileHistory />
    </main>
  );
}

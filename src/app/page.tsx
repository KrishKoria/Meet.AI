"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = authClient.useSession();
  const onSubmit = async (e: React.FormEvent) => {
    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError: (ctx) => {
          alert(ctx.error.message);
        },
        onSuccess: () => {
          alert("Sign up successful!");
        },
      }
    );
  };
  if (session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
        <p className="mt-4">You are already signed in.</p>
        <Button
          onClick={() => {
            authClient.signOut();
          }}
          className="mt-4"
        >
          Sign Out
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-4">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button onClick={onSubmit}>Sign Up</Button>
    </div>
  );
}

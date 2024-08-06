"use client";
import LoginForm from "@/components/login/LoginForm";
import { useAuth } from "@/lib/auth";

export default function Login() {

  useAuth();

  return (
    <>
      <LoginForm />
    </>
  );
}

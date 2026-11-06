import type { Metadata } from "next";
import LoginScreen from "@/screens/LoginScreen";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return <LoginScreen />;
}

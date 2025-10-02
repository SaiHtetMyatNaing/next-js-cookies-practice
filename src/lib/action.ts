"use server";

import { LoginFormData, User } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// lib/action.ts
export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validating input
  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  try {
    const { data: users } = await axios.get(`${API_URL}/users`, {
      params: {
        email,
        password,
      },
    });

    if (users.length === 0) {
      return { error: "Invalid email or password" }
    }

    const user = users[0];

    const sessionToken = `session_${user.id}_${Date.now()}`;

    await axios.post(`${API_URL}/sessions`, {
      userId: user.id,
      token: sessionToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });

    (await cookies()).set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

  } catch (error) {
    console.error('Login error:', error);
    return { error: "Failed to log in. Please try again." }
  }

  redirect("/dashboard");
}
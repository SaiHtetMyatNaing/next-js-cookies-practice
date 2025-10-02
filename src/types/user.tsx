export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "moderator" | "user";
  avatar: string;
  createdAt: string;
}

export interface UserSession {
  id: number;
  userId: number;
  token: string;
  expiresAt: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
}

// For forms (without password for safety)
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: "admin" | "moderator" | "user";
  avatar: string;
  createdAt: string;
}

// Login form data
export interface LoginFormData {
  email: string;
  password: string;
}

// Register form data
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Update user form data
export interface UpdateUserFormData {
  name?: string;
  email?: string;
  avatar?: string;
}
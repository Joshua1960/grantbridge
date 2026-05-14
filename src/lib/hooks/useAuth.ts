import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "../store";

interface LoginCredentials {
  email: string;
  password: string;
  role: "entrepreneur" | "funder";
}

interface SignupData extends LoginCredentials {
  fullName: string;
  company?: string;
  phone?: string;
}

interface AuthResult {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: "entrepreneur" | "funder";
    company?: string;
    phone?: string;
    avatar?: string;
    verificationStatus: "pending" | "submitted" | "verified" | "rejected";
  };
}

function createUserFromCredentials(
  credentials: LoginCredentials & Partial<SignupData>,
) {
  return {
    id: `user-${Math.random().toString(36).slice(2, 10)}`,
    email: credentials.email,
    fullName:
      "fullName" in credentials && credentials.fullName
        ? credentials.fullName
        : credentials.email
            .split("@")[0]
            .replace(/\.|_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
    role: credentials.role,
    company: "company" in credentials ? credentials.company : undefined,
    phone: "phone" in credentials ? credentials.phone : undefined,
    avatar: "",
    verificationStatus: "verified" as const,
  };
}

function delay<T>(value: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function useAuth() {
  const queryClient = useQueryClient();
  const { login: setUser, logout: clearUser } = useAppStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      delay({ user: createUserFromCredentials(credentials) } as AuthResult),
    onSuccess: (result) => {
      setUser(result.user);
      queryClient.setQueryData(["currentUser"], result.user);
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) =>
      delay({ user: createUserFromCredentials(data) } as AuthResult),
    onSuccess: (result) => {
      setUser(result.user);
      queryClient.setQueryData(["currentUser"], result.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => delay(true),
    onSuccess: () => {
      clearUser();
      queryClient.clear();
    },
  });

  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signupMutation.isPending,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
  };
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (_email: string) =>
      delay({
        message: "Password reset link sent.",
        resetToken: "demo-reset-token",
      }),
  });
}

export function useValidateResetToken() {
  return useMutation({
    mutationFn: (token: string) => delay({ valid: Boolean(token) }),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({
      token,
      newPassword,
    }: {
      token: string;
      newPassword: string;
    }) => delay({ success: Boolean(token) && newPassword.length >= 8 }),
  });
}

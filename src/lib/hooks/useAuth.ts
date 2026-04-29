import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/mock-api';
import { useAppStore } from '../store';
import type { User } from '../store';

interface LoginCredentials {
  email: string;
  password: string;
  role: 'entrepreneur' | 'funder';
}

interface SignupData extends LoginCredentials {
  fullName: string;
  company?: string;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const { login: setUser, logout: clearUser } = useAppStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => api.login(credentials),
    onSuccess: (user: User) => {
      setUser(user);
      queryClient.setQueryData(['currentUser'], user);
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => api.signup(data),
    onSuccess: (user: User) => {
      setUser(user);
      queryClient.setQueryData(['currentUser'], user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => api.logout(),
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

export function useCurrentUser() {
  const { user } = useAppStore();
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => api.getCurrentUser(),
    initialData: user,
    enabled: !!user,
  });
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (email: string) => api.requestPasswordReset(email),
  });
}

export function useValidateResetToken() {
  return useMutation({
    mutationFn: (token: string) => api.validateResetToken(token),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) =>
      api.resetPassword(token, newPassword),
  });
}

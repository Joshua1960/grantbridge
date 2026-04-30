import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/live-api';
import { useAppStore } from '../store';

interface LoginCredentials {
  email: string;
  password: string;
  role: 'entrepreneur' | 'funder';
}

interface SignupData extends LoginCredentials {
  fullName: string;
  company?: string;
  phone?: string;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const { login: setUser, logout: clearUser } = useAppStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => api.login(credentials),
    onSuccess: (result) => {
      setUser(result.user);
      queryClient.setQueryData(['currentUser'], result.user);
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => api.signup(data),
    onSuccess: (result) => {
      setUser(result.user);
      queryClient.setQueryData(['currentUser'], result.user);
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
    enabled: true,
  });
}

export function useRestoreSession() {
  const queryClient = useQueryClient();
  const { login: setUser, logout: clearUser } = useAppStore();
  const query = useQuery({
    queryKey: ['restoreSession'],
    queryFn: () => api.restoreSession(),
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (!query.isSuccess) return;

    if (query.data) {
      setUser(query.data);
      queryClient.setQueryData(['currentUser'], query.data);
    } else {
      clearUser();
      queryClient.removeQueries({ queryKey: ['currentUser'] });
    }
  }, [clearUser, query.data, query.isSuccess, queryClient, setUser]);

  return query;
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

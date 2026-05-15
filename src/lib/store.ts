import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "entrepreneur" | "funder";

export type VerificationStatus =
  | "pending"
  | "submitted"
  | "verified"
  | "rejected";

export type FundingStatus = "open" | "funded" | "in_review" | "closed";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  company?: string;
  phone?: string;
  avatar?: string;
  verificationStatus: VerificationStatus;
  profileCompleted?: boolean;
  verificationDocuments?: {
    idType?: string;
    idNumber?: string;
    idFront?: string;
    idBack?: string;
    selfie?: string;
    submittedAt?: string;
  };
}

export interface FundingOffer {
  id: string;
  funderId: string;
  funderName: string;
  funderCompany: string;
  amount: number;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface PitchCard {
  id: string;
  title: string;
  description: string;
  category: string;
  amountNeeded: number;
  fundingStatus: FundingStatus;
  fundedBy?: {
    funderId: string;
    funderName: string;
    funderCompany: string;
    fundedAmount: number;
    fundedDate: string;
  };
  entrepreneurId: string;
  entrepreneurName: string;
  entrepreneurAvatar: string;
  companyName: string;
  location: string;
  createdAt: string;
  tags: string[];
  stage: "idea" | "mvp" | "growth" | "scale";
  likes: number;
  views: number;
  image: string;
  media?: string[];
  verified: boolean;
  offers?: FundingOffer[];
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isFirstLogin: boolean;
  login: (user: User) => void;
  logout: () => void;
  completeOnboarding: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isFirstLogin: true,
      login: (user) =>
        set({
          user: {
            ...user,
            verificationStatus: user.verificationStatus || "pending",
            profileCompleted: user.profileCompleted || false,
          },
          isAuthenticated: true,
          isFirstLogin: !user.profileCompleted,
        }),
      logout: () => {
        set({ user: null, isAuthenticated: false, isFirstLogin: true });
      },
      completeOnboarding: () => set({ isFirstLogin: false }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: "grantbridge-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isFirstLogin: state.isFirstLogin,
      }),
    },
  ),
);

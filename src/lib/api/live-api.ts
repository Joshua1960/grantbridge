import type {
  FundingOffer,
  PitchCard,
  User,
  UserRole,
  VerificationStatus,
} from "../store";
import {
  clearAuthTokens,
  getAccessToken,
  setAuthTokens,
  type AuthTokens,
} from "./auth-tokens";

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

export const API_BASE_URL = (configuredBaseUrl || "/api/v1").replace(/\/$/, "");

type UnknownRecord = Record<string, unknown>;
let refreshPromise: Promise<string | null> | null = null;

interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

interface SignupData extends LoginCredentials {
  fullName: string;
  company?: string;
  phone?: string;
}

export interface AuthResult {
  user: User;
  accessToken?: string;
}

export interface WeeklyProgressPayload {
  pitchId: string;
  weekEnding: string;
  summary: string;
  wins: string;
  blockers?: string;
  nextSteps: string;
  metrics?: Record<string, string>;
}

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asRecord(value: unknown): UnknownRecord {
  return isRecord(value) ? value : {};
}

function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string")
    return ["true", "1", "yes", "verified"].includes(value.toLowerCase());
  return fallback;
}

function normalizeRole(
  value: unknown,
  fallback: UserRole = "entrepreneur",
): UserRole {
  return value === "funder" || value === "investor"
    ? "funder"
    : value === "entrepreneur"
      ? "entrepreneur"
      : fallback;
}

function normalizeVerificationStatus(value: unknown): VerificationStatus {
  if (value === "submitted" || value === "verified" || value === "rejected")
    return value;
  return "pending";
}

function pickPayload<T = unknown>(response: unknown): T {
  const body = asRecord(response);
  if ("data" in body) return body.data as T;
  if ("result" in body) return body.result as T;
  return response as T;
}

function pickArray<T = unknown>(response: unknown): T[] {
  const payload = pickPayload(response);
  if (Array.isArray(payload)) return payload as T[];

  const record = asRecord(payload);
  for (const key of ["items", "pitches", "projects", "results", "data"]) {
    const value = record[key];
    if (Array.isArray(value)) return value as T[];
  }

  return [];
}

function extractTokens(response: unknown): Partial<AuthTokens> {
  const body = asRecord(response);
  const payload = asRecord(pickPayload(response));
  const tokenContainer = asRecord(
    payload.tokens || body.tokens || payload.auth || body.auth,
  );

  return {
    accessToken: asString(
      payload.accessToken ||
        payload.access_token ||
        payload.token ||
        body.accessToken ||
        body.access_token ||
        body.token ||
        tokenContainer.accessToken ||
        tokenContainer.access_token ||
        tokenContainer.token,
    ),
  };
}

function extractUser(
  response: unknown,
  fallbackRole: UserRole = "entrepreneur",
): User {
  const payload = pickPayload(response);
  const payloadRecord = asRecord(payload);
  const bodyRecord = asRecord(response);
  const rawUser = asRecord(
    payloadRecord.user ||
      payloadRecord.profile ||
      bodyRecord.user ||
      bodyRecord.profile ||
      payload,
  );

  return {
    id: asString(rawUser.id || rawUser._id || rawUser.uuid || rawUser.userId),
    email: asString(rawUser.email),
    fullName: asString(
      rawUser.fullName ||
        rawUser.full_name ||
        rawUser.name ||
        rawUser.displayName ||
        rawUser.display_name,
    ),
    role: normalizeRole(
      rawUser.role || rawUser.userRole || rawUser.user_type || rawUser.type,
      fallbackRole,
    ),
    company: asString(
      rawUser.company ||
        rawUser.companyName ||
        rawUser.company_name ||
        rawUser.organization ||
        rawUser.organisation,
    ),
    phone: asString(
      rawUser.phone || rawUser.phoneNumber || rawUser.phone_number,
    ),
    avatar: asString(
      rawUser.avatar ||
        rawUser.avatarUrl ||
        rawUser.avatar_url ||
        rawUser.image,
    ),
    verificationStatus: normalizeVerificationStatus(
      rawUser.verificationStatus ||
        rawUser.verification_status ||
        rawUser.status,
    ),
  };
}

function normalizeOffer(raw: unknown): FundingOffer {
  const offer = asRecord(raw);
  return {
    id: asString(offer.id || offer._id || offer.offerId || offer.offer_id),
    funderId: asString(
      offer.funderId || offer.funder_id || offer.userId || offer.user_id,
    ),
    funderName: asString(offer.funderName || offer.funder_name || offer.name),
    funderCompany: asString(
      offer.funderCompany ||
        offer.funder_company ||
        offer.company ||
        offer.organization,
    ),
    amount: asNumber(offer.amount),
    message: asString(offer.message || offer.note),
    status:
      offer.status === "accepted" || offer.status === "rejected"
        ? offer.status
        : "pending",
    createdAt: asString(
      offer.createdAt || offer.created_at,
      new Date().toISOString(),
    ),
  };
}

function normalizePitch(raw: unknown): PitchCard {
  const pitch = asRecord(raw);
  const entrepreneur = asRecord(
    pitch.entrepreneur || pitch.owner || pitch.user,
  );
  const fundedBy = asRecord(pitch.fundedBy || pitch.funded_by || pitch.funder);
  const offers = Array.isArray(pitch.offers)
    ? pitch.offers.map(normalizeOffer)
    : undefined;

  return {
    id: asString(pitch.id || pitch._id || pitch.pitchId || pitch.projectId),
    title: asString(pitch.title || pitch.name),
    description: asString(pitch.description || pitch.summary),
    category: asString(
      pitch.category || pitch.industry || pitch.sector,
      "Other",
    ),
    fundingGoal: asNumber(
      pitch.fundingGoal ||
        pitch.funding_goal ||
        pitch.goal ||
        pitch.amountRequested ||
        pitch.amount_requested,
    ),
    fundingStatus:
      pitch.fundingStatus === "funded" ||
      pitch.fundingStatus === "in_review" ||
      pitch.fundingStatus === "closed"
        ? pitch.fundingStatus
        : pitch.funding_status === "funded" ||
            pitch.funding_status === "in_review" ||
            pitch.funding_status === "closed"
          ? pitch.funding_status
          : "open",
    fundedBy: Object.keys(fundedBy).length
      ? {
          funderId: asString(
            fundedBy.funderId ||
              fundedBy.funder_id ||
              fundedBy.id ||
              fundedBy._id,
          ),
          funderName: asString(
            fundedBy.funderName || fundedBy.funder_name || fundedBy.name,
          ),
          funderCompany: asString(
            fundedBy.funderCompany ||
              fundedBy.funder_company ||
              fundedBy.company,
          ),
          fundedAmount: asNumber(
            fundedBy.fundedAmount || fundedBy.funded_amount || fundedBy.amount,
          ),
          fundedDate: asString(
            fundedBy.fundedDate ||
              fundedBy.funded_date ||
              fundedBy.createdAt ||
              fundedBy.created_at,
          ),
        }
      : undefined,
    entrepreneurId: asString(
      pitch.entrepreneurId ||
        pitch.entrepreneur_id ||
        entrepreneur.id ||
        entrepreneur._id,
    ),
    entrepreneurName: asString(
      pitch.entrepreneurName ||
        pitch.entrepreneur_name ||
        entrepreneur.fullName ||
        entrepreneur.name,
    ),
    entrepreneurAvatar: asString(
      pitch.entrepreneurAvatar ||
        pitch.entrepreneur_avatar ||
        entrepreneur.avatar ||
        entrepreneur.avatarUrl,
    ),
    companyName: asString(
      pitch.companyName ||
        pitch.company_name ||
        pitch.company ||
        entrepreneur.company,
    ),
    location: asString(pitch.location || pitch.city || entrepreneur.location),
    createdAt: asString(
      pitch.createdAt || pitch.created_at,
      new Date().toISOString(),
    ),
    tags: Array.isArray(pitch.tags)
      ? pitch.tags.map((tag) => asString(tag)).filter(Boolean)
      : [],
    stage:
      pitch.stage === "mvp" ||
      pitch.stage === "growth" ||
      pitch.stage === "scale"
        ? pitch.stage
        : "idea",
    likes: asNumber(pitch.likes || pitch.likeCount || pitch.like_count),
    views: asNumber(pitch.views || pitch.viewCount || pitch.view_count),
    image: asString(
      pitch.image ||
        pitch.imageUrl ||
        pitch.image_url ||
        pitch.coverImage ||
        pitch.cover_image,
    ),
    verified: asBoolean(
      pitch.verified || pitch.isVerified || pitch.is_verified,
    ),
    offers,
  };
}

async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Refresh failed");

      const data = await response.json();
      const tokens = extractTokens(data);

      if (!tokens.accessToken) throw new Error("Missing token");

      setAuthTokens(tokens);
      return tokens.accessToken;
    } catch (error) {
      // Clear tokens only once
      clearAuthTokens();
      return null;
    } finally {
      // Reset the promise after completion/failure
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  retry = true,
): Promise<T> {
  const token = getAccessToken();
  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "/application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401 && retry) {
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken) {
      const retryHeaders = new Headers(headers);
      retryHeaders.set("Authorization", `Bearer ${refreshedToken}`);

      try {
        return await apiRequest<T>(
          path,
          { ...options, headers: retryHeaders },
          false,
        );
      } catch (error: any) {
        // If the retry specifically fails with 401, force clear session
        if (error.message?.includes("401")) clearAuthTokens();
        throw error;
      }
    }
  }

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    const errorRecord = asRecord(body);
    const message = asString(
      errorRecord.message || errorRecord.error || errorRecord.detail,
      `Request failed with status ${response.status}`,
    );
    throw new Error(message);
  }

  return body as T;
}

function jsonRequest<T>(
  path: string,
  method: string,
  body?: unknown,
): Promise<T> {
  return apiRequest<T>(path, {
    method,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

function buildAuthResult(
  response: unknown,
  fallbackRole: UserRole,
): AuthResult {
  const tokens = extractTokens(response);
  if (tokens.accessToken) setAuthTokens(tokens);

  return {
    user: extractUser(response, fallbackRole),
    accessToken: tokens.accessToken,
  };
}

export const api = {
  login: async (credentials: LoginCredentials): Promise<AuthResult> => {
    const response = await jsonRequest("/auth/login", "POST", credentials);
    return buildAuthResult(response, credentials.role);
  },

  signup: async (data: SignupData): Promise<AuthResult> => {
    const response = await jsonRequest("/auth/register", "POST", {
      ...data,
      name: data.fullName,
      full_name: data.fullName,
    });
    return buildAuthResult(response, data.role);
  },

  logout: async (): Promise<void> => {
    try {
      await jsonRequest("/auth/logout", "POST");
    } finally {
      clearAuthTokens();
    }
  },

  restoreSession: async (): Promise<User | null> => {
    const accessToken = await refreshAccessToken();
    if (!accessToken) return null;
    const response = await apiRequest("/auth/me", {}, false);
    return extractUser(response);
  },

  requestPasswordReset: async (
    email: string,
  ): Promise<{ message: string; resetToken?: string }> => {
    const response = await jsonRequest("/auth/forgot-password", "POST", {
      email,
    });
    const record = asRecord(pickPayload(response));
    return {
      message: asString(
        record.message,
        "Password reset email sent successfully",
      ),
      resetToken: asString(
        record.resetToken || record.reset_token || record.token,
      ),
    };
  },

  validateResetToken: async (
    token: string,
  ): Promise<{ valid: boolean; email?: string }> => {
    const response = await jsonRequest("/auth/validate-reset-token", "POST", {
      token,
    });
    const record = asRecord(pickPayload(response));
    return {
      valid: asBoolean(record.valid, true),
      email: asString(record.email),
    };
  },

  resetPassword: async (
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> => {
    const response = await jsonRequest("/auth/reset-password", "POST", {
      token,
      password: newPassword,
      newPassword,
    });
    const record = asRecord(pickPayload(response));
    return { message: asString(record.message, "Password reset successfully") };
  },

  getPitches: async (): Promise<PitchCard[]> => {
    const response = await apiRequest("/pitches");
    return pickArray(response).map(normalizePitch);
  },

  getPitchById: async (id: string): Promise<PitchCard | null> => {
    const response = await apiRequest(`/pitches/${encodeURIComponent(id)}`);
    const payload = pickPayload(response);
    return payload ? normalizePitch(payload) : null;
  },

  getUserPitches: async (userId: string): Promise<PitchCard[]> => {
    const response = await apiRequest(
      `/users/${encodeURIComponent(userId)}/pitches`,
    );
    return pickArray(response).map(normalizePitch);
  },

  createPitch: async (pitch: Partial<PitchCard>): Promise<PitchCard> => {
    const response = await jsonRequest("/pitches", "POST", pitch);
    return normalizePitch(pickPayload(response));
  },

  updatePitch: async (
    id: string,
    updates: Partial<PitchCard>,
  ): Promise<PitchCard> => {
    const response = await jsonRequest(
      `/pitches/${encodeURIComponent(id)}`,
      "PATCH",
      updates,
    );
    return normalizePitch(pickPayload(response));
  },

  deletePitch: async (id: string): Promise<void> => {
    await jsonRequest(`/pitches/${encodeURIComponent(id)}`, "DELETE");
  },

  submitWeeklyProgress: async (
    payload: WeeklyProgressPayload,
  ): Promise<{ message: string }> => {
    const response = await jsonRequest(
      `/pitches/${encodeURIComponent(payload.pitchId)}/progress-updates`,
      "POST",
      {
        weekEnding: payload.weekEnding,
        week_ending: payload.weekEnding,
        summary: payload.summary,
        wins: payload.wins,
        blockers: payload.blockers,
        nextSteps: payload.nextSteps,
        next_steps: payload.nextSteps,
        metrics: payload.metrics,
      },
    );
    const record = asRecord(pickPayload(response));
    return {
      message: asString(record.message, "Weekly progress update submitted"),
    };
  },

  submitFundingOffer: async (
    pitchId: string,
    offer: Omit<FundingOffer, "id" | "createdAt">,
  ): Promise<FundingOffer> => {
    const response = await jsonRequest(
      `/pitches/${encodeURIComponent(pitchId)}/offers`,
      "POST",
      offer,
    );
    return normalizeOffer(pickPayload(response));
  },

  acceptFundingOffer: async (
    pitchId: string,
    offerId: string,
  ): Promise<PitchCard> => {
    const response = await jsonRequest(
      `/pitches/${encodeURIComponent(pitchId)}/offers/${encodeURIComponent(offerId)}/accept`,
      "POST",
    );
    return normalizePitch(pickPayload(response));
  },

  rejectFundingOffer: async (
    pitchId: string,
    offerId: string,
  ): Promise<void> => {
    await jsonRequest(
      `/pitches/${encodeURIComponent(pitchId)}/offers/${encodeURIComponent(offerId)}/reject`,
      "POST",
    );
  },

  likePitch: async (pitchId: string): Promise<void> => {
    await jsonRequest(`/pitches/${encodeURIComponent(pitchId)}/like`, "POST");
  },

  unlikePitch: async (pitchId: string): Promise<void> => {
    await jsonRequest(`/pitches/${encodeURIComponent(pitchId)}/like`, "DELETE");
  },

  bookmarkPitch: async (pitchId: string): Promise<void> => {
    await jsonRequest(
      `/pitches/${encodeURIComponent(pitchId)}/bookmark`,
      "POST",
    );
  },

  unbookmarkPitch: async (pitchId: string): Promise<void> => {
    await jsonRequest(
      `/pitches/${encodeURIComponent(pitchId)}/bookmark`,
      "DELETE",
    );
  },

  getCurrentUser: async (): Promise<User | null> => {
    if (!getAccessToken()) {
      const refreshedToken = await refreshAccessToken();
      if (!refreshedToken) return null;
    }
    const response = await apiRequest("/auth/me");
    return extractUser(response);
  },

  updateUser: async (userId: string, updates: Partial<User>): Promise<User> => {
    const response = await jsonRequest(
      `/users/${encodeURIComponent(userId)}`,
      "PATCH",
      updates,
    );
    return extractUser(response, updates.role);
  },

  updateVerificationStatus: async (
    userId: string,
    status: VerificationStatus,
  ): Promise<User> => {
    const response = await jsonRequest(
      `/users/${encodeURIComponent(userId)}/verification`,
      "PATCH",
      { status },
    );
    return extractUser(response);
  },
};

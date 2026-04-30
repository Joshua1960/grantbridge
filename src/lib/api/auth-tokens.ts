export interface AuthTokens {
  accessToken: string;
}

const LEGACY_ACCESS_TOKEN_KEY = 'grantbridge-access-token';
let inMemoryAccessToken: string | null = null;

function removeLegacyStoredToken() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
  window.sessionStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
}

removeLegacyStoredToken();

export function getAccessToken(): string | null {
  return inMemoryAccessToken;
}

export function setAuthTokens(tokens?: Partial<AuthTokens> | null) {
  removeLegacyStoredToken();
  inMemoryAccessToken = tokens?.accessToken || null;
}

export function clearAuthTokens() {
  inMemoryAccessToken = null;
  removeLegacyStoredToken();
}

import type { FundingOffer, PitchCard } from '../store';
import { fetchApi } from './api-client';

export interface WeeklyProgressPayload {
  pitchId: string;
  weekEnding: string;
  summary: string;
  wins: string;
  blockers?: string;
  nextSteps: string;
  metrics?: Record<string, string>;
}

export const api = {
  getPitches: async () => fetchApi<PitchCard[]>('/pitches'),

  getPitchById: async (id: string) =>
    fetchApi<PitchCard>(`/pitches/${encodeURIComponent(id)}`),

  getUserPitches: async (userId: string) =>
    fetchApi<PitchCard[]>(`/pitches?entrepreneurId=${encodeURIComponent(userId)}`),

  createPitch: async (pitch: Partial<PitchCard>) =>
    fetchApi<PitchCard>('/pitches', {
      method: 'POST',
      body: JSON.stringify(pitch),
    }),

  updatePitch: async (id: string, updates: Partial<PitchCard>) =>
    fetchApi<PitchCard>(`/pitches/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  deletePitch: async (id: string) =>
    fetchApi<{ success: boolean }>(`/pitches/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),

  likePitch: async (pitchId: string) =>
    fetchApi<PitchCard>(`/pitches/${encodeURIComponent(pitchId)}/like`, {
      method: 'PATCH',
    }),

  bookmarkPitch: async (pitchId: string) =>
    fetchApi<PitchCard>(`/pitches/${encodeURIComponent(pitchId)}/bookmark`, {
      method: 'PATCH',
    }),

  submitFundingOffer: async (
    pitchId: string,
    offer: Omit<FundingOffer, 'id' | 'createdAt'>,
  ) =>
    fetchApi<PitchCard>('/offers', {
      method: 'POST',
      body: JSON.stringify({ pitchId, ...offer }),
    }),

  acceptFundingOffer: async (pitchId: string, offerId: string) =>
    fetchApi<PitchCard>(`/offers/${encodeURIComponent(offerId)}`, {
      method: 'PUT',
      body: JSON.stringify({ pitchId, status: 'accepted' }),
    }),

  rejectFundingOffer: async (pitchId: string, offerId: string) =>
    fetchApi<PitchCard>(`/offers/${encodeURIComponent(offerId)}`, {
      method: 'PUT',
      body: JSON.stringify({ pitchId, status: 'rejected' }),
    }),

  submitWeeklyProgress: async (payload: WeeklyProgressPayload) =>
    fetchApi('/progress', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getWeeklyProgress: async () => fetchApi<WeeklyProgressPayload[]>('/progress'),
};

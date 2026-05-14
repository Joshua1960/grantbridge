import type { FundingOffer, PitchCard } from '../store';

export interface WeeklyProgressPayload {
  pitchId: string;
  weekEnding: string;
  summary: string;
  wins: string;
  blockers?: string;
  nextSteps: string;
  metrics?: Record<string, string>;
}

const initialPitches: PitchCard[] = [
  {
    id: 'pitch-01',
    title: 'AgriConnect — Sustainable Crop Financing',
    description:
      'A digital marketplace that connects smallholder farmers to ethical capital for crop production, input financing, and market access.',
    category: 'AgriTech',
    fundingGoal: 4200000,
    fundingStatus: 'open',
    entrepreneurId: 'user-01',
    entrepreneurName: 'Sochi Nakolisa',
    entrepreneurAvatar: '',
    companyName: 'AgriConnect',
    location: 'Lagos',
    createdAt: '2025-02-05',
    tags: ['AgriTech', 'FinTech', 'Sustainability'],
    stage: 'growth',
    likes: 124,
    views: 3210,
    image: '/images/pitch-1.jpg',
    verified: true,
  },
  {
    id: 'pitch-02',
    title: 'HealthCart — Mobile Pharmacy Supply Chain',
    description:
      'A mobile-first logistics platform that delivers pharmaceutical products and healthcare supplies directly to clinics and patients in underserved communities.',
    category: 'HealthTech',
    fundingGoal: 6500000,
    fundingStatus: 'in_review',
    entrepreneurId: 'user-02',
    entrepreneurName: 'Adaeze Okafor',
    entrepreneurAvatar: '',
    companyName: 'HealthCart',
    location: 'Abuja',
    createdAt: '2025-01-18',
    tags: ['HealthTech', 'Logistics', 'E-Commerce'],
    stage: 'mvp',
    likes: 87,
    views: 1920,
    image: '/images/pitch-2.jpg',
    verified: true,
  },
  {
    id: 'pitch-03',
    title: 'EcoVault — Waste-to-Energy Recycling',
    description:
      'A circular economy startup turning industrial waste into clean energy for manufacturing plants and local communities.',
    category: 'Clean Energy',
    fundingGoal: 8200000,
    fundingStatus: 'funded',
    entrepreneurId: 'user-03',
    entrepreneurName: 'Kemi Adeyemi',
    entrepreneurAvatar: '',
    companyName: 'EcoVault',
    location: 'Port Harcourt',
    createdAt: '2024-11-20',
    tags: ['Clean Energy', 'Circular Economy', 'Sustainability'],
    stage: 'scale',
    likes: 219,
    views: 4520,
    image: '/images/pitch-3.jpg',
    verified: true,
    fundedBy: {
      funderId: 'funder-01',
      funderName: 'Naira Ventures',
      funderCompany: 'Naira Ventures',
      fundedAmount: 8200000,
      fundedDate: '2025-01-12',
    },
  },
  {
    id: 'pitch-04',
    title: 'EduPath — Personalized Learning Journeys',
    description:
      'An adaptive learning platform that delivers personalized curricula and mentorship for students across secondary and vocational schools.',
    category: 'EdTech',
    fundingGoal: 3100000,
    fundingStatus: 'open',
    entrepreneurId: 'user-04',
    entrepreneurName: 'Chinedu Emeka',
    entrepreneurAvatar: '',
    companyName: 'EduPath',
    location: 'Ibadan',
    createdAt: '2025-03-01',
    tags: ['EdTech', 'AI', 'Learning'],
    stage: 'idea',
    likes: 56,
    views: 1290,
    image: '/images/pitch-4.jpg',
    verified: false,
  },
  {
    id: 'pitch-05',
    title: 'FashionLoop — Circular Fashion Marketplace',
    description:
      'A responsible fashion marketplace for resale, rental, and circular apparel designed for the African market.',
    category: 'Fashion & Textile',
    fundingGoal: 2300000,
    fundingStatus: 'closed',
    entrepreneurId: 'user-05',
    entrepreneurName: 'Tara Bello',
    entrepreneurAvatar: '',
    companyName: 'FashionLoop',
    location: 'Kano',
    createdAt: '2024-12-02',
    tags: ['Fashion', 'Circular Economy', 'Marketplace'],
    stage: 'growth',
    likes: 178,
    views: 2840,
    image: '/images/pitch-5.jpg',
    verified: true,
  },
  {
    id: 'pitch-06',
    title: 'BuildBridge — Contractor Network for SMEs',
    description:
      'A marketplace connecting trusted construction contractors with SMEs and property developers for project delivery and capacity building.',
    category: 'Construction',
    fundingGoal: 5400000,
    fundingStatus: 'open',
    entrepreneurId: 'user-06',
    entrepreneurName: 'Musa Ibrahim',
    entrepreneurAvatar: '',
    companyName: 'BuildBridge',
    location: 'Kaduna',
    createdAt: '2025-02-24',
    tags: ['Construction', 'Marketplace', 'SMB'],
    stage: 'mvp',
    likes: 102,
    views: 2180,
    image: '/images/pitch-6.jpg',
    verified: false,
  },
];

let pitches = [...initialPitches];

function delay<T>(value: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function findPitchById(id: string) {
  return pitches.find((pitch) => pitch.id === id) || null;
}

function createPitchRecord(pitch: Partial<PitchCard>): PitchCard {
  return {
    id: `pitch-${Math.random().toString(36).slice(2, 10)}`,
    title: pitch.title?.trim() || 'Untitled project',
    description: pitch.description?.trim() || 'No project description available.',
    category: pitch.category || 'Other',
    fundingGoal: pitch.fundingGoal || 0,
    fundingStatus: 'open',
    entrepreneurId: pitch.entrepreneurId || 'user-unknown',
    entrepreneurName: pitch.entrepreneurName || 'Unknown Founder',
    entrepreneurAvatar: pitch.entrepreneurAvatar || '',
    companyName: pitch.companyName || 'Unknown Company',
    location: pitch.location || 'Remote',
    createdAt: new Date().toISOString().slice(0, 10),
    tags: pitch.tags || [],
    stage: pitch.stage || 'idea',
    likes: pitch.likes || 0,
    views: pitch.views || 0,
    image: pitch.image || '/images/pitch-1.jpg',
    verified: pitch.verified ?? false,
    fundedBy: pitch.fundedBy,
    offers: pitch.offers || [],
  };
}

export const api = {
  getPitches: async () => delay([...pitches]),

  getPitchById: async (id: string) => delay(findPitchById(id)),

  getUserPitches: async (userId: string) =>
    delay(
      userId
        ? pitches.filter((pitch) => pitch.entrepreneurId === userId)
        : [...pitches],
    ),

  createPitch: async (pitch: Partial<PitchCard>) => {
    const newPitch = createPitchRecord(pitch);
    pitches = [newPitch, ...pitches];
    return delay(newPitch);
  },

  updatePitch: async (id: string, updates: Partial<PitchCard>) => {
    const index = pitches.findIndex((pitch) => pitch.id === id);
    if (index === -1) throw new Error('Project not found');

    pitches[index] = {
      ...pitches[index],
      ...updates,
      tags: updates.tags ?? pitches[index].tags,
      fundedBy: updates.fundedBy ?? pitches[index].fundedBy,
      offers: updates.offers ?? pitches[index].offers,
    };

    return delay(pitches[index]);
  },

  deletePitch: async (id: string) => {
    pitches = pitches.filter((pitch) => pitch.id !== id);
    return delay(true);
  },

  likePitch: async (pitchId: string) => {
    const pitch = findPitchById(pitchId);
    if (!pitch) throw new Error('Project not found');
    pitch.likes += 1;
    return delay(pitch);
  },

  bookmarkPitch: async (pitchId: string) => {
    const pitch = findPitchById(pitchId);
    if (!pitch) throw new Error('Project not found');
    return delay(pitch);
  },

  submitFundingOffer: async (
    pitchId: string,
    offer: Omit<FundingOffer, 'id' | 'createdAt'>,
  ) => {
    const pitch = findPitchById(pitchId);
    if (!pitch) throw new Error('Project not found');

    const newOffer: FundingOffer = {
      ...offer,
      id: `offer-${Math.random().toString(36).slice(2, 10)}`,
      createdAt: new Date().toISOString(),
    };

    pitch.offers = [...(pitch.offers || []), newOffer];
    return delay(pitch);
  },

  acceptFundingOffer: async (pitchId: string, offerId: string) => {
    const pitch = findPitchById(pitchId);
    if (!pitch) throw new Error('Project not found');
    const offer = pitch.offers?.find((item) => item.id === offerId);
    if (!offer) throw new Error('Offer not found');

    pitch.fundingStatus = 'funded';
    pitch.fundedBy = {
      funderId: offer.funderId,
      funderName: offer.funderName,
      funderCompany: offer.funderCompany,
      fundedAmount: offer.amount,
      fundedDate: new Date().toISOString().slice(0, 10),
    };

    return delay(pitch);
  },

  rejectFundingOffer: async (pitchId: string, offerId: string) => {
    const pitch = findPitchById(pitchId);
    if (!pitch) throw new Error('Project not found');
    pitch.offers = pitch.offers?.filter((item) => item.id !== offerId) || [];
    return delay(pitch);
  },

  submitWeeklyProgress: async (_payload: WeeklyProgressPayload) =>
    delay({ success: true }),
};

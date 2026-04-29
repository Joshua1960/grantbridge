// Mock API layer for GrantBridge
import type { User, PitchCard, VerificationStatus, FundingOffer } from '../store';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data - Single-funder model (exact amount, one-time funding)
const mockPitches: PitchCard[] = [
  {
    id: '1',
    title: 'AfriWeave — Handcrafted Textile Marketplace',
    description: 'An online marketplace connecting local weavers and textile artisans with global buyers. Preserving cultural heritage while creating sustainable income for over 200 artisans across Nigeria.',
    category: 'Fashion & Textile',
    fundingGoal: 8500000,
    fundingStatus: 'open',
    entrepreneurId: 'ent_001',
    entrepreneurName: 'Adaeze Okafor',
    entrepreneurAvatar: '',
    companyName: 'AfriWeave Ltd.',
    location: 'Lagos',
    createdAt: '2025-01-18',
    tags: ['Fashion', 'Marketplace', 'Artisan', 'Export'],
    stage: 'mvp',
    likes: 312,
    views: 2450,
    image: '',
    verified: true,
  },
  {
    id: '2',
    title: 'MediTrack — AI-Powered Drug Supply Chain',
    description: 'Using blockchain and AI to track pharmaceutical supply chains across Nigeria, reducing counterfeit drugs by 90%. Already piloted in 3 states with NAFDAC partnership.',
    category: 'HealthTech',
    fundingGoal: 12000000,
    fundingStatus: 'funded',
    fundedBy: {
      funderId: 'funder_001',
      funderName: 'Sarah Williams',
      funderCompany: 'Venture Capital Partners',
      fundedAmount: 12000000,
      fundedDate: '2024-12-15',
    },
    entrepreneurId: 'ent_002',
    entrepreneurName: 'Dr. Emeka Asante',
    entrepreneurAvatar: '',
    companyName: 'MediTrack Health',
    location: 'Abuja',
    createdAt: '2024-11-20',
    tags: ['AI', 'Blockchain', 'Healthcare', 'Supply Chain'],
    stage: 'growth',
    likes: 412,
    views: 3200,
    image: '',
    verified: true,
  },
  {
    id: '3',
    title: 'FarmLink — Connecting Farmers to Markets',
    description: 'A mobile-first marketplace that connects smallholder farmers directly to retailers and restaurants, eliminating middlemen and increasing farmer income by 40% across the South-West.',
    category: 'AgriTech',
    fundingGoal: 5000000,
    fundingStatus: 'open',
    entrepreneurId: 'ent_003',
    entrepreneurName: 'Fatima Diallo',
    entrepreneurAvatar: '',
    companyName: 'FarmLink Technologies',
    location: 'Lagos',
    createdAt: '2025-01-05',
    tags: ['Agriculture', 'Marketplace', 'Mobile', 'Impact'],
    stage: 'idea',
    likes: 156,
    views: 980,
    image: '',
    verified: true,
  },
  {
    id: '4',
    title: 'LearnBridge — Adaptive EdTech Platform',
    description: 'AI-driven learning platform that personalizes education for secondary school students in low-bandwidth environments. Works offline and adapts to each student learning pace.',
    category: 'EdTech',
    fundingGoal: 6500000,
    fundingStatus: 'in_review',
    entrepreneurId: 'ent_004',
    entrepreneurName: 'James Mwangi',
    entrepreneurAvatar: '',
    companyName: 'LearnBridge Education',
    location: 'Port Harcourt',
    createdAt: '2024-10-28',
    tags: ['Education', 'AI', 'Offline-first', 'Students'],
    stage: 'mvp',
    likes: 389,
    views: 2750,
    image: '',
    verified: true,
    offers: [
      {
        id: 'offer_001',
        funderId: 'funder_002',
        funderName: 'David Chen',
        funderCompany: 'EdTech Ventures',
        amount: 6500000,
        message: 'We love your vision for accessible education. Looking forward to partnering with you.',
        status: 'pending',
        createdAt: '2025-01-20',
      },
    ],
  },
  {
    id: '5',
    title: 'PayFlow — Instant Cross-Border Payments',
    description: 'Enabling instant, low-cost cross-border payments using stablecoin rails. Transaction fees 80% lower than traditional remittance services. Licensed by CBN.',
    category: 'FinTech',
    fundingGoal: 25000000,
    fundingStatus: 'funded',
    fundedBy: {
      funderId: 'funder_003',
      funderName: 'Michael Roberts',
      funderCompany: 'FinTech Global Fund',
      fundedAmount: 25000000,
      fundedDate: '2024-10-01',
    },
    entrepreneurId: 'ent_005',
    entrepreneurName: 'Nadia Benali',
    entrepreneurAvatar: '',
    companyName: 'PayFlow Finance',
    location: 'Lagos',
    createdAt: '2024-09-15',
    tags: ['Payments', 'Crypto', 'Remittance', 'Cross-border'],
    stage: 'scale',
    likes: 567,
    views: 4100,
    image: '',
    verified: true,
  },
  {
    id: '6',
    title: 'GreenBuild — Sustainable Construction Materials',
    description: 'Manufacturing affordable, eco-friendly building materials from recycled plastic waste. Each home built saves 20 tons of plastic from landfills. Operating in 3 states.',
    category: 'Construction',
    fundingGoal: 15000000,
    fundingStatus: 'open',
    entrepreneurId: 'ent_006',
    entrepreneurName: 'Tendai Moyo',
    entrepreneurAvatar: '',
    companyName: 'GreenBuild Materials',
    location: 'Ibadan',
    createdAt: '2025-01-12',
    tags: ['Recycling', 'Construction', 'Sustainability', 'Housing'],
    stage: 'idea',
    likes: 198,
    views: 1340,
    image: '',
    verified: true,
  },
  {
    id: '7',
    title: 'AquaPure — Smart Water Purification Systems',
    description: 'IoT-enabled water purification systems for communities without clean water access. Solar-powered, self-monitoring, and costs 70% less than alternatives.',
    category: 'Clean Energy',
    fundingGoal: 9000000,
    fundingStatus: 'open',
    entrepreneurId: 'ent_007',
    entrepreneurName: 'Blessing Okonkwo',
    entrepreneurAvatar: '',
    companyName: 'AquaPure Systems',
    location: 'Abuja',
    createdAt: '2024-11-01',
    tags: ['Water', 'IoT', 'Solar', 'Community'],
    stage: 'growth',
    likes: 445,
    views: 2980,
    image: '',
    verified: true,
  },
  {
    id: '8',
    title: 'StyleHub — AI Fashion Marketplace',
    description: 'AI-powered fashion marketplace showcasing Nigerian designers to the global market. Virtual try-on technology and personalized styling recommendations for Ankara and Adire.',
    category: 'Fashion & Textile',
    fundingGoal: 7000000,
    fundingStatus: 'open',
    entrepreneurId: 'ent_008',
    entrepreneurName: 'Zara Mensah',
    entrepreneurAvatar: '',
    companyName: 'StyleHub Africa',
    location: 'Lagos',
    createdAt: '2025-01-20',
    tags: ['Fashion', 'AI', 'E-Commerce', 'Ankara'],
    stage: 'mvp',
    likes: 278,
    views: 1650,
    image: '',
    verified: true,
  },
  {
    id: '9',
    title: 'KekeElectric — Electric Tricycle Fleet',
    description: 'Converting traditional keke napep fleets to electric with battery-swap stations. Reducing emissions and operational costs for drivers by 55% in urban areas.',
    category: 'Clean Energy',
    fundingGoal: 18000000,
    fundingStatus: 'open',
    entrepreneurId: 'ent_009',
    entrepreneurName: 'Chinedu Okoro',
    entrepreneurAvatar: '',
    companyName: 'KekeElectric Motors',
    location: 'Kano',
    createdAt: '2024-12-05',
    tags: ['EV', 'Transport', 'Sustainability', 'Urban'],
    stage: 'mvp',
    likes: 534,
    views: 3800,
    image: '',
    verified: true,
  },
  {
    id: '10',
    title: 'NaijaFresh — Farm-to-Table Delivery',
    description: 'Cold-chain logistics platform delivering fresh produce from farms to restaurants and homes within 24 hours. Reducing food waste by 60% across the supply chain.',
    category: 'AgriTech',
    fundingGoal: 4500000,
    fundingStatus: 'open',
    entrepreneurId: 'ent_010',
    entrepreneurName: 'Oluwaseun Adeyemi',
    entrepreneurAvatar: '',
    companyName: 'NaijaFresh Logistics',
    location: 'Lagos',
    createdAt: '2025-01-08',
    tags: ['Logistics', 'Agriculture', 'Cold-chain', 'Delivery'],
    stage: 'idea',
    likes: 201,
    views: 1120,
    image: '',
    verified: true,
  },
  {
    id: '11',
    title: 'AdireGlobal — Premium Textile Export Brand',
    description: 'Luxury fashion brand built on traditional Adire textile techniques. Exporting to 12 countries with partnerships in London, Paris and New York fashion weeks.',
    category: 'Fashion & Textile',
    fundingGoal: 10000000,
    fundingStatus: 'open',
    entrepreneurId: 'ent_011',
    entrepreneurName: 'Yetunde Bakare',
    entrepreneurAvatar: '',
    companyName: 'AdireGlobal Fashion',
    location: 'Abeokuta',
    createdAt: '2024-10-15',
    tags: ['Fashion', 'Export', 'Luxury', 'Adire'],
    stage: 'growth',
    likes: 623,
    views: 4500,
    image: '',
    verified: true,
  },
  {
    id: '12',
    title: 'CashCrop — Micro-Insurance for Farmers',
    description: 'Weather-indexed micro-insurance platform for smallholder farmers. Using satellite data and AI to automate claims. Protecting over 5,000 farmers across Northern Nigeria.',
    category: 'FinTech',
    fundingGoal: 8000000,
    fundingStatus: 'open',
    entrepreneurId: 'ent_012',
    entrepreneurName: 'Ibrahim Yusuf',
    entrepreneurAvatar: '',
    companyName: 'CashCrop Insurance',
    location: 'Kaduna',
    createdAt: '2024-12-22',
    tags: ['Insurance', 'Agriculture', 'AI', 'Satellite'],
    stage: 'mvp',
    likes: 345,
    views: 2100,
    image: '',
    verified: true,
  },
];

interface LoginCredentials {
  email: string;
  password: string;
  role: 'entrepreneur' | 'funder';
}

interface SignupData extends LoginCredentials {
  fullName: string;
  company?: string;
}

// API functions
export const api = {
  // Auth
  login: async (credentials: LoginCredentials): Promise<User> => {
    await delay(800);
    
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    return {
      id: '1',
      email: credentials.email,
      fullName: credentials.role === 'entrepreneur' ? 'Alex Johnson' : 'Sarah Williams',
      role: credentials.role,
      company: credentials.role === 'entrepreneur' ? 'InnovateTech' : 'Venture Capital Partners',
      verificationStatus: 'verified',
    };
  },

  signup: async (data: SignupData): Promise<User> => {
    await delay(1000);
    
    if (!data.email || !data.password || !data.fullName) {
      throw new Error('All fields are required');
    }

    return {
      id: '2',
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      company: data.company,
      verificationStatus: 'pending',
    };
  },

  logout: async (): Promise<void> => {
    await delay(300);
  },

  // Password Reset
  requestPasswordReset: async (email: string): Promise<{ message: string; resetToken: string }> => {
    await delay(800);
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    return {
      message: 'Password reset email sent successfully',
      resetToken: `reset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  },

  validateResetToken: async (token: string): Promise<{ valid: boolean; email?: string }> => {
    await delay(400);
    
    if (!token || !token.startsWith('reset_')) {
      return { valid: false };
    }

    return {
      valid: true,
      email: 'user@example.com',
    };
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    await delay(1000);
    
    if (!token || !token.startsWith('reset_')) {
      throw new Error('Invalid or expired reset token');
    }

    if (!newPassword || newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    return {
      message: 'Password reset successfully',
    };
  },

  // Pitches
  getPitches: async (): Promise<PitchCard[]> => {
    await delay(600);
    return mockPitches;
  },

  getPitchById: async (id: string): Promise<PitchCard | null> => {
    await delay(400);
    return mockPitches.find(p => p.id === id) || null;
  },

  getUserPitches: async (_userId: string): Promise<PitchCard[]> => {
    await delay(500);
    return mockPitches.slice(0, 3);
  },

  createPitch: async (pitch: Partial<PitchCard>): Promise<PitchCard> => {
    await delay(1000);
    
    const newPitch: PitchCard = {
      id: Date.now().toString(),
      title: pitch.title || '',
      description: pitch.description || '',
      category: pitch.category || 'Other',
      fundingGoal: pitch.fundingGoal || 0,
      fundingStatus: 'open',
      entrepreneurId: pitch.entrepreneurId || 'ent_new',
      entrepreneurName: pitch.entrepreneurName || '',
      entrepreneurAvatar: '',
      companyName: pitch.companyName || '',
      location: pitch.location || '',
      createdAt: new Date().toISOString(),
      tags: pitch.tags || [],
      stage: pitch.stage || 'idea',
      likes: 0,
      views: 0,
      image: '',
      verified: false,
    };

    return newPitch;
  },

  updatePitch: async (id: string, updates: Partial<PitchCard>): Promise<PitchCard> => {
    await delay(800);
    
    const pitch = mockPitches.find(p => p.id === id);
    if (!pitch) throw new Error('Pitch not found');

    return { ...pitch, ...updates };
  },

  deletePitch: async (_id: string): Promise<void> => {
    await delay(500);
  },

  // Funding Operations (Single-funder model)
  submitFundingOffer: async (pitchId: string, offer: Omit<FundingOffer, 'id' | 'createdAt'>): Promise<FundingOffer> => {
    await delay(800);
    
    const pitch = mockPitches.find(p => p.id === pitchId);
    if (!pitch) throw new Error('Pitch not found');
    
    if (pitch.fundingStatus !== 'open') {
      throw new Error('This project is not accepting funding offers');
    }

    const newOffer: FundingOffer = {
      ...offer,
      id: `offer_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    return newOffer;
  },

  acceptFundingOffer: async (pitchId: string, offerId: string): Promise<PitchCard> => {
    await delay(1000);
    
    const pitch = mockPitches.find(p => p.id === pitchId);
    if (!pitch) throw new Error('Pitch not found');

    const offer = pitch.offers?.find(o => o.id === offerId);
    if (!offer) throw new Error('Offer not found');

    // Update pitch to funded status
    const updatedPitch: PitchCard = {
      ...pitch,
      fundingStatus: 'funded',
      fundedBy: {
        funderId: offer.funderId,
        funderName: offer.funderName,
        funderCompany: offer.funderCompany,
        fundedAmount: offer.amount,
        fundedDate: new Date().toISOString(),
      },
    };

    return updatedPitch;
  },

  rejectFundingOffer: async (pitchId: string, offerId: string): Promise<void> => {
    await delay(500);
    
    const pitch = mockPitches.find(p => p.id === pitchId);
    if (!pitch) throw new Error('Pitch not found');

    const offer = pitch.offers?.find(o => o.id === offerId);
    if (!offer) throw new Error('Offer not found');
  },

  // Interactions
  likePitch: async (_pitchId: string): Promise<void> => {
    await delay(300);
  },

  unlikePitch: async (_pitchId: string): Promise<void> => {
    await delay(300);
  },

  bookmarkPitch: async (_pitchId: string): Promise<void> => {
    await delay(300);
  },

  unbookmarkPitch: async (_pitchId: string): Promise<void> => {
    await delay(300);
  },

  // User
  getCurrentUser: async (): Promise<User | null> => {
    await delay(400);
    return null;
  },

  updateUser: async (userId: string, updates: Partial<User>): Promise<User> => {
    await delay(700);
    
    return {
      id: userId,
      email: 'user@example.com',
      fullName: 'User Name',
      role: 'entrepreneur',
      verificationStatus: 'verified',
      ...updates,
    };
  },

  updateVerificationStatus: async (userId: string, status: VerificationStatus): Promise<User> => {
    await delay(600);
    
    return {
      id: userId,
      email: 'user@example.com',
      fullName: 'User Name',
      role: 'entrepreneur',
      verificationStatus: status,
    };
  },
};


export enum AppView {
  LANDING,
  ONBOARDING,
  PROFILE,
}

export enum UserTier {
  STAFF_PARTNER = 'UTO™ Staff/Partner',
  VERIFIED_INDIVIDUAL = 'Verified Individual',
  VERIFIED_ORGANIZATION = 'Verified Organization',
  GUEST = 'Non-UTO / Guest',
}

export enum PoliticalAffiliation {
  REPUBLICAN = 'Republican',
  DEMOCRAT = 'Democrat',
  THIRD_PARTY = 'Third Party™',
  AMERIDAN_PARTY = 'Ameridan Party™',
  INDEPENDENT = 'Independent',
  OTHER = 'Other',
  NON_US_CITIZEN = 'Non-US Citizen',
  NON_POLITICAL = 'Non-Political',
  NON_DISCLOSED = 'Non-Disclosed',
}

export interface ProfileData {
  fullName: string;
  displayName: string;
  profilePicture: string | null;
  bio: string;
  location: string;
  tier: UserTier;
  politicalAffiliation: PoliticalAffiliation | null;
  socialLinks: Record<string, string>;
  is2FAEnabled: boolean;
  isIdVerified: boolean;
}

export const initialProfileData: ProfileData = {
  fullName: 'Jordan O\'Hara',
  displayName: 'Fisher Braun',
  profilePicture: 'https://i.ibb.co/6r0hV2d/carthy.png',
  bio: 'Founder & CEO at Utopia Communities™. Building the future of digital identity and interconnected ecosystems. No idle losers.',
  location: 'Utopia, Earth',
  tier: UserTier.STAFF_PARTNER,
  politicalAffiliation: PoliticalAffiliation.AMERIDAN_PARTY,
  socialLinks: {
    twitter: 'https://twitter.com/utocomm',
    linkedin: 'https://linkedin.com/in/utocomm',
  },
  is2FAEnabled: true,
  isIdVerified: true,
};

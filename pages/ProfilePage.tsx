
import React, { useState } from 'react';
import { ProfileData, UserTier } from '../types';
import Icon, { IconName } from '../components/Icon';
import Chatbot from '../components/Chatbot';

interface ProfilePageProps {
  profile: ProfileData;
  onEdit: () => void;
}

const ProfileHeader: React.FC<{ profile: ProfileData }> = ({ profile }) => {
  let badgeColor = 'bg-gray-500';
  let badgeText = 'Unverified';

  if (profile.tier === UserTier.STAFF_PARTNER) {
    if (profile.displayName === 'Fisher Braun') { // Example for Partner
         badgeColor = 'bg-blue-500';
         badgeText = 'Partner';
    } else { // Example for Staff
        badgeColor = 'bg-red-500';
        badgeText = 'Staff';
    }
  } else if (profile.isIdVerified) {
    badgeColor = 'bg-yellow-500';
    badgeText = 'Verified';
  }

  return (
    <div className="text-center p-6">
      <div className="relative inline-block">
        <img
          src={profile.profilePicture || `https://picsum.photos/seed/${profile.displayName}/128/128`}
          alt={profile.displayName}
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-700 shadow-lg"
        />
         <span className={`absolute bottom-4 right-2 block h-6 w-6 rounded-full ${profile.is2FAEnabled ? 'bg-green-500' : 'bg-red-500'} border-4 border-gray-800 ring-2 ring-gray-700`}></span>
      </div>

      <div className="flex items-center justify-center gap-2">
        <h1 className="text-3xl font-bold text-white">{profile.displayName}</h1>
        <div className={`flex items-center text-white text-xs font-bold px-2 py-1 rounded-full ${badgeColor}`}>
          <Icon name="badgeCheck" size={12} className="mr-1" />
          {badgeText}
        </div>
      </div>
      <p className="text-gray-400 mt-1">@{profile.fullName.toLowerCase().replace(' ','')}</p>
      <p className="text-gray-300 mt-4 max-w-xl mx-auto">{profile.bio}</p>
    </div>
  );
};

interface SocialLinkProps {
  icon: IconName;
  label: string;
  url: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, label, url }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className="bg-gray-800/70 border border-gray-700 hover:border-orange-500/50 hover:bg-gray-700/80 transition-all duration-300 rounded-lg p-3 flex items-center justify-center space-x-2 text-white font-semibold">
        <Icon name={icon} size={20} />
        <span>{label}</span>
    </a>
);


const CTAButton: React.FC<{ text: string, icon: IconName }> = ({ text, icon }) => (
    <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 px-6 rounded-lg text-md hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
        <Icon name={icon} size={20} />
        {text}
    </button>
);


const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onEdit }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <ProfileHeader profile={profile} />

      <div className="my-8 space-y-4">
        <CTAButton text="Chat with AI Persona" icon="messageSquare" onClick={() => setIsChatbotOpen(true)} />
        <CTAButton text="Subscribe" icon="star" />
      </div>

      <div className="grid grid-cols-2 gap-4 my-8">
        <SocialLink icon="twitter" label="Twitter / X" url={profile.socialLinks.twitter || "#"} />
        <SocialLink icon="linkedin" label="LinkedIn" url={profile.socialLinks.linkedin || "#"} />
        <SocialLink icon="github" label="GitHub" url="#" />
        <SocialLink icon="globe" label="Website" url="#" />
      </div>
      
       <div className="my-8">
        <h2 className="text-xl font-bold text-white mb-4 text-center">Top Nine</h2>
        <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                    <img src={`https://picsum.photos/seed/${profile.displayName}${i}/200/200`} className="w-full h-full object-cover" alt={`Top photo ${i+1}`} />
                </div>
            ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <button onClick={onEdit} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
          Edit Your UTO⌘Bio Profile
        </button>
      </div>

      {isChatbotOpen && <Chatbot profile={profile} onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
};

export default ProfilePage;

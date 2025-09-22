
import React, { useState } from 'react';
import { ProfileData, UserTier, PoliticalAffiliation, initialProfileData } from '../types';
import Icon from '../components/Icon';

interface OnboardingPageProps {
  onComplete: (data: ProfileData) => void;
}

const steps = [
  'Account Type',
  'Subscription',
  'Security (2FA)',
  'Basic Info',
  'Affiliation',
  'Review & Publish',
];

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProfileData>(initialProfileData);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof ProfileData, value: any) => {
    setFormData(prev => ({...prev, [name]: value}));
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AccountTypeStep onNext={nextStep} />;
      case 1:
        return <SubscriptionStep onNext={nextStep} onBack={prevStep} formData={formData} setFormData={setFormData}/>;
      case 2:
        return <SecurityStep onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <BasicInfoStep onNext={nextStep} onBack={prevStep} formData={formData} handleInputChange={handleInputChange}/>;
      case 4:
        return <AffiliationStep onNext={nextStep} onBack={prevStep} formData={formData} handleSelectChange={handleSelectChange} />;
      case 5:
        return <ReviewStep onComplete={() => onComplete(formData)} onBack={prevStep} formData={formData}/>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-12">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-white">Welcome to UTO⌘Bio</h1>
            <p className="text-center text-gray-400 mt-2">Create your unified digital identity.</p>
        </div>
        <div className="mb-8 px-4">
            <div className="flex items-center">
                {steps.map((step, index) => (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${index <= currentStep ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                                {index < currentStep ? <Icon name="checkCircle" size={16} /> : index + 1}
                            </div>
                            <p className={`mt-2 text-xs text-center ${index <= currentStep ? 'text-white' : 'text-gray-500'}`}>{step}</p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-1 transition-all duration-300 ${index < currentStep ? 'bg-orange-600' : 'bg-gray-700'}`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
            {renderStep()}
        </div>
    </div>
  );
};

const AccountTypeStep: React.FC<{onNext: () => void}> = ({onNext}) => (
    <div>
        <h2 className="text-2xl font-bold text-white mb-4">First, who are you?</h2>
        <p className="text-gray-400 mb-6">This will help us tailor your UTO⌘Bio experience.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={onNext} className="text-left p-4 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-orange-500 transition-colors">
                <Icon name="user" className="mb-2 text-orange-500" />
                <h3 className="font-bold text-white">Individual</h3>
                <p className="text-sm text-gray-400">For personal brands, celebrities, and community members.</p>
            </button>
            <button onClick={onNext} className="text-left p-4 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-orange-500 transition-colors">
                 <Icon name="building" className="mb-2 text-orange-500" />
                <h3 className="font-bold text-white">Organization</h3>
                <p className="text-sm text-gray-400">For corporate entities, partners, and official groups.</p>
            </button>
        </div>
    </div>
);

const SubscriptionStep: React.FC<{onNext: ()=>void, onBack: ()=>void, formData: ProfileData, setFormData: React.Dispatch<React.SetStateAction<ProfileData>>}> = ({ onNext, onBack, formData, setFormData }) => {
    const tiers = [
        { name: UserTier.STAFF_PARTNER, price: "Free", features: ["All features unlocked"], id: UserTier.STAFF_PARTNER },
        { name: UserTier.VERIFIED_INDIVIDUAL, price: "$499.99/year", features: ["Full access for non-staff"], id: UserTier.VERIFIED_INDIVIDUAL },
        { name: UserTier.VERIFIED_ORGANIZATION, price: "$1,654/year", features: ["Full access for organizations"], id: UserTier.VERIFIED_ORGANIZATION },
        { name: UserTier.GUEST, price: "$185.99/year", features: ["Basic access, fewer perks"], id: UserTier.GUEST },
    ];
    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">Choose Your Access Tier</h2>
            <div className="space-y-4 mb-6">
                {tiers.map(tier => (
                    <div key={tier.id} onClick={() => setFormData(p => ({...p, tier: tier.id}))} className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.tier === tier.id ? 'border-orange-500 bg-orange-500/10' : 'border-gray-600 hover:border-gray-500'}`}>
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-white">{tier.name}</h3>
                            <p className="font-bold text-orange-500">{tier.price}</p>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{tier.features[0]}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">Back</button>
                <button onClick={onNext} className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700">Next</button>
            </div>
        </div>
    );
};

const SecurityStep: React.FC<{onNext: ()=>void, onBack: ()=>void}> = ({ onNext, onBack }) => (
    <div>
        <h2 className="text-2xl font-bold text-white mb-2">Secure Your Account</h2>
        <p className="text-gray-400 mb-6">Two-Factor Authentication (2FA) is mandatory to activate your profile.</p>
        <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white p-2 rounded-lg">
                <Icon name="qrCode" size={128} className="text-black" />
            </div>
            <div className="flex-1">
                <p className="text-gray-300 mb-2">1. Scan this QR code with your authenticator app (e.g., 2FAS, Google Authenticator).</p>
                <p className="text-gray-300 mb-4">2. Enter the 6-digit code from the app to verify.</p>
                 <input type="text" placeholder="123456" maxLength={6} className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 font-jetbrains tracking-widest text-center" />
            </div>
        </div>
        <div className="flex justify-between mt-8">
            <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">Back</button>
            <button onClick={onNext} className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700">Verify & Continue</button>
        </div>
    </div>
);

const BasicInfoStep: React.FC<{onNext: ()=>void, onBack: ()=>void, formData: ProfileData, handleInputChange: (e: any) => void}> = ({ onNext, onBack, formData, handleInputChange }) => (
    <div>
        <h2 className="text-2xl font-bold text-white mb-6">Tell Us About Yourself</h2>
        <div className="space-y-4">
             <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Legal Name" className="w-full bg-gray-700 p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500" />
             <input type="text" name="displayName" value={formData.displayName} onChange={handleInputChange} placeholder="Display Name / Handle" className="w-full bg-gray-700 p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500" />
             <textarea name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Short Bio / Headline" rows={3} className="w-full bg-gray-700 p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
             <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" className="w-full bg-gray-700 p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>
         <div className="flex justify-between mt-8">
            <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">Back</button>
            <button onClick={onNext} className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700">Next</button>
        </div>
    </div>
);

const AffiliationStep: React.FC<{onNext: ()=>void, onBack: ()=>void, formData: ProfileData, handleSelectChange: (name: keyof ProfileData, value: any) => void}> = ({ onNext, onBack, formData, handleSelectChange }) => {
    const affiliations = Object.values(PoliticalAffiliation);
    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-2">Declare Your Political Affiliation</h2>
            <p className="text-yellow-400 mb-6 text-sm">This is a mandatory step. "Non-Disclosed" will result in ecosystem penalties.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {affiliations.map(aff => (
                    <button key={aff} onClick={() => handleSelectChange('politicalAffiliation', aff)} className={`p-3 text-sm border-2 rounded-lg transition-colors ${formData.politicalAffiliation === aff ? 'bg-orange-600 border-orange-500' : 'border-gray-600 hover:bg-gray-700'}`}>
                        {aff}
                    </button>
                ))}
            </div>
             <div className="flex justify-between mt-8">
                <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">Back</button>
                <button onClick={onNext} className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700 disabled:bg-gray-600" disabled={!formData.politicalAffiliation}>Next</button>
            </div>
        </div>
    );
};

const ReviewStep: React.FC<{onComplete: ()=>void, onBack: ()=>void, formData: ProfileData}> = ({ onComplete, onBack, formData }) => (
    <div>
        <h2 className="text-2xl font-bold text-white mb-6">Review & Publish</h2>
        <div className="bg-gray-900/50 p-4 rounded-lg space-y-2 border border-gray-600">
            <p><strong className="text-gray-400">Full Name:</strong> {formData.fullName}</p>
            <p><strong className="text-gray-400">Display Name:</strong> {formData.displayName}</p>
            <p><strong className="text-gray-400">Tier:</strong> {formData.tier}</p>
            <p><strong className="text-gray-400">Affiliation:</strong> {formData.politicalAffiliation}</p>
            <p className="text-green-400 flex items-center gap-2"><Icon name="shieldCheck" size={16} /> 2FA Enabled</p>
        </div>
        <p className="text-xs text-gray-500 mt-4">By publishing, you agree to our Terms of Service and confirm that your profile will be publicly visible.</p>
        <div className="flex justify-between mt-8">
            <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">Back</button>
            <button onClick={onComplete} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700">Publish Profile</button>
        </div>
    </div>
);


export default OnboardingPage;

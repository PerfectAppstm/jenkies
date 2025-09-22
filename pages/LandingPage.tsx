
import React from 'react';
import Icon from '../components/Icon';

interface LandingPageProps {
  onGetStarted: () => void;
}

const FeatureCard: React.FC<{ icon: any; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 text-center transform hover:scale-105 hover:border-orange-500/50 transition-all duration-300">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="text-center py-16 sm:py-24">
       <div className="flex justify-center mb-8">
         <img src="https://i.ibb.co/6r0hV2d/carthy.png" alt="UTO⌘Bio Logo" className="h-24" />
       </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
        Consolidate Your Identity.
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">Amplify Your Presence.</span>
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400">
        UTO⌘Bio is the exclusive link-in-bio platform for Utopia Communities™ stakeholders.
        Your official digital ID, social hub, and gateway to a connected ecosystem.
      </p>
      <div className="mt-10">
        <button
          onClick={onGetStarted}
          className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
        >
          Get Started <Icon name="arrowRight" size={20}/>
        </button>
      </div>
      <div className="mt-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Icon name="shieldCheck" size={40} className="text-orange-500" />}
          title="Digital ID+"
          description="A verified, scannable QR code and biometric link that serves as your official ID in UTO™ jurisdictions."
        />
        <FeatureCard 
          icon={<Icon name="globe" size={40} className="text-orange-500" />}
          title="Total Integration"
          description="Connect social profiles, payment methods, and community platforms into one seamless hub."
        />
        <FeatureCard 
          icon={<Icon name="sparkles" size={40} className="text-orange-500" />}
          title="Hyper-Formatting"
          description="Customize your profile with modular content blocks, from photo galleries to interactive Q&As."
        />
      </div>
    </div>
  );
};

export default LandingPage;

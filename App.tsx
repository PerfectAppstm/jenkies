
import React, { useState } from 'react';
import { AppView, ProfileData, initialProfileData } from './types';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleGetStarted = () => {
    setCurrentView(AppView.ONBOARDING);
  };

  const handleOnboardingComplete = (data: ProfileData) => {
    setProfileData(data);
    setCurrentView(AppView.PROFILE);
  };
  
  const handleBackToLanding = () => {
    setCurrentView(AppView.LANDING);
    setProfileData(null);
  }

  const renderView = () => {
    switch (currentView) {
      case AppView.ONBOARDING:
        return <OnboardingPage onComplete={handleOnboardingComplete} />;
      case AppView.PROFILE:
        return <ProfilePage profile={profileData || initialProfileData} onEdit={handleGetStarted} />;
      case AppView.LANDING:
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 flex flex-col">
       <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" 
        style={{backgroundImage: "url('https://i.ibb.co/3W835qq/bg.png')"}}
      ></div>
      {currentView === AppView.LANDING && <Header />}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative z-10">
        {renderView()}
      </main>
       {currentView === AppView.LANDING && <Footer />}
    </div>
  );
};

export default App;

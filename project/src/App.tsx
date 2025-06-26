import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import MoodPage from './components/MoodPage';
import PremiumPage from './components/PremiumPage';
import PsychologistsPage from './components/PsychologistsPage';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import CompanionCustomization from './components/CompanionCustomization';
import EmergencyProtocol from './components/EmergencyProtocol';
import MoodMirror from './components/MoodMirror';
import AccountMenu from './components/AccountMenu';
import ColorCustomizer from './components/ColorCustomizer';
import ImageAnalyzer from './components/ImageAnalyzer';
import { Shield, Lock, Settings, User, Palette, Camera } from 'lucide-react';
import { isUserLoggedIn, getCurrentUser } from './lib/supabase';
import { useTranslation } from './lib/translations';

interface CompanionConfig {
  name: string;
  type: string;
  bodyColor: string;
  eyeColor: string;
  eyeShape: string;
  clothing: string;
  accessories: string[];
  mood: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCompanionCustomization, setShowCompanionCustomization] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showColorCustomizer, setShowColorCustomizer] = useState(false);
  const [showImageAnalyzer, setShowImageAnalyzer] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState('');
  const [companion, setCompanion] = useState<CompanionConfig | null>(null);
  const [currentMood, setCurrentMood] = useState('happy');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [customBackgroundColor, setCustomBackgroundColor] = useState('from-gray-900 to-gray-900');
  const [isPremium, setIsPremium] = useState(false);

  // Initialize language and background from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const savedBackground = localStorage.getItem('customBackgroundColor');
    const premiumStatus = localStorage.getItem('isPremium');
    
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    if (savedBackground) {
      setCustomBackgroundColor(savedBackground);
    }
    if (premiumStatus === 'true') {
      setIsPremium(true);
    }
  }, []);

  const { t } = useTranslation(currentLanguage);

  useEffect(() => {
    try {
      // Check if user is logged in
      const loggedIn = isUserLoggedIn();
      const user = getCurrentUser();
      
      setIsLoggedIn(loggedIn);
      setCurrentUser(user);

      if (loggedIn) {
        // User is logged in, check if they completed welcome
        const hasCompletedWelcome = localStorage.getItem('welcomeCompleted');
        const savedCompanion = localStorage.getItem('companionConfig');
        
        if (!hasCompletedWelcome) {
          setShowWelcome(true);
        }
        
        if (savedCompanion) {
          try {
            setCompanion(JSON.parse(savedCompanion));
          } catch (error) {
            console.error('Error parsing companion config:', error);
            localStorage.removeItem('companionConfig');
          }
        }
      } else {
        // User is not logged in, check if they have an account
        const hasAccount = localStorage.getItem('userProfile') || localStorage.getItem('userPreferences');
        if (hasAccount) {
          setShowLogin(true);
        } else {
          setShowWelcome(true);
        }
      }
    } catch (error) {
      console.error('Error loading app data:', error);
      setShowWelcome(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleWelcomeComplete = () => {
    try {
      localStorage.setItem('welcomeCompleted', 'true');
      setShowWelcome(false);
      
      // Update login state
      const loggedIn = isUserLoggedIn();
      const user = getCurrentUser();
      setIsLoggedIn(loggedIn);
      setCurrentUser(user);
    } catch (error) {
      console.error('Error saving welcome completion:', error);
      setShowWelcome(false);
    }
  };

  const handleLoginSuccess = () => {
    const user = getCurrentUser();
    setIsLoggedIn(true);
    setCurrentUser(user);
    setShowLogin(false);
    
    // Check if they need to complete welcome
    const hasCompletedWelcome = localStorage.getItem('welcomeCompleted');
    if (!hasCompletedWelcome) {
      setShowWelcome(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShowLogin(true);
    setCompanion(null);
  };

  const handleGoToRegister = () => {
    setShowLogin(false);
    setShowWelcome(true);
  };

  const handleCompanionSave = (companionConfig: CompanionConfig) => {
    try {
      setCompanion(companionConfig);
      setShowCompanionCustomization(false);
    } catch (error) {
      console.error('Error saving companion:', error);
    }
  };

  const handleColorChange = (color: string) => {
    setCustomBackgroundColor(color);
  };

  const triggerEmergency = (reason: string) => {
    setEmergencyReason(reason);
    setEmergencyActive(true);
  };

  const handleImageAnalyzerOpen = () => {
    if (isPremium) {
      setShowImageAnalyzer(true);
    } else {
      // Show premium upgrade prompt
      alert(t.premium_feature + ': ' + t.upgrade_to_premium);
    }
  };

  const renderCurrentPage = () => {
    try {
      switch (currentPage) {
        case 'home':
          return <HomePage setCurrentPage={setCurrentPage} companion={companion} currentLanguage={currentLanguage} />;
        case 'chat':
          return <ChatPage onEmergencyTrigger={triggerEmergency} companion={companion} currentLanguage={currentLanguage} />;
        case 'mood':
          return <MoodPage currentLanguage={currentLanguage} />;
        case 'mood-mirror':
          return <MoodMirror currentMood={currentMood} onMoodChange={setCurrentMood} currentLanguage={currentLanguage} />;
        case 'premium':
          return <PremiumPage currentLanguage={currentLanguage} onPremiumUpgrade={() => setIsPremium(true)} />;
        case 'psychologists':
          return <PsychologistsPage currentLanguage={currentLanguage} />;
        default:
          return <HomePage setCurrentPage={setCurrentPage} companion={companion} currentLanguage={currentLanguage} />;
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">{t.error || 'Oops, algo salió mal'}</h2>
            <p className="text-gray-400 mb-4">Hubo un error al cargar esta página</p>
            <button 
              onClick={() => setCurrentPage('home')}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              {t.back || 'Volver al inicio'}
            </button>
          </div>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${customBackgroundColor} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg animate-pulse">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            MentalCare
          </h1>
          <p className="text-gray-400 text-sm mt-2">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (showLogin) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} onGoToRegister={handleGoToRegister} currentLanguage={currentLanguage} />;
  }

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} currentLanguage={currentLanguage} />;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${customBackgroundColor}`}>
      {/* Security Header */}
      <div className="bg-white/10 backdrop-blur-xl shadow-lg px-4 py-3 sticky top-0 z-10 border-b border-white/20">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <div className="flex items-center space-x-3">
            {/* Account Button */}
            <button
              onClick={() => setShowAccountMenu(true)}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors border border-white/20"
              title={t.my_account}
            >
              <User className="w-4 h-4 text-gray-300" />
            </button>
            
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-white drop-shadow-lg">MentalCare</span>
              {companion && (
                <div className="text-xs text-purple-300">
                  con {companion.name}
                </div>
              )}
              {currentUser && (
                <div className="text-xs text-gray-300">
                  {t.hello || 'Hola'}, {currentUser.name}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-green-300 bg-green-500/20 backdrop-blur-sm px-2 py-1 rounded-full border border-green-400/30">
              <Lock className="w-3 h-3" />
              <span className="font-medium">{t.secure}</span>
            </div>
            
            {/* Premium Badge */}
            {isPremium && (
              <div className="flex items-center space-x-1 text-xs text-yellow-300 bg-yellow-500/20 backdrop-blur-sm px-2 py-1 rounded-full border border-yellow-400/30">
                <Shield className="w-3 h-3" />
                <span className="font-medium">Premium</span>
              </div>
            )}
            
            {/* Image Analyzer Button */}
            <button
              onClick={handleImageAnalyzerOpen}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors border border-white/20"
              title={t.ai_image_analysis}
            >
              <Camera className="w-4 h-4 text-gray-300" />
            </button>
            
            {/* Color Customizer Button */}
            <button
              onClick={() => setShowColorCustomizer(true)}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors border border-white/20"
              title={t.customize_background}
            >
              <Palette className="w-4 h-4 text-gray-300" />
            </button>
            
            <button
              onClick={() => setShowCompanionCustomization(true)}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors border border-white/20"
              title="Personalizar Compañero"
            >
              <Settings className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto min-h-screen">
        <main className="pb-24">
          {renderCurrentPage()}
        </main>

        {/* Bottom Navigation with Glassmorphism */}
        <Navigation 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          currentLanguage={currentLanguage}
        />
      </div>

      {/* Modals */}
      {showAccountMenu && (
        <AccountMenu
          onClose={() => setShowAccountMenu(false)}
          onLogout={handleLogout}
          currentLanguage={currentLanguage}
        />
      )}

      {showColorCustomizer && (
        <ColorCustomizer
          onClose={() => setShowColorCustomizer(false)}
          onColorChange={handleColorChange}
          currentColor={customBackgroundColor}
          currentLanguage={currentLanguage}
        />
      )}

      {showImageAnalyzer && (
        <ImageAnalyzer
          onClose={() => setShowImageAnalyzer(false)}
          currentLanguage={currentLanguage}
        />
      )}

      {showCompanionCustomization && (
        <CompanionCustomization
          onSave={handleCompanionSave}
          onClose={() => setShowCompanionCustomization(false)}
          currentLanguage={currentLanguage}
        />
      )}

      {emergencyActive && (
        <EmergencyProtocol
          isActive={emergencyActive}
          onDeactivate={() => setEmergencyActive(false)}
          triggerReason={emergencyReason}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
}

export default App;
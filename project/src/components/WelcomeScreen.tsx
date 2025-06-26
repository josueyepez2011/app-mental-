import React, { useState, useEffect } from 'react';
import { Shield, Heart, Sparkles, ArrowRight, Globe, Users, Crown, Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { saveUserProfile, UserProfile, testSupabaseConnection, getSupabaseStatus } from '../lib/supabase';
import { useTranslation } from '../lib/translations';
import LanguageSelector from './LanguageSelector';

interface WelcomeScreenProps {
  onComplete: () => void;
  currentLanguage?: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, currentLanguage = 'es' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentLanguageState, setCurrentLanguageState] = useState(currentLanguage);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<any>(null);

  const { t } = useTranslation(currentLanguageState);

  const [userPreferences, setUserPreferences] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    concerns: [] as string[],
    emergencyContact: '',
    emergencyContactName: '',
    culturalBackground: '',
    preferredLanguage: currentLanguageState
  });

  const animationDuration = 300;

  // Verificar estado de Supabase al cargar
  useEffect(() => {
    const checkSupabase = async () => {
      const status = getSupabaseStatus();
      setSupabaseStatus(status);
      
      if (status.isAvailable) {
        const connectionTest = await testSupabaseConnection();
        setSupabaseStatus(prev => ({ ...prev, connectionTest }));
      }
    };
    
    checkSupabase();
  }, []);

  // Animación inicial al cargar la pantalla
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowInitialAnimation(false);
      setTimeout(() => {
        setIsContentVisible(true);
      }, 100);
    }, 2500);

    return () => clearTimeout(initialTimer);
  }, []);

  // Update preferred language when current language changes
  useEffect(() => {
    setUserPreferences(prev => ({ ...prev, preferredLanguage: currentLanguageState }));
  }, [currentLanguageState]);

  const steps = [
    {
      title: t.welcome_title,
      subtitle: t.welcome_subtitle,
      component: 'welcome'
    },
    {
      title: t.tell_us_about_you,
      subtitle: t.personalize_experience,
      component: 'profile'
    },
    {
      title: t.main_concerns,
      subtitle: t.select_concerns,
      component: 'concerns'
    },
    {
      title: t.emergency_contact,
      subtitle: t.safety_tranquility,
      component: 'emergency'
    },
    {
      title: t.all_ready,
      subtitle: t.start_wellness_journey,
      component: 'complete'
    }
  ];

  const concerns = [
    { id: 'anxiety', label: t.anxiety, icon: '😰', color: 'from-red-400 to-red-600' },
    { id: 'depression', label: t.depression, icon: '😔', color: 'from-blue-400 to-blue-600' },
    { id: 'stress', label: t.stress, icon: '😤', color: 'from-orange-400 to-orange-600' },
    { id: 'relationships', label: t.relationships, icon: '💔', color: 'from-pink-400 to-pink-600' },
    { id: 'selfesteem', label: t.selfesteem, icon: '😞', color: 'from-purple-400 to-purple-600' },
    { id: 'sleep', label: t.sleep, icon: '😴', color: 'from-indigo-400 to-indigo-600' }
  ];

  const handleConcernToggle = (concernId: string) => {
    setUserPreferences(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concernId)
        ? prev.concerns.filter(c => c !== concernId)
        : [...prev.concerns, concernId]
    }));
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguageState(language);
    localStorage.setItem('preferredLanguage', language);
  };

  const transitionToStep = (newStepIndex: number) => {
    setIsContentVisible(false);
    setTimeout(() => {
      setCurrentStep(newStepIndex);
      setIsContentVisible(true);
    }, animationDuration);
  };

  const saveToSupabase = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    setErrorMessage('');

    try {
      console.log('🚀 Iniciando proceso de guardado...');
      console.log('📊 Estado de Supabase:', supabaseStatus);

      const profileData: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'> = {
        name: userPreferences.name,
        email: userPreferences.email,
        password: userPreferences.password,
        age: userPreferences.age ? parseInt(userPreferences.age) : undefined,
        concerns: userPreferences.concerns,
        emergency_contact: userPreferences.emergencyContact,
        emergency_contact_name: userPreferences.emergencyContactName,
        cultural_background: userPreferences.culturalBackground,
        preferred_language: userPreferences.preferredLanguage
      };

      console.log('📝 Datos a guardar:', {
        ...profileData,
        password: '[HIDDEN]'
      });

      const savedProfile = await saveUserProfile(profileData);
      console.log('✅ Perfil guardado exitosamente:', savedProfile.id);
      
      // Guardar también en localStorage como respaldo
      localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
      localStorage.setItem('userProfileId', savedProfile.id);
      
      // Establecer sesión automáticamente
      localStorage.setItem('currentUser', JSON.stringify({
        id: savedProfile.id,
        email: savedProfile.email,
        name: savedProfile.name
      }));
      
      setSaveStatus('success');
      
      // Esperar un momento para mostrar el éxito antes de completar
      setTimeout(() => {
        onComplete();
      }, 1500);

    } catch (error: any) {
      console.error('❌ Error saving to Supabase:', error);
      setSaveStatus('error');
      
      // Translate error messages
      let translatedError = error.message || 'Error al guardar los datos. Inténtalo de nuevo.';
      if (error.message?.includes('Ya existe una cuenta')) {
        translatedError = t.email_already_exists;
      }
      
      setErrorMessage(translatedError);
      
      // Guardar en localStorage como fallback
      localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      transitionToStep(currentStep + 1);
    } else {
      // En el último paso, guardar en Supabase
      saveToSupabase();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      transitionToStep(currentStep - 1);
    }
  };

  // Animación inicial de carga
  if (showInitialAnimation) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-8">
          {/* Logo animado */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center shadow-2xl animate-pulse">
              <Heart className="w-16 h-16 text-white animate-bounce" />
            </div>
            
            {/* Ondas expansivas */}
            <div className="absolute inset-0 w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-purple-400 opacity-20 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border-4 border-pink-400 opacity-30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-4 rounded-full border-4 border-purple-300 opacity-40 animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Texto animado */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              MentalCare
            </h1>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <p className="text-gray-300 text-lg animate-fade-in">
              {t.loading}
            </p>
          </div>

          {/* Partículas flotantes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.component) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                <Heart className="w-16 h-16 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MentalCare
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {t.safe_space} {t.emotional_wellbeing}
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>{t.privacy_total}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>Inclusivo</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>Profesional</span>
                </div>
              </div>
            </div>
            
            {/* Supabase Status */}
            {supabaseStatus && (
              <div className="mt-6 p-3 bg-gray-800 rounded-xl border border-gray-700">
                <div className="text-xs text-gray-400 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Estado de Supabase:</span>
                    <span className={supabaseStatus.isAvailable ? 'text-green-400' : 'text-yellow-400'}>
                      {supabaseStatus.isAvailable ? '✅ Conectado' : '⚠️ Offline'}
                    </span>
                  </div>
                  {supabaseStatus.connectionTest !== undefined && (
                    <div className="flex items-center justify-between">
                      <span>Prueba de conexión:</span>
                      <span className={supabaseStatus.connectionTest ? 'text-green-400' : 'text-red-400'}>
                        {supabaseStatus.connectionTest ? '✅ OK' : '❌ Error'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Language Selector */}
            <div className="mt-6">
              <button
                onClick={() => setShowLanguageModal(true)}
                className="flex items-center space-x-2 mx-auto p-3 bg-gray-700 text-white rounded-xl border border-gray-600 hover:bg-gray-600 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{t.select_language}</span>
              </button>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.name_label}
                </label>
                <input
                  type="text"
                  value={userPreferences.name}
                  onChange={(e) => setUserPreferences(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-4 bg-gray-700 text-white rounded-2xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder={t.name_placeholder}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.email_label}
                </label>
                <input
                  type="email"
                  value={userPreferences.email}
                  onChange={(e) => setUserPreferences(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-4 bg-gray-700 text-white rounded-2xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder={t.email_placeholder}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.password_label}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={userPreferences.password}
                    onChange={(e) => setUserPreferences(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full p-4 bg-gray-700 text-white rounded-2xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-12"
                    placeholder={t.password_placeholder}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.confirm_password_label}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={userPreferences.confirmPassword}
                    onChange={(e) => setUserPreferences(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className={`w-full p-4 bg-gray-700 text-white rounded-2xl border transition-all pr-12 focus:outline-none focus:ring-2 ${
                      userPreferences.confirmPassword && userPreferences.password !== userPreferences.confirmPassword
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-600 focus:ring-purple-500'
                    }`}
                    placeholder={t.confirm_password_placeholder}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {userPreferences.confirmPassword && userPreferences.password !== userPreferences.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{t.passwords_dont_match}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.age_label}
                </label>
                <input
                  type="number"
                  value={userPreferences.age}
                  onChange={(e) => setUserPreferences(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full p-4 bg-gray-700 text-white rounded-2xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder={t.age_placeholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.cultural_background_label}
                </label>
                <input
                  type="text"
                  value={userPreferences.culturalBackground}
                  onChange={(e) => setUserPreferences(prev => ({ ...prev, culturalBackground: e.target.value }))}
                  className="w-full p-4 bg-gray-700 text-white rounded-2xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder={t.cultural_background_placeholder}
                />
              </div>
              
              {/* Language Selector in Profile */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.language}
                </label>
                <LanguageSelector
                  currentLanguage={currentLanguageState}
                  onLanguageChange={handleLanguageChange}
                />
              </div>
            </div>
          </div>
        );

      case 'concerns':
        return (
          <div className="space-y-6">
            <p className="text-gray-300 text-center">
              {t.select_concerns}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {concerns.map((concern) => (
                <button
                  key={concern.id}
                  onClick={() => handleConcernToggle(concern.id)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    userPreferences.concerns.includes(concern.id)
                      ? `border-transparent bg-gradient-to-r ${concern.color} text-white shadow-lg`
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500 text-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{concern.icon}</div>
                  <div className="font-semibold text-sm">{concern.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'emergency':
        return (
          <div className="space-y-6">
            <div className="bg-red-900/30 border border-red-500/30 rounded-2xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-6 h-6 text-red-400" />
                <h3 className="font-bold text-red-400">Protocolo de Seguridad</h3>
              </div>
              <p className="text-red-300 text-sm leading-relaxed">
                Para tu seguridad, necesitamos un contacto de emergencia. Esta persona será notificada solo en situaciones críticas.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t.emergency_contact_name_label}
              </label>
              <input
                type="text"
                value={userPreferences.emergencyContactName}
                onChange={(e) => setUserPreferences(prev => ({ ...prev, emergencyContactName: e.target.value }))}
                className="w-full p-4 bg-gray-700 text-white rounded-2xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                placeholder={t.emergency_contact_name_placeholder}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t.emergency_contact_phone_label}
              </label>
              <input
                type="tel"
                value={userPreferences.emergencyContact}
                onChange={(e) => setUserPreferences(prev => ({ ...prev, emergencyContact: e.target.value }))}
                className="w-full p-4 bg-gray-700 text-white rounded-2xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                placeholder={t.emergency_contact_phone_placeholder}
                required
              />
            </div>
            <div className="text-xs text-gray-400 leading-relaxed">
              <p>• Solo se contactará en emergencias reales</p>
              <p>• Puedes cambiar este contacto en cualquier momento</p>
              <p>• Tu privacidad está protegida</p>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center shadow-2xl">
              {isSaving ? (
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              ) : saveStatus === 'success' ? (
                <CheckCircle className="w-12 h-12 text-white" />
              ) : saveStatus === 'error' ? (
                <AlertCircle className="w-12 h-12 text-white" />
              ) : (
                <Heart className="w-12 h-12 text-white" />
              )}
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                {isSaving ? 'Guardando tu información...' :
                 saveStatus === 'success' ? '¡Perfecto!' :
                 saveStatus === 'error' ? 'Ups, algo salió mal' :
                 `¡Perfecto, ${userPreferences.name || 'amigo'}!`}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {isSaving ? 'Estamos guardando tu perfil de forma segura en nuestra base de datos.' :
                 saveStatus === 'success' ? t.account_created_successfully :
                 saveStatus === 'error' ? errorMessage :
                 'Tu cuenta está lista. Ahora puedes acceder a todas nuestras funciones personalizadas para tu bienestar emocional.'}
              </p>
              
              {saveStatus === 'error' && (
                <button
                  onClick={saveToSupabase}
                  className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Intentar de nuevo
                </button>
              )}

              {!isSaving && saveStatus !== 'error' && (
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span className="font-bold text-yellow-400">Funciones Disponibles</span>
                  </div>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>✓ Chat con IA especializada</p>
                    <p>✓ Seguimiento emocional</p>
                    <p>✓ Conexión con psicólogos</p>
                    <p>✓ Herramientas de emergencia</p>
                    <p>✓ {supabaseStatus?.isAvailable ? 'Sincronización en la nube' : 'Almacenamiento local'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isProfileStepValid = () => {
    return userPreferences.name.trim() !== '' && 
           userPreferences.email.trim() !== '' && 
           userPreferences.password.length >= 6 &&
           userPreferences.password === userPreferences.confirmPassword;
  };

  const isEmergencyStepValid = () => {
    return userPreferences.emergencyContact.trim() !== '' && userPreferences.emergencyContactName.trim() !== '';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Progress Bar */}
      <div className="p-4">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>Paso {currentStep + 1} de {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6">
        <div className="max-w-sm mx-auto">
          {/* Header */}
          <div className={`text-center mb-8 transition-opacity duration-${animationDuration} ease-in-out ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-2xl font-bold text-white mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-400 text-sm">
              {steps[currentStep].subtitle}
            </p>
          </div>
            
          {/* Animated Step Content */}
          <div 
            className={`mb-8 transition-opacity duration-${animationDuration} ease-in-out ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ minHeight: '300px' }} 
          >
            {renderStepContent()}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4">
        <div className="max-w-sm mx-auto">
          <button
            onClick={handleNext}
            disabled={
              (steps[currentStep].component === 'profile' && !isProfileStepValid()) ||
              (steps[currentStep].component === 'emergency' && !isEmergencyStepValid()) ||
              !isContentVisible ||
              isSaving
            }
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <span>{currentStep === steps.length - 1 ? 'Crear Cuenta' : t.continue}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <button
              onClick={handleBack}
              disabled={!isContentVisible || isSaving}
              className="w-full mt-3 text-gray-400 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:text-gray-200"
            >
              {t.back}
            </button>
          )}
        </div>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <LanguageSelector
          currentLanguage={currentLanguageState}
          onLanguageChange={handleLanguageChange}
          onClose={() => setShowLanguageModal(false)}
          isModal={true}
        />
      )}

      {/* CSS personalizado para animaciones */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;
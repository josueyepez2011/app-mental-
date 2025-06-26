import React from 'react';
import { Shield, MessageCircle, Heart, Users, ArrowRight, Sparkles, TrendingUp, Carrot as Mirror, Zap, Camera } from 'lucide-react';
import { useTranslation } from '../lib/translations';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
  companion?: any;
  currentLanguage?: string;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage, companion, currentLanguage = 'es' }) => {
  const { t } = useTranslation(currentLanguage);

  const features = [
    {
      icon: MessageCircle,
      title: 'MentalCare AI',
      description: t.support_general_info || 'Asistente inteligente con respuestas directas y personalizadas',
      color: 'from-green-500 to-emerald-500',
      page: 'chat'
    },
    {
      icon: Mirror,
      title: t.mirror || 'Espejo Emocional',
      description: 'Refleja tu estado y recibe contenido personalizado',
      color: 'from-purple-500 to-pink-500',
      page: 'mood-mirror'
    },
    {
      icon: TrendingUp,
      title: 'Seguimiento Lineal',
      description: 'Gráficos lineales de tu progreso emocional',
      color: 'from-pink-500 to-rose-500',
      page: 'mood'
    },
    {
      icon: Users,
      title: t.psychologists || 'Psicólogos Certificados',
      description: 'Profesionales disponibles para ti',
      color: 'from-indigo-500 to-purple-500',
      page: 'psychologists'
    }, 
   
  ];

  const renderCompanion = () => {
    if (!companion) return null;

    return (
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg relative"
            style={{ backgroundColor: companion.bodyColor }}
          >
            {companion.type === 'cloud' && '☁️'}
            {companion.type === 'fox' && '🦊'}
            {companion.type === 'owl' && '🦉'}
            {companion.type === 'cat' && '🐱'}
            {companion.type === 'bear' && '🐻'}
            
            {/* Mood indicator */}
            <div className="absolute -top-1 -right-1 text-lg">
              {companion.mood === 'happy' && '😊'}
              {companion.mood === 'calm' && '😌'}
              {companion.mood === 'excited' && '🤗'}
              {companion.mood === 'sleepy' && '😴'}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-purple-300 text-lg">
              ¡{t.hello || 'Hola'}! Soy {companion.name}
            </h3>
            <p className="text-purple-200 text-sm">
              Tu compañero emocional personalizado
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-gray-200">
                Listo para acompañarte hoy
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 py-6 space-y-6 min-h-screen">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
            {t.emotional_wellbeing || 'Tu Bienestar Mental'}
          </h1>
          <p className="text-gray-200 text-sm leading-relaxed mt-2 drop-shadow-sm">
            {t.safe_space || 'Un espacio seguro'} donde tu bienestar emocional es nuestra prioridad
          </p>
        </div>
      </div>

      {/* Companion Display */}
      {renderCompanion()}

      {/* Security Badge */}
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-green-300">{t.privacy_total || 'Privacidad Total'}</h3>
            <p className="text-green-200 text-xs">{t.works_offline || 'Funciona completamente offline'}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="font-bold text-white text-lg drop-shadow-lg">{t.start_now || 'Comenzar Ahora'}</h2>
        
        <button 
          onClick={() => setCurrentPage('chat')}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
        >
          <div className="text-left">
            <div className="font-bold">Hablar con MentalCare AI</div>
            <div className="text-green-100 text-sm">Respuestas directas y personalizadas</div>
          </div>
          <ArrowRight className="w-6 h-6" />
        </button>

        <button 
          onClick={() => setCurrentPage('mood-mirror')}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
        >
          <div className="text-left">
            <div className="font-bold">{t.mirror || 'Espejo Emocional'}</div>
            <div className="text-purple-100 text-sm">Refleja tu estado y recibe contenido</div>
          </div>
          <ArrowRight className="w-6 h-6" />
        </button>

        <button 
          onClick={() => setCurrentPage('mood')}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
        >
          <div className="text-left">
            <div className="font-bold">Registrar Estado</div>
            <div className="text-pink-100 text-sm">¿Cómo te sientes hoy?</div>
          </div>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="font-bold text-white text-lg drop-shadow-lg">Todas las Características</h2>
        <div className="space-y-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <button
                key={index}
                onClick={() => setCurrentPage(feature.page)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all hover:border-white/30 hover:bg-white/15"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-white">{feature.title}</h3>
                    <p className="text-gray-200 text-sm mt-1">{feature.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* New Features Badge */}
      <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-4">
        <div className="text-center">
          <Zap className="w-8 h-8 text-blue-300 mx-auto mb-2" />
          <h3 className="font-bold text-blue-300 mb-1">Funciones Avanzadas</h3>
          <p className="text-blue-200 text-xs">
            • Compañero emocional personalizable<br />
            • {t.mirror || 'Espejo emocional'} interactivo<br />
            • Protocolo de emergencia 24/7<br />
            • {t.ai_image_analysis || 'Análisis de imagen con IA'} (Premium)<br />
            • Personalización completa de interfaz
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
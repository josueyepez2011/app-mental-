import React from 'react';
import { Crown, Check, Star, Zap, Shield, Users, Sparkles, Camera, Palette } from 'lucide-react';
import { useTranslation } from '../lib/translations';

interface PremiumPageProps {
  currentLanguage?: string;
  onPremiumUpgrade?: () => void;
}

const PremiumPage: React.FC<PremiumPageProps> = ({ currentLanguage = 'es', onPremiumUpgrade }) => {
  const { t } = useTranslation(currentLanguage);

  const handleUpgrade = () => {
    localStorage.setItem('isPremium', 'true');
    if (onPremiumUpgrade) {
      onPremiumUpgrade();
    }
    alert(t.account_created_successfully || '¡Felicidades! Ahora eres miembro Premium.');
  };

  const plans = [
    {
      name: 'Premium Básico',
      price: '$9.99',
      period: '/mes',
      features: [
        'Chat ilimitado con IA Gemini avanzada',
        'Análisis emocional detallado',
        'Informes mensuales personalizados',
        'Ejercicios de mindfulness',
        'Soporte prioritario'
      ],
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      name: 'Premium Pro',
      price: '$19.99',
      period: '/mes',
      features: [
        'Todo lo del Premium Básico',
        'Consultas con psicólogos',
        '2 sesiones mensuales incluidas',
        'Planes de tratamiento personalizados',
        'Análisis predictivo avanzado',
        'Grupos de apoyo exclusivos',
        t.ai_image_analysis || 'Análisis de imagen con IA'
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      name: 'Premium Elite',
      price: '$39.99',
      period: '/mes',
      features: [
        'Todo lo del Premium Pro',
        'Sesiones ilimitadas de terapia',
        'Psicólogo personal asignado',
        'Intervención de crisis 24/7',
        'Programa familiar completo',
        'Acceso anticipado a funciones',
        'Personalización completa de interfaz'
      ],
      color: 'from-yellow-500 to-orange-500',
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Camera,
      title: t.ai_image_analysis || 'Análisis de Imagen con IA',
      description: 'Sube dibujos o fotos para análisis emocional profundo con tecnología Gemini Vision'
    },
    {
      icon: Palette,
      title: t.customize_background || 'Personalización Completa',
      description: 'Temas personalizados, colores y experiencia visual adaptada a tu estado de ánimo'
    },
    {
      icon: Shield,
      title: 'Máxima Seguridad',
      description: 'Encriptación militar y privacidad absoluta garantizada'
    },
    {
      icon: Users,
      title: 'Comunidad Premium',
      description: 'Grupos exclusivos con personas en tu misma situación'
    }
  ];

  return (
    <div className="p-4 space-y-6 min-h-screen">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          {t.premium || 'Premium'}
        </h2>
        <p className="text-gray-300 text-sm mt-2">
          {t.unlock_advanced_features || 'Desbloquea todo el potencial de tu bienestar mental'}
        </p>
      </div>

      {/* Benefits */}
      <div className="space-y-3">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${
                  index === 0 ? 'from-purple-500 to-pink-500' :
                  index === 1 ? 'from-blue-500 to-cyan-500' :
                  index === 2 ? 'from-green-500 to-emerald-500' :
                  'from-yellow-500 to-orange-500'
                } rounded-xl flex items-center justify-center shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">{benefit.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plans */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white text-center">{t.select_plan || 'Elige tu Plan'}</h3>
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border overflow-hidden ${
              plan.popular ? 'border-purple-400/50' : 'border-white/20'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-1 text-xs font-bold">
                MÁS POPULAR
              </div>
            )}
            
            <div className={`p-4 ${plan.popular ? 'pt-8' : ''}`}>
              <div className="text-center mb-4">
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${plan.color} mb-3`}>
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-gray-300 ml-1 text-sm">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleUpgrade}
                className={`w-full py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/20 backdrop-blur-sm text-gray-200 hover:bg-white/30 border border-white/30'
              }`}>
                {plan.popular ? 'Comenzar Ahora' : 'Seleccionar Plan'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 shadow-lg">
        <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-300" />
        <h3 className="text-xl font-bold mb-2 text-white">{t.need_help_choosing || '¿Necesitas ayuda para elegir?'}</h3>
        <p className="text-purple-200 text-sm mb-4">
          Nuestro equipo te ayudará a encontrar el plan perfecto
        </p>
        <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold hover:bg-white/30 transition-colors shadow-lg border border-white/30">
          Hablar con un Especialista
        </button>
      </div>
    </div>
  );
};

export default PremiumPage;
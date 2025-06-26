import React, { useState, useEffect } from 'react';
import {
  Users, Star, Calendar, Video, MessageCircle, Award, Filter, ShieldCheck, X, ShoppingCart, CreditCard, ArrowLeft,
  Crown, Check, Zap, Shield, Sparkles, PhoneOutgoing // Added PhoneOutgoing for WhatsApp
} from 'lucide-react';

// Simple icon components for payment methods
const GooglePayIcon = () => (
  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
    G
  </div>
);

const ApplePayIcon = () => (
  <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center text-white text-xs font-bold">
    A
  </div>
);

const PayPalIcon = () => (
  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
    P
  </div>
);

const PSEIcon = () => (
  <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
    PSE
  </div>
);

// Data for the Premium Page
const premiumPagePlans = [
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
      'Grupos de apoyo exclusivos'
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
      'Acceso anticipado a funciones'
    ],
    color: 'from-yellow-500 to-orange-500',
    popular: false
  }
];

const premiumPageBenefits = [
  {
    icon: Zap,
    title: 'IA Gemini Súper Avanzada',
    description: 'Modelos de última generación especializados en salud mental'
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
  },
  {
    icon: Star,
    title: 'Soporte VIP',
    description: 'Atención personalizada 24/7 con respuesta inmediata'
  }
];

const PsychologistsPage: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumPage, setShowPremiumPage] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [psychologistForBooking, setPsychologistForBooking] = useState<any | null>(null);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState('');
  // NEW STATE: To track psychologists for whom a single session has been paid by a non-premium user
  const [unlockedPsychologistIds, setUnlockedPsychologistIds] = useState<number[]>([]);


  const specialties = [
    { value: 'all', label: 'Todos' },
    { value: 'anxiety', label: 'Ansiedad' },
    { value: 'depression', label: 'Depresión' },
    { value: 'relationships', label: 'Relaciones' },
    { value: 'trauma', label: 'Trauma' },
    { value: 'family', label: 'Familia' },
    { value: 'addiction', label: 'Adicciones' },
    { value: 'children', label: 'Infantil' },
  ];

  const psychologists = [ // Added a 'phone' field for WhatsApp integration
    {
      id: 1,
      name: 'Dra. María González',
      specialty: 'Ansiedad y Estrés',
      experience: '12 años',
      rating: 4.9,
      reviews: 156,
      price: '$80',
      nextAvailable: 'Hoy 3:00 PM',
      specialtyCode: 'anxiety',
      color: 'from-blue-500 to-cyan-500',
      avatarColor: 'bg-blue-500',
      bio: 'Especialista en terapia cognitivo-conductual (TCC) con un enfoque empático y práctico para manejar la ansiedad, el estrés laboral y los ataques de pánico. Ayudo a mis pacientes a desarrollar herramientas para una vida más tranquila.',
      phone: '5215511223344' // Example phone number (Mexico City)
    },
    {
      id: 2,
      name: 'Dr. Carlos Hernández',
      specialty: 'Depresión y Duelo',
      experience: '15 años',
      rating: 4.8,
      reviews: 203,
      price: '$75',
      nextAvailable: 'Mañana 10:00 AM',
      specialtyCode: 'depression',
      color: 'from-green-500 to-emerald-500',
      avatarColor: 'bg-green-500',
      bio: 'Psicólogo clínico con amplia experiencia en el tratamiento de trastornos del estado de ánimo, incluyendo depresión mayor y distimia. Ofrezco un espacio seguro para procesar el duelo y encontrar esperanza.',
      phone: '5215522334455'
    },
    {
      id: 3,
      name: 'Dra. Ana Martínez',
      specialty: 'Terapia de Pareja',
      experience: '8 años',
      rating: 4.9,
      reviews: 89,
      price: '$90',
      nextAvailable: 'Hoy 6:00 PM',
      specialtyCode: 'relationships',
      color: 'from-pink-500 to-rose-500',
      avatarColor: 'bg-pink-500',
      bio: 'Terapeuta de parejas y familia, especializada en mejorar la comunicación, resolver conflictos y fortalecer los vínculos afectivos. Trabajo con el modelo de Terapia Centrada en las Emociones (TCE).',
      phone: '5215533445566'
    },
    {
      id: 4,
      name: 'Dr. Roberto Silva',
      specialty: 'Trauma y TEPT',
      experience: '18 años',
      rating: 4.7,
      reviews: 127,
      price: '$95',
      nextAvailable: 'Mañana 2:00 PM',
      specialtyCode: 'trauma',
      color: 'from-purple-600 to-indigo-600',
      avatarColor: 'bg-purple-600',
      bio: 'Especialista en trauma complejo y Trastorno de Estrés Postraumático (TEPT). Certificado en EMDR y Somatic Experiencing. Comprometido con ayudar a los supervivientes a sanar y recuperar sus vidas.',
      phone: '5215544556677'
    },
    {
      id: 5,
      name: 'Lic. Sofía Vargas',
      specialty: 'Psicología Infantil',
      experience: '7 años',
      rating: 4.8,
      reviews: 75,
      price: '$70',
      nextAvailable: 'Pasado Mañana 11:00 AM',
      specialtyCode: 'children',
      color: 'from-yellow-400 to-amber-500',
      avatarColor: 'bg-yellow-400',
      bio: 'Psicóloga infantil enfocada en problemas de conducta, TDAH, y ansiedad en niños y adolescentes. Utilizo terapia de juego y técnicas adaptadas a cada etapa del desarrollo.',
      phone: '5215555667788'
    },
    {
      id: 6,
      name: 'Dr. Javier Nuñez',
      specialty: 'Adicciones y Codependencia',
      experience: '10 años',
      rating: 4.6,
      reviews: 92,
      price: '$85',
      nextAvailable: 'Hoy 7:00 PM',
      specialtyCode: 'addiction',
      color: 'from-red-500 to-orange-500',
      avatarColor: 'bg-red-500',
      bio: 'Terapeuta especializado en el tratamiento de adicciones (sustancias, juego, etc.) y conductas compulsivas. Apoyo también a familiares afectados por la codependencia.',
      phone: '5215566778899'
    },
  ];

  const filteredPsychologists = selectedSpecialty === 'all'
    ? psychologists
    : psychologists.filter(p => p.specialtyCode === selectedSpecialty);

  const handleBookSession = (psychologist: any) => {
    if (isPremium) {
      console.log(`(Premium) Redirigiendo para agendar con ${psychologist.name}.`);
      alert(`¡Genial! Como usuario Premium, tu sesión con ${psychologist.name} está siendo procesada.`);
    } else {
      // Non-premium user trying to book a session that isn't unlocked yet
      setPsychologistForBooking(psychologist);
      setShowPaymentModal(true);
    }
  };

  // NEW HANDLER: For starting WhatsApp chat
  const handleStartChat = (psychologist: any) => {
    if (!psychologist.phone) {
      alert('Número de teléfono no disponible para este psicólogo.');
      return;
    }
    const message = encodeURIComponent(`Hola ${psychologist.name}, he pagado por una sesión y me gustaría coordinar los detalles.`);
    const whatsappUrl = `https://wa.me/${psychologist.phone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setPaymentSuccessMessage(`Contactando a ${psychologist.name} por WhatsApp...`);
  };


  const handleGoToPremiumPage = () => {
    setShowPremiumPage(true);
  };

  const handleBackToList = () => {
    setShowPremiumPage(false);
  };

  const handleSimulatePremiumPurchase = () => {
    setIsPremium(true);
    setShowPremiumPage(false);
    setPaymentSuccessMessage('¡Felicidades! Ahora eres miembro Premium. Disfruta de acceso ilimitado.');
    // If user becomes premium, clear any single-session unlocks as premium covers all
    setUnlockedPsychologistIds([]);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setPsychologistForBooking(null);
  };

  const handleSimulatedPaymentForSession = () => {
    if (!psychologistForBooking) return;

    console.log(`Simulando pago para sesión con ${psychologistForBooking.name}`);
    setShowPaymentModal(false);
    setPaymentSuccessMessage(`¡Pago exitoso! Tu sesión con ${psychologistForBooking.name} está confirmada.`);
    
    // If user is NOT premium, unlock this specific psychologist for direct chat
    if (!isPremium) {
      setUnlockedPsychologistIds(prevIds => [...prevIds, psychologistForBooking.id]);
    }
    
    // Optional: directly initiate chat after payment.
    // However, the user might want to see the button change first.
    // if (!isPremium) {
    //   handleStartChat(psychologistForBooking);
    // }

    console.log(`(Post-Pago) Contacto habilitado para ${psychologistForBooking.name}.`);
    setPsychologistForBooking(null);
  };
  
  useEffect(() => {
    if (paymentSuccessMessage) {
      const timer = setTimeout(() => {
        setPaymentSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [paymentSuccessMessage]);

  const getSpecialtyTextColor = (colorClass: string) => {
    if (colorClass.includes('blue')) return 'text-cyan-400';
    if (colorClass.includes('green')) return 'text-emerald-400';
    if (colorClass.includes('pink')) return 'text-rose-400';
    if (colorClass.includes('purple')) return 'text-indigo-400';
    if (colorClass.includes('yellow')) return 'text-amber-400';
    if (colorClass.includes('red')) return 'text-orange-400';
    return 'text-gray-400';
  };

  if (showPremiumPage) {
    // ... (Premium Page JSX - unchanged)
    return (
      <div className="p-4 space-y-6 bg-gray-900 min-h-screen text-white relative">
        <button 
          onClick={handleBackToList} 
          className="absolute top-4 left-4 flex items-center text-purple-400 hover:text-purple-300 transition-colors z-10 p-2 bg-gray-800/70 backdrop-blur-sm rounded-full shadow-md"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> <span className="text-sm">Volver</span>
        </button>
        
        <div className="text-center pt-12">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Conecta Premium
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Desbloquea todo el potencial de tu bienestar mental
          </p>
        </div>
  
        <div className="space-y-3">
          {premiumPageBenefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${
                    index === 0 ? 'from-blue-500 to-cyan-500' :
                    index === 1 ? 'from-green-500 to-emerald-500' :
                    index === 2 ? 'from-purple-500 to-pink-500' :
                    'from-yellow-500 to-orange-500'
                  } rounded-xl flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{benefit.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
  
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white text-center">Elige tu Plan</h3>
          {premiumPagePlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-800 rounded-2xl shadow-lg border overflow-hidden ${
                plan.popular ? 'border-purple-500' : 'border-gray-700'
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
                    <span className="text-gray-400 ml-1 text-sm">{plan.period}</span>
                  </div>
                </div>
  
                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
  
                <button 
                  onClick={handleSimulatePremiumPurchase}
                  className={`w-full py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}>
                  {plan.popular ? 'Comenzar Ahora' : 'Seleccionar Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg mt-6">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">¿Necesitas ayuda para elegir?</h3>
          <p className="text-purple-100 text-sm mb-4">
            Nuestro equipo te ayudará a encontrar el plan perfecto
          </p>
          <button 
            onClick={() => alert("Contacta con un especialista (implementar)")}
            className="px-6 py-3 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
            Hablar con un Especialista
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-gray-900 min-h-screen text-white antialiased">
      {paymentSuccessMessage && (
        <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
          {paymentSuccessMessage}
        </div>
      )}
      <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">
        <header className="text-center space-y-3">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl ring-4 ring-purple-500/30">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Conecta con Expertos
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            Encuentra psicólogos certificados y especializados para tu bienestar emocional. Tu camino hacia una mejor salud mental comienza aquí.
          </p>
          {!isPremium && (
            <>
              <button
                onClick={handleGoToPremiumPage}
                className="mt-6 inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-yellow-500 hover:via-red-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
              >
                <ShieldCheck className="w-6 h-6 mr-2.5" />
                Accede al Plan Premium
              </button>
              <p className="text-xs text-yellow-300 opacity-80 mt-2">Beneficios exclusivos y acceso ilimitado a especialistas.</p>
            </>
          )}
           {isPremium && (
             <div className="mt-6 p-4 bg-green-600/20 border border-green-500 rounded-lg text-green-300 inline-block">
                <ShieldCheck className="w-6 h-6 mr-2 inline-block" />
                ¡Eres miembro Premium! Disfruta de todos los beneficios.
             </div>
           )}
        </header>

        <section className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-2xl border border-gray-700/60">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Filter className="w-6 h-6 text-purple-400 mr-2.5" />
            Filtrar por Especialidad
          </h2>
          <div className="flex flex-wrap gap-2.5 md:gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty.value}
                onClick={() => setSelectedSpecialty(specialty.value)}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800
                  ${
                    selectedSpecialty === specialty.value
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg focus:ring-purple-500'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600/70 hover:text-white focus:ring-gray-500'
                  }`}
              >
                {specialty.label}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          {filteredPsychologists.length > 0 ? (
            filteredPsychologists.map((psychologist) => {
              // Determine if this specific psychologist is unlocked for direct chat (non-premium, single payment)
              const isIndividuallyUnlocked = !isPremium && unlockedPsychologistIds.includes(psychologist.id);
              
              let mainButtonText = 'Agendar Videollamada';
              let mainButtonIcon = <Video className="w-5 h-5 mr-2" />;
              let mainButtonAction = () => handleBookSession(psychologist);
              let mainButtonColor = psychologist.color; // Default to psychologist's theme color

              if (isPremium) {
                mainButtonText = 'Agendar Sesión Premium';
                // mainButtonIcon can remain Video or change if desired
              } else if (isIndividuallyUnlocked) {
                mainButtonText = 'Escribir por WhatsApp';
                mainButtonIcon = <PhoneOutgoing className="w-5 h-5 mr-2" />; // Or MessageCircle
                mainButtonAction = () => handleStartChat(psychologist);
                mainButtonColor = 'from-green-500 to-emerald-500'; // Change color for WhatsApp button
              }

              return (
              <article key={psychologist.id} className={`bg-gray-800 rounded-2xl shadow-xl border border-gray-700/80 overflow-hidden hover:border-transparent hover:shadow-2xl transition-all duration-300 group`}>
                <div className={`h-2 bg-gradient-to-r ${mainButtonColor} group-hover:h-3 transition-all duration-300`}></div> {/* Use dynamic color here */}
                <div className="p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 mb-5">
                    <div className={`w-24 h-24 bg-gradient-to-br ${psychologist.color} rounded-full flex items-center justify-center shadow-lg flex-shrink-0 border-4 border-gray-700 group-hover:border-gray-600 transition-colors`}>
                      <Users className="w-12 h-12 text-white opacity-90" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-0.5">{psychologist.name}</h3>
                      <p className={`font-semibold text-sm ${getSpecialtyTextColor(psychologist.color)} mb-1.5`}>
                        {psychologist.specialty}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                        <span className="flex items-center">
                          <Award className="w-3.5 h-3.5 mr-1 text-gray-500" />
                          {psychologist.experience} de exp.
                        </span>
                        <span className="flex items-center">
                          <Star className="w-3.5 h-3.5 mr-1 text-yellow-400 fill-current" />
                          {psychologist.rating} ({psychologist.reviews} reseñas)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                    {psychologist.bio}
                  </p>

                  <div className="border-t border-b border-gray-700/70 py-4 my-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-center sm:text-left">
                      <p className="text-2xl md:text-3xl font-bold text-white">{psychologist.price}<span className="text-sm font-normal text-gray-400">/sesión</span></p>
                       {(isPremium || isIndividuallyUnlocked) && <span className="text-xs text-green-400">
                         {isPremium ? "(Incluido en Premium)" : "(Sesión Desbloqueada)"}
                        </span>}
                    </div>
                    <div className="text-xs text-green-400 bg-green-900/50 px-3 py-1.5 rounded-full flex items-center border border-green-500/30">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      Próxima disp: <span className="font-semibold ml-1">{psychologist.nextAvailable}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={mainButtonAction}
                      className={`w-full sm:flex-1 bg-gradient-to-r ${mainButtonColor} text-white font-semibold py-3 px-5 rounded-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none shadow-md hover:shadow-lg flex items-center justify-center text-sm`}
                    >
                      {mainButtonIcon}
                      {mainButtonText}
                    </button>
                    <button 
                      title="Enviar mensaje (próximamente)"
                      disabled={isIndividuallyUnlocked} // Disable if already unlocked for WhatsApp
                      className={`w-full sm:w-auto px-5 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center 
                        ${isIndividuallyUnlocked ? 'opacity-50 cursor-not-allowed' : 'opacity-80'}`}
                    >
                      <MessageCircle className="w-5 h-5 sm:mr-0 md:mr-2" /> <span className="hidden md:inline">Mensaje</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
          ) : (
             <div className="text-center py-16 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
              <Filter className="w-16 h-16 text-purple-500/70 mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-semibold text-white mb-3">No hay especialistas para "<span className="text-purple-400">{specialties.find(s => s.value === selectedSpecialty)?.label}</span>"</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                Intenta seleccionando otra especialidad o revisa todas las opciones disponibles.
              </p>
              <button 
                onClick={() => setSelectedSpecialty('all')}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white rounded-lg transition-opacity duration-300 font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Mostrar Todas las Especialidades
              </button>
            </div>
          )}
        </section>

        <section className="text-center bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl mt-10 ring-1 ring-purple-500/30">
          <Users className="w-12 h-12 text-purple-300 mx-auto mb-5 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">¿Buscas algo más específico?</h2>
          <p className="text-purple-200 text-base mb-6 max-w-lg mx-auto leading-relaxed">
            Nuestra red de profesionales cubre una vasta gama de necesidades en salud mental. Contáctanos para una asesoría personalizada y te ayudaremos a encontrar al terapeuta ideal para ti.
          </p>
          <button 
            onClick={() => alert('Redirigiendo a página de contacto o más profesionales... (Implementar)')}
            className="px-10 py-3.5 bg-white text-indigo-700 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-2xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50 text-base"
          >
            Explorar Todos los Profesionales
          </button>
        </section>
      </div>

      {showPaymentModal && psychologistForBooking && (
        // ... (Payment Modal JSX - unchanged)
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-600/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Desbloquear Sesión</h2>
              <button onClick={handleClosePaymentModal} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <p className="text-gray-300 mb-2">Estás a punto de agendar una sesión con:</p>
            <p className="text-xl font-semibold text-purple-400 mb-1">{psychologistForBooking.name}</p>
            <p className="text-md text-gray-400 mb-4">{psychologistForBooking.specialty}</p>
            
            <div className="bg-gray-700/50 p-4 rounded-lg mb-6">
              <p className="text-3xl font-bold text-white text-center">{psychologistForBooking.price} <span className="text-base font-normal text-gray-400">/sesión</span></p>
            </div>

            <p className="text-gray-300 mb-4 text-sm">Selecciona tu método de pago preferido:</p>
            <div className="space-y-3 mb-8">
              {[
                { name: 'Google Pay', icon: <GooglePayIcon />, action: () => console.log('Google Pay selected') },
                { name: 'Apple Pay', icon: <ApplePayIcon />, action: () => console.log('Apple Pay selected') },
                { name: 'PayPal', icon: <PayPalIcon />, action: () => console.log('PayPal selected') },
                { name: 'Tarjeta Crédito/Débito', icon: <CreditCard className="w-6 h-6"/>, action: () => console.log('Card selected') },
                { name: 'PSE (Colombia)', icon: <PSEIcon />, action: () => console.log('PSE selected') },
              ].map(method => (
                <button
                  key={method.name}
                  onClick={method.action}
                  className="w-full flex items-center justify-start p-3 bg-gray-700 hover:bg-gray-600/80 rounded-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <span className="w-6 h-6 mr-3 text-gray-300">{method.icon}</span>
                  {method.name}
                </button>
              ))}
            </div>

            <button
              onClick={handleSimulatedPaymentForSession}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:opacity-90 transition-opacity transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-purple-500/50 flex items-center justify-center text-base"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Pagar {psychologistForBooking.price} y Agendar
            </button>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychologistsPage;
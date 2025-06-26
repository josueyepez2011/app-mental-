// ChatPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Bot, User, Shield, Sparkles, AlertTriangle, Plus, Edit3, Trash2, 
  Mic, Phone, Video, 
  PhoneOff, MicOff, VideoOff, ArrowUpToLine, UserPlus, MessageSquare // Icons for Call UI
} from 'lucide-react';
import EmergencyProtocol from './EmergencyProtocol'; // Assuming this component exists

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isAI: boolean;
}

interface CustomQuestion {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface ChatPageProps {
  companion?: {
    name: string;
    bodyColor: string;
    type: 'cloud' | 'fox' | 'owl' | 'cat' | 'bear' | string; // 'string' can be an emoji
    avatarUrl?: string; // For custom image in call UI
  };
}

const INACTIVITY_TIMEOUT_MS = 2500;

const HIGH_PRIORITY_CRISIS_PHRASES = [
  'quiero morir', 'quiero matarme', 'quiero dejar de vivir', 'me voy a suicidar',
  'voy a acabar con todo', 'me voy a quitar la vida', 'ya no quiero seguir',
  'desearía estar muerto', 'no tiene sentido vivir', 'me quiero matar',
  'Quiero morir', 'Quiero matarme', 'Quiero dejar de vivir', 'Me voy a suicidar',
  'Voy a acabar con todo', 'Me voy a quitar la vida', 'Ya no quiero seguir',
  'Desearía estar muerto', 'No tiene sentido vivir', 'Me quiero matar'
];

const GENERAL_CRISIS_KEYWORDS = [
  'suicidio', 'acabar con todo', 'no quiero vivir', 'hacerme daño', 'lastimarme',
  'terminar con mi vida', 'no vale la pena vivir', 'mejor muerto',
  'desaparecer para siempre', 'ya no puedo más', 'estoy desesperado',
  'no veo salida', 'dolor insoportable'
];


const ChatPage: React.FC<ChatPageProps> = ({ companion }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [renderPanel, setRenderPanel] = useState(false);
  const [animatePanelClass, setAnimatePanelClass] = useState('opacity-0 translate-y-8');

  const [consecutiveCrisisMessages, setConsecutiveCrisisMessages] = useState(0);

  const [isEmergencyProtocolActive, setIsEmergencyProtocolActive] = useState(false);
  const [emergencyTriggerReason, setEmergencyTriggerReason] = useState('');

  // --- Call UI State ---
  const [isVoiceCallActive, setIsVoiceCallActive] = useState(false);
  const [isCallMuted, setIsCallMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false); 


  const predefinedQuestions = [
    { id: 'depression-1', question: '¿Por qué me siento tan vacío todo el tiempo?', answer: 'El vacío emocional...', category: 'Depresión' },
    { id: 'depression-2', question: '¿Alguna vez volveré a sentirme normal?', answer: 'SÍ, absolutamente...', category: 'Depresión' },
    { id: 'suicidal-1', question: '¿Qué sentido tiene seguir intentando?', answer: 'Entiendo que el dolor...', category: 'Crisis' },
    { id: 'call-911', question: '911', answer: 'Entendido. Intentando abrir tu app de teléfono...', category: 'Emergencia Directa' },
  ];

  const categories = ['general', 'Depresión', 'Ansiedad', 'Autoestima', 'Soledad', 'Control', 'Crisis', 'Decisiones', 'Sueño', 'Relaciones', 'Emergencia Directa'];

  const activateEmergencyProtocol = (reason: string) => {
    console.warn("ACTIVANDO PROTOCOLO DE EMERGENCIA:", reason);
    setEmergencyTriggerReason(reason);
    setIsEmergencyProtocolActive(true);
  };

  const deactivateEmergencyProtocol = () => {
    setIsEmergencyProtocolActive(false);
    setEmergencyTriggerReason('');
    setConsecutiveCrisisMessages(0);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, aiLoading]);

  useEffect(() => {
    const savedQuestions = localStorage.getItem('customQuestions');
    if (savedQuestions) {
      try {
        setCustomQuestions(JSON.parse(savedQuestions));
      } catch (error) {
        console.error("Error al parsear customQuestions de localStorage:", error);
        localStorage.removeItem('customQuestions');
      }
    }
    return () => {
      stopRecordingAndCleanup();
      if (recognitionRef.current) {
        const rec = recognitionRef.current;
        rec.onstart = null; rec.onresult = null; rec.onerror = null; rec.onend = null;
        rec.onaudiostart = null; rec.onaudioend = null; rec.onsoundstart = null;
        rec.onsoundend = null; rec.onspeechstart = null; rec.onspeechend = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const animationDuration = 300;
    if (showQuestions) {
      setRenderPanel(true);
      const timer = setTimeout(() => setAnimatePanelClass('opacity-100 translate-y-0'), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimatePanelClass('opacity-0 translate-y-8');
      const timer = setTimeout(() => setRenderPanel(false), animationDuration);
      return () => clearTimeout(timer);
    }
  }, [showQuestions]);

  const saveCustomQuestions = (questions: CustomQuestion[]) => {
    try {
      localStorage.setItem('customQuestions', JSON.stringify(questions));
      setCustomQuestions(questions);
    } catch (error) {
      console.error("Error al guardar customQuestions en localStorage:", error);
    }
  };
  
  const detectGeneralCrisisKeywords = (message: string): boolean => {
    if (message.trim().toLowerCase() === "911") return false;
    const lowerMessage = message.toLowerCase();
    return GENERAL_CRISIS_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
  };

  const handle911 = () => {
    console.log("Intentando marcar 911...");
    window.location.href = 'tel:911'; 
  };

  const findDirectAnswer = (message: string): string | null => {
    const lowerMessage = message.toLowerCase().trim();
    if (lowerMessage === "911") {
      return predefinedQuestions.find(q => q.id === 'call-911')?.answer || "Intentando abrir la marcación para 911.";
    }
    const predefinedMatch = predefinedQuestions.find(q =>
      lowerMessage.includes(q.question.toLowerCase()) ||
      q.question.toLowerCase().includes(lowerMessage) ||
      (lowerMessage.includes('vacío') && q.id === 'depression-1') ||
      (lowerMessage.includes('normal') && lowerMessage.includes('volver') && q.id === 'depression-2') ||
      (lowerMessage.includes('sentido') && lowerMessage.includes('intentar') && q.id === 'suicidal-1')
    );
    if (predefinedMatch) return predefinedMatch.answer;
    const customMatch = customQuestions.find(q =>
      lowerMessage.includes(q.question.toLowerCase()) ||
      q.question.toLowerCase().includes(lowerMessage)
    );
    if (customMatch) return customMatch.answer;
    return null;
  };

  const generateGenericResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase().trim();
    const companionName = companion?.name || 'MentalCare AI';

    if (HIGH_PRIORITY_CRISIS_PHRASES.some(phrase => lowerMessage.includes(phrase)) || detectGeneralCrisisKeywords(lowerMessage)) {
      if (lowerMessage !== "911") {
        return `Entiendo que estás pasando por un momento extremadamente difícil... Llama al 911 o al número de emergencia...`;
      }
    }
    
    if (/\b(hola|buen[ao]s (d[íi]as|tardes|noches)|qu[eé] tal)\b/i.test(lowerMessage)) {
      return `¡Hola! Soy ${companionName}, tu asistente de IA para apoyo en salud mental. ¿Cómo puedo ayudarte hoy?`;
    }
    if (/\b(qui[eé]n eres|qu[eé] eres|para qu[eé] sirves)\b/i.test(lowerMessage)) {
      return `Soy ${companionName}, un asistente virtual diseñado para ofrecer información general y apoyo en temas de salud mental...`;
    }
    return `Gracias por compartir esto conmigo: "${message}". ${companionName} está aquí para escucharte...`;
  };

  const processMessageForCrisis = (text: string): { activeProtocol: boolean; reason: string } => {
    const lowerText = text.toLowerCase().trim();
    
    for (const phrase of HIGH_PRIORITY_CRISIS_PHRASES) {
      if (lowerText.includes(phrase)) {
        return { activeProtocol: true, reason: `Declaración directa: "${text}"` };
      }
    }
    return { activeProtocol: false, reason: "" };
  };

  const sendMessage = async () => {
    if (isEmergencyProtocolActive || isVoiceCallActive) return;
    if (newMessage.trim() === '') return;
    if (isRecording) stopRecordingAndCleanup();

    const userMessageText = newMessage;
    setNewMessage('');

    const userMessage: Message = { id: Date.now().toString(), text: userMessageText, sender: 'user', timestamp: new Date(), isAI: false };
    setMessages(prev => [...prev, userMessage]);

    const lowerUserMessage = userMessageText.toLowerCase().trim();

    if (lowerUserMessage === "911") {
      handle911();
    }

    let protocolShouldActivate = false;
    let reasonForActivation = "";

    for (const phrase of HIGH_PRIORITY_CRISIS_PHRASES) {
      if (lowerUserMessage.includes(phrase)) {
        protocolShouldActivate = true;
        reasonForActivation = `Declaración directa: "${userMessageText}"`;
        setConsecutiveCrisisMessages(0); 
        break;
      }
    }

    if (!protocolShouldActivate) {
      const isGeneralCrisis = detectGeneralCrisisKeywords(userMessageText);
      if (isGeneralCrisis) {
        const newCount = consecutiveCrisisMessages + 1;
        setConsecutiveCrisisMessages(newCount);
        if (newCount >= 2) { 
          protocolShouldActivate = true;
          reasonForActivation = `Múltiples (${newCount}) mensajes de crisis. Último: "${userMessageText}"`;
        }
      } else {
        setConsecutiveCrisisMessages(0); 
      }
    }

    if (protocolShouldActivate) {
      activateEmergencyProtocol(reasonForActivation);
      setAiLoading(false);
      return; 
    }

    setAiLoading(true);

    setTimeout(() => {
      if (isEmergencyProtocolActive || isVoiceCallActive) {
        setAiLoading(false);
        return;
      }
      const directAnswer = findDirectAnswer(userMessageText);
      const responseText = directAnswer || generateGenericResponse(userMessageText);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: companion?.name ? `${companion.name} & MentalCare AI` : 'MentalCare AI',
        timestamp: new Date(),
        isAI: true
      };

      setMessages(prev => [...prev, aiMessage]);
      setAiLoading(false);
    }, 1000 + Math.random() * 500);
  };

  const sendPredefinedQuestion = (question: string, answer: string) => {
    if (isEmergencyProtocolActive || isVoiceCallActive) return;

    if (question.trim().toLowerCase() === "911") {
      handle911();
    }

    const userMessage: Message = { id: Date.now().toString(), text: question, sender: 'user', timestamp: new Date(), isAI: false };
    setMessages(prev => [...prev, userMessage]); 

    const lowerQuestion = question.toLowerCase().trim();
    let protocolShouldActivate = false;
    let reasonForActivation = "";

    for (const phrase of HIGH_PRIORITY_CRISIS_PHRASES) {
      if (lowerQuestion.includes(phrase)) {
        protocolShouldActivate = true;
        reasonForActivation = `Declaración directa (predefinida): "${question}"`;
        setConsecutiveCrisisMessages(0);
        break;
      }
    }

    if (!protocolShouldActivate) {
      const isGeneralCrisis = detectGeneralCrisisKeywords(question);
      if (isGeneralCrisis) {
        const newCount = consecutiveCrisisMessages + 1;
        setConsecutiveCrisisMessages(newCount);
        if (newCount >= 2) {
          protocolShouldActivate = true;
          reasonForActivation = `Múltiples (${newCount}) mensajes de crisis (predefinida). Última: "${question}"`;
        }
      } else if (question.trim().toLowerCase() !== "911") { 
        setConsecutiveCrisisMessages(0);
      }
    }
    
    setShowQuestions(false);

    if (protocolShouldActivate) {
      activateEmergencyProtocol(reasonForActivation);
      return;
    }
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: answer,
      sender: companion?.name ? `${companion.name} & MentalCare AI` : 'MentalCare AI',
      timestamp: new Date(),
      isAI: true
    };
    setMessages(prev => [...prev, aiMessage]);
  };
  
  const addCustomQuestion = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    const customQ: CustomQuestion = { id: Date.now().toString(), question: newQuestion, answer: newAnswer, category: selectedCategory };
    const updatedQuestions = [...customQuestions, customQ];
    saveCustomQuestions(updatedQuestions);
    setNewQuestion('');
    setNewAnswer('');
  };

  const deleteCustomQuestion = (id: string) => {
    const updatedQuestions = customQuestions.filter(q => q.id !== id);
    saveCustomQuestions(updatedQuestions);
  };

  const groupedQuestions = [...predefinedQuestions, ...customQuestions].reduce((acc, qItem) => {
    const category = qItem.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(qItem);
    return acc;
  }, {} as Record<string, (CustomQuestion | typeof predefinedQuestions[0])[]>);

  const clearInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  };

  const stopRecordingAndCleanup = () => {
    if (recognitionRef.current && isRecording) {
        recognitionRef.current.stop(); 
    }
    clearInactivityTimer();
  };

  const resetInactivityTimer = () => {
    clearInactivityTimer();
    inactivityTimerRef.current = setTimeout(() => {
      console.log(`Inactividad detectada (${INACTIVITY_TIMEOUT_MS/1000}s), deteniendo grabación.`);
      stopRecordingAndCleanup();
    }, INACTIVITY_TIMEOUT_MS);
  };

  const toggleRecording = () => {
    if (isEmergencyProtocolActive || isVoiceCallActive) return;

    const SpeechRecognitionAPI = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      alert('Tu navegador no soporta el reconocimiento de voz.');
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = true; 
      recognitionRef.current.interimResults = true; 
      recognitionRef.current.lang = 'es-ES';

      recognitionRef.current.onstart = () => {
        console.log("Speech recognition started");
        setIsRecording(true);
        resetInactivityTimer();
      };

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        let finalTranscript = "";
        let hasNewSpeech = false;

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
            if (event.results[i][0].transcript.trim() !== "") {
              hasNewSpeech = true; 
            }
        }
        setNewMessage(finalTranscript || interimTranscript);
        
        if(hasNewSpeech) {
            resetInactivityTimer(); 
        }
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Error en reconocimiento:', event.error, event.message);
        let errorMsg = `Error: ${event.error}.`;
        if (event.error === 'no-speech') errorMsg = "No se detectó voz.";
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') errorMsg = "Permiso de micrófono denegado.";
        else if (event.error === 'audio-capture') errorMsg = "Problema con micrófono.";
        else if (event.error === 'network') errorMsg = "Problema de red.";
        alert(errorMsg);
        clearInactivityTimer(); 
      };

      recognitionRef.current.onend = () => {
        console.log("Speech recognition ended");
        setIsRecording(false); 
        clearInactivityTimer(); 
      };
    }

    if (isRecording) {
      stopRecordingAndCleanup(); 
    } else {
      setNewMessage(''); 
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e: any) {
          console.error("Error al iniciar reconocimiento:", e.message);
          if (e.name === 'InvalidStateError') {
             console.warn("Intento de iniciar reconocimiento en estado inválido.");
          } else {
             alert("No se pudo iniciar la grabación. Verifica permisos.");
          }
          setIsRecording(false); 
        }
      }
    }
  };
  
  // --- Call UI Functions ---
  const startVoiceCall = () => {
    if (isEmergencyProtocolActive) return;

    // --- START WHATSAPP INTEGRATION ---
    // Número de WhatsApp al que se intentará contactar (ej. Colombia +57)
    // El número debe estar en formato internacional SIN el '+', '00', espacios o guiones.
    const countryCode = "57"; // Código de país para Colombia
    const localPhoneNumber = "3126268815"; // Tu número local
    const fullWhatsappNumber = countryCode + localPhoneNumber;
    
    // Puedes agregar un mensaje predefinido (opcional). Debe estar codificado para URL.
    // const prefilledMessage = encodeURIComponent("Hola, necesito ayuda desde la app MentalCare.");
    // const whatsappUrl = `https://wa.me/${fullWhatsappNumber}?text=${prefilledMessage}`;
    const whatsappUrl = `https://wa.me/${fullWhatsappNumber}`;
    
    console.log(`Intentando abrir WhatsApp para el número: ${fullWhatsappNumber} con URL: ${whatsappUrl}`);
    // Esto abrirá WhatsApp en una nueva pestaña/ventana o cambiará a la aplicación de WhatsApp si está instalada.
    // El usuario deberá iniciar la llamada manualmente desde WhatsApp.
    window.open(whatsappUrl, '_blank'); 
    // --- END WHATSAPP INTEGRATION ---

    // Activa la UI de llamada simulada en tu aplicación
    setIsVoiceCallActive(true);
    setIsCallMuted(false); // Establece el micrófono como NO silenciado en la UI simulada
    setIsVideoOn(false);   // El video comienza apagado por defecto en la UI simulada
  };

  const endVoiceCall = () => {
    setIsVoiceCallActive(false);
    // No necesitas interactuar con WhatsApp aquí, solo cierras tu UI simulada.
  };

  const toggleCallMute = () => {
    setIsCallMuted(prev => !prev);
    // Esto solo afecta el ícono en tu UI simulada. No silencia/activa el micrófono en WhatsApp.
    console.log(isCallMuted ? "Micrófono (simulado) activado" : "Micrófono (simulado) silenciado");
  };
  
  const toggleVideo = () => {
    setIsVideoOn(prev => !prev);
    console.log(isVideoOn ? "Video (simulado) apagado" : "Video (simulado) encendido");
    alert("La función de video real no está implementada en esta demo.");
  };

  // --- End Call UI Functions ---
  
  const startVideoCallWithProfessional = () => {
    // Podrías usar una lógica similar a startVoiceCall si el profesional también usa WhatsApp.
    // O integrar un servicio de videollamadas diferente.
    alert('Función de videollamada con profesional no implementada en esta demo.');
  };
  
  const getCompanionEmoji = () => {
    if (!companion) return '🧠'; 
    switch (companion.type) {
      case 'cloud': return '☁️';
      case 'fox': return '🦊';
      case 'owl': return '🦉';
      case 'cat': return '🐱';
      case 'bear': return '🐻';
      default: return companion.type; 
    }
  };

  return (
    <>
      <EmergencyProtocol
        isActive={isEmergencyProtocolActive}
        onDeactivate={deactivateEmergencyProtocol}
        triggerReason={emergencyTriggerReason}
      />
      
      {isVoiceCallActive && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col items-center justify-between p-4 sm:p-8 z-50 animate-fadeIn">
          <div className="flex flex-col items-center text-center mt-8 sm:mt-16 flex-grow justify-center">
            <div 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-5xl sm:text-6xl mb-4 shadow-lg bg-center bg-cover" 
              style={
                companion?.avatarUrl 
                  ? { backgroundImage: `url(${companion.avatarUrl})` } 
                  : { backgroundColor: companion?.bodyColor || '#374151' } 
              }
              title={companion?.name || 'MentalCare AI'}
            >
              {!companion?.avatarUrl && <span>{getCompanionEmoji()}</span>}
            </div>
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-1 flex items-center">
              <span>{companion?.name || 'MentalCare AI'}</span>
              {companion?.name === 'Isaaa' && <span className="ml-2 text-xl">👍❤️</span>}
            </h2>
            <p className="text-gray-400 text-lg">Abriendo WhatsApp para llamar...</p>
            <p className="text-gray-300 text-sm mt-2">Por favor, inicia la llamada desde WhatsApp.</p>
          </div>

          <div className="flex flex-col items-center w-full max-w-md mb-4 sm:mb-8">
            <div className="grid grid-cols-3 gap-4 mb-6 sm:mb-8 w-full px-4">
              <button 
                onClick={toggleCallMute} 
                className="p-3 bg-gray-700 bg-opacity-70 rounded-full text-white hover:bg-gray-600 transition-colors flex flex-col items-center justify-center aspect-square"
                title={isCallMuted ? "Activar micrófono (simulado)" : "Silenciar micrófono (simulado)"}
              >
                {isCallMuted ? <MicOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Mic className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
              <button 
                onClick={toggleVideo} 
                className="p-3 bg-gray-700 bg-opacity-70 rounded-full text-white hover:bg-gray-600 transition-colors flex flex-col items-center justify-center aspect-square"
                title={isVideoOn ? "Apagar video (simulado)" : "Encender video (simulado, no implementado)"}
              >
                {isVideoOn ? <Video className="w-5 h-5 sm:w-6 sm:h-6" /> : <VideoOff className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
               <button 
                className="p-3 bg-gray-700 bg-opacity-70 rounded-full text-white hover:bg-gray-600 transition-colors flex flex-col items-center justify-center aspect-square"
                title="Compartir pantalla (no implementado)"
                onClick={() => alert("Compartir pantalla no implementado")}
              >
                <ArrowUpToLine className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button 
                className="p-3 bg-gray-700 bg-opacity-70 rounded-full text-white hover:bg-gray-600 transition-colors flex flex-col items-center justify-center aspect-square"
                title="Añadir participante (no implementado)"
                onClick={() => alert("Añadir participante no implementado")}
              >
                <UserPlus className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
               <button 
                className="p-3 bg-gray-700 bg-opacity-70 rounded-full text-white hover:bg-gray-600 transition-colors flex flex-col items-center justify-center aspect-square"
                title="Abrir chat (no implementado)"
                onClick={() => alert("Abrir chat no implementado")}
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
               <button
                onClick={endVoiceCall}
                className="p-3.5 sm:p-4 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors shadow-lg flex flex-col items-center justify-center aspect-square"
                title="Cerrar esta pantalla (no finaliza la llamada de WhatsApp)"
              >
                <PhoneOff className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`flex flex-col h-screen bg-gray-900 ${isEmergencyProtocolActive || isVoiceCallActive ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-2 text-center text-xs">
          <div className="flex items-center justify-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Si estás en crisis: 988 (Prevención Suicidio) | 911 (Emergencia)</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-lg bg-center bg-cover"
                    style={
                        companion?.avatarUrl && companion?.type !== 'cloud' && companion?.type !== 'fox' && companion?.type !== 'owl' && companion?.type !== 'cat' && companion?.type !== 'bear'
                        ? { backgroundImage: `url(${companion.avatarUrl})` } 
                        : { backgroundColor: companion?.bodyColor || 'transparent' }
                    } 
                    title={companion?.name || 'MentalCare AI'}
                >
                    {(!companion?.avatarUrl || ['cloud', 'fox', 'owl', 'cat', 'bear'].includes(companion?.type || '')) && <span>{getCompanionEmoji()}</span> }
                </div>
                </div>
                <div>
                <h2 className="font-bold">
                    {companion?.name ? `${companion.name} & MentalCare AI` : 'MentalCare AI'}
                </h2>
                <div className="flex items-center space-x-1 text-xs text-green-100">
                    <Shield className="w-3 h-3" />
                    <span>Apoyo y información general</span>
                </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <button 
                onClick={startVoiceCall} 
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                aria-label="Iniciar llamada de voz vía WhatsApp"
                >
                <Phone className="w-4 h-4" />
                </button>
                <button
                onClick={startVideoCallWithProfessional}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                aria-label="Iniciar videollamada con un profesional"
                >
                <Video className="w-4 h-4" />
                </button>
            </div>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.length === 0 && !aiLoading ? ( 
            <div className="text-center py-8 flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-center bg-cover"
                     style={
                        companion?.avatarUrl && companion?.type !== 'cloud' && companion?.type !== 'fox' && companion?.type !== 'owl' && companion?.type !== 'cat' && companion?.type !== 'bear'
                        ? { backgroundImage: `url(${companion.avatarUrl})` } 
                        : { backgroundColor: companion?.bodyColor || 'transparent' }
                    }
                    title={companion?.name || 'MentalCare AI'}
                    >
                    {(!companion?.avatarUrl || ['cloud', 'fox', 'owl', 'cat', 'bear'].includes(companion?.type || '')) && <span>{getCompanionEmoji()}</span> }
                    </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                Hola, {companion?.name ? `soy ${companion.name} junto con ` : 'soy '} <span className="font-bold text-green-400">MentalCare AI</span>.
                <br />
                Estoy aquí para ofrecerte información general y apoyo en temas de salud mental.
                <br />
                <span className="text-green-400 font-medium">Puedes escribir, grabar tu voz, o usar los botones de contacto directo (incluyendo WhatsApp).</span>
                <br />
                <span className="text-gray-400 text-xs mt-2 block">Recuerda: No soy un sustituto de un profesional. En emergencia llama al 911 (o di "911" aquí).</span>
                </p>
            </div>
            ) : (
            messages.map((msg) => (
                <div
                key={msg.id}
                className={`flex items-end space-x-3 ${msg.isAI ? '' : 'flex-row-reverse space-x-reverse'}`}
                >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg bg-center bg-cover ${
                    msg.isAI 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}
                style={
                    msg.isAI && companion?.avatarUrl && companion?.type !== 'cloud' && companion?.type !== 'fox' && companion?.type !== 'owl' && companion?.type !== 'cat' && companion?.type !== 'bear'
                    ? { backgroundImage: `url(${companion.avatarUrl})`, backgroundColor: 'transparent' } 
                    : msg.isAI && companion?.bodyColor ? { backgroundColor: companion.bodyColor }
                    : {} 
                }
                >
                    {msg.isAI ? (
                        (!companion?.avatarUrl || ['cloud', 'fox', 'owl', 'cat', 'bear'].includes(companion?.type || '')) && <span className="text-xs">{getCompanionEmoji()}</span>
                    ) : (
                    <User className="w-4 h-4 text-white" />
                    )}
                </div>
                <div className={`max-w-[85%] p-3 md:p-4 rounded-2xl shadow-lg ${
                    msg.isAI
                    ? 'bg-gray-800 text-gray-100 border border-gray-700'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${
                        msg.isAI ? 'text-gray-400' : 'text-purple-100 opacity-80'
                    }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.isAI && (
                        <span className="text-xs text-green-400 font-medium ml-2">
                        {msg.sender}
                        </span>
                    )}
                    </div>
                </div>
                </div>
            ))
            )}
            
            {aiLoading && (
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg bg-center bg-cover"
                 style={
                    companion?.avatarUrl && companion?.type !== 'cloud' && companion?.type !== 'fox' && companion?.type !== 'owl' && companion?.type !== 'cat' && companion?.type !== 'bear'
                    ? { backgroundImage: `url(${companion.avatarUrl})`, backgroundColor: 'transparent' } 
                    : companion?.bodyColor ? { backgroundColor: companion.bodyColor }
                    : {}
                }
                >
                 {(!companion?.avatarUrl || ['cloud', 'fox', 'owl', 'cat', 'bear'].includes(companion?.type || '')) && <span className="text-xs">{getCompanionEmoji()}</span> }
                </div>
                <div className="max-w-[75%] p-3 rounded-2xl bg-gray-800 border border-gray-700 shadow-lg">
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                </div>
            </div>
            )}
            
            <div ref={messagesEndRef} style={{ height: '1px' }} /> 
        </div>

        {renderPanel && (
          <div 
            className={`
              bg-gray-800 max-h-80 overflow-y-auto 
              transition-all duration-300 ease-out 
              ${animatePanelClass} 
            `}
          >
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Preguntas de Apoyo</h3>
                <button
                    onClick={() => setShowCustomForm(!showCustomForm)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm hover:opacity-90 transition-opacity"
                    disabled={isEmergencyProtocolActive || isVoiceCallActive}
                >
                    <Plus className="w-4 h-4" />
                    <span>{showCustomForm ? 'Ocultar Formulario' : 'Agregar Pregunta'}</span>
                </button>
                </div>

                {showCustomForm && (
                <div className="bg-gray-700 rounded-xl p-4 mb-4 space-y-3">
                    <input type="text" placeholder="Escribe tu pregunta personalizada..." value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)}
                    className="w-full p-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    <textarea placeholder="Escribe la respuesta que la IA debería dar..." value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} rows={3}
                    className="w-full p-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                    </select>
                    <div className="flex space-x-2">
                    <button onClick={addCustomQuestion} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-lg font-medium hover:opacity-90">Guardar Pregunta</button>
                    <button onClick={() => setShowCustomForm(false)} className="px-4 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500">Cancelar</button>
                    </div>
                </div>
                )}

                <div className="space-y-4">
                {Object.entries(groupedQuestions).map(([category, questionsInCategory]) => (
                    <div key={category}>
                    <h4 className="font-semibold text-purple-400 mb-2 text-sm">{category}</h4>
                    <div className="space-y-2">
                        {questionsInCategory.map((q) => (
                        <div key={q.id} className="flex items-center space-x-2">
                            <button onClick={() => sendPredefinedQuestion(q.question, q.answer)}
                            className="flex-1 text-left p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors">
                            {q.question}
                            </button>
                            {customQuestions.some(cq => cq.id === q.id) && (
                            <button onClick={() => deleteCustomQuestion(q.id)} className="p-2 text-red-400 hover:text-red-300" aria-label={`Eliminar: ${q.question}`}>
                                <Trash2 className="w-4 h-4" />
                            </button>
                            )}
                        </div>
                        ))}
                    </div>
                    </div>
                ))}
                </div>
            </div>
          </div>
        )}

        <div className="p-4 bg-gray-800 border-t border-gray-700">
            <div className="flex items-center space-x-2 md:space-x-3">
            <input type="text"
                className="flex-1 p-3 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-gray-700 text-white placeholder-gray-400"
                placeholder={isRecording ? "Escuchando..." : "Escribe o usa el micrófono..."}
                value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
                disabled={aiLoading || isEmergencyProtocolActive || isVoiceCallActive}
            />
            <button onClick={() => setShowQuestions(!showQuestions)}
                aria-label={showQuestions ? "Ocultar preguntas" : "Mostrar preguntas"}
                className={`p-3 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 ${showQuestions ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                disabled={aiLoading || isEmergencyProtocolActive || isVoiceCallActive}>
                <Edit3 className="w-5 h-5" />
            </button>
            <button onClick={toggleRecording}
                aria-label={isRecording ? "Detener grabación" : "Iniciar grabación"}
                className={`p-3 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                disabled={aiLoading || isEmergencyProtocolActive || isVoiceCallActive}>
                <Mic className="w-5 h-5" />
            </button>
            <button onClick={sendMessage} aria-label="Enviar mensaje"
                className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={aiLoading || newMessage.trim() === '' || isEmergencyProtocolActive || isVoiceCallActive}>
                <Send className="w-5 h-5" />
            </button>
            </div>
            {isRecording && !isEmergencyProtocolActive && !isVoiceCallActive && (
            <div className="text-center mt-2">
                <p className="text-xs text-red-400 animate-pulse">
                🔴 Grabando... {INACTIVITY_TIMEOUT_MS/1000}s de silencio para detener.
                </p>
            </div>
            )}
            <div className="text-center mt-2">
            <p className="text-xs text-gray-500">
                {companion?.name ? `${companion.name} & ` : ''}MentalCare AI • En crisis: 988 o di "911". Contacto WhatsApp disponible.
            </p>
            </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
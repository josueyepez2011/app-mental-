import React, { useState, useEffect, useRef } from 'react'; // Agrega useRef
import { AlertTriangle, Phone, Shield, Heart, MapPin } from 'lucide-react';
import { getCurrentUser, saveEmergencyLog } from '../lib/supabase';

interface EmergencyProtocolProps {
  isActive: boolean;
  onDeactivate: () => void;
  triggerReason: string;
}

const EmergencyProtocol: React.FC<EmergencyProtocolProps> = ({
  isActive,
  onDeactivate,
  triggerReason
}) => {
  const [countdown, setCountdown] = useState(60);
  const [isConnecting, setIsConnecting] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [hasLoggedEmergency, setHasLoggedEmergency] = useState(false);

  // Ref para el enlace de llamada
  const call911LinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        setEmergencyContact(prefs.emergencyContact || '');
        setEmergencyContactName(prefs.emergencyContactName || '');
      } catch (error) {
        console.error("Error al parsear userPreferences de localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      setCountdown(60);
      setIsConnecting(false);
      setHasLoggedEmergency(false);
      logEmergencyActivation();
    }
  }, [isActive]);

  const logEmergencyActivation = async () => {
    if (hasLoggedEmergency) return;
    
    try {
      const currentUser = getCurrentUser(); // Asume que esto devuelve { name, email, id } o null/undefined
      const emergencyData = {
        user_name: currentUser?.name || 'Usuario Anónimo',
        user_email: currentUser?.email || 'email@desconocido.com',
        emergency_contact_name: emergencyContactName || 'No especificado',
        emergency_contact_phone: emergencyContact || 'No especificado',
        trigger_reason: triggerReason,
        user_id: currentUser?.id || undefined // Asegúrate que tu tabla maneja user_id nulo si es anónimo
      };

      await saveEmergencyLog(emergencyData);
      setHasLoggedEmergency(true);
      console.log('Emergency activation logged successfully');
    } catch (error) {
      console.error('Error logging emergency activation:', error);
    }
  };
  
  const initiate911Call = () => {
    if (call911LinkRef.current) {
      call911LinkRef.current.click();
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isActive && !isConnecting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) { // Cuando countdown va a ser 0 en el próximo tick
            clearInterval(timer);
            setIsConnecting(true);
            // Inmediatamente después de setIsConnecting, intentar la llamada
            // y luego esperar un poco para la UI si es necesario
            if (isActive && !document.hidden) { // Comprobar isActive y visibilidad de nuevo
                initiate911Call(); // LLAMAR AL 911
            }
            // setTimeout para el cambio visual de "conectando"
            // setTimeout(() => {
            //   // Lógica de UI si es necesaria después de un delay
            // }, 1500); // Este delay era para la UI, la llamada es antes
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (countdown === 0 && isActive && !isConnecting) {
      // Este bloque es un fallback si el anterior no se ejecutó a tiempo
      // o si se llegó a 0 por otra vía (ej. handleConnectNow sin delay)
      setIsConnecting(true);
      if (isActive && !document.hidden) {
        initiate911Call(); // LLAMAR AL 911
      }
      // setTimeout(() => {
      //     // Lógica de UI si es necesaria
      // }, 1500);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isActive, countdown, isConnecting]); // No es necesario 'initiate911Call' como dependencia aquí

  const handleConnectNow = () => {
    setIsConnecting(true);
    setCountdown(0); // Poner el countdown a 0 para que la lógica del useEffect pueda actuar
                     // o llamar directamente si la lógica de useEffect no lo cubre instantáneamente.
    if (isActive && !document.hidden) {
        initiate911Call(); // LLAMAR AL 911 inmediatamente
    }
    // El setTimeout aquí es solo si quieres un delay *visual* antes de mostrar "Conectando..."
    // pero la llamada ya se inició.
    // setTimeout(() => {
    //   // if (isActive && !document.hidden) {
    //   // }
    // }, 1000);
  };

  const handleCancel = () => {
    setIsConnecting(false);
    setCountdown(60); // O el valor inicial que prefieras
    onDeactivate();
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-red-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Enlace oculto para la llamada */}
      <a ref={call911LinkRef} href="tel:911" style={{ display: 'none' }} aria-hidden="true">
        Llamar al 911
      </a>

      <div className="bg-gray-900 rounded-3xl max-w-sm w-full p-6 border-2 border-red-500 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">
            Protocolo de Emergencia Activado
          </h2>
          <p className="text-red-300 text-sm">
            Detectamos que podrías necesitar ayuda inmediata.
          </p>
        </div>

        <div className="bg-red-900/30 border border-red-500/30 rounded-2xl p-4 mb-6">
          <h3 className="font-bold text-red-400 mb-2">Motivo de activación:</h3>
          <p className="text-red-300 text-sm">{triggerReason}</p>
        </div>

        {!isConnecting ? (
          <>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-white mb-2">
                {countdown}
              </div>
              <p className="text-gray-300 text-sm">
                {countdown > 0 ? `Conectando con un profesional este servicio est tolmente gartuito  ${countdown} segundos...` : "Preparando conexión..."}
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${countdown > 0 ? ((60 - countdown) / 60) * 100 : 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleConnectNow}
                className="w-full bg-red-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg hover:bg-red-600 transition-colors"
                disabled={countdown === 0 && isConnecting} // Deshabilitar si ya se está conectando
              >
                <Phone className="w-5 h-5" />
                <span>Llamar al 911 AHORA</span>
              </button>
              
              <button
                onClick={handleCancel}
                className="w-full bg-gray-700 text-gray-300 font-medium py-3 rounded-2xl hover:bg-gray-600 transition-colors"
              >
                Estoy bien, cancelar protocolo
              </button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
              <Phone className="w-8 h-8 text-white" /> {/* Cambiado a Phone para consistencia */}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Conectando con 911...
              </h3>
              <p className="text-gray-300 text-sm">
                Se está intentando establecer la llamada al 911.
                Por favor, confirma la llamada en tu dispositivo si es necesario.
              </p>
              <p className="text-gray-300 text-xs mt-1">
                Este servicio es <span className="font-semibold text-green-400">gratuito y confidencial</span>.
              </p>
            </div>
            <div className="flex space-x-1 justify-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
             <button
                onClick={handleCancel}
                className="w-full mt-4 bg-gray-700 text-gray-300 font-medium py-3 rounded-2xl hover:bg-gray-600 transition-colors"
              >
                Cancelar protocolo
              </button>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-700">
          <h4 className="font-bold text-gray-300 mb-3 flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Contactos de Emergencia Clave
          </h4>
          <div className="space-y-2 text-sm">
            {emergencyContact && emergencyContactName && ( // Mostrar solo si ambos existen
              <div className="flex items-center justify-between">
                <span className="text-gray-400">{emergencyContactName}:</span>
                <a href={`tel:${emergencyContact}`} className="text-white font-semibold hover:text-red-400">{emergencyContact}</a>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Línea de Prev. Suicidio:</span>
              <a href="tel:988" className="text-white font-semibold hover:text-red-400">988</a>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Emergencias Generales:</span>
              <a href="tel:911" className="text-white font-semibold hover:text-red-400">911</a>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-blue-900/30 border border-blue-500/30 rounded-xl p-3">
          <div className="flex items-center space-x-2 text-blue-300 text-xs">
            <MapPin className="w-3 h-3" />
            <span>Tu ubicación podría ser compartida con servicios de emergencia si es necesario para tu seguridad.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyProtocol;
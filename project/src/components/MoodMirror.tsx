import React, { useState, useEffect, useRef } from 'react';
import { Carrot as Mirror, Music, Heart, Sparkles, Play, Pause, Volume2 } from 'lucide-react';

interface MoodMirrorProps {
  currentMood: string;
  onMoodChange: (mood: string) => void;
}

const MoodMirror: React.FC<MoodMirrorProps> = ({ currentMood, onMoodChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- IMPORTANTE ---
  // Reemplaza estas URLs con las URLs REALES de tus streams de Zeno Radio
  // Cada URL debe corresponder al tipo de música para ese estado de ánimo.
  // Si no tienes un stream específico para cada mood, puedes repetir alguno o usar uno genérico.
  const moods = [
    {
      id: 'happy',
      name: 'Feliz',
      emoji: '😊',
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'from-yellow-900/30 to-orange-900/30',
      borderColor: 'border-yellow-500/30',
      landscape: '🌅',
      music: ['Música alegre y energética', 'Pop optimista', 'Reggae relajado'],
      streamUrl: 'https://stream.zeno.fm/YOUR_HAPPY_STREAM_ID', // <-- CAMBIADO Y EJEMPLO
      phrases: [ /* ... */ ],
      exercises: [ /* ... */ ]
    },
    {
      id: 'sad',
      name: 'Triste',
      emoji: '😢',
      color: 'from-blue-400 to-indigo-400',
      bgColor: 'from-blue-900/30 to-indigo-900/30',
      borderColor: 'border-blue-500/30',
      landscape: '🌧️',
      music: ['Música suave y consoladora', 'Baladas emotivas', 'Instrumental relajante'],
      streamUrl: 'https://stream.zeno.fm/YOUR_SAD_STREAM_ID', // <-- CAMBIADO Y EJEMPLO
      phrases: [ /* ... */ ],
      exercises: [ /* ... */ ]
    },
    {
      id: 'anxious',
      name: 'Ansioso',
      emoji: '😰',
      color: 'from-red-400 to-pink-400',
      bgColor: 'from-red-900/30 to-pink-900/30',
      borderColor: 'border-red-500/30',
      landscape: '⛈️',
      music: ['Sonidos de la naturaleza', 'Música de meditación', 'Lo-fi calmante'],
      streamUrl: 'https://stream.zeno.fm/YOUR_ANXIOUS_STREAM_ID', // <-- CAMBIADO Y EJEMPLO
      phrases: [ /* ... */ ],
      exercises: [ /* ... */ ]
    },
    {
      id: 'calm',
      name: 'Tranquilo',
      emoji: '😌',
      color: 'from-green-400 to-teal-400',
      bgColor: 'from-green-900/30 to-teal-900/30',
      borderColor: 'border-green-500/30',
      landscape: '🌿',
      music: ['Ambient relajante', 'Sonidos del océano', 'Música clásica suave'],
      streamUrl: 'https://stream.zeno.fm/YOUR_CALM_STREAM_ID', // <-- CAMBIADO Y EJEMPLO
      phrases: [ /* ... */ ],
      exercises: [ /* ... */ ]
    },
    {
      id: 'energetic',
      name: 'Energético',
      emoji: '🤗',
      color: 'from-purple-400 to-pink-400',
      bgColor: 'from-purple-900/30 to-pink-900/30',
      borderColor: 'border-purple-500/30',
      landscape: '🌟',
      music: ['Música electrónica', 'Rock energético', 'Hip-hop motivacional'],
      streamUrl: 'https://stream.zeno.fm/YOUR_ENERGETIC_STREAM_ID', // <-- CAMBIADO Y EJEMPLO
      phrases: [ /* ... */ ],
      exercises: [ /* ... */ ]
    },
    {
      id: 'confused',
      name: 'Confundido',
      emoji: '😕',
      color: 'from-gray-400 to-slate-400',
      bgColor: 'from-gray-900/30 to-slate-900/30',
      borderColor: 'border-gray-500/30',
      landscape: '🌫️',
      music: ['Música instrumental', 'Jazz suave', 'Sonidos binaurales'],
      streamUrl: 'https://stream.zeno.fm/YOUR_CONFUSED_STREAM_ID', // <-- CAMBIADO Y EJEMPLO
      phrases: [ /* ... */ ],
      exercises: [ /* ... */ ]
    }
  ].map(mood => ({ // Restablecer frases y ejercicios para brevedad
    ...mood,
    phrases: mood.phrases || [],
    exercises: mood.exercises || []
  }));


  const selectedMood = moods.find(m => m.id === currentMood) || moods[0];

  // Efecto para manejar el cambio de mood y las sugerencias
  useEffect(() => {
    // Detener y resetear música si el mood cambia
    if (audioRef.current) {
      audioRef.current.pause();
      // No es necesario cambiar el src aquí, se hará al pulsar play
    }
    setIsPlaying(false);

    if (currentMood) {
      const moodData = moods.find(m => m.id === currentMood);
      if (moodData) {
        const randomSuggestion = {
          music: moodData.music[Math.floor(Math.random() * moodData.music.length)],
          phrase: moodData.phrases[Math.floor(Math.random() * moodData.phrases.length)],
          exercise: moodData.exercises[Math.floor(Math.random() * moodData.exercises.length)],
        };
        setCurrentSuggestion(randomSuggestion);
      }
    }
  }, [currentMood]); // moods es constante, no necesita estar en las dependencias

  // Efecto para limpiar el audio al desmontar el componente
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Liberar el recurso
        audioRef.current = null;
      }
    };
  }, []);

  const handleMoodSelect = (moodId: string) => {
    onMoodChange(moodId);
  };

  const toggleMusic = () => {
    const streamUrl = selectedMood.streamUrl;

    if (!streamUrl) {
      console.warn("No hay URL de stream definida para el mood:", selectedMood.name);
      alert("No hay música configurada para este estado de ánimo.");
      return;
    }

    if (!audioRef.current) {
      console.log("Creando nuevo elemento de Audio para:", streamUrl);
      audioRef.current = new Audio(streamUrl);
      audioRef.current.loop = true; // Para streams, loop puede no ser necesario o comportarse distinto
                                    // Zeno ya debería hacer streaming continuo.
      audioRef.current.addEventListener('error', (e) => {
        console.error("Error en el stream de Audio:", e);
        setIsPlaying(false);
        // Podrías mostrar un mensaje al usuario aquí
        alert("Hubo un error al intentar reproducir la radio. Por favor, verifica la URL del stream o tu conexión.");
      });
      audioRef.current.addEventListener('loadedmetadata', () => {
        console.log("Metadatos cargados para el stream.");
      });
       audioRef.current.addEventListener('canplay', () => {
        console.log("Stream listo para reproducir (canplay).");
        // Si el estado es que debe estar sonando, y ahora puede, reproducir.
        // Esto es importante si el src cambió.
        if (isPlaying && audioRef.current && audioRef.current.paused) {
          audioRef.current.play().catch(e => console.error("Error al auto-reproducir después de canplay:", e));
        }
      });
    } else if (audioRef.current.src !== streamUrl) {
      console.log("Cambiando fuente de Audio a:", streamUrl);
      audioRef.current.pause(); // Pausar antes de cambiar src
      audioRef.current.src = streamUrl;
      audioRef.current.load(); // Es importante llamar a load() para que el navegador cargue el nuevo stream
    }

    if (isPlaying) {
      console.log("Pausando stream");
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      console.log("Intentando reproducir stream:", audioRef.current?.src);
      // Asegurarse de que el audio está cargado o reintentar
      const playPromise = audioRef.current?.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          console.log("Reproducción iniciada");
          setIsPlaying(true);
        }).catch(error => {
          console.error("Error al intentar reproducir:", error);
          // Esto puede pasar si el usuario no ha interactuado con la página,
          // o si el stream tiene problemas.
          setIsPlaying(false);
          alert("No se pudo iniciar la reproducción. Asegúrate de haber interactuado con la página o que el stream sea válido.");
        });
      } else {
          setIsPlaying(false); // No se pudo obtener promesa de reproducción
      }
    }
  };

  return (
    <div className="p-4 space-y-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
          <Mirror className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Espejo Emocional
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Refleja tu estado y recibe contenido personalizado
        </p>
      </div>

      {/* Mood Mirror */}
      <div className={`bg-gradient-to-br ${selectedMood.bgColor} border ${selectedMood.borderColor} rounded-3xl p-6 shadow-2xl`}>
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4 animate-pulse">
            {selectedMood.landscape}
          </div>
          <div className="space-y-2">
            <div className="text-8xl animate-bounce">
              {selectedMood.emoji}
            </div>
            <h3 className="text-2xl font-bold text-white">
              Te sientes {selectedMood.name}
            </h3>
          </div>
          {currentSuggestion && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-white">Mensaje para ti</span>
              </div>
              <p className="text-white text-sm leading-relaxed">
                {currentSuggestion.phrase}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mood Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white text-center">
          ¿Cómo te sientes ahora?
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood.id)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                currentMood === mood.id
                  ? `border-transparent bg-gradient-to-r ${mood.color} text-white shadow-lg`
                  : 'border-gray-600 bg-gray-700 hover:border-gray-500 text-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="font-semibold text-xs">{mood.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Personalized Suggestions */}
      {currentSuggestion && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Sugerencias Personalizadas</h3>
          
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Music className="w-5 h-5 text-purple-400" />
                <span className="font-bold text-white">Música Recomendada</span>
              </div>
              <button
                onClick={toggleMusic}
                disabled={!selectedMood.streamUrl} // Deshabilitar si no hay stream URL
                className={`p-2 rounded-full transition-colors ${
                  isPlaying ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300'
                } ${!selectedMood.streamUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-gray-300 text-sm">{currentSuggestion.music}</p>
            {!selectedMood.streamUrl && <p className="text-xs text-red-400 mt-1">Stream de radio no configurado para este ánimo.</p>}
            {isPlaying && (
              <div className="mt-3 flex items-center space-x-2 text-purple-400">
                <Volume2 className="w-4 h-4" />
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-purple-400 rounded animate-pulse"></div>
                  <div className="w-1 h-6 bg-purple-400 rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-3 bg-purple-400 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-5 bg-purple-400 rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <span className="text-sm">Escuchando radio...</span>
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <div className="flex items-center space-x-2 mb-3">
              <Heart className="w-5 h-5 text-pink-400" />
              <span className="font-bold text-white">Actividad Sugerida</span>
            </div>
            <p className="text-gray-300 text-sm">{currentSuggestion.exercise}</p>
            <button className="mt-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
              Comenzar Actividad
            </button>
          </div>
        </div>
      )}

      {/* Mood History (sigue siendo aleatorio para el ejemplo) */}
      <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
        <h4 className="font-bold text-white mb-3">Tu Espejo Emocional Hoy</h4>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {[...Array(8)].map((_, index) => {
            const randomMood = moods[Math.floor(Math.random() * moods.length)];
            return (
              <div key={index} className="flex-shrink-0 text-center">
                <div className="text-2xl mb-1">{randomMood.emoji}</div>
                <div className="text-xs text-gray-400">{9 + index}:00</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoodMirror;
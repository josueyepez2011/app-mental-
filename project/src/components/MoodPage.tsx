import React, { useState, useEffect } from 'react';
import { Heart, TrendingUp, Calendar, BarChart3, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface MoodEntry {
  id: string;
  mood: string;
  note: string;
  date: string;
  timestamp: number;
  score: number;
}

const MoodPage: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [moodNote, setMoodNote] = useState('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);

  const moods = [
    { value: 'excellent', label: 'Excelente', icon: '😊', color: 'from-green-400 to-green-600', score: 5 },
    { value: 'good', label: 'Bien', icon: '🙂', color: 'from-blue-400 to-blue-600', score: 4 },
    { value: 'neutral', label: 'Neutral', icon: '😐', color: 'from-yellow-400 to-yellow-600', score: 3 },
    { value: 'sad', label: 'Triste', icon: '😔', color: 'from-orange-400 to-orange-600', score: 2 },
    { value: 'anxious', label: 'Ansioso', icon: '😟', color: 'from-red-400 to-red-600', score: 1 },
    { value: 'angry', label: 'Enojado', icon: '😡', color: 'from-purple-400 to-purple-600', score: 1 },
  ];

  useEffect(() => {
    const savedHistory = localStorage.getItem('moodHistory');
    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory));
    }
    checkTodayEntry();
  }, []);

  const checkTodayEntry = () => {
    const today = new Date().toDateString();
    const savedHistory = localStorage.getItem('moodHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      const todayEntry = history.find((entry: MoodEntry) => 
        new Date(entry.timestamp).toDateString() === today
      );
      setHasLoggedToday(!!todayEntry);
    }
  };

  const handleSaveMood = () => {
    if (!selectedMood) return;

    const moodData = moods.find(m => m.value === selectedMood);
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      note: moodNote,
      date: new Date().toLocaleDateString(),
      timestamp: Date.now(),
      score: moodData?.score || 3
    };

    const updatedHistory = [newEntry, ...moodHistory].slice(0, 30);
    setMoodHistory(updatedHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
    
    setSelectedMood('');
    setMoodNote('');
    setHasLoggedToday(true);
  };

  const getChartData = () => {
    return moodHistory
      .slice(0, 14)
      .reverse()
      .map((entry, index) => ({
        day: `Día ${index + 1}`,
        score: entry.score,
        date: new Date(entry.timestamp).toLocaleDateString(),
        mood: moods.find(m => m.value === entry.mood)?.label || entry.mood
      }));
  };

  const getMoodStats = () => {
    const last7Days = moodHistory.filter(entry => 
      Date.now() - entry.timestamp < 7 * 24 * 60 * 60 * 1000
    );

    const moodCounts = moods.reduce((acc, mood) => {
      acc[mood.value] = last7Days.filter(entry => entry.mood === mood.value).length;
      return acc;
    }, {} as Record<string, number>);

    const maxCount = Math.max(...Object.values(moodCounts), 1);
    
    return { moodCounts, maxCount };
  };

  const { moodCounts, maxCount } = getMoodStats();
  const chartData = getChartData();

  return (
    <div className="p-4 space-y-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
          Seguimiento Emocional
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Registra y visualiza tus estados de ánimo
        </p>
      </div>

      {/* Today's Status */}
      {hasLoggedToday && (
        <div className="bg-green-900/30 border border-green-500/30 rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="font-bold text-green-400">¡Registro completado!</h3>
              <p className="text-green-300 text-sm">Ya registraste tu estado de ánimo hoy. Vuelve mañana.</p>
            </div>
          </div>
        </div>
      )}

      {/* Mood Selection */}
      {!hasLoggedToday && (
        <div className="bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Heart className="w-5 h-5 text-pink-400 mr-2" />
            ¿Cómo te sientes hoy?
          </h3>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedMood === mood.value
                    ? `border-transparent bg-gradient-to-r ${mood.color} text-white shadow-lg`
                    : 'border-gray-600 bg-gray-700 hover:border-gray-500 text-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{mood.icon}</div>
                <div className="font-semibold text-sm">{mood.label}</div>
              </button>
            ))}
          </div>

          <textarea
            className="w-full p-3 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm resize-none bg-gray-700 text-white placeholder-gray-400"
            rows={3}
            placeholder="¿Qué causó este estado de ánimo? (opcional)"
            value={moodNote}
            onChange={(e) => setMoodNote(e.target.value)}
          />

          <button
            onClick={handleSaveMood}
            disabled={!selectedMood}
            className="w-full mt-4 p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guardar Estado de Ánimo
          </button>
        </div>
      )}

      {/* Line Chart */}
      {chartData.length > 1 && (
        <div className="bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-700">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
            Tendencia Emocional
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                />
                <YAxis 
                  domain={[1, 5]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#374151', 
                    border: '1px solid #4B5563',
                    borderRadius: '12px',
                    color: '#F3F4F6'
                  }}
                  formatter={(value: any, name: any, props: any) => [
                    `${props.payload.mood} (${value}/5)`,
                    'Estado de ánimo'
                  ]}
                  labelFormatter={(label: any, payload: any) => 
                    payload?.[0]?.payload?.date || label
                  }
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#A855F7' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Statistics */}
      {moodHistory.length > 0 && (
        <div className="bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-700">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
            Últimos 7 días
          </h4>
          <div className="space-y-3">
            {moods.map((mood) => (
              <div key={mood.value} className="flex items-center space-x-3">
                <span className="text-2xl w-8">{mood.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-300">{mood.label}</span>
                    <span className="text-sm text-gray-400">{moodCounts[mood.value]}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${mood.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${(moodCounts[mood.value] / maxCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent History */}
      {moodHistory.length > 0 && (
        <div className="bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-700">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center">
            <Calendar className="w-5 h-5 text-purple-400 mr-2" />
            Historial Reciente
          </h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {moodHistory.slice(0, 10).map((entry) => {
              const moodData = moods.find(m => m.value === entry.mood);
              return (
                <div key={entry.id} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-xl">
                  <span className="text-2xl">{moodData?.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white">{moodData?.label}</span>
                      <span className="text-xs text-gray-400">{entry.date}</span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-gray-300 mt-1">{entry.note}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {moodHistory.length === 0 && (
        <div className="text-center py-8">
          <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">
            Registra tu primer estado de ánimo para ver estadísticas
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodPage;
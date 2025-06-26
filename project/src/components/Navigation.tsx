import React from 'react';
import { Home, MessageCircle, Heart, Crown, Users, Carrot as Mirror } from 'lucide-react';
import { useTranslation } from '../lib/translations';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  currentLanguage?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, setCurrentPage, currentLanguage = 'es' }) => {
  const { t } = useTranslation(currentLanguage);

  const menuItems = [
    { id: 'home', label: t.home, icon: Home, color: 'from-blue-500 to-cyan-500' },
    { id: 'chat', label: t.chat, icon: MessageCircle, color: 'from-green-500 to-emerald-500' },
    { id: 'mood-mirror', label: t.mirror, icon: Mirror, color: 'from-purple-500 to-pink-500' },
    { id: 'mood', label: t.mood, icon: Heart, color: 'from-pink-500 to-rose-500' },
    { id: 'psychologists', label: t.psychologists, icon: Users, color: 'from-indigo-500 to-purple-500' },
    { id: 'premium', label: t.premium, icon: Crown, color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
      {/* Glassmorphism background */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-t-3xl">
        <div className="flex justify-around py-3 px-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-300 transform ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-110 backdrop-blur-sm`
                    : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105'
                }`}
              >
                <IconComponent className={`w-5 h-5 mb-1 ${isActive ? 'drop-shadow-lg' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'drop-shadow-lg' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Decorative gradient line */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-60"></div>
      </div>
    </nav>
  );
};

export default Navigation;
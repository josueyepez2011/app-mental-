import React, { useState } from 'react';
import { Palette, Check, RotateCcw, X } from 'lucide-react';
import { useTranslation } from '../lib/translations';

interface ColorCustomizerProps {
  onClose: () => void;
  onColorChange: (color: string) => void;
  currentColor: string;
  currentLanguage?: string;
}

const ColorCustomizer: React.FC<ColorCustomizerProps> = ({ 
  onClose, 
  onColorChange, 
  currentColor,
  currentLanguage = 'es' 
}) => {
  const { t } = useTranslation(currentLanguage);
  const [selectedColor, setSelectedColor] = useState(currentColor);

  const predefinedColors = [
    { name: 'Púrpura Profundo', value: 'from-purple-900 to-indigo-900', bg: 'bg-gradient-to-br from-purple-900 to-indigo-900' },
    { name: 'Azul Océano', value: 'from-blue-900 to-cyan-900', bg: 'bg-gradient-to-br from-blue-900 to-cyan-900' },
    { name: 'Verde Bosque', value: 'from-green-900 to-emerald-900', bg: 'bg-gradient-to-br from-green-900 to-emerald-900' },
    { name: 'Rosa Suave', value: 'from-pink-900 to-rose-900', bg: 'bg-gradient-to-br from-pink-900 to-rose-900' },
    { name: 'Naranja Cálido', value: 'from-orange-900 to-red-900', bg: 'bg-gradient-to-br from-orange-900 to-red-900' },
    { name: 'Gris Elegante', value: 'from-gray-900 to-slate-900', bg: 'bg-gradient-to-br from-gray-900 to-slate-900' },
    { name: 'Violeta Místico', value: 'from-violet-900 to-purple-900', bg: 'bg-gradient-to-br from-violet-900 to-purple-900' },
    { name: 'Turquesa Zen', value: 'from-teal-900 to-cyan-900', bg: 'bg-gradient-to-br from-teal-900 to-cyan-900' },
  ];

  const handleSave = () => {
    onColorChange(selectedColor);
    localStorage.setItem('customBackgroundColor', selectedColor);
    onClose();
  };

  const handleReset = () => {
    const defaultColor = 'from-gray-900 to-gray-900';
    setSelectedColor(defaultColor);
    onColorChange(defaultColor);
    localStorage.removeItem('customBackgroundColor');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/90 backdrop-blur-xl rounded-3xl max-w-sm w-full border border-gray-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <Palette className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">{t.customize_background || 'Personalizar Fondo'}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Color Grid */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">{t.select_theme || 'Selecciona un Tema'}</h3>
          <div className="grid grid-cols-2 gap-3">
            {predefinedColors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color.value)}
                className={`relative h-20 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${color.bg} ${
                  selectedColor === color.value
                    ? 'border-white shadow-lg scale-105'
                    : 'border-gray-600 hover:border-gray-400'
                }`}
              >
                {selectedColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-xs text-white/90 font-medium drop-shadow-lg">
                    {color.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-300 mb-2">{t.preview || 'Vista Previa'}</h4>
            <div className={`h-16 rounded-2xl bg-gradient-to-br ${selectedColor} border border-gray-600 flex items-center justify-center`}>
              <span className="text-white font-medium drop-shadow-lg">MentalCare</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.reset || 'Resetear'}</span>
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <Check className="w-4 h-4" />
              <span>{t.apply || 'Aplicar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorCustomizer;
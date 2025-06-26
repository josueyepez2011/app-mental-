import React, { useState, useEffect } from 'react';
import { Palette, Shirt, Eye, Smile, Save, RotateCcw } from 'lucide-react';

interface CompanionCustomizationProps {
  onSave: (companion: CompanionConfig) => void;
  onClose: () => void;
}

interface CompanionConfig {
  name: string;
  type: string;
  bodyColor: string;
  eyeColor: string;
  eyeShape: string;
  clothing: string;
  accessories: string[];
  mood: string;
}

const CompanionCustomization: React.FC<CompanionCustomizationProps> = ({ onSave, onClose }) => {
  const [companion, setCompanion] = useState<CompanionConfig>({
    name: 'Nube',
    type: 'cloud',
    bodyColor: '#8B5CF6',
    eyeColor: '#3B82F6',
    eyeShape: 'round',
    clothing: 'sweater',
    accessories: [],
    mood: 'happy'
  });

  const companionTypes = [
    { id: 'cloud', name: 'Nube', emoji: '☁️' },
    { id: 'fox', name: 'Zorro', emoji: '🦊' },
    { id: 'owl', name: 'Búho', emoji: '🦉' },
    { id: 'cat', name: 'Gato', emoji: '🐱' },
    { id: 'bear', name: 'Oso', emoji: '🐻' }
  ];

  const bodyColors = [
    '#8B5CF6', '#EC4899', '#10B981', '#F59E0B',
    '#EF4444', '#3B82F6', '#8B5A2B', '#6B7280'
  ];

  const eyeColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#EC4899', '#6B7280', '#000000'
  ];

  const eyeShapes = [
    { id: 'round', name: 'Redondos' },
    { id: 'oval', name: 'Ovalados' },
    { id: 'star', name: 'Estrella' },
    { id: 'heart', name: 'Corazón' }
  ];

  const clothing = [
    { id: 'none', name: 'Sin ropa', emoji: '🚫' },
    { id: 'sweater', name: 'Suéter', emoji: '🧥' },
    { id: 'scarf', name: 'Bufanda', emoji: '🧣' },
    { id: 'hat', name: 'Gorro', emoji: '🎩' },
    { id: 'glasses', name: 'Gafas', emoji: '👓' }
  ];

  const accessories = [
    { id: 'flowers', name: 'Flores', emoji: '🌸' },
    { id: 'stars', name: 'Estrellas', emoji: '⭐' },
    { id: 'books', name: 'Libros', emoji: '📚' },
    { id: 'music', name: 'Música', emoji: '🎵' },
    { id: 'hearts', name: 'Corazones', emoji: '💕' }
  ];

  const moods = [
    { id: 'happy', name: 'Feliz', emoji: '😊' },
    { id: 'calm', name: 'Tranquilo', emoji: '😌' },
    { id: 'excited', name: 'Emocionado', emoji: '🤗' },
    { id: 'sleepy', name: 'Somnoliento', emoji: '😴' }
  ];

  const handleAccessoryToggle = (accessoryId: string) => {
    setCompanion(prev => ({
      ...prev,
      accessories: prev.accessories.includes(accessoryId)
        ? prev.accessories.filter(a => a !== accessoryId)
        : [...prev.accessories, accessoryId]
    }));
  };

  const handleSave = () => {
    localStorage.setItem('companionConfig', JSON.stringify(companion));
    onSave(companion);
    onClose();
  };

  const renderCompanionPreview = () => {
    const selectedType = companionTypes.find(t => t.id === companion.type);
    return (
      <div className="relative">
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center text-6xl shadow-2xl transition-all duration-300"
          style={{ backgroundColor: companion.bodyColor }}
        >
          {selectedType?.emoji}
        </div>
        
        {/* Eyes */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div 
            className={`w-3 h-3 ${companion.eyeShape === 'round' ? 'rounded-full' : 
              companion.eyeShape === 'oval' ? 'rounded-full scale-y-75' :
              companion.eyeShape === 'star' ? 'star-shape' : 'heart-shape'}`}
            style={{ backgroundColor: companion.eyeColor }}
          />
          <div 
            className={`w-3 h-3 ${companion.eyeShape === 'round' ? 'rounded-full' : 
              companion.eyeShape === 'oval' ? 'rounded-full scale-y-75' :
              companion.eyeShape === 'star' ? 'star-shape' : 'heart-shape'}`}
            style={{ backgroundColor: companion.eyeColor }}
          />
        </div>

        {/* Clothing */}
        {companion.clothing !== 'none' && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-2xl">
            {clothing.find(c => c.id === companion.clothing)?.emoji}
          </div>
        )}

        {/* Accessories */}
        {companion.accessories.map((acc, index) => (
          <div 
            key={acc}
            className="absolute text-lg"
            style={{
              top: `${20 + index * 15}%`,
              right: `${10 + index * 10}%`
            }}
          >
            {accessories.find(a => a.id === acc)?.emoji}
          </div>
        ))}

        {/* Mood indicator */}
        <div className="absolute -top-2 -right-2 text-2xl">
          {moods.find(m => m.id === companion.mood)?.emoji}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-3xl max-w-sm w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Personaliza tu Compañero
            </h2>
            <p className="text-gray-400 text-sm">
              Crea tu compañero emocional único
            </p>
          </div>

          {/* Preview */}
          <div className="flex justify-center">
            {renderCompanionPreview()}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre de tu compañero
            </label>
            <input
              type="text"
              value={companion.name}
              onChange={(e) => setCompanion(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ej: Nube, Luz, Titi..."
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
              <Smile className="w-4 h-4 mr-2" />
              Tipo de compañero
            </label>
            <div className="grid grid-cols-3 gap-2">
              {companionTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setCompanion(prev => ({ ...prev, type: type.id }))}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    companion.type === type.id
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="text-2xl mb-1">{type.emoji}</div>
                  <div className="text-xs text-gray-300">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Body Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Color del cuerpo
            </label>
            <div className="grid grid-cols-4 gap-2">
              {bodyColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setCompanion(prev => ({ ...prev, bodyColor: color }))}
                  className={`w-12 h-12 rounded-xl border-2 transition-all ${
                    companion.bodyColor === color
                      ? 'border-white scale-110'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Eye Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Color de ojos
            </label>
            <div className="grid grid-cols-4 gap-2">
              {eyeColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setCompanion(prev => ({ ...prev, eyeColor: color }))}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    companion.eyeColor === color
                      ? 'border-white scale-110'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Clothing */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
              <Shirt className="w-4 h-4 mr-2" />
              Ropa
            </label>
            <div className="grid grid-cols-3 gap-2">
              {clothing.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCompanion(prev => ({ ...prev, clothing: item.id }))}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    companion.clothing === item.id
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="text-xl mb-1">{item.emoji}</div>
                  <div className="text-xs text-gray-300">{item.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Accesorios (múltiples)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {accessories.map((accessory) => (
                <button
                  key={accessory.id}
                  onClick={() => handleAccessoryToggle(accessory.id)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    companion.accessories.includes(accessory.id)
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="text-xl mb-1">{accessory.emoji}</div>
                  <div className="text-xs text-gray-300">{accessory.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => setCompanion({
                name: 'Nube',
                type: 'cloud',
                bodyColor: '#8B5CF6',
                eyeColor: '#3B82F6',
                eyeShape: 'round',
                clothing: 'sweater',
                accessories: [],
                mood: 'happy'
              })}
              className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Resetear</span>
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full text-gray-400 py-2 text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanionCustomization;
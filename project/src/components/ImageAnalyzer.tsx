import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, Eye, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from '../lib/translations';

interface ImageAnalyzerProps {
  onClose: () => void;
  currentLanguage?: string;
}

const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({ onClose, currentLanguage = 'es' }) => {
  const { t } = useTranslation(currentLanguage);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simular análisis de IA (en producción, aquí iría la integración con Gemini Vision)
    setTimeout(() => {
      const mockAnalysis = {
        emotions: [
          { emotion: t.calm || 'Calma', confidence: 85, color: 'text-green-400' },
          { emotion: t.contemplative || 'Contemplativo', confidence: 72, color: 'text-blue-400' },
          { emotion: t.hopeful || 'Esperanzado', confidence: 68, color: 'text-yellow-400' },
        ],
        mood: t.generally_positive || 'Generalmente positivo',
        suggestions: [
          t.continue_creative_expression || 'Continúa con la expresión creativa',
          t.practice_mindfulness || 'Practica mindfulness para mantener la calma',
          t.share_feelings || 'Comparte tus sentimientos con alguien de confianza',
        ],
        colors: [
          { name: t.blue_tones || 'Tonos azules', meaning: t.tranquility_peace || 'Tranquilidad y paz' },
          { name: t.warm_colors || 'Colores cálidos', meaning: t.energy_optimism || 'Energía y optimismo' },
        ],
        interpretation: t.image_analysis_interpretation || 'Tu imagen refleja un estado emocional equilibrado con tendencia hacia la introspección positiva. Los elementos visuales sugieren un momento de reflexión constructiva.'
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/90 backdrop-blur-xl rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <Eye className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">{t.image_analysis || 'Análisis de Imagen'}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Upload Section */}
          {!selectedImage && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{t.upload_image || 'Subir Imagen'}</h3>
              <p className="text-gray-300 text-sm">
                {t.upload_description || 'Sube un dibujo, foto o imagen que represente tu estado emocional actual para recibir un análisis personalizado.'}
              </p>
              
              <div className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-purple-500 transition-colors">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 mx-auto hover:opacity-90 transition-opacity"
                >
                  <Upload className="w-5 h-5" />
                  <span>{t.select_image || 'Seleccionar Imagen'}</span>
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  {t.supported_formats || 'Formatos soportados: JPG, PNG, GIF'}
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Image Preview */}
          {selectedImage && !analysis && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{t.image_preview || 'Vista Previa'}</h3>
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="w-full h-48 object-cover rounded-2xl border border-gray-600"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t.analyzing || 'Analizando...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>{t.analyze_emotions || 'Analizar Emociones'}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{t.analysis_results || 'Resultados del Análisis'}</h3>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setAnalysis(null);
                  }}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  {t.analyze_another || 'Analizar otra'}
                </button>
              </div>

              {/* Emotions Detected */}
              <div className="bg-gray-700/50 rounded-2xl p-4">
                <h4 className="font-semibold text-white mb-3">{t.emotions_detected || 'Emociones Detectadas'}</h4>
                <div className="space-y-2">
                  {analysis.emotions.map((emotion: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className={`font-medium ${emotion.color}`}>{emotion.emotion}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${emotion.color.includes('green') ? 'from-green-400 to-green-600' : emotion.color.includes('blue') ? 'from-blue-400 to-blue-600' : 'from-yellow-400 to-yellow-600'}`}
                            style={{ width: `${emotion.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-300">{emotion.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interpretation */}
              <div className="bg-purple-900/30 border border-purple-500/30 rounded-2xl p-4">
                <h4 className="font-semibold text-purple-400 mb-2">{t.interpretation || 'Interpretación'}</h4>
                <p className="text-purple-200 text-sm leading-relaxed">{analysis.interpretation}</p>
              </div>

              {/* Suggestions */}
              <div className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-4">
                <h4 className="font-semibold text-blue-400 mb-3">{t.suggestions || 'Sugerencias'}</h4>
                <ul className="space-y-2">
                  {analysis.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 text-blue-200 text-sm">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Analysis */}
              <div className="bg-green-900/30 border border-green-500/30 rounded-2xl p-4">
                <h4 className="font-semibold text-green-400 mb-3">{t.color_analysis || 'Análisis de Colores'}</h4>
                <div className="space-y-2">
                  {analysis.colors.map((color: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-green-200 text-sm font-medium">{color.name}</span>
                      <span className="text-green-300 text-xs">{color.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;
"use client";

import { useState, useRef } from 'react';
import { Camera, Upload, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { analyzeFoodImage } from '@/lib/openai';
import { saveMeal, unlockBadge, getMeals } from '@/lib/storage';
import { Meal } from '@/lib/types';

export default function CameraView() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<Meal | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = async (file: File) => {
    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Converter para base64 para OpenAI
      const base64 = await fileToBase64(file);
      
      // Analisar com OpenAI (com fallback automático)
      const analysis = await analyzeFoodImage(base64);
      
      // Criar meal object
      const meal: Meal = {
        id: Date.now().toString(),
        imageUrl: base64,
        foodName: analysis.foodName,
        calories: analysis.calories,
        protein: analysis.protein,
        carbs: analysis.carbs,
        fat: analysis.fat,
        description: analysis.description,
        timestamp: new Date()
      };

      setResult(meal);
      
      // Salvar automaticamente
      saveMeal(meal);
      
      // Verificar badges
      const meals = getMeals();
      if (meals.length === 1) {
        unlockBadge('1'); // Primeira refeição
      }
      if (meals.length === 50) {
        unlockBadge('5'); // 50 refeições
      }

    } catch (error: any) {
      console.error('Erro ao processar imagem:', error);
      setError('Não foi possível processar a imagem. Tente novamente.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageCapture(file);
    }
  };

  const resetCapture = () => {
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-white to-gray-50 px-4 py-8 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#39FF14]/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#39FF14]" />
            <span className="text-sm font-medium text-[#39FF14]">Análise com IA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Capture sua Refeição
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto">
            Tire uma foto do seu prato e deixe a IA calcular as calorias automaticamente
          </p>
        </div>

        {/* Camera/Upload Area */}
        {!preview ? (
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 sm:p-12 border border-gray-100">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
              id="camera-input"
            />
            
            <label
              htmlFor="camera-input"
              className="block cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center py-12 sm:py-16">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#39FF14] to-[#2ecc00] rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-[#39FF14]/30 hover:scale-105 transition-transform duration-300">
                  <Camera className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Tirar Foto
                </h3>
                <p className="text-gray-500 text-sm sm:text-base mb-6 text-center">
                  Ou selecione uma imagem da galeria
                </p>
                <div className="flex items-center gap-2 text-[#39FF14] font-medium">
                  <Upload className="w-5 h-5" />
                  <span>Clique para começar</span>
                </div>
              </div>
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Preview Image */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 sm:h-96 object-cover"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
                <button
                  onClick={resetCapture}
                  className="mt-3 w-full bg-red-600 text-white font-medium py-2 rounded-xl hover:bg-red-700 transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            )}

            {/* Analysis Result */}
            {isAnalyzing ? (
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 sm:p-12 border border-gray-100">
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 border-4 border-[#39FF14] border-t-transparent rounded-full animate-spin"></div>
                    <Sparkles className="w-8 h-8 text-[#39FF14] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Analisando sua refeição...
                  </h3>
                  <p className="text-gray-500 text-center">
                    A IA está calculando as informações nutricionais
                  </p>
                </div>
              </div>
            ) : result ? (
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {result.foodName}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {result.description}
                    </p>
                  </div>
                  <div className="bg-[#39FF14]/10 px-4 py-2 rounded-full">
                    <span className="text-2xl font-bold text-[#39FF14]">
                      {result.calories}
                    </span>
                    <span className="text-xs text-gray-600 ml-1">kcal</span>
                  </div>
                </div>

                {/* Macros */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600 mb-1">
                      {result.protein}g
                    </p>
                    <p className="text-xs text-gray-600 font-medium">Proteína</p>
                  </div>
                  <div className="bg-orange-50 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600 mb-1">
                      {result.carbs}g
                    </p>
                    <p className="text-xs text-gray-600 font-medium">Carboidratos</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600 mb-1">
                      {result.fat}g
                    </p>
                    <p className="text-xs text-gray-600 font-medium">Gordura</p>
                  </div>
                </div>

                {/* Success Message */}
                <div className="bg-[#39FF14]/10 rounded-2xl p-4 mb-6">
                  <p className="text-center text-sm font-medium text-gray-700">
                    ✅ Refeição salva com sucesso!
                  </p>
                </div>

                {/* Actions */}
                <button
                  onClick={resetCapture}
                  className="w-full bg-gradient-to-r from-[#39FF14] to-[#2ecc00] text-white font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-[#39FF14]/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  Analisar Nova Refeição
                </button>
              </div>
            ) : null}
          </div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-xs text-gray-600 font-medium">Análise Precisa</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-xs text-gray-600 font-medium">Resultado Instantâneo</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
            <div className="text-2xl mb-2">🤖</div>
            <p className="text-xs text-gray-600 font-medium">Powered by GPT-4o</p>
          </div>
        </div>
      </div>
    </div>
  );
}

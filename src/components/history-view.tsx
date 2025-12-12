"use client";

import { useState, useEffect } from 'react';
import { Trash2, Calendar, Clock } from 'lucide-react';
import { getMeals, deleteMeal } from '@/lib/storage';
import { Meal } from '@/lib/types';

export default function HistoryView() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = () => {
    setMeals(getMeals());
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente excluir esta refeição?')) {
      deleteMeal(id);
      loadMeals();
      setSelectedMeal(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-white to-gray-50 px-4 py-8 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Histórico
          </h2>
          <p className="text-gray-600">
            {meals.length} refeições registradas
          </p>
        </div>

        {meals.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Nenhuma refeição registrada
            </h3>
            <p className="text-gray-600 mb-6">
              Comece tirando uma foto da sua primeira refeição!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Meals List */}
            <div className="space-y-4">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  onClick={() => setSelectedMeal(meal)}
                  className={`bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                    selectedMeal?.id === meal.id
                      ? 'border-[#39FF14] scale-[1.02]'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="flex gap-4 p-4">
                    <img
                      src={meal.imageUrl}
                      alt={meal.foodName}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 mb-1 truncate">
                        {meal.foodName}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {meal.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(meal.timestamp)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(meal.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-[#39FF14]/10 px-3 py-1 rounded-full inline-block">
                        <span className="text-lg font-bold text-[#39FF14]">
                          {meal.calories}
                        </span>
                        <span className="text-xs text-gray-600 ml-1">kcal</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Meal Detail */}
            <div className="lg:sticky lg:top-8 h-fit">
              {selectedMeal ? (
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
                  <img
                    src={selectedMeal.imageUrl}
                    alt={selectedMeal.foodName}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {selectedMeal.foodName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {selectedMeal.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(selectedMeal.id)}
                        className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="bg-[#39FF14]/10 rounded-2xl p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 font-medium">
                          Total de Calorias
                        </span>
                        <span className="text-3xl font-bold text-[#39FF14]">
                          {selectedMeal.calories} kcal
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 rounded-2xl p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600 mb-1">
                          {selectedMeal.protein}g
                        </p>
                        <p className="text-xs text-gray-600 font-medium">Proteína</p>
                      </div>
                      <div className="bg-orange-50 rounded-2xl p-4 text-center">
                        <p className="text-2xl font-bold text-orange-600 mb-1">
                          {selectedMeal.carbs}g
                        </p>
                        <p className="text-xs text-gray-600 font-medium">Carboidratos</p>
                      </div>
                      <div className="bg-purple-50 rounded-2xl p-4 text-center">
                        <p className="text-2xl font-bold text-purple-600 mb-1">
                          {selectedMeal.fat}g
                        </p>
                        <p className="text-xs text-gray-600 font-medium">Gordura</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(selectedMeal.timestamp)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {formatTime(selectedMeal.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-12 text-center border border-gray-100">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Selecione uma refeição
                  </h3>
                  <p className="text-gray-600">
                    Clique em uma refeição para ver os detalhes
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

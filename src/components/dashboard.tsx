"use client";

import { useState, useEffect } from 'react';
import { TrendingUp, Target, Flame, Activity } from 'lucide-react';
import { getTodayStats, getWeeklyStats, getProfile } from '@/lib/storage';

export default function Dashboard() {
  const [todayStats, setTodayStats] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
    mealsCount: 0
  });
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTodayStats(getTodayStats());
    setWeeklyData(getWeeklyStats());
    setProfile(getProfile());
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 border-4 border-[#39FF14] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  const dailyGoal = profile?.dailyCalorieGoal || 2000;
  const progress = Math.min((todayStats.totalCalories / dailyGoal) * 100, 100);

  // Encontrar o valor máximo para normalizar as barras
  const maxCalories = Math.max(...weeklyData.map(d => d.calories), dailyGoal);

  return (
    <div className="min-h-full bg-gradient-to-b from-white to-gray-50 px-4 py-8 sm:px-6 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 gradient-text">
            Dashboard
          </h2>
          <p className="text-gray-600">
            Acompanhe seu progresso diário
          </p>
        </div>

        {/* Today's Progress Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 mb-6 border border-gray-100 animate-slide-in-up hover-lift transition-smooth">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Calorias Hoje
              </h3>
              <p className="text-sm text-gray-600">
                {todayStats.mealsCount} refeições registradas
              </p>
            </div>
            <div className="bg-[#39FF14]/10 p-4 rounded-2xl hover-glow transition-smooth">
              <Target className="w-8 h-8 text-[#39FF14]" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-end justify-between mb-2">
              <span className="text-4xl font-bold text-gray-900 animate-scale-in">
                {todayStats.totalCalories}
              </span>
              <span className="text-lg text-gray-500">
                / {dailyGoal} kcal
              </span>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#39FF14] to-[#2ecc00] rounded-full transition-all duration-1000 shadow-lg shadow-[#39FF14]/30 animate-progress"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {progress.toFixed(0)}% da meta diária
            </p>
          </div>

          {/* Macros Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-2xl p-4 text-center transition-bounce hover:scale-105">
              <p className="text-2xl font-bold text-blue-600 mb-1 animate-scale-in">
                {todayStats.totalProtein}g
              </p>
              <p className="text-xs text-gray-600 font-medium">Proteína</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 text-center transition-bounce hover:scale-105">
              <p className="text-2xl font-bold text-orange-600 mb-1 animate-scale-in">
                {todayStats.totalCarbs}g
              </p>
              <p className="text-xs text-gray-600 font-medium">Carboidratos</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-4 text-center transition-bounce hover:scale-105">
              <p className="text-2xl font-bold text-purple-600 mb-1 animate-scale-in">
                {todayStats.totalFat}g
              </p>
              <p className="text-xs text-gray-600 font-medium">Gordura</p>
            </div>
          </div>
        </div>

        {/* Weekly Chart - Custom CSS Chart */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 mb-6 border border-gray-100 animate-slide-in-up hover-lift transition-smooth">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Últimos 7 Dias
              </h3>
              <p className="text-sm text-gray-600">
                Histórico de calorias
              </p>
            </div>
            <div className="bg-[#39FF14]/10 p-4 rounded-2xl hover-glow transition-smooth">
              <TrendingUp className="w-8 h-8 text-[#39FF14]" />
            </div>
          </div>

          {/* Custom Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 px-2">
            {weeklyData.map((day, index) => {
              const height = (day.calories / maxCalories) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  {/* Bar */}
                  <div className="w-full flex flex-col items-center justify-end h-48">
                    <div className="relative w-full max-w-[60px]">
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                        {day.calories} kcal
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                      {/* Bar */}
                      <div
                        className="w-full bg-gradient-to-t from-[#39FF14] to-[#2ecc00] rounded-t-xl transition-all duration-500 hover:shadow-lg hover:shadow-[#39FF14]/30 hover:scale-105 animate-bar-grow"
                        style={{ 
                          height: `${height}%`,
                          minHeight: day.calories > 0 ? '8px' : '0'
                        }}
                      />
                    </div>
                  </div>
                  {/* Label */}
                  <span className="text-xs text-gray-600 font-medium">
                    {day.date}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Y-axis reference line */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>0 kcal</span>
            <span>{Math.round(maxCalories / 2)} kcal</span>
            <span>{maxCalories} kcal</span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-in-up">
          <div className="bg-gradient-to-br from-[#39FF14]/10 to-[#2ecc00]/5 rounded-3xl p-6 border border-[#39FF14]/20 hover-lift transition-smooth">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm hover-glow">
                <Flame className="w-6 h-6 text-[#39FF14]" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Sequência</p>
                <p className="text-2xl font-bold text-gray-900 animate-scale-in">3 dias</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Continue registrando para manter sua sequência!
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl p-6 border border-blue-200/50 hover-lift transition-smooth">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm hover-glow">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Média Semanal</p>
                <p className="text-2xl font-bold text-gray-900 animate-scale-in">
                  {Math.round(weeklyData.reduce((sum, d) => sum + d.calories, 0) / 7)} kcal
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Sua média diária da última semana
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

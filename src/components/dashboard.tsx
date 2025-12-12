"use client";

import { useState, useEffect } from 'react';
import { TrendingUp, Target, Flame, Activity } from 'lucide-react';
import { getTodayStats, getWeeklyStats, getProfile } from '@/lib/storage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

  useEffect(() => {
    setTodayStats(getTodayStats());
    setWeeklyData(getWeeklyStats());
    setProfile(getProfile());
  }, []);

  const dailyGoal = profile?.dailyCalorieGoal || 2000;
  const progress = Math.min((todayStats.totalCalories / dailyGoal) * 100, 100);

  return (
    <div className="min-h-full bg-gradient-to-b from-white to-gray-50 px-4 py-8 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Dashboard
          </h2>
          <p className="text-gray-600">
            Acompanhe seu progresso diário
          </p>
        </div>

        {/* Today's Progress Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Calorias Hoje
              </h3>
              <p className="text-sm text-gray-600">
                {todayStats.mealsCount} refeições registradas
              </p>
            </div>
            <div className="bg-[#39FF14]/10 p-4 rounded-2xl">
              <Target className="w-8 h-8 text-[#39FF14]" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-end justify-between mb-2">
              <span className="text-4xl font-bold text-gray-900">
                {todayStats.totalCalories}
              </span>
              <span className="text-lg text-gray-500">
                / {dailyGoal} kcal
              </span>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#39FF14] to-[#2ecc00] rounded-full transition-all duration-500 shadow-lg shadow-[#39FF14]/30"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {progress.toFixed(0)}% da meta diária
            </p>
          </div>

          {/* Macros Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-600 mb-1">
                {todayStats.totalProtein}g
              </p>
              <p className="text-xs text-gray-600 font-medium">Proteína</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-orange-600 mb-1">
                {todayStats.totalCarbs}g
              </p>
              <p className="text-xs text-gray-600 font-medium">Carboidratos</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-purple-600 mb-1">
                {todayStats.totalFat}g
              </p>
              <p className="text-xs text-gray-600 font-medium">Gordura</p>
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Últimos 7 Dias
              </h3>
              <p className="text-sm text-gray-600">
                Histórico de calorias
              </p>
            </div>
            <div className="bg-[#39FF14]/10 p-4 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-[#39FF14]" />
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
                <Bar 
                  dataKey="calories" 
                  fill="#39FF14" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#39FF14]/10 to-[#2ecc00]/5 rounded-3xl p-6 border border-[#39FF14]/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm">
                <Flame className="w-6 h-6 text-[#39FF14]" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Sequência</p>
                <p className="text-2xl font-bold text-gray-900">3 dias</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Continue registrando para manter sua sequência!
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl p-6 border border-blue-200/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Média Semanal</p>
                <p className="text-2xl font-bold text-gray-900">
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

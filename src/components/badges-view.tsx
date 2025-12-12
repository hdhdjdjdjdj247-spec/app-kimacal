"use client";

import { useState, useEffect } from 'react';
import { Trophy, Lock, Sparkles } from 'lucide-react';
import { getBadges } from '@/lib/storage';
import { Badge } from '@/lib/types';

export default function BadgesView() {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    setBadges(getBadges());
  }, []);

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const progress = (unlockedCount / badges.length) * 100;

  return (
    <div className="min-h-full bg-gradient-to-b from-white to-gray-50 px-4 py-8 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Conquistas
          </h2>
          <p className="text-gray-600">
            {unlockedCount} de {badges.length} badges desbloqueadas
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Seu Progresso
              </h3>
              <p className="text-sm text-gray-600">
                Continue conquistando badges!
              </p>
            </div>
            <div className="bg-[#39FF14]/10 p-4 rounded-2xl">
              <Trophy className="w-8 h-8 text-[#39FF14]" />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-end justify-between mb-2">
              <span className="text-3xl font-bold text-gray-900">
                {progress.toFixed(0)}%
              </span>
              <span className="text-sm text-gray-500">
                {unlockedCount}/{badges.length} completo
              </span>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#39FF14] to-[#2ecc00] rounded-full transition-all duration-500 shadow-lg shadow-[#39FF14]/30"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-3xl p-6 border-2 transition-all duration-300 ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-[#39FF14]/10 to-[#2ecc00]/5 border-[#39FF14]/30 shadow-lg shadow-[#39FF14]/10'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                    badge.unlocked
                      ? 'bg-white shadow-lg'
                      : 'bg-gray-100 grayscale opacity-50'
                  }`}
                >
                  {badge.unlocked ? badge.icon : <Lock className="w-8 h-8 text-gray-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold ${badge.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                      {badge.name}
                    </h3>
                    {badge.unlocked && (
                      <Sparkles className="w-4 h-4 text-[#39FF14]" />
                    )}
                  </div>
                  <p className={`text-sm ${badge.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                    {badge.description}
                  </p>
                  {badge.unlocked && badge.unlockedAt && (
                    <p className="text-xs text-[#39FF14] mt-2 font-medium">
                      Desbloqueada em {new Date(badge.unlockedAt).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Motivation Card */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 text-center border border-blue-200/50">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Continue Assim!
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Cada refeição registrada te aproxima de novas conquistas. Mantenha a consistência!
          </p>
        </div>
      </div>
    </div>
  );
}

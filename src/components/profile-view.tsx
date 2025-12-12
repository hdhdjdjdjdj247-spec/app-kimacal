"use client";

import { useState, useEffect } from 'react';
import { User, Target, Activity, Save } from 'lucide-react';
import { getProfile, saveProfile } from '@/lib/storage';
import { UserProfile } from '@/lib/types';

export default function ProfileView() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 25,
    weight: 70,
    height: 170,
    dailyCalorieGoal: 2000
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedProfile = getProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    } else {
      setIsEditing(true);
    }
  }, []);

  const handleSave = () => {
    saveProfile(profile);
    setIsEditing(false);
  };

  const calculateBMI = () => {
    const heightInMeters = profile.height / 100;
    const bmi = profile.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Abaixo do peso', color: 'text-blue-600' };
    if (bmi < 25) return { text: 'Peso normal', color: 'text-[#39FF14]' };
    if (bmi < 30) return { text: 'Sobrepeso', color: 'text-orange-600' };
    return { text: 'Obesidade', color: 'text-red-600' };
  };

  const bmi = parseFloat(calculateBMI());
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="min-h-full bg-gradient-to-b from-white to-gray-50 px-4 py-8 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Perfil
          </h2>
          <p className="text-gray-600">
            Gerencie suas informações e metas
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 mb-6 border border-gray-100">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#39FF14] to-[#2ecc00] rounded-full flex items-center justify-center shadow-xl shadow-[#39FF14]/30">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Seu nome"
                  className="text-2xl font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-xl w-full border-2 border-gray-200 focus:border-[#39FF14] outline-none"
                />
              ) : (
                <h3 className="text-2xl font-bold text-gray-900">
                  {profile.name || 'Usuário'}
                </h3>
              )}
              <p className="text-gray-600 mt-1">
                Membro desde {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="bg-[#39FF14]/10 text-[#39FF14] px-6 py-3 rounded-xl font-medium hover:bg-[#39FF14]/20 transition-colors flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <Save className="w-5 h-5" />
                  Salvar
                </>
              ) : (
                'Editar'
              )}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#39FF14]" />
                Informações Pessoais
              </h4>

              <div>
                <label className="text-sm text-gray-600 font-medium block mb-2">
                  Idade
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                    className="w-full bg-gray-50 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#39FF14] outline-none"
                  />
                ) : (
                  <div className="bg-gray-50 px-4 py-3 rounded-xl">
                    <span className="text-lg font-bold text-gray-900">{profile.age} anos</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium block mb-2">
                  Peso
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.weight}
                    onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) })}
                    className="w-full bg-gray-50 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#39FF14] outline-none"
                  />
                ) : (
                  <div className="bg-gray-50 px-4 py-3 rounded-xl">
                    <span className="text-lg font-bold text-gray-900">{profile.weight} kg</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium block mb-2">
                  Altura
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.height}
                    onChange={(e) => setProfile({ ...profile, height: parseFloat(e.target.value) })}
                    className="w-full bg-gray-50 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#39FF14] outline-none"
                  />
                ) : (
                  <div className="bg-gray-50 px-4 py-3 rounded-xl">
                    <span className="text-lg font-bold text-gray-900">{profile.height} cm</span>
                  </div>
                )}
              </div>
            </div>

            {/* Goals */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#39FF14]" />
                Metas
              </h4>

              <div>
                <label className="text-sm text-gray-600 font-medium block mb-2">
                  Meta Diária de Calorias
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.dailyCalorieGoal}
                    onChange={(e) => setProfile({ ...profile, dailyCalorieGoal: parseInt(e.target.value) })}
                    className="w-full bg-gray-50 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#39FF14] outline-none"
                  />
                ) : (
                  <div className="bg-[#39FF14]/10 px-4 py-3 rounded-xl">
                    <span className="text-lg font-bold text-[#39FF14]">{profile.dailyCalorieGoal} kcal</span>
                  </div>
                )}
              </div>

              {/* BMI Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/50">
                <p className="text-sm text-gray-600 font-medium mb-2">
                  Índice de Massa Corporal (IMC)
                </p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {calculateBMI()}
                  </span>
                  <span className={`text-lg font-semibold mb-1 ${bmiCategory.color}`}>
                    {bmiCategory.text}
                  </span>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                    style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="text-3xl mb-3">💡</div>
            <h4 className="font-bold text-gray-900 mb-2">Dica do Dia</h4>
            <p className="text-sm text-gray-600">
              Mantenha-se hidratado! Beba pelo menos 2 litros de água por dia.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2">Meta Semanal</h4>
            <p className="text-sm text-gray-600">
              Registre suas refeições todos os dias para melhores resultados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

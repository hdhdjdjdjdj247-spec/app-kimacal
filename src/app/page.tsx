"use client";

import { useState, useEffect } from 'react';
import { Camera, BarChart3, History, User, Trophy, Users } from 'lucide-react';
import CameraView from '@/components/camera-view';
import Dashboard from '@/components/dashboard';
import HistoryView from '@/components/history-view';
import ProfileView from '@/components/profile-view';
import BadgesView from '@/components/badges-view';
import CommunityView from '@/components/community-view';

type View = 'camera' | 'dashboard' | 'history' | 'profile' | 'badges' | 'community';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('camera');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#39FF14] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Carregando Kimacal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#39FF14] to-[#2ecc00] rounded-xl flex items-center justify-center shadow-lg shadow-[#39FF14]/20">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Kimacal
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {currentView === 'camera' && <CameraView />}
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'history' && <HistoryView />}
        {currentView === 'profile' && <ProfileView />}
        {currentView === 'badges' && <BadgesView />}
        {currentView === 'community' && <CommunityView />}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-100 px-4 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-6 gap-1 sm:gap-2">
            <NavButton
              icon={Camera}
              label="Câmera"
              active={currentView === 'camera'}
              onClick={() => setCurrentView('camera')}
            />
            <NavButton
              icon={BarChart3}
              label="Dashboard"
              active={currentView === 'dashboard'}
              onClick={() => setCurrentView('dashboard')}
            />
            <NavButton
              icon={History}
              label="Histórico"
              active={currentView === 'history'}
              onClick={() => setCurrentView('history')}
            />
            <NavButton
              icon={Trophy}
              label="Badges"
              active={currentView === 'badges'}
              onClick={() => setCurrentView('badges')}
            />
            <NavButton
              icon={Users}
              label="Social"
              active={currentView === 'community'}
              onClick={() => setCurrentView('community')}
            />
            <NavButton
              icon={User}
              label="Perfil"
              active={currentView === 'profile'}
              onClick={() => setCurrentView('profile')}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavButton({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any; 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl transition-all duration-300 ${
        active 
          ? 'bg-[#39FF14]/10 text-[#39FF14]' 
          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${active ? 'scale-110' : ''} transition-transform duration-300`} />
      <span className={`text-[10px] sm:text-xs font-medium ${active ? 'font-semibold' : ''}`}>
        {label}
      </span>
    </button>
  );
}

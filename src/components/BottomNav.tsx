import React from 'react';
import { Home, BookOpen, Sparkles, TrendingUp, User } from 'lucide-react';
import { MainTab } from '../types';
import { playGentleTapSound } from '../utils/audio';

interface BottomNavProps {
  activeTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  highContrast?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  highContrast = false,
}) => {
  const tabs: { id: MainTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Sparkles },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleTabClick = (tabId: MainTab) => {
    playGentleTapSound();
    onSelectTab(tabId);
  };

  return (
    <nav
      aria-label="Main Navigation"
      className={`sticky bottom-0 z-40 px-2 py-2 border-t backdrop-blur-lg ${
        highContrast
          ? 'bg-white border-slate-900 shadow-2xl'
          : 'bg-white/95 border-slate-200/80 shadow-lg'
      }`}
    >
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all cursor-pointer select-none active:scale-90 ${
                isActive
                  ? highContrast
                    ? 'bg-slate-900 text-white font-extrabold shadow-sm'
                    : 'bg-amber-400 text-slate-900 font-extrabold shadow-sm'
                  : highContrast
                    ? 'text-slate-800 hover:bg-slate-100 font-bold'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 font-semibold'
              }`}
            >
              <div className={`p-1 rounded-xl transition-transform ${isActive ? 'scale-110' : ''}`}>
                <Icon className={`w-6 h-6 stroke-[2.4]`} />
              </div>
              <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

import React from 'react';
import { Calculator, TrendingUp, History, Settings } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'calculator' | 'trends' | 'history' | 'settings';
  onTabChange: (tab: 'calculator' | 'trends' | 'history' | 'settings') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl z-50 md:hidden">
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ease-out apple-button ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50/50'
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-white' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-white' : ''}`}>
                {label}
              </span>
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
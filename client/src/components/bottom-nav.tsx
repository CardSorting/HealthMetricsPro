import React, { useState } from 'react';
import { Calculator, TrendingUp, History, Settings } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'calculator' | 'trends' | 'history' | 'settings';
  onTabChange: (tab: 'calculator' | 'trends' | 'history' | 'settings') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [pressedTab, setPressedTab] = useState<string | null>(null);

  const tabs = [
    { id: 'calculator', label: 'Calculator', icon: Calculator, emoji: '🧮' },
    { id: 'trends', label: 'Trends', icon: TrendingUp, emoji: '📈' },
    { id: 'history', label: 'History', icon: History, emoji: '📚' },
    { id: 'settings', label: 'Settings', icon: Settings, emoji: '⚙️' },
  ] as const;

  const handleTabPress = (id: string) => {
    setPressedTab(id);
    setTimeout(() => setPressedTab(null), 150);
    onTabChange(id as any);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Background with enhanced blur and gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/80 backdrop-blur-2xl"></div>
      
      {/* Subtle top border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="relative flex items-center justify-around px-4 py-2 safe-area-bottom">
        {tabs.map(({ id, label, icon: Icon, emoji }, index) => {
          const isActive = activeTab === id;
          const isPressed = pressedTab === id;
          
          return (
            <button
              key={id}
              onClick={() => handleTabPress(id)}
              className={`
                relative flex flex-col items-center justify-center p-3 rounded-2xl 
                transition-all duration-300 ease-out apple-button group
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg scale-105 shadow-blue-600/20' 
                  : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50/70 active:bg-blue-100/70'
                }
                ${isPressed ? 'scale-95' : ''}
              `}
              style={{ 
                animationDelay: `${index * 0.05}s`,
                transform: isPressed ? 'scale(0.95)' : isActive ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              {/* Background glow for active state */}
              {isActive && (
                <div className="absolute inset-0 bg-blue-600 rounded-2xl opacity-20 blur-sm scale-110"></div>
              )}
              
              {/* Icon with enhanced animations */}
              <div className="relative">
                <Icon className={`
                  h-5 w-5 mb-1 transition-all duration-300
                  ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}
                  ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                `} />
                
                {/* Emoji overlay for active state */}
                {isActive && (
                  <div className="absolute -top-1 -right-1 text-xs opacity-80 animate-pulse">
                    {emoji}
                  </div>
                )}
              </div>
              
              {/* Label with improved typography */}
              <span className={`
                text-xs font-medium transition-all duration-300
                ${isActive ? 'text-white font-semibold' : 'text-gray-500 group-hover:text-blue-600'}
              `}>
                {label}
              </span>
              
              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              )}
              
              {/* Subtle press animation overlay */}
              {isPressed && (
                <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
              )}
              
              {/* Ripple effect on press */}
              <div className={`
                absolute inset-0 rounded-2xl transition-all duration-300
                ${isPressed ? 'bg-blue-600/10 scale-110' : 'scale-100'}
              `}></div>
            </button>
          );
        })}
      </div>
      
      {/* Home indicator for devices with home gesture */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full"></div>
    </div>
  );
}
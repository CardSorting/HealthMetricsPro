import React from "react";
import { Link, useLocation } from "wouter";
import { Calculator, TrendingUp, Heart, User, Info } from "lucide-react";

const navItems = [
  {
    path: "/",
    icon: Calculator,
    label: "Calculator",
    color: "text-blue-600"
  },
  {
    path: "/progress",
    icon: TrendingUp,
    label: "Progress",
    color: "text-green-600"
  },
  {
    path: "/insights",
    icon: Heart,
    label: "Insights",
    color: "text-red-600"
  },
  {
    path: "/profile",
    icon: User,
    label: "Profile",
    color: "text-purple-600"
  },
  {
    path: "/about",
    icon: Info,
    label: "About",
    color: "text-gray-600"
  }
];

export function MobileNav() {
  const [location] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200/50 safe-area-bottom z-50">
      <div className="flex justify-around items-center px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <div className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-300 apple-button ${
                isActive 
                  ? `bg-gray-100 ${item.color} scale-110 shadow-sm` 
                  : 'text-gray-500 hover:text-gray-700'
              }`}>
                <Icon className={`h-6 w-6 ${isActive ? 'animate-pulse' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
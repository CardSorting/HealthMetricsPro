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
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 safe-area-bottom z-50 mobile-nav-shadow nav-bounce">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <div className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-2xl transition-all duration-300 apple-button relative ${
                isActive 
                  ? `bg-gradient-to-t from-gray-100 to-gray-50 ${item.color} scale-110 shadow-lg` 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}>
                <Icon className={`h-6 w-6 ${isActive ? 'scale-110' : ''} transition-transform duration-300`} />
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''} transition-all duration-300`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-current rounded-full opacity-60"></div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
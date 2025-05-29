import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TooltipInfo } from "./health-calculator/tooltip-info";
import { Weight, Flame, Utensils, Target, TrendingUp, Award, Save } from "lucide-react";
import { HealthMetrics } from "@/lib/health-calculations";
import { formatWeight } from "@/lib/unit-conversions";

interface EnhancedResultsDisplayProps {
  metrics: HealthMetrics | null;
  isMetric: boolean;
  onSaveCalculation?: () => void;
}

export function EnhancedResultsDisplay({ metrics, isMetric, onSaveCalculation }: EnhancedResultsDisplayProps) {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    if (metrics) {
      const timer = setTimeout(() => setAnimationStage(prev => prev + 1), 100);
      return () => clearTimeout(timer);
    }
  }, [metrics]);

  if (!metrics) {
    return (
      <div className="space-y-4 md:space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="result-card opacity-40 glass-card border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg text-gray-400 font-medium">
                {i === 1 && "📊 Body Mass Index (BMI)"}
                {i === 2 && "🔥 Basal Metabolic Rate (BMR)"}
                {i === 3 && "🍽️ Daily Calorie Needs"}
                {i === 4 && "🎯 Ideal Weight Range"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-400 py-8">
                <div className="loading-shimmer h-4 w-32 mx-auto rounded mb-2"></div>
                <div className="loading-shimmer h-3 w-48 mx-auto rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { color: 'blue', icon: '📉' };
    if (bmi < 25) return { color: 'green', icon: '✅' };
    if (bmi < 30) return { color: 'orange', icon: '⚠️' };
    return { color: 'red', icon: '🚨' };
  };

  const bmiStatus = getBMIStatus(metrics.bmi);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* BMI Card with Enhanced Animation */}
      <Card className={`result-card show glass-card border-0 shadow-2xl card-hover-lift glow-effect ${animationStage >= 1 ? 'elastic-bounce' : ''}`}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            <div className="flex items-center">
              <div className="relative">
                <Weight className="mr-3 h-6 w-6 text-blue-600" />
                <div className={`absolute -top-1 -right-1 w-3 h-3 bg-${bmiStatus.color}-500 rounded-full status-indicator`}></div>
              </div>
              <span>📊 Body Mass Index</span>
            </div>
            <TooltipInfo content="BMI is a measure of body fat based on height and weight. It's a screening tool, not a diagnostic test." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="relative mb-4">
              <div className="text-4xl md:text-6xl font-bold text-gray-800 mb-3 breathe">
                {metrics.bmi.toFixed(1)}
              </div>
              <div className="absolute -top-2 -right-2 text-2xl">
                {bmiStatus.icon}
              </div>
            </div>
            <Badge className={`${metrics.bmiClass} px-6 py-3 text-sm font-semibold rounded-full shadow-lg scale-in`}>
              {metrics.bmiCategory}
            </Badge>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              {[
                { label: 'Underweight', range: '< 18.5', color: 'blue' },
                { label: 'Normal', range: '18.5 - 24.9', color: 'green' },
                { label: 'Overweight', range: '25 - 29.9', color: 'orange' },
                { label: 'Obese', range: '≥ 30', color: 'red' }
              ].map((item, index) => (
                <div key={item.label} className={`bg-${item.color}-50 p-3 rounded-xl apple-button transition-all duration-300`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`text-${item.color}-600 font-medium`}>{item.label}</div>
                  <div className={`text-${item.color}-500 text-xs`}>{item.range}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BMR Card with Progress Ring */}
      <Card className={`result-card show glass-card border-0 shadow-2xl card-hover-lift ${animationStage >= 2 ? 'slide-in-right' : ''}`}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            <div className="flex items-center">
              <Flame className="mr-3 h-6 w-6 text-orange-500 floating-element" />
              <span>🔥 Basal Metabolic Rate</span>
            </div>
            <TooltipInfo content="BMR is the number of calories your body needs at rest to maintain basic physiological functions." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="relative mb-4">
              <svg className="w-24 h-24 mx-auto" viewBox="0 0 36 36">
                <path
                  className="progress-ring stroke-gray-200"
                  strokeWidth="3"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="progress-ring stroke-orange-500"
                  strokeWidth="3"
                  strokeDasharray={`${(metrics.bmr / 3000) * 100}, 100`}
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl font-bold text-gray-800">
                  {Math.round(metrics.bmr / 100)}k
                </div>
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              {Math.round(metrics.bmr)}
            </div>
            <div className="text-gray-600 text-lg mb-4">calories per day</div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
              <div className="flex items-center justify-center space-x-2">
                <Award className="h-4 w-4 text-orange-600" />
                <div className="text-sm text-gray-600 font-medium">
                  Energy for essential body functions
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Daily Calories Card */}
      <Card className={`result-card show glass-card border-0 shadow-2xl card-hover-lift ${animationStage >= 3 ? 'slide-in-left' : ''}`}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            <div className="flex items-center">
              <Utensils className="mr-3 h-6 w-6 text-green-600" />
              <span>🍽️ Daily Calorie Goals</span>
            </div>
            <TooltipInfo content="Total daily energy expenditure based on your BMR and activity level." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { 
                label: 'Maintain Weight', 
                value: metrics.dailyCalories, 
                color: 'gray', 
                icon: '⚖️',
                gradient: 'from-gray-50 to-blue-50'
              },
              { 
                label: 'Lose Weight (-0.5kg/week)', 
                value: metrics.loseCalories, 
                color: 'red', 
                icon: '📉',
                gradient: 'from-red-50 to-pink-50'
              },
              { 
                label: 'Gain Weight (+0.5kg/week)', 
                value: metrics.gainCalories, 
                color: 'green', 
                icon: '📈',
                gradient: 'from-green-50 to-emerald-50'
              }
            ].map((goal, index) => (
              <div 
                key={goal.label}
                className={`flex justify-between items-center p-4 bg-gradient-to-r ${goal.gradient} rounded-xl border border-${goal.color}-200/50 apple-button glow-effect`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3">{goal.icon}</span>
                  <div className="w-3 h-3 rounded-full bg-gray-400 mr-3"></div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">{goal.label}</span>
                    <div className="text-xs text-gray-500 mt-1">
                      {index === 0 ? 'Current needs' : index === 1 ? 'Weight loss' : 'Weight gain'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-bold text-lg text-${goal.color === 'gray' ? 'gray-800' : goal.color + '-600'}`}>
                    {Math.round(goal.value)}
                  </span>
                  <div className="text-xs text-gray-500">cal</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Ideal Weight Card */}
      <Card className={`result-card show glass-card border-0 shadow-2xl card-hover-lift ${animationStage >= 4 ? 'fade-in-up' : ''}`}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            <div className="flex items-center">
              <Target className="mr-3 h-6 w-6 text-purple-600" />
              <span>🎯 Ideal Weight Range</span>
            </div>
            <TooltipInfo content="Weight range for a healthy BMI (18.5-24.9) based on your height." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <div className="text-2xl md:text-3xl font-bold text-gray-800">
                {formatWeight(isMetric ? metrics.idealWeightMin : metrics.idealWeightMin * 2.20462, isMetric)} - {formatWeight(isMetric ? metrics.idealWeightMax : metrics.idealWeightMax * 2.20462, isMetric)}
              </div>
            </div>
            <div className="text-gray-600 text-sm mb-4">Healthy weight range for your height</div>
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200/50 glow-effect">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 status-indicator"></div>
                <div className="text-sm text-gray-700 font-medium leading-relaxed text-left">
                  {metrics.weightStatus}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Calculation Button */}
      {onSaveCalculation && (
        <Card className="glass-card border-0 shadow-xl apple-button">
          <CardContent className="p-4">
            <Button
              onClick={onSaveCalculation}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 apple-button"
            >
              <Save className="h-5 w-5 mr-2" />
              Save to History
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
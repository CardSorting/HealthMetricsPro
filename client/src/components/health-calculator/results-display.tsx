import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TooltipInfo } from "./tooltip-info";
import { Weight, Flame, Utensils, Target } from "lucide-react";
import { HealthMetrics } from "@/lib/health-calculations";
import { formatWeight } from "@/lib/unit-conversions";

interface ResultsDisplayProps {
  metrics: HealthMetrics | null;
  isMetric: boolean;
}

export function ResultsDisplay({ metrics, isMetric }: ResultsDisplayProps) {
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
                <div className="text-sm">Enter your information to see personalized results</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* BMI Card */}
      <Card className="result-card show glass-card border-0 shadow-2xl metric-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            <div className="flex items-center">
              <Weight className="mr-3 h-6 w-6 text-blue-600" />
              <span>📊 Body Mass Index (BMI)</span>
            </div>
            <TooltipInfo content="BMI is a measure of body fat based on height and weight. It's a screening tool, not a diagnostic test." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              {metrics.bmi.toFixed(1)}
            </div>
            <Badge className={`${metrics.bmiClass} px-6 py-3 text-sm font-semibold rounded-full shadow-lg`}>
              {metrics.bmiCategory}
            </Badge>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-blue-50 p-2 rounded-lg">
                <div className="text-blue-600 font-medium">Underweight</div>
                <div className="text-blue-500">&lt; 18.5</div>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <div className="text-green-600 font-medium">Normal</div>
                <div className="text-green-500">18.5 - 24.9</div>
              </div>
              <div className="bg-orange-50 p-2 rounded-lg">
                <div className="text-orange-600 font-medium">Overweight</div>
                <div className="text-orange-500">25 - 29.9</div>
              </div>
              <div className="bg-red-50 p-2 rounded-lg">
                <div className="text-red-600 font-medium">Obese</div>
                <div className="text-red-500">≥ 30</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BMR Card */}
      <Card className="result-card show glass-card border-0 shadow-2xl metric-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            <div className="flex items-center">
              <Flame className="mr-3 h-6 w-6 text-blue-600" />
              <span>🔥 Basal Metabolic Rate</span>
            </div>
            <TooltipInfo content="BMR is the number of calories your body needs at rest to maintain basic physiological functions." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              {Math.round(metrics.bmr)}
            </div>
            <div className="text-gray-600 text-lg mb-4">calories per day</div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
              <div className="text-sm text-gray-600 font-medium">
                Energy needed for basic body functions at rest
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Calories Card */}
      <Card className="result-card show glass-card border-0 shadow-2xl metric-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            <div className="flex items-center">
              <Utensils className="mr-3 h-6 w-6 text-blue-600" />
              <span>🍽️ Daily Calorie Goals</span>
            </div>
            <TooltipInfo content="Total daily energy expenditure based on your BMR and activity level." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200/50 apple-button">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-3"></div>
                <span className="text-sm font-medium text-gray-700">Maintain Weight</span>
              </div>
              <span className="font-bold text-lg text-gray-800">{Math.round(metrics.dailyCalories)} cal</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200/50 apple-button">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                <span className="text-sm font-medium text-gray-700">Lose Weight (-0.5kg/week)</span>
              </div>
              <span className="font-bold text-lg text-red-600">{Math.round(metrics.loseCalories)} cal</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50 apple-button">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                <span className="text-sm font-medium text-gray-700">Gain Weight (+0.5kg/week)</span>
              </div>
              <span className="font-bold text-lg text-green-600">{Math.round(metrics.gainCalories)} cal</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ideal Weight Range Card */}
      <Card className="result-card show glass-card border-0 shadow-2xl metric-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            <div className="flex items-center">
              <Target className="mr-3 h-6 w-6 text-blue-600" />
              <span>🎯 Ideal Weight Range</span>
            </div>
            <TooltipInfo content="Weight range for a healthy BMI (18.5-24.9) based on your height." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {formatWeight(isMetric ? metrics.idealWeightMin : metrics.idealWeightMin * 2.20462, isMetric)} - {formatWeight(isMetric ? metrics.idealWeightMax : metrics.idealWeightMax * 2.20462, isMetric)}
            </div>
            <div className="text-gray-600 text-sm mb-4">Healthy weight range for your height</div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200/50">
              <div className="text-sm text-gray-700 font-medium leading-relaxed">
                {metrics.weightStatus}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

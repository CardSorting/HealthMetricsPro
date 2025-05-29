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
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="result-card opacity-50">
            <CardHeader>
              <CardTitle className="text-lg text-gray-400">
                {i === 1 && "Body Mass Index (BMI)"}
                {i === 2 && "Basal Metabolic Rate (BMR)"}
                {i === 3 && "Daily Calorie Needs"}
                {i === 4 && "Ideal Weight Range"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-400">
                Enter your information to see results
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* BMI Card */}
      <Card className="result-card show">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center">
              <Weight className="mr-2 h-5 w-5 text-blue-600" />
              Body Mass Index (BMI)
            </div>
            <TooltipInfo content="BMI is a measure of body fat based on height and weight. It's a screening tool, not a diagnostic test." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {metrics.bmi.toFixed(1)}
            </div>
            <Badge className={`${metrics.bmiClass} px-4 py-2 text-sm font-medium`}>
              {metrics.bmiCategory}
            </Badge>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="text-blue-600">Underweight: &lt;18.5</div>
              <div className="text-green-600">Normal: 18.5-24.9</div>
              <div className="text-orange-600">Overweight: 25-29.9</div>
              <div className="text-red-600">Obese: ≥30</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BMR Card */}
      <Card className="result-card show">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center">
              <Flame className="mr-2 h-5 w-5 text-blue-600" />
              Basal Metabolic Rate (BMR)
            </div>
            <TooltipInfo content="BMR is the number of calories your body needs at rest to maintain basic physiological functions." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {Math.round(metrics.bmr)}
            </div>
            <div className="text-gray-600">calories per day</div>
            <div className="mt-3 text-sm text-gray-500">
              Energy needed for basic body functions at rest
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Calories Card */}
      <Card className="result-card show">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center">
              <Utensils className="mr-2 h-5 w-5 text-blue-600" />
              Daily Calorie Needs
            </div>
            <TooltipInfo content="Total daily energy expenditure based on your BMR and activity level." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Maintain Weight</span>
              <span className="font-semibold">{Math.round(metrics.dailyCalories)} cal</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-sm text-gray-600">Lose Weight (-0.5kg/week)</span>
              <span className="font-semibold text-red-600">{Math.round(metrics.loseCalories)} cal</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-600">Gain Weight (+0.5kg/week)</span>
              <span className="font-semibold text-green-600">{Math.round(metrics.gainCalories)} cal</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ideal Weight Range Card */}
      <Card className="result-card show">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-blue-600" />
              Ideal Weight Range
            </div>
            <TooltipInfo content="Weight range for a healthy BMI (18.5-24.9) based on your height." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {formatWeight(isMetric ? metrics.idealWeightMin : metrics.idealWeightMin * 2.20462, isMetric)} - {formatWeight(isMetric ? metrics.idealWeightMax : metrics.idealWeightMax * 2.20462, isMetric)}
            </div>
            <div className="text-gray-600 text-sm">Healthy weight range for your height</div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600">
                {metrics.weightStatus}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

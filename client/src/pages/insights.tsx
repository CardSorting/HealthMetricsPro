import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Utensils, Activity, AlertCircle, CheckCircle } from "lucide-react";

export default function Insights() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50/30 pb-20">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <Heart className="mr-4 h-8 w-8 text-red-600" />
            Health Insights
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Personalized recommendations based on your health metrics
          </p>
        </div>

        {/* Health Score */}
        <Card className="glass-card border-0 shadow-xl mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
              <Brain className="mr-3 h-6 w-6 text-purple-600" />
              Overall Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">85</div>
                <Badge className="bg-green-100 text-green-800 px-4 py-2">Excellent</Badge>
              </div>
              <div className="flex-1 ml-8">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full shadow-sm" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Poor</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Your health metrics indicate you're in excellent shape! Keep up the great work with your current lifestyle.
            </p>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="space-y-6">
          <Card className="glass-card border-0 shadow-xl fade-in-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                <Utensils className="mr-3 h-6 w-6 text-orange-600" />
                Nutrition Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl border border-green-200/50">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-800">Calorie intake is optimal</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Your current daily calorie consumption aligns well with your BMR and activity level.
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200/50">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-800">Consider increasing protein intake</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Aim for 1.2-1.6g per kg of body weight to support muscle maintenance and metabolism.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-xl fade-in-up" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                <Activity className="mr-3 h-6 w-6 text-blue-600" />
                Activity Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                  <div className="font-medium text-gray-800 mb-2">💪 Strength Training</div>
                  <div className="text-sm text-gray-600">
                    2-3 sessions per week to maintain muscle mass and bone density.
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                  <div className="font-medium text-gray-800 mb-2">🏃 Cardio Exercise</div>
                  <div className="text-sm text-gray-600">
                    150 minutes of moderate activity or 75 minutes of vigorous activity weekly.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-xl fade-in-up" style={{ animationDelay: '0.8s' }}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                🎯 Personalized Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-800">Maintain current weight</div>
                    <div className="text-sm text-gray-600">You're in the healthy BMI range</div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-800">Increase muscle mass</div>
                    <div className="text-sm text-gray-600">Focus on resistance training</div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Suggested</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-800">Improve cardiovascular health</div>
                    <div className="text-sm text-gray-600">Regular aerobic exercise</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-xl fade-in-up" style={{ animationDelay: '1.0s' }}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                📈 Health Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">↗️</div>
                  <div className="text-sm font-medium text-gray-800">BMI Trend</div>
                  <div className="text-xs text-gray-600">Stable & Healthy</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">📊</div>
                  <div className="text-sm font-medium text-gray-800">Metabolism</div>
                  <div className="text-xs text-gray-600">Optimized</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">🎯</div>
                  <div className="text-sm font-medium text-gray-800">Goal Progress</div>
                  <div className="text-xs text-gray-600">On Track</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
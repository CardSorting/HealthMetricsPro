import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar, Target, Award } from "lucide-react";

export default function Progress() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 pb-20">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <TrendingUp className="mr-4 h-8 w-8 text-green-600" />
            Health Progress
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track your health journey and celebrate your achievements
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Card className="glass-card border-0 shadow-lg text-center">
            <CardContent className="p-4">
              <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">7</div>
              <div className="text-xs text-gray-600">Days Active</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 shadow-lg text-center">
            <CardContent className="p-4">
              <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">3</div>
              <div className="text-xs text-gray-600">Goals Met</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 shadow-lg text-center">
            <CardContent className="p-4">
              <Award className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">2</div>
              <div className="text-xs text-gray-600">Achievements</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 shadow-lg text-center">
            <CardContent className="p-4">
              <TrendingUp className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">5%</div>
              <div className="text-xs text-gray-600">Improvement</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Cards */}
        <div className="space-y-6">
          <Card className="glass-card border-0 shadow-xl fade-in-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                📊 Weight Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-gray-800">72.5 kg</div>
                  <div className="text-sm text-gray-600">Current Weight</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600">-2.5 kg</div>
                  <div className="text-sm text-gray-600">This Month</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full shadow-sm" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Start: 75kg</span>
                <span>Goal: 70kg</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-xl fade-in-up" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                🎯 Health Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Daily calorie target</span>
                </div>
                <span className="text-green-600 font-semibold">✓ Achieved</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">BMI in healthy range</span>
                </div>
                <span className="text-blue-600 font-semibold">✓ Achieved</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium">Target weight</span>
                </div>
                <span className="text-orange-600 font-semibold">In Progress</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-xl fade-in-up" style={{ animationDelay: '0.8s' }}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                🏆 Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                  <Award className="h-6 w-6 text-yellow-600" />
                  <div>
                    <div className="font-medium text-gray-800">Consistency Champion</div>
                    <div className="text-xs text-gray-600">7 days of tracking</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <Target className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-800">Goal Getter</div>
                    <div className="text-xs text-gray-600">Reached healthy BMI</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
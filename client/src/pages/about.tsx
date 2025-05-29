import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Heart, Shield, Users, Zap, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 pb-20">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <Info className="mr-4 h-8 w-8 text-indigo-600" />
            About Health Calculator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your trusted companion for health metrics and wellness insights
          </p>
        </div>

        {/* Mission */}
        <Card className="glass-card border-0 shadow-xl mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
              <Heart className="mr-3 h-6 w-6 text-red-600" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              We believe everyone deserves access to professional-grade health insights. Our calculator provides accurate, 
              evidence-based metrics to help you understand your health status and make informed decisions about your wellness journey.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="glass-card border-0 shadow-xl mb-8 fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              ✨ What We Offer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                <Zap className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <div className="font-medium text-gray-800">Instant Calculations</div>
                  <div className="text-sm text-gray-600">Real-time BMI, BMR, and calorie calculations</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
                <Award className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <div className="font-medium text-gray-800">Professional Accuracy</div>
                  <div className="text-sm text-gray-600">Based on validated medical formulas</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
                <Shield className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <div className="font-medium text-gray-800">Privacy First</div>
                  <div className="text-sm text-gray-600">All calculations happen locally on your device</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl">
                <Users className="h-6 w-6 text-orange-600 mt-1" />
                <div>
                  <div className="font-medium text-gray-800">User-Friendly</div>
                  <div className="text-sm text-gray-600">Intuitive design for all ages and tech levels</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calculations Explained */}
        <Card className="glass-card border-0 shadow-xl mb-8 fade-in-up" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              📊 Our Calculations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
              <div className="font-medium text-gray-800 mb-2">Body Mass Index (BMI)</div>
              <div className="text-sm text-gray-600">
                Calculated using the standard formula: weight (kg) ÷ height (m)². Provides a quick assessment of body weight status.
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
              <div className="font-medium text-gray-800 mb-2">Basal Metabolic Rate (BMR)</div>
              <div className="text-sm text-gray-600">
                Uses the Mifflin-St Jeor equation to estimate calories your body needs at rest for basic functions.
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
              <div className="font-medium text-gray-800 mb-2">Daily Calorie Needs</div>
              <div className="text-sm text-gray-600">
                Multiplies BMR by activity level factor to estimate total daily energy expenditure.
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200/50">
              <div className="font-medium text-gray-800 mb-2">Ideal Weight Range</div>
              <div className="text-sm text-gray-600">
                Based on healthy BMI range (18.5-24.9) for your height to provide weight goals.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="glass-card border-0 shadow-xl fade-in-up" style={{ animationDelay: '0.8s' }}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              ⚠️ Important Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Medical Disclaimer:</strong> This calculator provides general health information for educational purposes only. 
                Results should not replace professional medical advice, diagnosis, or treatment.
              </p>
              <p>
                <strong>Limitations:</strong> BMI and other calculations may not be accurate for athletes, pregnant women, 
                elderly individuals, or those with certain medical conditions.
              </p>
              <p>
                <strong>Privacy:</strong> All calculations are performed locally on your device. We do not collect, 
                store, or transmit any personal health information.
              </p>
              <p className="font-medium text-gray-800">
                Always consult with qualified healthcare professionals for personalized medical advice and before 
                making significant changes to your diet or exercise routine.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
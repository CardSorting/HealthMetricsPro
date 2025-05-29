import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Bell, Shield, HelpCircle, LogOut } from "lucide-react";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 pb-20">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <User className="mr-4 h-8 w-8 text-purple-600" />
            Your Profile
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your health profile and app preferences
          </p>
        </div>

        {/* Profile Summary */}
        <Card className="glass-card border-0 shadow-xl mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">Health Explorer</h2>
                <p className="text-gray-600">Member since Today</p>
                <div className="flex space-x-2 mt-2">
                  <Badge className="bg-green-100 text-green-800">Active User</Badge>
                  <Badge className="bg-blue-100 text-blue-800">Health Focused</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Card className="glass-card border-0 shadow-lg text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-xs text-gray-600">Calculations</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 shadow-lg text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-xs text-gray-600">Goals Set</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 shadow-lg text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-xs text-gray-600">Insights</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 shadow-lg text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">1</div>
              <div className="text-xs text-gray-600">Days Active</div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Menu */}
        <div className="space-y-4">
          <Card className="glass-card border-0 shadow-xl fade-in-up" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                ⚙️ App Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start p-4 h-auto rounded-xl hover:bg-gray-100">
                <Settings className="mr-3 h-5 w-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">General Settings</div>
                  <div className="text-sm text-gray-600">Units, language, and display preferences</div>
                </div>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start p-4 h-auto rounded-xl hover:bg-gray-100">
                <Bell className="mr-3 h-5 w-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Notifications</div>
                  <div className="text-sm text-gray-600">Manage your notification preferences</div>
                </div>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start p-4 h-auto rounded-xl hover:bg-gray-100">
                <Shield className="mr-3 h-5 w-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Privacy & Security</div>
                  <div className="text-sm text-gray-600">Data privacy and security settings</div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-xl fade-in-up" style={{ animationDelay: '0.8s' }}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                💡 Help & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start p-4 h-auto rounded-xl hover:bg-gray-100">
                <HelpCircle className="mr-3 h-5 w-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Help Center</div>
                  <div className="text-sm text-gray-600">Get answers to common questions</div>
                </div>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start p-4 h-auto rounded-xl hover:bg-gray-100">
                <User className="mr-3 h-5 w-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium">Contact Support</div>
                  <div className="text-sm text-gray-600">Get in touch with our team</div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-xl fade-in-up" style={{ animationDelay: '1.0s' }}>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-4">
                  Health Metrics Calculator v1.0
                </div>
                <div className="text-xs text-gray-500">
                  Your health data is processed locally and never stored on our servers
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
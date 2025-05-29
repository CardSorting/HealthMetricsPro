import React, { useState, useCallback } from "react";
import { InputForm, FormData } from "@/components/health-calculator/input-form";
import { ResultsDisplay } from "@/components/health-calculator/results-display";
import { BottomNav } from "@/components/bottom-nav";
import { TrendsChart } from "@/components/trends-chart";
import { HistoryView } from "@/components/history-view";
import { SettingsView } from "@/components/settings-view";
import { calculateHealthMetrics, HealthMetrics } from "@/lib/health-calculations";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { HealthEntry, HealthSession } from "@/lib/health-data";
import { useToast } from "@/hooks/use-toast";
import { Activity, AlertTriangle } from "lucide-react";

export default function HealthCalculator() {
  const [isMetric, setIsMetric] = useState(true);
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [activeTab, setActiveTab] = useState<'calculator' | 'trends' | 'history' | 'settings'>('calculator');
  const [healthSession, setHealthSession] = useLocalStorage<HealthSession>('health-session', { entries: [] });
  const { toast } = useToast();

  const handleFormChange = useCallback((data: FormData) => {
    try {
      const calculatedMetrics = calculateHealthMetrics(
        data.age,
        data.height,
        data.weight,
        data.gender,
        data.activityLevel,
        isMetric
      );
      setMetrics(calculatedMetrics);

      // Save to local storage
      const newEntry: HealthEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        age: data.age,
        height: data.height,
        weight: data.weight,
        gender: data.gender,
        activityLevel: data.activityLevel,
        isMetric,
        metrics: {
          bmi: calculatedMetrics.bmi,
          bmiCategory: calculatedMetrics.bmiCategory,
          bmr: calculatedMetrics.bmr,
          dailyCalories: calculatedMetrics.dailyCalories,
          loseCalories: calculatedMetrics.loseCalories,
          gainCalories: calculatedMetrics.gainCalories,
          idealWeightMin: calculatedMetrics.idealWeightMin,
          idealWeightMax: calculatedMetrics.idealWeightMax,
        }
      };

      // Update session with new entry
      setHealthSession(prev => ({
        ...prev,
        entries: [...prev.entries, newEntry],
        currentEntry: newEntry
      }));

      toast({
        title: "✨ Calculation Complete",
        description: "Your health metrics have been calculated and saved!",
        duration: 2000,
      });
    } catch (error) {
      console.error('Error calculating metrics:', error);
      setMetrics(null);
    }
  }, [isMetric, setHealthSession, toast]);

  const handleUnitToggle = useCallback((metric: boolean) => {
    setIsMetric(metric);
    setMetrics(null);
  }, []);

  const handleDeleteEntry = useCallback((id: string) => {
    setHealthSession(prev => ({
      ...prev,
      entries: prev.entries.filter(entry => entry.id !== id)
    }));
    toast({
      title: "🗑️ Entry Deleted",
      description: "Health entry has been removed from your history.",
      duration: 2000,
    });
  }, [setHealthSession, toast]);

  const handleExportData = useCallback(() => {
    const dataStr = JSON.stringify(healthSession, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `health-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: "📁 Data Exported",
      description: "Your health data has been downloaded successfully!",
      duration: 2000,
    });
  }, [healthSession, toast]);

  const handleImportData = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        setHealthSession(importedData);
        toast({
          title: "📥 Data Imported",
          description: "Your health data has been imported successfully!",
          duration: 2000,
        });
      } catch (error) {
        toast({
          title: "❌ Import Failed",
          description: "Invalid file format. Please select a valid health data file.",
          duration: 3000,
        });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }, [setHealthSession, toast]);

  const handleClearData = useCallback(() => {
    if (window.confirm('Are you sure you want to delete all your health data? This action cannot be undone.')) {
      setHealthSession({ entries: [] });
      setMetrics(null);
      toast({
        title: "🧹 Data Cleared",
        description: "All your health data has been cleared.",
        duration: 2000,
      });
    }
  }, [setHealthSession, toast]);

  const renderContent = () => {
    switch (activeTab) {
      case 'trends':
        return <TrendsChart entries={healthSession.entries} isMetric={isMetric} />;
      case 'history':
        return (
          <HistoryView
            entries={healthSession.entries}
            isMetric={isMetric}
            onDeleteEntry={handleDeleteEntry}
          />
        );
      case 'settings':
        return (
          <SettingsView
            isMetric={isMetric}
            onUnitToggle={handleUnitToggle}
            onExportData={handleExportData}
            onImportData={handleImportData}
            onClearData={handleClearData}
            entryCount={healthSession.entries.length}
          />
        );
      default:
        return (
          <>
            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              <div className="order-1 lg:order-1 fade-in-up" style={{ animationDelay: '0.2s' }}>
                <InputForm
                  onFormChange={handleFormChange}
                  isMetric={isMetric}
                  onUnitToggle={handleUnitToggle}
                />
              </div>
              <div className="order-2 lg:order-2 fade-in-up" style={{ animationDelay: '0.4s' }}>
                <ResultsDisplay metrics={metrics} isMetric={isMetric} />
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 md:mt-12 p-4 md:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200/60 rounded-2xl shadow-lg backdrop-blur-sm fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5 mr-4 flex-shrink-0" />
                <div className="text-sm md:text-base text-yellow-800 leading-relaxed">
                  <strong className="font-semibold">Medical Disclaimer:</strong> These calculations provide general health insights for informational purposes only. Always consult with a qualified healthcare provider for personalized medical advice, diagnosis, or treatment recommendations.
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-7xl">
        {/* Header - Hidden on mobile when not on calculator tab */}
        <div className={`text-center mb-8 md:mb-12 fade-in-up ${activeTab !== 'calculator' ? 'hidden md:block' : ''}`}>
          <div className="floating-element">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <Activity className="mr-4 h-8 w-8 md:h-12 md:w-12 text-blue-600" />
              Health Metrics Calculator
            </h1>
          </div>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-80">
            Get instant, personalized health insights with professional-grade calculations designed for your wellness journey
          </p>
          
          {/* Visual indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-8">
            <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real-time calculations</span>
            </div>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Professional accuracy</span>
            </div>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Privacy focused</span>
            </div>
          </div>
        </div>

        {/* Mobile Tab Header */}
        <div className="md:hidden mb-6">
          <h2 className="text-2xl font-bold text-gray-800 capitalize fade-in-up">
            {activeTab === 'calculator' ? 'Health Calculator' : activeTab}
          </h2>
          {activeTab === 'trends' && (
            <p className="text-gray-600 text-sm mt-1">Track your health progress over time</p>
          )}
          {activeTab === 'history' && (
            <p className="text-gray-600 text-sm mt-1">View your previous calculations</p>
          )}
          {activeTab === 'settings' && (
            <p className="text-gray-600 text-sm mt-1">Manage your preferences and data</p>
          )}
        </div>

        {/* Tab Content */}
        <div className="fade-in-up">
          {renderContent()}
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

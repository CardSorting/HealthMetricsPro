import React, { useState, useCallback } from "react";
import { EnhancedInputForm, FormData } from "@/components/enhanced-input-form";
import { EnhancedResultsDisplay } from "@/components/enhanced-results-display";
import { BottomNav } from "@/components/bottom-nav";
import { TrendsChart } from "@/components/trends-chart";
import { HistoryView } from "@/components/history-view";
import { SettingsView } from "@/components/settings-view";
import { calculateHealthMetrics, HealthMetrics } from "@/lib/health-calculations";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { HealthEntry, HealthSession } from "@/lib/health-data";
import { useToast } from "@/hooks/use-toast";
import { Activity, AlertTriangle, Sparkles } from "lucide-react";

export default function HealthCalculator() {
  const [isMetric, setIsMetric] = useState(true);
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);
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
      setCurrentFormData(data);
    } catch (error) {
      console.error('Error calculating metrics:', error);
      setMetrics(null);
    }
  }, [isMetric]);

  const handleSaveCalculation = useCallback(() => {
    if (!currentFormData || !metrics) return;

    const newEntry: HealthEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      age: currentFormData.age,
      height: currentFormData.height,
      weight: currentFormData.weight,
      gender: currentFormData.gender,
      activityLevel: currentFormData.activityLevel,
      isMetric,
      metrics: {
        bmi: metrics.bmi,
        bmiCategory: metrics.bmiCategory,
        bmr: metrics.bmr,
        dailyCalories: metrics.dailyCalories,
        loseCalories: metrics.loseCalories,
        gainCalories: metrics.gainCalories,
        idealWeightMin: metrics.idealWeightMin,
        idealWeightMax: metrics.idealWeightMax,
      }
    };

    setHealthSession({
      ...healthSession,
      entries: [...healthSession.entries, newEntry],
      currentEntry: newEntry
    });

    toast({
      title: "✨ Calculation Saved",
      description: "Your health metrics have been saved to history!",
      duration: 2000,
    });
  }, [currentFormData, metrics, isMetric, healthSession, setHealthSession, toast]);

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
                <EnhancedInputForm
                  onFormChange={handleFormChange}
                  isMetric={isMetric}
                  onUnitToggle={handleUnitToggle}
                />
              </div>
              <div className="order-2 lg:order-2 fade-in-up" style={{ animationDelay: '0.4s' }}>
                <EnhancedResultsDisplay 
                  metrics={metrics} 
                  isMetric={isMetric} 
                  onSaveCalculation={metrics ? handleSaveCalculation : undefined}
                />
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
        {/* Enhanced Header with dynamic content */}
        <div className={`text-center mb-8 md:mb-12 fade-in-up ${activeTab !== 'calculator' ? 'hidden md:block' : ''}`}>
          <div className="floating-element">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <Activity className="mr-4 h-8 w-8 md:h-12 md:w-12 text-blue-600 breathe" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Health Metrics Calculator
              </span>
              <Sparkles className="ml-2 h-6 w-6 text-yellow-500 animate-pulse" />
            </h1>
          </div>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-80">
            Get instant, personalized health insights with professional-grade calculations designed for your wellness journey
          </p>
          
          {/* Enhanced visual indicators with progress */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-8">
            <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 apple-button glow-effect p-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full status-indicator"></div>
              <span>Real-time calculations</span>
            </div>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 apple-button glow-effect p-2 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full status-indicator"></div>
              <span>Professional accuracy</span>
            </div>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 apple-button glow-effect p-2 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full status-indicator"></div>
              <span>Privacy focused</span>
            </div>
          </div>

          {/* Session stats for returning users */}
          {healthSession.entries.length > 0 && (
            <div className="mt-6 inline-flex items-center space-x-2 bg-blue-50/50 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-200/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-700 font-medium">
                {healthSession.entries.length} calculation{healthSession.entries.length === 1 ? '' : 's'} saved
              </span>
            </div>
          )}
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

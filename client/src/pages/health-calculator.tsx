import React, { useState, useCallback } from "react";
import { InputForm, FormData } from "@/components/health-calculator/input-form";
import { ResultsDisplay } from "@/components/health-calculator/results-display";
import { calculateHealthMetrics, HealthMetrics } from "@/lib/health-calculations";
import { Activity, AlertTriangle } from "lucide-react";

export default function HealthCalculator() {
  const [isMetric, setIsMetric] = useState(true);
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);

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
    } catch (error) {
      console.error('Error calculating metrics:', error);
      setMetrics(null);
    }
  }, [isMetric]);

  const handleUnitToggle = useCallback((metric: boolean) => {
    setIsMetric(metric);
    // Reset metrics to trigger recalculation with new units
    setMetrics(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <Activity className="mr-4 h-8 w-8 md:h-12 md:w-12 text-blue-600" />
            Health Metrics Calculator
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Get instant, personalized health insights with professional-grade calculations designed for your wellness journey
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <div className="order-1 lg:order-1">
            <InputForm
              onFormChange={handleFormChange}
              isMetric={isMetric}
              onUnitToggle={handleUnitToggle}
            />
          </div>
          <div className="order-2 lg:order-2">
            <ResultsDisplay metrics={metrics} isMetric={isMetric} />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 md:mt-12 p-4 md:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200/60 rounded-2xl shadow-lg backdrop-blur-sm">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5 mr-4 flex-shrink-0" />
            <div className="text-sm md:text-base text-yellow-800 leading-relaxed">
              <strong className="font-semibold">Medical Disclaimer:</strong> These calculations provide general health insights for informational purposes only. Always consult with a qualified healthcare provider for personalized medical advice, diagnosis, or treatment recommendations.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

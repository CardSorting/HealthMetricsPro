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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <Activity className="mr-3 h-8 w-8 text-blue-600" />
            Health Metrics Calculator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get instant insights into your health metrics with professional-grade calculations
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          <InputForm
            onFormChange={handleFormChange}
            isMetric={isMetric}
            onUnitToggle={handleUnitToggle}
          />
          <ResultsDisplay metrics={metrics} isMetric={isMetric} />
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <strong>Medical Disclaimer:</strong> These calculations are for informational purposes only and should not replace professional medical advice. Consult with a healthcare provider for personalized health recommendations.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

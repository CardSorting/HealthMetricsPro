import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HealthEntry } from '@/lib/health-data';
import { TrendingUp, TrendingDown, Minus, Heart, Scale, Zap, Target } from 'lucide-react';

interface TrendsChartProps {
  entries: HealthEntry[];
  isMetric: boolean;
}

export function TrendsChart({ entries, isMetric }: TrendsChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'bmi' | 'calories' | 'bmr'>('weight');

  if (entries.length === 0) {
    return (
      <div className="space-y-6 p-4">
        {/* Apple Health-style Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl mx-auto flex items-center justify-center">
            <Heart className="h-10 w-10 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Trends</h2>
            <p className="text-gray-500 text-sm">Track your progress over time</p>
          </div>
        </div>

        {/* Empty State */}
        <Card className="glass-card border-0 shadow-xl bg-gradient-to-br from-blue-50/50 to-purple-50/50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Data Yet</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Save calculations from the Health Calculator to see your personalized trends and insights
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const chartData = entries.map((entry, index) => {
    const date = new Date(entry.date);
    return {
      index: index + 1,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date.toLocaleDateString(),
      weight: isMetric ? entry.weight : entry.weight * 2.20462,
      bmi: entry.metrics.bmi,
      bmr: entry.metrics.bmr,
      calories: entry.metrics.dailyCalories,
      weightRounded: Math.round((isMetric ? entry.weight : entry.weight * 2.20462) * 10) / 10,
      bmiRounded: Math.round(entry.metrics.bmi * 10) / 10,
    };
  });

  const getWeightTrend = () => {
    if (entries.length < 2) return { trend: 'stable', value: 0 };
    const first = entries[0].weight;
    const last = entries[entries.length - 1].weight;
    const diff = last - first;
    const trend = diff > 0.5 ? 'up' : diff < -0.5 ? 'down' : 'stable';
    return { trend, value: Math.abs(diff) };
  };

  const getBMITrend = () => {
    if (entries.length < 2) return { trend: 'stable', value: 0 };
    const first = entries[0].metrics.bmi;
    const last = entries[entries.length - 1].metrics.bmi;
    const diff = last - first;
    const trend = diff > 0.1 ? 'up' : diff < -0.1 ? 'down' : 'stable';
    return { trend, value: Math.abs(diff) };
  };

  const weightTrend = getWeightTrend();
  const bmiTrend = getBMITrend();

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-green-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getCurrentValue = () => {
    if (entries.length === 0) return 0;
    const latest = entries[entries.length - 1];
    switch (selectedMetric) {
      case 'weight': return isMetric ? latest.weight : latest.weight * 2.20462;
      case 'bmi': return latest.metrics.bmi;
      case 'calories': return latest.metrics.dailyCalories;
      case 'bmr': return latest.metrics.bmr;
      default: return 0;
    }
  };

  const getMetricConfig = () => {
    switch (selectedMetric) {
      case 'weight':
        return {
          title: 'Weight',
          icon: Scale,
          color: '#3B82F6',
          gradient: 'from-blue-500 to-blue-600',
          unit: isMetric ? 'kg' : 'lbs',
          dataKey: 'weight'
        };
      case 'bmi':
        return {
          title: 'BMI',
          icon: Target,
          color: '#10B981',
          gradient: 'from-green-500 to-green-600',
          unit: '',
          dataKey: 'bmi'
        };
      case 'calories':
        return {
          title: 'Daily Calories',
          icon: Zap,
          color: '#F59E0B',
          gradient: 'from-yellow-500 to-orange-500',
          unit: 'cal',
          dataKey: 'calories'
        };
      case 'bmr':
        return {
          title: 'BMR',
          icon: Heart,
          color: '#EF4444',
          gradient: 'from-red-500 to-pink-500',
          unit: 'cal/day',
          dataKey: 'bmr'
        };
    }
  };

  const config = getMetricConfig();
  const currentValue = getCurrentValue();

  return (
    <div className="space-y-6 p-4">
      {/* Apple Health-style Header */}
      <div className="text-center space-y-4">
        <div className={`w-20 h-20 bg-gradient-to-br ${config.gradient} rounded-3xl mx-auto flex items-center justify-center shadow-lg`}>
          <config.icon className="h-10 w-10 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Health Trends</h2>
          <p className="text-gray-500 text-sm">Track your progress over time</p>
        </div>
      </div>

      {/* Metric Selector Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'weight', label: 'Weight', icon: Scale },
          { key: 'bmi', label: 'BMI', icon: Target },
          { key: 'calories', label: 'Calories', icon: Zap },
          { key: 'bmr', label: 'BMR', icon: Heart }
        ].map((metric) => (
          <Button
            key={metric.key}
            variant={selectedMetric === metric.key ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedMetric(metric.key as any)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 whitespace-nowrap ${
              selectedMetric === metric.key
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white/80 text-gray-600 hover:bg-blue-50 border-gray-200'
            }`}
          >
            <metric.icon className="h-3 w-3 mr-1" />
            {metric.label}
          </Button>
        ))}
      </div>

      {/* Current Value Card */}
      <Card className="glass-card border-0 shadow-xl bg-gradient-to-br from-white/80 to-blue-50/30">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500 font-medium">{config.title}</p>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-3xl font-bold" style={{ color: config.color }}>
                {currentValue.toFixed(selectedMetric === 'weight' ? 1 : 0)}
              </span>
              <span className="text-lg text-gray-500">{config.unit}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <TrendIcon trend={selectedMetric === 'weight' ? weightTrend.trend : bmiTrend.trend} />
              <span className="text-gray-600">
                {selectedMetric === 'weight' ? weightTrend.value.toFixed(1) : bmiTrend.value.toFixed(1)} since start
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card border-0 shadow-lg bg-gradient-to-br from-blue-50/50 to-blue-100/30">
          <CardContent className="p-4">
            <div className="text-center">
              <Scale className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Weight Change</p>
              <div className="flex items-center justify-center space-x-1">
                <TrendIcon trend={weightTrend.trend} />
                <span className="text-sm font-bold text-gray-800">
                  {weightTrend.value.toFixed(1)} {isMetric ? 'kg' : 'lbs'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg bg-gradient-to-br from-green-50/50 to-green-100/30">
          <CardContent className="p-4">
            <div className="text-center">
              <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">BMI Change</p>
              <div className="flex items-center justify-center space-x-1">
                <TrendIcon trend={bmiTrend.trend} />
                <span className="text-sm font-bold text-gray-800">
                  {bmiTrend.value.toFixed(1)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Apple Health-style Visual Progress */}
      <Card className="glass-card border-0 shadow-xl bg-gradient-to-br from-white/90 to-gray-50/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <config.icon className="h-5 w-5" style={{ color: config.color }} />
              <span>{config.title} Progress</span>
            </div>
            <span className="text-xs text-gray-500">{entries.length} data points</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          {/* Simple Progress Bars for each entry */}
          <div className="space-y-3 mb-6">
            {chartData.slice(-5).map((data, index) => {
              const value = data[config.dataKey as keyof typeof data] as number;
              const maxValue = Math.max(...chartData.map(d => d[config.dataKey as keyof typeof d] as number));
              const minValue = Math.min(...chartData.map(d => d[config.dataKey as keyof typeof d] as number));
              const percentage = ((value - minValue) / (maxValue - minValue)) * 100 || 50;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">{data.date}</span>
                    <span className="text-sm font-bold" style={{ color: config.color }}>
                      {value.toFixed(selectedMetric === 'weight' ? 1 : 0)} {config.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="h-2.5 rounded-full transition-all duration-700 ease-out"
                      style={{ 
                        width: `${percentage}%`,
                        background: `linear-gradient(90deg, ${config.color}40, ${config.color})`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simplified Chart */}
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id={`${selectedMetric}Gradient`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={config.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={config.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
                interval="preserveStartEnd"
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  padding: '8px 12px'
                }}
                labelStyle={{ color: '#374151', fontSize: '11px', fontWeight: '600' }}
                formatter={(value: any) => [
                  `${value.toFixed(selectedMetric === 'weight' ? 1 : 0)} ${config.unit}`,
                  config.title
                ]}
              />
              <Line 
                type="monotone" 
                dataKey={config.dataKey}
                stroke={config.color} 
                strokeWidth={4}
                dot={{ fill: config.color, strokeWidth: 0, r: 5 }}
                activeDot={{ r: 7, stroke: config.color, strokeWidth: 3, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Data Points Cards */}
      <div className="grid grid-cols-2 gap-4">
        {chartData.slice(-4).map((data, index) => (
          <Card key={index} className="glass-card border-0 shadow-lg bg-gradient-to-br from-white/80 to-blue-50/20">
            <CardContent className="p-4 text-center">
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-medium">{data.date}</p>
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-lg font-bold" style={{ color: config.color }}>
                    {(data[config.dataKey as keyof typeof data] as number).toFixed(selectedMetric === 'weight' ? 1 : 0)}
                  </span>
                  <span className="text-xs text-gray-500">{config.unit}</span>
                </div>
                {index === chartData.length - 1 && (
                  <div className="w-2 h-2 bg-green-500 rounded-full mx-auto animate-pulse" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Summary */}
      <Card className="glass-card border-0 shadow-lg bg-gradient-to-r from-gray-50/80 to-blue-50/50">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Entries</p>
              <p className="text-lg font-bold text-gray-800">{entries.length}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">First Entry</p>
              <p className="text-xs font-medium text-gray-700">
                {new Date(entries[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Latest Entry</p>
              <p className="text-xs font-medium text-gray-700">
                {new Date(entries[entries.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
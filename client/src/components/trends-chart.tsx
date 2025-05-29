import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthEntry } from '@/lib/health-data';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendsChartProps {
  entries: HealthEntry[];
  isMetric: boolean;
}

export function TrendsChart({ entries, isMetric }: TrendsChartProps) {
  if (entries.length === 0) {
    return (
      <div className="space-y-4">
        <Card className="glass-card border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Data Yet</h3>
            <p className="text-gray-500">Start using the calculator to see your health trends over time</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const chartData = entries.map((entry, index) => ({
    index: index + 1,
    date: new Date(entry.date).toLocaleDateString(),
    weight: isMetric ? entry.weight : entry.weight * 2.20462,
    bmi: entry.metrics.bmi,
    bmr: entry.metrics.bmr,
    calories: entry.metrics.dailyCalories,
  }));

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

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Weight Trend</p>
                <div className="flex items-center space-x-2">
                  <TrendIcon trend={weightTrend.trend} />
                  <span className="text-sm font-semibold">
                    {weightTrend.value.toFixed(1)} {isMetric ? 'kg' : 'lbs'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">BMI Trend</p>
                <div className="flex items-center space-x-2">
                  <TrendIcon trend={bmiTrend.trend} />
                  <span className="text-sm font-semibold">
                    {bmiTrend.value.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weight Chart */}
      <Card className="glass-card border-0 shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            📊 Weight Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="index" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="weight" 
                stroke="#3B82F6" 
                strokeWidth={3}
                fill="url(#weightGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* BMI Chart */}
      <Card className="glass-card border-0 shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            📈 BMI Progression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="index" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="bmi" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
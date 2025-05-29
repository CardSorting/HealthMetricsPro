import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HealthEntry } from '@/lib/health-data';
import { Calendar, Trash2, Weight, Activity } from 'lucide-react';
import { formatWeight } from '@/lib/unit-conversions';

interface HistoryViewProps {
  entries: HealthEntry[];
  isMetric: boolean;
  onDeleteEntry: (id: string) => void;
}

export function HistoryView({ entries, isMetric, onDeleteEntry }: HistoryViewProps) {
  if (entries.length === 0) {
    return (
      <div className="space-y-4">
        <Card className="glass-card border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No History Yet</h3>
            <p className="text-gray-500">Your calculation history will appear here as you use the app</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">History</h2>
        <Badge variant="secondary" className="px-3 py-1">
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </Badge>
      </div>

      {sortedEntries.map((entry, index) => (
        <Card key={entry.id} className="glass-card border-0 shadow-lg apple-button">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">
                {new Date(entry.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteEntry(entry.id)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Weight className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Weight</p>
                    <p className="text-sm font-semibold">
                      {formatWeight(isMetric ? entry.weight : entry.weight * 2.20462, isMetric)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-500">BMI</p>
                    <p className="text-sm font-semibold">{entry.metrics.bmi.toFixed(1)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <Badge 
                    className={`text-xs px-2 py-1 ${
                      entry.metrics.bmiCategory === 'Normal weight' ? 'bg-green-100 text-green-800' :
                      entry.metrics.bmiCategory === 'Underweight' ? 'bg-blue-100 text-blue-800' :
                      entry.metrics.bmiCategory === 'Overweight' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {entry.metrics.bmiCategory}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Daily Calories</p>
                  <p className="text-sm font-semibold">{Math.round(entry.metrics.dailyCalories)} cal</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
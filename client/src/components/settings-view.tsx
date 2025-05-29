import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Download, Upload, Trash2, Shield } from 'lucide-react';

interface SettingsViewProps {
  isMetric: boolean;
  onUnitToggle: (metric: boolean) => void;
  onExportData: () => void;
  onImportData: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearData: () => void;
  entryCount: number;
}

export function SettingsView({ 
  isMetric, 
  onUnitToggle, 
  onExportData, 
  onImportData, 
  onClearData, 
  entryCount 
}: SettingsViewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-6">
        <Settings className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
      </div>

      {/* Units Preference */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Measurement Units</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isMetric ? 'Metric (kg, cm)' : 'Imperial (lbs, ft)'}
              </p>
              <p className="text-xs text-gray-500">
                Choose your preferred measurement system
              </p>
            </div>
            <Switch
              checked={isMetric}
              onCheckedChange={onUnitToggle}
              className="apple-button"
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center">
            <Shield className="h-4 w-4 mr-2 text-green-600" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-700">Stored Entries</p>
              <p className="text-xs text-gray-500">Your health calculation history</p>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {entryCount}
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button
              onClick={onExportData}
              variant="outline"
              className="apple-button h-12 justify-start"
              disabled={entryCount === 0}
            >
              <Download className="h-4 w-4 mr-3 text-blue-600" />
              <div className="text-left">
                <p className="text-sm font-medium">Export Data</p>
                <p className="text-xs text-gray-500">Download your health data</p>
              </div>
            </Button>

            <label className="cursor-pointer">
              <Button
                variant="outline"
                className="apple-button h-12 justify-start w-full"
                asChild
              >
                <div>
                  <Upload className="h-4 w-4 mr-3 text-green-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Import Data</p>
                    <p className="text-xs text-gray-500">Upload previous health data</p>
                  </div>
                </div>
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={onImportData}
                className="hidden"
              />
            </label>

            <Button
              onClick={onClearData}
              variant="outline"
              className="apple-button h-12 justify-start border-red-200 hover:bg-red-50 hover:border-red-300"
              disabled={entryCount === 0}
            >
              <Trash2 className="h-4 w-4 mr-3 text-red-600" />
              <div className="text-left">
                <p className="text-sm font-medium text-red-700">Clear All Data</p>
                <p className="text-xs text-red-500">Permanently delete all entries</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="glass-card border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Privacy First</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                All your health data is stored locally on your device. We never send your personal information to external servers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
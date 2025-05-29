import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TooltipInfo } from "./health-calculator/tooltip-info";
import { UserCheck, Users, Zap, Activity } from "lucide-react";
import { kgToLbs, lbsToKg, cmToFt, ftToCm } from "@/lib/unit-conversions";

const formSchema = z.object({
  age: z.number().min(1, "Age must be at least 1").max(120, "Age must be less than 120"),
  height: z.number().min(1, "Height is required"),
  weight: z.number().min(1, "Weight is required"),
  gender: z.enum(["male", "female"], { required_error: "Please select your gender" }),
  activityLevel: z.number().min(1.2).max(1.9),
});

export type FormData = z.infer<typeof formSchema>;

interface EnhancedInputFormProps {
  onFormChange: (data: FormData) => void;
  isMetric: boolean;
  onUnitToggle: (metric: boolean) => void;
}

export function EnhancedInputForm({ onFormChange, isMetric, onUnitToggle }: EnhancedInputFormProps) {
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      height: 0,
      weight: 0,
      gender: undefined,
      activityLevel: 1.375,
    },
    mode: "onChange",
  });

  const { watch, setValue, getValues } = form;
  const watchedValues = watch();

  // Track field completion
  useEffect(() => {
    const values = getValues();
    const completed = new Set<string>();
    
    if (values.age && values.age > 0) completed.add('age');
    if (values.height && values.height > 0) completed.add('height');
    if (values.weight && values.weight > 0) completed.add('weight');
    if (values.gender) completed.add('gender');
    if (values.activityLevel) completed.add('activityLevel');
    
    setCompletedFields(completed);
  }, [watchedValues, getValues]);

  // Trigger form change when values update
  React.useEffect(() => {
    const values = getValues();
    if (values.age && values.age > 0 && values.height && values.height > 0 && values.weight && values.weight > 0 && values.gender) {
      onFormChange(values);
    }
  }, [watchedValues, onFormChange, getValues]);

  const handleUnitToggle = (metric: boolean) => {
    const currentValues = getValues();
    
    if (currentValues.height) {
      const convertedHeight = metric 
        ? ftToCm(currentValues.height) 
        : cmToFt(currentValues.height);
      setValue("height", Math.round(convertedHeight * 10) / 10);
    }
    
    if (currentValues.weight) {
      const convertedWeight = metric 
        ? lbsToKg(currentValues.weight) 
        : kgToLbs(currentValues.weight);
      setValue("weight", Math.round(convertedWeight * 10) / 10);
    }
    
    onUnitToggle(metric);
  };

  const progressPercentage = (completedFields.size / 5) * 100;

  return (
    <Card className="h-fit glass-card border-0 shadow-2xl card-hover-lift">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-xl font-semibold">
          <div className="flex items-center">
            <UserCheck className="mr-3 h-6 w-6 text-blue-600" />
            <span>Your Information</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-xs text-gray-500">{completedFields.size}/5</div>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">Enter your details for personalized health insights</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Enhanced Units Toggle */}
        <div className="flex justify-center mb-6">
          <div className="relative bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1.5 flex shadow-inner">
            <div 
              className={`absolute top-1.5 bottom-1.5 bg-blue-600 rounded-xl shadow-md transition-all duration-300 ease-out ${
                isMetric ? 'left-1.5 right-auto' : 'right-1.5 left-auto'
              }`}
              style={{ width: 'calc(50% - 6px)' }}
            ></div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`relative z-10 px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ease-out apple-button ${
                isMetric ? 'text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => handleUnitToggle(true)}
            >
              Metric
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`relative z-10 px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ease-out apple-button ${
                !isMetric ? 'text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => handleUnitToggle(false)}
            >
              Imperial
            </Button>
          </div>
        </div>

        <Form {...form}>
          <div className="space-y-6">
            {/* Enhanced Age Field */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <span>Age</span>
                      {completedFields.has('age') && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </FormLabel>
                    <TooltipInfo content="Enter your age in years. Used for accurate BMR calculation." />
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="25"
                        min="1"
                        max="120"
                        className={`apple-input h-12 text-base rounded-xl border-gray-200/50 bg-white/70 backdrop-blur-sm pl-4 pr-12 transition-all duration-300 ${
                          focusedField === 'age' ? 'ring-2 ring-blue-500/20 border-blue-500 shadow-lg scale-105' : ''
                        } ${completedFields.has('age') ? 'border-green-300 bg-green-50/30' : ''}`}
                        {...field}
                        value={field.value || ''}
                        onFocus={() => setFocusedField('age')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        years
                      </div>
                      {completedFields.has('age') && (
                        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Enhanced Gender Field */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <span>Gender</span>
                      {completedFields.has('gender') && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      <div className={`group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer apple-button glow-effect ${
                        field.value === 'male' 
                          ? 'border-blue-400 bg-blue-50/50 shadow-lg scale-105' 
                          : 'border-gray-200/50 bg-white/70 hover:border-blue-300 hover:bg-blue-50/30'
                      }`}>
                        <div className="flex items-center space-x-3 p-4">
                          <RadioGroupItem value="male" id="male" className="border-2" />
                          <Label htmlFor="male" className="flex-1 cursor-pointer font-medium">Male</Label>
                          <Users className="h-5 w-5 text-blue-500" />
                        </div>
                        {field.value === 'male' && (
                          <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      
                      <div className={`group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer apple-button glow-effect ${
                        field.value === 'female' 
                          ? 'border-pink-400 bg-pink-50/50 shadow-lg scale-105' 
                          : 'border-gray-200/50 bg-white/70 hover:border-pink-300 hover:bg-pink-50/30'
                      }`}>
                        <div className="flex items-center space-x-3 p-4">
                          <RadioGroupItem value="female" id="female" className="border-2" />
                          <Label htmlFor="female" className="flex-1 cursor-pointer font-medium">Female</Label>
                          <Users className="h-5 w-5 text-pink-500" />
                        </div>
                        {field.value === 'female' && (
                          <div className="absolute top-2 right-2 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Enhanced Height and Weight Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <span>Height ({isMetric ? 'cm' : 'ft'})</span>
                        {completedFields.has('height') && (
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        )}
                      </FormLabel>
                      <TooltipInfo content="Enter your height. Used for BMI and BMR calculations." />
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder={isMetric ? "170" : "5.7"}
                          step="0.1"
                          className={`apple-input h-12 text-base rounded-xl border-gray-200/50 bg-white/70 backdrop-blur-sm transition-all duration-300 ${
                            focusedField === 'height' ? 'ring-2 ring-blue-500/20 border-blue-500 shadow-lg scale-105' : ''
                          } ${completedFields.has('height') ? 'border-green-300 bg-green-50/30' : ''}`}
                          {...field}
                          value={field.value || ''}
                          onFocus={() => setFocusedField('height')}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                        />
                        {completedFields.has('height') && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <span>Weight ({isMetric ? 'kg' : 'lbs'})</span>
                        {completedFields.has('weight') && (
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        )}
                      </FormLabel>
                      <TooltipInfo content="Enter your current weight. Used for all calculations." />
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder={isMetric ? "70" : "154"}
                          step="0.1"
                          className={`apple-input h-12 text-base rounded-xl border-gray-200/50 bg-white/70 backdrop-blur-sm transition-all duration-300 ${
                            focusedField === 'weight' ? 'ring-2 ring-blue-500/20 border-blue-500 shadow-lg scale-105' : ''
                          } ${completedFields.has('weight') ? 'border-green-300 bg-green-50/30' : ''}`}
                          {...field}
                          value={field.value || ''}
                          onFocus={() => setFocusedField('weight')}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                        />
                        {completedFields.has('weight') && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Enhanced Activity Level */}
            <FormField
              control={form.control}
              name="activityLevel"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <span>Activity Level</span>
                      {completedFields.has('activityLevel') && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </FormLabel>
                    <TooltipInfo content="Select your typical activity level. This affects your daily calorie needs calculation." />
                  </div>
                  <Select onValueChange={(value) => field.onChange(parseFloat(value))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className={`h-12 text-base rounded-xl border-gray-200/50 bg-white/70 backdrop-blur-sm apple-input transition-all duration-300 ${
                        completedFields.has('activityLevel') ? 'border-green-300 bg-green-50/30' : ''
                      }`}>
                        <SelectValue placeholder="Select your activity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl border-gray-200/50 bg-white/95 backdrop-blur-sm">
                      {[
                        { value: "1.2", label: "🪑 Sedentary", desc: "little to no exercise" },
                        { value: "1.375", label: "🚶 Lightly active", desc: "light exercise 1-3 days/week" },
                        { value: "1.55", label: "🏃 Moderately active", desc: "moderate exercise 3-5 days/week" },
                        { value: "1.725", label: "💪 Very active", desc: "hard exercise 6-7 days/week" },
                        { value: "1.9", label: "🔥 Extremely active", desc: "very hard exercise, physical job" }
                      ].map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value} 
                          className="rounded-lg py-3 hover:bg-blue-50 transition-colors duration-200"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{option.label}</span>
                            <span className="text-xs text-gray-500 capitalize">{option.desc}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </Form>

        {/* Progress Indicator */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200/50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-gray-700 font-medium">
                {completedFields.size === 5 ? '🎉 Ready to calculate!' : `${5 - completedFields.size} more field${5 - completedFields.size === 1 ? '' : 's'} to go`}
              </span>
            </div>
            <div className="text-blue-600 font-semibold">
              {Math.round(progressPercentage)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
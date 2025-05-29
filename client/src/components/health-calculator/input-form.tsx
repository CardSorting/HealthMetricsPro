import React from "react";
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
import { TooltipInfo } from "./tooltip-info";
import { UserCheck, Users } from "lucide-react";
import { kgToLbs, lbsToKg, cmToFt, ftToCm } from "@/lib/unit-conversions";

const formSchema = z.object({
  age: z.number().min(1, "Age must be at least 1").max(120, "Age must be less than 120"),
  height: z.number().min(1, "Height is required"),
  weight: z.number().min(1, "Weight is required"),
  gender: z.enum(["male", "female"], { required_error: "Please select your gender" }),
  activityLevel: z.number().min(1.2).max(1.9),
});

export type FormData = z.infer<typeof formSchema>;

interface InputFormProps {
  onFormChange: (data: FormData) => void;
  isMetric: boolean;
  onUnitToggle: (metric: boolean) => void;
}

export function InputForm({ onFormChange, isMetric, onUnitToggle }: InputFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      height: undefined,
      weight: undefined,
      gender: undefined,
      activityLevel: 1.375,
    },
    mode: "onChange",
  });

  const { watch, setValue, getValues } = form;
  
  // Watch all form fields for changes
  const watchedValues = watch();

  // Trigger form change when values update
  React.useEffect(() => {
    const values = getValues();
    if (values.age && values.height && values.weight && values.gender) {
      onFormChange(values);
    }
  }, [watchedValues, onFormChange, getValues]);

  const handleUnitToggle = (metric: boolean) => {
    const currentValues = getValues();
    
    // Convert existing values if present
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

  return (
    <Card className="h-fit glass-card border-0 shadow-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl font-semibold">
          <UserCheck className="mr-3 h-6 w-6 text-blue-600" />
          Your Information
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">Enter your details for personalized health insights</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Units Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100/80 backdrop-blur-sm rounded-xl p-1.5 flex shadow-inner">
            <Button
              type="button"
              variant={isMetric ? "default" : "ghost"}
              size="sm"
              className={`px-6 py-2.5 text-sm font-medium rounded-lg apple-button ${
                isMetric ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-white/60'
              }`}
              onClick={() => handleUnitToggle(true)}
            >
              Metric
            </Button>
            <Button
              type="button"
              variant={!isMetric ? "default" : "ghost"}
              size="sm"
              className={`px-6 py-2.5 text-sm font-medium rounded-lg apple-button ${
                !isMetric ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-white/60'
              }`}
              onClick={() => handleUnitToggle(false)}
            >
              Imperial
            </Button>
          </div>
        </div>

        <Form {...form}>
          <div className="space-y-6">
            {/* Age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium text-gray-700">Age</FormLabel>
                    <TooltipInfo content="Enter your age in years. This is used for BMR calculation." />
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="25"
                      min="1"
                      max="120"
                      className="apple-input h-12 text-base rounded-xl border-gray-200/50 bg-white/70 backdrop-blur-sm"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-medium text-gray-700">Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      <div className="flex items-center space-x-3 border border-gray-200/50 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer bg-white/70 backdrop-blur-sm apple-button">
                        <RadioGroupItem value="male" id="male" className="border-2" />
                        <Label htmlFor="male" className="flex-1 cursor-pointer font-medium">Male</Label>
                        <Users className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex items-center space-x-3 border border-gray-200/50 rounded-xl p-4 hover:border-pink-400 hover:bg-pink-50/30 transition-all duration-200 cursor-pointer bg-white/70 backdrop-blur-sm apple-button">
                        <RadioGroupItem value="female" id="female" className="border-2" />
                        <Label htmlFor="female" className="flex-1 cursor-pointer font-medium">Female</Label>
                        <Users className="h-5 w-5 text-pink-500" />
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Height */}
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium text-gray-700">Height ({isMetric ? 'cm' : 'ft'})</FormLabel>
                    <TooltipInfo content="Enter your height. Used for BMI and BMR calculations." />
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={isMetric ? "170" : "5.7"}
                      step="0.1"
                      className="apple-input h-12 text-base rounded-xl border-gray-200/50 bg-white/70 backdrop-blur-sm"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium text-gray-700">Weight ({isMetric ? 'kg' : 'lbs'})</FormLabel>
                    <TooltipInfo content="Enter your current weight. Used for all calculations." />
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={isMetric ? "70" : "154"}
                      step="0.1"
                      className="apple-input h-12 text-base rounded-xl border-gray-200/50 bg-white/70 backdrop-blur-sm"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Activity Level */}
            <FormField
              control={form.control}
              name="activityLevel"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium text-gray-700">Activity Level</FormLabel>
                    <TooltipInfo content="Select your typical activity level. This affects your daily calorie needs calculation." />
                  </div>
                  <Select onValueChange={(value) => field.onChange(parseFloat(value))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="h-12 text-base rounded-xl border-gray-200/50 bg-white/70 backdrop-blur-sm apple-input">
                        <SelectValue placeholder="Select your activity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl border-gray-200/50 bg-white/95 backdrop-blur-sm">
                      <SelectItem value="1.2" className="rounded-lg py-3">🪑 Sedentary (little to no exercise)</SelectItem>
                      <SelectItem value="1.375" className="rounded-lg py-3">🚶 Lightly active (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="1.55" className="rounded-lg py-3">🏃 Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="1.725" className="rounded-lg py-3">💪 Very active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="1.9" className="rounded-lg py-3">🔥 Extremely active (very hard exercise, physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

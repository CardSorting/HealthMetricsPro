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
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <UserCheck className="mr-2 h-5 w-5 text-blue-600" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Units Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <Button
              type="button"
              variant={isMetric ? "default" : "ghost"}
              size="sm"
              className="px-4 py-2 text-sm"
              onClick={() => handleUnitToggle(true)}
            >
              Metric
            </Button>
            <Button
              type="button"
              variant={!isMetric ? "default" : "ghost"}
              size="sm"
              className="px-4 py-2 text-sm"
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
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Age (years)</FormLabel>
                    <TooltipInfo content="Enter your age in years. This is used for BMR calculation." />
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="25"
                      min="1"
                      max="120"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:border-blue-600 transition-colors">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="flex-1 cursor-pointer">Male</Label>
                        <Users className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:border-blue-600 transition-colors">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="flex-1 cursor-pointer">Female</Label>
                        <Users className="h-4 w-4 text-pink-500" />
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Height */}
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Height ({isMetric ? 'cm' : 'ft'})</FormLabel>
                    <TooltipInfo content="Enter your height. Used for BMI and BMR calculations." />
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={isMetric ? "170" : "5.7"}
                      step="0.1"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Weight ({isMetric ? 'kg' : 'lbs'})</FormLabel>
                    <TooltipInfo content="Enter your current weight. Used for all calculations." />
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={isMetric ? "70" : "154"}
                      step="0.1"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Activity Level */}
            <FormField
              control={form.control}
              name="activityLevel"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Activity Level</FormLabel>
                    <TooltipInfo content="Select your typical activity level. This affects your daily calorie needs calculation." />
                  </div>
                  <Select onValueChange={(value) => field.onChange(parseFloat(value))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1.2">Sedentary (little to no exercise)</SelectItem>
                      <SelectItem value="1.375">Lightly active (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="1.55">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="1.725">Very active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="1.9">Extremely active (very hard exercise, physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

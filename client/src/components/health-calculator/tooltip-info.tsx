import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TooltipInfoProps {
  content: string;
  className?: string;
}

export function TooltipInfo({ content, className = "" }: TooltipInfoProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className={`h-4 w-4 text-gray-400 hover:text-blue-600 cursor-pointer ${className}`} />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}

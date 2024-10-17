import React from 'react';
import { HelpCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatusIndicatorProps {
  verified: boolean;
  lgtm: boolean;
  onThumbsUp: () => void;
  onThumbsDown: () => void;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ verified, lgtm, onThumbsUp, onThumbsDown }) => (
  <div className="flex items-center space-x-2">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <HelpCircle size={16} className="text-gray-500" />
        </TooltipTrigger>
        <TooltipContent>
          {verified
            ? (lgtm ? "Looks Good" : "Doesn't Look Good")
            : "Unverified"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    {(!verified || (verified && !lgtm)) && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onThumbsUp}
        className="p-0"
      >
        <ThumbsUp size={16} className="text-green-500" />
      </Button>
    )}
    {(!verified || (verified && lgtm)) && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onThumbsDown}
        className="p-0"
      >
        <ThumbsDown size={16} className="text-red-500" />
      </Button>
    )}
  </div>
);

export default StatusIndicator;
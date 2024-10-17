import React from 'react';
import { HelpCircle, ThumbsUp, ThumbsDown, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatusIndicatorProps {
  verified: boolean;
  lgtm: boolean;
  onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
  onReset: () => void;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ verified, lgtm, onUpdate, onReset }) => {
  return (
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
          onClick={() => onUpdate(true, true)}
          className="p-0"
        >
          <ThumbsUp size={16} className="text-green-500" />
        </Button>
      )}
      {(!verified || (verified && lgtm)) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdate(true, false)}
          className="p-0"
        >
          <ThumbsDown size={16} className="text-red-500" />
        </Button>
      )}
      {verified && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="p-0"
              >
                <XCircle size={16} className="text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Reset verification
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default StatusIndicator;
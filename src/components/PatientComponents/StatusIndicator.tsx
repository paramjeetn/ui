import React from 'react';
import { HelpCircle, ThumbsUp, ThumbsDown, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatusIndicatorProps {
  verified: boolean;
  lgtm: boolean;
  onThumbsUp: () => void;
  onThumbsDown: () => void;
  onReset: () => void;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ verified, lgtm, onThumbsUp, onThumbsDown, onReset }) => (
  <div className="flex items-center space-x-2">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <HelpCircle size={16} className="text-gray-500" />
        </TooltipTrigger>
        <TooltipContent>
          {!verified 
            ? "Unverified"
            : lgtm 
              ? "Looks Good" 
              : "Doesn't Look Good"
          }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    {!verified && (
      <>
        <Button
          variant="ghost"
          size="sm"
          onClick={onThumbsUp}
          className="p-0"
        >
          <ThumbsUp size={16} className="text-green-500" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onThumbsDown}
          className="p-0"
        >
          <ThumbsDown size={16} className="text-red-500" />
        </Button>
      </>
    )}
    {verified && !lgtm && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onThumbsUp}
        className="p-0"
      >
        <ThumbsUp size={16} className="text-green-500" />
      </Button>
    )}
    {verified && lgtm && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onThumbsDown}
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

export default StatusIndicator;
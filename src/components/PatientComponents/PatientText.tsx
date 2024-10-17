import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusIndicator from '@/components/PatientComponents/StatusIndicator';// You'll need to create this component

interface PatientTextProps {
  text: string;
  verified: boolean;
  lgtm: boolean;
  onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
}

const PatientText: React.FC<PatientTextProps> = ({ text, verified, lgtm, onUpdate }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <CardTitle className="text-md font-semibold">Patient Text</CardTitle>
        <StatusIndicator
          verified={verified}
          lgtm={lgtm}
          onThumbsUp={() => onUpdate(true, true)}
          onThumbsDown={() => onUpdate(true, false)}
        />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <p className="text-sm">{text}</p>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PatientText;
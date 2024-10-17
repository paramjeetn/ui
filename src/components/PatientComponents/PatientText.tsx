import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusIndicator from '@/components/PatientComponents/StatusIndicator'; 

interface PatientTextProps {
  text: string;
  verified: boolean;
  lgtm: boolean;
  onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
  onReset: () => void;
}

const PatientText: React.FC<PatientTextProps> = ({ text, verified, lgtm, onUpdate, onReset }) => {
  
  useEffect(() => {
    console.log('PatientText Component:');
    console.log('verified:', verified);
    console.log('lgtm:', lgtm);
  }, [verified, lgtm]);

  const handleThumbsUp = () => {
    onUpdate(true, true);
  };

  const handleThumbsDown = () => {
    onUpdate(true, false);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <CardTitle className="text-md font-semibold">Patient Text</CardTitle>
        <StatusIndicator
          verified={verified}
          lgtm={lgtm}
          onThumbsUp={handleThumbsUp}
          onThumbsDown={handleThumbsDown}
          onReset={onReset}
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
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StatusIndicator from './StatusIndicator';

interface GuidelineTextProps {
  text: string;
  verified: boolean;
  lgtm: boolean;
  onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
}

const GuidelineText: React.FC<GuidelineTextProps> = ({ text, verified, lgtm, onUpdate }) => {
  console.log("Rendering GuidelineText. Props:", { text, verified, lgtm });

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <CardTitle className="text-md font-semibold">Guideline Text</CardTitle>
        <StatusIndicator
          verified={verified}
          lgtm={lgtm}
          onUpdate={onUpdate}
        />
      </CardHeader>
      <CardContent>
        <p className="text-sm">{text || 'No guideline text available.'}</p>
      </CardContent>
    </Card>
  );
};

export default GuidelineText;
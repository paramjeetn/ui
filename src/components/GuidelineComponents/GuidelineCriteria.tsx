import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StatusIndicator from '@/components/GuidelineComponents/StatusIndicator';

interface GuidelineCriteriaProps {
  criteria: string;
  verified: boolean;
  lgtm: boolean;
  onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
  onReset: () => void;

}

const GuidelineCriteria: React.FC<GuidelineCriteriaProps> = ({ criteria, verified, lgtm, onUpdate, onReset }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <CardTitle className="text-md font-semibold">Guideline Criteria</CardTitle>
        <StatusIndicator
          verified={verified}
          lgtm={lgtm}
          onUpdate={onUpdate}
          onReset={onReset}
        />
      </CardHeader>
      <CardContent>
        <p className="text-sm">{criteria}</p>
      </CardContent>
    </Card>
  );
};

export default GuidelineCriteria;
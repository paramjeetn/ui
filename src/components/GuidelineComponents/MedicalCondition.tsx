import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StatusIndicator from '@/components/GuidelineComponents/StatusIndicator';

interface MedicalConditionProps {
  condition: string;
  verified: boolean;
  lgtm: boolean;
  onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
}

const MedicalCondition: React.FC<MedicalConditionProps> = ({ condition, verified, lgtm, onUpdate }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <CardTitle className="text-md font-semibold">Medical Condition</CardTitle>
        <StatusIndicator
          verified={verified}
          lgtm={lgtm}
          onUpdate={onUpdate}
        />
      </CardHeader>
      <CardContent>
        <p className="text-sm">{condition}</p>
      </CardContent>
    </Card>
  );
};

export default MedicalCondition;
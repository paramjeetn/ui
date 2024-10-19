import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StatusIndicator from '@/components/GuidelineComponents/StatusIndicator';
import { Button } from "@/components/ui/button";
import { Pencil, X, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface MedicalConditionProps {
  condition: string;
  verified: boolean;
  lgtm: boolean;
  onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
  onReset: () => void;
  onTextChange: (newText: string) => void;
}

const MedicalCondition: React.FC<MedicalConditionProps> = ({ condition, verified, lgtm, onUpdate, onReset, onTextChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCondition, setEditedCondition] = useState(condition);

  const handleEdit = () => {
    setEditedCondition(condition);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedCondition(condition);
  };

  const handleSave = () => {
    setIsEditing(false);
    onTextChange(editedCondition);
  };

  const parseConditions = (conditionString: string) => {
    // Remove "Medical Conditions:" prefix if it exists
    const cleanedString = conditionString;
    
    // If there are no commas, return the whole string as a single condition
    if (!cleanedString.includes(',')) {
      return [cleanedString];
    }
    
    // Split by comma and trim each condition
    return cleanedString.split(',').map(cond => cond.trim()).filter(cond => cond !== '');
  };

  const conditionsList = parseConditions(condition);

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <CardTitle className="text-xl font-semibold">Medical Condition</CardTitle>
        <div className="flex items-center space-x-2 flex-grow mr-2 ml-2">
          <StatusIndicator
            verified={verified}
            lgtm={lgtm}
            onUpdate={onUpdate}
            onReset={onReset}
          />
          {!isEditing && (
            <Button variant="ghost" size="sm" onClick={handleEdit}>
              <Pencil size={16} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <>
          
            <Textarea
              value={editedCondition}
              onChange={(e) => setEditedCondition(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X size={16} className="mr-2" /> Cancel
              </Button>
              <Button variant="default" size="sm" onClick={handleSave}>
                <Check size={16} className="mr-2" /> Save
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap gap-2">
            {conditionsList.map((condition, index) => (
              <Button
                key={index}
                variant="secondary"
                className="rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 font-bold"
              >
                {condition}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicalCondition;
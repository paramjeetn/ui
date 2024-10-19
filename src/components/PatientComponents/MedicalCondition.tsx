import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusIndicator from '@/components/PatientComponents/StatusIndicator';
import { Button } from "@/components/ui/button";
import { Pencil, X, Check, HelpCircle } from "lucide-react";
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

  const handleThumbsUp = () => {
    onUpdate(true, true);
  };

  const handleThumbsDown = () => {
    onUpdate(true, false);
  };

  const conditionsList = condition.replace(/^Medical Conditions:\s*/, '').split(',')

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row mb-6 items-center justify-between py-2">
        <CardTitle className="text-xl font-semibold">Medical Condition</CardTitle>
          <div className="flex items-center space-x-2 flex-grow mr-2 ml-2"> {/* Added flex-grow here */}
          <StatusIndicator
            verified={verified}
            lgtm={lgtm}
            onThumbsUp={handleThumbsUp}
            onThumbsDown={handleThumbsDown}
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
        <ScrollArea className="max-h-40 pr-4">
          {isEditing ? (
            <>
        <Textarea
          value={editedCondition}
          onChange={(e) => setEditedCondition(e.target.value)}
          className="min-h-[100px] w-full border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 pr-10"
        />
        
      <div className="flex justify-end space-x-2 mt-2">
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
                condition && condition.trim() !== '' && !condition.includes('\n') ? (
                  <Button
                    key={index}
                    variant="secondary"
                    className="rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 font-bold"
                  >
                    {condition.trim()}
                  </Button>
                ) : null
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MedicalCondition;
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusIndicator from '@/components/PatientComponents/StatusIndicator';
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

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <CardTitle className="text-md font-semibold">Medical Condition</CardTitle>
        <div className="flex items-center space-x-2">
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
            <p className="text-sm">{condition}</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MedicalCondition;
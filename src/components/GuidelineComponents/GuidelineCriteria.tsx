import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StatusIndicator from '@/components/GuidelineComponents/StatusIndicator';
import { Button } from "@/components/ui/button";
import { Pencil, X, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface GuidelineCriteriaProps {
  criteria: string;
  verified: boolean;
  lgtm: boolean;
  onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
  onReset: () => void;
  onTextChange: (newText: string) => void;
}

const GuidelineCriteria: React.FC<GuidelineCriteriaProps> = ({ criteria, verified, lgtm, onUpdate, onReset, onTextChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCriteria, setEditedCriteria] = useState(criteria);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedCriteria(criteria);
  };

  const handleSave = () => {
    setIsEditing(false);
    onTextChange(editedCriteria);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <CardTitle className="text-md font-semibold">Guideline Criteria</CardTitle>
        <div className="flex items-center space-x-2">
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
              value={editedCriteria}
              onChange={(e) => setEditedCriteria(e.target.value)}
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
          <p className="text-sm">{criteria}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default GuidelineCriteria;
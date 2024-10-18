import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusIndicator from '@/components/PatientComponents/StatusIndicator';
import { Button } from "@/components/ui/button";
import { Pencil, X, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface FinalRecommendationProps {
  recommendation: string;
  verified: boolean;
  lgtm: boolean;
  onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
  onReset: () => void;
  onTextChange: (newText: string) => void;
}

const FinalRecommendation: React.FC<FinalRecommendationProps> = ({ recommendation, verified, lgtm, onUpdate, onReset, onTextChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecommendation, setEditedRecommendation] = useState(recommendation);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedRecommendation(recommendation);
  };

  const handleSave = () => {
    setIsEditing(false);
    onTextChange(editedRecommendation);
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
        <CardTitle className="text-md font-semibold">Final Recommendation</CardTitle>
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
        <ScrollArea className="h-72 pr-4">
          {isEditing ? (
            <>
              <Textarea
                value={editedRecommendation}
                onChange={(e) => setEditedRecommendation(e.target.value)}
                className="min-h-[200px]"
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
            <p className="text-sm">{recommendation}</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FinalRecommendation;
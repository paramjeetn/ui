import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusIndicator from '@/components/PatientComponents/StatusIndicator'; 
import { Button } from "@/components/ui/button";
import { Pencil, X, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface PatientTextProps {
  text: string;
  verified: boolean;
  lgtm: boolean;
  onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
  onReset: () => void;
  onTextChange: (newText: string) => void;
}

const PatientText: React.FC<PatientTextProps> = ({ text, verified, lgtm, onUpdate, onReset, onTextChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(text);
  };

  const handleSave = () => {
    setIsEditing(false);
    onTextChange(editedText);
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
        <CardTitle className="text-md font-semibold">Patient Text</CardTitle>
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
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          {isEditing ? (
            <>
              <Textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="min-h-[calc(100vh-250px)]"
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
            <p className="text-sm">{text}</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PatientText;
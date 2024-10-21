import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusIndicator from '@/components/PatientComponents/StatusIndicator';
import { Button } from "@/components/ui/button";
import { Pencil, X, Check } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import MDEditor from '@uiw/react-md-editor';

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
        <CardTitle className="text-xl font-semibold">Final Recommendation</CardTitle>
        <div className="flex items-center space-x-2 flex-grow mr-2 ml-2">
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
        {isEditing ? (
          <div data-color-mode="light">
            <MDEditor
              value={editedRecommendation}
              onChange={(value) => setEditedRecommendation(value || '')}
              preview="edit"
              className="text-sm small-text-editor"
              height={340}
              text-size={"text-sm"}
            />
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X size={16} className="mr-2" /> Cancel
              </Button>
              <Button variant="default" size="sm" onClick={handleSave}>
                <Check size={16} className="mr-2" /> Save
              </Button>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[320px] w-full rounded-md border p-4">
            <div className="prose text-sm dark:prose-invert max-w-none markdown-content">
              <ReactMarkdown
                components={{
                  h1: ({ ...props}) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                  h2: ({ ...props}) => <h2 className="text-xl font-semibold mt-3 mb-2" {...props} />,
                  h3: ({ ...props}) => <h3 className="text-lg font-medium mt-2 mb-1" {...props} />,
                  p: ({ ...props}) => <p className="mb-2" {...props} />,
                  ul: ({ ...props}) => <ul className="list-disc pl-5 mb-2" {...props} />,
                  ol: ({ ...props}) => <ol className="list-decimal pl-5 mb-2" {...props} />,
                  li: ({ ...props}) => <li className="mb-1" {...props} />,
                }}
              >
                {recommendation}
              </ReactMarkdown>
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default FinalRecommendation;
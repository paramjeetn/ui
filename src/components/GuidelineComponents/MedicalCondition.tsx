
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusIndicator from '@/components/GuidelineComponents/StatusIndicator';
import { Button } from "@/components/ui/button";
import { Pencil, X, Check, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";

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
  const [editedConditions, setEditedConditions] = useState(condition.replace(/^Medical Conditions:\s*/, '').split(',').filter(c => c.trim() !== ''));
  const [newCondition, setNewCondition] = useState('');


  const handleEdit = () => {
    setIsEditing(true);
  };


  const handleCancel = () => {
    setIsEditing(false);
    setEditedConditions(condition.replace(/^Medical Conditions:\s*/, '').split(',').filter(c => c.trim() !== ''));
  };

 const handleSave = () => {
    setIsEditing(false);
    onTextChange(`Medical Conditions: ${editedConditions.join(', ')}`);
  };


  const handleAddCondition = () => {
    if (newCondition.trim() !== '') {
      setEditedConditions([...editedConditions, newCondition.trim()]);
      setNewCondition('');
    }
  };

  const handleRemoveCondition = (index: number) => {
    const updatedConditions = editedConditions.filter((_, i) => i !== index);
    setEditedConditions(updatedConditions);
  };

  // const parseConditions = (conditionString: string) => {
  //   // Remove "Medical Conditions:" prefix if it exists
  //   const cleanedString = conditionString;
    
  //   // If there are no commas, return the whole string as a single condition
  //   if (!cleanedString.includes(',')) {
  //     return [cleanedString];
  //   }
    
  //   // Split by comma and trim each condition
  //   return cleanedString.split(',').map(cond => cond.trim()).filter(cond => cond !== '');
  // };

  // const conditionsList = parseConditions(condition);

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row mb-6 items-center justify-between py-2">
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
        <ScrollArea className="max-h-50 pr-4">
          <div className="flex flex-wrap gap-2">
            {editedConditions.map((condition, index) => (
              <Button
                key={index}
                variant="secondary"
                className="rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 font-bold flex items-center"
              >
                {condition.trim()}
                {isEditing && (
                  <Minus
                    size={16}
                    className="ml-2 text-red-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveCondition(index);
                    }}
                  />
                )}
              </Button>
            ))}
          </div>
          {isEditing && (
            <div className="mt-4 flex items-center">
              <Input
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                placeholder="Add new condition"
                className="flex-grow mr-2"
              />
              <Button variant="outline" size="sm" onClick={handleAddCondition}>
                <Plus size={16} className="mr-2" /> Add
              </Button>
            </div>
          )}
        </ScrollArea>
        {isEditing && (
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X size={16} className="mr-2" /> Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleSave}>
              <Check size={16} className="mr-2" /> Save
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


export default MedicalCondition;
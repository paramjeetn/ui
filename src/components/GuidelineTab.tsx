import React, { useState, useEffect } from 'react';
import { HelpCircle, ThumbsUp, ThumbsDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface GuidelineData {
  guideline_key: number;
  guideline_id: string;
  guideline_name: string;
  guideline_data: {
    guideline_text: string;
    guideline_medical_condition: string;
    guideline_criteria: string;
    guideline_pdf: string;
    guideline_text_verified: boolean;
    guideline_medical_condition_verified: boolean;
    guideline_criteria_verified: boolean;
    guideline_text_lgtm: boolean;
    guideline_medical_condition_lgtm: boolean;
    guideline_criteria_lgtm: boolean;
  };
  updated_by: string | null;
  timestamp: string;
}

interface GuidelineTabProps {
  selectedItem: string | null;
}

const GuidelineTab: React.FC<GuidelineTabProps> = ({ selectedItem }) => {
  const [guidelineData, setGuidelineData] = useState<GuidelineData | null>(null);

  useEffect(() => {
    if (selectedItem) {
      const fetchGuidelineData = async () => {
        try {
          const response = await fetch(`/api/get_guideline/${selectedItem}`);
          const data: GuidelineData = await response.json();
          setGuidelineData(data);
        } catch (error) {
          console.error('Error fetching guideline data:', error);
        }
      };
      fetchGuidelineData();
    }
  }, [selectedItem]);

  const StatusIndicator = ({ 
    verified, 
    lgtm, 
    onThumbsUp, 
    onThumbsDown 
  }: { 
    verified: boolean; 
    lgtm: boolean; 
    onThumbsUp: () => void; 
    onThumbsDown: () => void; 
  }) => (
    <div className="flex items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle size={16} className="text-gray-500" />
          </TooltipTrigger>
          <TooltipContent>
            {verified
              ? (lgtm ? "Looks Good" : "Doesn't Look Good")
              : "Unverified"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {(!verified || (verified && !lgtm)) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onThumbsUp}
          className="p-0"
        >
          <ThumbsUp size={16} className="text-green-500" />
        </Button>
      )}
      {(!verified || (verified && lgtm)) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onThumbsDown}
          className="p-0"
        >
          <ThumbsDown size={16} className="text-red-500" />
        </Button>
      )}
    </div>
  );

  const DataSection = ({ 
    title, 
    data, 
    verified, 
    lgtm, 
    onUpdate 
  }: { 
    title: string; 
    data: string; 
    verified: boolean; 
    lgtm: boolean; 
    onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
  }) => (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-2">
        <CardTitle className="text-md font-semibold">{title}</CardTitle>
        <StatusIndicator
          verified={verified}
          lgtm={lgtm}
          onThumbsUp={() => onUpdate(true, true)}
          onThumbsDown={() => onUpdate(true, false)}
        />
      </CardHeader>
      <CardContent>
        <p className="text-sm">{data}</p>
      </CardContent>
    </Card>
  );

  const handleUpdate = (field: string) => (newVerified: boolean, newLgtm: boolean) => {
    if (guidelineData) {
      setGuidelineData({
        ...guidelineData,
        guideline_data: {
          ...guidelineData.guideline_data,
          [`${field}_verified`]: newVerified,
          [`${field}_lgtm`]: newLgtm,
        },
      });
      // Here you would typically send an API request to update the backend
      console.log(`Updating ${field}:`, { verified: newVerified, lgtm: newLgtm });
    }
  };

  return (
    <div className="p-4">
      {guidelineData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Guideline Data</h2>
            <DataSection
              title="Guideline Text"
              data={guidelineData.guideline_data.guideline_text}
              verified={guidelineData.guideline_data.guideline_text_verified}
              lgtm={guidelineData.guideline_data.guideline_text_lgtm}
              onUpdate={handleUpdate('guideline_text')}
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold">Medical Information</h2>
            <DataSection
              title="Medical Condition"
              data={guidelineData.guideline_data.guideline_medical_condition}
              verified={guidelineData.guideline_data.guideline_medical_condition_verified}
              lgtm={guidelineData.guideline_data.guideline_medical_condition_lgtm}
              onUpdate={handleUpdate('guideline_medical_condition')}
            />
            <DataSection
              title="Guideline Criteria"
              data={guidelineData.guideline_data.guideline_criteria}
              verified={guidelineData.guideline_data.guideline_criteria_verified}
              lgtm={guidelineData.guideline_data.guideline_criteria_lgtm}
              onUpdate={handleUpdate('guideline_criteria')}
            />
            <Card className="mb-4">
              <CardHeader className="flex flex-row items-center justify-between py-2">
                <CardTitle className="text-md font-semibold">Guideline PDF</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(guidelineData.guideline_data.guideline_pdf, '_blank')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View PDF
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      )}
    </div>
  );
};

export default GuidelineTab;
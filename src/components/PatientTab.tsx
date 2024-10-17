import React, { useState, useEffect } from 'react';
import { HelpCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PatientData {
  patient_key: number;
  patient_id: string;
  patient_name: string;
  patient_data: {
    patient_text: string;
    medical_condition: string;
    final_recommendation: string;
    retrieved_docs: string;
    patient_text_verified: boolean;
    medical_condition_verified: boolean;
    final_recommendation_verified: boolean;
    retrieved_docs_verified: boolean;
    patient_text_lgtm: boolean;
    medical_condition_lgtm: boolean;
    final_recommendation_lgtm: boolean;
    retrieved_docs_lgtm: boolean;
  };
  updated_by: string | null;
  timestamp: string;
}

interface PatientTabProps {
  selectedItem: string | null;
}

const PatientTab: React.FC<PatientTabProps> = ({ selectedItem }) => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  useEffect(() => {
    if (selectedItem) {
      const fetchPatientData = async () => {
        try {
          const response = await fetch(`/api/get_patient/${selectedItem}`);
          const data: PatientData = await response.json();
          setPatientData(data);
        } catch (error) {
          console.error('Error fetching patient data:', error);
        }
      };
      fetchPatientData();
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
    if (patientData) {
      setPatientData({
        ...patientData,
        patient_data: {
          ...patientData.patient_data,
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
      {patientData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Patient Data</h2>
            <DataSection
              title="Patient Text"
              data={patientData.patient_data.patient_text}
              verified={patientData.patient_data.patient_text_verified}
              lgtm={patientData.patient_data.patient_text_lgtm}
              onUpdate={handleUpdate('patient_text')}
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold">Medical Information</h2>
            <DataSection
              title="Medical Condition"
              data={patientData.patient_data.medical_condition}
              verified={patientData.patient_data.medical_condition_verified}
              lgtm={patientData.patient_data.medical_condition_lgtm}
              onUpdate={handleUpdate('medical_condition')}
            />
            <DataSection
              title="Final Recommendation"
              data={patientData.patient_data.final_recommendation}
              verified={patientData.patient_data.final_recommendation_verified}
              lgtm={patientData.patient_data.final_recommendation_lgtm}
              onUpdate={handleUpdate('final_recommendation')}
            />
            <DataSection
              title="Retrieved Docs"
              data={patientData.patient_data.retrieved_docs}
              verified={patientData.patient_data.retrieved_docs_verified}
              lgtm={patientData.patient_data.retrieved_docs_lgtm}
              onUpdate={handleUpdate('retrieved_docs')}
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default PatientTab;
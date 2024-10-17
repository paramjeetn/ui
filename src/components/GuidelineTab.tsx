import React, { useState, useEffect } from 'react';
import GuidelineText from '@/components/GuidelineComponents/GuidelineText';
import MedicalCondition from '@/components/GuidelineComponents/MedicalCondition';
import GuidelineCriteria from '@/components/GuidelineComponents/GuidelineCriteria';
import GuidelinePDF from '@/components/GuidelineComponents/GuidelinePDF';


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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedItem) {
      setLoading(true);
      setError(null);
      const fetchGuidelineData = async () => {
        try {
          const response = await fetch(`/api/get_guideline/${selectedItem}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: GuidelineData = await response.json();
          console.log("Fetched data:", data);
          setGuidelineData(data);
        } catch (error) {
          console.error('Error fetching guideline data:', error);
          setError('Failed to fetch guideline data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      fetchGuidelineData();
    }
  }, [selectedItem]);

  const handleUpdate = (field: string, newVerified: boolean, newLgtm: boolean) => {
    if (guidelineData) {
      setGuidelineData({
        ...guidelineData,
        [`${field}_verified`]: newVerified,
        [`${field}_lgtm`]: newLgtm,
      });
      console.log(`Updating ${field}:`, { verified: newVerified, lgtm: newLgtm });
    }
  };

  console.log("Rendering GuidelineTab. guidelineData:", guidelineData);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!guidelineData) return <div>No guideline data available.</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="space-y-4">
          <GuidelineText
            text={guidelineData.guideline_data.guideline_text}
            verified={guidelineData.guideline_data.guideline_text_verified}
            lgtm={guidelineData.guideline_data.guideline_text_lgtm}
            onUpdate={(newVerified, newLgtm) => handleUpdate('guideline_text', newVerified, newLgtm)}
          />
        </section>
        <section className="space-y-4">
          <MedicalCondition
            condition={guidelineData.guideline_data.guideline_medical_condition}
            verified={guidelineData.guideline_data.guideline_medical_condition_verified}
            lgtm={guidelineData.guideline_data.guideline_medical_condition_lgtm}
            onUpdate={(newVerified, newLgtm) => handleUpdate('guideline_medical_condition', newVerified, newLgtm)}
          />
          <GuidelineCriteria
            criteria={guidelineData.guideline_data.guideline_criteria}
            verified={guidelineData.guideline_data.guideline_criteria_verified}
            lgtm={guidelineData.guideline_data.guideline_criteria_lgtm}
            onUpdate={(newVerified, newLgtm) => handleUpdate('guideline_criteria', newVerified, newLgtm)}
          />
          <GuidelinePDF pdfUrl={guidelineData.guideline_data.guideline_pdf} />
        </section>
      </div>
    </div>
  );
};

export default GuidelineTab;
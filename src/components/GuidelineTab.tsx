import React, { useState, useEffect } from 'react';
import { GuidelineData } from '@/components/types'; // Adjust the import path as necessary

interface GuidelineTabProps {
  selectedItem: string | null;
}

const GuidelineTab: React.FC<GuidelineTabProps> = ({ selectedItem }) => {
  const [guidelineData, setGuidelineData] = useState<GuidelineData | null>(null);

  useEffect(() => {
    if (selectedItem) {
      const guidelineId = selectedItem;
      const fetchGuidelineData = async () => {
        try {
          const response = await fetch(`/api/get_guideline/${guidelineId}`);
          const data: GuidelineData = await response.json();
          setGuidelineData(data);
        } catch (error) {
          console.error('Error fetching guideline data:', error);
        }
      };
      fetchGuidelineData();
    }
  }, [selectedItem]);


  return (
    <div>
      {guidelineData && (
        <div className="mt-4">
          <h2>Guideline Information</h2>
          <ul>
            <li><strong>Guideline ID:</strong> {guidelineData.guideline_id}</li>
            <li><strong>Guideline Name:</strong> {guidelineData.guideline_name}</li>
          </ul>

          <h2>Guideline Data</h2>
          <ul>
            <li><strong>Guideline Text:</strong> {guidelineData.guideline_data.guideline_text}</li>
            <li><strong>Guideline Medical Condition:</strong> {guidelineData.guideline_data.guideline_medical_condition}</li>
            <li><strong>Guideline Criteria:</strong> {guidelineData.guideline_data.guideline_criteria}</li>
            <li><strong>Guideline PDF:</strong> {guidelineData.guideline_data.guideline_pdf}</li>
          </ul>

          <h2>Verification Status</h2>
          <ul>
            <li><strong>Guideline Text Verified:</strong> {guidelineData.guideline_data.guideline_text_verified ? 'Yes' : 'No'}</li>
            <li><strong>Guideline Medical Condition Verified:</strong> {guidelineData.guideline_data.guideline_medical_condition_verified ? 'Yes' : 'No'}</li>
            <li><strong>Guideline Criteria Verified:</strong> {guidelineData.guideline_data.guideline_criteria_verified ? 'Yes' : 'No'}</li>
          </ul>

          <h2>LGTMs</h2>
          <ul>
            <li><strong>Guideline Text LGTM:</strong> {guidelineData.guideline_data.guideline_text_lgtm ? 'Yes' : 'No'}</li>
            <li><strong>Guideline Medical Condition LGTM:</strong> {guidelineData.guideline_data.guideline_medical_condition_lgtm ? 'Yes' : 'No'}</li>
            <li><strong>Guideline Criteria LGTM:</strong> {guidelineData.guideline_data.guideline_criteria_lgtm ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GuidelineTab;
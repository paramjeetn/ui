import React, { useState, useEffect } from 'react';
import { PatientData } from '@/components/types'; // Adjust the import path as necessary

interface PatientTabProps {
  selectedItem: string | null;
}

const PatientTab: React.FC<PatientTabProps> = ({ selectedItem }) => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  useEffect(() => {
    if (selectedItem) {
      const patientId = selectedItem;
      const fetchPatientData = async () => {
        try {
          const response = await fetch(`/api/get_patient/${patientId}`);
          const data: PatientData = await response.json();
          setPatientData(data);
        } catch (error) {
          console.error('Error fetching patient data:', error);
        }
      };
      fetchPatientData();
    }
  }, [selectedItem]);

  return (
    <div>
      {patientData && (
        <div className="mt-4">
          <h2>Patient Information</h2>
          <ul>
            <li><strong>Patient ID:</strong> {patientData.patient_id}</li>
            <li><strong>Patient Name:</strong> {patientData.patient_name}</li>
          </ul>

          <h2>Patient Data</h2>
          <ul>
            <li><strong>Patient Text:</strong> {patientData.patient_data.patient_text}</li>
            <li><strong>Medical Condition:</strong> {patientData.patient_data.medical_condition}</li>
            <li><strong>Final Recommendation:</strong> {patientData.patient_data.final_recommendation}</li>
            <li><strong>Retrieved Docs:</strong> {patientData.patient_data.retrieved_docs}</li>
          </ul>

          <h2>Verification Status</h2>
          <ul>
            <li><strong>Patient Text Verified:</strong> {patientData.patient_data.patient_text_verified ? 'Yes' : 'No'}</li>
            <li><strong>Medical Condition Verified:</strong> {patientData.patient_data.medical_condition_verified ? 'Yes' : 'No'}</li>
            <li><strong>Final Recommendation Verified:</strong> {patientData.patient_data.final_recommendation_verified ? 'Yes' : 'No'}</li>
            <li><strong>Retrieved Docs Verified:</strong> {patientData.patient_data.retrieved_docs_verified ? 'Yes' : 'No'}</li>
          </ul>

          <h2>LGTMs</h2>
          <ul>
            <li><strong>Patient Text LGTM:</strong> {patientData.patient_data.patient_text_lgtm ? 'Yes' : 'No'}</li>
            <li><strong>Medical Condition LGTM:</strong> {patientData.patient_data.medical_condition_lgtm ? 'Yes' : 'No'}</li>
            <li><strong >Final Recommendation LGTM:</strong> {patientData.patient_data.final_recommendation_lgtm ? 'Yes' : 'No'}</li>
            <li><strong>Retrieved Docs LGTM:</strong> {patientData.patient_data.retrieved_docs_lgtm ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientTab;


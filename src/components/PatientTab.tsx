import React from 'react';

interface PatientTabProps {
  selectedItem: string | null;
}

const PatientTab: React.FC<PatientTabProps> = ({ selectedItem }) => {
  return (
    <div>
      {selectedItem && (
        <div className="mt-4">
          <p>Selected Patient: {selectedItem}</p>
        </div>
      )}
    </div>
  );
};

export default PatientTab;
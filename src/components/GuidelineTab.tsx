import React from 'react';

interface GuidelineTabProps {
  selectedItem: string | null;
}

const GuidelineTab: React.FC<GuidelineTabProps> = ({ selectedItem }) => {
  return (
    <div>
      {selectedItem && (
        <div className="mt-4">
          <p>Selected Guideline: {selectedItem}</p>
        </div>
      )}
    </div>
  );
};

export default GuidelineTab;
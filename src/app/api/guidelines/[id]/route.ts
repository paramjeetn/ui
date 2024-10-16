import { NextResponse } from 'next/server'

interface GuidelineData {
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
}

interface Guideline {
  guideline_key: number;
  guideline_id: string;
  guideline_data: GuidelineData;
  updated_by: null | string;
  timestamp: string;
}

type GuidelineRecord = Record<string, Guideline>;

const mockGuidelineData: GuidelineRecord = {
  "6cfd94044eb9dc4af51df1c0ad6978ebae6a5f09d05df97dc898a9e8b608af36": {
    guideline_key: 1,
    guideline_id: "6cfd94044eb9dc4af51df1c0ad6978ebae6a5f09d05df97dc898a9e8b608af36",
    guideline_data: {
      guideline_text: "RECOMMENDATION 35\nA multimodality treatment approach to patients with thyroid storm should be used, including b-adrenergic blockade, ATD therapy, inorganic iodide, corticosteroid therapy,\ncooling with acetaminophen and cooling blankets, volume\nresuscitation, nutritional support, and respiratory care and\nmonitoring in an intensive care unit, as appropriate for an\nindividual patient.\nStrong recommendation, low-quality evidence.\n...",
      guideline_medical_condition: "Thyroid storm,Thyrotoxicosis",
      guideline_criteria: "### Criteria for Recommendation 35\n\n#### 1. Key Clinical Parameters:\n- **Thyroid storm identification**: \n  - Use the Burch-Wartofsky Point Scale (BWPS) where a point total of:\n    - ≥45 indicates thyroid storm.\n    - 25–44 indicates impending thyroid storm.\n    - <25 makes thyroid storm unlikely.\n  - For the Japanese Thyroid Association (JTA) system:\n    - Patients may be categorized as TS1 or TS2.\n\n...",
      guideline_pdf: "https://firebasestorage.googleapis.com/v0/b/copilot-dashboard-99ed0.appspot.com/o/Thyroid%2FAmerican_Thyroid_Assoc_Hyperthyroid_guidelines_2016.pdf?alt=media&token=ff0f932e-a4fa-4ffe-9af5-23c98e166215",
      guideline_text_verified: false,
      guideline_medical_condition_verified: false,
      guideline_criteria_verified: false,
      guideline_text_lgtm: false,
      guideline_medical_condition_lgtm: false,
      guideline_criteria_lgtm: false
    },
    updated_by: null,
    timestamp: "2024-10-12 16:53:23.221233"
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  // Simulate a delay to mimic a real API call
  await new Promise(resolve => setTimeout(resolve, 300));

  if (id in mockGuidelineData) {
    return NextResponse.json(mockGuidelineData[id]);
  } else {
    return new NextResponse('Guideline not found', { status: 404 });
  }
}
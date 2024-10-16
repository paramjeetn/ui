import { NextResponse } from 'next/server';

interface PatientData {
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
}

interface Patient {
  patient_key: number;
  patient_id: string;
  patient_data: PatientData;
  updated_by: null | string;
  timestamp: string;
}

type PatientRecord = Record<string, Patient>;

const mockPatientData: PatientRecord = {
  "d59fe1bd-17c6-4645-b383-d62bbe26dde8": {
    patient_key: 1,
    patient_id: "d59fe1bd-17c6-4645-b383-d62bbe26dde8",
    patient_data: {
      patient_text: JSON.stringify({
        patient_id: "d59fe1bd-17c6-4645-b383-d62bbe26dde8",
        patient_name: "Daniel Walker",
        age: "55",
        gender: "Male",
        current_symptoms: "Hyperpyrexia, Tachycardia, Agitation, Nausea, Vomiting, Diarrhea, Mild Hepatic dysfunction",
        current_medications: "Levothyroxine 100 mcg daily, Metoprolol 50 mg twice daily",
        patient_risk_factors: "History of Graves' disease, recent cessation of antithyroid drugs, underwent a minor nonthyroidal surgery 2 weeks ago",
        lab_reports: "TSH: <0.01 µIU/mL (Low), Free T4: 4.5 ng/dL (High), Free T3: 2.5 ng/mL (High), ALT: 120 U/L (Elevated), AST: 95 U/L (Elevated)",
        diagnostic_tests_and_results: "Burch-Wartofsky Point Scale: 50 (Indicates thyroid storm), Ultrasound of the Thyroid: Diffuse enlargement with increased vascularity",
        profile_summary: "Daniel Walker, a 55-year-old male with a significant history of Graves' disease. Recently experienced a thyroid storm precipitated by abrupt cessation of antithyroid drugs and recent minor surgery. Currently exhibiting classic symptoms of thyroid storm and significant laboratory abnormalities indicating severe thyrotoxicosis and hepatic dysfunction."
      }),
      medical_condition: "Thyroid storm, Graves' disease, Severe thyrotoxicosis, Hepatic dysfunction",
      final_recommendation: "### Diagnostics Required\n\nNo further diagnostics are explicitly required based on the provided guidelines.\n...",
      retrieved_docs: JSON.stringify([
        {
          "item": {
            "id": "./data/guidelines/thyroid/extracted_guidelines/hyperthyroidism_and_thyrotoxicosis/sub_guidelines/recommendation_031/guidelines_medical_conditions.txt",
            "document": "Graves' disease,Thyroidectomy,Thyroid hormone levels,Thyroid dysfunction",
            "embeddings": null,
            "meta": {
              "guideline": "RECOMMENDATION 31\nFollowing thyroidectomy for GD, L-thyroxine should be started at a daily dose appropriate for the patient's weight..."
            }
          },
          "score": 0.396961093144914
        }
        // ... other retrieved docs
      ]),
      patient_text_verified: false,
      medical_condition_verified: false,
      final_recommendation_verified: false,
      retrieved_docs_verified: false,
      patient_text_lgtm: false,
      medical_condition_lgtm: false,
      final_recommendation_lgtm: false,
      retrieved_docs_lgtm: false
    },
    updated_by: null,
    timestamp: "2024-10-12 16:32:27.517129"
  }
};


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const id = params.id;
    
    // Simulate a delay to mimic a real API call
    await new Promise(resolve => setTimeout(resolve, 300));
  
    if (id in mockPatientData) {
      return NextResponse.json(mockPatientData[id]);
    } else {
      return new NextResponse('Patient not found', { status: 404 });
    }
  }
  

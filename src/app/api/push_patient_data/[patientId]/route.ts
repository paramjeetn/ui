import { NextResponse } from 'next/server';

export async function POST(request: Request, context: any) {
  const { params } = context;
  const patientId = params.patientId;

  try {
    // Parse the incoming request body
    const requestBody = await request.json();
    console.log(requestBody)
    // Construct the URL with the patient ID
    const url = `https://paramjeetpradhan00-copilot.cloud.dbos.dev/api/v1/push_patient_data/${patientId}`;

    // Make the POST request to the external API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      body: JSON.stringify({
        patient_name: requestBody.patient_name,
        patient_text: requestBody.patient_text,
        medical_condition: requestBody.medical_condition,
        final_recommendation: requestBody.final_recommendation,
        retrieved_docs: requestBody.retrieved_docs,
        patient_text_verified: requestBody.patient_text_verified,
        medical_condition_verified: requestBody.medical_condition_verified,
        final_recommendation_verified: requestBody.final_recommendation_verified,
        retrieved_docs_verified: requestBody.retrieved_docs_verified,
        patient_text_lgtm: requestBody.patient_text_lgtm,
        medical_condition_lgtm: requestBody.medical_condition_lgtm,
        final_recommendation_lgtm: requestBody.final_recommendation_lgtm,
        retrieved_docs_lgtm: requestBody.retrieved_docs_lgtm,
        updated_by: requestBody.updated_by
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error pushing patient data:', error);
    return NextResponse.json({ error: 'Failed to push patient data' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';

export async function POST(request: Request, context: any) {
  const { params } = context;
  const guidelineId = params.guidelineId

  try {
    // Parse the incoming request body
    const requestBody = await request.json();
    // Construct the URL with the guideline ID
    const url = `https://paramjeetpradhan00-copilot.cloud.dbos.dev/api/v1/push_guideline_data/${guidelineId}`;

    // Make the POST request to the external API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      body: JSON.stringify({ 
        guideline_name: requestBody.guideline_name,
            guideline_text: requestBody.guideline_text,
            guideline_medical_condition: requestBody.guideline_medical_condition,
            guideline_criteria: requestBody.guideline_criteria,
            guideline_pdf: requestBody.guideline_pdf,
            guideline_text_verified: requestBody.guideline_text_verified,
            guideline_medical_condition_verified: requestBody.guideline_medical_condition_verified,
            guideline_criteria_verified: requestBody.guideline_criteria_verified,
            guideline_text_lgtm: requestBody.guideline_text_lgtm,
            guideline_medical_condition_lgtm: requestBody.guideline_medical_condition_lgtm,
            guideline_criteria_lgtm: requestBody.guideline_criteria_lgtm,
            updated_by : requestBody.updated_by,
            }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error pushing guideline data:', error);
    return NextResponse.json({ error: 'Failed to push guideline data' }, { status: 500 });
  }
}
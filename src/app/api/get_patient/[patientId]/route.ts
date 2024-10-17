import { NextResponse } from 'next/server';

export async function GET(request: Request, context:any) {
  const {params} = context;
  const patientId = params.patientId
  const response = await fetch(`https://paramjeetpradhan00-copilot.cloud.dbos.dev/api/v1/patients/${patientId}`, {
    method: 'GET',
    cache:"no-cache"
  });
  const data = await response.json();
  console.log("from api ", data.patient_data.patient_text_verified);
  console.log("from api ", data.patient_data.patient_text_lgtm);
  
  return NextResponse.json(data);
}

// https://paramjeetpradhan00-copilot.cloud.dbos.dev/api/v1/patients/0034b77e-4dd0-4788-8537-6285097c373c

import { NextResponse } from 'next/server';

export async function GET(request: Request, context:any) {
  const {params} = context;
  const patientId = params.patientId
  const response = await fetch(`https://paramjeetpradhan00-copilot.cloud.dbos.dev/api/v1/patients/${patientId}`, {
    method: 'GET',
    // Add any headers if needed
  });
  const data = await response.json();
  return NextResponse.json(data);
}



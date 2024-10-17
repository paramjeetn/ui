import { NextResponse } from 'next/server';

export async function GET(request: Request, context:any) {
  const {params} = context;
  const guidelineId = params.guidelineId
  const response = await fetch(`https://paramjeetpradhan00-copilot.cloud.dbos.dev/api/v1/guidelines/${guidelineId}`, {
   method: 'GET',
    cache:"no-cache"
  });
  const data = await response.json();

  return NextResponse.json(data);
}


// const url = `https://paramjeetpradhan00-copilot.cloud.dbos.dev/api/v1/guidelines/${guidelineId}`;

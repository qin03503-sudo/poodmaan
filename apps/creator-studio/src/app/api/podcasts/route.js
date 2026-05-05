import { NextResponse } from 'next/server';
import { createPodcast, getPodcasts } from '@poodmaan/bff';

export async function GET() {
  try {
    return NextResponse.json(await getPodcasts());
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    return NextResponse.json(await createPodcast(await req.json()), { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

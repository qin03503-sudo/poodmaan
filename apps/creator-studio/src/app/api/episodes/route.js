import { NextResponse } from 'next/server';
import { createEpisode } from '@poodmaan/bff';

export async function POST(req) {
  try {
    return NextResponse.json(await createEpisode(await req.json()), { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

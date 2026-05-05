import { NextResponse } from 'next/server';
import { getEpisodes } from '@poodmaan/bff';

export async function GET(req, { params }) {
  try {
    const { podcastId } = await params;
    return NextResponse.json(await getEpisodes(podcastId));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

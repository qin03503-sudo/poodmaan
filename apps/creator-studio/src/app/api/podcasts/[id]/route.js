import { NextResponse } from 'next/server';
import { deletePodcast, getPodcastById, updatePodcast } from '@poodmaan/bff';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const podcast = await getPodcastById(id);
    if (!podcast) return NextResponse.json({ error: 'Podcast not found' }, { status: 404 });
    return NextResponse.json(podcast);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const podcast = await updatePodcast(id, await req.json());
    if (!podcast) return NextResponse.json({ error: 'Podcast not found' }, { status: 404 });
    return NextResponse.json(podcast);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const success = await deletePodcast(id);
    if (!success) return NextResponse.json({ error: 'Podcast not found' }, { status: 404 });
    return NextResponse.json({ message: 'Podcast deleted' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

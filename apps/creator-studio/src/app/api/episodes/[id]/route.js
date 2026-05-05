import { NextResponse } from 'next/server';
import { deleteEpisode, getEpisodeById, updateEpisode } from '@poodmaan/bff';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const episode = await getEpisodeById(id);
    if (!episode) return NextResponse.json({ error: 'Episode not found' }, { status: 404 });
    return NextResponse.json(episode);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const episode = await updateEpisode(id, await req.json());
    if (!episode) return NextResponse.json({ error: 'Episode not found' }, { status: 404 });
    return NextResponse.json(episode);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const success = await deleteEpisode(id);
    if (!success) return NextResponse.json({ error: 'Episode not found' }, { status: 404 });
    return NextResponse.json({ message: 'Episode deleted' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

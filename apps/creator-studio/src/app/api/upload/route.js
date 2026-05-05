import { NextResponse } from 'next/server';
import { uploadObject } from '@poodmaan/bff';

export async function POST(req) {
  try {
    const file = (await req.formData()).get('file');
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    return NextResponse.json(await uploadObject(file));
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

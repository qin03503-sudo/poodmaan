import { NextResponse } from 'next/server';
import { ensureInitialized } from '@poodmaan/bff';

export async function GET() {
  try {
    await ensureInitialized();
    return NextResponse.json({ status: 'ok', timestamp: new Date() });
  } catch (err) {
    return NextResponse.json({ status: 'error', error: err.message }, { status: 500 });
  }
}

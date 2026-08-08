import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'cms.json');

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json({ error: 'CMS file not found' }, { status: 404 });
    }
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(content);
    return NextResponse.json(data);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to read CMS data';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // 1. Cybersecurity Authentication Verification
    const authHeader = request.headers.get('x-admin-passcode');
    const cookieHeader = request.headers.get('cookie') || '';
    const isAuthenticated = authHeader === 'drixel2026' || cookieHeader.includes('drixel_admin_session=authenticated');

    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized: Security Access Control Denied' }, { status: 401 });
    }

    const body = await request.json();

    // 2. Validate JSON payload structure
    if (!body || typeof body !== 'object' || !body.hero || !body.about) {
      return NextResponse.json({ error: 'Security Violation: Malformed JSON payload' }, { status: 400 });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(body, null, 2), 'utf8');
    return NextResponse.json({ success: true, message: 'CMS content securely updated' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to write CMS data';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB Limit

export async function POST(request: Request) {
  try {
    // 1. Verify Admin Session/Token Header
    const authHeader = request.headers.get('x-admin-passcode');
    const cookieHeader = request.headers.get('cookie') || '';
    const isAuthenticated = authHeader === 'drixel2026' || cookieHeader.includes('drixel_admin_session=authenticated');

    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized: Security Access Control Denied' }, { status: 401 });
    }

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 2. File Size Enforcement
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Security Violation: File size exceeds maximum allowed limit (5 MB)' }, { status: 400 });
    }

    // 3. File Extension Whitelist Validation
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: `Security Violation: File type '${ext}' is not permitted.` }, { status: 400 });
    }

    // 4. Path Traversal & Filename Sanitization
    const sanitizeName = path.basename(file.name).replace(/[^a-zA-Z0-9.-]/g, '_');
    const safeFilename = `${Date.now()}-${sanitizeName}`;
    const filePath = path.join(UPLOAD_DIR, safeFilename);

    // Prevent directory breakout
    if (!filePath.startsWith(UPLOAD_DIR)) {
      return NextResponse.json({ error: 'Security Violation: Path traversal blocked' }, { status: 403 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${safeFilename}`;
    return NextResponse.json({ success: true, url: publicUrl, filename: safeFilename });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(UPLOAD_DIR)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(UPLOAD_DIR);
    const fileDetails = files.map((filename) => {
      const stats = fs.statSync(path.join(UPLOAD_DIR, filename));
      return {
        filename,
        url: `/uploads/${filename}`,
        size: `${(stats.size / 1024).toFixed(1)} KB`,
        uploadedAt: stats.mtime.toLocaleDateString(),
      };
    });

    return NextResponse.json(fileDetails);
  } catch {
    return NextResponse.json([]);
  }
}

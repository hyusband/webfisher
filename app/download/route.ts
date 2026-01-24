import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const downloadDir = path.join(process.cwd(), 'public', 'download');
  
  try {
    if (!fs.existsSync(downloadDir)) {
       return new NextResponse('Download directory not found', { status: 404 });
    }
    const files = fs.readdirSync(downloadDir);
    // Find .exe or .msi file
    const file = files.find(f => !f.startsWith('.') && (f.endsWith('.exe') || f.endsWith('.msi')));
    
    if (file) {
       const url = new URL(request.url);
       // Redirect to the static file served from public/download
       const redirectUrl = new URL(`/download/${file}`, url.origin);
       return NextResponse.redirect(redirectUrl);
    } else {
      return new NextResponse('File not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error finding download file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const envCheck = {
      MONGODB_URI: process.env.MONGODB_URI ? 'Mevcut' : 'Eksik',
      MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'agac_donations',
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'Mevcut' : 'Eksik',
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV
    };

    return NextResponse.json({
      success: true,
      message: 'Environment variables kontrol edildi',
      environment: envCheck,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Test endpoint hatası',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}

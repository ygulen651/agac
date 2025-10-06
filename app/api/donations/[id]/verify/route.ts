import { NextRequest, NextResponse } from 'next/server';
import { updateDonationStatus } from '@/lib/database';

// POST - Bağışı havale ile doğrula
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const {
      transferReference,
      transferDate,
      verifiedBy,
      verificationNotes,
      bankStatement,
    } = body;

    // Gerekli alanları kontrol et
    if (!transferReference || !transferDate || !verifiedBy) {
      return NextResponse.json(
        { success: false, error: 'Havale referansı, tarihi ve doğrulayan kişi bilgisi gereklidir' },
        { status: 400 }
      );
    }

    // Bağış durumunu güncelle
    const updatedDonation = updateDonationStatus(id, 'completed', {
      transferReference,
      transferDate,
      verifiedBy,
      verificationNotes,
      bankStatement,
    });

    if (!updatedDonation) {
      return NextResponse.json(
        { success: false, error: 'Bağış bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedDonation,
      message: 'Bağış havale ile doğrulandı',
    });
  } catch (error) {
    console.error('Havale doğrulama hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Havale doğrulanamadı' },
      { status: 500 }
    );
  }
}


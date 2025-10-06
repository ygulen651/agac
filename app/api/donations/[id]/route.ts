import { NextRequest, NextResponse } from 'next/server';
import { updateDonationStatus, getAllDonations } from '@/lib/database';

// PUT - Bağış durumunu güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['pending', 'completed', 'verified'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz durum' },
        { status: 400 }
      );
    }

    const updatedDonation = updateDonationStatus(id, status);

    if (!updatedDonation) {
      return NextResponse.json(
        { success: false, error: 'Bağış bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedDonation,
      message: 'Bağış durumu güncellendi',
    });
  } catch (error) {
    console.error('Bağış güncelleme hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Bağış güncellenemedi' },
      { status: 500 }
    );
  }
}

// GET - Tekil bağış detayı
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const donations = getAllDonations();
    const donation = donations.find(d => d.id === id);

    if (!donation) {
      return NextResponse.json(
        { success: false, error: 'Bağış bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: donation,
    });
  } catch (error) {
    console.error('Bağış detay hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Bağış detayları alınamadı' },
      { status: 500 }
    );
  }
}

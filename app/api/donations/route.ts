import { NextRequest, NextResponse } from 'next/server';
import { getDonationsCollection } from '@/lib/mongodb';

export async function GET() {
  try {
    const donationsCollection = await getDonationsCollection();
    
    // Sadece onaylanmış bağışları döndür ve hassas bilgileri gizle
    const donations = await donationsCollection
      .find({ status: 'verified' })
      .sort({ createdAt: -1 }) // En yeni bağışlar önce
      .limit(20) // Son 20 bağışı göster
      .toArray();

           const publicDonations = donations.map((donation: any) => ({
      id: donation._id.toString(),
      donorName: donation.donorName,
      amount: donation.amount,
      saplingCount: donation.saplingCount,
      createdAt: donation.createdAt,
      // E-posta ve IBAN gibi hassas bilgileri gizle
    }));

    const totalCount = await donationsCollection.countDocuments({ status: 'verified' });

    return NextResponse.json({
      success: true,
      donations: publicDonations,
      totalCount
    });
  } catch (error) {
    console.error('Bağış verileri okuma hatası:', error);
    return NextResponse.json({
      success: false,
      error: 'Bağış verileri okunamadı',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donorName, donorEmail, amount, saplingCount, iban } = body;

    // Validasyon
    if (!donorName || !donorEmail || !amount || !saplingCount) {
      return NextResponse.json({
        success: false,
        error: 'Gerekli alanlar eksik'
      }, { status: 400 });
    }

    const donationsCollection = await getDonationsCollection();

    // Yeni bağış objesi oluştur
    const newDonation = {
      donorName,
      donorEmail,
      amount: parseFloat(amount),
      saplingCount: parseInt(saplingCount),
      iban,
      status: 'verified', // Otomatik onaylanmış
      certificateSent: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      verifiedBy: 'Otomatik Sistem',
      verificationNotes: 'Bağış otomatik olarak onaylandı'
    };

    // MongoDB'ye kaydet
    const result = await donationsCollection.insertOne(newDonation);

    return NextResponse.json({
      success: true,
      donation: {
        id: result.insertedId.toString(),
        ...newDonation
      }
    });
  } catch (error) {
    console.error('Bağış kaydetme hatası:', error);
    return NextResponse.json({
      success: false,
      error: 'Bağış kaydedilemedi',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}
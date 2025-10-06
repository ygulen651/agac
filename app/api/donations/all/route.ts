import { NextResponse } from 'next/server';
import { getDonationsCollection } from '@/lib/mongodb';

export async function GET() {
  try {
    const donationsCollection = await getDonationsCollection();
    
    // Tüm bağışları döndür (admin için hassas bilgiler dahil)
    const donations = await donationsCollection
      .find({})
      .sort({ createdAt: -1 }) // En yeni bağışlar önce
      .toArray();

    const allDonations = donations.map((donation: any) => ({
      id: donation._id.toString(),
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      amount: donation.amount,
      saplingCount: donation.saplingCount,
      iban: donation.iban,
      status: donation.status,
      certificateSent: donation.certificateSent,
      createdAt: donation.createdAt,
      updatedAt: donation.updatedAt,
      verifiedBy: donation.verifiedBy,
      verificationNotes: donation.verificationNotes
    }));

    const totalCount = await donationsCollection.countDocuments({});

    return NextResponse.json({
      success: true,
      donations: allDonations,
      totalCount
    });
  } catch (error) {
    console.error('Tüm bağış verileri okuma hatası:', error);
    return NextResponse.json({
      success: false,
      error: 'Bağış verileri okunamadı'
    }, { status: 500 });
  }
}

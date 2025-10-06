import { NextRequest, NextResponse } from 'next/server';
import { getAllDonations, updateDonationStatus } from '@/lib/database';
import { CertificateGenerator } from '@/lib/certificate-generator';

// POST - Sertifika gönder
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donationId } = body;

    if (!donationId) {
      return NextResponse.json(
        { success: false, error: 'Bağış ID gerekli' },
        { status: 400 }
      );
    }

    // Bağışı bul
    const donations = getAllDonations();
    const donation = donations.find(d => d.id === donationId);

    if (!donation) {
      return NextResponse.json(
        { success: false, error: 'Bağış bulunamadı' },
        { status: 404 }
      );
    }

    // Sertifika verilerini hazırla
    const certificateData = CertificateGenerator.prepareCertificateData(donation);
    
    // E-posta içeriğini oluştur
    const emailContent = CertificateGenerator.generateEmailContent(certificateData);

    // E-posta gönder (şimdilik mock)
    const emailSent = await sendEmail({
      to: donation.donorEmail,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    if (!emailSent) {
      return NextResponse.json(
        { success: false, error: 'E-posta gönderilemedi' },
        { status: 500 }
      );
    }

    // Bağış durumunu güncelle
    updateDonationStatus(donationId, 'verified', {
      verifiedBy: 'Sertifika Sistemi',
      verificationNotes: `Sertifika gönderildi - ${certificateData.certificateNumber}`,
    });

    return NextResponse.json({
      success: true,
      data: {
        donationId,
        certificateNumber: certificateData.certificateNumber,
        emailSent: true,
        certificateUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/certificate/${donationId}`
      },
      message: 'Sertifika başarıyla gönderildi'
    });

  } catch (error) {
    console.error('Sertifika gönderme hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Sertifika gönderilemedi' },
      { status: 500 }
    );
  }
}

// Mock e-posta gönderme fonksiyonu
async function sendEmail(emailData: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<boolean> {
  try {
    // Gerçek implementasyonda burada e-posta servisi kullanılacak
    // Örneğin: SendGrid, Nodemailer, AWS SES, vb.
    
    console.log('E-posta gönderiliyor:', {
      to: emailData.to,
      subject: emailData.subject,
      // html ve text içeriği çok uzun olduğu için log'da göstermiyoruz
    });

    // Mock başarılı gönderim
    // Gerçek implementasyonda:
    // 1. E-posta servisini konfigüre et
    // 2. SMTP ayarlarını yap
    // 3. E-posta template'ini hazırla
    // 4. Gönderim durumunu takip et
    
    return true; // Şimdilik her zaman başarılı
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    return false;
  }
}

// GET - Sertifika durumu sorgula
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const donationId = searchParams.get('donationId');

    if (!donationId) {
      return NextResponse.json(
        { success: false, error: 'Bağış ID gerekli' },
        { status: 400 }
      );
    }

    // Bağışı bul
    const donations = getAllDonations();
    const donation = donations.find(d => d.id === donationId);

    if (!donation) {
      return NextResponse.json(
        { success: false, error: 'Bağış bulunamadı' },
        { status: 404 }
      );
    }

    // Sertifika verilerini hazırla
    const certificateData = CertificateGenerator.prepareCertificateData(donation);

    return NextResponse.json({
      success: true,
      data: {
        donationId,
        certificateNumber: certificateData.certificateNumber,
        status: donation.status,
        certificateUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/certificate/${donationId}`,
        donorName: donation.donorName,
        donorEmail: donation.donorEmail,
        amount: donation.amount,
        saplingCount: donation.saplingCount,
        createdAt: donation.createdAt
      }
    });

  } catch (error) {
    console.error('Sertifika sorgulama hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Sertifika bilgileri alınamadı' },
      { status: 500 }
    );
  }
}


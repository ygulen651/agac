'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Donation } from '@/lib/database';
import { CertificateGenerator, CertificateData } from '@/lib/certificate-generator';
import { CleanCertificateGenerator } from '@/lib/clean-certificate-generator';
import { PDFGenerator } from '@/lib/pdf-generator';

export default function CertificatePage() {
  const params = useParams();
  const donationId = params.id as string;
  
  const [donation, setDonation] = useState<Donation | null>(null);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (donationId) {
      fetchDonationData();
    }
  }, [donationId]);

  const fetchDonationData = async () => {
    try {
      const response = await fetch(`/api/donations/${donationId}`);
      const data = await response.json();
      
      if (data.success) {
        setDonation(data.data);
        const certData = CertificateGenerator.prepareCertificateData(data.data);
        setCertificateData(certData);
      } else {
        setError('Bağış bulunamadı');
      }
    } catch (error) {
      console.error('Bağış verisi alınamadı:', error);
      setError('Sertifika yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (!certificateData) return;
    
    try {
      // Loading göster
      const button = document.querySelector('button[onClick="handleShare"]') as HTMLButtonElement;
      if (button) {
        button.disabled = true;
        button.textContent = '📤 PDF Hazırlanıyor...';
      }
      
      // PDF olarak paylaş
      await PDFGenerator.sharePDF(certificateData);
      
      // Başarı mesajı
      alert('PDF başarıyla paylaşıldı!');
    } catch (error) {
      console.error('PDF paylaşma hatası:', error);
      alert('PDF paylaşılamadı: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'));
    } finally {
      // Button'u eski haline getir
      const button = document.querySelector('button[onClick="handleShare"]') as HTMLButtonElement;
      if (button) {
        button.disabled = false;
        button.textContent = '📤 PDF Paylaş';
      }
    }
  };

  const handleDownload = async () => {
    if (!certificateData) return;
    
    try {
      // Loading göster
      const button = document.querySelector('button[onClick="handleDownload"]') as HTMLButtonElement;
      if (button) {
        button.disabled = true;
        button.textContent = '📄 PDF Hazırlanıyor...';
      }
      
      // PDF indir
      await PDFGenerator.downloadPDF(certificateData);
      
      // Başarı mesajı
      alert('PDF başarıyla indirildi!');
    } catch (error) {
      console.error('PDF indirme hatası:', error);
      alert('PDF indirilemedi: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'));
    } finally {
      // Button'u eski haline getir
      const button = document.querySelector('button[onClick="handleDownload"]') as HTMLButtonElement;
      if (button) {
        button.disabled = false;
        button.textContent = '📄 PDF İndir';
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Sertifika yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !donation || !certificateData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sertifika Bulunamadı</h1>
          <p className="text-gray-600 mb-6">{error || 'Geçersiz sertifika linki'}</p>
          <Link
            href="/"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Sertifika İçeriği - Full Screen */}
      <div 
        dangerouslySetInnerHTML={{ 
          __html: CleanCertificateGenerator.generateCleanCertificateHTML(certificateData) 
        }}
      />

      {/* Aksiyon Butonları */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-4 flex gap-3 z-50 border border-gray-200">
        <button
          onClick={handlePrint}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-105 shadow-lg"
        >
          🖨️ Yazdır
        </button>
        
        <button
          onClick={handleShare}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-105 shadow-lg"
        >
          📤 PDF Paylaş
        </button>
        
        <button
          onClick={handleDownload}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-105 shadow-lg"
        >
          📄 PDF İndir
        </button>
      </div>

      {/* Geri Dön Butonu */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="bg-white/95 backdrop-blur-lg text-gray-700 px-4 py-2 rounded-xl shadow-lg hover:bg-white transition-all duration-300 flex items-center gap-2 font-semibold border border-gray-200 transform hover:scale-105"
        >
          ← Ana Sayfa
        </Link>
      </div>

      {/* Sertifika Bilgileri */}
      <div className="fixed top-6 right-6 z-50 bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-lg max-w-xs border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          🏆 Sertifika Bilgileri
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center py-1 px-2 bg-green-50 rounded-lg">
            <span className="font-medium text-gray-700">Sertifika No:</span>
            <span className="font-bold text-green-700">{certificateData.certificateNumber}</span>
          </div>
          <div className="flex justify-between items-center py-1 px-2 bg-blue-50 rounded-lg">
            <span className="font-medium text-gray-700">Bağışçı:</span>
            <span className="font-bold text-blue-700">{certificateData.donorName}</span>
          </div>
          <div className="flex justify-between items-center py-1 px-2 bg-purple-50 rounded-lg">
            <span className="font-medium text-gray-700">Fidan:</span>
            <span className="font-bold text-purple-700">{certificateData.saplingCount} Adet</span>
          </div>
          <div className="flex justify-between items-center py-1 px-2 bg-orange-50 rounded-lg">
            <span className="font-medium text-gray-700">Tarih:</span>
            <span className="font-bold text-orange-700">{new Date(certificateData.donationDate).toLocaleDateString('tr-TR')}</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Sertifika sayfası için özel stiller */
        body {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden !important;
        }
        
        /* Print sırasında butonları gizle */
        @media print {
          .fixed {
            display: none !important;
          }
          
          body {
            background: white !important;
          }
        }
      `}</style>
    </>
  );
}

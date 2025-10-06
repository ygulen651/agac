// Basit bir JSON dosya tabanlı veritabanı sistemi
import fs from 'fs';
import path from 'path';

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  saplingCount: number;
  iban: string;
  status: 'pending' | 'completed' | 'verified';
  createdAt: string;
  updatedAt: string;
  transferDescription?: string;
  certificateSent?: boolean;
  // Havale doğrulama bilgileri
  transferReference?: string; // Havale referans numarası
  transferDate?: string; // Havale tarihi
  verifiedBy?: string; // Kim doğruladı
  verificationNotes?: string; // Doğrulama notları
  bankStatement?: string; // Ekstre ekran görüntüsü URL'si
}

const DATABASE_PATH = path.join(process.cwd(), 'data', 'donations.json');

// Veritabanı dosyasını oluştur
function ensureDatabaseExists() {
  const dataDir = path.dirname(DATABASE_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(DATABASE_PATH)) {
    fs.writeFileSync(DATABASE_PATH, JSON.stringify([], null, 2));
  }
}

// Tüm bağışları getir
export function getAllDonations(): Donation[] {
  ensureDatabaseExists();
  try {
    const data = fs.readFileSync(DATABASE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Veritabanı okuma hatası:', error);
    return [];
  }
}

// Yeni bağış ekle
export function addDonation(donation: Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>): Donation {
  ensureDatabaseExists();
  
  const donations = getAllDonations();
  const newDonation: Donation = {
    ...donation,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  donations.push(newDonation);
  
  try {
    fs.writeFileSync(DATABASE_PATH, JSON.stringify(donations, null, 2));
    return newDonation;
  } catch (error) {
    console.error('Veritabanı yazma hatası:', error);
    throw new Error('Bağış kaydedilemedi');
  }
}

// Bağış durumunu güncelle
export function updateDonationStatus(
  id: string, 
  status: Donation['status'], 
  verificationData?: {
    transferReference?: string;
    transferDate?: string;
    verifiedBy?: string;
    verificationNotes?: string;
    bankStatement?: string;
  }
): Donation | null {
  ensureDatabaseExists();
  
  const donations = getAllDonations();
  const donationIndex = donations.findIndex(d => d.id === id);
  
  if (donationIndex === -1) {
    return null;
  }
  
  donations[donationIndex] = {
    ...donations[donationIndex],
    status,
    updatedAt: new Date().toISOString(),
    ...(verificationData && {
      transferReference: verificationData.transferReference,
      transferDate: verificationData.transferDate,
      verifiedBy: verificationData.verifiedBy,
      verificationNotes: verificationData.verificationNotes,
      bankStatement: verificationData.bankStatement,
    }),
  };
  
  try {
    fs.writeFileSync(DATABASE_PATH, JSON.stringify(donations, null, 2));
    return donations[donationIndex];
  } catch (error) {
    console.error('Bağış güncelleme hatası:', error);
    throw new Error('Bağış güncellenemedi');
  }
}

// ID oluşturucu
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// İstatistikler
export function getDonationStats() {
  const donations = getAllDonations();
  
  const totalDonations = donations.length;
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalSaplings = donations.reduce((sum, d) => sum + d.saplingCount, 0);
  const completedDonations = donations.filter(d => d.status === 'completed').length;
  const pendingDonations = donations.filter(d => d.status === 'pending').length;
  
  return {
    totalDonations,
    totalAmount,
    totalSaplings,
    completedDonations,
    pendingDonations,
    averageAmount: totalDonations > 0 ? Math.round(totalAmount / totalDonations) : 0,
  };
}

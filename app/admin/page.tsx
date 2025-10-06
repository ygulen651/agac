'use client';

import { useState, useEffect } from 'react';

interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  saplingCount: number;
  status: 'pending' | 'completed' | 'verified';
  createdAt: string;
  updatedAt: string;
  transferDescription?: string;
  certificateSent?: boolean;
  transferReference?: string;
  transferDate?: string;
  verifiedBy?: string;
  verificationNotes?: string;
  bankStatement?: string;
}

interface DonationStats {
  totalDonations: number;
  totalAmount: number;
  totalSaplings: number;
  completedDonations: number;
  pendingDonations: number;
  averageAmount: number;
}

export default function AdminDashboard() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan authentication durumunu kontrol et
    const savedAuth = localStorage.getItem('admin_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchDonations();
    } else {
      setLoading(false);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basit şifre kontrolü - gerçek uygulamada daha güvenli olmalı
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      setPasswordError('');
      fetchDonations();
    } else {
      setPasswordError('Yanlış şifre!');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    setPassword('');
    setPasswordError('');
  };

  const fetchDonations = async () => {
    try {
      const response = await fetch('/api/donations');
      const data = await response.json();
      
      if (data.success) {
        // API'den gelen tüm bağışları al (sadece onaylanmış olanları değil)
        const allDonations = await fetchAllDonations();
        setDonations(allDonations);
        
        // İstatistikleri hesapla
        const stats = calculateStats(allDonations);
        setStats(stats);
      }
    } catch (error) {
      console.error('Bağış verileri alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDonations = async () => {
    try {
      // Tüm bağışları almak için donations.json dosyasını doğrudan okuyacağız
      const response = await fetch('/api/donations/all');
      if (response.ok) {
        const data = await response.json();
        return data.donations || [];
      }
      return [];
    } catch (error) {
      console.error('Tüm bağışlar alınamadı:', error);
      return [];
    }
  };

  const calculateStats = (donations: Donation[]): DonationStats => {
    const totalDonations = donations.length;
    const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalSaplings = donations.reduce((sum, d) => sum + d.saplingCount, 0);
    const completedDonations = donations.filter(d => d.status === 'verified').length;
    const pendingDonations = donations.filter(d => d.status === 'pending').length;
    const averageAmount = totalDonations > 0 ? totalAmount / totalDonations : 0;

    return {
      totalDonations,
      totalAmount,
      totalSaplings,
      completedDonations,
      pendingDonations,
      averageAmount
    };
  };

  const filteredDonations = selectedStatus === 'all' 
    ? donations 
    : donations.filter(d => d.status === selectedStatus);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'verified': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Beklemede';
      case 'completed': return 'Tamamlandı';
      case 'verified': return 'Onaylandı';
      default: return 'Bilinmiyor';
    }
  };

  // Şifre giriş formu
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Paneli</h1>
            <p className="text-gray-600">Devam etmek için şifrenizi girin</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-semibold"
                placeholder="Şifrenizi girin"
                required
              />
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
            >
              Giriş Yap
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Admin paneline erişim için yetkili olmanız gerekmektedir.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Bağış verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📊 Bağış Yönetimi</h1>
              <p className="text-gray-600 mt-2">Tüm bağışları görüntüleyin ve yönetin</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Son Güncelleme</div>
                <div className="text-lg font-semibold text-gray-900">
                  {new Date().toLocaleDateString('tr-TR')}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>

        {/* İstatistikler */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Toplam Bağış</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAmount.toLocaleString('tr-TR')} ₺</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Dikilen Fidan</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSaplings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Toplam Bağışçı</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDonations}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Onaylanan</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedDonations}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filtreler */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Bağış Listesi</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'all' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tümü ({donations.length})
              </button>
              <button
                onClick={() => setSelectedStatus('verified')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'verified' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Onaylanan ({donations.filter(d => d.status === 'verified').length})
              </button>
              <button
                onClick={() => setSelectedStatus('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Bekleyen ({donations.filter(d => d.status === 'pending').length})
              </button>
            </div>
          </div>
        </div>

        {/* Bağış Tablosu */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredDonations.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Bağış bulunamadı</h3>
              <p className="mt-1 text-sm text-gray-500">Seçilen filtrelere uygun bağış bulunmuyor.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bağışçı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Miktar
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fidan Sayısı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDonations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{donation.donorName}</div>
                          <div className="text-sm text-gray-500">{donation.donorEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {donation.amount.toLocaleString('tr-TR')} ₺
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{donation.saplingCount} fidan</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(donation.status)}`}>
                          {getStatusText(donation.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(donation.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {donation.status === 'verified' && (
                          <button
                            onClick={async () => {
                              try {
                                const response = await fetch('/api/certificates/send', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    donationId: donation.id,
                                  }),
                                });
                                
                                const data = await response.json();
                                
                                if (data.success) {
                                  fetchDonations();
                                  alert(`Sertifika başarıyla gönderildi!\nSertifika No: ${data.data.certificateNumber}\nE-posta: ${donation.donorEmail}`);
                                } else {
                                  alert('Sertifika gönderilemedi: ' + data.error);
                                }
                              } catch (error) {
                                console.error('Sertifika gönderme hatası:', error);
                                alert('Sertifika gönderilemedi!');
                              }
                            }}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200"
                          >
                            📧 Sertifika Gönder
                          </button>
                        )}
                        <a
                          href={`/certificate/${donation.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200 inline-block"
                        >
                          👁️ Sertifika Görüntüle
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bilgi Kutusu */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="text-blue-600 mr-3">ℹ️</div>
            <div>
              <h4 className="font-bold text-blue-800 mb-2">Otomatik Onaylama Sistemi</h4>
              <p className="text-blue-700 text-sm">
                Artık tüm bağışlar otomatik olarak onaylanmaktadır. Manuel onaylama işlemi kaldırılmıştır. 
                Bağış yapan kullanıcılar hemen sertifika alabilir ve bağışları anında görünür hale gelir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
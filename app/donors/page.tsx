'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Donation {
  id: string;
  donorName: string;
  amount: number;
  saplingCount: number;
  createdAt: string;
}

export default function DonorsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const fetchAllDonations = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/donations');
        const data = await response.json();
        if (data.success) {
          setDonations(data.donations);
          setTotalCount(data.totalCount);
        }
      } catch (error) {
        console.error('Bağış verileri yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDonations();
  }, []);

  // Filtreleme ve sıralama
  const filteredAndSortedDonations = donations
    .filter(donation => 
      donation.donorName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'name':
          comparison = a.donorName.localeCompare(b.donorName, 'tr');
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const totalSaplings = donations.reduce((sum, donation) => sum + donation.saplingCount, 0);
  const totalCO2 = totalSaplings * 22;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Bağışçılar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <Link 
                href="/"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-4"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Ana Sayfaya Dön
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Tüm Bağışçılarımız
              </h1>
              <p className="text-xl text-gray-600">
                Doğaya katkıda bulunan değerli bağışçılarımız
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{totalCount}</div>
                <div className="text-sm text-gray-600">Toplam Bağışçı</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl">💰</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalAmount.toLocaleString('tr-TR')} ₺</div>
                <div className="text-sm text-gray-600">Toplam Bağış</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl">🌱</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalSaplings.toLocaleString('tr-TR')}</div>
                <div className="text-sm text-gray-600">Dikilen Fidan</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl">🌍</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalCO2.toLocaleString('tr-TR')} kg</div>
                <div className="text-sm text-gray-600">CO₂ Emilimi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bağışçı Ara
              </label>
              <input
                type="text"
                placeholder="İsim ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sırala
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'name')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="date">Tarih</option>
                <option value="amount">Miktar</option>
                <option value="name">İsim</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sıralama Düzeni
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="desc">Azalan</option>
                <option value="asc">Artan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Donors Grid */}
        {filteredAndSortedDonations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedDonations.map((donation) => (
              <div key={donation.id} className="group donor-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-green-100">
                {/* Donor Avatar */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {donation.donorName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{donation.donorName}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(donation.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
                
                {/* Donation Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Bağış Miktarı</span>
                    <span className="text-lg font-bold text-green-600">{donation.amount} ₺</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Fidan Sayısı</span>
                    <span className="text-lg font-bold text-emerald-600">{donation.saplingCount} Fidan</span>
                  </div>
                </div>
                
                {/* Impact Badge */}
                <div className="mt-4 pt-4 border-t border-green-200">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center px-3 py-1 bg-green-100 rounded-full">
                      <span className="text-sm font-medium text-green-800">
                        🌱 {donation.saplingCount * 22} kg CO₂
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Floating particles */}
                <div className="donor-particles">
                  <div className="particle particle-1"></div>
                  <div className="particle particle-2"></div>
                  <div className="particle particle-3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz bağış yok'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Farklı bir arama terimi deneyin' : 'İlk bağışçı olmak ister misiniz?'}
            </p>
          </div>
        )}

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}

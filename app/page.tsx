'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function Home() {
  const [selectedSaplings, setSelectedSaplings] = useState(1);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [recentDonations, setRecentDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);

  // Bağış verilerini yükle
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('/api/donations');
        const data = await response.json();
        if (data.success) {
          setRecentDonations(data.donations);
          setTotalDonations(data.totalCount);
        }
      } catch (error) {
        console.error('Bağış verileri yüklenemedi:', error);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 flex items-center justify-center pt-40">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        {/* Animated Sapling Image - Right Side */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="sapling-image-container">
        <Image
              src="/pngwing.com.png"
              alt="Genç Fidan"
              width={300}
              height={400}
              className="sapling-image"
          priority
        />
            {/* Floating particles around sapling */}
            <div className="floating-particles">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
              <div className="particle particle-5"></div>
            </div>
          </div>
        </div>


        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            <span className="block">Daha Yeşil Bir Karaman</span>
            <span className="block bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
              Hedefimiz 1 Milyon Fidan
            </span>
          </h1>
          
          {/* Atatürk Sözü */}
          <div className="mb-8 max-w-4xl mx-auto">
            <blockquote className="text-lg md:text-xl text-gray-900 font-semibold italic text-center leading-relaxed">
              "Vatan Toprağı Kutsaldır, Kaderine Terk Edilemez!"
            </blockquote>
            <cite className="block text-right text-lg text-black font-bold mt-3">
              - M. Kemal Atatürk
            </cite>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Fidan Dik</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <a
              href="#donation-card"
              className="px-8 py-4 border-2 border-green-600 text-green-600 font-bold text-lg rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Bağış Yap
            </a>
          </div>
        </div>
        
      </section>

      {/* Recent Donors Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Son Bağış Yapanlar
            </h2>
            <p className="text-xl text-green-600">
              Doğaya katkıda bulunan değerli bağışçılarımız
            </p>
            <div className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-green-100 text-green-800 text-lg font-semibold">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
              Toplam {totalDonations} bağış
            </div>
          </div>
          
          {recentDonations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {recentDonations.map((donation: any) => (
                <div key={donation.id} className="group donor-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-green-200">
                  {/* Donor Avatar */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
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
                      <span className="text-sm text-green-600">Bağış Miktarı</span>
                      <span className="text-lg font-bold text-green-600">{donation.amount} ₺</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600">Fidan Sayısı</span>
                      <span className="text-lg font-bold text-green-700">{donation.saplingCount} Fidan</span>
                    </div>
                  </div>
                  
                  {/* Impact Badge */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
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
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">Henüz bağış yok</h3>
              <p className="text-gray-500">İlk bağışçı olmak ister misiniz?</p>
            </div>
          )}
          
          {/* View All Button */}
          {recentDonations.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/donors"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Tüm Bağışçıları Gör
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Rakamlarla Başarımız
            </h2>
            <p className="text-xl text-green-600">
              Birlikte neler başardığımızı görün
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-200">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="text-5xl font-black text-green-600 mb-2">15,247</div>
              <div className="text-xl font-semibold text-green-700 mb-2">Dikilen Fidan</div>
              <div className="text-green-600 font-medium">+2,341 bu ay</div>
            </div>
            
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-200">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-5xl font-black text-blue-600 mb-2">3,891</div>
              <div className="text-xl font-semibold text-green-700 mb-2">Aktif Gönüllü</div>
              <div className="text-blue-600 font-medium">+456 yeni üye</div>
            </div>
            
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-200">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-5xl font-black text-purple-600 mb-2">127</div>
              <div className="text-xl font-semibold text-green-700 mb-2">Hektar Alan</div>
              <div className="text-purple-600 font-medium">+18 yeni bölge</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Neden Ağaç Dikmeliyiz?
            </h2>
            <p className="text-2xl text-green-600 max-w-3xl mx-auto">
              Her ağaç, doğaya ve geleceğimize yapılan bir yatırımdır
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Temiz Hava - Leaf Shaped Card */}
            <div className="group leaf-card leaf-card-1">
              {/* Leaf Shape Container */}
              <div className="leaf-container">
                {/* Leaf Veins */}
                <div className="leaf-veins">
                  <div className="main-vein"></div>
                  <div className="side-vein vein-1"></div>
                  <div className="side-vein vein-2"></div>
                  <div className="side-vein vein-3"></div>
                  <div className="side-vein vein-4"></div>
                  <div className="side-vein vein-5"></div>
                  <div className="side-vein vein-6"></div>
                </div>
                
                {/* Leaf Content */}
                <div className="leaf-content">
                  {/* Icon Area */}
                  <div className="leaf-icon-area">
                    <div className="leaf-icon-container">
                      <Image
                        src="/—Pngtree—bodhi green leaf tree_20793600.png"
                        alt="Ağaç İkonu"
                        width={80}
                        height={80}
                        className="leaf-icon"
                      />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="leaf-text">
                    <h3 className="leaf-title">Temiz Hava</h3>
                    <p className="leaf-description">
                      Ağaçlar havadaki karbondioksiti emer, oksijen üretir ve hava kalitesini önemli ölçüde artırır. 
                      Her ağaç yılda ortalama 22 kg karbondioksit emer.
                    </p>
                  </div>
                </div>
                
                {/* Leaf Edge Details */}
                <div className="leaf-edges">
                  <div className="leaf-edge edge-1"></div>
                  <div className="leaf-edge edge-2"></div>
                  <div className="leaf-edge edge-3"></div>
                  <div className="leaf-edge edge-4"></div>
                  <div className="leaf-edge edge-5"></div>
                  <div className="leaf-edge edge-6"></div>
                </div>
              </div>
              
              {/* Floating Particles */}
              <div className="leaf-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
              </div>
            </div>
            
            {/* İklim Dengesi - Leaf Shaped Card */}
            <div className="group leaf-card leaf-card-2">
              {/* Leaf Shape Container */}
              <div className="leaf-container">
                {/* Leaf Veins */}
                <div className="leaf-veins">
                  <div className="main-vein"></div>
                  <div className="side-vein vein-1"></div>
                  <div className="side-vein vein-2"></div>
                  <div className="side-vein vein-3"></div>
                  <div className="side-vein vein-4"></div>
                  <div className="side-vein vein-5"></div>
                  <div className="side-vein vein-6"></div>
                </div>
                
                {/* Leaf Content */}
                <div className="leaf-content">
                  {/* Icon Area */}
                  <div className="leaf-icon-area">
                    <div className="leaf-icon-container">
                      <Image
                        src="/36471.png"
                        alt="Ağaç İkonu"
                        width={80}
                        height={80}
                        className="leaf-icon"
                      />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="leaf-text">
                    <h3 className="leaf-title">İklim Dengesi</h3>
                    <p className="leaf-description">
                      Ağaçlar küresel ısınmayı yavaşlatır ve iklim değişikliğiyle mücadele eder. 
                      Ormanlar dünyanın karbon deposu olarak görev yapar.
                    </p>
                  </div>
                </div>
                
                {/* Leaf Edge Details */}
                <div className="leaf-edges">
                  <div className="leaf-edge edge-1"></div>
                  <div className="leaf-edge edge-2"></div>
                  <div className="leaf-edge edge-3"></div>
                  <div className="leaf-edge edge-4"></div>
                  <div className="leaf-edge edge-5"></div>
                  <div className="leaf-edge edge-6"></div>
                </div>
              </div>
              
              {/* Floating Particles */}
              <div className="leaf-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
              </div>
            </div>
            
            {/* Biyolojik Çeşitlilik - Leaf Shaped Card */}
            <div className="group leaf-card leaf-card-3">
              {/* Leaf Shape Container */}
              <div className="leaf-container">
                {/* Leaf Veins */}
                <div className="leaf-veins">
                  <div className="main-vein"></div>
                  <div className="side-vein vein-1"></div>
                  <div className="side-vein vein-2"></div>
                  <div className="side-vein vein-3"></div>
                  <div className="side-vein vein-4"></div>
                  <div className="side-vein vein-5"></div>
                  <div className="side-vein vein-6"></div>
                </div>
                
                {/* Leaf Content */}
                <div className="leaf-content">
                  {/* Icon Area */}
                  <div className="leaf-icon-area">
                    <div className="leaf-icon-container">
                      <Image
                        src="/pngwing.com.png"
                        alt="Ağaç İkonu"
                        width={80}
                        height={80}
                        className="leaf-icon"
                      />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="leaf-text">
                    <h3 className="leaf-title">Biyolojik Çeşitlilik</h3>
                    <p className="leaf-description">
                      Ağaçlar birçok canlı türü için yaşam alanı sağlar ve ekosistemi destekler. 
                      Her ağaç yüzlerce hayvan türüne ev sahipliği yapar.
                    </p>
                  </div>
                </div>
                
                {/* Leaf Edge Details */}
                <div className="leaf-edges">
                  <div className="leaf-edge edge-1"></div>
                  <div className="leaf-edge edge-2"></div>
                  <div className="leaf-edge edge-3"></div>
                  <div className="leaf-edge edge-4"></div>
                  <div className="leaf-edge edge-5"></div>
                  <div className="leaf-edge edge-6"></div>
                </div>
              </div>
              
              {/* Floating Particles */}
              <div className="leaf-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Steps Section */}
      <section className="py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Üç Adımda Değişim Yaratın
            </h2>
            <p className="text-2xl text-green-600 max-w-3xl mx-auto">
              Doğaya katkıda bulunmak hiç bu kadar kolay olmamıştı
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 - Leaf Shaped Card */}
            <div className="group leaf-card leaf-card-1">
              {/* Leaf Shape Container */}
              <div className="leaf-container">
                {/* Leaf Veins */}
                <div className="leaf-veins">
                  <div className="main-vein"></div>
                  <div className="side-vein vein-1"></div>
                  <div className="side-vein vein-2"></div>
                  <div className="side-vein vein-3"></div>
                  <div className="side-vein vein-4"></div>
                  <div className="side-vein vein-5"></div>
                  <div className="side-vein vein-6"></div>
                </div>
                
                {/* Leaf Content */}
                <div className="leaf-content">
                  {/* Icon Area */}
                  <div className="leaf-icon-area">
                    <div className="leaf-icon-container">
          <Image
                        src="/—Pngtree—bodhi green leaf tree_20793600.png"
                        alt="Ağaç İkonu"
                        width={80}
                        height={80}
                        className="leaf-icon"
                      />
                    </div>
                    <div className="leaf-number">1</div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="leaf-text">
                    <h3 className="leaf-title">Bağışını Yap</h3>
                    <p className="leaf-description">
                      Dilediğin miktarda fidan bağışlayarak ilk adımı at. Güvenli ödeme altyapımızla işlemin saniyeler içinde tamamlansın.
                    </p>
                  </div>
                </div>
                
                {/* Leaf Edge Details */}
                <div className="leaf-edges">
                  <div className="leaf-edge edge-1"></div>
                  <div className="leaf-edge edge-2"></div>
                  <div className="leaf-edge edge-3"></div>
                  <div className="leaf-edge edge-4"></div>
                  <div className="leaf-edge edge-5"></div>
                  <div className="leaf-edge edge-6"></div>
                </div>
              </div>
              
              {/* Floating Particles */}
              <div className="leaf-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
              </div>
            </div>
            
            {/* Step 2 - Leaf Shaped Card */}
            <div className="group leaf-card leaf-card-2">
              {/* Leaf Shape Container */}
              <div className="leaf-container">
                {/* Leaf Veins */}
                <div className="leaf-veins">
                  <div className="main-vein"></div>
                  <div className="side-vein vein-1"></div>
                  <div className="side-vein vein-2"></div>
                  <div className="side-vein vein-3"></div>
                  <div className="side-vein vein-4"></div>
                  <div className="side-vein vein-5"></div>
                  <div className="side-vein vein-6"></div>
                </div>
                
                {/* Leaf Content */}
                <div className="leaf-content">
                  {/* Icon Area */}
                  <div className="leaf-icon-area">
                    <div className="leaf-icon-container">
          <Image
                        src="/aala.png"
                        alt="Ağaç İkonu"
                        width={80}
                        height={80}
                        className="leaf-icon"
                      />
                    </div>
                    <div className="leaf-number">2</div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="leaf-text">
                    <h3 className="leaf-title">Fidanını Dikelim</h3>
                    <p className="leaf-description">
                      Ekibimiz, belirlediğimiz ağaçlandırma sahalarında senin adına fidanını toprakla buluştursun.
                    </p>
                  </div>
                </div>
                
                {/* Leaf Edge Details */}
                <div className="leaf-edges">
                  <div className="leaf-edge edge-1"></div>
                  <div className="leaf-edge edge-2"></div>
                  <div className="leaf-edge edge-3"></div>
                  <div className="leaf-edge edge-4"></div>
                  <div className="leaf-edge edge-5"></div>
                  <div className="leaf-edge edge-6"></div>
                </div>
              </div>
              
              {/* Floating Particles */}
              <div className="leaf-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
              </div>
            </div>
            
            {/* Step 3 - Leaf Shaped Card */}
            <div className="group leaf-card leaf-card-3">
              {/* Leaf Shape Container */}
              <div className="leaf-container">
                {/* Leaf Veins */}
                <div className="leaf-veins">
                  <div className="main-vein"></div>
                  <div className="side-vein vein-1"></div>
                  <div className="side-vein vein-2"></div>
                  <div className="side-vein vein-3"></div>
                  <div className="side-vein vein-4"></div>
                  <div className="side-vein vein-5"></div>
                  <div className="side-vein vein-6"></div>
                </div>
                
                {/* Leaf Content */}
                <div className="leaf-content">
                  {/* Icon Area */}
                  <div className="leaf-icon-area">
                    <div className="leaf-icon-container">
          <Image
                        src="/ağa.png"
                        alt="Ağaç İkonu"
                        width={80}
                        height={80}
                        className="leaf-icon"
                      />
                    </div>
                    <div className="leaf-number">3</div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="leaf-text">
                    <h3 className="leaf-title">Sertifikanı Al</h3>
                    <p className="leaf-description">
                      Adına özel hazırlanan dijital sertifikan e-posta adresine gelsin. Dilersen sevdiklerine hediye et.
                    </p>
                  </div>
                </div>
                
                {/* Leaf Edge Details */}
                <div className="leaf-edges">
                  <div className="leaf-edge edge-1"></div>
                  <div className="leaf-edge edge-2"></div>
                  <div className="leaf-edge edge-3"></div>
                  <div className="leaf-edge edge-4"></div>
                  <div className="leaf-edge edge-5"></div>
                  <div className="leaf-edge edge-6"></div>
                </div>
              </div>
              
              {/* Floating Particles */}
              <div className="leaf-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Card Section */}
      <section id="donation-card" className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="donation-card bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Side - Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Şimdi Sıra Sende
                  </h2>
                  <div className="space-y-4 text-lg text-gray-900 font-semibold leading-relaxed">
                    <p>Küçük bir katkı, büyük bir fark yaratır.</p>
                    <p>Seçeceğin fidanlarla geleceğe yemyeşil bir miras bırak.</p>
                  </div>
                </div>

                {/* Selected Amount Display */}
                <div className="bg-green-100 rounded-2xl p-6">
                  <div className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                    Seçilen Miktar
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {customAmount ? `${customAmount} ₺` : `${selectedSaplings * 10} ₺`}
                  </div>
                  <div className="text-lg text-gray-900 font-semibold">
                    ({selectedSaplings} Fidan)
                  </div>
                </div>
              </div>

              {/* Right Side - Donation Form */}
              <div className="space-y-8">
                {/* Sapling Count Selector */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Fidan Sayısını Seç
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={selectedSaplings}
                      onChange={(e) => setSelectedSaplings(parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-900 font-semibold mt-2">
                      <span>1</span>
                      <span className="font-bold text-green-600">{selectedSaplings}</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>

                {/* Custom Amount Input */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Veya özel bir tutar gir (₺)
                  </label>
                  <input
                    type="number"
                    placeholder="Örn: 250"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="donation-input w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-green-500 focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Donor Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Adınız"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="donation-input p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-green-500 focus:outline-none transition-all duration-300"
                  />
                  <input
                    type="email"
                    placeholder="E-posta"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="donation-input p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-green-500 focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* IBAN Info */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">🏦</div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">Banka Bilgileri</div>
                      <div className="text-sm text-green-800 font-semibold">Havale için aşağıdaki bilgileri kullanın</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <div className="text-xs font-bold text-gray-900 mb-1">Banka</div>
                      <div className="text-sm font-bold text-gray-900">Ziraat Bankası</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <div className="text-xs font-bold text-gray-900 mb-1">Hesap Sahibi</div>
                      <div className="text-sm font-bold text-gray-900">Doğa İçin Bir Fidan Derneği</div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <div className="text-xs font-bold text-gray-900 mb-1">IBAN</div>
                      <div className="text-sm font-mono font-bold text-gray-900 bg-green-50 px-2 py-1 rounded">
                        TR12 0001 0000 1234 5678 9012 34
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-xs font-bold text-gray-900 mb-1">✅ Basit Süreç</div>
                    <div className="text-xs text-gray-900 font-semibold">
                      Bağışınız onaylandıktan sonra banka bilgilerini kullanarak havale yapabilirsiniz. 
                      Havale açıklamasında &quot;<strong>Fidan Bağışı</strong>&quot; yazmanız yeterlidir.
                    </div>
                  </div>
                </div>

                {/* Donate Button */}
                <button 
                  onClick={() => setShowDonationModal(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white text-xl font-bold py-6 px-8 rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  🏦 IBAN ile Güvenle Bağış Yap
                </button>
                
                {/* Admin Panel Link kaldırıldı */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Logos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Destekleyenlerimiz
            </h2>
            <p className="text-lg text-green-600">
              Bize güvenen değerli kurumlarımız
            </p>
          </div>
          
          {/* Scrolling Logo Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-12">
              {/* TERMA Logo */}
              <div className="logo-container flex-shrink-0">
                <Image
                  src="/tema-logo.png"
                  alt="TERMA"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
              
              {/* Karaman Gazeteciler Cemiyeti Logo */}
              <div className="logo-container flex-shrink-0">
                <Image
                  src="/KARAMAN LOGO.png"
                  alt="Karaman Gazeteciler Cemiyeti"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
              
              {/* KAREV Logo */}
              <div className="logo-container flex-shrink-0">
                <Image
                  src="/karev.png"
                  alt="KAREV - Karaman Eğitim Kültür ve Sağlık Vakfı"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
              
              {/* İKEV Logo */}
              <div className="logo-container flex-shrink-0">
                <Image
                  src="/İkev logo.png"
                  alt="İKEV"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
              
              {/* KARTAP Logo */}
              <div className="logo-container flex-shrink-0">
                <Image
                  src="/kartap logo.png"
                  alt="KARTAP - Karaman Tanıtım ve Turizm Derneği"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
              
              {/* KARDOF Logo */}
              <div className="logo-container flex-shrink-0">
                <Image
                  src="/KARDOF LOGO YENİ[5752].png"
                  alt="KARDOF - Karaman Doğa Sporları ve Kulübü"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
              
              {/* Duplicate logos for seamless scrolling */}
              <div className="logo-container flex-shrink-0">
                <Image
                  src="/tema-logo.png"
                  alt="TERMA"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
              
              <div className="logo-container flex-shrink-0">
                <Image
                  src="/KARAMAN LOGO.png"
                  alt="Karaman Gazeteciler Cemiyeti"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
              
              <div className="logo-container flex-shrink-0">
                <Image
                  src="/karev.png"
                  alt="KAREV - Karaman Eğitim Kültür ve Sağlık Vakfı"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
              
              <div className="logo-container flex-shrink-0">
                <Image
                  src="/İkev logo.png"
                  alt="İKEV"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
              
              <div className="logo-container flex-shrink-0">
                <Image
                  src="/kartap logo.png"
                  alt="KARTAP - Karaman Tanıtım ve Turizm Derneği"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
              
              <div className="logo-container flex-shrink-0">
                <Image
                  src="/KARDOF LOGO YENİ[5752].png"
                  alt="KARDOF - Karaman Doğa Sporları ve Kulübü"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 via-green-700 to-green-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              Harekete Geçelim!
            </h2>
            <p className="text-2xl mb-12 opacity-90 leading-relaxed">
              Bugün bir fidan dik, yarın için umut ver. Doğaya katkıda bulunmak 
              hiç bu kadar kolay olmamıştı.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="#donation-card"
                className="group px-12 py-6 bg-white text-green-600 rounded-full text-2xl font-bold hover:bg-green-100 transition-all duration-300 transform hover:scale-105 shadow-2xl inline-block"
              >
                <span className="flex items-center justify-center">
                  Bağış Yap
                  <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              <button className="px-12 py-6 border-3 border-white text-white rounded-full text-2xl font-bold hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105">
                Projeleri Gör
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      {showDonationModal && (
        <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="donation-modal bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <Image
                      src="/—Pngtree—bodhi green leaf tree_20793600.png"
                      alt="Ağaç"
                      width={30}
                      height={30}
                      className="filter brightness-0 invert"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Bağış Onayı</h3>
                    <p className="text-green-100">Doğaya katkınız için teşekkürler!</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDonationModal(false)}
                  className="modal-close text-white hover:text-green-200 transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="modal-content p-6 space-y-6">
              {/* Donation Summary */}
              <div className="bg-white rounded-2xl p-6 border border-green-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Bağış Özeti</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-green-600">Bağış Miktarı</div>
                    <div className="text-2xl font-bold text-green-600">
                      {customAmount ? `${customAmount} ₺` : `${selectedSaplings * 10} ₺`}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-green-600">Dikilecek Fidan</div>
                    <div className="text-2xl font-bold text-green-600">{selectedSaplings} Fidan</div>
                  </div>
                </div>
                {donorName && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-green-600">Bağışçı</div>
                    <div className="text-lg font-semibold text-gray-900">{donorName}</div>
                  </div>
                )}
              </div>

              {/* IBAN Information */}
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">🏦</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Banka Bilgileri</h4>
                    <p className="text-green-600">Havale için aşağıdaki bilgileri kullanın</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-green-600 mb-1">Banka</div>
                    <div className="text-lg font-semibold text-gray-900">Ziraat Bankası</div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-green-600 mb-1">Hesap Sahibi</div>
                    <div className="text-lg font-semibold text-gray-900">Doğa İçin Bir Fidan Derneği</div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-green-600 mb-2">IBAN</div>
                    <div className="text-lg font-mono font-bold text-gray-900 bg-white px-3 py-2 rounded border">
                      TR12 0001 0000 1234 5678 9012 34
                    </div>
                  </div>
                </div>

                {/* Copy IBAN Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('TR12 0001 0000 1234 5678 9012 34');
                    alert('IBAN kopyalandı!');
                  }}
                  className="copy-button w-full mt-6 bg-green-100 text-green-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
                >
                  📋 IBAN&apos;ı Kopyala
                </button>
              </div>

              {/* Transfer Instructions */}
              <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">⚠️</div>
                  <div>
                    <h4 className="text-lg font-bold text-yellow-800 mb-2">Önemli Bilgiler</h4>
                    <div className="text-yellow-700 space-y-2">
                      <p><strong>Havale Açıklaması:</strong> &quot;{donorName || 'Adınız'} - Fidan Bağışı&quot;</p>
                      <p><strong>Sertifika:</strong> Havaleyi tamamladıktan sonra sertifikanız e-posta adresinize gönderilecektir.</p>
                      <p><strong>Süre:</strong> İşlem 1-2 iş günü içinde tamamlanır.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDonationModal(false)}
                  className="flex-1 py-4 px-6 border-2 border-gray-300 text-green-700 rounded-2xl font-semibold hover:border-gray-400 hover:bg-green-50 transition-all duration-300"
                >
                  Daha Sonra
                </button>
                <button
                  onClick={async () => {
                    // IBAN ile bağış kaydet
                    try {
                      const response = await fetch('/api/donations', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          donorName,
                          donorEmail,
                          amount: customAmount ? parseFloat(customAmount) : selectedSaplings * 10,
                          saplingCount: selectedSaplings,
                          iban: 'TR12 0001 0000 1234 5678 9012 34',
                        }),
                      });

                      const data = await response.json();
                      
                      if (data.success) {
                        setShowDonationModal(false);
                        setShowThankYouModal(true);
                      } else {
                        alert('Bağış kaydedilemedi: ' + data.error);
                      }
                    } catch (error) {
                      console.error('Bağış kaydetme hatası:', error);
                      alert('Bağış kaydedilemedi!');
                    }
                  }}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105"
                >
                  ✅ Bağış Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="thank-you-modal bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-6 rounded-t-3xl text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-2">Teşekkürler!</h3>
              <p className="text-green-100 text-lg">Bağışınız başarıyla alındı</p>
            </div>

            {/* Modal Content */}
            <div className="modal-content p-6 space-y-6">
              {/* Success Animation */}
              <div className="text-center">
                <div className="success-animation mb-6">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/—Pngtree—bodhi green leaf tree_20793600.png"
                      alt="Ağaç"
                      width={80}
                      height={80}
                      className="success-tree"
                    />
                    <div className="floating-confetti">
                      <div className="confetti confetti-1">🍃</div>
                      <div className="confetti confetti-2">🌿</div>
                      <div className="confetti confetti-3">🍃</div>
                      <div className="confetti confetti-4">🌿</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donation Details */}
              <div className="bg-white rounded-2xl p-6 border border-green-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Bağış Detayları</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {customAmount ? `${customAmount} ₺` : `${selectedSaplings * 10} ₺`}
                    </div>
                    <div className="text-sm text-green-600">Bağış Miktarı</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">{selectedSaplings}</div>
                    <div className="text-sm text-green-600">Dikilecek Fidan</div>
                  </div>
                </div>
                {donorName && (
                  <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                    <div className="text-sm text-green-600">Bağışçı</div>
                    <div className="text-lg font-semibold text-gray-900">{donorName}</div>
                  </div>
                )}
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">📋</div>
                  <div>
                    <h4 className="text-lg font-bold text-blue-800 mb-3">Sıradaki Adımlar</h4>
                    <div className="space-y-3 text-blue-700">
                      <div className="flex items-start">
                        <div className="step-number w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-xs font-bold text-blue-800">1</span>
                        </div>
                        <div>
                          <strong>IBAN ile Havale:</strong> TR12 0001 0000 1234 5678 9012 34
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="step-number w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-xs font-bold text-blue-800">2</span>
                        </div>
                        <div>
                          <strong>Açıklama:</strong> &quot;{donorName || 'Adınız'} - Fidan Bağışı&quot;
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="step-number w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-xs font-bold text-blue-800">3</span>
                        </div>
                        <div>
                          <strong>Sertifika:</strong> Havale onaylandıktan sonra e-posta adresinize gönderilecek
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Message */}
              <div className="impact-message bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                <div className="text-center">
                  <div className="text-4xl mb-3">🌍</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Etkiniz</h4>
                  <p className="text-green-700 leading-relaxed">
                    Bağışınızla <strong>{selectedSaplings} fidan</strong> dikilecek ve 
                    <strong> {selectedSaplings * 22} kg karbondioksit</strong> emilimi sağlanacak. 
                    Doğaya katkınız için minnettarız!
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowThankYouModal(false)}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105"
                >
                  🏠 Ana Sayfaya Dön
                </button>
                <button
                  onClick={() => {
                    setShowThankYouModal(false);
                    // Scroll to donation card
                    document.getElementById('donation-card')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-4 px-6 border-2 border-green-600 text-green-600 rounded-2xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  💚 Tekrar Bağış Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-black mb-6 text-green-400">Daha Yeşil Bir Karaman Hedefimiz 1 Milyon Fidan</h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Geleceğimiz için ağaç dikiyoruz. Her fidan, daha temiz bir dünya, 
                daha güzel bir gelecek demek.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61581790713616" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-110"
                >
                  <FaFacebookF />
                </a>
                <a 
                  href="https://www.instagram.com/yesilkaraman_tr?igsh=czA2bWg0NXBwNjEz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-110"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6 text-green-400">Hızlı Linkler</h4>
              <ul className="space-y-4 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors text-lg">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-lg">Projeler</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-lg">Gönüllü Ol</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-lg">İletişim</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6 text-green-400">İletişim</h4>
              <ul className="space-y-4 text-gray-300 text-lg">
                <li>yesilgelecekinfo@gmail.com</li>
                <li>0530 783 33 70</li>
                <li>Karaman, Türkiye</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-green-400 text-lg">&copy; 2024 Daha Yeşil Bir Karaman. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
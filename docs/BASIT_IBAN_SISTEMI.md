# 🏦 Basit IBAN Havale Sistemi

Bu doküman, sadece IBAN ile havale kabul eden basit ve güvenilir sistemin özelliklerini açıklar.

## ✅ Sadece IBAN ile Havale

### 🎯 Sistem Özellikleri:
- ❌ Kredi kartı ödemesi yok
- ❌ Online ödeme yok
- ❌ Karmaşık banka entegrasyonu yok
- ✅ Sadece IBAN ile havale
- ✅ Manuel doğrulama sistemi
- ✅ Basit ve güvenilir

### 🏦 Banka Bilgileri:
```
Banka: Ziraat Bankası
Hesap Sahibi: Doğa İçin Bir Fidan Derneği
IBAN: TR12 0001 0000 1234 5678 9012 34
```

## 🔄 Bağış Süreci

### 1. **Bağış Yapma**
- Kullanıcı ana sayfadan bağış yapar
- Fidan sayısı ve miktar seçer
- Ad, e-posta bilgilerini girer

### 2. **IBAN Bilgileri**
- Sistem banka bilgilerini gösterir
- IBAN otomatik kopyalanabilir
- Havale açıklaması önerilir

### 3. **Bağış Onayı**
- Kullanıcı "✅ IBAN ile Bağış Onayla" butonuna tıklar
- Bağış sisteme kaydedilir
- Durum: "pending" (bekliyor)

### 4. **Havale Yapma**
- Kullanıcı bankasına gider
- IBAN'a havale yapar
- Açıklamaya: "Adı - Fidan Bağışı" yazar

### 5. **Doğrulama**
- Admin panelinde "💰 Havale Doğrula" butonuna tıklanır
- Banka ekstresi kontrol edilir
- Havale bilgileri girilir
- Durum: "completed" (tamamlandı)

## 📊 Admin Paneli

### Bağış Takibi:
- **Bekleyen Bağışlar**: Havale beklenen bağışlar
- **Tamamlanan Bağışlar**: Havale doğrulanan bağışlar
- **Doğrulanan Bağışlar**: Sertifika gönderilen bağışlar

### Havale Doğrulama:
1. "💰 Havale Doğrula" butonuna tıkla
2. Havale referans numarasını gir
3. Havale tarihini gir
4. Doğrulayan kişi adını gir
5. Notları ekle (isteğe bağlı)
6. "✅ Havaleyi Doğrula" butonuna tıkla

## ⚠️ Önemli Kontroller

### Banka Ekstresinde Kontrol Edilecekler:
- ✅ Havale miktarı bağış miktarıyla eşleşiyor mu?
- ✅ Havale açıklamasında bağışçı adı var mı?
- ✅ Havale tarihi makul bir tarih mi?
- ✅ IBAN numarası doğru mu?

### Havale Açıklaması Formatı:
```
Doğru: "Ahmet Yılmaz - Fidan Bağışı"
Yanlış: "Bağış"
Yanlış: Açıklama yok
```

## 🔍 Doğrulama Adımları

### Admin Paneli Doğrulama:
1. **Admin Paneli**: `http://localhost:3000/admin`
2. **Bekleyen Bağışlar** sekmesine git
3. **"💰 Havale Doğrula"** butonuna tıkla
4. **Havale Bilgileri** formunu doldur:
   - Havale Referans Numarası (Zorunlu)
   - Havale Tarihi (Zorunlu)
   - Doğrulayan Kişi (Zorunlu)
   - Doğrulama Notları (İsteğe bağlı)
5. **"✅ Havaleyi Doğrula"** butonuna tıkla

### Bağış Durumları:
- **pending**: Bağış yapıldı, havale bekleniyor
- **completed**: Havale doğrulandı ✅
- **verified**: Sertifika gönderildi

## 📋 Kullanım Rehberi

### Bağışçı İçin:
1. Ana sayfadan bağış yap
2. Banka bilgilerini not al
3. Bankasına git ve havale yap
4. Açıklamaya adını yaz
5. Sertifika e-postasını bekle

### Admin İçin:
1. Admin paneline git
2. Bekleyen bağışları kontrol et
3. Banka ekstresini kontrol et
4. Havale doğrulama yap
5. Sertifika gönder

## 🛡️ Güvenlik

### Havale Doğrulama Güvenliği:
- Çifte kontrol sistemi
- Ekstre ekran görüntüsü saklama
- Detaylı not tutma
- Düzenli kontrol yapma

### Şüpheli Durumlar:
- Havale miktarı farklı
- Açıklama yok/yanlış
- Yanlış IBAN
- Çok eski/gelecek tarih

## 📈 İstatistikler

### Admin Paneli İstatistikleri:
- Toplam Bağış Miktarı
- Dikilen Fidan Sayısı
- Toplam Bağışçı Sayısı
- Bekleyen Bağış Sayısı

### Raporlama:
- Günlük bağış raporları
- Aylık istatistikler
- Bağışçı analizi
- Başarı oranları

## 🚀 Avantajlar

### IBAN Sistemi Avantajları:
- ✅ Ücretsiz (komisyon yok)
- ✅ Güvenli banka transferi
- ✅ Yasal ve şeffaf
- ✅ Basit kullanım
- ✅ Güvenilir doğrulama
- ✅ Karmaşık entegrasyon yok

### Basitlik Avantajları:
- ✅ Anlaşılır sistem
- ✅ Hata yapma riski düşük
- ✅ Hızlı kurulum
- ✅ Bakım gerektirmez
- ✅ Güvenilir çalışır

## 📞 Destek

### Sorun Durumunda:
- E-posta: info@dogaicinfidan.org
- Telefon: +90 (212) 123 45 67
- Admin Paneli: `/admin`

### Sık Sorulan Sorular:
**S: Havale ne zaman doğrulanır?**
C: Admin panelinde manuel olarak doğrulanır.

**S: Sertifika ne zaman gönderilir?**
C: Havale doğrulandıktan sonra otomatik gönderilir.

**S: Havale ücreti var mı?**
C: Hayır, IBAN havale ücretsizdir.

**S: Sistem karmaşık mı?**
C: Hayır, çok basit ve anlaşılırdır.

---

## 🎯 Sonuç

Bu sistem sadece IBAN ile havale kabul eder:
- ❌ Kredi kartı yok
- ❌ Karmaşık entegrasyon yok
- ✅ Sadece banka havalesi
- ✅ Manuel doğrulama
- ✅ Güvenli ve ücretsiz
- ✅ Basit ve anlaşılır

Bağışçılar güvenle IBAN ile havale yapabilir, adminler ise banka ekstresi üzerinden basit doğrulama yapabilir.

**Basit, güvenilir ve etkili!**


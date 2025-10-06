# 💰 Havale Doğrulama Sistemi

Bu doküman, bağış yapanların gerçekten banka havalesi yaptığını nasıl doğrulayacağınızı açıklar.

## 🔍 Havale Doğrulama Süreci

### 1. Bağış Yapıldığında
- Kullanıcı ana sayfadan bağış yapar
- Bağış sisteme "pending" (bekliyor) durumunda kaydedilir
- Kullanıcıya IBAN bilgileri gösterilir

### 2. Havale Doğrulama
- Admin paneline girin: `http://localhost:3000/admin`
- Bekleyen bağışlar listesinde "💰 Havale Doğrula" butonuna tıklayın
- Havale bilgilerini girin ve doğrulayın

## 📋 Doğrulama Adımları

### Banka Ekstresinde Kontrol Edilecekler:

1. **Havale Miktarı**
   - Havale edilen tutar, bağış miktarıyla tam olarak eşleşiyor mu?
   - Örnek: Bağış 100₺ ise, havale de 100₺ olmalı

2. **Havale Açıklaması**
   - Açıklama kısmında bağışçının adı yazıyor mu?
   - Format: "Ahmet Yılmaz - Fidan Bağışı"

3. **Havale Tarihi**
   - Havale tarihi, bağış tarihinden sonra mı?
   - Çok eski veya gelecek tarihli havale şüpheli olabilir

4. **IBAN Numarası**
   - Havale doğru IBAN'a yapılmış mı?
   - Doğru IBAN: `TR12 0001 0000 1234 5678 9012 34`

5. **Havale Referans Numarası**
   - Banka tarafından verilen referans numarası
   - Örnek: 20241215001

## 💻 Admin Panelinde Doğrulama

### Havale Doğrulama Formu:

```
💰 Havale Doğrulama
├── Bağış Bilgileri
│   ├── Bağışçı Adı
│   ├── Bağış Miktarı
│   ├── Fidan Sayısı
│   └── E-posta
└── Havale Doğrulama Bilgileri
    ├── Havale Referans Numarası * (Zorunlu)
    ├── Havale Tarihi * (Zorunlu)
    ├── Doğrulayan Kişi * (Zorunlu)
    ├── Doğrulama Notları
    └── Ekstre Ekran Görüntüsü URL'si
```

### Zorunlu Alanlar:
- ✅ Havale Referans Numarası
- ✅ Havale Tarihi
- ✅ Doğrulayan Kişi

### İsteğe Bağlı Alanlar:
- 📝 Doğrulama Notları
- 🖼️ Ekstre Ekran Görüntüsü URL'si

## ⚠️ Önemli Kontroller

Doğrulama yaparken mutlaka şunları kontrol edin:

1. **Miktar Eşleşmesi**
   ```
   Bağış: 100₺
   Havale: 100₺ ✅
   Havale: 99₺ ❌
   ```

2. **Açıklama Kontrolü**
   ```
   Doğru: "Ahmet Yılmaz - Fidan Bağışı" ✅
   Yanlış: "Ahmet - Bağış" ❌
   Yanlış: Açıklama yok ❌
   ```

3. **Tarih Kontrolü**
   ```
   Bağış: 15 Aralık 2024
   Havale: 15 Aralık 2024 ✅
   Havale: 16 Aralık 2024 ✅
   Havale: 14 Aralık 2024 ⚠️ (Şüpheli)
   ```

4. **IBAN Kontrolü**
   ```
   Doğru: TR12 0001 0000 1234 5678 9012 34 ✅
   Yanlış: TR12 0001 0000 9999 9999 9999 99 ❌
   ```

## 🔄 Durum Değişiklikleri

### Bağış Durumları:
- **pending**: Bağış yapıldı, havale bekleniyor
- **completed**: Havale doğrulandı ✅
- **verified**: Sertifika gönderildi

### Durum Geçişleri:
```
pending → completed (Havale doğrulandığında)
completed → verified (Sertifika gönderildiğinde)
```

## 📊 İstatistikler

Admin panelinde görebileceğiniz bilgiler:

- **Toplam Bağış**: Toplam toplanan para miktarı
- **Dikilen Fidan**: Toplam fidan sayısı
- **Toplam Bağışçı**: Kaç kişi bağış yaptı
- **Bekleyen**: Henüz havale doğrulanmamış bağışlar

## 🛡️ Güvenlik Önerileri

1. **Çifte Kontrol**: Önemli bağışları 2 kişi doğrulasın
2. **Ekstre Saklama**: Ekstre ekran görüntülerini saklayın
3. **Not Tutma**: Doğrulama notlarını detaylı yazın
4. **Düzenli Kontrol**: Günlük olarak bekleyen bağışları kontrol edin

## 🚨 Şüpheli Durumlar

Aşağıdaki durumlarda dikkatli olun:

- Havale miktarı bağış miktarından farklı
- Açıklama kısmında bağışçı adı yok
- Çok eski veya gelecek tarihli havale
- Yanlış IBAN'a yapılmış havale
- Aynı kişiden birden fazla şüpheli bağış

## 📞 Sorun Durumunda

Havale doğrulamasında sorun yaşarsanız:

1. Bağışçıya e-posta gönderin
2. Ekstra belge isteyin
3. Banka ile iletişime geçin
4. Şüpheli durumları kaydedin

---

**Önemli**: Bu sistem sadece manuel doğrulama içindir. Gerçek banka entegrasyonu için profesyonel ödeme sistemleri kullanılmalıdır.


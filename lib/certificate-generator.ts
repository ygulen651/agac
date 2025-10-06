// Sertifika oluşturucu sistemi
import { Donation } from './database';

export interface CertificateData {
  donorName: string;
  donorEmail: string;
  amount: number;
  saplingCount: number;
  donationDate: string;
  certificateId: string;
  treeLocation?: string;
  certificateNumber: string;
}

export class CertificateGenerator {
  // Sertifika numarası oluştur
  static generateCertificateNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    return `FID-${year}${month}${day}-${random}`;
  }

  // Sertifika verilerini hazırla
  static prepareCertificateData(donation: Donation): CertificateData {
    return {
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      amount: donation.amount,
      saplingCount: donation.saplingCount,
      donationDate: donation.createdAt,
      certificateId: `cert_${donation.id}`,
      treeLocation: 'İstanbul Ağaçlandırma Sahası',
      certificateNumber: this.generateCertificateNumber()
    };
  }

  // Sertifika HTML içeriği oluştur
  static generateCertificateHTML(data: CertificateData): string {
    return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sertifika - ${data.donorName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', sans-serif;
                background: linear-gradient(135deg, #27ae60 0%, #2ecc71 50%, #16a085 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                margin: 0;
                overflow-x: hidden;
            }
            
            .certificate-wrapper {
                position: relative;
                max-width: 900px;
                width: 100%;
                perspective: 1000px;
            }
            
            .certificate-container {
                background: linear-gradient(145deg, #ffffff 0%, #f8fffe 100%);
                padding: 80px 60px;
                border-radius: 30px;
                box-shadow: 
                    0 30px 60px rgba(0,0,0,0.15),
                    0 0 0 1px rgba(255,255,255,0.8),
                    inset 0 1px 0 rgba(255,255,255,0.9);
                text-align: center;
                position: relative;
                overflow: hidden;
                transform-style: preserve-3d;
                animation: float 6s ease-in-out infinite;
                border: 3px solid transparent;
                background-clip: padding-box;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotateX(0deg); }
                50% { transform: translateY(-10px) rotateX(2deg); }
            }
            
            .certificate-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, #2ecc71, #27ae60, #16a085, #2ecc71);
                border-radius: 30px;
                padding: 3px;
                mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                mask-composite: subtract;
                z-index: -1;
            }
            
            .certificate-container::after {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: 
                    radial-gradient(circle at 20% 20%, rgba(46, 204, 113, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(39, 174, 96, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 40% 60%, rgba(22, 160, 133, 0.1) 0%, transparent 50%);
                animation: rotate 20s linear infinite;
                z-index: -1;
            }
            
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .certificate-header {
                margin-bottom: 50px;
                position: relative;
                z-index: 2;
            }
            
            .certificate-badge {
                display: inline-block;
                background: linear-gradient(135deg, #2ecc71, #27ae60);
                color: white;
                padding: 15px 30px;
                border-radius: 50px;
                font-size: 1.1em;
                font-weight: 600;
                margin-bottom: 30px;
                box-shadow: 0 10px 20px rgba(46, 204, 113, 0.3);
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .certificate-title {
                font-family: 'Playfair Display', serif;
                font-size: 4em;
                color: #2c3e50;
                margin: 0;
                font-weight: 900;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                background: linear-gradient(135deg, #2c3e50, #34495e);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                line-height: 1.2;
                margin-bottom: 20px;
            }
            
            .certificate-subtitle {
                font-size: 1.4em;
                color: #27ae60;
                margin: 0;
                font-weight: 500;
                letter-spacing: 2px;
                text-transform: uppercase;
            }
            
            .certificate-body {
                margin: 50px 0;
                padding: 50px;
                background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,255,254,0.9) 100%);
                border-radius: 25px;
                border: 2px solid rgba(46, 204, 113, 0.2);
                position: relative;
                backdrop-filter: blur(10px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            
            .certificate-body::before {
                content: '🌿';
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 3em;
                background: white;
                padding: 10px 20px;
                border-radius: 50%;
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            }
            
            .presented-to {
                font-size: 1.6em;
                color: #34495e;
                margin-bottom: 25px;
                font-weight: 300;
                letter-spacing: 1px;
            }
            
            .donor-name {
                font-family: 'Playfair Display', serif;
                font-size: 3.5em;
                color: #2c3e50;
                font-weight: 700;
                margin: 25px 0;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                background: linear-gradient(135deg, #2c3e50, #27ae60);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                position: relative;
            }
            
            .donor-name::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                width: 100px;
                height: 3px;
                background: linear-gradient(90deg, #2ecc71, #27ae60);
                border-radius: 2px;
            }
            
            .certificate-text {
                font-size: 1.4em;
                color: #34495e;
                line-height: 1.8;
                margin: 30px 0;
                font-weight: 400;
            }
            
            .highlight {
                color: #27ae60;
                font-weight: 700;
                font-size: 1.3em;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
            }
            
            .tree-icon-container {
                margin: 40px 0;
                position: relative;
            }
            
            .tree-icon {
                font-size: 6em;
                display: inline-block;
                animation: treeGrow 3s ease-in-out infinite;
                filter: drop-shadow(0 10px 20px rgba(46, 204, 113, 0.3));
            }
            
            @keyframes treeGrow {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.1) rotate(5deg); }
            }
            
            .certificate-details {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 30px;
                margin: 50px 0;
                padding: 40px;
                background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,255,254,0.8) 100%);
                border-radius: 20px;
                border: 1px solid rgba(46, 204, 113, 0.2);
                box-shadow: 0 15px 30px rgba(0,0,0,0.1);
            }
            
            .detail-item {
                text-align: center;
                padding: 20px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                transition: transform 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .detail-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #2ecc71, #27ae60);
            }
            
            .detail-item:hover {
                transform: translateY(-5px);
            }
            
            .detail-icon {
                font-size: 2.5em;
                margin-bottom: 15px;
                display: block;
            }
            
            .detail-label {
                font-size: 1em;
                color: #7f8c8d;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
            }
            
            .detail-value {
                font-size: 1.4em;
                color: #2c3e50;
                font-weight: 700;
                font-family: 'Playfair Display', serif;
            }
            
            .certificate-footer {
                margin-top: 50px;
                padding-top: 40px;
                border-top: 2px solid rgba(46, 204, 113, 0.3);
                position: relative;
            }
            
            .organization-name {
                font-family: 'Playfair Display', serif;
                font-size: 1.8em;
                color: #2c3e50;
                font-weight: 700;
                margin-bottom: 15px;
            }
            
            .organization-details {
                font-size: 1.1em;
                color: #27ae60;
                margin: 8px 0;
                font-weight: 500;
            }
            
            .certificate-number {
                font-size: 1em;
                color: #7f8c8d;
                margin-top: 30px;
                font-style: italic;
                background: rgba(255,255,255,0.8);
                padding: 15px 25px;
                border-radius: 25px;
                display: inline-block;
                border: 1px solid rgba(46, 204, 113, 0.2);
            }
            
            .date-section {
                margin: 40px 0;
                padding: 25px;
                background: linear-gradient(135deg, rgba(46, 204, 113, 0.1) 0%, rgba(39, 174, 96, 0.1) 100%);
                border-radius: 15px;
                border: 1px solid rgba(46, 204, 113, 0.3);
            }
            
            .date-text {
                font-size: 1.2em;
                color: #2c3e50;
                font-weight: 600;
            }
            
            .floating-elements {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            }
            
            .floating-leaf {
                position: absolute;
                font-size: 2em;
                color: rgba(46, 204, 113, 0.3);
                animation: floatLeaf 8s ease-in-out infinite;
            }
            
            .floating-leaf:nth-child(1) {
                top: 10%;
                left: 10%;
                animation-delay: 0s;
            }
            
            .floating-leaf:nth-child(2) {
                top: 20%;
                right: 15%;
                animation-delay: 2s;
            }
            
            .floating-leaf:nth-child(3) {
                bottom: 20%;
                left: 20%;
                animation-delay: 4s;
            }
            
            .floating-leaf:nth-child(4) {
                bottom: 10%;
                right: 10%;
                animation-delay: 6s;
            }
            
            @keyframes floatLeaf {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
            }
            
            @media print {
                body {
                    background: white;
                    animation: none;
                }
                .certificate-container {
                    box-shadow: none;
                    animation: none;
                    transform: none;
                }
                .certificate-container::before,
                .certificate-container::after {
                    display: none;
                }
                .floating-elements {
                    display: none;
                }
                .detail-item:hover {
                    transform: none;
                }
            }
            
            @media (max-width: 768px) {
                .certificate-container {
                    padding: 40px 30px;
                }
                .certificate-title {
                    font-size: 2.5em;
                }
                .donor-name {
                    font-size: 2.5em;
                }
                .certificate-details {
                    grid-template-columns: 1fr;
                    gap: 20px;
                    padding: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="certificate-wrapper">
            <div class="certificate-container">
                <div class="floating-elements">
                    <div class="floating-leaf">🍃</div>
                    <div class="floating-leaf">🌿</div>
                    <div class="floating-leaf">🍃</div>
                    <div class="floating-leaf">🌿</div>
                </div>
                
                <div class="certificate-header">
                    <div class="certificate-badge">🏆 Onur Belgesi</div>
                    <h1 class="certificate-title">FİDAN DİKİM SERTİFİKASI</h1>
                    <p class="certificate-subtitle">Doğa için Bir Fidan</p>
                </div>
                
                <div class="certificate-body">
                    <p class="presented-to">Bu özel sertifika</p>
                    <h2 class="donor-name">${data.donorName}</h2>
                    <p class="certificate-text">
                        değerli bağışçımıza, doğaya yaptığı paha biçilmez katkıdan dolayı 
                        <strong>onur ve minnetle</strong> takdim edilmiştir.
                    </p>
                    
                    <div class="tree-icon-container">
                        <div class="tree-icon">🌳</div>
                    </div>
                    
                    <p class="certificate-text">
                        ${data.donorName} isimli bağışçımız, <span class="highlight">${data.saplingCount} fidan</span> 
                        bağışlayarak toplam <span class="highlight">${data.amount} TL</span> değerinde 
                        çevresel katkıda bulunmuştur.
                    </p>
                    
                    <div class="certificate-details">
                        <div class="detail-item">
                            <span class="detail-icon">🌱</span>
                            <div class="detail-label">Dikilen Fidan</div>
                            <div class="detail-value">${data.saplingCount} Adet</div>
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">💰</span>
                            <div class="detail-label">Bağış Miktarı</div>
                            <div class="detail-value">${data.amount} TL</div>
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">📍</span>
                            <div class="detail-label">Dikim Lokasyonu</div>
                            <div class="detail-value">${data.treeLocation}</div>
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">🌍</span>
                            <div class="detail-label">Karbon Tasarrufu</div>
                            <div class="detail-value">${data.saplingCount * 22} kg/yıl</div>
                        </div>
                    </div>
                    
                    <p class="certificate-text">
                        Bu değerli fidanlar, <strong>${data.treeLocation}</strong> bölgesinde 
                        uzman ekiplerimiz tarafından özenle dikilmiş ve sürekli bakımı yapılmaktadır.
                        Her bir fidan, gelecek nesillere temiz bir çevre bırakma amacımıza hizmet etmektedir.
                    </p>
                    
                    <div class="date-section">
                        <p class="date-text">
                            <strong>📅 Bağış Tarihi:</strong> ${new Date(data.donationDate).toLocaleDateString('tr-TR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
                
                <div class="certificate-footer">
                    <div class="organization-name">Doğa için Bir Fidan Derneği</div>
                    <div class="organization-details">🌱 Geleceğimiz için ağaç dikiyoruz</div>
                    <div class="organization-details">📧 info@dogaicinfidan.org</div>
                    <div class="organization-details">📞 +90 (212) 123 45 67</div>
                    
                    <div class="certificate-number">
                        Sertifika No: ${data.certificateNumber}
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  // Sertifika PDF URL'si oluştur
  static generateCertificateURL(donation: Donation): string {
    const certificateData = this.prepareCertificateData(donation);
    const html = this.generateCertificateHTML(certificateData);
    
    // HTML'i base64 encode et
    const encodedHTML = Buffer.from(html).toString('base64');
    
    // Sertifika görüntüleme URL'si
    return `/certificate/${donation.id}?data=${encodedHTML}`;
  }

  // E-posta içeriği oluştur
  static generateEmailContent(data: CertificateData): { subject: string; html: string; text: string } {
    const subject = `🌱 Fidan Dikim Sertifikanız Hazır - ${data.donorName}`;
    
    const html = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sertifika E-postası</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8f9fa;
            }
            .email-container {
                background: white;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #4a7c59;
            }
            .header h1 {
                color: #2d5016;
                margin: 0;
                font-size: 2em;
            }
            .content {
                margin: 20px 0;
            }
            .highlight {
                background-color: #e8f5e8;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #4a7c59;
            }
            .certificate-link {
                display: inline-block;
                background: linear-gradient(135deg, #4a7c59, #2d5016);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 25px;
                font-weight: bold;
                margin: 20px 0;
                transition: transform 0.2s;
            }
            .certificate-link:hover {
                transform: translateY(-2px);
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                text-align: center;
                color: #666;
                font-size: 0.9em;
            }
            .details {
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                padding: 5px 0;
                border-bottom: 1px solid #eee;
            }
            .detail-label {
                font-weight: bold;
                color: #2d5016;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>🌱 Sertifikanız Hazır!</h1>
                <p>Doğa için Bir Fidan</p>
            </div>
            
            <div class="content">
                <p>Merhaba <strong>${data.donorName}</strong>,</p>
                
                <p>Doğaya yaptığınız değerli katkıdan dolayı size özel olarak hazırladığımız 
                <strong>Fidan Dikim Sertifikanız</strong> hazır!</p>
                
                <div class="highlight">
                    <p><strong>🎉 Tebrikler!</strong></p>
                    <p>${data.saplingCount} fidan bağışınızla doğaya büyük bir katkı sağladınız. 
                    Bu fidanlar ${data.treeLocation} bölgesinde dikilmiştir.</p>
                </div>
                
                <div class="details">
                    <div class="detail-row">
                        <span class="detail-label">Bağış Miktarı:</span>
                        <span>${data.amount} TL</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Dikilen Fidan:</span>
                        <span>${data.saplingCount} Adet</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Karbon Tasarrufu:</span>
                        <span>${data.saplingCount * 22} kg/yıl</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Dikim Lokasyonu:</span>
                        <span>${data.treeLocation}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Sertifika No:</span>
                        <span>${data.certificateNumber}</span>
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/certificate/${data.certificateId}" 
                       class="certificate-link">
                        📜 Sertifikanızı Görüntüleyin
                    </a>
                </div>
                
                <p>Sertifikanızı yazdırabilir, sosyal medyada paylaşabilir veya arşivleyebilirsiniz.</p>
                
                <p>Doğaya katkınız için tekrar teşekkür ederiz! 🌱</p>
            </div>
            
            <div class="footer">
                <p><strong>Doğa için Bir Fidan Derneği</strong></p>
                <p>📧 info@dogaicinfidan.org | 📞 +90 (212) 123 45 67</p>
                <p>🌱 Geleceğimiz için ağaç dikiyoruz</p>
            </div>
        </div>
    </body>
    </html>
    `;
    
    const text = `
Sertifikanız Hazır - ${data.donorName}

Merhaba ${data.donorName},

Doğaya yaptığınız değerli katkıdan dolayı size özel olarak hazırladığımız Fidan Dikim Sertifikanız hazır!

Tebrikler!
${data.saplingCount} fidan bağışınızla doğaya büyük bir katkı sağladınız. 
Bu fidanlar ${data.treeLocation} bölgesinde dikilmiştir.

Bağış Detayları:
- Bağış Miktarı: ${data.amount} TL
- Dikilen Fidan: ${data.saplingCount} Adet
- Karbon Tasarrufu: ${data.saplingCount * 22} kg/yıl
- Dikim Lokasyonu: ${data.treeLocation}
- Sertifika No: ${data.certificateNumber}

Sertifikanızı görüntülemek için: ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/certificate/${data.certificateId}

Doğaya katkınız için tekrar teşekkür ederiz!

Doğa için Bir Fidan Derneği
info@dogaicinfidan.org
+90 (212) 123 45 67
    `;
    
    return { subject, html, text };
  }
}

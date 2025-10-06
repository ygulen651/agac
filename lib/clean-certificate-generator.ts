import { CertificateData } from './certificate-generator';

export class CleanCertificateGenerator {
  // Sertifika HTML içeriği oluştur (Sade tasarım)
  static generateCleanCertificateHTML(data: CertificateData): string {
    return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sertifika - ${data.donorName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
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
            }
            
            .certificate-container {
                background: white;
                padding: 60px 50px;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                text-align: center;
                position: relative;
                max-width: 800px;
                width: 100%;
            }
            
            .certificate-badge {
                display: inline-block;
                background: #27ae60;
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                font-size: 1em;
                font-weight: 600;
                margin-bottom: 30px;
            }
            
            .certificate-title {
                font-size: 3.5em;
                color: #2c3e50;
                margin: 0;
                font-weight: 700;
                line-height: 1.2;
                margin-bottom: 20px;
            }
            
            .certificate-subtitle {
                font-size: 1.2em;
                color: #27ae60;
                margin: 0;
                font-weight: 500;
                letter-spacing: 1px;
            }
            
            .certificate-body {
                margin: 50px 0;
                padding: 40px;
                background: #f8fff8;
                border-radius: 15px;
                border: 1px solid #e8f5e8;
                position: relative;
            }
            
            .certificate-body::before {
                content: '🌿';
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 2.5em;
                background: white;
                padding: 8px 16px;
                border-radius: 50%;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .presented-to {
                font-size: 1.4em;
                color: #34495e;
                margin-bottom: 20px;
                font-weight: 300;
            }
            
            .donor-name {
                font-size: 3em;
                color: #2c3e50;
                font-weight: 700;
                margin: 20px 0;
                padding: 15px 30px;
                background: #27ae60;
                color: white;
                border-radius: 10px;
                display: inline-block;
            }
            
            .certificate-text {
                font-size: 1.2em;
                color: #34495e;
                line-height: 1.6;
                margin: 25px 0;
                font-weight: 400;
            }
            
            .highlight {
                color: #27ae60;
                font-weight: 700;
                font-size: 1.3em;
            }
            
            .tree-icon-container {
                margin: 30px 0;
            }
            
            .tree-icon {
                font-size: 5em;
                display: inline-block;
                filter: drop-shadow(0 5px 15px rgba(46, 204, 113, 0.3));
            }
            
            .certificate-details {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 20px;
                margin: 40px 0;
                padding: 30px;
                background: white;
                border-radius: 15px;
                border: 1px solid #e8f5e8;
            }
            
            .detail-item {
                text-align: center;
                padding: 20px;
                background: #f8fff8;
                border-radius: 10px;
                border: 1px solid #e8f5e8;
            }
            
            .detail-icon {
                font-size: 2em;
                margin-bottom: 10px;
                display: block;
            }
            
            .detail-label {
                font-size: 0.9em;
                color: #7f8c8d;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
            }
            
            .detail-value {
                font-size: 1.2em;
                color: #2c3e50;
                font-weight: 700;
            }
            
            .certificate-footer {
                margin-top: 40px;
                padding-top: 30px;
                border-top: 2px solid #e8f5e8;
            }
            
            .organization-name {
                font-size: 1.5em;
                color: #2c3e50;
                font-weight: 700;
                margin-bottom: 10px;
            }
            
            .organization-details {
                font-size: 1em;
                color: #27ae60;
                margin: 5px 0;
                font-weight: 500;
            }
            
            .certificate-number {
                font-size: 0.9em;
                color: #7f8c8d;
                margin-top: 25px;
                font-style: italic;
                background: #f8fff8;
                padding: 12px 20px;
                border-radius: 20px;
                display: inline-block;
                border: 1px solid #e8f5e8;
            }
            
            .date-section {
                margin: 30px 0;
                padding: 20px;
                background: #e8f5e8;
                border-radius: 10px;
            }
            
            .date-text {
                font-size: 1.1em;
                color: #2c3e50;
                font-weight: 600;
            }
            
            @media print {
                body {
                    background: white;
                }
                .certificate-container {
                    box-shadow: none;
                    border: 2px solid #27ae60;
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
                    font-size: 2.2em;
                }
                .certificate-details {
                    grid-template-columns: 1fr;
                    gap: 15px;
                    padding: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="certificate-container">
            <div class="certificate-badge">🏆 Onur Belgesi</div>
            <h1 class="certificate-title">FİDAN DİKİM SERTİFİKASI</h1>
            <p class="certificate-subtitle">Doğa için Bir Fidan</p>
            
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
    </body>
    </html>
    `;
  }
}


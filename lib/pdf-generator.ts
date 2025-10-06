import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CleanCertificateGenerator } from './clean-certificate-generator';

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

export class PDFGenerator {
  // Sertifikayı PDF'e çevir
  static async generatePDF(certificateData: CertificateData): Promise<Blob> {
    return new Promise(async (resolve, reject) => {
      try {
        // Sertifika HTML'ini oluştur (Sade tasarım)
        const certificateHTML = CleanCertificateGenerator.generateCleanCertificateHTML(certificateData);
        
        // Geçici div oluştur
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = certificateHTML;
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.top = '0';
        tempDiv.style.width = '900px';
        tempDiv.style.height = 'auto';
        tempDiv.style.background = 'white';
        tempDiv.style.overflow = 'hidden';
        document.body.appendChild(tempDiv);

        // Fontların yüklenmesini bekle
        await new Promise(resolve => setTimeout(resolve, 1000));

        // HTML'i canvas'a çevir
        const canvas = await html2canvas(tempDiv, {
          width: 900,
          height: 1200,
          scale: 1.5, // Daha düşük scale
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: true,
          onclone: (clonedDoc) => {
            // Klonlanan dokümanda animasyonları durdur
            const clonedBody = clonedDoc.body;
            if (clonedBody) {
              clonedBody.style.animation = 'none';
              clonedBody.style.transform = 'none';
              clonedBody.style.transition = 'none';
            }
          }
        });

        // Canvas kontrolü
        if (!canvas || canvas.width === 0 || canvas.height === 0) {
          throw new Error('Canvas oluşturulamadı');
        }

        // Canvas'ı PDF'e çevir
        const imgData = canvas.toDataURL('image/png', 0.95);
        
        if (!imgData || imgData === 'data:,') {
          throw new Error('Resim verisi oluşturulamadı');
        }

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        // PDF boyutları
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        // Resmi PDF'e ekle
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // PDF'i blob'a çevir
        const pdfBlob = pdf.output('blob');
        
        // Blob kontrolü
        if (!pdfBlob || pdfBlob.size === 0) {
          throw new Error('PDF blob oluşturulamadı');
        }

        console.log('PDF oluşturuldu, boyut:', pdfBlob.size, 'bytes');
        
        // Geçici div'i temizle
        document.body.removeChild(tempDiv);
        
        resolve(pdfBlob);
      } catch (error) {
        console.error('PDF oluşturma hatası:', error);
        reject(error);
      }
    });
  }

  // PDF'i indir
  static async downloadPDF(certificateData: CertificateData, filename?: string): Promise<void> {
    try {
      const pdfBlob = await this.generatePDF(certificateData);
      const url = URL.createObjectURL(pdfBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `Fidan_Sertifikasi_${certificateData.donorName}_${certificateData.certificateNumber}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF indirme hatası:', error);
      throw new Error('PDF indirilemedi');
    }
  }

  // PDF'i paylaş
  static async sharePDF(certificateData: CertificateData): Promise<void> {
    try {
      console.log('PDF oluşturuluyor...');
      const pdfBlob = await this.generatePDF(certificateData);
      
      console.log('PDF blob boyutu:', pdfBlob.size);
      
      if (pdfBlob.size === 0) {
        throw new Error('PDF boş oluşturuldu');
      }
      
      // Web Share API kullan
      if (navigator.share && navigator.canShare) {
        const fileName = `Fidan_Sertifikasi_${certificateData.donorName.replace(/\s+/g, '_')}.pdf`;
        const file = new File([pdfBlob], fileName, {
          type: 'application/pdf'
        });

        console.log('Dosya oluşturuldu:', file.name, 'Boyut:', file.size);

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          console.log('Web Share API ile paylaşılıyor...');
          await navigator.share({
            title: 'Fidan Dikim Sertifikam',
            text: `${certificateData.donorName} olarak ${certificateData.saplingCount} fidan bağışında bulundum!`,
            files: [file]
          });
          return;
        }
      }

      // Fallback: PDF'i indir
      console.log('Web Share API desteklenmiyor, indirme yapılıyor...');
      await this.downloadPDF(certificateData);
    } catch (error) {
      console.error('PDF paylaşma hatası:', error);
      // Hata durumunda indirme yap
      try {
        await this.downloadPDF(certificateData);
      } catch (downloadError) {
        console.error('PDF indirme de başarısız:', downloadError);
        throw new Error('PDF oluşturulamadı: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'));
      }
    }
  }

  // Sertifika HTML'ini oluştur (PDF için optimize edilmiş)
  private static createCertificateHTML(data: CertificateData): string {
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
                background: linear-gradient(135deg, #0f4c75 0%, #3282b8 25%, #bbe1fa 50%, #0f4c75 75%, #3282b8 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                margin: 0;
            }
            
            .certificate-wrapper {
                position: relative;
                max-width: 900px;
                width: 100%;
            }
            
            .certificate-container {
                background: linear-gradient(145deg, #ffffff 0%, #f8fffe 100%);
                padding: 80px 60px;
                border-radius: 30px;
                box-shadow: 0 30px 60px rgba(0,0,0,0.15);
                text-align: center;
                position: relative;
                overflow: hidden;
                border: 3px solid transparent;
                background-clip: padding-box;
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
                filter: drop-shadow(0 10px 20px rgba(46, 204, 113, 0.3));
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
        </style>
    </head>
    <body>
        <div class="certificate-wrapper">
            <div class="certificate-container">
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
}

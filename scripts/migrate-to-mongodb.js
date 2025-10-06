const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = 'mongodb+srv://ygulen651_db_user:qbwMZHOJF3b45hML@cluster0.utz0f5r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'agac_donations';

async function migrateToMongoDB() {
  const client = new MongoClient(uri);
  
  try {
    // MongoDB'ye bağlan
    await client.connect();
    console.log('MongoDB bağlantısı başarılı');
    
    const db = client.db(dbName);
    const donationsCollection = db.collection('donations');
    
    // Mevcut JSON dosyasını oku
    const donationsFilePath = path.join(process.cwd(), 'data', 'donations.json');
    const donationsData = fs.readFileSync(donationsFilePath, 'utf8');
    const donations = JSON.parse(donationsData);
    
    console.log(`${donations.length} bağış bulundu`);
    
    // Mevcut verileri temizle (isteğe bağlı)
    await donationsCollection.deleteMany({});
    console.log('Mevcut veriler temizlendi');
    
    // Verileri MongoDB'ye ekle
    if (donations.length > 0) {
      // MongoDB ObjectId formatına uygun hale getir
      const donationsToInsert = donations.map(donation => {
        const { id, ...donationData } = donation;
        return {
          ...donationData,
          _id: id // Mevcut id'yi _id olarak kullan
        };
      });
      
      const result = await donationsCollection.insertMany(donationsToInsert);
      console.log(`${result.insertedCount} bağış MongoDB'ye eklendi`);
    }
    
    // Verileri kontrol et
    const count = await donationsCollection.countDocuments({});
    console.log(`MongoDB'de toplam ${count} bağış var`);
    
    // Örnek veri göster
    const sampleDonation = await donationsCollection.findOne({});
    if (sampleDonation) {
      console.log('Örnek bağış:', {
        id: sampleDonation._id,
        donorName: sampleDonation.donorName,
        amount: sampleDonation.amount,
        status: sampleDonation.status
      });
    }
    
  } catch (error) {
    console.error('Migration hatası:', error);
  } finally {
    await client.close();
    console.log('MongoDB bağlantısı kapatıldı');
  }
}

// Script'i çalıştır
migrateToMongoDB();

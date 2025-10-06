import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://ygulen651_db_user:qbwMZHOJF3b45hML@cluster0.utz0f5r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = process.env.MONGODB_DB_NAME || 'agac_donations';

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (db) {
    return { client, db };
  }

  try {
    console.log('MongoDB bağlantısı başlatılıyor...');
    console.log('URI:', uri ? 'Mevcut' : 'Eksik');
    console.log('DB Name:', dbName);
    
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    
    console.log('MongoDB bağlantısı başarılı');
    return { client, db };
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

export async function getDonationsCollection() {
  const { db } = await connectToDatabase();
  return db.collection('donations');
}

export async function closeConnection() {
  if (client) {
    await client.close();
  }
}

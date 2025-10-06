import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb+srv://ygulen651_db_user:qbwMZHOJF3b45hML@cluster0.utz0f5r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'agac_donations';

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (db) {
    return { client, db };
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    
    console.log('MongoDB bağlantısı başarılı');
    return { client, db };
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
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

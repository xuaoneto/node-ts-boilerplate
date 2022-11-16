import { MongoClient, Db } from "mongodb";

let mongoDatabase: Db | null = null;

async function initializeDatabase() {
  const uri = process.env.DATABASE as string;
  const dbConnection = await MongoClient.connect(uri);
  mongoDatabase = dbConnection.db("customers-platform");
}

export async function getDatabase() {
  if (!mongoDatabase) await initializeDatabase();
  return mongoDatabase!;
}

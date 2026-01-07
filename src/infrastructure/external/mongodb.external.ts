import { ConfigImpl } from "@/application/config";
import { Db, MongoClient } from "mongodb";

export class MongoDBExternal {
  private client!: MongoClient;
  private db!: Db;
  private config = new ConfigImpl();

  async connect(): Promise<void> {
    this.client = new MongoClient(this.config.mongodb.uri, {
      serverSelectionTimeoutMS: 5000,
    });

    await this.client.connect();
    this.db = this.client.db();
  }

  async getCollection(collectionName: string) {
    if (!this.db) {
      await this.connect();
    }
    return this.db.collection(collectionName);
  }
}

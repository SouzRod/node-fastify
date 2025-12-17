import { Collection, Db, MongoClient } from "mongodb";

import { ConfigImpl } from "@/application/config";
import { Config } from "@/domain/interfaces";

export class MongoDBExternal {
  private client: MongoClient;
  private db!: Db;
  private config: Config = new ConfigImpl();

  constructor(url?: string, databaseName?: string) {
    this.client = new MongoClient(url || this.config.mongodb.uri);
    if (!this.db) {
      this.client
        .connect()
        .then((client) => {
          this.db = client.db(databaseName || this.config.mongodb.databaseName);
        })
        .catch((error) => console.error("Failed to connect to MongoDB:", error));
    }
  }

  getDatabase(): Db {
    return this.db;
  }

  getCollection(collectionName: string): Collection {
    return this.db.collection(collectionName);
  }
}
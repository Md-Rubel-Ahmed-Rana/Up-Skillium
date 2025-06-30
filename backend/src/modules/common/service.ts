import mongoose from "mongoose";
import { COLLECTION_METADATA } from "../../constants/documents";

class Service {
  async getTotalDocumentCount(): Promise<
    { name: string; documents: number; description: string }[]
  > {
    const db = mongoose.connection.db as mongoose.mongo.Db;
    const collections = await db.listCollections().toArray();

    const results: {
      name: string;
      documents: number;
      description: string;
    }[] = [];

    for (const { name: collectionName } of collections) {
      const count = await db.collection(collectionName).countDocuments();
      const meta = COLLECTION_METADATA[collectionName];

      if (meta) {
        results.push({
          name: meta.name,
          documents: count,
          description: meta.description,
        });
      }
    }

    return results;
  }
}

export const CommonService = new Service();

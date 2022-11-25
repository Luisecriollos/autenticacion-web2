import { MongoClient, Db } from "mongodb";
import logger from "jet-logger";
import EnvVars from "./declarations/major/EnvVars";

const { user, password, host, dbName } = EnvVars.database;

const uri = `mongodb+srv://${user}:${password}@${host}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

let dbConnection: Db;

export default {
  async connectToServer(callback?: (err?: Error) => void) {
    try {
      await client.connect();
      dbConnection = client.db(dbName);
      logger.info("Successfully connected to MongoDB.");
      return callback?.();
    } catch (err) {
      logger.err(err);
      return callback?.(err as Error);
    }
  },

  getDb() {
    return dbConnection;
  },
};

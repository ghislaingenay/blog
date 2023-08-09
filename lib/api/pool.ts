import mongoose from "mongoose";
export class PoolMongo {
  MONGO_URI: string = process.env.MONGO_URI!;

  private verifyMongoURI() {
    if (!this.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
  }
  async connect() {
    this.verifyMongoURI();
    try {
      return await mongoose.connect(this.MONGO_URI);
    } catch (err) {
      throw new Error(
        "Impossible to connect to the database. Please try again later"
      );
    }
  }
}

const clientPromise = new PoolMongo().connect();
export default clientPromise;

import mongoose from "mongoose";

// Manually set the MongoDB URI
const MONGO_URI = "mongodb://localhost:27017/login-register";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn; // Return the connected mongoose instance
  } catch (e) {
    cached.promise = null;
    throw e;
  }
};

export default connectDb;

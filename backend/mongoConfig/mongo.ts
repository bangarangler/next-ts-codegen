import * as mongodb from "mongodb";

const { MongoClient } = mongodb;
let db: any;

const initDB = async () => {
  try {
    // let db: any;
    const database = await MongoClient.connect(`${process.env.MONGO_STRING}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (!database) throw new Error("Mongo not Connected!!!");
    db = database;
  } catch (err) {
    console.log("err connecting to mongo");
  }
};

initDB();

// db = initDB()

export { db };

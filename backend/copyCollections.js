import mongoose from "mongoose";

const sourceURI = "";
const targetURI = "";

const collectionsToCopy = ["ratingusers", "claimhistories"];

const copyCollection = async (collectionName) => {
  try {
    const sourceConn = await mongoose.createConnection(sourceURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const targetConn = await mongoose.createConnection(targetURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const schema = new mongoose.Schema({}, { strict: false });

    const SourceModel = sourceConn.model(collectionName, schema, collectionName);
    const TargetModel = targetConn.model(collectionName, schema, collectionName);

    const data = await SourceModel.find({});
    if (data.length > 0) {
      await TargetModel.insertMany(data);
      console.log(`Copied ${data.length} documents to '${collectionName}'`);
    } else {
      console.log(` No documents found in '${collectionName}'`);
    }

    await sourceConn.close();
    await targetConn.close();
  } catch (err) {
    console.error(` Error copying '${collectionName}':`, err);
  }
};

const runCopy = async () => {
  for (const collection of collectionsToCopy) {
    await copyCollection(collection);
  }
};

runCopy();

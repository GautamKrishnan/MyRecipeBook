import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient,
} from 'mongodb-stitch-react-native-sdk';

export function InitializeMongoClient() {
  Stitch.initializeDefaultAppClient('myrecipebook-mobua').then(client => {
    return client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(user => {
        console.log(`Successfully logged in as user from helper ${user.id}`);
        return user.id;
      })
      .catch(err => {
        console.log(`Failed to log in anonymously: ${err}`);
      });
  });
}

export async function ReadCollection(collectionName) {
  const stitchAppClient = Stitch.defaultAppClient;
  const mongoClient = stitchAppClient.getServiceClient(
    RemoteMongoClient.factory,
    'mongodb-myrecipebook',
  );
  const db = mongoClient.db('testdb');
  const collection = db.collection(collectionName);
  return collection
    .find({}, {})
    .asArray()
    .then(docs => {
      return docs;
    })
    .catch(err => {
      console.log(err);
    });
}

export async function DeleteDocument(collectionName, documentID) {
  const stitchAppClient = Stitch.defaultAppClient;
  const mongoClient = stitchAppClient.getServiceClient(
    RemoteMongoClient.factory,
    'mongodb-myrecipebook',
  );
  const db = mongoClient.db('testdb');
  const collection = db.collection(collectionName);
  const query = {_id: documentID};
  return collection
    .deleteOne(query)
    .then(result => {
      console.log(`Deleted ${result.deletedCount} item.`);
      return result;
    })
    .catch(err => console.error(`Delete failed with error: ${err}`));
}

export async function Add(collectionName, document) {
  const stitchAppClient = Stitch.defaultAppClient;
  const mongoClient = stitchAppClient.getServiceClient(
    RemoteMongoClient.factory,
    'mongodb-myrecipebook',
  );
  const db = mongoClient.db('testdb');
  const collection = db.collection(collectionName);
  return collection
    .insertOne(document)
    .then(result => {
      console.log('Wrote success');
      return result;
    })
    .catch(err => {
      console.warn(err);
    });
}

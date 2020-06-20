const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

class Db {
  constructor() {
    this.client = new MongoClient(config.mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = config.dbName
  }

  connect() {
    Db.connection = new Promise((resolve, reject) => {
      this.client.connect(err => {
        if (err) {
          reject(err);
        }

        /* eslint-disable no-console */
        console.log('Successfully connected to MongoDB');
        resolve(this.client.db(this.dbName));
      })
    });

    return Db.connection;
  }

  async getAll(collection) {
    const db = await this.connect();

    return db
      .collection(collection)
      .find({})
      .toArray();
  }

  async getAllByTags(collection, query) {
    const db = await this.connect();
    const q = query.split(',');
    return db
      .collection(collection)
      .find({ tags: { $all: q } })
      .toArray();
  }

  async get(collection, id) {
    const db = await this.connect();

    return db
      .collection(collection)
      .findOne({ _id: ObjectId(id) });
  }

  async create(collection, data) {
    const db = await this.connect();
    const result = await db
      .collection(collection)
      .insertOne(data);

    return result.insertedId;
  }

  async update(collection, id, data) {
    const db = await this.connect();
    const result = await db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });

    return result.insertedId;
  }

  async delete(collection, id) {
    const db = await this.connect();
    await db
      .collection(collection)
      .deleteOne({ _id: ObjectId(id) })

    return id;
  }

}

module.exports = { Db };
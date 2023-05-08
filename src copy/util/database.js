// const mongodb = require('mongodb');
// const MongoClient=mongodb.MongoClient;

// let _db;

// const mongoConnect=(callback)=>{
//     MongoClient.connect('mongodb+srv://anshulprogrammingjobs:JEED13YCYEiCifdR@cluster0.uixj5ca.mongodb.net/shop?retryWrites=true&w=majority')
//     .then((client) => {
//         console.log('Connected to the database ')
//         _db=client.db();
//         callback()
//     })
//     .catch( (err) => {
//         console.error(`Error connecting to the database. n${err}`);
//         throw err;
//     })
// }

// const getDb=()=>{
//     if (_db) {
//         return _db;
//     }
//     throw 'No Database Found!';
// }

// exports.mongoConnect=mongoConnect;
// exports.getDb=getDb;

// const mongoose = require('mongoose');

class MongooseDb { // Singleton
  connection = mongoose.connection;
  
  constructor() {
    try {
      this.connection
      .on('open', console.info.bind(console, 'Database connection: open'))
      .on('close', console.info.bind(console, 'Database connection: close'))
      .on('disconnected', console.info.bind(console, 'Database connection: disconnecting'))
      .on('disconnected', console.info.bind(console, 'Database connection: disconnected'))
      .on('reconnected', console.info.bind(console, 'Database connection: reconnected'))
      .on('fullsetup', console.info.bind(console, 'Database connection: fullsetup'))
      .on('all', console.info.bind(console, 'Database connection: all'))
      .on('error', console.error.bind(console, 'MongoDB connection: error:'));
    } catch (error) {
      console.error(error);
    }
  }

  async connect() {
    try {
      await mongoose.connect(
        `mongodb+srv://anshulprogrammingjobs:JEED13YCYEiCifdR@cluster0.uixj5ca.mongodb.net/shop?retryWrites=true&w=majority`,
        // `mongodb+srv://${username}:${password}@cluster0.2a7nn.mongodb.net/${dbname}?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async close() {
    try {
      await this.connection.close();
    } catch (error) {
      console.error(error);
    }
  }
}

// module.exports = new MongooseDb();




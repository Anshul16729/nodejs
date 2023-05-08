const mongodb = require('mongodb');
const MongoClient=mongodb.MongoClient;

let _db;

const mongoConnect=(callback)=>{
    MongoClient.connect('mongodb+srv://anshulprogrammingjobs:JEED13YCYEiCifdR@cluster0.uixj5ca.mongodb.net/shop?retryWrites=true&w=majority')
    .then((client) => {
        console.log('Connected to the database ')
        _db=client.db();
        callback()
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
        throw err;
    })
}

const getDb=()=>{
    if (_db) {
        return _db;
    }
    throw 'No Database Found!';
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;



const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  console.log('mongoConnect...');
  MongoClient.connect(
    'mongodb+srv://mewies:qzfopWcBbYyqi5ss@cluster0.qbvjl.mongodb.net/shop?retryWrites=true&w=majority',
   {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(client => {
    console.log('Connected!');
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.log('Error...');
    console.log(err);
    throw err;
  });
};

const getDb = () => {
  if(_db) {
    return _db
  }
  throw 'No database found';
};

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;
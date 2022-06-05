const mongoose = require('mongoose');
const dbName = 'mental-health';
const localUrl = '127.0.0.1';
mongoose.connect(`mongodb://${localUrl}:27017/${dbName}`, { useNewUrlParser: true }, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`已成功连接${dbName}数据库！`);
});
module.exports = mongoose;
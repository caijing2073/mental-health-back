const mongoose = require('../db/db');
const schema = {
  userName: String,
  passWord: String,
  donetest: Array,
  treeHoleList: Array,
};
const UserSchema = mongoose.Schema(schema);

const UserModel = mongoose.model('User', UserSchema, 'user');

module.exports = UserModel;
const mongoose = require('../db/db');
const schema = {
  userName: String,
  backgroundImage: String,
  content: String,
  publishTime: String,
};
const TreeHoleSchema = mongoose.Schema(schema);

const TreeHoleModel = mongoose.model('TreeHole', TreeHoleSchema, 'treehole');

module.exports = TreeHoleModel;